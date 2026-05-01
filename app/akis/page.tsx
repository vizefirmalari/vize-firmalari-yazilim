import { AkisFeedTopicChips } from "@/components/feed/akis-feed-topic-chips";
import { FeedHero, type FeedHeroModel } from "@/components/feed/FeedHero";
import { FeedCategorySection } from "@/components/feed/FeedCategorySection";
import { FeedStoriesRail } from "@/components/feed/FeedStoriesRail";
import { FeedList } from "@/components/feed/FeedList";
import { FeedFiltersBar } from "@/components/feed/FeedFiltersBar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  fetchFeedHubBlogSnapshots,
  fetchFeedStoryStripItems,
  getFeedItemsPage,
  type FeedHubBlogPost,
  type FeedItem,
} from "@/lib/data/feed";
import { buildFeedHubSections } from "@/lib/feed/feed-hub-taxonomy";
import { FEED_CATEGORY_HUB_PRIORITY_SLUGS, getFeedCategoryBySlug } from "@/lib/feed/feed-categories";
import type { BlogAdRow } from "@/lib/blog/ads";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";

/** Kapak güncellemeleri hemen görülsün — feed verisi doğrudan DB’den çekilir. */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Akış",
  description: "Firma odaklı içerik akışı",
};

function feedBlogToHero(item: FeedItem): FeedHeroModel | null {
  if (item.type !== "blog") return null;
  return {
    title: item.title,
    summary: item.description,
    imageUrl: item.image_url,
    href: item.target_url,
    categoryLabel: item.category_name,
  };
}

function hubPostToHero(post: FeedHubBlogPost): FeedHeroModel {
  return {
    title: post.title,
    summary: post.description,
    imageUrl: post.image_url,
    href: post.target_url,
    categoryLabel: post.category_name,
  };
}

export default async function AkisPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const query = {
    category: typeof sp.category === "string" ? sp.category : undefined,
    country: typeof sp.country === "string" ? sp.country : undefined,
    visaType: typeof sp.visaType === "string" ? sp.visaType : undefined,
    type: typeof sp.type === "string" ? (sp.type as "blog" | "all") : undefined,
    premium: sp.premium === "true",
    search: typeof sp.search === "string" ? sp.search : undefined,
    sort: typeof sp.sort === "string" ? (sp.sort as "smart" | "new" | "trending" | "top") : undefined,
  };

  let items: Awaited<ReturnType<typeof getFeedItemsPage>>["items"] = [];
  let hasMore = false;
  let adPool: BlogAdRow[] = [];
  let categories: Array<{ id: string; name: string }> = [];
  let countries: string[] = [];
  let heroModel: FeedHeroModel | null = null;
  let heroExcludedId: string | null = null;
  let storyStrip: Awaited<ReturnType<typeof fetchFeedStoryStripItems>> = [];
  let hubSections: ReturnType<typeof buildFeedHubSections> = [];

  try {
    const hasActiveFilters = Boolean(query.category || query.country || query.visaType || query.premium || query.search);

    const [feedResult, adsResult, catResult, ctrResult] = await Promise.all([
      getFeedItemsPage(0, 9, query),
      getActiveAds(),
      getCategoryOptions(),
      getCountryOptions(),
    ]);

    items = feedResult.items;
    hasMore = feedResult.hasMore;
    adPool = adsResult;
    categories = catResult;
    countries = ctrResult;

    if (!hasActiveFilters) {
      const [hubSnapshots, heroPage, stories] = await Promise.all([
        fetchFeedHubBlogSnapshots(280),
        getFeedItemsPage(0, 8, { type: "blog", sort: "smart" }),
        fetchFeedStoryStripItems(14),
      ]);

      storyStrip = stories;

      const heroItem = heroPage.items.find((i) => i.type === "blog");
      if (heroItem) {
        heroModel = feedBlogToHero(heroItem);
        heroExcludedId = heroItem.id;
      }

      if (!heroModel && hubSnapshots.length > 0) {
        const newest = [...hubSnapshots].sort((a, b) => b.created_at.localeCompare(a.created_at))[0]!;
        heroModel = hubPostToHero(newest);
        heroExcludedId = newest.id;
      }

      const excluded = new Set<string>();
      if (heroExcludedId) excluded.add(heroExcludedId);

      hubSections = buildFeedHubSections(hubSnapshots, excluded);
    } else {
      hubSections = [];
      storyStrip = [];
      heroModel = null;
    }
  } catch (error) {
    console.error("AkisPage render error:", error);
  }

  const queryString = new URLSearchParams(
    Object.entries(query).reduce<Record<string, string>>((acc, [k, v]) => {
      if (typeof v === "string" && v) acc[k] = v;
      if (typeof v === "boolean" && v) acc[k] = "true";
      return acc;
    }, {})
  ).toString();
  const hasActiveFilters = Boolean(query.category || query.country || query.visaType || query.premium || query.search);

  const topicDefsOrdered = FEED_CATEGORY_HUB_PRIORITY_SLUGS.map((slug) => getFeedCategoryBySlug(slug)).filter(
    (c): c is NonNullable<typeof c> => c != null
  );

  const useWideAkisShell = !hasActiveFilters;
  const showExpandedHub = !hasActiveFilters && Boolean(heroModel || storyStrip.length > 0 || hubSections.length > 0);

  return (
    <>
      <SiteHeader />
      <main className="px-3 py-6 sm:px-4">
        <div className={`mx-auto w-full ${useWideAkisShell ? "max-w-7xl" : "max-w-[800px]"}`}>
          <h1 className="mb-4 text-lg font-semibold text-[#111827]">Akış</h1>
          <FeedFiltersBar
            categories={categories}
            countries={countries}
            visaTypes={SPECIALIZATION_OPTIONS.map((x) => x.label)}
          />

          {useWideAkisShell && topicDefsOrdered.length > 0 ? (
            <AkisFeedTopicChips defs={topicDefsOrdered} activeSlug={null} />
          ) : null}

          {showExpandedHub ? (
            <>
              {heroModel ? <FeedHero hero={heroModel} /> : null}
              {storyStrip.length > 0 ? <FeedStoriesRail stories={storyStrip} /> : null}
              {hubSections.length > 0 ? (
                <div className="space-y-14 pb-8">
                  {hubSections.map((section) => (
                    <FeedCategorySection key={section.def.anchorId} section={section} />
                  ))}
                </div>
              ) : null}
              <div className="mx-auto mt-2 mb-4 max-w-[800px]">
                <h2 className="text-base font-bold text-[#111827] sm:text-lg">Son içerikler</h2>
                <p className="mt-1 text-sm text-[#6b7280]">Tüm firma blog ve akış gönderileri; sayfa aşağı kaydıkça devam eder.</p>
              </div>
            </>
          ) : null}

          <div className={useWideAkisShell ? "mx-auto max-w-[800px]" : undefined}>
            <FeedList
              initialItems={items}
              hasMoreInitial={hasMore}
              adPool={adPool}
              queryString={queryString}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

async function getActiveAds(): Promise<BlogAdRow[]> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("blog_ads")
      .select("id,ad_type,title,advertiser_name,image_url,cta_text,sponsor_name,sponsor_logo_url,native_image_url,native_title,native_description,target_url,position,weight,start_date,end_date,is_active,target_category_ids,target_countries,target_visa_types")
      .eq("is_active", true)
      .in("ad_type", ["image", "native"]);

    if (error) {
      console.error("getActiveAds error:", error.message);
      return [];
    }

    const now = Date.now();
    return ((data ?? []) as BlogAdRow[]).filter((item) => {
      const startOk = new Date(item.start_date).getTime() <= now;
      const endOk = !item.end_date || new Date(item.end_date).getTime() >= now;
      return startOk && endOk;
    });
  } catch (error) {
    console.error("getActiveAds exception:", error);
    return [];
  }
}

async function getCategoryOptions(): Promise<Array<{ id: string; name: string }>> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("blog_categories")
      .select("id,name")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) {
      console.error("getCategoryOptions error:", error.message);
      return [];
    }
    return (data ?? []).map((x) => ({ id: String(x.id), name: String(x.name) }));
  } catch (error) {
    console.error("getCategoryOptions exception:", error);
    return [];
  }
}

async function getCountryOptions(): Promise<string[]> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("countries")
      .select("name")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) {
      console.error("getCountryOptions error:", error.message);
      return [];
    }
    return (data ?? []).map((x) => String(x.name));
  } catch (error) {
    console.error("getCountryOptions exception:", error);
    return [];
  }
}
