require('dotenv').config({ path: '.env.local' })
const { MongoClient } = require('mongodb')

async function main() {
  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB
  if (!uri || !dbName) throw new Error('MONGODB_URI or MONGODB_DB missing')

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  const col = db.collection('bookings-test')

  const testDoc = {
    name: 'Test User',
    phone: '+491234567890',
    email: 'test@example.com',
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
    notes: 'Test reservation',
    createdAt: new Date(),
  }

  const insert = await col.insertOne(testDoc)
  console.log('Inserted id:', insert.insertedId.toString())

  const found = await col.findOne({ _id: insert.insertedId })
  console.log('Found doc:', { name: found.name, date: found.date, time: found.time })

  await col.deleteOne({ _id: insert.insertedId })
  console.log('Cleanup done.')

  await client.close()
  console.log('MongoDB test completed successfully.')
}

main().catch((e) => {
  console.error('MongoDB test failed:', e)
  process.exitCode = 1
})