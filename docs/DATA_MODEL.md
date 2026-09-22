# Data Model

**Status: `SPEC` for the real system, `IMPLEMENTED` as TypeScript interfaces for the demo's mock data.** There is no database in this repository. The interfaces below (from [`lib/mock-data.ts`](../web/lib/mock-data.ts)) are the actual shapes the UI renders today, and double as a first draft of a real schema.

## Entities implemented as mock data today

### `ApiListing`
```ts
{
  slug: string;                 // unique, URL-safe
  name: string;
  developer: string;
  category: "LLM" | "Vision" | "Speech" | "Data" | "Agent Tools";
  description: string;
  pricePerCall: number;
  priceUnit: "call" | "1K tokens";
  reputationScore: number;      // 0-100, demo tiering rule only — not computed
  reputationTier: "Unverified" | "Bronze" | "Silver" | "Gold" | "Platinum";
  callsLast30d: number;
  revenueLast30dUsd: number;
  uptimePct: number;
  latencyMsP50: number;
  latencyMsP95: number;
  tags: string[];
}
```

### `Transaction`
```ts
{ id: string; timestamp: string; apiSlug: string; buyer: string; amountUsd: number; status: "settled" | "pending" | "failed" }
```

### `FeedPost`
```ts
{ id: string; author: string; reputationTier: ...; timestamp: string; content: string; apiRef?: string; likes: number; comments: number; reposts: number }
```

### `StakingTier` / `GovernanceProposal`
See [`lib/mock-data.ts`](../web/lib/mock-data.ts) directly — both are small, self-explanatory, and not worth duplicating here.

## Entities named in the original dossier but NOT modeled anywhere (`NOT IMPLEMENTED`)
User, Smart Account, Token-Bound Account (Agent), API Call (individual, pre-aggregation), Escrow, Comment, Like (as a normalized relation), Reputation SBT, AINode Token balance, Dispute, Guardian (only a display-only static list exists in `demoDeveloperAccount`), KYC Verification.

## What a real schema needs to decide before implementation
1. **On-chain vs. off-chain split** — e.g. token balances live on-chain; does reputation score cache off-chain for query performance, with the SBT as the source of truth?
2. **Primary keys for on-chain-linked entities** — wallet address vs. an internal UUID with a wallet-address foreign key (needed to support social recovery / key rotation without orphaning history).
3. **Event sourcing vs. mutable rows for `Transaction`** — payments are naturally append-only; settlement status changes over time (pending → settled), so this needs a clear state-transition model, not a single mutable status column, once batch settlement is real.
4. **ORM/migration tooling** — not chosen (dossier mentioned TypeORM/Prisma as options, not a decision).

This is intentionally left as an open decision, not guessed at — seeing a demo through was higher priority than inventing a schema nobody has validated. See [LIMITATIONS.md](LIMITATIONS.md).
