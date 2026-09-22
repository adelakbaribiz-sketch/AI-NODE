# AINode — Original Project Dossier (Source Material)

> This file preserves the original brainstorm/dossier this project was built from, verbatim in substance. It is the **source of truth for intent**, not a spec of what has been built. Everything in this document is **PROPOSED** (i.e., an idea, not a fact) unless cross-referenced from a doc in this `docs/` folder that marks it as `IMPLEMENTED`.
>
> Origin: a team-lead brainstorming session that generated 5 crypto business ideas, then combined ideas #4 ("Crypto Payments for AI APIs") and #5 ("AI SocialFi") into a single concept named **AINode**. No code, prototype, funding, or customer existed at the time this dossier was written.

## Status legend used throughout this dossier
- **CONFIRMED** — explicitly decided by the original requester
- **PROPOSED** — suggested by the assistant, not validated
- **ASSUMED** — implied but not stated
- **UNKNOWN** — not covered
- **TODO** — needs further work before it can be trusted

## 1. Identity
AINode is a proposed Web3 platform combining AI API micropayments (via the x402 protocol) with a social network (SocialFi) where users earn rewards for content and developers build verifiable on-chain reputation. Status: **idea/concept stage**, PROPOSED.

## 2. Problem it claims to solve
- Traditional payment rails (Visa, Stripe) charge ~$0.30/transaction, uneconomical for AI agent micropayments averaging ~$0.31.
- SocialFi 1.0 (Friend.tech, early Farcaster) failed on UX complexity and speculation-first design.
- Existing infra (x402, Nevermined) is payments-only; existing InfoFi (Kaito, Cookie) is content-only with opaque scoring. No unified, transparent platform exists.

## 3. Core proposed components
- **Identity Service** — ERC-4337 smart accounts, ERC-6551 token-bound accounts, DID/VC, social recovery, passkeys ("invisible wallet": sign in with email/Google, no seed phrase).
- **Payment Service** — x402 V2-style facilitator, EIP-3009 offchain signatures batched on-chain.
- **Metering Service** — real-time usage tracking, multiple pricing models.
- **Social Service** — AI-curated feed, IPFS-backed content, likes/comments/reposts.
- **Reward Engine** — AI-scored influence (content quality, engagement, API usage, staking history), anti-gaming controls.
- **Settlement Service** — optimistic escrow with bonded dispute resolution for payments > $100.
- **AINode Token (ERC-20)** and **Reputation SBT (ERC-5192, non-transferable)**.

## 4. Personas (proposed, not validated with real users)
AI Developer, AI Agent Operator, Crypto-native User, Enterprise Client, Investor, Guardian (wallet recovery), DAO Governance Participant, Arbitration Panel Member.

## 5. Proposed tech stack
Next.js 14, TypeScript, TailwindCSS, Wagmi/Viem (frontend); NestJS, PostgreSQL, Redis, Kafka, TimescaleDB, ClickHouse, Meilisearch (backend); Base/Solana/Polygon/Arbitrum/Linea (multi-chain); Circle CCTP, Stripe/Transak, Chainalysis, Sumsub/Persona, Pimlico, Web3Auth/Privy (third-party integrations) — **none of these integrations have been wired up; this is a target-state list only.**

## 6. Business model (unvalidated projections)
Revenue streams: transaction fees (1.5%), subscriptions ($29–$499/mo), token appreciation, listing fees. Financial projections (Year 1 $230K → Year 3 $8.8M revenue, token market cap $50M → $1.5B) are **illustrative brainstorm numbers with no supporting model, market test, or committed customer** — see [LIMITATIONS.md](LIMITATIONS.md). They must never be presented as forecasts, results, or claims to an investor.

## 7. What this dossier explicitly leaves open
Full list preserved in [DECISIONS.md](DECISIONS.md) and [LIMITATIONS.md](LIMITATIONS.md): concrete data schema, specific AI/NLP models for the Reward Engine, legal entity/jurisdiction, team, exact token vesting, compliance implementation, arbitration mechanics, deployment infra, and all UI/UX (no designs existed).

## 8. What this rebuild changed
See [DECISIONS.md](DECISIONS.md) for every engineering decision made to take this from a brainstorm to a demonstrable product, and exactly what was built vs. simulated vs. left as a documented gap.
