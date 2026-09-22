# User Flows

Flows marked `BUILT` are click-through in this repo today (see [DEMO.md](DEMO.md)); `SPEC` flows are documented for a real implementation and are not in the app.

## Onboarding — `BUILT` (simulated)
`/onboarding` → enter email → Continue → 4 timed steps (verify email, deploy smart account, sponsor gas, ready) → `/dashboard`.
Real version (`SPEC`): email/social login via Web3Auth or Privy → ERC-4337 account deployed via a bundler (Pimlico/Stackup) → paymaster sponsors first N transactions → optional guardian setup.

## Publish an API — `BUILT` (simulated)
`/dashboard/apis` → "Register a new API" form → submit → 700ms delay → demo API key shown.
Real version (`SPEC`): same form → backend validates endpoint reachability → x402 middleware config generated → signed API key issued → listing appears in marketplace after a review/verification step (not designed).

## Call and pay for an API — `BUILT` (simulated)
`/marketplace/[slug]` → "Try & Pay" → `requesting → 402 required → signing → settled (or ~12% simulated failure)`.
Real version (`SPEC`): see [API_SPEC.md](API_SPEC.md) for the actual request/response contract this imitates.

## Social interaction — `BUILT` (simulated, not persisted)
`/feed` → like a post → optimistic UI update (count increments, heart fills) → **resets on page reload**, since there's no backend to persist it.

## Staking — `BUILT` (simulated)
`/staking` → pick a lock tier → enter amount → submit → confirmation panel states no tokens actually moved.

## Governance voting — `SPEC` (read-only in demo)
Demo shows proposals with a vote-share bar; there is no vote-casting UI. Real version: connected wallet signs a vote transaction, weighted by staked balance, subject to quorum.

## Dispute resolution (escrow) — `SPEC` (not in demo at all)
From the original dossier, preserved here because it does not appear anywhere in the built demo:
1. Buyer raises a dispute within a 7-day window on an escrowed payment (>$100).
2. Escrow holds funds; both parties submit evidence.
3. An arbitration panel (Tier 4+ reputation SBT holders, bonded) reviews and votes.
4. Funds release to seller or refund to buyer per majority vote; bonds return or slash based on outcome alignment.
This entire flow needs real design work (panel selection, evidence format, vote weighting, appeal process) before it's buildable — flagged in [LIMITATIONS.md](LIMITATIONS.md).

## Social recovery — `SPEC` (static display only in demo)
`/settings` shows a guardian list read-only. Real version: account owner designates M-of-N guardians; a lost-access recovery flow requires M guardian approvals within a time-locked window before key rotation executes.
