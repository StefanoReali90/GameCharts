# Frontend project memory

## Current application

- The navbar shows `La Spezia`; the single hamburger button opens the sidebar.
- The sidebar contains the `Leaderboard` and `Match History` pages. Each page is shown on its own, not side by side.
- The collapsed sidebar remains a narrow rail. The page starts to its right. Sidebar and page must move in sync through the shared workspace grid-column transition.
- Sidebar hover opens immediately and uses no timers. The hamburger button can also pin the sidebar open or close it.
- Sidebar links keep their expanded-state dimensions and reveal through a clip animation synchronized with the sidebar width.
- The page must not create document-level scrolling. Keep overflow within tables or page panels when needed.

## Source organization

- `src/App.jsx` owns app-level navigation state and composes the application shell.
- `src/components/` is the reusable component library. Keep shared layout components in `layout/`, the reusable title in `retrotitle/`, and feature components in `leaderboard/` and `match-history/`.
- `src/pages/` contains one folder per page: `leaderboard/` and `match-history/`. Page components compose feature components and page titles; they should not duplicate feature logic.
- `src/data/` contains mock data, and `src/utils/` contains reusable data transformations and date filtering.
- Keep file names, folders, exports, and identifiers in English. User-facing copy remains Italian unless requested otherwise.
- Keep `src/index.css` limited to global resets, NES.css, font loading, and global body styles. Place component and page styles alongside their owners.
- Keep components focused: filters own control markup, tables own table markup, and feature components coordinate state and data.

## Visual and interaction rules

- Use NES.css and `Press Start 2P` for the 8-bit retro-futuristic design.
- Keep the brand title stationary and high contrast, with a ciano neon glow matching the navbar theme. Page title frames and text shadows use a continuous ciano, yellow, red, and green gradient.
- Store the La Spezia logo at `public/images/la-spezia-logo.jpg` and use the local asset in the navbar title and browser favicon. Keep enough vertical navbar padding so the title frame does not crowd its edges.
- Use the small animated rainbow spade cursor from the centralized palette, displayed through the lightweight pointer-following cursor component on fine pointers with a short fading rainbow trail.
- Keep color tokens in `src/styles/palettes/`. Every palette must expose the same token names; import palettes in `src/index.css` and select them with the root `data-theme` attribute.
- The sidebar has centered page buttons with pixel icons and a final `Impostazioni` submenu for switching between black and white themes.
- Choosing a sidebar page closes the menu and suppresses hover reopening until the pointer leaves the rail; the hamburger opens it explicitly on every page. Settings interactions keep the menu open.
- Persist theme choice in local storage because the app has no user accounts or database preferences.
- Keep component styles on palette variables; add new colors to both palette files instead of hardcoding them in component CSS.
- Use soft, blurred shadows for title frames and cards instead of offset hard duplicate outlines.
- Reuse `RetroTitle` for the navbar and page headings. Pass heading text, semantic element, and visual variant as props so every title keeps the same animated frame and rainbow text shadow.
- Every page and visual component must be responsive, mobile-first, readable, and free of horizontal overflow.
- Prefer lightweight CSS and static assets. Animate title decorations with `transform` rather than changing `background-position`; synchronize sidebar and page movement using one shared grid-column transition.
- Preserve `prefers-reduced-motion`; avoid JavaScript timers for visual transitions.
- Add page content only when requested. Keep shared components reusable and avoid duplicated styling or logic.
