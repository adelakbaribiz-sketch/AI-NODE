import { MarketplaceGrid } from "./marketplace-grid";

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-primary">API marketplace</h1>
        <p className="mt-1 text-sm text-ink-muted">Browse agent-callable APIs, priced per call, with a public reputation signal.</p>
      </div>
      <MarketplaceGrid />
    </div>
  );
}
