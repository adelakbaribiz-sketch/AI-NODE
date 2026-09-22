# Changelog

## [0.1.0] — 2026-09-22 — Initial demo build
- Scaffolded Next.js 16 (App Router, TypeScript, Tailwind v4) app in `web/`.
- Designed and validated the "Settlement Ledger" dark-mode visual identity (see `docs/DECISIONS.md` D2–D3), using the dataviz skill's contrast/CVD-safe palette validator.
- Built: landing page, onboarding flow, developer dashboard (with hover-interactive charts), API management + registration form, API marketplace (search/filter/empty-state), API detail page with a simulated x402 "Try & Pay" flow, social feed, staking + governance, settings.
- Added responsive mobile navigation (slide-in drawer) after the initial fixed sidebar was found unusable at phone widths.
- Wrote full documentation suite in `docs/` (architecture, product requirements, user flows, API spec, data model, security, decisions, roadmap, limitations, demo guide, testing report).
- Fixed: font loader network dependency (switched `next/font/google` → system fonts), a header-row overflow bug on the API detail page, two ESLint errors.
- `npm run build` and `npm run lint` both pass clean.
