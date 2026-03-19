# Community Features Module — Location & Connection

**All community features and data are in this project and connected to the website.**

## ⚠️ Do not delete — required for the site

- **Community page content:** All `.tsx` / `.ts` files in `frontend/src/components/community/` (e.g. `CommunityFeatures.tsx`, `CommunityBlog.tsx`, `ThemeContext.tsx`, etc.) are the content for the **Community** page. Removing them will make the Community page empty.
- **Site-wide mock data:** `frontend/src/data/communityMockData.ts` is used by the **whole website** (Community, Home, Events, and other pages). It must be retained; without it, pages that depend on it will be empty or break.

If your IDE or Git shows these files with a red **"D" (deleted)**, that usually means an **old path** was removed (e.g. after moving from `Geeks-for-Geeks-/` into `frontend/`). The files themselves are **still present** at the paths below. To confirm, check that `frontend/src/components/community/` and `frontend/src/data/communityMockData.ts` exist on disk.

## Where everything lives (current paths)

- **Components:** `frontend/src/components/community/`
- **Data:** `frontend/src/data/communityMockData.ts`

## How it’s connected

1. **App** (`frontend/src/App.tsx`) imports and routes:
   - `import { CommunityFeatures } from './components/community';`
   - `<Route path="/community" element={<CommunityFeatures />} />`

2. **Navbar** has a **Community** link that goes to `/community`.

3. **CommunityFeatures.tsx** imports and renders all subcomponents and uses `ThemeContext` and `communityMockData`.

4. **communityMockData.ts** is used by:
   - Home (featured events), Events, EventDetail
   - All community components (leaderboards, blog, participation, analytics, etc.)

## Files in this module (all under `frontend/src/components/community/`)

- `index.ts` — exports
- `CommunityFeatures.tsx` — main container
- `ThemeContext.tsx`, `theme.ts` — dark mode
- `DarkModeToggle.tsx`
- `ActivityFeed.tsx`, `ActivityHeatmap.tsx`, `AnalyticsStrip.tsx`, `AnalyticsSummary.tsx`
- `CertificateVerification.tsx`, `CodingProfileSummary.tsx`, `CollapsibleSection.tsx`
- `CommunityBlog.tsx`, `ContributionScoreTier.tsx`, `DepartmentLeaderboard.tsx`
- `DigitalMemberIdCard.tsx`, `EventManagementSection.tsx`, `EventRecommendations.tsx`
- `GamificationSection.tsx`, `KudosDisplay.tsx`, `Leaderboards.tsx`
- `MemberEngagement.tsx`, `MemberOfTheMonthCard.tsx`, `ParticipationTracker.tsx`
- `PersonalizedRecommendations.tsx`, `PlacementReadiness.tsx`, `ResumeAchievementProfile.tsx`
- `SearchFilterBar.tsx`, `SmartParticipationInsights.tsx`, `TopDepartmentHighlight.tsx`
- `AchievementUnlock.tsx`
- `INTEGRATION.md`

If your IDE or Git shows these files as **deleted (D)**, it is usually because they used to live under a different folder (e.g. `Geeks-for-Geeks-/`) and were moved into `frontend/`. The **live app uses the paths above**; nothing was removed from the project.
