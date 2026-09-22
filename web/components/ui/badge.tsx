import { cn } from "@/lib/cn";

type Status = "good" | "warning" | "serious" | "critical" | "neutral";

const statusStyles: Record<Status, string> = {
  good: "text-good border-good/30 bg-good/10",
  warning: "text-warning border-warning/30 bg-warning/10",
  serious: "text-serious border-serious/30 bg-serious/10",
  critical: "text-critical border-critical/30 bg-critical/10",
  neutral: "text-ink-secondary border-border bg-surface-2",
};

export function StatusBadge({
  status,
  children,
  icon,
}: {
  status: Status;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium",
        statusStyles[status]
      )}
    >
      {icon}
      {children}
    </span>
  );
}

const tierStyles: Record<string, string> = {
  Platinum: "text-reputation border-reputation/40 bg-reputation/10",
  Gold: "text-warning border-warning/30 bg-warning/10",
  Silver: "text-ink-secondary border-border-strong bg-surface-2",
  Bronze: "text-serious border-serious/30 bg-serious/10",
  Unverified: "text-ink-muted border-border bg-surface-1",
};

export function ReputationBadge({ tier, score }: { tier: string; score?: number }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        tierStyles[tier] ?? tierStyles.Unverified
      )}
      title="Demo reputation tier — derived from a mock scoring rule, not a real Reward Engine. See docs/PRODUCT_REQUIREMENTS.md"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <path d="M5 0 6.1 3.4 9.5 3.4 6.7 5.5 7.8 9 5 6.9 2.2 9 3.3 5.5 0.5 3.4 3.9 3.4Z" fill="currentColor" />
      </svg>
      {tier}
      {score !== undefined ? <span className="tabular opacity-70">{score}</span> : null}
    </span>
  );
}
