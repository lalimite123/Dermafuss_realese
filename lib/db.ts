import { MongoClient, Db } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb

  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB
  if (!uri || !dbName) {
    throw new Error("Missing MONGODB_URI or MONGODB_DB env variables")
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
  }

  await cachedClient.connect()
  cachedDb = cachedClient.db(dbName)
  return cachedDb
}