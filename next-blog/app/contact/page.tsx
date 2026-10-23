import { sendMessage } from "@/app/actions";

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;
  return (
    <>
      <h1>Contact us</h1>
      {sent && <p className="notice">Message sent. We will reply by email.</p>}
      {error && <p className="notice error">Fill in your name, email and message.</p>}
      <form action={sendMessage} className="form">
        <label>Name<input name="name" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Message<textarea name="message" required rows={6} /></label>
        <button type="submit" className="btn">Send message</button>
      </form>
    </>
  );
}
