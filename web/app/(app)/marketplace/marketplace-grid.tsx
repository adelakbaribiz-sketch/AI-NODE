"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { apiListings, categories, type Category } from "@/lib/mock-data";
import { CategoryTag } from "@/components/ui/tag";
import { ReputationBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatUsd, formatCompactNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

export function MarketplaceGrid() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const filtered = useMemo(() => {
    return apiListings.filter((api) => {
      const matchesCategory = activeCategory === "All" || api.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        api.name.toLowerCase().includes(query.toLowerCase()) ||
        api.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search APIs or tags…"
            className="input pl-8"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-150",
                activeCategory === c
                  ? "border-brand/40 bg-brand/10 text-brand"
                  : "border-border text-ink-secondary hover:bg-surface-2"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No APIs match your search" description="Try a different keyword or clear the category filter." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((api) => (
            <Link
              key={api.slug}
              href={`/marketplace/${api.slug}`}
              className="group flex flex-col rounded-lg border border-border bg-surface-1 p-5 transition-colors duration-150 hover:border-border-strong"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-2 text-xs font-medium text-ink-secondary">
                  {api.developerInitials}
                </div>
                <ReputationBadge tier={api.reputationTier} />
              </div>
              <p className="mt-3 font-medium text-ink-primary group-hover:text-brand">{api.name}</p>
              <p className="text-xs text-ink-muted">{api.developer}</p>
              <p className="mt-2 line-clamp-2 text-sm text-ink-secondary">{api.description}</p>
              <div className="mt-3">
                <CategoryTag category={api.category} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                <span className="tabular text-ink-primary">
                  {formatUsd(api.pricePerCall)} / {api.priceUnit}
                </span>
                <span className="text-ink-muted">{formatCompactNumber(api.callsLast30d)} calls · 30d</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
