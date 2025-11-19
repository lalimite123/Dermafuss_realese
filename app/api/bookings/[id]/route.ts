import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/db"
import { createHmac } from "crypto"

export const runtime = "nodejs"

function verifyToken(id: string, token: string, secret?: string) {
  if (!secret) return { ok: false, error: "Missing secret" }
  const parts = token.split(".")
  if (parts.length !== 2) return { ok: false, error: "Invalid token format" }
  const [expStr, sig] = parts
  const exp = Number(expStr)
  if (!Number.isFinite(exp)) return { ok: false, error: "Invalid exp" }
  if (Date.now() > exp) return { ok: false, error: "Token expired" }
  const payload = `${id}.${exp}`
  const expected = createHmac("sha256", secret).update(payload).digest("hex")
  if (expected !== sig) return { ok: false, error: "Bad signature" }
  return { ok: true }
}

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const url = new URL(req.url)
    const action = url.searchParams.get("action")
    const token = url.searchParams.get("token") || ""
    const { id } = await ctx.params
    const secret = process.env.BOOKINGS_CANCEL_SECRET

    if (action !== "cancel") {
      return NextResponse.json({ error: "Missing or invalid action" }, { status: 400 })
    }

    const valid = verifyToken(id, token, secret)
    if (!valid.ok) {
      return NextResponse.json({ error: valid.error || "Invalid token" }, { status: 401 })
    }

    const db = await getDb()
    const collection = db.collection("bookings")
    const _id = new ObjectId(id)
    const res = await collection.deleteOne({ _id })

    if (res.deletedCount === 0) {
      return NextResponse.json({ error: "Booking not found or already canceled" }, { status: 404 })
    }

    const html = `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Termin storniert</title></head><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;background:#f3f4f6;color:#111827;margin:0;padding:24px"><div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);overflow:hidden"><div style="padding:24px 24px 12px"><h1 style="margin:0 0 12px;font-size:20px;line-height:28px">Termin erfolgreich storniert</h1><p style="margin:0;color:#374151">Die Reservierung wurde gelöscht und der Slot ist wieder verfügbar.</p></div><div style="padding:0 24px 24px"><a href="/" style="display:inline-block;margin-top:16px;background:#111827;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:8px">Zur Startseite</a></div></div></body></html>`
    return new NextResponse(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    })
  } catch (err) {
    console.error("/api/bookings/[id] cancel error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const url = new URL(req.url)
    const token = url.searchParams.get("token") || ""
    const { id } = await ctx.params
    const secret = process.env.BOOKINGS_CANCEL_SECRET
    const valid = verifyToken(id, token, secret)
    if (!valid.ok) {
      return NextResponse.json({ error: valid.error || "Invalid token" }, { status: 401 })
    }
    const db = await getDb()
    const collection = db.collection("bookings")
    const res = await collection.deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ ok: res.deletedCount === 1 })
  } catch (err) {
    console.error("/api/bookings/[id] DELETE error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}