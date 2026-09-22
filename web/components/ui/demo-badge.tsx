/**
 * The single recurring visual marker for synthetic data, used everywhere
 * mock numbers appear. Icon + label + text (never color alone), per the
 * dataviz skill's status-color rule. Hover/title explains what it means.
 */
export function DemoBadge({ label = "Demo data" }: { label?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-warning"
      title="This value is synthetic seed data, not a live measurement. See docs/DEMO.md"
    >
      <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
        <path d="M4.5 0 9 8H0Z" fill="currentColor" />
      </svg>
      {label}
    </span>
  );
}
