import { createPost } from "@/app/actions";

export default async function NewBlog({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <h1>New blog</h1>
      {error && <p className="notice error">Add a title and some content before publishing.</p>}
      <form action={createPost} className="form">
        <label>Title<input name="title" required maxLength={150} /></label>
        <label>Content<textarea name="content" required rows={12} /></label>
        <button type="submit" className="btn">Publish</button>
      </form>
    </>
  );
}
