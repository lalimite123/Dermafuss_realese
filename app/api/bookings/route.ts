import { NextResponse } from "next/server"
export const runtime = "nodejs"
import { z } from "zod"
import { getDb } from "@/lib/db"
import { sendBookingEmails } from "@/lib/email"

const BookingSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  time: z.string().regex(/^\d{2}:\d{2}$/), // HH:mm
  notes: z.string().max(1000).optional().or(z.literal("")),
  consent: z.boolean(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = BookingSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 },
      )
    }
    const booking = parsed.data
    if (!booking.consent) {
      return NextResponse.json({ error: "Consent required" }, { status: 400 })
    }

    const db = await getDb()
    const collection = db.collection("bookings")

    // Prevent double booking for the same date+time
    const existing = await collection.findOne({ date: booking.date, time: booking.time })
    if (existing) {
      return NextResponse.json({ error: "Slot already booked" }, { status: 409 })
    }

    const createdAt = new Date()
    const doc = { ...booking, createdAt }
    const insert = await collection.insertOne(doc)

    // Send emails (to admin + to user if email provided)
    await sendBookingEmails({
      ...booking,
      id: insert.insertedId.toString(),
    })

    return NextResponse.json({ ok: true, id: insert.insertedId.toString() }, { status: 201 })
  } catch (err) {
    console.error("/api/bookings error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const month = url.searchParams.get("month")
    const date = url.searchParams.get("date")
    const db = await getDb()
    const collection = db.collection("bookings")

    if (month && /^\d{4}-\d{2}$/.test(month)) {
      const cursor = collection
        .find({ date: { $regex: `^${month}-` } })
        .project({ date: 1, time: 1, _id: 0 })
      const items = await cursor.toArray()
      const map: Record<string, Set<string>> = {}
      for (const it of items as any[]) {
        if (!map[it.date]) map[it.date] = new Set()
        if (typeof it.time === "string") map[it.date].add(it.time)
      }
      const totals = Object.fromEntries(Object.entries(map).map(([d, set]) => [d, set.size]))
      return NextResponse.json({ ok: true, month, totals }, { status: 200 })
    }

    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const bookings = await collection.find({ date }).project({ time: 1, _id: 0 }).toArray()
      const times = bookings.map((b: any) => b.time).filter((t: string) => typeof t === "string")
      return NextResponse.json({ ok: true, date, times }, { status: 200 })
    }

    return NextResponse.json({ error: "Missing date or month" }, { status: 400 })
  } catch (err) {
    console.error("/api/bookings GET error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}