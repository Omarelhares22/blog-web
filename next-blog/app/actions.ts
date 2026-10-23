"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/mongodb";
import { getProfile } from "@/lib/data";

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

export async function createPost(formData: FormData) {
  const title = text(formData.get("title"));
  const content = text(formData.get("content"));
  if (!title || !content) redirect("/blogs/new?error=1");

  const profile = await getProfile();
  const db = await getDb();
  await db.collection("posts").insertOne({
    title,
    content,
    author: profile.name || "Anonymous",
    createdAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath("/profile");
  redirect("/");
}

export async function deletePost(id: string) {
  if (!ObjectId.isValid(id)) return;
  const db = await getDb();
  await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/");
  revalidatePath("/profile");
}

export async function updateProfile(formData: FormData) {
  const db = await getDb();
  await db.collection<{ _id: string }>("profile").updateOne(
    { _id: "me" },
    {
      $set: {
        name: text(formData.get("name")),
        email: text(formData.get("email")),
        bio: text(formData.get("bio")),
      },
    },
    { upsert: true }
  );
  revalidatePath("/profile");
  redirect("/profile?saved=1");
}

export async function sendMessage(formData: FormData) {
  const name = text(formData.get("name"));
  const email = text(formData.get("email"));
  const message = text(formData.get("message"));
  if (!name || !email || !message) redirect("/contact?error=1");

  const db = await getDb();
  await db.collection("messages").insertOne({ name, email, message, createdAt: new Date() });
  redirect("/contact?sent=1");
}
