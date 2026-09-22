# Project Context

## What AINode is
AINode is a **demo/prototype-stage frontend product** for a proposed platform that would let AI agents pay for API access in small increments (micropayments), let developers build a public track record for the APIs they publish, and let users participate in a social feed around AI tooling. The full source concept is in [DOSSIER_SOURCE.md](DOSSIER_SOURCE.md).

## What stage this project is actually at
**Demo / Prototype.** Not MVP, not production, not funded, not customer-tested. This build exists to make the concept **legible and demonstrable** — a reviewer, investor, or hiring manager can click through real screens, real interaction states, and realistic (clearly labeled) data, and understand the product without reading a 30-page spec.

There is no live backend, no deployed smart contract, no real payment processor, and no real user data anywhere in this repository. Every number, transaction, and account shown in the UI is synthetic. See [DEMO.md](DEMO.md) for the full inventory of what's real vs. simulated.

## Why it's built this way (frontend-heavy, backend-light)
Per the engineering brief for this rebuild: for a portfolio/investor/customer-facing deliverable, the credible signal is a working, well-designed product experience — not an unfinished microservices backend that can't be demoed anyway. So this build prioritizes:
1. A real, navigable frontend with genuine UX states (loading/empty/error/success).
2. Documentation that is honest about status (spec vs. built).
3. An architecture that names exactly where a real backend, real contracts, and real integrations would attach later — without building throwaway infrastructure now.

## Who this is for
- A **technical reviewer** evaluating the product thinking and execution quality.
- A **prospective collaborator/investor** trying to understand the concept quickly.
- **Future engineering work** (by a human or an agent) that needs a grounded starting point instead of re-deriving the whole concept from a chat transcript.

## Non-goals of this build
- Not a real payment system. No real funds move anywhere in this codebase.
- Not a security-audited smart contract system — no contracts are deployed; contract *design* is documented, not implemented.
- Not a claim of product-market fit, traction, or revenue.
