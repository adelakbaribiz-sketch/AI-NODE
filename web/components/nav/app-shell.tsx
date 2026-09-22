"use client";

import { useState } from "react";
import { Sidebar, LogoMark } from "./sidebar";
import { DemoBanner } from "./demo-banner";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <DemoBanner />
      <div className="flex min-h-0 flex-1">
        <Sidebar open={open} onNavigate={() => setOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3 lg:hidden">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <LogoMark size={18} />
            <span className="font-semibold tracking-tight">AINode</span>
          </div>

          <main className="min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
