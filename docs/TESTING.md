# Testing

There is no automated test suite in this repo (no Jest/Vitest/Playwright config) — the codebase is a small, static-data-driven frontend where the highest-value check is the type checker + linter + a manual click-through, not a testing framework. This may change if a real backend is added.

## What was actually run before this repo was pushed

**Build** (`npm run build`, Next.js 16 + TypeScript):
```
✓ Compiled successfully
✓ TypeScript: no errors
✓ 18/18 routes generated (static + SSG for marketplace/[slug])
```
Result: **PASSED**

**Lint** (`npm run lint`, ESLint 9 + `eslint-config-next`):
Initial run found 2 errors (`react/no-unescaped-entities` in `not-found.tsx`). **FIXED** by escaping the apostrophes. Re-run: **PASSED, 0 problems**.

**Manual click-through** (via an in-session browser, both desktop ~1280px and mobile 375px widths):
- Landing page, onboarding flow (start → 4 simulated steps → success), dashboard (stat tiles, hover tooltips on charts), API marketplace (search, category filter, empty-state on no matches), API detail page + Try & Pay simulation (success and log rendering confirmed), feed, staking — all confirmed rendering correctly.
- **FIXED during this pass:** the API detail page's header row overflowed horizontally at desktop widths (`flex-wrap` didn't reliably wrap the Try & Pay card) — changed to an explicit `flex-col lg:flex-row` layout. Confirmed fixed at 1280px.
- **FIXED during this pass:** the app sidebar was a fixed 240px panel with no mobile treatment, unusable at phone widths — added a slide-in drawer with a hamburger toggle (`components/nav/app-shell.tsx`). Confirmed working at 375px.
- **FIXED:** `next/font/google` (Geist/Geist Mono) failed to resolve in this sandboxed dev environment (no network access to Google Fonts at request time) — switched to system font stacks, removing an external network dependency entirely.

## Remaining (not run / not applicable)
- No unit or integration test suite exists — REMAINING, not started. Would be worth adding if/when real logic (a backend, a real payment client) replaces the current simulations.
- No cross-browser testing beyond the in-session Chromium-based browser pane.
- No load/performance testing — not meaningful for a static demo.
- No accessibility audit beyond the dataviz skill's palette contrast/CVD validation (see [ARCHITECTURE.md](ARCHITECTURE.md) design notes) — a full screen-reader pass was not done.

## How to re-run these checks
```bash
cd ainode/web
npm run build   # type check + production build
npm run lint    # ESLint
npm run dev     # manual click-through at http://localhost:3000 (or your configured port)
```
