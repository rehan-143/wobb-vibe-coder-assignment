# Wobb Vibe Coder Assignment

**Live demo:** https://vibe-coder-assignment-five.vercel.app

An influencer search application built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:5173

> Note: `--legacy-peer-deps` is required because `react-beautiful-dnd` has a peer dependency on React 16-18, while this project uses React 19. The package itself wasn't used in the final solution and could be safely removed in a follow-up.

> For Vercel deployment, a `vercel.json` was added to ensure the install command also uses `--legacy-peer-deps`, since Vercel's build environment otherwise fails on the same peer dependency conflict.

## What I Changed

### Bug Fixes
- Fixed case-sensitivity bug in username search (search by username was case-sensitive while full name search wasn't)
- Fixed a calculation bug in the engagement rate display on the profile detail page (was multiplying by 10000 instead of using the existing `formatEngagementRate` utility, causing a 100x display error)
- Removed duplicate follower-formatting functions (`formatFollowersLocal`, `formatFollowersDetail`) and consolidated all formatting through the existing shared `utils/formatters.ts`
- Added missing `alt` text to profile images for accessibility
- Removed leftover debug code (a `data-search` DOM attribute, an unused click-counter with a stale-closure console.log)
- Added `rel="noopener noreferrer"` to external links using `target="_blank"`
- Removed unused `SearchBar.tsx` component (dead code left over from the starter; the search input was already implemented separately inside `PlatformFilter.tsx`)

### State Management
- The starter project did not contain an actual React Context implementation for the selected-list feature (despite the brief referencing replacing one) — instead, I built the state management for the "Add to List" feature from scratch directly with Zustand
- Created `src/store/selectedListStore.ts` using Zustand's `persist` middleware to automatically sync the selected list to `localStorage`, satisfying the "persistent after refresh" requirement

### Add to List Feature
- Implemented full add/remove/toggle functionality on both the search results cards and the profile detail page
- Duplicate prevention is handled in the store itself (checks by `user_id` before adding)
- Created a dedicated `/selected` route (`SelectedListPage.tsx`) to view and manage the full list, with a "Clear all" action and a live count badge in the header navigation

### UI/UX Redesign
- Replaced the original bare-bones styling with a more polished, consistent design system: rounded cards, subtle shadows, consistent spacing and typography hierarchy
- Made card widths responsive (`w-full max-w-2xl`) instead of a fixed pixel width
- Added hover states and transitions for interactive elements
- Restyled the profile detail page into a card layout with a clean stats grid

### Performance
- Memoized profile filtering and extraction with `useMemo` in `SearchPage.tsx` so they only recompute when their dependencies change, not on every render
- Wrapped `ProfileCard` in `React.memo` to avoid unnecessary re-renders when sibling cards' state changes

### Code Quality
- Removed dead/unused props (`searchQuery` was threaded through several components without being used)
- Used the functional state-update form (`setX(prev => ...)`) where relevant to avoid stale closures

## Libraries Added
- **zustand** — lightweight state management for the selected-profiles list, with built-in `persist` middleware for localStorage sync

## Assumptions
- "Persistent after page refresh" was implemented via `localStorage` (not a backend), since there's no API/database in this starter project
- Duplicate prevention is keyed on `user_id`, since that's the unique identifier provided in the data

## Trade-offs
- Did not introduce a UI component library (e.g. shadcn/ui) to keep the bundle lean and the diff focused, given the time constraints — all styling is hand-written Tailwind
- Did not add automated tests due to time constraints; manual testing was performed for the add/remove/persist/duplicate-prevention flows

## Remaining Improvements
- Add unit tests (e.g. Vitest + React Testing Library) for the Zustand store and key components
- Virtualize the profile list for better performance with larger datasets
- Add loading skeletons instead of plain "Loading..." text
- Further folder restructuring (e.g. grouping by feature rather than by type) as the codebase grows