# GFG Campus Club RIT — Frontend

React + Vite frontend for the GeeksforGeeks Campus Club website at Rajalakshmi Institute of Technology (RIT).

## Run locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. (Optional) Set `GEMINI_API_KEY` in `.env.local` for any Gemini-backed features
3. Start dev server: `npm run dev`

Open **http://localhost:3000**. Production build: `npm run build` (output in `dist/`).

## Structure

- **Entry:** `index.html` → `src/main.tsx` → `App.tsx`
- **Pages:** `src/pages/` (Home, Join, ClubInfo, CommunityPage, Events, EventDetail, Resources, Contact, NotFound)
- **Data:** `src/data/` — mock data; ready for API swap
- **Components:** `src/components/` (Navbar, Footer, shared, community module)

See the **root [README](../README.md)** for full project and website overview.
