import { listPosts } from "@/lib/data";
import PostList from "@/components/PostList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await listPosts();
  return (
    <>
      <h1>Latest blogs</h1>
      <p className="meta">{posts.length} {posts.length === 1 ? "post" : "posts"}</p>
      <PostList posts={posts} />
    </>
  );
}
