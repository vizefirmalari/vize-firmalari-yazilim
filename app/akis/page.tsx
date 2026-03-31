import { FeedList } from "@/components/feed/FeedList";
import { FeedFiltersBar } from "@/components/feed/FeedFiltersBar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getFeedItemsPage } from "@/lib/data/feed";
import type { BlogAdRow } from "@/lib/blog/ads";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";

export const metadata = {
  title: "Akış",
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

  const [{ items, hasMore }, adPool, categories, countries] = await Promise.all([
    getFeedItemsPage(0, 9, query),
    getActiveAds(),
    getCategoryOptions(),
    getCountryOptions(),
  ]);
  const queryString = new URLSearchParams(
    Object.entries(query).reduce<Record<string, string>>((acc, [k, v]) => {
      if (typeof v === "string" && v) acc[k] = v;
      if (typeof v === "boolean" && v) acc[k] = "true";
      return acc;
    }, {})
  ).toString();
  const hasActiveFilters = Boolean(query.category || query.country || query.visaType || query.premium || query.search);

  return (
    <>
      <SiteHeader />
      <main className="px-3 py-6 sm:px-4">
        <div className="mx-auto w-full max-w-[800px]">
          <h1 className="mb-4 text-lg font-semibold text-[#111827]">Akış</h1>
          <FeedFiltersBar
            categories={categories}
            countries={countries}
            visaTypes={SPECIALIZATION_OPTIONS.map((x) => x.label)}
          />
          <FeedList
            initialItems={items}
            hasMoreInitial={hasMore}
            adPool={adPool}
            queryString={queryString}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

async function getActiveAds(): Promise<BlogAdRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("blog_ads")
    .select("id,ad_type,title,advertiser_name,image_url,cta_text,sponsor_name,sponsor_logo_url,native_image_url,native_title,native_description,target_url,position,weight,start_date,end_date,is_active,target_category_ids,target_countries,target_visa_types")
    .eq("is_active", true)
    .in("ad_type", ["image", "native"]);

  const now = Date.now();
  return ((data ?? []) as BlogAdRow[]).filter((item) => {
    const startOk = new Date(item.start_date).getTime() <= now;
    const endOk = !item.end_date || new Date(item.end_date).getTime() >= now;
    return startOk && endOk;
  });
}

async function getCategoryOptions(): Promise<Array<{ id: string; name: string }>> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("blog_categories")
    .select("id,name")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return (data ?? []).map((x) => ({ id: String(x.id), name: String(x.name) }));
}

async function getCountryOptions(): Promise<string[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("countries")
    .select("name")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return (data ?? []).map((x) => String(x.name));
}

