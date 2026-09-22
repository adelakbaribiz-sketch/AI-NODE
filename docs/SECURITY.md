# Security

## Scope of this review
This is a static frontend demo with no backend, no auth, no database, and no real payment or contract integration. The attack surface is correspondingly small. This document covers what was checked in *this* repo, and what a real system would additionally need.

## Checked in this repo
- **Secrets:** no API keys, credentials, private keys, or `.env` files with real values are committed. [`web/.env.example`](../web/.env.example) documents variables a real deployment would need, with placeholder values only.
- **XSS:** no use of `dangerouslySetInnerHTML` anywhere in the codebase. All user-facing text is rendered through React's default JSX escaping. The one place user input is taken (onboarding email, API registration form, staking amount) is never reflected back as raw HTML.
- **Injection:** no database, no raw SQL, no server-side query construction exists to inject into.
- **File upload:** no file upload feature exists in the demo.
- **Dependency risk:** dependencies are exactly what `create-next-app` scaffolds (Next.js, React, Tailwind) plus nothing else — no third-party UI kit, no chart library, no unaudited crypto/wallet library. Run `npm audit` periodically; see [TESTING.md](TESTING.md).
- **API exposure:** there is no API route in this app (`app/api/` does not exist) — nothing to expose.
- **Sensitive data in URLs:** no personal data is ever placed in a query string or URL param.

## Explicitly out of scope (because the feature doesn't exist yet)
- Authentication / authorization — there is no login, so there is nothing to bypass, but also nothing protecting any route. **A real system must not reuse this repo's routing as-is without adding auth.**
- Smart contract security (reentrancy, access control, upgrade risk) — no contracts exist.
- Payment/signature validation — the "Try & Pay" flow is a scripted UI state machine, not a real signature verifier.
- KYC/AML data handling — no such data is collected.

## Before this becomes a real system (checklist for whoever builds the backend)
- [ ] Real auth (session or SIWE) gating every `(app)` route.
- [ ] Rate limiting at the API gateway layer (dossier proposed Kong/Traefik — not decided).
- [ ] Signature/replay-attack validation for any real x402 implementation (nonce + expiry, already sketched in [API_SPEC.md](API_SPEC.md)).
- [ ] Smart contract audit (CertiK/BlockSec were named in the original dossier as targets — no audit has happened, none can happen before contracts exist).
- [ ] Secrets management (never commit `.env`; use a secrets manager in production).
- [ ] Dependency scanning in CI once a backend with real dependencies exists.
