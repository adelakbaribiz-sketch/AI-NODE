export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="h-6 w-48 animate-pulse rounded bg-surface-2" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg border border-border bg-surface-1" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-lg border border-border bg-surface-1" />
        ))}
      </div>
    </div>
  );
}
