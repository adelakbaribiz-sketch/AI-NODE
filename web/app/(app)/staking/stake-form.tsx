"use client";

import { useState } from "react";
import { stakingTiers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export function StakeForm() {
  const [tierIdx, setTierIdx] = useState(1);
  const [amount, setAmount] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const tier = stakingTiers[tierIdx];

  if (confirmed) {
    return (
      <div className="space-y-2 rounded-md border border-good/30 bg-good/5 p-4">
        <StatusBadge status="good">Stake simulated</StatusBadge>
        <p className="text-sm text-ink-secondary">
          {amount || "0"} AINODE locked for {tier.lockDays} days at {tier.apyPct}% APY. No tokens actually moved — this
          demo has no deployed token contract.
        </p>
        <Button variant="secondary" size="sm" onClick={() => setConfirmed(false)}>
          Reset
        </Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setConfirmed(true);
      }}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stakingTiers.map((t, i) => (
          <button
            type="button"
            key={t.lockDays}
            onClick={() => setTierIdx(i)}
            className={cn(
              "rounded-md border px-3 py-2.5 text-left transition-colors duration-150",
              i === tierIdx ? "border-brand/40 bg-brand/10" : "border-border hover:bg-surface-2"
            )}
          >
            <p className="text-sm font-medium text-ink-primary">{t.lockDays}d</p>
            <p className="tabular text-xs text-good">{t.apyPct}% APY</p>
          </button>
        ))}
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-ink-secondary">Amount to stake (AINODE)</span>
        <input
          required
          type="number"
          min={tier.minStakeAino}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`min. ${tier.minStakeAino}`}
          className="input"
        />
      </label>

      <Button type="submit">Stake (demo)</Button>
    </form>
  );
}
