export function DemoBanner() {
  return (
    <div className="flex items-center justify-center gap-2 border-b border-warning/20 bg-warning/10 px-4 py-1.5 font-mono text-[11px] text-warning">
      <svg width="10" height="10" viewBox="0 0 9 9" aria-hidden="true">
        <path d="M4.5 0 9 8H0Z" fill="currentColor" />
      </svg>
      DEMO ENVIRONMENT — no real payments, accounts, or on-chain activity. All data is synthetic.
    </div>
  );
}
