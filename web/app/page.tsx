import Link from "next/link";
import { LogoMark } from "@/components/nav/sidebar";
import { LinkButton } from "@/components/ui/button";
import { CategoryTag } from "@/components/ui/tag";
import { ReputationBadge } from "@/components/ui/badge";
import { apiListings } from "@/lib/mock-data";
import { formatUsd, formatCompactNumber } from "@/lib/format";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="font-semibold tracking-tight">AINode</span>
          </div>
          <nav className="flex items-center gap-2">
            <LinkButton href="/marketplace" variant="ghost" size="sm">
              Marketplace
            </LinkButton>
            <LinkButton href="/onboarding" size="sm">
              Get started
            </LinkButton>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 font-mono text-[11px] font-medium text-warning">
            Prototype demo — not a live product
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink-primary sm:text-5xl">
            Payment infrastructure for AI agents
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">
            Publish an API, get paid per call. Call an API, pay only for what you use. Built on x402-style
            micropayments with a public, on-chain reputation layer for developers.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <LinkButton href="/onboarding">Try the demo</LinkButton>
            <LinkButton href="/marketplace" variant="secondary">
              Browse marketplace
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-1/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-14 sm:grid-cols-3">
          <Stat label="Why it exists" value="~$0.30" caption="typical card-rail fee vs. ~$0.31 avg. AI agent payment — too expensive for micropayments" />
          <Stat label="Settlement model" value="Batched" caption="offchain signatures (EIP-3009), settled on-chain in batches to amortize gas" />
          <Stat label="Onboarding" value="No seed phrase" caption="smart accounts (ERC-4337) created behind an email sign-in" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-sm font-medium uppercase tracking-wide text-ink-muted">How it works</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Step n={1} title="Publish" desc="A developer lists an API with a price per call and description. Reputation starts unverified." />
          <Step n={2} title="Call" desc="An agent or user calls the endpoint. No payment on file → HTTP 402 with a price and signing request." />
          <Step n={3} title="Settle" desc="Signed authorizations batch into a single on-chain settlement, splitting gas across every call in the batch." />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-primary">From the marketplace</h2>
          <Link href="/marketplace" className="text-sm text-brand hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {apiListings.slice(0, 3).map((api) => (
            <Link
              key={api.slug}
              href={`/marketplace/${api.slug}`}
              className="flex flex-col rounded-lg border border-border bg-surface-1 p-5 hover:border-border-strong"
            >
              <div className="flex items-center justify-between">
                <CategoryTag category={api.category} />
                <ReputationBadge tier={api.reputationTier} />
              </div>
              <p className="mt-3 font-medium text-ink-primary">{api.name}</p>
              <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{api.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-ink-secondary">
                <span className="tabular">{formatUsd(api.pricePerCall)} / {api.priceUnit}</span>
                <span>{formatCompactNumber(api.callsLast30d)} calls</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-ink-muted sm:flex-row">
          <span>AINode — demo build. No real payments, tokens, or on-chain contracts.</span>
          <div className="flex gap-4">
            <Link href="/marketplace" className="hover:text-ink-primary">
              Marketplace
            </Link>
            <Link href="/onboarding" className="hover:text-ink-primary">
              Get started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value, caption }: { label: string; value: string; caption: string }) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink-primary">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{caption}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-1 p-5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-medium text-brand">
        {n}
      </span>
      <p className="mt-3 font-medium text-ink-primary">{title}</p>
      <p className="mt-1 text-sm text-ink-muted">{desc}</p>
    </div>
  );
}
