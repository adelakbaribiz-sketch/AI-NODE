"use client";

import { useState } from "react";
import Link from "next/link";
import { feedPosts } from "@/lib/mock-data";
import { ReputationBadge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/cn";

export function FeedList() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-3">
      {feedPosts.map((post) => {
        const isLiked = !!liked[post.id];
        return (
          <article key={post.id} className="rounded-lg border border-border bg-surface-1 p-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-xs font-medium text-ink-secondary">
                {post.authorInitials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-ink-primary">{post.author}</span>
                  <ReputationBadge tier={post.reputationTier} />
                </div>
                <span className="text-xs text-ink-muted">{formatRelativeTime(post.timestamp)}</span>
              </div>
            </div>

            <p className="mt-3 text-sm text-ink-secondary">{post.content}</p>

            {post.apiRef && (
              <Link
                href={`/marketplace/${post.apiRef}`}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-ink-secondary hover:border-border-strong hover:text-ink-primary"
              >
                View API →
              </Link>
            )}

            <div className="mt-4 flex items-center gap-5 border-t border-border pt-3 text-xs text-ink-muted">
              <button
                onClick={() => setLiked((s) => ({ ...s, [post.id]: !s[post.id] }))}
                className={cn("flex items-center gap-1.5 transition-colors duration-150", isLiked && "text-critical")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} aria-hidden="true">
                  <path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                {post.likes + (isLiked ? 1 : 0)}
              </button>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 12a8 8 0 1 1-3.2-6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M21 4v5h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {post.reposts}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 4h16v13H7l-3 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                {post.comments}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
