require('dotenv').config({ path: '.env.local' })

const required = [
  'MONGODB_URI',
  'MONGODB_DB',
  'SENDGRID_API_KEY',
  'BOOKINGS_ADMIN_EMAIL',
  'BOOKINGS_FROM_EMAIL',
]

const results = required.map((k) => ({ key: k, present: !!process.env[k] }))
console.table(results)

const missing = results.filter((r) => !r.present)
if (missing.length) {
  console.error('Missing environment variables:', missing.map((m) => m.key).join(', '))
  process.exitCode = 1
} else {
  console.log('All required environment variables are present.')
}