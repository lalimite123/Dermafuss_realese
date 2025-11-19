require('dotenv').config({ path: '.env.local' })
const sgMail = require('@sendgrid/mail')

function generateICS({ uid, title, description, date, time, durationMinutes = 60, location = 'DermaFuß Praxis' }) {
  const [year, month, day] = date.split('-')
  const [hh, mm] = time.split(':')
  const startLocal = `${year}${month}${day}T${hh}${mm}00`
  const endDate = new Date(`${date}T${time}:00+01:00`)
  endDate.setMinutes(endDate.getMinutes() + durationMinutes)
  const endY = endDate.getFullYear()
  const endM = String(endDate.getMonth() + 1).padStart(2, '0')
  const endD = String(endDate.getDate()).padStart(2, '0')
  const endH = String(endDate.getHours()).padStart(2, '0')
  const endMin = String(endDate.getMinutes()).padStart(2, '0')
  const endLocal = `${endY}${endM}${endD}T${endH}${endMin}00`
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const esc = (t) => t.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DermaFuss//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Europe/Berlin:${startLocal}`,
    `DTEND;TZID=Europe/Berlin:${endLocal}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(description)}`,
    `LOCATION:${esc(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

async function main() {
  const apiKey = process.env.SENDGRID_API_KEY
  const fromEmail = process.env.BOOKINGS_FROM_EMAIL || process.env.BOOKINGS_ADMIN_EMAIL
  const adminEmail = process.env.BOOKINGS_ADMIN_EMAIL
  if (!apiKey || !fromEmail || !adminEmail) throw new Error('SENDGRID_API_KEY/BOOKINGS_FROM_EMAIL/BOOKINGS_ADMIN_EMAIL missing')

  sgMail.setApiKey(apiKey)

  const now = new Date()
  const date = now.toISOString().slice(0, 10)
  const time = '10:30'
  const subject = `Test SendGrid – ${date} ${time}`
  const html = `<p>Test d'envoi SendGrid depuis scripts/test-sendgrid.js</p><p>Date: ${date} – Heure: ${time}</p>`
  const ics = generateICS({ uid: 'test-' + Date.now(), title: 'Test DermaFuß', description: 'Email test', date, time })

  const attachments = [{ content: Buffer.from(ics).toString('base64'), filename: 'test.ics', type: 'text/calendar', disposition: 'attachment' }]

  const res = await sgMail.send({ to: adminEmail, from: fromEmail, subject, html, attachments })
  console.log('SendGrid response:', res[0].statusCode)
  console.log('Email envoyé à:', adminEmail)
}

main().catch((e) => {
  console.error('SendGrid test failed:', e)
  process.exitCode = 1
})