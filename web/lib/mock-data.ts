/**
 * DEMO DATA — everything in this file is synthetic, hand-seeded or
 * deterministically generated. Nothing here comes from a real API call,
 * real payment, or real user. See docs/DEMO.md for the full inventory.
 *
 * The generator is a fixed-seed PRNG (not Math.random) so numbers are
 * stable across server/client renders and across reloads.
 */

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Category = "LLM" | "Vision" | "Speech" | "Data" | "Agent Tools";

export const categories: Category[] = ["LLM", "Vision", "Speech", "Data", "Agent Tools"];

export interface ApiListing {
  slug: string;
  name: string;
  developer: string;
  developerInitials: string;
  category: Category;
  description: string;
  pricePerCall: number;
  priceUnit: "call" | "1K tokens";
  reputationScore: number; // 0-100, demo tiering rule — see docs/PRODUCT_REQUIREMENTS.md §4
  reputationTier: "Unverified" | "Bronze" | "Silver" | "Gold" | "Platinum";
  callsLast30d: number;
  revenueLast30dUsd: number;
  uptimePct: number;
  latencyMsP50: number;
  latencyMsP95: number;
  tags: string[];
}

export const apiListings: ApiListing[] = [
  {
    slug: "vector-embed-pro",
    name: "VectorEmbed Pro",
    developer: "Lucid Systems",
    developerInitials: "LS",
    category: "LLM",
    description: "High-throughput text embedding endpoint tuned for retrieval workloads, 3072-dim output.",
    pricePerCall: 0.0004,
    priceUnit: "1K tokens",
    reputationScore: 92,
    reputationTier: "Platinum",
    callsLast30d: 4_812_300,
    revenueLast30dUsd: 1926.92,
    uptimePct: 99.97,
    latencyMsP50: 38,
    latencyMsP95: 121,
    tags: ["embeddings", "retrieval", "batch"],
  },
  {
    slug: "sentinel-vision",
    name: "Sentinel Vision",
    developer: "Northbeam AI",
    developerInitials: "NB",
    category: "Vision",
    description: "Object detection and scene classification for agent-facing camera feeds.",
    pricePerCall: 0.0021,
    priceUnit: "call",
    reputationScore: 81,
    reputationTier: "Gold",
    callsLast30d: 612_040,
    revenueLast30dUsd: 1285.28,
    uptimePct: 99.82,
    latencyMsP50: 94,
    latencyMsP95: 260,
    tags: ["object-detection", "realtime"],
  },
  {
    slug: "quickvoice-stt",
    name: "QuickVoice STT",
    developer: "Northbeam AI",
    developerInitials: "NB",
    category: "Speech",
    description: "Streaming speech-to-text with sub-200ms partial transcripts, 41 languages.",
    pricePerCall: 0.006,
    priceUnit: "1K tokens",
    reputationScore: 74,
    reputationTier: "Gold",
    callsLast30d: 233_500,
    revenueLast30dUsd: 841.6,
    uptimePct: 99.61,
    latencyMsP50: 180,
    latencyMsP95: 410,
    tags: ["speech-to-text", "streaming", "multilingual"],
  },
  {
    slug: "tabular-forecast",
    name: "Tabular Forecast",
    developer: "Redshift Labs",
    developerInitials: "RL",
    category: "Data",
    description: "Time-series forecasting endpoint for structured business metrics.",
    pricePerCall: 0.012,
    priceUnit: "call",
    reputationScore: 58,
    reputationTier: "Silver",
    callsLast30d: 41_220,
    revenueLast30dUsd: 494.64,
    uptimePct: 99.4,
    latencyMsP50: 310,
    latencyMsP95: 890,
    tags: ["forecasting", "timeseries"],
  },
  {
    slug: "agent-sandbox-exec",
    name: "Agent Sandbox Exec",
    developer: "Redshift Labs",
    developerInitials: "RL",
    category: "Agent Tools",
    description: "Ephemeral, network-isolated code execution sandbox for autonomous agent tool calls.",
    pricePerCall: 0.0009,
    priceUnit: "call",
    reputationScore: 66,
    reputationTier: "Silver",
    callsLast30d: 902_410,
    revenueLast30dUsd: 812.17,
    uptimePct: 99.55,
    latencyMsP50: 145,
    latencyMsP95: 520,
    tags: ["sandbox", "code-exec", "security"],
  },
  {
    slug: "fresh-index-search",
    name: "Fresh Index Search",
    developer: "Solace Data",
    developerInitials: "SD",
    category: "Data",
    description: "Realtime web index search API with sub-minute freshness for agent grounding.",
    pricePerCall: 0.003,
    priceUnit: "call",
    reputationScore: 39,
    reputationTier: "Bronze",
    callsLast30d: 18_940,
    revenueLast30dUsd: 56.82,
    uptimePct: 98.9,
    latencyMsP50: 260,
    latencyMsP95: 700,
    tags: ["search", "grounding", "new"],
  },
  {
    slug: "echo-image-gen",
    name: "Echo Image Gen",
    developer: "Solace Data",
    developerInitials: "SD",
    category: "Vision",
    description: "Diffusion-based image generation, agent-callable with structured JSON prompts.",
    pricePerCall: 0.018,
    priceUnit: "call",
    reputationScore: 21,
    reputationTier: "Unverified",
    callsLast30d: 1_204,
    revenueLast30dUsd: 21.67,
    uptimePct: 97.1,
    latencyMsP50: 1850,
    latencyMsP95: 3400,
    tags: ["image-gen", "new"],
  },
];

export function seriesFor(slug: string, days = 30) {
  const seed = Array.from(slug).reduce((a, c) => a + c.charCodeAt(0), 7);
  const rand = mulberry32(seed);
  const listing = apiListings.find((a) => a.slug === slug);
  const baseCalls = (listing?.callsLast30d ?? 100_000) / days;
  const basePrice = listing?.pricePerCall ?? 0.001;

  const points = [];
  let trend = 0.85;
  for (let i = days - 1; i >= 0; i--) {
    trend += (rand() - 0.45) * 0.06;
    trend = Math.max(0.55, Math.min(1.4, trend));
    const calls = Math.round(baseCalls * trend * (0.9 + rand() * 0.2));
    const revenue = calls * basePrice * (listing?.priceUnit === "1K tokens" ? 3.2 : 1);
    const date = new Date();
    date.setDate(date.getDate() - i);
    points.push({
      date: date.toISOString().slice(0, 10),
      calls,
      revenue: Math.round(revenue * 100) / 100,
    });
  }
  return points;
}

export interface Transaction {
  id: string;
  timestamp: string;
  apiSlug: string;
  buyer: string;
  amountUsd: number;
  status: "settled" | "pending" | "failed";
}

export const recentTransactions: Transaction[] = [
  { id: "tx_8f2a1c", timestamp: "2026-09-22T08:14:02Z", apiSlug: "vector-embed-pro", buyer: "agent-0x9f3e", amountUsd: 0.42, status: "settled" },
  { id: "tx_1b77de", timestamp: "2026-09-22T08:11:47Z", apiSlug: "agent-sandbox-exec", buyer: "agent-0x1a04", amountUsd: 0.09, status: "settled" },
  { id: "tx_c94a02", timestamp: "2026-09-22T08:09:15Z", apiSlug: "sentinel-vision", buyer: "agent-0x77bb", amountUsd: 2.1, status: "pending" },
  { id: "tx_33f9aa", timestamp: "2026-09-22T08:05:33Z", apiSlug: "quickvoice-stt", buyer: "agent-0xde21", amountUsd: 0.6, status: "settled" },
  { id: "tx_e10bd4", timestamp: "2026-09-22T07:58:09Z", apiSlug: "fresh-index-search", buyer: "agent-0x4c9a", amountUsd: 0.03, status: "failed" },
  { id: "tx_7a04c1", timestamp: "2026-09-22T07:52:41Z", apiSlug: "tabular-forecast", buyer: "agent-0x66f1", amountUsd: 1.2, status: "settled" },
];

export interface FeedPost {
  id: string;
  author: string;
  authorInitials: string;
  reputationTier: ApiListing["reputationTier"];
  timestamp: string;
  content: string;
  apiRef?: string;
  likes: number;
  comments: number;
  reposts: number;
}

export const feedPosts: FeedPost[] = [
  {
    id: "post_1",
    author: "Lucid Systems",
    authorInitials: "LS",
    reputationTier: "Platinum",
    timestamp: "2026-09-21T16:20:00Z",
    content: "Shipped a p50 latency drop from 61ms to 38ms on VectorEmbed Pro after moving batching upstream. Same price per call.",
    apiRef: "vector-embed-pro",
    likes: 142,
    comments: 18,
    reposts: 9,
  },
  {
    id: "post_2",
    author: "Northbeam AI",
    authorInitials: "NB",
    reputationTier: "Gold",
    timestamp: "2026-09-21T11:05:00Z",
    content: "QuickVoice STT now supports 41 languages, up from 29. Full changelog on the API page.",
    apiRef: "quickvoice-stt",
    likes: 76,
    comments: 6,
    reposts: 3,
  },
  {
    id: "post_3",
    author: "Redshift Labs",
    authorInitials: "RL",
    reputationTier: "Silver",
    timestamp: "2026-09-20T22:40:00Z",
    content: "Agent Sandbox Exec crossed 900K calls this month. Thanks to everyone routing tool-calls through us.",
    apiRef: "agent-sandbox-exec",
    likes: 54,
    comments: 4,
    reposts: 2,
  },
  {
    id: "post_4",
    author: "Solace Data",
    authorInitials: "SD",
    reputationTier: "Unverified",
    timestamp: "2026-09-20T09:12:00Z",
    content: "Just listed Echo Image Gen. First 1,000 calls at half price while we collect latency data.",
    apiRef: "echo-image-gen",
    likes: 11,
    comments: 2,
    reposts: 0,
  },
];

export interface StakingTier {
  lockDays: number;
  apyPct: number;
  minStakeAino: number;
}

export const stakingTiers: StakingTier[] = [
  { lockDays: 30, apyPct: 8, minStakeAino: 100 },
  { lockDays: 90, apyPct: 11, minStakeAino: 250 },
  { lockDays: 180, apyPct: 13.5, minStakeAino: 500 },
  { lockDays: 365, apyPct: 16, minStakeAino: 1000 },
];

export interface GovernanceProposal {
  id: string;
  title: string;
  status: "active" | "passed" | "rejected";
  votesForPct: number;
  quorumPct: number;
  endsAt: string;
}

export const governanceProposals: GovernanceProposal[] = [
  {
    id: "AIP-14",
    title: "Reduce base transaction fee from 1.5% to 1.2% for staked-tier developers",
    status: "active",
    votesForPct: 68,
    quorumPct: 42,
    endsAt: "2026-09-26T00:00:00Z",
  },
  {
    id: "AIP-13",
    title: "Add Arbitrum as a supported settlement chain",
    status: "passed",
    votesForPct: 81,
    quorumPct: 55,
    endsAt: "2026-09-10T00:00:00Z",
  },
  {
    id: "AIP-12",
    title: "Increase arbitration panel bond from 5% to 10%",
    status: "rejected",
    votesForPct: 34,
    quorumPct: 51,
    endsAt: "2026-08-28T00:00:00Z",
  },
];

export const demoDeveloperAccount = {
  name: "Demo Developer",
  email: "demo@ainode.example",
  walletShort: "ai.node/0x7f...c2",
  reputationTier: "Silver" as const,
  guardians: [
    { name: "guardian-1.eth", status: "active" as const },
    { name: "guardian-2.eth", status: "active" as const },
    { name: "backup-device", status: "pending" as const },
  ],
};
