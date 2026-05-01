import { FeedCategoryNav } from "@/components/feed/FeedCategoryNav";
import { MobileCategoryScroller } from "@/components/feed/mobile/MobileCategoryScroller";
import { MobileFeedLayout } from "@/components/feed/mobile/MobileFeedLayout";
import { FeedFiltersBar } from "@/components/feed/FeedFiltersBar";
import { FeedList } from "@/components/feed/FeedList";
import { LatestTicker } from "@/components/feed/LatestTicker";
import { LeadStoryGrid } from "@/components/feed/LeadStoryGrid";
import { NewsCategoryBlock } from "@/components/feed/NewsCategoryBlock";
import { NewsHomeLayout } from "@/components/feed/NewsHomeLayout";
import { MoreContentSection } from "@/components/feed/MoreContentSection";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { fetchFeedHubBlogSnapshots, getFeedItemsPage, type FeedQuery } from "@/lib/data/feed";
import type { AkisNewsHomeBuilt } from "@/lib/feed/akis-news-home-data";
import { buildAkisNewsHomeData } from "@/lib/feed/akis-news-home-data";
import type { BlogAdRow } from "@/lib/blog/ads";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";

/** Kapak güncellemeleri hemen görülsün — feed verisi doğrudan DB’den çekilir. */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Rehber merkezi",
  description: "Firma odaklı içerik akışı",
};

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

  let newsHome: AkisNewsHomeBuilt | null = null;

  const hasActiveFilters = Boolean(query.category || query.country || query.visaType || query.premium || query.search);

  const feedPageQuery: FeedQuery = {
    ...(query.category ? { category: query.category } : {}),
    ...(query.country ? { country: query.country } : {}),
    ...(query.visaType ? { visaType: query.visaType } : {}),
    ...(query.type ? { type: query.type } : {}),
    ...(query.premium ? { premium: true } : {}),
    ...(query.search ? { search: query.search } : {}),
    ...(query.sort ? { sort: query.sort } : {}),
  };

  try {
    if (hasActiveFilters) {
      const [feedResult, adsResult, catResult, ctrResult] = await Promise.all([
        getFeedItemsPage(0, 9, feedPageQuery),
        getActiveAds(),
        getCategoryOptions(),
        getCountryOptions(),
      ]);
      items = feedResult.items;
      hasMore = feedResult.hasMore;
      adPool = adsResult;
      categories = catResult;
      countries = ctrResult;
    } else {
      const hubSnapshots = await fetchFeedHubBlogSnapshots(280);
      newsHome = buildAkisNewsHomeData({ hub: hubSnapshots });
    }
  } catch (error) {
    console.error("AkisPage render error:", error);
  }

  const qp = new URLSearchParams(
    Object.entries(query).reduce<Record<string, string>>((acc, [k, v]) => {
      if (typeof v === "string" && v) acc[k] = v;
      if (typeof v === "boolean" && v) acc[k] = "true";
      return acc;
    }, {})
  );
  const queryString = qp.toString();

  const filteredNewsBlocks =
    newsHome?.sections.filter((s) => s.posts.length > 0) ?? [];

  return (
    <>
      <SiteHeader />
      <main className="border-b border-[#e5e7eb]/80 bg-white py-7 sm:py-9">
        {hasActiveFilters ? (
          <NewsHomeLayout>
            <div className="mb-10">
              <h1 className="text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">Rehber merkezi</h1>
              <FeedFiltersBar
                categories={categories}
                countries={countries}
                visaTypes={SPECIALIZATION_OPTIONS.map((x) => x.label)}
              />
            </div>
            <div className="mx-auto max-w-[800px]">
              <FeedList
                initialItems={items}
                hasMoreInitial={hasMore}
                adPool={adPool}
                queryString={queryString}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </NewsHomeLayout>
        ) : (
          <NewsHomeLayout>
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-[#111827] md:mb-6 md:text-2xl">
              Rehber merkezi
            </h1>

            <MobileCategoryScroller className="mb-5 block md:hidden" />

            {newsHome && newsHome.sliderPosts.length > 0 ? (
              <>
                <div className="block pb-[120px] md:hidden">
                  <MobileFeedLayout
                    lead={newsHome.sliderPosts[0]!}
                    featured={[...newsHome.sideFour, ...newsHome.tickerFive]}
                    latest={newsHome.moreStories}
                    sections={filteredNewsBlocks}
                  />
                </div>

                <div className="hidden md:block">
                  <FeedCategoryNav className="mb-7 sm:mb-8" />
                  <LeadStoryGrid sliderPosts={newsHome.sliderPosts} sideFour={newsHome.sideFour} />
                  <LatestTicker posts={newsHome.tickerFive} />
                  <div className="mt-1 md:mt-2">
                    {filteredNewsBlocks.map((filled, idx) => (
                      <NewsCategoryBlock key={filled.config.viewAllSlug} filled={filled} isFirst={idx === 0} />
                    ))}
                  </div>
                  <MoreContentSection posts={newsHome.moreStories} />
                </div>
              </>
            ) : (
              <div className="rounded-md border border-[#e5e7eb] bg-[#fafafa] px-6 py-12 text-center">
                <p className="text-sm font-semibold text-[#374151]">Henüz yayımda yazı görünmüyor.</p>
                <p className="mt-2 text-sm text-[#6b7280]">Firmalar yeni içerik paylaştığında burada listelenecek.</p>
              </div>
            )}
          </NewsHomeLayout>
        )}
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
      .select(
        "id,ad_type,title,advertiser_name,image_url,cta_text,sponsor_name,sponsor_logo_url,native_image_url,native_title,native_description,target_url,position,weight,start_date,end_date,is_active,target_category_ids,target_countries,target_visa_types"
      )
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
