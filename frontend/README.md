# GFG Campus Club @ RIT — Frontend

> **GeeksforGeeks Campus Club, Rajalakshmi Institute of Technology**
> A production-ready, FAANG-quality React + TypeScript platform for campus tech community management.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS v4 + Custom CSS Design System |
| Routing | React Router DOM v6 |
| Animations | Motion (formerly Framer Motion) |
| AI Features | Google Gemini API (`@google/genai`) |
| Auth | Firebase Authentication |
| Icons | Lucide React |
| Type Checking | TypeScript (strict mode, zero-error) |

---

## 📁 Project Architecture

This project follows a **Feature-Based Architecture**, the standard used by engineering teams at Google, Meta, and Microsoft.

```
frontend/
├── src/
│   ├── App.tsx                    # Root component + routing
│   ├── main.tsx                   # DOM entry point + Error Boundary
│   ├── index.css                  # Global design system (~1800 lines)
│   │
│   ├── components/
│   │   ├── layout/                # App-wide layout components
│   │   │   ├── Navbar.tsx         # Main navigation bar
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   ├── PageLayout.tsx     # Typed page wrapper (title + subtitle)
│   │   │   ├── AppErrorBoundary.tsx # Global error boundary
│   │   │   ├── BackToTop.tsx      # Scroll-to-top button
│   │   │   └── ClubInfo.tsx       # Club information page component
│   │   └── ui/                    # Atomic, reusable UI elements
│   │
│   ├── features/
│   │   └── community/             # Community module (30+ components)
│   │       ├── CommunityFeatures.tsx
│   │       ├── ParticipationTracker.tsx
│   │       ├── DigitalMemberIdCard.tsx
│   │       ├── ActivityHeatmap.tsx
│   │       ├── Leaderboards.tsx
│   │       ├── index.ts           # Public API of this feature
│   │       └── ...
│   │
│   ├── lib/
│   │   └── context/               # React context providers
│   │       ├── AuthContext.tsx    # Authentication state
│   │       ├── SearchContext.tsx  # Global search state
│   │       └── SiteThemeContext.tsx # Dark/light theme state
│   │
│   ├── pages/                     # Route-level page components
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── CommunityPage.tsx
│   │   ├── Events.tsx
│   │   ├── EventDetail.tsx
│   │   ├── Resources.tsx
│   │   ├── Contact.tsx
│   │   ├── Settings.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   ├── Join.tsx
│   │   └── NotFound.tsx
│   │
│   └── utils/
│       └── data/                  # Mock data + constants (API-ready)
│           ├── homePageData.js
│           ├── eventsData.js
│           ├── resourcesData.js
│           ├── contactData.js
│           ├── communityMockData.ts
│           └── siteConstants.js
│
├── .env.example                   # Environment variable template
├── vite.config.ts                 # Vite build config
├── tsconfig.json                  # TypeScript strict config
└── package.json
```

---

## 🛠️ Local Development

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# 3. Start the development server
npm run dev
```

Open **http://localhost:5173**

**Demo credentials:** `demo@gfg-rit.in` / `demo1234`

---

## 🏗️ Build & Deployment

```bash
# Type check (zero errors required)
npx tsc --noEmit

# Production build (output → dist/)
npm run build

# Preview the production build locally
npm run preview
```

**Deployment targets:** Vercel, Netlify, Firebase Hosting, or any static hosting platform.

For Vercel:
```bash
vercel --prod
```

For Netlify: connect the GitHub repo and set build command to `npm run build`, publish directory to `dist`.

---

## 🌐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Optional | Google Gemini API key for AI-powered features |
| `VITE_FIREBASE_API_KEY` | Optional | Firebase project API key |
| `VITE_FIREBASE_PROJECT_ID` | Optional | Firebase project ID |

Copy `.env.example` to `.env.local` and fill in your values. **Never commit `.env.local` to version control.**

---

## ✅ Production Quality Checklist

- [x] TypeScript strict mode — zero compile errors (`npx tsc --noEmit`)
- [x] Feature-Based Architecture (FAANG standard)
- [x] WCAG 2.1 AA Accessibility (focus-visible, skip-link, reduced-motion)
- [x] Liquid Glass UI with dark/light mode
- [x] Mobile-first responsive layout (12-column grid)
- [x] Global Error Boundary prevents white-screen crashes
- [x] Smooth page entry animations (respects `prefers-reduced-motion`)
- [x] Loading skeleton shimmer for async states
- [x] CSS tooltip system (keyboard-accessible)
- [x] Demo authentication flow with persistence
- [x] AI-powered community assistant (Gemini)

---

## 📋 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server on port 5173 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check without emitting files |
