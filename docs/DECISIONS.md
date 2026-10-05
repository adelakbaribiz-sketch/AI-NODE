# Engineering Decisions

Decisions made while turning the original brainstorm dossier ([DOSSIER_SOURCE.md](DOSSIER_SOURCE.md)) into this demo. Each entry: what was decided, why, and what it trades off.

## D1 — Frontend-heavy demo, no backend
**Decision:** build a fully client-rendered demo on mock data instead of a partial backend.
**Why:** an unfinished microservices backend can't be demoed and doesn't make the product legible; a polished, honest frontend can. See [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).
**Trade-off:** nothing persists, there's no real payment or contract logic to inspect. Documented explicitly everywhere via the `DemoBadge` component and this docs suite.

## D2 — Dark-mode only, no light theme
**Decision:** ship one theme, not a light/dark toggle.
**Why:** the domain (agent payment infra, ledgers, exchanges) conventionally reads as a dark technical surface (Bloomberg terminals, most crypto exchanges, trading dashboards). Building and validating a second, fully accessible light palette against the dataviz skill's contrast/CVD checks would have doubled design-system work for a demo that doesn't need it.
**Trade-off:** no light-mode users; revisit if this becomes a real product with broader audience research.

## D3 — Custom "Settlement Ledger" visual identity, no UI kit
**Decision:** hand-built design tokens (dark surfaces, blue/violet/amber accent system) and hand-built components (no shadcn/MUI/Chakra), validated against the dataviz skill's palette checker.
**Why:** per the build brief, portfolio projects should not look like generic AI-generated templates, and should be visually distinct from sibling projects in this workspace.
**Trade-off:** more component code to own vs. a UI kit; acceptable for the scope built.

## D4 — Reputation is a flat lookup value, not AI-scored
**Decision:** `reputationTier`/`reputationScore` in mock data are hand-assigned, not computed.
**Why:** the dossier never named a specific NLP model, provider, or training approach for the "Reward Engine" — inventing one would be fabricating a capability that doesn't exist. Every reputation badge in the UI is tagged as a "demo reputation tier" via its tooltip.
**Trade-off:** the Reward Engine, the single most novel piece of the original concept, remains undesigned beyond the architecture sketch in [ARCHITECTURE.md](ARCHITECTURE.md).

## D5 — No chain, no stablecoin, no legal jurisdiction chosen
**Decision:** leave these as open, documented gaps rather than picking arbitrarily.
**Why:** these are not engineering-judgment calls — they carry real regulatory, cost, and liquidity consequences the original dossier itself flagged as risks (e.g., ~98% USDC dependency). Guessing would misrepresent a real decision as made.
**Trade-off:** none of the "Try & Pay" or staking flows reference a specific real chain; they're clearly synthetic.

## D6 — Financial projections excluded from the product, kept only in DOSSIER_SOURCE.md
**Decision:** the original dossier's Year 1-3 revenue/token-price projections are not repeated anywhere in the app UI or README as if they were real.
**Why:** they were unvalidated brainstorm arithmetic, not a model. Presenting them as investor-facing numbers would be exactly the kind of fabrication the build brief prohibits.
**Trade-off:** none — this is a correctness requirement, not a trade-off.

## D7 — Single Next.js app, not a monorepo
**Decision:** `ainode/web` is the only code package; `ainode/docs` holds documentation.
**Why:** no backend exists yet, so there's nothing to separate into services/packages. A monorepo structure now would be speculative scaffolding for code that doesn't exist.
**Trade-off:** revisit when/if a real backend is built (see [ARCHITECTURE.md](ARCHITECTURE.md) for suggested seams).

## D8 — Semantic, restrained elevation/3D (not app-wide)
**Decision:** added a 4-level elevation system (`--shadow-raised/elevated/floating` + `.elevated`/`.depth-btn` utility classes in `globals.css`) and applied it to exactly three places: KPI stat tiles, the Try & Pay panel, and primary buttons. Tables, forms, the feed list, and the marketplace grid stay flat on `--surface-1`.
**Why:** the upgrade brief asked for a "premium spatial" feel used *semantically* (important surfaces only), not applied uniformly — uniform depth on every card is the generic "SaaS-card-kit" look the `frontend-design` skill explicitly flags as a templated tell. Dark-mode shadows use a soft ambient cast + faint top highlight rather than a literal drop shadow, which is invisible against a near-black page.
**Trade-off:** less "wow" than decorating every surface, but keeps dense areas (tables, forms) fast and readable, per the brief's own instruction (§7/§16 of the upgrade prompt).
