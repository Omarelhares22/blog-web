import { ObjectId, type Document, type WithId } from "mongodb";
import { getDb } from "./mongodb";

export type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
};

export type Profile = { name: string; bio: string; email: string };

function toPost(d: WithId<Document>): Post {
  return {
    id: d._id.toString(),
    title: d.title,
    author: d.author,
    content: d.content,
    createdAt: new Date(d.createdAt).toISOString(),
  };
}

export async function listPosts(): Promise<Post[]> {
  const db = await getDb();
  const docs = await db.collection("posts").find().sort({ createdAt: -1 }).toArray();
  return docs.map(toPost);
}

export async function getPost(id: string): Promise<Post | null> {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  const doc = await db.collection("posts").findOne({ _id: new ObjectId(id) });
  return doc ? toPost(doc) : null;
}

export async function getProfile(): Promise<Profile> {
  const db = await getDb();
  const doc = await db.collection<{ _id: string } & Profile>("profile").findOne({ _id: "me" });
  return { name: doc?.name ?? "", bio: doc?.bio ?? "", email: doc?.email ?? "" };
}
