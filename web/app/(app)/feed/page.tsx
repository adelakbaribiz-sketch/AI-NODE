import { DemoBadge } from "@/components/ui/demo-badge";
import { FeedList } from "./feed-list";

export default function FeedPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink-primary">Feed</h1>
          <p className="mt-1 text-sm text-ink-muted">Updates from the developers and APIs you follow.</p>
        </div>
        <DemoBadge label="Seeded posts" />
      </div>
      <FeedList />
    </div>
  );
}
