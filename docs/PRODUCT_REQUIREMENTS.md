# Product Requirements

Status legend: `BUILT` = implemented in this demo (frontend, mock data) · `SPEC` = designed/documented but not built · `PROPOSED` = idea only, not designed in detail.

## 1. Onboarding ("invisible wallet")
- **Requirement:** A new user signs in with email/Google and gets a usable account with no seed phrase, gas, or chain-selection step.
- **Demo scope (`BUILT`):** A guided onboarding flow (email → simulated account creation → dashboard) with the "no seed phrase" value prop shown at each step. The underlying ERC-4337 account creation is **simulated client-side** — no smart contract is deployed.
- **Real-system scope (`SPEC`):** ERC-4337 smart account via a bundler/paymaster (Pimlico/Stackup), MPC or passkey key management (Web3Auth/Privy), social recovery (M-of-N guardians). See [ARCHITECTURE.md](ARCHITECTURE.md#identity).

## 2. Developer: publish an API and get paid per call
- **Requirement:** A developer registers an API, sets a price per call, and sees revenue/usage analytics.
- **Demo scope (`BUILT`):** Developer Dashboard with a mock API listing form, a mock analytics view (calls over time, revenue, latency) driven by seeded demo data, and an API key display (randomly generated, clearly a demo key).
- **Real-system scope (`SPEC`):** x402-compatible payment facilitator, EIP-3009 offchain signature collection, metering pipeline (Kafka/TimescaleDB), batch on-chain settlement. See [ARCHITECTURE.md](ARCHITECTURE.md#payments--metering).

## 3. Agent/Buyer: discover and pay for an API
- **Requirement:** A user or agent browses an API marketplace, sees live-style pricing and a reputation signal, and can "pay" for a call.
- **Demo scope (`BUILT`):** Marketplace grid with filter/search, API detail page, a "Try & Pay" interaction that runs a simulated payment (HTTP 402 → mock signature → mock settlement) and shows a realistic success/error state. No real money or crypto moves.
- **Real-system scope (`SPEC`):** Full x402 V2 flow. See [API_SPEC.md](API_SPEC.md).

## 4. Social feed and reputation
- **Requirement:** Users see an AI-curated feed of posts about APIs/agents, can interact (like/comment/repost), and developers show a reputation badge derived from real on-chain activity.
- **Demo scope (`BUILT`):** Feed with seeded demo posts, interaction UI (optimistic like/comment state, no persistence), reputation badges rendered from a mock tiering rule (documented, not AI-scored).
- **Real-system scope (`SPEC`):** Reward Engine (NLP content scoring, bot detection, on-chain reputation SBT minting). See [ARCHITECTURE.md](ARCHITECTURE.md#social--reward-engine) — no specific NLP model is committed to; this is flagged as an open decision in [LIMITATIONS.md](LIMITATIONS.md).

## 5. Staking / governance
- **Requirement:** Token holders stake for yield and vote on proposals.
- **Demo scope (`BUILT`):** Staking screen with mock APY tiers, lock-period selector, and a governance proposal list (read-only, seeded data).
- **Real-system scope (`SPEC`):** ERC-20 token + staking/reward-distribution contracts, DAO voting. Not implemented; no contract code in this repo. See [LIMITATIONS.md](LIMITATIONS.md).

## 6. Settings / account
- **Demo scope (`BUILT`):** Profile, notification preferences, connected-account display, recovery-guardian list UI (static).

## Explicit non-requirements for this build
- Real KYC/AML flow (UI shell only, no provider integration).
- Real dispute/arbitration execution (documented flow only, see [USER_FLOWS.md](USER_FLOWS.md)).
- Multi-chain switching (single simulated network in the demo).
