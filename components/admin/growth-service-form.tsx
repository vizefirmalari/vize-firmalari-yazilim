"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { adminDeleteGrowthService, adminSaveGrowthService } from "@/lib/actions/growth-admin";

type Cat = { id: string; name: string };

type Initial = {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string | null;
  setup_price: number | null;
  monthly_price: number | null;
  yearly_price?: number | null;
  is_custom_price: boolean;
  package_includes: string[] | null;
  is_active: boolean;
  is_featured: boolean;
  is_popular?: boolean;
  is_new?: boolean;
  is_fast_setup?: boolean;
  public_storefront_enabled?: boolean;
  badge: string | null;
  sort_order: number;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_path_override?: string | null;
  og_image_url?: string | null;
  hero_image_url?: string | null;
  cover_image_url?: string | null;
  thumbnail_image_url?: string | null;
  mobile_cover_image_url?: string | null;
  what_it_does?: string | null;
  who_for?: string | null;
  how_it_works?: string | null;
};

function numOrNull(v: string): number | null {
  const t = v.trim();
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : null;
}

function includesToText(arr: string[] | null | undefined): string {
  if (!arr?.length) return "";
  return arr.join("\n");
}

export function GrowthServiceForm({ categories, initial }: { categories: Cat[]; initial: Initial | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [deletePending, startDelete] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  const [categoryId, setCategoryId] = useState(initial?.category_id ?? categories[0]?.id ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [shortDescription, setShortDescription] = useState(initial?.short_description ?? "");
  const [longDescription, setLongDescription] = useState(initial?.long_description ?? "");
  const [setup, setSetup] = useState(initial?.setup_price != null ? String(initial.setup_price) : "");
  const [monthly, setMonthly] = useState(initial?.monthly_price != null ? String(initial.monthly_price) : "");
  const [isCustomPrice, setIsCustomPrice] = useState(initial?.is_custom_price ?? false);
  const [includesText, setIncludesText] = useState(includesToText(initial?.package_includes ?? null));
  const [isActive, setIsActive] = useState(initial?.is_active ?? true);
  const [isFeatured, setIsFeatured] = useState(initial?.is_featured ?? false);
  const [badge, setBadge] = useState(initial?.badge ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [yearly, setYearly] = useState(initial?.yearly_price != null ? String(initial.yearly_price) : "");
  const [isPopular, setIsPopular] = useState(initial?.is_popular ?? false);
  const [isNew, setIsNew] = useState(initial?.is_new ?? false);
  const [isFastSetup, setIsFastSetup] = useState(initial?.is_fast_setup ?? false);
  const [publicStorefront, setPublicStorefront] = useState(initial?.public_storefront_enabled ?? true);
  const [seoTitle, setSeoTitle] = useState(initial?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seo_description ?? "");
  const [canonicalOverride, setCanonicalOverride] = useState(initial?.canonical_path_override ?? "");
  const [ogImageUrl, setOgImageUrl] = useState(initial?.og_image_url ?? "");
  const [heroUrl, setHeroUrl] = useState(initial?.hero_image_url ?? "");
  const [coverUrl, setCoverUrl] = useState(initial?.cover_image_url ?? "");
  const [thumbUrl, setThumbUrl] = useState(initial?.thumbnail_image_url ?? "");
  const [mobileCoverUrl, setMobileCoverUrl] = useState(initial?.mobile_cover_image_url ?? "");
  const [whatItDoes, setWhatItDoes] = useState(initial?.what_it_does ?? "");
  const [whoFor, setWhoFor] = useState(initial?.who_for ?? "");
  const [howItWorks, setHowItWorks] = useState(initial?.how_it_works ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!categoryId) {
      setMsg("Kategori seçin.");
      return;
    }
    const packageLines = includesText.split(/\r?\n/).map((l) => l.trim());
    startTransition(async () => {
      const res = await adminSaveGrowthService({
        id: initial?.id,
        category_id: categoryId,
        slug: slug.trim() || undefined,
        title,
        short_description: shortDescription,
        long_description: longDescription || null,
        setup_price: numOrNull(setup),
        monthly_price: numOrNull(monthly),
        yearly_price: numOrNull(yearly),
        is_custom_price: isCustomPrice,
        package_includes: packageLines.filter(Boolean),
        is_active: isActive,
        is_featured: isFeatured,
        is_popular: isPopular,
        is_new: isNew,
        is_fast_setup: isFastSetup,
        public_storefront_enabled: publicStorefront,
        badge: badge || null,
        sort_order: sortOrder,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        canonical_path_override: canonicalOverride || null,
        og_image_url: ogImageUrl || null,
        hero_image_url: heroUrl || null,
        cover_image_url: coverUrl || null,
        thumbnail_image_url: thumbUrl || null,
        mobile_cover_image_url: mobileCoverUrl || null,
        what_it_does: whatItDoes || null,
        who_for: whoFor || null,
        how_it_works: howItWorks || null,
      });
      if (!res.ok) {
        setMsg(res.error);
        return;
      }
      setMsg("Kaydedildi.");
      if (!initial?.id) {
        router.push(`/admin/growth/services/${res.id}`);
      } else {
        router.refresh();
      }
    });
  }

  function onDelete() {
    if (!initial?.id) return;
    if (!confirm("Bu hizmeti kalıcı olarak silmek istiyor musunuz? Bağlı talep/abonelik varsa silme başarısız olur.")) {
      return;
    }
    setMsg(null);
    startDelete(async () => {
      const res = await adminDeleteGrowthService(initial.id);
      if (!res.ok) {
        setMsg(res.error);
        return;
      }
      router.push("/admin/growth/services");
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
      {msg ? (
        <p className="text-sm font-medium text-[#0B3C5D]" role="status">
          {msg}
        </p>
      ) : null}

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Kategori</label>
        <select
          required
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Başlık</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Slug (boş bırakılırsa başlıktan üretilir)</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="ornek-hizmet-slug"
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 font-mono text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Kısa açıklama (kart)</label>
        <textarea
          required
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Uzun açıklama (detay, isteğe bağlı)</label>
        <textarea
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          rows={5}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]/55">Paket içeriği (her satır bir madde; kartta listelenir)</label>
        <textarea
          value={includesText}
          onChange={(e) => setIncludesText(e.target.value)}
          rows={4}
          placeholder={"Örnek:\nWebsite\nWhatsApp Bot"}
          className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-[#1A1A1A]/55">Kurulum (TL, boş = yok)</label>
          <input
            value={setup}
            onChange={(e) => setSetup(e.target.value)}
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#1A1A1A]/55">Aylık (TL, boş = yok)</label>
          <input
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={isCustomPrice} onChange={(e) => setIsCustomPrice(e.target.checked)} />
        Özel fiyat (vitrinde tutar yerine “teklif üzerinden”)
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-[#1A1A1A]/55">Rozet (örn. Önerilen)</label>
          <input
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#1A1A1A]/55">Sıra</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Aktif
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
          Öne çıkar
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} />
          En çok tercih edilen
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
          Yeni
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isFastSetup} onChange={(e) => setIsFastSetup(e.target.checked)} />
          Hızlı kurulum
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={publicStorefront}
            onChange={(e) => setPublicStorefront(e.target.checked)}
          />
          Kamu vitrininde göster
        </label>
      </div>

      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-5">
        <p className="text-sm font-bold text-[#0B3C5D]">Kamu vitrin & SEO</p>
        <p className="mt-1 text-xs text-[#1A1A1A]/55">
          Görseller tam URL veya Supabase <code className="font-mono text-[11px]">media</code> bucket path olabilir.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Yıllık (TL)</label>
            <input
              value={yearly}
              onChange={(e) => setYearly(e.target.value)}
              inputMode="numeric"
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[#1A1A1A]/55">SEO başlık</label>
            <input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[#1A1A1A]/55">SEO açıklama</label>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Canonical path (isteğe bağlı, / ile)</label>
            <input
              value={canonicalOverride}
              onChange={(e) => setCanonicalOverride(e.target.value)}
              placeholder="/yazilim-cozumleri/ornek-slug"
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 font-mono text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[#1A1A1A]/55">OG görsel URL</label>
            <input
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Hero görsel</label>
            <input
              value={heroUrl}
              onChange={(e) => setHeroUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Kapak görsel</label>
            <input
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Thumbnail</label>
            <input
              value={thumbUrl}
              onChange={(e) => setThumbUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Mobil kapak</label>
            <input
              value={mobileCoverUrl}
              onChange={(e) => setMobileCoverUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Sistem ne işe yarar?</label>
            <textarea
              value={whatItDoes}
              onChange={(e) => setWhatItDoes(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Kimler için?</label>
            <textarea
              value={whoFor}
              onChange={(e) => setWhoFor(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[#1A1A1A]/55">Süreç nasıl işler?</label>
            <textarea
              value={howItWorks}
              onChange={(e) => setHowItWorks(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending || !categories.length}
          className="rounded-xl bg-[#0B3C5D] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </button>
        {initial?.id ? (
          <button
            type="button"
            disabled={deletePending}
            onClick={onDelete}
            className="rounded-xl border border-[#1A1A1A]/20 px-5 py-2.5 text-sm font-semibold text-[#1A1A1A]/70 transition hover:bg-[#F4F6F8] disabled:opacity-50"
          >
            {deletePending ? "Siliniyor…" : "Hizmeti sil"}
          </button>
        ) : null}
      </div>
    </form>
  );
}
