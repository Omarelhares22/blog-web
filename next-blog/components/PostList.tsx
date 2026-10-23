import Link from "next/link";
import type { Post } from "@/lib/data";
import DeleteButton from "./DeleteButton";

export default function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="empty">
        No blogs yet. <Link href="/blogs/new">Write the first one</Link>.
      </p>
    );
  }
  return (
    <ul className="posts">
      {posts.map((p) => (
        <li key={p.id}>
          <div>
            <h2><Link href={`/blogs/${p.id}`}>{p.title}</Link></h2>
            <p className="meta">
              {p.author}, {new Date(p.createdAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}
            </p>
            <p>{p.content.length > 180 ? p.content.slice(0, 180) + "…" : p.content}</p>
          </div>
          <DeleteButton id={p.id} />
        </li>
      ))}
    </ul>
  );
}
