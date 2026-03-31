import { redirect } from "next/navigation";
import { BlogAdsManager } from "@/components/admin/blog-ads-manager";
import { requireAdmin } from "@/lib/auth/admin";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export const metadata = {
  title: "Blog reklamları",
  robots: { index: false, follow: false },
};

export default async function AdminBlogAdsPage() {
  await requireAdmin();
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) redirect("/admin");

  const { data } = await supabase
    .from("blog_ads")
    .select("id,ad_type,title,advertiser_name,image_url,cta_text,sponsor_name,sponsor_logo_url,native_image_url,native_title,native_description,target_url,position,weight,start_date,end_date,is_active,target_category_ids,target_countries,target_visa_types")
    .order("created_at", { ascending: false });

  const { data: categoryRows } = await supabase
    .from("blog_categories")
    .select("id,name")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  const { data: countryRows } = await supabase
    .from("countries")
    .select("name")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: events } = await supabase
    .from("blog_ad_events")
    .select("blog_ad_id,event_type,slot_position,created_at")
    .gte("created_at", since);

  const metricsByAd: Record<string, { impressions: number; clicks: number; ctr: number }> = {};
  const slotAgg: Record<"top" | "middle" | "bottom", { impressions: number; clicks: number }> = {
    top: { impressions: 0, clicks: 0 },
    middle: { impressions: 0, clicks: 0 },
    bottom: { impressions: 0, clicks: 0 },
  };

  for (const e of events ?? []) {
    const adId = String(e.blog_ad_id ?? "");
    if (!metricsByAd[adId]) metricsByAd[adId] = { impressions: 0, clicks: 0, ctr: 0 };
    if (e.event_type === "impression") metricsByAd[adId].impressions += 1;
    if (e.event_type === "click") metricsByAd[adId].clicks += 1;
    const slot = e.slot_position as "top" | "middle" | "bottom";
    if (slotAgg[slot]) {
      if (e.event_type === "impression") slotAgg[slot].impressions += 1;
      if (e.event_type === "click") slotAgg[slot].clicks += 1;
    }
  }
  for (const adId of Object.keys(metricsByAd)) {
    const m = metricsByAd[adId];
    m.ctr = m.impressions > 0 ? (m.clicks / m.impressions) * 100 : 0;
  }
  const slotSummary = (["top", "middle", "bottom"] as const).map((slot) => {
    const m = slotAgg[slot];
    return {
      slot,
      impressions: m.impressions,
      clicks: m.clicks,
      ctr: m.impressions > 0 ? (m.clicks / m.impressions) * 100 : 0,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Blog reklamları</h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Top, middle ve bottom reklam slotlarını merkezi olarak yönetin.
        </p>
      </div>
      <BlogAdsManager
        rows={(data ?? []) as never}
        metricsByAd={metricsByAd}
        slotSummary={slotSummary}
        categoryOptions={(categoryRows ?? []).map((x) => ({ id: String(x.id), name: String(x.name) }))}
        countryOptions={(countryRows ?? []).map((x) => String(x.name))}
        visaTypeOptions={SPECIALIZATION_OPTIONS.map((x) => x.label)}
      />
    </div>
  );
}

