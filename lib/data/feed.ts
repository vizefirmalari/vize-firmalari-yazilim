import type { BlogCtaButton } from "@/lib/blog/cta-buttons";
import { parseInstantMs } from "@/lib/datetime/parse-instant";
import { resolveFeedPostCtaButtons } from "@/lib/data/feed-post-cta-buttons";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export type FeedItem = {
  id: string;
  type: "blog" | "feed_post";
  company_name: string;
  company_logo: string | null;
  company_slug: string;
  title: string;
  description: string;
  image_url: string | null;
  /** Akış gönderisi çoklu görsel */
  image_urls?: string[] | null;
  /** Akış gönderisi yönlendirme butonları (blog CTA modeli) */
  cta_buttons?: BlogCtaButton[];
  created_at: string;
  like_count: number;
  is_liked: boolean;
  target_url: string;
  category_name: string | null;
  tags: string[];
  score: number;
  engagement_score: number;
  /** Akış sıralaması (0–1): son 2 saat etkileşim / büyüme — kartta gösterilen hype değil */
  hype_score: number;
  /** `firms.hype_score` birikimli platform puanı; liste/detay ile aynı gösterim */
  firm_hype_score: number;
  corporateness_score: number;
  premium_score: number;
  admin_score: number;
  /** Varsayılan true; akış gönderisinde beğeni yok (blog post_likes ile bağlı değil). */
  likes_enabled?: boolean;
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
  const ts = parseInstantMs(date);
  if (!Number.isFinite(ts)) return 0;
  return Math.max(0, (Date.now() - ts) / (1000 * 60 * 60));
}

function clamp01(n: number): number {
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

/** `firms` satırından birikimli hype (liste / firma sayfası ile aynı) */
function firmHypePointsFromRow(f: { hype_score?: unknown } | null | undefined): number {
  if (!f) return 0;
  const h = f.hype_score;
  if (typeof h === "bigint") return Number(h);
  if (typeof h === "number" && Number.isFinite(h)) return h;
  if (typeof h === "string" && /^\d+$/.test(h)) return Number(h);
  return 0;
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

  const [{ data: posts }, { data: feedRowsRaw }, { data: firmRow }] = await Promise.all([
    dataClient
      .from("firm_blog_posts")
      .select(
        "id,title,summary,cover_image_url,published_at,company_name,company_logo_url,company_slug,slug,category_id,tags"
      )
      .eq("firm_id", firmId)
      .eq("status", "published")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(limit),
    dataClient
      .from("firm_feed_posts")
      .select("id,body,image_urls,cta_buttons,link_url,link_label,tags,published_at")
      .eq("firm_id", firmId)
      .eq("status", "published")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(limit),
    dataClient
      .from("firms")
      .select("name, brand_name, logo_url, corporateness_score, hype_score")
      .eq("id", firmId)
      .maybeSingle(),
  ]);

  const firmCorporateScore = Math.max(0, Math.min(100, Number(firmRow?.corporateness_score ?? 0)));
  const firmHypePoints = firmHypePointsFromRow(firmRow);
  const firmDisplayName = String(firmRow?.brand_name ?? firmRow?.name ?? "");
  const firmLogoUrl = firmRow?.logo_url ? String(firmRow.logo_url) : null;

  const rows = posts ?? [];
  const feedRows = feedRowsRaw ?? [];
  if (rows.length === 0 && feedRows.length === 0) return [];

  const ids = rows.map((x) => String(x.id));
  const { data: categories } = await dataClient.from("blog_categories").select("id,name");
  const categoryMap = new Map((categories ?? []).map((c) => [String(c.id), String(c.name)]));

  const likeCountMap = new Map<string, number>();
  let likedSet = new Set<string>();
  if (ids.length > 0) {
    const { data: likeRows } = await dataClient.from("post_likes").select("post_id").in("post_id", ids);
    for (const row of likeRows ?? []) {
      const key = String(row.post_id);
      likeCountMap.set(key, (likeCountMap.get(key) ?? 0) + 1);
    }
    if (user?.id) {
      const { data: liked } = await dataClient
        .from("post_likes")
        .select("post_id")
        .eq("user_id", user.id)
        .in("post_id", ids);
      likedSet = new Set((liked ?? []).map((x) => String(x.post_id)));
    }
  }

  const blogItems = rows.map((row) => {
    const postId = String(row.id);
    return {
      id: postId,
      type: "blog" as const,
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
      firm_hype_score: firmHypePoints,
      corporateness_score: firmCorporateScore,
      premium_score: 0,
      admin_score: 0,
      likes_enabled: true,
    };
  });

  const parseUrls = (raw: unknown): string[] => {
    if (!Array.isArray(raw)) return [];
    return raw.filter((u): u is string => typeof u === "string" && u.trim().length > 0).map((u) => u.trim());
  };

  const feedItems: FeedItem[] = feedRows
    .map((row) => {
      const urls = parseUrls(row.image_urls);
      return {
        id: String(row.id),
        type: "feed_post" as const,
        company_name: firmDisplayName,
        company_logo: firmLogoUrl,
        company_slug: firmSlug,
        title: "",
        description: String(row.body ?? ""),
        image_url: urls[0] ?? null,
        image_urls: urls,
        cta_buttons: resolveFeedPostCtaButtons(row.cta_buttons, row.link_url, row.link_label),
        created_at: String(row.published_at),
        like_count: 0,
        is_liked: false,
        target_url: `/firma/${firmSlug}`,
        category_name: null,
        tags: Array.isArray(row.tags) ? row.tags.map(String).slice(0, 5) : [],
        score: 0,
        engagement_score: 0,
        hype_score: 0,
        firm_hype_score: firmHypePoints,
        corporateness_score: firmCorporateScore,
        premium_score: 0,
        admin_score: 0,
        likes_enabled: false,
      };
    })
    .filter((x) => x.description.trim().length > 0);

  const merged = [...blogItems, ...feedItems].sort((a, b) => b.created_at.localeCompare(a.created_at));
  return merged.slice(0, limit);
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

    const includeFeedPosts =
      query.type !== "blog" && !query.category && !query.country && !query.visaType;

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

    const fetchCap = Math.max(50, offset + limit + 30);
    const [{ data: posts }, { data: feedRaw }] = await Promise.all([
      postQuery.order("published_at", { ascending: false }).range(0, fetchCap),
      includeFeedPosts
        ? dataClient
            .from("firm_feed_posts")
            .select("id,firm_id,body,image_urls,cta_buttons,link_url,link_label,tags,published_at")
            .eq("status", "published")
            .not("published_at", "is", null)
            .order("published_at", { ascending: false })
            .limit(120)
        : Promise.resolve({ data: [] as Record<string, unknown>[] | null }),
    ]);

    const rows = posts ?? [];
    const feedRows = (feedRaw ?? []) as Array<{
      id: string;
      firm_id: string;
      body: string;
      image_urls: unknown;
      cta_buttons: unknown;
      link_url: string | null;
      link_label: string | null;
      tags: string[] | null;
      published_at: string;
    }>;
    const ids = rows.map((x) => String(x.id));
    if (ids.length === 0 && feedRows.length === 0) return { items: [], hasMore: false };

    const firmIdSet = new Set(rows.map((r) => String(r.firm_id)));
    for (const fr of feedRows) firmIdSet.add(String(fr.firm_id));
    const firmIdList = Array.from(firmIdSet);

    const { data: firms } =
      firmIdList.length > 0
        ? await dataClient
            .from("firms")
            .select("id,slug,name,brand_name,logo_url,premium_badge,featured,corporateness_score,hype_score")
            .in("id", firmIdList)
        : { data: [] };
    const firmMap = new Map((firms ?? []).map((f) => [String(f.id), f]));
    const rowCompanySlugs = Array.from(
      new Set(
        rows
          .map((r) => String((r as { company_slug?: string | null }).company_slug ?? "").trim())
          .filter(Boolean)
      )
    );
    const { data: firmsBySlug } =
      rowCompanySlugs.length > 0
        ? await dataClient
            .from("firms")
            .select("id,slug,name,brand_name,logo_url,premium_badge,featured,corporateness_score,hype_score")
            .in("slug", rowCompanySlugs)
        : { data: [] };
    const firmSlugMap = new Map((firmsBySlug ?? []).map((f) => [String(f.slug), f]));

    const { data: categories } = await dataClient
      .from("blog_categories")
      .select("id,name");
    const categoryMap = new Map((categories ?? []).map((c) => [String(c.id), String(c.name)]));

    const likeCountMap = new Map<string, number>();
    let likedSet = new Set<string>();
    let likeRows: { post_id: string; created_at?: string }[] = [];

    if (ids.length > 0) {
      const { data: lr } = await dataClient
        .from("post_likes")
        .select("post_id,created_at")
        .in("post_id", ids);
      likeRows = lr ?? [];
      for (const row of likeRows) {
        const key = String(row.post_id);
        likeCountMap.set(key, (likeCountMap.get(key) ?? 0) + 1);
      }
      if (user?.id) {
        const { data: liked } = await dataClient
          .from("post_likes")
          .select("post_id")
          .eq("user_id", user.id)
          .in("post_id", ids);
        likedSet = new Set((liked ?? []).map((x) => String(x.post_id)));
      }
    }

    const nowIso = new Date().toISOString();
    const twoHoursAgoIso = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const fourHoursAgoIso = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString();

    const { data: clickRows } =
      ids.length > 0
        ? await dataClient
            .from("post_engagement_events")
            .select("post_id,event_type,created_at")
            .in("post_id", ids)
            .gte("created_at", fourHoursAgoIso)
            .lte("created_at", nowIso)
        : { data: [] };

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

    const parseFeedImageUrls = (raw: unknown): string[] => {
      if (!Array.isArray(raw)) return [];
      return raw.filter((u): u is string => typeof u === "string" && u.trim().length > 0).map((u) => u.trim());
    };

    const blogItems: FeedItem[] = rows
      .map<FeedItem>((row) => {
        const postId = String(row.id);
        const firmId = String(row.firm_id);
        const rowCompanySlug = String((row as { company_slug?: string | null }).company_slug ?? "");
        const firmById = firmMap.get(firmId);
        const firmBySlug = rowCompanySlug ? firmSlugMap.get(rowCompanySlug) : undefined;
        const firm = firmById ?? firmBySlug;
        const firmSlug = String(
          (row as { company_slug?: string | null }).company_slug ?? firmById?.slug ?? firmBySlug?.slug ?? ""
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
        const firmHypePoints = firmHypePointsFromRow(firm);
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
          tags: Array.isArray((row as { tags?: string[] }).tags)
            ? ((row as { tags?: string[] }).tags ?? []).slice(0, 2)
            : [],
          score,
          engagement_score: engagementScore,
          hype_score: hypeScore,
          firm_hype_score: firmHypePoints,
          corporateness_score: Math.max(0, Math.min(100, Number(firm?.corporateness_score ?? 0))),
          premium_score: premiumScore,
          admin_score: adminScore,
          likes_enabled: true,
        };
      })
      .filter((item) => Boolean(item.company_slug));

    const feedItems: FeedItem[] = [];
    for (const fr of feedRows) {
      const firmId = String(fr.firm_id);
      const firm = firmMap.get(firmId);
      if (!firm?.slug) continue;
      const firmSlug = String(firm.slug);
      const urls = parseFeedImageUrls(fr.image_urls);
      const body = String(fr.body ?? "").trim();
      if (body.length < 1) continue;
      const recencyScore = Math.exp(-hoursAgo(String(fr.published_at)) / 24);
      const premiumScore = firm.premium_badge ? 1.2 : 0;
      const adminScore = firm.featured ? 1 : 0;
      const engagementScore = 0;
      const hypeScore = 0;
      const firmHypePoints = firmHypePointsFromRow(firm);
      const score =
        WEIGHTS.recency * recencyScore +
        WEIGHTS.engagement * engagementScore +
        WEIGHTS.premium * premiumScore +
        WEIGHTS.hype * hypeScore +
        WEIGHTS.admin * adminScore;

      feedItems.push({
        id: String(fr.id),
        type: "feed_post",
        company_name: String(firm.brand_name ?? firm.name ?? ""),
        company_logo: firm.logo_url ? String(firm.logo_url) : null,
        company_slug: firmSlug,
        title: "",
        description: String(fr.body ?? ""),
        image_url: urls[0] ?? null,
        image_urls: urls,
        cta_buttons: resolveFeedPostCtaButtons(fr.cta_buttons, fr.link_url, fr.link_label),
        created_at: String(fr.published_at),
        like_count: 0,
        is_liked: false,
        target_url: `/firma/${firmSlug}`,
        category_name: null,
        tags: Array.isArray(fr.tags) ? fr.tags.map(String).slice(0, 5) : [],
        score,
        engagement_score: engagementScore,
        hype_score: hypeScore,
        firm_hype_score: firmHypePoints,
        corporateness_score: Math.max(0, Math.min(100, Number(firm.corporateness_score ?? 0))),
        premium_score: premiumScore,
        admin_score: adminScore,
        likes_enabled: false,
      });
    }

    const items: FeedItem[] = [...blogItems, ...feedItems];

    const q = query.search?.trim().toLowerCase() ?? "";
    const filtered = items.filter((item) => {
      if (query.premium && item.premium_score <= 0) return false;
      if (q) {
        const inCompany = item.company_name.toLowerCase().includes(q);
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!inCompany && !inTitle && !inDesc && !inTags) return false;
      }
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

