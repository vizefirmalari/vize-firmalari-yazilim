"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  deleteBlogAd,
  deletePlatformSocialMetric,
  upsertBlogAd,
  upsertPlatformSocialMetric,
  uploadBlogAdAsset,
} from "@/lib/actions/blog-ads-admin";
import type { BlogAdRow } from "@/lib/blog/ads";
import type { AdReachSummary, SocialMetricRow } from "@/lib/data/ad-reach";

type Metrics = {
  impressions: number;
  clicks: number;
  ctr: number;
};

export function BlogAdsManager({
  rows,
  metricsByAd,
  slotSummary,
  adReachSummary,
  socialMetrics,
  categoryOptions,
  countryOptions,
  visaTypeOptions,
}: {
  rows: BlogAdRow[];
  metricsByAd: Record<string, Metrics>;
  slotSummary: Array<{ slot: "top" | "middle" | "bottom"; impressions: number; clicks: number; ctr: number }>;
  adReachSummary: AdReachSummary;
  socialMetrics: SocialMetricRow[];
  categoryOptions: Array<{ id: string; name: string }>;
  countryOptions: string[];
  visaTypeOptions: string[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [socialDraft, setSocialDraft] = useState({
    id: "",
    platform_name: "",
    handle: "",
    follower_count: 0,
    monthly_reach: 0,
    engagement_rate: 0,
    estimated_lead_rate: 1.7,
    is_active: true,
    sort_order: 0,
  });
  const [draft, setDraft] = useState({
    id: "",
    ad_type: "image" as "image" | "native",
    title: "",
    advertiser_name: "",
    image_url: "",
    cta_text: "",
    sponsor_name: "",
    sponsor_logo_url: "",
    native_image_url: "",
    native_title: "",
    native_description: "",
    target_url: "",
    position: "top" as BlogAdRow["position"],
    target_category_ids: [] as string[],
    target_countries: [] as string[],
    target_visa_types: [] as string[],
    weight: 10,
    start_date: new Date().toISOString().slice(0, 16),
    end_date: "",
    is_active: true,
  });

  const reset = () =>
    setDraft({
      id: "",
      ad_type: "image",
      title: "",
      advertiser_name: "",
      image_url: "",
      cta_text: "",
      sponsor_name: "",
      sponsor_logo_url: "",
      native_image_url: "",
      native_title: "",
      native_description: "",
      target_url: "",
      position: "top",
      target_category_ids: [],
      target_countries: [],
      target_visa_types: [],
      weight: 10,
      start_date: new Date().toISOString().slice(0, 16),
      end_date: "",
      is_active: true,
    });

  const resetSocialDraft = () =>
    setSocialDraft({
      id: "",
      platform_name: "",
      handle: "",
      follower_count: 0,
      monthly_reach: 0,
      engagement_rate: 0,
      estimated_lead_rate: 1.7,
      is_active: true,
      sort_order: 0,
    });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const res = await upsertBlogAd(draft);
    setPending(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Reklam kaydedildi.");
    reset();
    router.refresh();
  }

  async function remove(id: string) {
    setPending(true);
    const res = await deleteBlogAd(id);
    setPending(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Reklam silindi.");
    router.refresh();
  }

  async function saveSocialMetric(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const res = await upsertPlatformSocialMetric(socialDraft);
    setPending(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Sosyal metrik kaydedildi.");
    resetSocialDraft();
    router.refresh();
  }

  async function removeSocialMetric(id: string) {
    setPending(true);
    const res = await deletePlatformSocialMetric(id);
    setPending(false);
    if (!res.ok) return toast.error(res.error);
    toast.success("Sosyal metrik silindi.");
    router.refresh();
  }

  const toggleList = (list: string[], value: string, checked: boolean) =>
    checked ? (list.includes(value) ? list : [...list, value]) : list.filter((x) => x !== value);

  const uploadAsset = async (file: File, kind: "image" | "native" | "logo", field: "image_url" | "native_image_url" | "sponsor_logo_url") => {
    const fd = new FormData();
    fd.set("file", file);
    fd.set("kind", kind);
    const res = await uploadBlogAdAsset(fd);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setDraft((d) => ({ ...d, [field]: res.url }));
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">Toplam Blog İçeriği</p>
          <p className="mt-1 text-2xl font-bold text-[#0B3C5D]">{adReachSummary.publishedBlogCount}</p>
        </div>
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">Toplam Akış İçeriği</p>
          <p className="mt-1 text-2xl font-bold text-[#0B3C5D]">{adReachSummary.feedContentCount}</p>
        </div>
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">Toplam Reklam Alanı</p>
          <p className="mt-1 text-2xl font-bold text-[#0B3C5D]">{adReachSummary.activeSlotCapacity}</p>
        </div>
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">Son 30g Gösterim</p>
          <p className="mt-1 text-2xl font-bold text-[#0B3C5D]">{adReachSummary.last30Impressions.toLocaleString("tr-TR")}</p>
        </div>
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">Son 30g Tıklama</p>
          <p className="mt-1 text-2xl font-bold text-[#0B3C5D]">{adReachSummary.last30Clicks.toLocaleString("tr-TR")}</p>
        </div>
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">Ortalama CTR</p>
          <p className="mt-1 text-2xl font-bold text-[#0B3C5D]">%{adReachSummary.ctr.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">Tahmini Tekil Erişim</p>
          <p className="mt-1 text-2xl font-bold text-[#0B3C5D]">{adReachSummary.estimatedUniqueUsers.toLocaleString("tr-TR")}</p>
        </div>
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">Tahmini Potansiyel Müşteri</p>
          <p className="mt-1 text-2xl font-bold text-[#0B3C5D]">{adReachSummary.estimatedPotentialLeads.toLocaleString("tr-TR")}</p>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {slotSummary.map((slot) => (
          <div key={slot.slot} className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">{slot.slot} slot</p>
            <p className="mt-1 text-sm text-[#0B3C5D]">Gösterim: {slot.impressions}</p>
            <p className="text-sm text-[#0B3C5D]">Tıklama: {slot.clicks}</p>
            <p className="text-sm font-semibold text-[#0B3C5D]">CTR: %{slot.ctr.toFixed(2)}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/55">Sosyal medya metrikleri</h2>
          <p className="mt-1 text-xs text-[#1A1A1A]/60">
            Firma panelindeki "Sosyal Medyada Reklam Ver" kartı bu verilerle senkron çalışır.
          </p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-[#0B3C5D]/10">
            <table className="min-w-[680px] w-full text-left text-sm">
              <thead className="bg-[#F7F9FB] text-xs uppercase tracking-wide text-[#1A1A1A]/60">
                <tr>
                  <th className="px-3 py-2">Platform</th>
                  <th className="px-3 py-2">Takipçi</th>
                  <th className="px-3 py-2">30g Erişim</th>
                  <th className="px-3 py-2">Etkileşim</th>
                  <th className="px-3 py-2">Lead Oranı</th>
                  <th className="px-3 py-2">Durum</th>
                  <th className="px-3 py-2">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B3C5D]/10">
                {socialMetrics.map((row) => (
                  <tr key={row.id}>
                    <td className="px-3 py-2 font-semibold text-[#0B3C5D]">{row.platform_name}</td>
                    <td className="px-3 py-2">{row.follower_count.toLocaleString("tr-TR")}</td>
                    <td className="px-3 py-2">{row.monthly_reach.toLocaleString("tr-TR")}</td>
                    <td className="px-3 py-2">%{Number(row.engagement_rate).toFixed(2)}</td>
                    <td className="px-3 py-2">%{Number(row.estimated_lead_rate).toFixed(2)}</td>
                    <td className="px-3 py-2 text-xs">{row.is_active ? "Aktif" : "Pasif"}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="text-xs font-semibold text-[#328CC1] hover:underline"
                          onClick={() =>
                            setSocialDraft({
                              id: row.id,
                              platform_name: row.platform_name,
                              handle: row.handle ?? "",
                              follower_count: row.follower_count,
                              monthly_reach: row.monthly_reach,
                              engagement_rate: Number(row.engagement_rate),
                              estimated_lead_rate: Number(row.estimated_lead_rate),
                              is_active: row.is_active,
                              sort_order: row.sort_order,
                            })
                          }
                        >
                          Düzenle
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold text-red-600 hover:underline"
                          onClick={() => void removeSocialMetric(row.id)}
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={saveSocialMetric} className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/55">
            {socialDraft.id ? "Sosyal metrik düzenle" : "Yeni sosyal metrik"}
          </h3>
          <div className="mt-3 space-y-2">
            <input
              required
              value={socialDraft.platform_name}
              onChange={(e) => setSocialDraft((d) => ({ ...d, platform_name: e.target.value }))}
              placeholder="Platform adı"
              className="h-10 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 text-sm outline-none"
            />
            <input
              value={socialDraft.handle}
              onChange={(e) => setSocialDraft((d) => ({ ...d, handle: e.target.value }))}
              placeholder="@hesap (opsiyonel)"
              className="h-10 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 text-sm outline-none"
            />
            <input
              type="number"
              min={0}
              value={socialDraft.follower_count}
              onChange={(e) => setSocialDraft((d) => ({ ...d, follower_count: Number(e.target.value) }))}
              placeholder="Takipçi sayısı"
              className="h-10 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 text-sm outline-none"
            />
            <input
              type="number"
              min={0}
              value={socialDraft.monthly_reach}
              onChange={(e) => setSocialDraft((d) => ({ ...d, monthly_reach: Number(e.target.value) }))}
              placeholder="30g erişim"
              className="h-10 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 text-sm outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min={0}
                step="0.01"
                value={socialDraft.engagement_rate}
                onChange={(e) => setSocialDraft((d) => ({ ...d, engagement_rate: Number(e.target.value) }))}
                placeholder="Etkileşim %"
                className="h-10 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 text-sm outline-none"
              />
              <input
                type="number"
                min={0}
                step="0.01"
                value={socialDraft.estimated_lead_rate}
                onChange={(e) => setSocialDraft((d) => ({ ...d, estimated_lead_rate: Number(e.target.value) }))}
                placeholder="Lead oranı %"
                className="h-10 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 text-sm outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min={0}
                value={socialDraft.sort_order}
                onChange={(e) => setSocialDraft((d) => ({ ...d, sort_order: Number(e.target.value) }))}
                placeholder="Sıralama"
                className="h-10 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 text-sm outline-none"
              />
              <label className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 text-sm text-[#0B3C5D]">
                <input
                  type="checkbox"
                  checked={socialDraft.is_active}
                  onChange={(e) => setSocialDraft((d) => ({ ...d, is_active: e.target.checked }))}
                />
                Aktif
              </label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-xl bg-[#D9A441] px-4 py-2 text-sm font-semibold text-[#1A1A1A]"
            >
              Kaydet
            </button>
            {socialDraft.id ? (
              <button
                type="button"
                onClick={resetSocialDraft}
                className="rounded-xl border border-[#0B3C5D]/15 px-4 py-2 text-sm font-semibold text-[#0B3C5D]"
              >
                Yeni kayda geç
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <form onSubmit={save} className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]/55">
          {draft.id ? "Reklam düzenle" : "Yeni reklam"}
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setDraft((d) => ({ ...d, ad_type: "image" }))}
            className={`rounded-xl border px-3 py-2 text-sm font-semibold ${draft.ad_type === "image" ? "border-[#0B3C5D]/30 bg-[#0B3C5D]/10 text-[#0B3C5D]" : "border-[#0B3C5D]/15 bg-white text-[#1A1A1A]/70"}`}
          >
            Görsel Reklam
          </button>
          <button
            type="button"
            onClick={() => setDraft((d) => ({ ...d, ad_type: "native" }))}
            className={`rounded-xl border px-3 py-2 text-sm font-semibold ${draft.ad_type === "native" ? "border-[#0B3C5D]/30 bg-[#0B3C5D]/10 text-[#0B3C5D]" : "border-[#0B3C5D]/15 bg-white text-[#1A1A1A]/70"}`}
          >
            Sponsorlu Kart
          </button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input required value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} placeholder="Reklam adı" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
          <input required value={draft.advertiser_name} onChange={(e) => setDraft((d) => ({ ...d, advertiser_name: e.target.value }))} placeholder="Reklamveren firma adı" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
          <input required value={draft.target_url} onChange={(e) => setDraft((d) => ({ ...d, target_url: e.target.value }))} placeholder="Hedef URL" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
          <input value={draft.cta_text} onChange={(e) => setDraft((d) => ({ ...d, cta_text: e.target.value }))} placeholder="CTA metni" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
          <select value={draft.position} onChange={(e) => setDraft((d) => ({ ...d, position: e.target.value as BlogAdRow["position"] }))} className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none">
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
          <input type="number" min={1} value={draft.weight} onChange={(e) => setDraft((d) => ({ ...d, weight: Number(e.target.value) }))} placeholder="Weight" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
          <label className="flex items-center gap-2 text-sm text-[#0B3C5D]">
            <input type="checkbox" checked={draft.is_active} onChange={(e) => setDraft((d) => ({ ...d, is_active: e.target.checked }))} />
            Aktif
          </label>
          <input type="datetime-local" value={draft.start_date} onChange={(e) => setDraft((d) => ({ ...d, start_date: e.target.value }))} className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
          <input type="datetime-local" value={draft.end_date} onChange={(e) => setDraft((d) => ({ ...d, end_date: e.target.value }))} className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {draft.ad_type === "image" ? (
            <>
              <label className="rounded-xl border border-dashed border-[#0B3C5D]/20 bg-[#F7F9FB] px-3 py-2 text-sm font-semibold text-[#0B3C5D]">
                Reklam görseli yükle
                <input type="file" accept="image/png,image/jpeg,image/webp" className="mt-1 block w-full text-xs" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadAsset(f, "image", "image_url"); }} />
              </label>
              <input value={draft.image_url} onChange={(e) => setDraft((d) => ({ ...d, image_url: e.target.value }))} placeholder="Görsel URL (otomatik dolabilir)" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
            </>
          ) : (
            <>
              <input value={draft.sponsor_name} onChange={(e) => setDraft((d) => ({ ...d, sponsor_name: e.target.value }))} placeholder="Sponsor / firma adı" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
              <label className="rounded-xl border border-dashed border-[#0B3C5D]/20 bg-[#F7F9FB] px-3 py-2 text-sm font-semibold text-[#0B3C5D]">
                Sponsor logo yükle
                <input type="file" accept="image/png,image/jpeg,image/webp" className="mt-1 block w-full text-xs" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadAsset(f, "logo", "sponsor_logo_url"); }} />
              </label>
              <input value={draft.sponsor_logo_url} onChange={(e) => setDraft((d) => ({ ...d, sponsor_logo_url: e.target.value }))} placeholder="Sponsor logo URL" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
              <label className="rounded-xl border border-dashed border-[#0B3C5D]/20 bg-[#F7F9FB] px-3 py-2 text-sm font-semibold text-[#0B3C5D]">
                Kart görseli yükle (opsiyonel)
                <input type="file" accept="image/png,image/jpeg,image/webp" className="mt-1 block w-full text-xs" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadAsset(f, "native", "native_image_url"); }} />
              </label>
              <input value={draft.native_image_url} onChange={(e) => setDraft((d) => ({ ...d, native_image_url: e.target.value }))} placeholder="Kart görsel URL" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
              <input value={draft.native_title} onChange={(e) => setDraft((d) => ({ ...d, native_title: e.target.value }))} placeholder="Kart başlığı" className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
              <textarea value={draft.native_description} onChange={(e) => setDraft((d) => ({ ...d, native_description: e.target.value }))} placeholder="Kısa açıklama" rows={3} className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm outline-none" />
            </>
          )}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-3">
            <p className="text-xs font-semibold text-[#0B3C5D]/70">Kategori hedefleme</p>
            <div className="mt-2 max-h-28 space-y-1 overflow-auto text-xs">
              {categoryOptions.map((item) => (
                <label key={item.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={draft.target_category_ids.includes(item.id)} onChange={(e) => setDraft((d) => ({ ...d, target_category_ids: toggleList(d.target_category_ids, item.id, e.target.checked) }))} />
                  {item.name}
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-3">
            <p className="text-xs font-semibold text-[#0B3C5D]/70">Ülke hedefleme</p>
            <div className="mt-2 max-h-28 space-y-1 overflow-auto text-xs">
              {countryOptions.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" checked={draft.target_countries.includes(item)} onChange={(e) => setDraft((d) => ({ ...d, target_countries: toggleList(d.target_countries, item, e.target.checked) }))} />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-3">
            <p className="text-xs font-semibold text-[#0B3C5D]/70">Vize türü hedefleme</p>
            <div className="mt-2 max-h-28 space-y-1 overflow-auto text-xs">
              {visaTypeOptions.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" checked={draft.target_visa_types.includes(item)} onChange={(e) => setDraft((d) => ({ ...d, target_visa_types: toggleList(d.target_visa_types, item, e.target.checked) }))} />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" disabled={pending} className="rounded-xl bg-[#D9A441] px-5 py-2 text-sm font-semibold text-[#1A1A1A]">
            Kaydet
          </button>
          {draft.id ? (
            <button type="button" onClick={reset} className="rounded-xl border border-[#0B3C5D]/15 px-4 py-2 text-sm font-semibold text-[#0B3C5D]">
              Yeni kayda geç
            </button>
          ) : null}
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
        <table className="min-w-[900px] w-full border-collapse text-left text-sm">
          <thead className="bg-[#F4F6F8] text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/55">
            <tr>
              <th className="px-3 py-3">Başlık</th>
              <th className="px-3 py-3">Tip</th>
              <th className="px-3 py-3">Pozisyon</th>
              <th className="px-3 py-3">Weight</th>
              <th className="px-3 py-3">30g Gösterim</th>
              <th className="px-3 py-3">30g Tıklama</th>
              <th className="px-3 py-3">CTR</th>
              <th className="px-3 py-3">Durum</th>
              <th className="px-3 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0B3C5D]/10">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-[#F7F9FB]/80">
                <td className="px-3 py-3 font-semibold text-[#0B3C5D]">{r.title}</td>
                <td className="px-3 py-3">{r.ad_type === "native" ? "Sponsorlu Kart" : "Görsel"}</td>
                <td className="px-3 py-3">{r.position}</td>
                <td className="px-3 py-3">{r.weight}</td>
                <td className="px-3 py-3">{metricsByAd[r.id]?.impressions ?? 0}</td>
                <td className="px-3 py-3">{metricsByAd[r.id]?.clicks ?? 0}</td>
                <td className="px-3 py-3">%{(metricsByAd[r.id]?.ctr ?? 0).toFixed(2)}</td>
                <td className="px-3 py-3 text-xs">{r.is_active ? "Aktif" : "Pasif"}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          id: r.id,
                          ad_type: r.ad_type,
                          title: r.title,
                          advertiser_name: r.advertiser_name,
                          image_url: r.image_url ?? "",
                          cta_text: r.cta_text ?? "",
                          sponsor_name: r.sponsor_name ?? "",
                          sponsor_logo_url: r.sponsor_logo_url ?? "",
                          native_image_url: r.native_image_url ?? "",
                          native_title: r.native_title ?? "",
                          native_description: r.native_description ?? "",
                          target_url: r.target_url,
                          position: r.position,
                          target_category_ids: r.target_category_ids ?? [],
                          target_countries: r.target_countries ?? [],
                          target_visa_types: r.target_visa_types ?? [],
                          weight: r.weight,
                          start_date: r.start_date.slice(0, 16),
                          end_date: r.end_date ?? "",
                          is_active: r.is_active,
                        })
                      }
                      className="text-xs font-semibold text-[#328CC1] hover:underline"
                    >
                      Düzenle
                    </button>
                    <button type="button" onClick={() => void remove(r.id)} className="text-xs font-semibold text-red-600 hover:underline">
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

