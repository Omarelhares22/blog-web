import Link from "next/link";

export default function Navbar() {
  return (
    <header className="nav">
      <Link href="/" className="brand">Notebook</Link>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/about">About us</Link>
        <Link href="/contact">Contact us</Link>
        <Link href="/blogs/new" className="btn small">New blog</Link>
      </nav>
    </header>
  );
}
