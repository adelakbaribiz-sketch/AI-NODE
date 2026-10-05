import { cn } from "@/lib/cn";
import { DemoBadge } from "./demo-badge";

export function StatTile({
  label,
  value,
  delta,
  deltaTone = "good",
  demo = true,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "good" | "critical" | "neutral";
  demo?: boolean;
}) {
  const deltaColor =
    deltaTone === "good" ? "text-good" : deltaTone === "critical" ? "text-critical" : "text-ink-muted";

  return (
    <div className="elevated rounded-lg border border-border bg-surface-1 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</span>
        {demo && <DemoBadge />}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="tabular text-2xl font-semibold text-ink-primary">{value}</span>
        {delta && <span className={cn("tabular text-xs font-medium", deltaColor)}>{delta}</span>}
      </div>
    </div>
  );
}
