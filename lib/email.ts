import sgMail from "@sendgrid/mail"
import { generateICS } from "@/lib/ics"
import fs from "fs"
import path from "path"
import { createHmac } from "crypto"

type Booking = {
  id: string
  name: string
  phone: string
  email?: string | ""
  date: string
  time: string
  notes?: string | ""
}

export async function sendBookingEmails(booking: Booking) {
  const apiKey = process.env.SENDGRID_API_KEY
  const fromEmail = process.env.BOOKINGS_FROM_EMAIL || process.env.BOOKINGS_ADMIN_EMAIL
  const adminEmail = process.env.BOOKINGS_ADMIN_EMAIL
  if (!apiKey || !fromEmail || !adminEmail) {
    console.warn("Missing SENDGRID_API_KEY/BOOKINGS_FROM_EMAIL/BOOKINGS_ADMIN_EMAIL envs — skipping emails")
    return
  }

  sgMail.setApiKey(apiKey)

  const subject = `Neue Terminanfrage – ${booking.name} (${booking.date} ${booking.time})`
  const htmlSummaryBlock = (intro: string) => {
    return `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
        <tr><td style="padding:0 0 10px 0;color:#374151">${intro}</td></tr>
        <tr>
          <td>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px">
              <tr>
                <td style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#111827;font-weight:600">Termindetails</td>
              </tr>
              <tr><td style="padding:14px 16px;color:#111827"><strong>Name:</strong> ${booking.name}</td></tr>
              <tr><td style="padding:0 16px 14px;color:#111827"><strong>Telefon:</strong> ${booking.phone}</td></tr>
              ${booking.email ? `<tr><td style="padding:0 16px 14px;color:#111827"><strong>E‑Mail:</strong> ${booking.email}</td></tr>` : ""}
              <tr><td style="padding:0 16px 14px;color:#111827"><strong>Datum:</strong> ${booking.date}</td></tr>
              <tr><td style="padding:0 16px 16px;color:#111827"><strong>Uhrzeit:</strong> ${booking.time}</td></tr>
              ${booking.notes ? `<tr><td style=\"padding:0 16px 16px;color:#111827\"><strong>Anmerkungen:</strong> ${booking.notes}</td></tr>` : ""}
            </table>
          </td>
        </tr>
      </table>
    `
  }

  const buildHtml = (recipient: "admin" | "user") => {
    // Storno-Link (nur für Admin) mit HMAC-Token und Ablauf
    const secret = process.env.BOOKINGS_CANCEL_SECRET
    const expMs = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 Tage gültig
    const payload = `${booking.id}.${expMs}`
    const sig = secret ? createHmac("sha256", secret).update(payload).digest("hex") : ""
    const baseUrl = process.env.BOOKINGS_BASE_URL || process.env.TEST_API_BASE_URL || "http://localhost:3000"
    const cancelUrl = `${baseUrl}/api/bookings/${booking.id}?action=cancel&token=${expMs}.${sig}`

    const intro =
      recipient === "admin"
        ? "Neue Terminanfrage eingegangen."
        : "Vielen Dank für Ihre Terminanfrage. Wir melden uns zur finalen Bestätigung."
    const whatsapp =
      recipient === "user"
        ? `<p style="margin:18px 0 0;color:#374151">Sie können uns auch direkt per WhatsApp kontaktieren: <a style="color:#0ea5e9;text-decoration:none" href="https://wa.me/4915784523671">WhatsApp</a></p>`
        : ""
    const cancelBlock =
      recipient === "admin" && secret
        ? `<div style="margin-top:18px"><a href="${cancelUrl}" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:8px">Termin stornieren</a><p style="margin:8px 0 0;color:#6b7280;font-size:12px">Link gültig für 7 Tage.</p></div>`
        : ""
    return `
      <!doctype html>
      <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
        <body style="margin:0;padding:0;background:#f3f4f6">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f3f4f6">
            <tr>
              <td align="center" style="padding:24px">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#ffffff;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);overflow:hidden">
                  <tr>
                    <td style="padding:20px 24px;background:#111827;color:#ffffff" align="left">
                      <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse">
                        <tr>
                          <td style="vertical-align:middle"><img src="cid:logo" alt="DermaFuß" style="height:80px" /></td>
                          <td style="text-align:right;vertical-align:middle;font-size:14px">${booking.date} • ${booking.time}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px">
                      <h1 style="margin:0 0 12px;font-size:20px;line-height:28px;color:#111827">${recipient === "admin" ? "Termin‑Anfrage" : "Bestätigung der Terminanfrage"}</h1>
                      ${htmlSummaryBlock(intro)}
                      ${whatsapp}
                      ${cancelBlock}
                      <p style="margin:18px 0 0;color:#6b7280;font-size:12px">Anlage: Kalenderdatei (.ics) zum Hinzufügen des Termins.</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:18px;background:#f9fafb;color:#6b7280;font-size:12px">DermaFuß • Alle Rechte vorbehalten</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `
  }

  const ics = generateICS({
    uid: booking.id,
    title: "Termin bei DermaFuß",
    description: `Termin mit ${booking.name} – Telefon: ${booking.phone}${booking.notes ? ` – Notizen: ${booking.notes}` : ""}`,
    date: booking.date,
    time: booking.time,
    durationMinutes: 60,
    location: "DermaFuß Praxis",
  })

  const attachments = [
    {
      content: Buffer.from(ics).toString("base64"),
      filename: "termin.ics",
      type: "text/calendar",
      disposition: "attachment",
    },
  ]

  let logoAttachment: any | null = null
  try {
    const logoPath = process.env.BOOKINGS_LOGO_PATH || path.join(process.cwd(), "public", "kevinelogo.png")
    const logoBuffer = fs.readFileSync(logoPath)
    logoAttachment = {
      content: logoBuffer.toString("base64"),
      filename: path.basename(logoPath),
      type: "image/png",
      disposition: "inline",
      content_id: "logo",
    }
  } catch {}
  if (logoAttachment) attachments.push(logoAttachment)

  // Notify admin
  await sgMail.send({ to: adminEmail, from: fromEmail!, subject, html: buildHtml("admin"), attachments })

  // Confirm to user if email provided
  if (booking.email) {
    await sgMail.send({ to: booking.email, from: fromEmail!, subject: "Bestätigung Ihrer Terminanfrage", html: buildHtml("user"), attachments })
  }
}