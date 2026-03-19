# GeeksforGeeks Campus Club — Rajalakshmi Institute of Technology (RIT)

Official website for the **GeeksforGeeks Campus Club** at **Rajalakshmi Institute of Technology (RIT)**. A student-led tech community for workshops, coding contests, hackathons, and placement preparation.

---

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**. Production build: `npm run build` (output in `frontend/dist`).

---

## Project structure

| Path | Description |
|------|-------------|
| **`frontend/`** | React + Vite app. All UI, pages, and mock data. Run and build from here. |
| **`backend/`** | Firestore rules and backend config. Deploy with Firebase CLI when ready. |

---

## Website overview

### Pages and routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Hero, what we do, key stats (as of date), upcoming events preview, resources preview, community teaser, featured stories, why join, CTAs (Join, Events). |
| `/join` | **Join** | How to join: Google Form and WhatsApp group links. Clear call-to-action for new members. |
| `/club-info` | **Club Info** | About the club, searchable team and objectives, animated stats, activities. |
| `/community` | **Community** | Full community module: leaderboards, Member of the Month, blog, participation tracker, certificates, analytics, event recommendations, gamification, and more. |
| `/events` | **Events** | Upcoming and past events with tabs, search, type filter. Event cards with poster images and links to detail. |
| `/events/:id` | **Event detail** | Single event: description, date/venue/speaker, registration link, tags. Back to Events link and poster image. |
| `/resources` | **Resources** | Curated learning resources (DSA, Web, CP, AI/ML, Careers) with category filter and search. |
| `/contact` | **Contact** | Team contacts, contact form (with success message), FAQ accordion, map embed, chatbot, social links. |
| `*` | **404** | Page not found with links to Home, Events, Contact. |

### Navigation and features

- **Navbar:** Logo (→ Home), global search (→ Community with query), links (Home, Join, Club Info, Community, Events, Resources, Contact), dark mode toggle, settings dropdown (user/Contact). Search hint: “Searches events, resources & community.”
- **Footer:** Copyright, sample data note, links (Home, Join, Events, Resources, Community, Instagram, LinkedIn, Contact), “Powered by GeeksforGeeks.”
- **Theme:** Site-wide dark mode (persisted in `localStorage`). Community module has aligned premium dark theme.
- **Data:** All content is mock data in `frontend/src/data/`. Ready to swap for API later.

---

## Tech stack

- **React** + **Vite** (TypeScript/JSX)
- **React Router** (v7-style)
- **Tailwind CSS** v4
- **Lucide React** (icons)
- Context: `SiteThemeContext`, `SearchContext`; Community has `CommunityThemeProvider`

---

## Key files

- **Entry:** `frontend/index.html` → `frontend/src/main.tsx` → `App.tsx`
- **Router & theme:** `frontend/src/App.tsx`
- **Data:** `frontend/src/data/` — `homePageData.js`, `eventsData.js` / `eventsMockData.js`, `communityMockData.ts`, `clubInfoData.js`, `resourcesData.js`, `contactData.js`
- **Layout:** `Navbar`, `Footer`, `BackToTop`, `PageLayout` (shared), `AppErrorBoundary`

---

## For evaluators and demos

- **Run:** `cd frontend && npm install && npm run dev` → http://localhost:3000
- **Demo path:** Home → Join → Events → one event detail → Back to Events → Community (try search) → Contact (submit form to see success message).
- **Dark mode:** Toggle in navbar; state persists across reloads.
- **Sample data:** Footer states “Sample data for demonstration.” Stats on Home show “As of [date]” (e.g. March 2025).

---

## Optional

- **Gemini API:** Set `GEMINI_API_KEY` in `frontend/.env.local` if using any Gemini-backed feature.
- **Firebase:** Use `backend/` and Firebase CLI for Firestore rules and deployment when connecting a real backend.

---

© 2026 GeeksforGeeks Campus Club – RIT | Official GfG Campus Chapter at Rajalakshmi Institute of Technology
