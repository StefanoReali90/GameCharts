# Frontend project memory

## Current application

- The app is a React + Vite single-page interface for the La Spezia game leaderboard and match history.
- The visual system is Dark Cyber/Neon Glow built with Tailwind CSS, Framer Motion, and Lucide icons. NES.css is removed.
- The app shell keeps the navbar, collapsible sidebar, and page content within the viewport. Sidebar and page width animate together.
- The page area uses `public/videos/background-loop.mp4` as a muted, looping background. It is hidden when the visitor requests reduced motion. Keep panels mostly opaque for readability while retaining their neon glow.
- `src/components/layout/OpeningVideo.jsx` shows `public/videos/entry-video.mp4` on every fresh site load at 3× speed while the app is already mounted beneath it. It fades and zooms away on video end or error, revealing the ready app; reduced-motion visitors go straight to the app. There is no skip button.
- Sidebar navigation contains only Leaderboard and Storico Match. The app uses a fixed dark theme and has no theme settings or persistence.
- Use the browser's native cursor; do not add a custom cursor component or hide the native pointer.

## Source organization

- `src/App.jsx` owns page navigation, sidebar state, and page transitions.
- `src/components/layout/` contains the navbar, sidebar, and hamburger control.
- `src/components/ui/` contains reusable cyber components such as `NeonButton`, `NeonBadge`, `NeonCard`, `NeonField`, and `NeonHeading`.
- Navbar and page titles use the same `NeonHeading` typography with the local Magic UI `AuroraText` rainbow glow. Do not add page-entry animations.
- `src/components/leaderboard/` and `src/components/match-history/` contain feature UI. Preserve their existing React state, props, filtering, sorting, and data transformations when changing presentation.
- `src/pages/` composes page-level layouts. `src/data/` holds mock data, and `src/utils/` holds data transformations.
- `src/components/layout/PageFrame.jsx` provides the shared page layout and title.
- Page titles use the larger high-contrast `page-title` treatment; the navbar's “La Spezia” heading keeps its original size.
- `src/data/mockData.json` is the single mock source for `Player`, `Game`, `Match`, and each match's `MatchResult` records. The leaderboard derives wins from `winnerIds` for the selected game and year. Match history derives its rows from the same matches.
- `src/lib/utils.ts` exports `cn`, which combines `clsx` and `tailwind-merge`.
- Keep file names, folders, and identifiers in English; user-facing copy remains Italian.

## Design and interaction rules

- Use the deep cyber background (`#050712`) with bright cyan, purple, green and rainbow accents. The three podium cards use gold, silver and bronze neon. Keep the global dark color tokens in `src/tailwind.css` and reference them from `tailwind.config.js`.
- Use Tailwind utilities for component styling and shared wrappers from `src/components/ui/`. Add reusable shadows and animations in `tailwind.config.js`.
- Use Framer Motion for short, lightweight transitions. Keep `prefers-reduced-motion` support and avoid timers for visual behavior.
- `src/hooks/useFloatingTilt.js` supplies the shared floating and pointer-driven 3D tilt for the UI surfaces; keep rotation small on tables and controls so text and scrolling remain usable.
- Keep data tables scrollable inside their panels and keep all pages responsive without document-level horizontal overflow.
- Keep the La Spezia logo at `public/images/la-spezia-logo.jpg`; use the local asset, never a machine-specific path.
- Do not reintroduce NES.css, `nes-*` classes, Press Start 2P, or pixel/8-bit styling.
