# Notebook: Next.js 16 + MongoDB blog

Pages: Home (`/`), New blog (`/blogs/new`), Blog (`/blogs/[id]`), Profile (`/profile`), About us (`/about`), Contact us (`/contact`).
Add a blog from "New blog". Remove it with "Delete" on the home page, profile page, or blog page.

## Run

1. `npm install`
2. Copy `.env.local.example` to `.env.local` and set `MONGODB_URI` (local MongoDB or Atlas).
3. `npm run dev` then open http://localhost:3000

Needs Node.js 20.9 or newer.

## MongoDB collections (created automatically)
- `posts`: title, content, author, createdAt
- `profile`: one document (`_id: "me"`) with name, email, bio
- `messages`: contact form submissions
