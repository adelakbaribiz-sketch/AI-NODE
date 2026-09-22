import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { demoDeveloperAccount } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-primary">Settings</h1>
        <p className="mt-1 text-sm text-ink-muted">Account, wallet, and recovery configuration.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <Row label="Name" value={demoDeveloperAccount.name} />
          <Row label="Email" value={demoDeveloperAccount.email} />
          <Row label="Smart account" value={demoDeveloperAccount.walletShort} mono />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social recovery guardians</CardTitle>
        </CardHeader>
        <div className="divide-y divide-border">
          {demoDeveloperAccount.guardians.map((g) => (
            <div key={g.name} className="flex items-center justify-between px-5 py-3">
              <span className="font-mono text-sm text-ink-secondary">{g.name}</span>
              <StatusBadge status={g.status === "active" ? "good" : "warning"}>{g.status}</StatusBadge>
            </div>
          ))}
        </div>
        <div className="border-t border-border px-5 py-3 text-xs text-ink-muted">
          2-of-3 guardian approval required to recover this account. Recovery execution is not implemented in this demo.
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          <Toggle label="Settlement confirmations" defaultChecked />
          <Toggle label="New feed activity from followed developers" defaultChecked />
          <Toggle label="Governance proposal reminders" />
        </CardBody>
      </Card>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-ink-muted">{label}</span>
      <span className={mono ? "font-mono text-sm text-ink-primary" : "text-sm text-ink-primary"}>{value}</span>
    </div>
  );
}

function Toggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-sm text-ink-secondary">{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-[var(--brand)]" />
    </label>
  );
}
