import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { StatTile } from "@/components/ui/stat-tile";
import { LineChart } from "@/components/ui/line-chart";
import { StatusBadge } from "@/components/ui/badge";
import { DemoBadge } from "@/components/ui/demo-badge";
import { LinkButton } from "@/components/ui/button";
import { apiListings, recentTransactions, seriesFor } from "@/lib/mock-data";
import { formatUsd, formatCompactNumber, formatRelativeTime } from "@/lib/format";

export default function DashboardPage() {
  const myApis = apiListings.filter((a) => a.developer === "Redshift Labs");
  const revenue30d = myApis.reduce((s, a) => s + a.revenueLast30dUsd, 0);
  const calls30d = myApis.reduce((s, a) => s + a.callsLast30d, 0);
  const avgUptime = myApis.reduce((s, a) => s + a.uptimePct, 0) / myApis.length;

  const primary = myApis[0];
  const revenueSeries = seriesFor(primary.slug).map((p) => ({ date: p.date, value: p.revenue }));
  const callsSeries = seriesFor(primary.slug).map((p) => ({ date: p.date, value: p.calls }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink-primary">Developer dashboard</h1>
          <p className="mt-1 text-sm text-ink-muted">Revenue, usage, and settlement activity across your published APIs.</p>
        </div>
        <LinkButton href="/dashboard/apis">Manage APIs</LinkButton>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Revenue (30d)" value={formatUsd(revenue30d)} delta="+12.4%" deltaTone="good" />
        <StatTile label="API calls (30d)" value={formatCompactNumber(calls30d)} delta="+8.1%" deltaTone="good" />
        <StatTile label="Published APIs" value={String(myApis.length)} demo={false} />
        <StatTile label="Avg. uptime" value={`${avgUptime.toFixed(2)}%`} delta="-0.05pp" deltaTone="critical" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue — {primary.name} (30d)</CardTitle>
            <DemoBadge />
          </CardHeader>
          <CardBody>
            <LineChart data={revenueSeries} color="var(--brand)" format="usd-compact" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calls — {primary.name} (30d)</CardTitle>
            <DemoBadge />
          </CardHeader>
          <CardBody>
            <LineChart data={callsSeries} color="var(--aqua)" format="compact-number" />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent settlements</CardTitle>
          <DemoBadge />
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3 font-medium">Tx</th>
                <th className="px-5 py-3 font-medium">API</th>
                <th className="px-5 py-3 font-medium">Buyer</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-mono text-xs text-ink-secondary">{tx.id}</td>
                  <td className="px-5 py-3 text-ink-primary">{apiListings.find((a) => a.slug === tx.apiSlug)?.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-ink-secondary">{tx.buyer}</td>
                  <td className="tabular px-5 py-3 text-ink-primary">{formatUsd(tx.amountUsd)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={tx.status === "settled" ? "good" : tx.status === "pending" ? "warning" : "critical"}>
                      {tx.status}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-3 text-ink-muted">{formatRelativeTime(tx.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
