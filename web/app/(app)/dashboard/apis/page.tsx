import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { ReputationBadge } from "@/components/ui/badge";
import { CategoryTag } from "@/components/ui/tag";
import { DemoBadge } from "@/components/ui/demo-badge";
import { apiListings } from "@/lib/mock-data";
import { formatUsd, formatCompactNumber } from "@/lib/format";
import { RegisterApiForm } from "./register-form";

export default function ApisPage() {
  const myApis = apiListings.filter((a) => a.developer === "Redshift Labs");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-ink-primary">Your APIs</h1>
        <p className="mt-1 text-sm text-ink-muted">Manage listings, pricing, and keys for the APIs you publish.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Published listings</CardTitle>
          <DemoBadge />
        </CardHeader>
        <div className="divide-y divide-border">
          {myApis.map((api) => (
            <div key={api.slug} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink-primary">{api.name}</p>
                  <CategoryTag category={api.category} />
                  <ReputationBadge tier={api.reputationTier} score={api.reputationScore} />
                </div>
                <p className="mt-1 truncate text-sm text-ink-muted">{api.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-6 text-right">
                <div>
                  <p className="tabular text-sm font-medium text-ink-primary">{formatUsd(api.revenueLast30dUsd)}</p>
                  <p className="text-xs text-ink-muted">revenue (30d)</p>
                </div>
                <div>
                  <p className="tabular text-sm font-medium text-ink-primary">{formatCompactNumber(api.callsLast30d)}</p>
                  <p className="text-xs text-ink-muted">calls (30d)</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Register a new API</CardTitle>
        </CardHeader>
        <CardBody>
          <RegisterApiForm />
        </CardBody>
      </Card>
    </div>
  );
}
