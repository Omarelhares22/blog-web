import { MongoClient, Db } from "mongodb";

// Reuse one connection across hot reloads in development.
const g = globalThis as unknown as { _mongoClient?: Promise<MongoClient> };

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set. Copy .env.local.example to .env.local.");
  if (!g._mongoClient) g._mongoClient = new MongoClient(uri).connect();
  const client = await g._mongoClient;
  return client.db(process.env.MONGODB_DB || "blog");
}
