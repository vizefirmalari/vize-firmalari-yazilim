import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export type FeedItem = {
  id: string;
  type: "blog";
  company_name: string;
  company_logo: string | null;
  company_slug: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
  like_count: number;
  is_liked: boolean;
  target_url: string;
  category_name: string | null;
  tags: string[];
  score: number;
  engagement_score: number;
  hype_score: number;
  premium_score: number;
  admin_score: number;
};

export type FeedSort = "smart" | "new" | "trending" | "top";
export type FeedQuery = {
  category?: string;
  country?: string;
  type?: "blog" | "all";
  visaType?: string;
  premium?: boolean;
  search?: string;
  sort?: FeedSort;
};

const WEIGHTS = {
  recency: 0.35,
  engagement: 0.2,
  premium: 0.15,
  hype: 0.2,
  admin: 0.1,
};

function hoursAgo(date: string): number {
  const ts = new Date(date).getTime();
  return Math.max(0, (Date.now() - ts) / (1000 * 60 * 60));
}

function clamp01(n: number): number {
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function applyAntiSpam(items: FeedItem[]): FeedItem[] {
  const out: FeedItem[] = [];
  for (const item of items) {
    const lastTwo = out.slice(-2);
    if (lastTwo.length === 2 && lastTwo.every((x) => x.company_slug === item.company_slug)) {
      const swapIndex = out.findIndex((x, i) => i > 1 && x.company_slug !== item.company_slug);
      if (swapIndex >= 0) {
        const swapped = out[swapIndex];
        out[swapIndex] = item;
        out.push(swapped);
        continue;
      }
    }
    out.push(item);
  }
  return out;
}

export async function getFeedItemsPage(
  offset: number,
  limit: number,
  query: FeedQuery = {}
): Promise<{ items: FeedItem[]; hasMore: boolean }> {
  try {
    return await computeFeedPage(offset, limit, query);
  } catch (error) {
    console.error("getFeedItemsPage error:", error);
    return { items: [], hasMore: false };
  }
}

export async function getFirmFeedItems(
  firmId: string,
  firmSlug: string,
  limit = 9
): Promise<FeedItem[]> {
  const supabase = await createSupabaseServerClient();
  const service = createSupabaseServiceRoleClient();
  const dataClient = service ?? supabase;
  if (!dataClient) return [];

  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  const { data: posts } = await dataClient
    .from("firm_blog_posts")
    .select(
      "id,title,summary,cover_image_url,published_at,company_name,company_logo_url,company_slug,slug,category_id,tags"
    )
    .eq("firm_id", firmId)
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);

  const rows = posts ?? [];
  if (rows.length === 0) return [];

  const ids = rows.map((x) => String(x.id));
  const { data: categories } = await dataClient.from("blog_categories").select("id,name");
  const categoryMap = new Map((categories ?? []).map((c) => [String(c.id), String(c.name)]));

  const { data: likeRows } = await dataClient.from("post_likes").select("post_id").in("post_id", ids);
  const likeCountMap = new Map<string, number>();
  for (const row of likeRows ?? []) {
    const key = String(row.post_id);
    likeCountMap.set(key, (likeCountMap.get(key) ?? 0) + 1);
  }

  let likedSet = new Set<string>();
  if (user?.id) {
    const { data: liked } = await dataClient
      .from("post_likes")
      .select("post_id")
      .eq("user_id", user.id)
      .in("post_id", ids);
    likedSet = new Set((liked ?? []).map((x) => String(x.post_id)));
  }

  return rows.map((row) => {
    const postId = String(row.id);
    return {
      id: postId,
      type: "blog",
      company_name: String(row.company_name ?? ""),
      company_logo: row.company_logo_url ? String(row.company_logo_url) : null,
      company_slug: String((row as { company_slug?: string | null }).company_slug ?? firmSlug),
      title: String(row.title ?? ""),
      description: String(row.summary ?? ""),
      image_url: row.cover_image_url ? String(row.cover_image_url) : null,
      created_at: String(row.published_at),
      like_count: likeCountMap.get(postId) ?? 0,
      is_liked: likedSet.has(postId),
      target_url: `/firma/${String((row as { company_slug?: string | null }).company_slug ?? firmSlug)}/blog/${String(row.slug)}`,
      category_name: row.category_id ? (categoryMap.get(String(row.category_id)) ?? null) : null,
      tags: Array.isArray((row as { tags?: string[] }).tags) ? ((row as { tags?: string[] }).tags ?? []).slice(0, 2) : [],
      score: 0,
      engagement_score: 0,
      hype_score: 0,
      premium_score: 0,
      admin_score: 0,
    };
  });
}

async function computeFeedPage(
  offset: number,
  limit: number,
  query: FeedQuery
): Promise<{ items: FeedItem[]; hasMore: boolean }> {
  try {
    const supabase = await createSupabaseServerClient();
    const service = createSupabaseServiceRoleClient();
    const dataClient = service ?? supabase;
    if (!dataClient) return { items: [], hasMore: false };

    const {
      data: { user },
    } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

    let postQuery = dataClient
      .from("firm_blog_posts")
      .select(
        "id,title,summary,cover_image_url,published_at,firm_id,company_name,company_logo_url,company_slug,slug,category_id,related_countries,related_visa_types,tags"
      )
      .eq("status", "published")
      .not("published_at", "is", null);

    if (query.category) postQuery = postQuery.eq("category_id", query.category);
    if (query.country) postQuery = postQuery.contains("related_countries", [query.country]);
    if (query.visaType) postQuery = postQuery.contains("related_visa_types", [query.visaType]);

    const { data: posts } = await postQuery
      .order("published_at", { ascending: false })
      .range(0, Math.max(50, offset + limit + 30));

    const rows = posts ?? [];
    const ids = rows.map((x) => String(x.id));
    if (ids.length === 0) return { items: [], hasMore: false };

    const { data: firms } = await dataClient
      .from("firms")
      .select("id,slug,name,logo_url,premium_badge,featured")
      .in("id", rows.map((r) => String(r.firm_id)));
    const firmMap = new Map((firms ?? []).map((f) => [String(f.id), f]));

    const { data: categories } = await dataClient
      .from("blog_categories")
      .select("id,name");
    const categoryMap = new Map((categories ?? []).map((c) => [String(c.id), String(c.name)]));

    const { data: likeRows } = await dataClient
      .from("post_likes")
      .select("post_id,created_at")
      .in("post_id", ids);
    const likeCountMap = new Map<string, number>();
    for (const row of likeRows ?? []) {
      const key = String(row.post_id);
      likeCountMap.set(key, (likeCountMap.get(key) ?? 0) + 1);
    }

    let likedSet = new Set<string>();
    if (user?.id) {
      const { data: liked } = await dataClient
        .from("post_likes")
        .select("post_id")
        .eq("user_id", user.id)
        .in("post_id", ids);
      likedSet = new Set((liked ?? []).map((x) => String(x.post_id)));
    }

    const nowIso = new Date().toISOString();
    const twoHoursAgoIso = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const fourHoursAgoIso = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString();

    const { data: clickRows } = await dataClient
      .from("post_engagement_events")
      .select("post_id,event_type,created_at")
      .in("post_id", ids)
      .gte("created_at", fourHoursAgoIso)
      .lte("created_at", nowIso);

    const clickMap = new Map<string, number>();
    const shareMap = new Map<string, number>();
    const recentTwoHourMap = new Map<string, number>();
    const previousTwoHourMap = new Map<string, number>();

    for (const row of clickRows ?? []) {
      const postId = String(row.post_id);
      if (row.event_type === "click") clickMap.set(postId, (clickMap.get(postId) ?? 0) + 1);
      if (row.event_type === "share") shareMap.set(postId, (shareMap.get(postId) ?? 0) + 1);
      const created = String(row.created_at);
      if (created >= twoHoursAgoIso) {
        const boost = row.event_type === "click" ? 3 : 4;
        recentTwoHourMap.set(postId, (recentTwoHourMap.get(postId) ?? 0) + boost);
      } else if (created >= fourHoursAgoIso) {
        const boost = row.event_type === "click" ? 3 : 4;
        previousTwoHourMap.set(postId, (previousTwoHourMap.get(postId) ?? 0) + boost);
      }
    }

    const likeRecentRows = (likeRows ?? []).filter((r) => {
      const created = (r as unknown as { created_at?: string }).created_at;
      return typeof created === "string" && created >= twoHoursAgoIso;
    });
    for (const row of likeRecentRows) {
      const postId = String(row.post_id);
      recentTwoHourMap.set(postId, (recentTwoHourMap.get(postId) ?? 0) + 2);
    }

    const items: FeedItem[] = rows.map<FeedItem>((row) => {
    const postId = String(row.id);
    const firmId = String(row.firm_id);
    const firm = firmMap.get(firmId);
    const firmSlug = String(
      (row as { company_slug?: string | null }).company_slug ?? firm?.slug ?? ""
    );
    const target_url = `/firma/${firmSlug}/blog/${String(row.slug)}`;
    const likeCount = likeCountMap.get(postId) ?? 0;
    const clickCount = clickMap.get(postId) ?? 0;
    const shareCount = shareMap.get(postId) ?? 0;
    const rawEngagement = likeCount * 1 + clickCount * 2 + shareCount * 3;
    const engagementScore = clamp01(rawEngagement / 40);
    const recencyScore = Math.exp(-hoursAgo(String(row.published_at)) / 24);
    const premiumScore = firm?.premium_badge ? 1.2 : 0;
    const adminScore = firm?.featured ? 1 : 0;
    const recent = recentTwoHourMap.get(postId) ?? 0;
    const prev = previousTwoHourMap.get(postId) ?? 0;
    const growthRate = prev > 0 ? recent / prev : recent > 0 ? 1 : 0;
    const hypeRaw = recent + growthRate;
    const hypeScore = clamp01(hypeRaw / 20);
    const score =
      WEIGHTS.recency * recencyScore +
      WEIGHTS.engagement * engagementScore +
      WEIGHTS.premium * premiumScore +
      WEIGHTS.hype * hypeScore +
      WEIGHTS.admin * adminScore;

    return {
      id: postId,
      type: "blog",
      company_name: String(row.company_name ?? firm?.name ?? ""),
      company_logo: row.company_logo_url ? String(row.company_logo_url) : firm?.logo_url ? String(firm.logo_url) : null,
      company_slug: firmSlug,
      title: String(row.title ?? ""),
      description: String(row.summary ?? ""),
      image_url: row.cover_image_url ? String(row.cover_image_url) : null,
      created_at: String(row.published_at),
      like_count: likeCount,
      is_liked: likedSet.has(postId),
      target_url,
      category_name: row.category_id ? (categoryMap.get(String(row.category_id)) ?? null) : null,
      tags: Array.isArray((row as { tags?: string[] }).tags) ? ((row as { tags?: string[] }).tags ?? []).slice(0, 2) : [],
      score,
      engagement_score: engagementScore,
      hype_score: hypeScore,
      premium_score: premiumScore,
      admin_score: adminScore,
    };
    }).filter((item) => Boolean(item.company_slug));

    const filtered = items.filter((item) => {
      if (query.premium && item.premium_score <= 0) return false;
      if (query.search && !item.company_name.toLowerCase().includes(query.search.toLowerCase())) return false;
      return true;
    });

    const sort = query.sort ?? "smart";
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "new") return b.created_at.localeCompare(a.created_at);
      if (sort === "trending") return b.hype_score - a.hype_score;
      if (sort === "top") return b.engagement_score - a.engagement_score;
      return b.score - a.score;
    });
    const antiSpam = applyAntiSpam(sorted);
    const paged = antiSpam.slice(offset, offset + limit);
    return { items: paged, hasMore: antiSpam.length > offset + limit };
  } catch (error) {
    console.error("computeFeedPage error:", error);
    return { items: [], hasMore: false };
  }
}

