# Deployment

## Local
```bash
cd ainode/web
npm install
npm run dev
```
Opens on the port Next.js prints (this repo's own dev config in `.claude/launch.json` uses `3300` in this workspace; a fresh clone will default to `3000` unless you pass `-- --port`).

## Static/production build
```bash
cd ainode/web
npm run build
npm run start
```
This is a fully static-renderable app (every route is a Server Component reading in-repo mock data — no runtime env vars, no database). It can be deployed to any Next.js-compatible host (Vercel, Netlify, a Node server, or `next export`-style static hosting for the demo routes) with zero configuration.

## What deployment does NOT need (because it isn't real yet)
- No database connection string.
- No API keys (see [`.env.example`](../web/.env.example) — everything in it is commented out and unused).
- No smart contract addresses.

## What a real deployment would add
See [ROADMAP.md](ROADMAP.md) and [ARCHITECTURE.md](ARCHITECTURE.md) — a real backend, database, and blockchain RPC endpoints, none of which exist in this repo yet.
