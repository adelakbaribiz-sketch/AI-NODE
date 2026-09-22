import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { DemoBadge } from "@/components/ui/demo-badge";
import { StatusBadge } from "@/components/ui/badge";
import { governanceProposals } from "@/lib/mock-data";
import { StakeForm } from "./stake-form";

const statusToTone = { active: "warning", passed: "good", rejected: "critical" } as const;

export default function StakingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-ink-primary">Staking & governance</h1>
        <p className="mt-1 text-sm text-ink-muted">Stake AINODE for a revenue-linked yield, or vote on protocol proposals.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stake AINODE</CardTitle>
          <DemoBadge label="No contract deployed" />
        </CardHeader>
        <CardBody>
          <StakeForm />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Governance proposals</CardTitle>
          <DemoBadge />
        </CardHeader>
        <div className="divide-y divide-border">
          {governanceProposals.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink-muted">{p.id}</span>
                  <StatusBadge status={statusToTone[p.status]}>{p.status}</StatusBadge>
                </div>
                <p className="mt-1 text-sm text-ink-primary">{p.title}</p>
              </div>
              <div className="w-32 shrink-0">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${p.votesForPct}%` }} />
                </div>
                <p className="tabular mt-1 text-right text-xs text-ink-muted">{p.votesForPct}% for</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
