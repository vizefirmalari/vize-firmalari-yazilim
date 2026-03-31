"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBlogAd, upsertBlogAd, uploadBlogAdAsset } from "@/lib/actions/blog-ads-admin";
import type { BlogAdRow } from "@/lib/blog/ads";

type Metrics = {
  impressions: number;
  clicks: number;
  ctr: number;
};

export function BlogAdsManager({
  rows,
  metricsByAd,
  slotSummary,
  categoryOptions,
  countryOptions,
  visaTypeOptions,
}: {
  rows: BlogAdRow[];
  metricsByAd: Record<string, Metrics>;
  slotSummary: Array<{ slot: "top" | "middle" | "bottom"; impressions: number; clicks: number; ctr: number }>;
  categoryOptions: Array<{ id: string; name: string }>;
  countryOptions: string[];
  visaTypeOptions: string[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
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

