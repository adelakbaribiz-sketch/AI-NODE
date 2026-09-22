"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ui/badge";

export function RegisterApiForm() {
  const [submitted, setSubmitted] = useState<{ key: string } | null>(null);
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="space-y-3 rounded-md border border-good/30 bg-good/5 p-4">
        <StatusBadge status="good">Listing created (demo)</StatusBadge>
        <p className="text-sm text-ink-secondary">
          This is a simulated response — no API was actually registered. In the real system this step would deploy an
          x402 payment middleware config and issue a signed API key.
        </p>
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 font-mono text-xs text-ink-secondary">
          {submitted.key}
        </div>
        <Button variant="secondary" size="sm" onClick={() => setSubmitted(null)}>
          Register another
        </Button>
      </div>
    );
  }

  return (
    <form
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setSubmitted({ key: `ainode_sk_demo_${Math.random().toString(36).slice(2, 10)}` });
        }, 700);
      }}
    >
      <Field label="API name">
        <input required placeholder="e.g. Realtime Diarization" className="input" />
      </Field>
      <Field label="Category">
        <select required className="input" defaultValue="">
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Endpoint URL">
        <input required type="url" placeholder="https://api.yourservice.com/v1/run" className="input" />
      </Field>
      <Field label="Price per call (USD)">
        <input required type="number" min="0" step="0.0001" placeholder="0.0025" className="input" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Description">
          <textarea required rows={3} placeholder="What does this API do, and who is it for?" className="input" />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating listing…" : "Register API"}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-secondary">{label}</span>
      {children}
    </label>
  );
}
