# Architecture

## What's actually running (`IMPLEMENTED`)
A single Next.js 16 (App Router, React 19, TypeScript, Tailwind v4) application in [`web/`](../web). No backend service, database, queue, or blockchain node exists in this repository.

```
Browser
  └─ Next.js app (web/)
       ├─ Server Components render pages from static, in-repo mock data (lib/mock-data.ts)
       └─ Client Components (onboarding flow, Try & Pay, forms, charts) hold local UI state only
```

Every "action" in the UI (registering an API, paying for a call, staking, creating an account) runs a client-side `setTimeout`-based simulation and never calls a network endpoint. This is intentional — see [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) for why.

## Target architecture (`SPEC` — not built)
This is the architecture the original dossier proposed, refined into named integration points. It exists so a real backend can be built against a concrete contract instead of a vague brainstorm.

```
Client Layer        Next.js app · SDK (TS/Python, not built) · Telegram Mini App (not built)
                            │
API Gateway          Rate limiting · JWT auth · x402 middleware · routing        [NOT BUILT]
                            │
        ┌───────────────────┼───────────────────┐
   Identity Svc         Payment Svc          Social Svc
   ERC-4337/6551        x402 V2 facilitator  Feed / posts / reactions
   DID/VC, passkeys     EIP-3009 batching                                        [NOT BUILT]
        │                   │                    │
   Metering Svc         Settlement Svc       Reward Engine
   Usage tracking       Escrow / batch tx    Content scoring, SBT minting        [NOT BUILT]
                            │
                    Message broker (Kafka/NATS) — NOT BUILT
                            │
        PostgreSQL · Redis · IPFS · TimescaleDB · ClickHouse · Meilisearch — NOT BUILT
                            │
        Blockchain layer: Base (primary), + others — NO CONTRACTS DEPLOYED
```

### Identity
- **Spec:** ERC-4337 smart accounts via a bundler/paymaster (Pimlico or Stackup), key management via Web3Auth/Privy (MPC or passkey), social recovery as M-of-N guardians, portable DID/VC for reputation claims.
- **Demo:** [`app/onboarding/onboarding-flow.tsx`](../web/app/onboarding/onboarding-flow.tsx) fakes the step sequence with timed UI states. No account is created anywhere.
- **Why not built:** deploying a real ERC-4337 stack requires a funded paymaster, a bundler relationship, and a chain to deploy to — none of which are decided (see [LIMITATIONS.md](LIMITATIONS.md)).

### Payments & metering
- **Spec:** x402 V2-style facilitator. A caller without a valid payment gets `HTTP 402` with a price; it signs an EIP-3009 offchain authorization; the facilitator serves the response and queues the authorization; a batcher periodically submits one on-chain settlement transaction per batch (gas amortized across N calls). See [API_SPEC.md](API_SPEC.md) for the concrete request/response shapes this implies.
- **Demo:** [`app/(app)/marketplace/[slug]/try-pay-panel.tsx`](../web/app/(app)/marketplace/[slug]/try-pay-panel.tsx) walks through the same state machine (`requesting → 402 → signing → settled/failed`) with a fixed delay and a random ~12% simulated failure rate, entirely client-side.

### Social & Reward Engine
- **Spec:** AI-scored influence (content quality via NLP, engagement depth, API usage, staking history) feeding a published on-chain reputation formula; anti-gaming via bot detection and vesting. No specific model or provider is chosen — flagged as an open decision in [LIMITATIONS.md](LIMITATIONS.md).
- **Demo:** [`lib/mock-data.ts`](../web/lib/mock-data.ts) hand-assigns a `reputationTier` per developer as a flat lookup value. It is not computed from any signal.

### Settlement / escrow, token, staking, governance
- **Spec:** optimistic escrow with bonded dispute resolution for payments over $100; ERC-20 utility token; staking contract with lock-tiered APY; DAO governance voting.
- **Demo:** [`app/(app)/staking/`](../web/app/(app)/staking) renders tiers and proposals from static mock data; "Stake" is a local state change, not a transaction.

## Where a real backend would attach
If this moves past demo stage, the natural seams are:
1. Replace `lib/mock-data.ts` reads with API calls to a real backend (same shapes, see [DATA_MODEL.md](DATA_MODEL.md)).
2. Replace `try-pay-panel.tsx`'s simulated fetch with a real x402 client call.
3. Replace `onboarding-flow.tsx`'s timed steps with a real account-abstraction SDK call (e.g. Privy + Pimlico).
4. Add auth (session or SIWE) at the `(app)` route group boundary — currently there is none; every route is publicly viewable.

## Deliberate design decisions (not gaps)
- **Dark-mode only.** Matches domain convention (trading terminals, exchanges) and avoids shipping an under-validated second palette. See [DECISIONS.md](DECISIONS.md).
- **No state persistence.** Local component state only (`useState`); nothing survives a refresh. A demo doesn't need a database to be honest about what it's demoing.
- **No auth.** Adding fake login would imply a real user system exists; it doesn't.
