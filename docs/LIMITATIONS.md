# Limitations

This is the single most important document in this repo to read before treating anything here as more than it is. It lists every open decision and gap left in the original dossier, plus what this rebuild deliberately did not attempt.

## Product / business
- **No real customer, user, or revenue exists.** All figures (developer earnings, call volumes, uptime, latency) are synthetic — see [DEMO.md](DEMO.md).
- **The original dossier's financial projections (Year 1–3 revenue, token market cap) are unvalidated brainstorm numbers**, not a model, not a forecast. They should not be quoted to anyone as a real projection. See [DOSSIER_SOURCE.md](DOSSIER_SOURCE.md) §6.
- **No legal entity, jurisdiction, or compliance implementation exists.** The dossier names GENIUS Act/MiCA/KYC-AML as targets; none of that is designed here.
- **No team, no funding, no partnerships** — the dossier's mentions of x402 Foundation, Circle, Solana Foundation, Google Cloud as "partnerships" were aspirational, not real relationships.

## Technical
- **No backend, database, or deployed smart contract exists anywhere in this repo.** See [ARCHITECTURE.md](ARCHITECTURE.md) for exactly what's simulated vs. real.
- **No specific AI/NLP model is chosen for the Reward Engine.** The dossier proposed "NLP for content quality" and "bot detection" without naming a model, provider, or training data. This rebuild does not invent one — the demo's reputation tiers are a flat, hand-assigned lookup, explicitly not AI-scored (see [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md) §4).
- **No chain is committed.** The dossier lists five (Base, Solana, Polygon, Arbitrum, Linea) without a decision process.
- **No specific stablecoin risk mitigation is implemented** — the dossier's own risk table flagged ~98% USDC dependency as a risk; this rebuild doesn't solve it, only inherits the flag.
- **Data model is a first draft, not a validated schema** — see [DATA_MODEL.md](DATA_MODEL.md) for what's missing (on-chain/off-chain split, event sourcing for payments, ORM choice).
- **No auth exists.** Every route in the demo is publicly reachable; there's no session, no login, no access control.

## Design
- **Dark-mode only**, by decision, not oversight — see [DECISIONS.md](DECISIONS.md).
- **No accessibility audit beyond the dataviz-skill contrast/CVD validation on chart and status colors.** Full WCAG conformance (screen reader flows, full keyboard-nav audit beyond basic focus states) has not been tested.
- **No design tested with real users.** The visual identity and UX flow are this rebuild's own judgment call, not validated against any user research (none exists).

## Process
- This document itself should be re-read and updated any time a "gap" here gets closed — don't let it go stale.
