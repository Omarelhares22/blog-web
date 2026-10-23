import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notebook",
  description: "A simple blog built with Next.js 16 and MongoDB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer>Notebook, built with Next.js 16 and MongoDB</footer>
      </body>
    </html>
  );
}
