require('dotenv').config({ path: '.env.local' })

async function main() {
  const baseUrl = process.env.TEST_API_BASE_URL || 'http://localhost:3000'
  const path = '/api/bookings'
  const date = new Date()
  date.setDate(date.getDate() + 1)
  const isoDate = date.toISOString().slice(0, 10)
  const payload = {
    name: 'Test API',
    phone: '+491234567890',
    email: process.env.BOOKINGS_ADMIN_EMAIL,
    date: isoDate,
    time: '09:00',
    notes: 'Test via scripts/test-api-bookings.js',
    consent: true,
  }

  const res = await fetch(baseUrl + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  console.log('Status:', res.status)
  const json = await res.json().catch(() => ({}))
  console.log('Response:', json)
}

main().catch((e) => {
  console.error('API bookings test failed:', e)
  process.exitCode = 1
})