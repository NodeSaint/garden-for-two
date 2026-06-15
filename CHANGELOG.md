# Changelog

All notable changes to this project are documented here.

## 2026-06-15 — first deploy (branch: `main` → GitHub Pages)

- Pushed `main` + `dev` to github.com/NodeSaint/garden-for-two (public). Live at
  https://nodesaint.github.io/garden-for-two/ via a GitHub Actions Pages workflow
  (build + deploy-pages); push to `main` redeploys. Verified live: 200, correct title,
  JS/CSS bundles load from the project subpath.

## 2026-06-15 — initial build (branch: `dev`)

- Static, backendless React + TypeScript pixel-art game; entire garden state encoded in the URL via lz-string (no backend, no login).
- Core loop: plant up to 3 flowers per turn + water to grow (seed→sprout→bud→bloom), each flower carries an ≤80-char note and remembers who planted it; tap a flower to read it.
- Three choosable sceneries: Spring Meadow, Moonlit Garden, Seaside Garden.
- 6 flower types × 6 colour palettes, rendered from in-repo pixel matrices to a scaled, pixelated canvas; sway + bloom-in animation.
- Share sheet with a safe clipboard fallback (no false "copied" on failure) + WhatsApp deep link.
- Pure model + codec fully unit-tested; component tests via Testing Library.
- End-to-end flow (create → plant → share link → reopen as recipient → plant back) verified with Playwright on **chromium and webkit** (the iOS Safari renderer, iPhone 13 viewport) with zero console errors. v1 is built and e2e-verified.
- Fix: flowers now show real planting dates — `src/App.tsx` injects a wall-clock `Date.now()` epoch at the app boundary (pure model stays deterministic via passed-in timestamps); previously `performance.now()` rendered every date as 1/1/1970.
- Cleanup: removed dead `at` param from `createGarden`, dead `now` prop from `Creator`, and unreferenced scaffold assets (`public/favicon.svg`, `public/icons.svg`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`).
- Feature: per-flower watering — tap any flower and water it from its detail dialog (only on your turn, only while it's below full bloom); the blunt "water last" button is gone.
- A11y: dialogs (`PlantPicker`, `FlowerDetail`) now close on Escape, move focus into themselves on open and restore focus to the prior element on close, and expose `aria-modal="true"`.
