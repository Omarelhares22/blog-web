import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/data";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  return (
    <article>
      <p><Link href="/">Back to all blogs</Link></p>
      <h1>{post.title}</h1>
      <p className="meta">
        {post.author}, {new Date(post.createdAt).toLocaleDateString("en-GB", { dateStyle: "long" })}
      </p>
      <div className="article-body">{post.content}</div>
      <div className="section"><DeleteButton id={post.id} /></div>
    </article>
  );
}
