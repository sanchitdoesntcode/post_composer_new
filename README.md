# Ascoser — Premium Content Workspace

The real engineering build: **Vite + React + TypeScript + Redux Toolkit +
Tailwind + React Router**, following `Architecture.txt`, `State_Management.txt`,
and `design-system.md` exactly.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

```bash
npm run build      # type-checks (tsc -b) + production build
npm run preview    # serve the production build locally
npm run lint        # eslint
npm run format       # prettier
```

## Folder map

```
ascoser-app/
├── index.html                  Vite entry (fonts + #root)
├── package.json / vite.config.ts / tsconfig*.json
├── tailwind.config.ts          reads design tokens from CSS variables
├── postcss.config.js
├── .eslintrc.cjs / .prettierrc / .gitignore
│
└── src/
    ├── main.tsx                 mounts <Provider><BrowserRouter><App/></...>
    ├── app/App.tsx               applies theme to <html>, renders routes
    ├── routes/AppRoutes.tsx       "/" → LandingPage, "/app/*" → workspace pages
    ├── layouts/
    │   ├── LandingLayout.tsx
    │   └── WorkspaceLayout.tsx    Sidebar + Topbar + <Outlet/>
    ├── pages/
    │   └── LandingPage.tsx        hero, scroll-pinned 3D terminal, features, CTA
    │
    ├── components/
    │   ├── ui/                    Button, Card, Badge, Input, Textarea, Switch, IconButton
    │   ├── shared/                 EmptyState, SectionHeader, SearchInput, StatCard
    │   ├── layout/                 Sidebar, Topbar, CommandPalette
    │   └── feedback/                Toast, ToastContainer
    │
    ├── store/
    │   ├── store.ts / rootReducer.ts / hooks.ts
    │   └── uiSlice.ts + uiSelectors.ts     (theme, sidebar, command palette, toasts)
    │
    ├── features/
    │   ├── workspace/    store, selectors, hooks, components, pages
    │   ├── compose/       store, selectors, hooks, components, pages, constants (platform limits)
    │   ├── drafts/         normalized store (byId/allIds), full selector hierarchy, hooks, components, pages
    │   ├── collections/     normalized store, selectors, hooks, components, pages
    │   ├── insights/         store (raw weekly-activity sample), selectors (derived from drafts), components, pages
    │   └── settings/          store, hooks, components, pages
    │
    ├── hooks/            useTheme, useMediaQuery
    ├── types/             shared Platform/Theme types
    ├── utils/              formatDate, textStats, id
    └── styles/              tokens.css (design tokens, dark+light), globals.css
```

## What's implemented (maps to the roadmap)

- **Phase 0 — Foundation**: Vite, React, TS, Tailwind, Redux Toolkit, React
  Router, ESLint, Prettier, absolute imports (`@/*`), theme infrastructure.
- **Phase 1 — Design System**: tokens (colors, radii, spacing, motion) as CSS
  variables consumed by Tailwind; core UI components (Button, Card, Badge,
  Input, Textarea, Switch, IconButton), both themes.
- **Phase 2 — Application Shell**: landing page (hero, scroll-pinned 3D
  terminal → workspace transition, feature grid, premium strip, CTA,
  footer), glass sidebar + floating top nav, routing.
- **Phase 3 — Workspace**: welcome header, quick actions, stat cards, recent
  drafts, collections strip — all Redux-backed.
- **Phase 4 — Compose**: rich editor, platform selector with real per-platform
  character limits, live char/word/reading-time counters, hashtag manager,
  live preview panel, Redux-backed draft saving.
- **Phase 5 — Organization**: Drafts (search/filter/favorite) and
  Collections pages, normalized Redux state.
- **Phase 7 — Insights**: derived statistics selectors + weekly activity
  chart.
- **Phase 8 — Premium**: working ⌘K command palette (search, arrow-key
  navigation, actions).
- **Personalize**: dark/light theme toggle, accessibility/workspace
  preference toggles in Settings (state only — not yet wired to actual
  reduced-motion/compact-sidebar behavior).

## What's not implemented yet

- **Phase 6 — Review** (platform rules, character validation beyond the
  compose counters, content health, readability, preview modes)
- **Phase 9 — Performance** pass (React.memo/useMemo/useCallback audit,
  route-level code splitting)
- **Phase 10 — Polish** (full accessibility pass, keyboard navigation
  throughout, responsive refinement beyond Tailwind's default breakpoints)
- **Persistence** — drafts/collections/settings reset on refresh; State
  Management's Local Storage strategy isn't wired in yet
- Automated tests (none exist yet in either the roadmap or this build)

## Important: this hasn't been run

This environment has no network access, so `npm install` / `npm run build`
could not actually be executed here to verify it compiles. Every file was
checked by hand for import correctness (all `@/` imports resolve to real
files, all named imports have matching exports, all braces/parens balance),
but that's a substitute for, not equivalent to, a real `tsc` + Vite build.
**Run `npm install && npm run build` yourself as the first step** — if
anything surfaces, it'll almost certainly be a small type mismatch, not a
structural problem.

## Design system fidelity

All values in `src/styles/tokens.css` and `tailwind.config.ts` are taken
directly from `design-system.md` (colors, 24px card radius, pill buttons,
16px inputs, 28px dialogs, Space Grotesk/Inter/JetBrains Mono, 250ms
`cubic-bezier(0.4,0,0.2,1)` motion). Light mode is a distinct, fully designed
theme rather than a dark-mode inversion, per that document's Theme System
section.
