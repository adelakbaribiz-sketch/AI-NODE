"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { formatUsd } from "@/lib/format";

type Step = "idle" | "requesting" | "402-required" | "signing" | "settled" | "failed";

const stepLabel: Record<Step, string> = {
  idle: "Idle",
  requesting: "Calling endpoint…",
  "402-required": "HTTP 402 Payment Required",
  signing: "Signing EIP-3009 authorization…",
  settled: "Settled — response delivered",
  failed: "Settlement failed",
};

/**
 * Simulates the x402 request/pay/retry loop described in docs/API_SPEC.md.
 * No network call is made and no signature is real — this walks through the
 * *shape* of the protocol for demo purposes only.
 */
export function TryPayPanel({ pricePerCall, priceUnit }: { pricePerCall: number; priceUnit: string }) {
  const [step, setStep] = useState<Step>("idle");
  const [log, setLog] = useState<string[]>([]);

  function pushLog(line: string) {
    setLog((prev) => [...prev, line]);
  }

  async function run() {
    setLog([]);
    setStep("requesting");
    pushLog(`GET /v1/call — no payment header`);
    await wait(500);

    setStep("402-required");
    pushLog(`← 402 Payment Required · price ${formatUsd(pricePerCall)} / ${priceUnit}`);
    await wait(700);

    setStep("signing");
    pushLog(`Wallet signs EIP-3009 transferWithAuthorization (offchain, gasless)`);
    await wait(800);

    const success = Math.random() > 0.12;
    if (success) {
      setStep("settled");
      pushLog(`GET /v1/call — X-Payment header attached`);
      pushLog(`← 200 OK · response delivered · queued for batch settlement`);
    } else {
      setStep("failed");
      pushLog(`← 400 Invalid signature (simulated failure case)`);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <StatusBadge status={step === "settled" ? "good" : step === "failed" ? "critical" : step === "idle" ? "neutral" : "warning"}>
          {stepLabel[step]}
        </StatusBadge>
        <Button size="sm" onClick={run} disabled={step !== "idle" && step !== "settled" && step !== "failed"}>
          {step === "idle" ? "Try & Pay" : "Run again"}
        </Button>
      </div>

      <div className="min-h-[104px] rounded-md border border-border bg-[#0a0c0f] p-3 font-mono text-[11px] leading-relaxed text-ink-secondary">
        {log.length === 0 ? (
          <span className="text-ink-muted">Request log will appear here.</span>
        ) : (
          log.map((line, i) => <div key={i}>{line}</div>)
        )}
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
