require('dotenv').config({ path: '.env.local' })
const { MongoClient } = require('mongodb')

async function main() {
  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB
  if (!uri || !dbName) throw new Error('MONGODB_URI or MONGODB_DB missing')

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  const col = db.collection('bookings')

  const result = await col.createIndex({ date: 1, time: 1 }, { unique: true, name: 'unique_date_time' })
  console.log('Index created:', result)

  await client.close()
}

main().catch((e) => {
  console.error('Create index failed:', e)
  process.exitCode = 1
})