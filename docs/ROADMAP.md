# Roadmap

## Current status: **Demo / Prototype**
A working, navigable frontend on synthetic data. No backend, no contracts, no users. See [DEMO.md](DEMO.md) and [LIMITATIONS.md](LIMITATIONS.md).

## Near-term (would come before any real backend work)
- [ ] Decide target chain(s) — don't build against all five from the original dossier.
- [ ] Decide stablecoin strategy (single vs. multi, given the original dossier's own USDC-concentration risk flag).
- [ ] Name a specific NLP/scoring approach for the Reward Engine, or explicitly scope it out of v1.
- [ ] Legal/entity decision before any real token or payment feature is built.
- [ ] Basic auth layer if this app is deployed anywhere beyond localhost (currently every route is public).

## Mid-term (real backend, still pre-token)
- [ ] Identity service: real ERC-4337 account creation via a bundler/paymaster.
- [ ] Payment service: real x402-compatible facilitator per [API_SPEC.md](API_SPEC.md), single chain, single stablecoin first.
- [ ] Metering + a real database backing `lib/mock-data.ts`'s shapes (see [DATA_MODEL.md](DATA_MODEL.md)).
- [ ] Replace the "Try & Pay" simulation with a real client call.

## Later (token, staking, governance, social)
- [ ] Token contract + staking contract, audited before any real value is at risk.
- [ ] Reputation SBT, once a real, published scoring method exists.
- [ ] Escrow/dispute flow (currently spec-only, see [USER_FLOWS.md](USER_FLOWS.md)).
- [ ] Social feed backed by real storage (IPFS or otherwise) and real moderation.

## Explicitly not roadmapped
Financial projections, funding targets, or team hiring plans — none of that exists yet and inventing a schedule for it here would misrepresent the project's actual stage.
