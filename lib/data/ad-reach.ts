import type { SupabaseClient } from "@supabase/supabase-js";

const MODEL = {
  // Web inventory assumptions
  blogSlotsPerPost: 3,
  feedAdFrequency: 3, // every 3 feed cards, 1 ad
  // Forecast assumptions
  feedViewFactor: 42,
  blogViewFactor: 24,
  seoOrganicBoostMin: 0.12,
  seoOrganicBoostMax: 0.4,
  uniqueRate: 0.64,
  webLeadRate: 0.14,
  socialClickRate: 0.011,
  seoClickRate: 0.018,
} as const;

export type SlotSummary = {
  slot: "top" | "middle" | "bottom";
  impressions: number;
  clicks: number;
  ctr: number;
};

export type SocialMetricRow = {
  id: string;
  platform_name: string;
  handle: string | null;
  follower_count: number;
  monthly_reach: number;
  engagement_rate: number;
  estimated_lead_rate: number;
  is_active: boolean;
  sort_order: number;
};

export type AdReachSummary = {
  publishedBlogCount: number;
  feedContentCount: number;
  activeSlotCapacity: number;
  potentialAdInventory: number;
  last30Impressions: number;
  last30Clicks: number;
  ctr: number;
  estimatedUniqueUsers: number;
  estimatedMonthlyReach: number;
  estimatedPotentialLeads: number;
  indexedContentCount: number;
  last30SeoContentCount: number;
  slotSummary: SlotSummary[];
};

function safeNum(v: unknown): number {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export async function getAdReachSummary(supabase: SupabaseClient): Promise<AdReachSummary> {
  const sinceIso = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [{ count: publishedBlogCount }, { count: last30SeoContentCount }, { data: events }, { data: blogs }] =
    await Promise.all([
      supabase
        .from("firm_blog_posts")
        .select("id", { count: "exact", head: true })
        .eq("status", "published")
        .not("published_at", "is", null),
      supabase
        .from("firm_blog_posts")
        .select("id", { count: "exact", head: true })
        .eq("status", "published")
        .not("published_at", "is", null)
        .gte("published_at", sinceIso),
      supabase
        .from("blog_ad_events")
        .select("event_type,slot_position,created_at")
        .gte("created_at", sinceIso),
      supabase
        .from("firm_blog_posts")
        .select("category_id,related_countries,related_visa_types")
        .eq("status", "published")
        .not("published_at", "is", null)
        .limit(3000),
    ]);

  const slotAgg: Record<"top" | "middle" | "bottom", { impressions: number; clicks: number }> = {
    top: { impressions: 0, clicks: 0 },
    middle: { impressions: 0, clicks: 0 },
    bottom: { impressions: 0, clicks: 0 },
  };
  let last30Impressions = 0;
  let last30Clicks = 0;
  for (const e of events ?? []) {
    if (e.event_type === "impression") last30Impressions += 1;
    if (e.event_type === "click") last30Clicks += 1;
    const slot = e.slot_position as "top" | "middle" | "bottom";
    if (slotAgg[slot]) {
      if (e.event_type === "impression") slotAgg[slot].impressions += 1;
      if (e.event_type === "click") slotAgg[slot].clicks += 1;
    }
  }
  const slotSummary: SlotSummary[] = (["top", "middle", "bottom"] as const).map((slot) => ({
    slot,
    impressions: slotAgg[slot].impressions,
    clicks: slotAgg[slot].clicks,
    ctr: slotAgg[slot].impressions > 0 ? (slotAgg[slot].clicks / slotAgg[slot].impressions) * 100 : 0,
  }));

  const blogCount = safeNum(publishedBlogCount);
  const feedContentCount = blogCount; // Akışın yayın kaynağı şu an blog içerikleridir.
  const blogSlotInventory = blogCount * MODEL.blogSlotsPerPost;
  const feedSlotInventory = Math.floor(feedContentCount / MODEL.feedAdFrequency);
  const activeSlotCapacity = blogSlotInventory + feedSlotInventory;

  const categorySet = new Set<string>();
  const countrySet = new Set<string>();
  const visaSet = new Set<string>();
  for (const b of blogs ?? []) {
    if (b.category_id) categorySet.add(String(b.category_id));
    for (const c of (b.related_countries as string[] | null) ?? []) countrySet.add(String(c));
    for (const v of (b.related_visa_types as string[] | null) ?? []) visaSet.add(String(v));
  }
  const clusterDensity = Math.min(
    MODEL.seoOrganicBoostMax,
    MODEL.seoOrganicBoostMin + (categorySet.size + countrySet.size + visaSet.size) / 300
  );

  const fallbackImpressions =
    feedContentCount * MODEL.feedViewFactor + blogSlotInventory * MODEL.blogViewFactor;
  const modeledImpressions = Math.max(last30Impressions, Math.round(fallbackImpressions));
  const ctr = modeledImpressions > 0 ? (last30Clicks / modeledImpressions) * 100 : 0;
  const seoOrganicReach = Math.round(modeledImpressions * clusterDensity);
  const estimatedMonthlyReach = modeledImpressions + seoOrganicReach;
  const estimatedUniqueUsers = Math.round(estimatedMonthlyReach * MODEL.uniqueRate);
  const inferredClicks =
    last30Clicks > 0 ? last30Clicks : Math.round(estimatedMonthlyReach * 0.012);
  const estimatedPotentialLeads = Math.round(inferredClicks * MODEL.webLeadRate);

  return {
    publishedBlogCount: blogCount,
    feedContentCount,
    activeSlotCapacity,
    potentialAdInventory: activeSlotCapacity,
    last30Impressions: modeledImpressions,
    last30Clicks: inferredClicks,
    ctr,
    estimatedUniqueUsers,
    estimatedMonthlyReach,
    estimatedPotentialLeads,
    indexedContentCount: blogCount,
    last30SeoContentCount: safeNum(last30SeoContentCount),
    slotSummary,
  };
}

export function getSocialSummary(metrics: SocialMetricRow[]) {
  const active = metrics.filter((m) => m.is_active);
  const totalFollowers = active.reduce((sum, m) => sum + safeNum(m.follower_count), 0);
  const totalReach = active.reduce((sum, m) => sum + safeNum(m.monthly_reach), 0);
  const estimatedClicks = Math.round(totalReach * MODEL.socialClickRate);
  const weightedLeadRate =
    active.length > 0
      ? active.reduce((sum, m) => sum + safeNum(m.estimated_lead_rate), 0) / active.length
      : 1.7;
  const estimatedLeads = Math.round(estimatedClicks * (weightedLeadRate / 100));
  return {
    totalFollowers,
    totalReach,
    estimatedClicks,
    estimatedLeads,
  };
}

