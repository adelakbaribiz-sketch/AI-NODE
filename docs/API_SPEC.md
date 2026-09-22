# API Specification

**Status: `SPEC` — this describes the target x402-style protocol the demo's "Try & Pay" flow imitates. No server in this repository implements it.**

## Design reference
Modeled on the x402 protocol pattern (HTTP 402 Payment Required + offchain payment authorization), as described in the original dossier. Concrete field names below are this rebuild's own proposal, not a copy of any vendor's real API — treat every shape here as a draft to validate against the actual x402 spec before implementation.

## Flow

### 1. Unpaid request
```
GET /v1/{api-slug}/call
```

### 2. Server responds 402 with a price quote
```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "price": { "amount": "0.0004", "currency": "USDC", "unit": "1K tokens" },
  "payTo": "0xFacilitatorAddress",
  "chain": "eip155:8453",
  "nonce": "b4f2...",
  "expiresAt": "2026-09-22T08:15:00Z"
}
```

### 3. Client signs an offchain authorization (EIP-3009 `transferWithAuthorization`) and retries
```http
GET /v1/{api-slug}/call
X-Payment: <base64-encoded signed authorization>
```

### 4. Server validates the signature, serves the response, and queues the authorization for batch settlement
```http
HTTP/1.1 200 OK
X-Payment-Settlement: queued
X-Settlement-Batch-Eta: 3600

{ ...api response body... }
```

### 5. Batch settlement (async, not per-call)
A batcher aggregates queued authorizations over a fixed window (dossier proposed ~1 hour), builds a Merkle tree, and submits **one** on-chain transaction per batch — see [ARCHITECTURE.md](ARCHITECTURE.md#payments--metering) for why (gas amortization).

## Error cases to design for
| Case | Response |
|---|---|
| Invalid/expired signature | `400` with `{ "error": "invalid_signature" }` |
| Insufficient authorized amount | `402` with an updated quote |
| Rate limit exceeded | `429` with `Retry-After` |
| Upstream API failure | `502`, payment **not** captured (no settlement queued) |

## What the demo actually does instead
[`try-pay-panel.tsx`](../web/app/(app)/marketplace/[slug]/try-pay-panel.tsx) renders this exact state sequence (`requesting → 402-required → signing → settled/failed`) with fixed delays and a ~12% random simulated failure, entirely in the browser. It calls no endpoint. See [DEMO.md](DEMO.md).

## Open questions before real implementation
- Which chain(s) are actually targeted for v1 (dossier lists five; none committed)?
- Facilitator: build in-house vs. integrate an existing x402 facilitator?
- Stablecoin(s) supported at launch (dossier assumed USDC-only, flagged as a risk in the original dossier's own risk table)?
