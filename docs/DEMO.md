# Demo Guide

## Run it
```bash
cd ainode/web
npm install
npm run dev
# open http://localhost:3300 (or whatever port npm prints)
```
No environment variables, database, or external account are required — see [`.env.example`](../web/.env.example) (currently empty; nothing is wired to a real service).

## Suggested walkthrough
1. **Landing page (`/`)** — problem/solution framing, marked "Prototype demo — not a live product."
2. **Onboarding (`/onboarding`)** — enter any email, click Continue. Watch the simulated account-creation steps, then land in the dashboard. No email is sent; no account is created anywhere.
3. **Dashboard (`/dashboard`)** — revenue/call charts (hover for a tooltip + crosshair), recent settlements table.
4. **Your APIs (`/dashboard/apis`)** — see published listings, then fill out "Register a new API" — submission is simulated (700ms delay, fake API key), not persisted.
5. **Marketplace (`/marketplace`)** — search and category filter (try searching "realtime" or filtering to "Vision"; try a query with no matches to see the empty state).
6. **API detail (`/marketplace/vector-embed-pro`)** — click **Try & Pay**. This runs a scripted state machine (`requesting → 402 required → signing → settled`, with a small simulated failure chance) that mirrors the x402 flow's shape — see [API_SPEC.md](API_SPEC.md). No network call is made.
7. **Feed (`/feed`)** — seeded posts; like button is optimistic local state only.
8. **Staking (`/staking`)** — pick a lock tier, enter an amount, submit — simulated confirmation, no token contract exists.
9. **Settings (`/settings`)** — static profile, guardians, and notification toggles.

## What's real vs. not (full inventory)

| Area | Status | Notes |
|---|---|---|
| UI/UX, layout, navigation, responsive behavior | **REAL** | Actually built and running. |
| Interaction states (loading, empty, error, hover, optimistic like) | **REAL** | Functional in-browser. |
| API listings, developers, transactions, feed posts, staking tiers, governance proposals | **SIMULATED** | Hand-seeded in [`lib/mock-data.ts`](../web/lib/mock-data.ts), deterministic (fixed-seed PRNG for chart series). |
| Onboarding "account creation" | **SIMULATED** | Timed UI steps; no ERC-4337 account, no bundler, no paymaster call. |
| "Try & Pay" x402 flow | **SIMULATED** | Client-side state machine mirroring the protocol shape; no signature, no network call, no settlement. |
| "Register API" / "Stake" forms | **SIMULATED** | Local state change after an artificial delay; nothing persisted, nothing sent anywhere. |
| Reputation tiers / scores | **SIMULATED (rule-based, not AI-scored)** | Flat lookup values in mock data — not computed from any real signal. See [LIMITATIONS.md](LIMITATIONS.md). |
| Smart contracts (token, staking, escrow, SBT) | **NOT IMPLEMENTED** | No contract code exists in this repo. |
| Backend services (identity, payment, metering, social, reward engine, settlement) | **NOT IMPLEMENTED** | Documented as target architecture only — see [ARCHITECTURE.md](ARCHITECTURE.md). |
| Auth / real user accounts | **NOT IMPLEMENTED** | Every route is publicly viewable; there is no login. |
| Financial projections in the original dossier | **PROPOSED (unvalidated brainstorm numbers)** | Never treat as forecasts — see [DOSSIER_SOURCE.md](DOSSIER_SOURCE.md) §6 and [LIMITATIONS.md](LIMITATIONS.md). |

## Demo credentials
None exist — there is no login, so there is nothing to authenticate with.
