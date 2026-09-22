import { notFound } from "next/navigation";
import Link from "next/link";
import { apiListings, seriesFor } from "@/lib/mock-data";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryTag } from "@/components/ui/tag";
import { ReputationBadge } from "@/components/ui/badge";
import { DemoBadge } from "@/components/ui/demo-badge";
import { LineChart } from "@/components/ui/line-chart";
import { formatUsd, formatCompactNumber } from "@/lib/format";
import { TryPayPanel } from "./try-pay-panel";

export function generateStaticParams() {
  return apiListings.map((a) => ({ slug: a.slug }));
}

export default async function ApiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const api = apiListings.find((a) => a.slug === slug);
  if (!api) notFound();

  const callsSeries = seriesFor(api.slug).map((p) => ({ date: p.date, value: p.calls }));

  return (
    <div className="space-y-6">
      <Link href="/marketplace" className="text-sm text-ink-muted hover:text-ink-primary">
        ← Marketplace
      </Link>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-ink-primary">{api.name}</h1>
            <CategoryTag category={api.category} />
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            by {api.developer} · <ReputationBadge tier={api.reputationTier} score={api.reputationScore} />
          </p>
          <p className="mt-3 max-w-2xl text-sm text-ink-secondary">{api.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {api.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-ink-muted">
                #{t}
              </span>
            ))}
          </div>
        </div>

        <Card className="w-full shrink-0 lg:w-80">
          <CardHeader>
            <CardTitle>Try & Pay</CardTitle>
          </CardHeader>
          <CardBody>
            <TryPayPanel pricePerCall={api.pricePerCall} priceUnit={api.priceUnit} />
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric label="Price" value={`${formatUsd(api.pricePerCall)} / ${api.priceUnit}`} demo={false} />
        <Metric label="Calls (30d)" value={formatCompactNumber(api.callsLast30d)} />
        <Metric label="Uptime" value={`${api.uptimePct}%`} />
        <Metric label="Latency p50 / p95" value={`${api.latencyMsP50}ms / ${api.latencyMsP95}ms`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Call volume (30d)</CardTitle>
          <DemoBadge />
        </CardHeader>
        <CardBody>
          <LineChart data={callsSeries} color="var(--aqua)" format="compact-number" />
        </CardBody>
      </Card>
    </div>
  );
}

function Metric({ label, value, demo = true }: { label: string; value: string; demo?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-surface-1 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-muted">{label}</span>
        {demo && <DemoBadge />}
      </div>
      <p className="tabular mt-1 text-sm font-medium text-ink-primary">{value}</p>
    </div>
  );
}
