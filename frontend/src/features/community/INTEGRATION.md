# Community Features Module — Integration Guide

**GeeksforGeeks Campus Club — Rajalakshmi Institute of Technology (RIT)**

This folder is a **self-contained, plug-and-play** Community Features module. It does not modify global styles, navigation, auth, or layout of the parent site.

---

## Quick integration

### As a full page (e.g. React Router)

```tsx
import { CommunityFeatures } from '@/src/components/community';

// In your router:
<Route path="/community" element={<CommunityFeatures />} />
```

### As a section inside an existing page

```tsx
import { CommunityFeatures } from '@/src/components/community';

function YourPage() {
  return (
    <div>
      {/* Your header/nav — unchanged */}
      <main>
        <CommunityFeatures />
      </main>
    </div>
  );
}
```

---

## What’s included

| Feature | Component | Description |
|--------|-----------|-------------|
| **Participation Tracker** | `ParticipationTracker` | Student activity table/cards, search, filters, **Resume-Ready Profile** modal |
| **Department Leaderboard** | `DepartmentLeaderboard` | Department rankings by aggregated score |
| **Certificate Verification** | `CertificateVerification` | Verify certificate by ID (mock) |
| **Member of the Month** | `MemberOfTheMonthCard` | Top contributor highlight |
| **Smart Insights** | `SmartParticipationInsights` | "More active than X%", recommended events |
| **Activity Heatmap** | `ActivityHeatmap` | Contribution calendar (12 weeks) |
| **Digital Member ID** | `DigitalMemberIdCard` | Virtual ID card with mock QR |
| **Event Recommendations** | `EventRecommendations` | Personalized upcoming events |
| **Resume-Ready Profile** | `ResumeAchievementProfile` | Tier, placement, streak, certs, coding, kudos (in modal) |
| **Leaderboards** | `Leaderboards` | Tabbed: Top Coders, Most Active, Event Champions, Monthly |
| **Community Blog** | `CommunityBlog` | Article cards, categories, featured post, like/comment (mock) |
| **Member Engagement** | `MemberEngagement` | Join CTA, volunteer signup, Discord/WhatsApp/GFG links, upcoming activities, spotlight |
| **Analytics Summary** | `AnalyticsSummary` | Non-admin metrics: members, active, events, participation, growth, mini bars |
| **Global Search** | `SearchFilterBar` | Single search for students, posts, achievements (used inside `CommunityFeatures`) |
| **Gamification** | `GamificationSection` | Badges, points, streaks, recent badges |
| **Activity Feed** | `ActivityFeed` | Mock real-time feed (items rotate on timer) |
| **Top Department** | `TopDepartmentHighlight` | Highlight card for leading department |
| **Achievement toast** | `AchievementUnlock` | Unlock animation (e.g. on first visit) |
| **Recommendations** | `PersonalizedRecommendations` | Mock “For you” and career tips |

---

## Dark mode

- **Light/dark toggle** is in the **top-right of the module** (not the global navbar). It is scoped to the module container.
- **Behavior:** Instant switch, **localStorage** key `gfg-community-theme` to remember preference, **respects `prefers-color-scheme`** when no stored preference.
- **Palette:** Light = GFG-inspired (#2F8D46, #F9FAFB, #FFFFFF, #1F2937, #6B7280, #E5E7EB). **Premium Dark** = Base #0B1220, Surfaces #0F172A / #111827 / #1F2937, Accent #22C55E (hover #16A34A), Badge #4ADE80, Text #F9FAFB / #D1D5DB / #9CA3AF, Borders #374151 / #4B5563 (inputs), soft accent rgba(34,197,94,0.15).
- Theme is applied via a **class on the module root** (`.gfg-community-module.dark`). No global `body` or site-wide styles are changed.
- **Accessibility:** Toggle has `aria-label`, `title`, keyboard focus, and visible focus-visible ring. Focus styles are scoped inside the module in `index.css`.

---

## Responsive behavior

- **Desktop (≥1024px):** Multi-column layouts, full tables, expanded panels.
- **Tablet (768px–1023px):** Reduced columns, stacked sections, medium cards.
- **Mobile (<768px):** Single column, **Participation Tracker shows cards** (not table), leaderboard tabs scroll horizontally, full-width Search button, touch-friendly min heights (e.g. 44px), responsive typography. Toggle remains visible (absolute top-right of module).
- Images use `loading="lazy"`. No heavy animations; only CSS transitions for theme and interactions.

---

## Styling

- **No global CSS** is added by this module beyond a scoped **dark variant** and **focus-visible** rules for `.gfg-community-module` (see `index.css`). All component styling uses **Tailwind utility classes** and the GFG/dark palettes above.
- The root wrapper uses the class `gfg-community-module` so you can scope overrides if needed.
- Ensure your app has Tailwind (and the Vite Tailwind plugin if using Vite) so these classes apply.

---

## Data

- All data is **mock** and lives in `@/src/data/communityMockData.ts`.
- To switch to a real API later:
  1. Replace or augment the exports in `communityMockData.ts` with API calls.
  2. Pass data into the components via props or context as you prefer; the current components read from the static mock file, so you’ll refactor those imports to use your data source.

---

## Constraints respected

- Does **not** change global styles or override existing CSS.
- Does **not** add or change site navigation, headers, or footers.
- Does **not** assume a specific routing structure.
- Does **not** touch authentication or global state.
- Designed to be **self-contained** and not depend on other pages.

---

## File structure

```
src/
  components/community/
    CommunityFeatures.tsx      ← Main container (use this for integration)
    ThemeContext.tsx          ← Theme state, system preference, localStorage
    DarkModeToggle.tsx        ← Theme toggle (top-right of module)
    ParticipationTracker.tsx  ← Uses ResumeAchievementProfile in modal
    ResumeAchievementProfile.tsx
    ContributionScoreTier.tsx
    PlacementReadiness.tsx
    CodingProfileSummary.tsx
    KudosDisplay.tsx
    DepartmentLeaderboard.tsx
    CertificateVerification.tsx
    MemberOfTheMonthCard.tsx
    SmartParticipationInsights.tsx
    ActivityHeatmap.tsx
    DigitalMemberIdCard.tsx
    EventRecommendations.tsx
    Leaderboards.tsx
    CommunityBlog.tsx
    MemberEngagement.tsx
    AnalyticsSummary.tsx
    SearchFilterBar.tsx
    ActivityFeed.tsx
    GamificationSection.tsx
    TopDepartmentHighlight.tsx
    AchievementUnlock.tsx
    PersonalizedRecommendations.tsx
    index.ts
    INTEGRATION.md
  data/
    communityMockData.ts      ← STUDENTS, CERTIFICATES, CODING_PROFILES, KUDOS,
                                TIER_THRESHOLDS, PLACEMENT_THRESHOLDS, UPCOMING_EVENTS,
                                getDepartmentLeaderboard(), getHeatmapForStudent(), etc.
```

---

## Optional: use subcomponents

You can compose your own layout using individual exports:

```tsx
import {
  CommunityFeatures,        // or use individual components:
  ParticipationTracker,
  DepartmentLeaderboard,
  CertificateVerification,
  MemberOfTheMonthCard,
  SmartParticipationInsights,
  ActivityHeatmap,
  DigitalMemberIdCard,
  EventRecommendations,
  Leaderboards,
  CommunityBlog,
  MemberEngagement,
  AnalyticsSummary,
  SearchFilterBar,
  ActivityFeed,
  GamificationSection,
  TopDepartmentHighlight,
  PersonalizedRecommendations,
} from '@/src/components/community';
```

Then wire `SearchFilterBar`’s `onSearch` to your own state and pass `searchQuery` / `onSearchQueryChange` into `ParticipationTracker` and `CommunityBlog` as needed.
