"use client";

import { deletePost } from "@/app/actions";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deletePost.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Delete this blog? This cannot be undone.")) e.preventDefault();
      }}
    >
      <button type="submit" className="btn danger small">Delete</button>
    </form>
  );
}
