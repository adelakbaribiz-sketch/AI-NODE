"use client";

import { useState } from "react";
import { LinkButton, Button } from "@/components/ui/button";
import { LogoMark } from "@/components/nav/sidebar";

type Step = "start" | "creating" | "done";

const steps = [
  { key: "identity", label: "Verifying email" },
  { key: "account", label: "Deploying smart account (ERC-4337)" },
  { key: "gas", label: "Sponsoring first transactions" },
  { key: "ready", label: "Account ready" },
];

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>("start");
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0);

  async function start() {
    setStep("creating");
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 550));
      setProgress(i + 1);
    }
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="w-full max-w-sm space-y-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-good/10 text-good">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink-primary">Your account is ready</h2>
          <p className="mt-1 text-sm text-ink-muted">
            No seed phrase, no gas, no chain selection. This is a simulated account — see docs/DEMO.md.
          </p>
        </div>
        <LinkButton href="/dashboard" className="w-full">
          Enter AINode
        </LinkButton>
      </div>
    );
  }

  if (step === "creating") {
    return (
      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-center text-lg font-semibold text-ink-primary">Setting things up…</h2>
        <div className="space-y-2.5">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-3 rounded-md border border-border bg-surface-1 px-3 py-2.5">
              {i < progress ? (
                <span className="text-good">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              ) : i === progress ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              ) : (
                <span className="h-4 w-4 rounded-full border border-border-strong" />
              )}
              <span className={i <= progress ? "text-sm text-ink-primary" : "text-sm text-ink-muted"}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-6 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-1">
        <LogoMark size={22} />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-ink-primary">Get started with AINode</h1>
        <p className="mt-1 text-sm text-ink-muted">Sign in with email. We create a smart account for you — no wallet app required.</p>
      </div>
      <form
        className="space-y-3 text-left"
        onSubmit={(e) => {
          e.preventDefault();
          start();
        }}
      >
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="input"
        />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
      <p className="text-xs text-ink-muted">This demo does not send email or create a real account.</p>
    </div>
  );
}
