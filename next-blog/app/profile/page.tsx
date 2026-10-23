import { getProfile, listPosts } from "@/lib/data";
import { updateProfile } from "@/app/actions";
import PostList from "@/components/PostList";

export const dynamic = "force-dynamic";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const [profile, posts] = await Promise.all([getProfile(), listPosts()]);
  const mine = profile.name ? posts.filter((p) => p.author === profile.name) : [];

  return (
    <>
      <h1>Profile</h1>
      {saved && <p className="notice">Profile saved.</p>}
      <form action={updateProfile} className="form">
        <label>Name<input name="name" defaultValue={profile.name} required maxLength={80} /></label>
        <label>Email<input name="email" type="email" defaultValue={profile.email} /></label>
        <label>Bio<textarea name="bio" rows={4} defaultValue={profile.bio} /></label>
        <button type="submit" className="btn">Save profile</button>
      </form>

      <section className="section">
        <h2>Your blogs</h2>
        {profile.name ? <PostList posts={mine} /> : <p className="empty">Save your name to publish blogs under it.</p>}
      </section>
    </>
  );
}
