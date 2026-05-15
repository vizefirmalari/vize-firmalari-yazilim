"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition, type ReactNode } from "react";

import {
  adminAddServiceStorefrontRelated,
  adminDeleteServiceStorefrontFaq,
  adminDeleteServiceStorefrontFeature,
  adminDeleteServiceStorefrontImage,
  adminDeleteServiceStorefrontRelated,
  adminPatchServiceStorefrontFaq,
  adminReorderServiceStorefrontFaq,
  adminReorderServiceStorefrontFeatures,
  adminReorderServiceStorefrontImages,
  adminReorderServiceStorefrontRelated,
  adminSaveServiceStorefrontItem,
  adminSetPrimaryServiceStorefrontImage,
  adminUpdateServiceStorefrontImage,
  adminUpdateServiceStorefrontRelated,
  adminUploadServiceStorefrontImage,
  adminUpsertServiceStorefrontFaq,
  adminUpsertServiceStorefrontFeature,
  type ServiceStorefrontImageType,
} from "@/lib/actions/service-storefront-admin";
import { SERVICE_STOREFRONT_PUBLIC_BASE, SERVICE_STOREFRONT_WHATSAPP_URL, serviceStorefrontDetailPath } from "@/lib/constants/service-storefront";
import { formatTryLira } from "@/lib/format/try-lira";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import { publicMediaObjectUrl } from "@/lib/media/supabase-public";
import { absoluteUrl, resolveCanonicalUrl } from "@/lib/seo/canonical";
import { slugifyGrowth } from "@/lib/slug/growth-slug";

type TabId = "content" | "images" | "pricing" | "service" | "adv" | "faq" | "seo" | "publish";

type ImgRow = {
  id: string;
  image_type: string;
  storage_path: string | null;
  image_url: string | null;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  is_active: boolean;
};

function tabBtn(active: boolean, onClick: () => void, children: ReactNode) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-bold sm:text-sm ${
        active ? "border-[#0B3C5D] bg-[#0B3C5D] text-white" : "border-[#0B3C5D]/15 bg-white text-[#0B3C5D]"
      }`}
    >
      {children}
    </button>
  );
}

function displayUrl(img: ImgRow): string | null {
  const u = img.image_url?.trim();
  if (u) return u;
  const sp = img.storage_path?.trim();
  return publicMediaObjectUrl(sp ?? "") || null;
}

function numOrNull(v: string): number | null {
  const t = v.trim();
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : null;
}

const DEFAULT_CATS = [
  "Reklam & Müşteri Kazanımı",
  "Yapay Zeka & Otomasyon",
  "Web & Yazılım",
  "İçerik & Medya",
  "Premium Sistemler",
  "Akıllı Paketler",
];

export type ServiceStorefrontEditInitial = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  short_description: string;
  long_description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_path: string | null;
  og_image_url: string | null;
  status: "draft" | "published" | "archived";
  is_featured: boolean;
  is_popular: boolean;
  is_new: boolean;
  sort_order: number;
  setup_price: number | null;
  subscription_price: number | null;
  yearly_price: number | null;
  subscription_period: string | null;
  currency: string;
  custom_price: boolean;
  seo_focus_keyword: string | null;
  seo_secondary_keywords: string[];
  discount_label: string | null;
  delivery_time: string | null;
  setup_time: string | null;
  support_duration: string | null;
  target_audience: string | null;
  service_scope: string | null;
  setup_scope: string | null;
  monthly_scope: string | null;
  post_support_notes: string | null;
  prerequisites: string | null;
  process_description: string | null;
  robots_index: boolean;
  robots_follow: boolean;
  sitemap_include: boolean;
};

export function ServiceStorefrontEditShell(props: {
  initial: ServiceStorefrontEditInitial;
  initialImages: ImgRow[];
  initialFaq: { id: string; question: string; answer: string; sort_order: number; is_active: boolean }[];
  initialFeatures: { id: string; title: string; description: string | null; icon: string | null; sort_order: number; is_active: boolean }[];
  initialRelated: { id: string; related_service_id: string; sort_order: number; is_active: boolean; related_title: string }[];
  allServices: { id: string; title: string; status: string }[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("content");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [side, startSide] = useTransition();

  const svc = props.initial;

  const [title, setTitle] = useState(svc.title);
  const [slug, setSlug] = useState(svc.slug);
  const [category, setCategory] = useState(svc.category);
  const [tagsText, setTagsText] = useState(svc.tags.join(", "));
  const [shortDescription, setShortDescription] = useState(svc.short_description);
  const [longDescription, setLongDescription] = useState(svc.long_description ?? "");

  const [setup, setSetup] = useState(svc.setup_price != null ? String(svc.setup_price) : "");
  const [subPrice, setSubPrice] = useState(svc.subscription_price != null ? String(svc.subscription_price) : "");
  const [yearlyPrice, setYearlyPrice] = useState(svc.yearly_price != null ? String(svc.yearly_price) : "");
  const [subPeriod, setSubPeriod] = useState(svc.subscription_period ?? "");
  const [currency, setCurrency] = useState(svc.currency || "TRY");
  const [customPrice, setCustomPrice] = useState(svc.custom_price);
  const [discountLabel, setDiscountLabel] = useState(svc.discount_label ?? "");

  const [deliveryTime, setDeliveryTime] = useState(svc.delivery_time ?? "");
  const [setupTime, setSetupTime] = useState(svc.setup_time ?? "");
  const [supportDuration, setSupportDuration] = useState(svc.support_duration ?? "");
  const [targetAudience, setTargetAudience] = useState(svc.target_audience ?? "");
  const [serviceScope, setServiceScope] = useState(svc.service_scope ?? "");
  const [setupScope, setSetupScope] = useState(svc.setup_scope ?? "");
  const [monthlyScope, setMonthlyScope] = useState(svc.monthly_scope ?? "");
  const [postSupport, setPostSupport] = useState(svc.post_support_notes ?? "");
  const [prerequisites, setPrerequisites] = useState(svc.prerequisites ?? "");
  const [processDescription, setProcessDescription] = useState(svc.process_description ?? "");

  const [seoTitle, setSeoTitle] = useState(svc.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(svc.seo_description ?? "");
  const [canonicalPath, setCanonicalPath] = useState(svc.canonical_path ?? "");
  const [seoFocus, setSeoFocus] = useState(svc.seo_focus_keyword ?? "");
  const [seoSecondary, setSeoSecondary] = useState((svc.seo_secondary_keywords ?? []).join(", "));
  const [ogUrl, setOgUrl] = useState(svc.og_image_url ?? "");

  const [status, setStatus] = useState(svc.status);
  const [isFeatured, setIsFeatured] = useState(svc.is_featured);
  const [isPopular, setIsPopular] = useState(svc.is_popular);
  const [isNew, setIsNew] = useState(svc.is_new);
  const [sortOrder, setSortOrder] = useState(svc.sort_order);
  const [robotsIndex, setRobotsIndex] = useState(svc.robots_index);
  const [robotsFollow, setRobotsFollow] = useState(svc.robots_follow);
  const [sitemapInclude, setSitemapInclude] = useState(svc.sitemap_include);

  const [galType, setGalType] = useState<ServiceStorefrontImageType>("square");
  const [galAlt, setGalAlt] = useState("");
  const [galManual, setGalManual] = useState("");

  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");
  const [newFeatTitle, setNewFeatTitle] = useState("");
  const [newFeatDesc, setNewFeatDesc] = useState("");
  const [newFeatIcon, setNewFeatIcon] = useState("");
  const [relPick, setRelPick] = useState("");

  const sync = useCallback(() => {
    const s = props.initial;
    setTitle(s.title);
    setSlug(s.slug);
    setCategory(s.category);
    setTagsText(s.tags.join(", "));
    setShortDescription(s.short_description);
    setLongDescription(s.long_description ?? "");
    setSetup(s.setup_price != null ? String(s.setup_price) : "");
    setSubPrice(s.subscription_price != null ? String(s.subscription_price) : "");
    setYearlyPrice(s.yearly_price != null ? String(s.yearly_price) : "");
    setSubPeriod(s.subscription_period ?? "");
    setCurrency(s.currency || "TRY");
    setCustomPrice(s.custom_price);
    setDiscountLabel(s.discount_label ?? "");
    setDeliveryTime(s.delivery_time ?? "");
    setSetupTime(s.setup_time ?? "");
    setSupportDuration(s.support_duration ?? "");
    setTargetAudience(s.target_audience ?? "");
    setServiceScope(s.service_scope ?? "");
    setSetupScope(s.setup_scope ?? "");
    setMonthlyScope(s.monthly_scope ?? "");
    setPostSupport(s.post_support_notes ?? "");
    setPrerequisites(s.prerequisites ?? "");
    setProcessDescription(s.process_description ?? "");
    setSeoTitle(s.seo_title ?? "");
    setSeoDescription(s.seo_description ?? "");
    setCanonicalPath(s.canonical_path ?? "");
    setSeoFocus(s.seo_focus_keyword ?? "");
    setSeoSecondary((s.seo_secondary_keywords ?? []).join(", "));
    setOgUrl(s.og_image_url ?? "");
    setStatus(s.status);
    setIsFeatured(s.is_featured);
    setIsPopular(s.is_popular);
    setIsNew(s.is_new);
    setSortOrder(s.sort_order);
    setRobotsIndex(s.robots_index);
    setRobotsFollow(s.robots_follow);
    setSitemapInclude(s.sitemap_include);
  }, [props.initial]);

  useEffect(() => {
    sync();
  }, [sync]);

  const gallerySorted = useMemo(
    () => [...props.initialImages].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialImages]
  );
  const faqSorted = useMemo(
    () => [...props.initialFaq].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialFaq]
  );
  const featSorted = useMemo(
    () => [...props.initialFeatures].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialFeatures]
  );
  const relSorted = useMemo(
    () => [...props.initialRelated].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialRelated]
  );

  const galleryUrls = useMemo(() => {
    return gallerySorted.map((im) => ({ id: im.id, label: `${im.image_type} #${im.sort_order}`, url: displayUrl(im) })).filter((x) => x.url);
  }, [gallerySorted]);

  const previewPath = serviceStorefrontDetailPath(slug.trim() || svc.slug);
  const previewCanonical = useMemo(() => {
    const fb = absoluteUrl(previewPath);
    return resolveCanonicalUrl(canonicalPath.trim() || null, fb);
  }, [canonicalPath, previewPath]);

  function run(fn: () => Promise<{ ok: boolean; error?: string }>, okMsg?: string) {
    setMsg(null);
    startSide(async () => {
      const res = await fn();
      if (!res.ok) {
        setMsg("error" in res && res.error ? res.error : "Hata");
        return;
      }
      setMsg(okMsg ?? "Güncellendi.");
      router.refresh();
    });
  }

  function saveCore() {
    setMsg(null);
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    start(async () => {
      const res = await adminSaveServiceStorefrontItem({
        id: svc.id,
        title,
        slug: slug.trim() || undefined,
        category,
        tags,
        short_description: shortDescription,
        long_description: longDescription.trim() || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        canonical_path: canonicalPath.trim() || null,
        og_image_url: ogUrl.trim() || null,
        status,
        is_featured: isFeatured,
        is_popular: isPopular,
        is_new: isNew,
        sort_order: sortOrder,
        setup_price: numOrNull(setup),
        subscription_price: numOrNull(subPrice),
        yearly_price: numOrNull(yearlyPrice),
        subscription_period: subPeriod.trim() || null,
        currency,
        custom_price: customPrice,
        seo_focus_keyword: seoFocus.trim() || null,
        seo_secondary_keywords: seoSecondary
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 30),
        discount_label: discountLabel.trim() || null,
        delivery_time: deliveryTime.trim() || null,
        setup_time: setupTime.trim() || null,
        support_duration: supportDuration.trim() || null,
        target_audience: targetAudience.trim() || null,
        service_scope: serviceScope.trim() || null,
        setup_scope: setupScope.trim() || null,
        monthly_scope: monthlyScope.trim() || null,
        post_support_notes: postSupport.trim() || null,
        prerequisites: prerequisites.trim() || null,
        process_description: processDescription.trim() || null,
        robots_index: robotsIndex,
        robots_follow: robotsFollow,
        sitemap_include: sitemapInclude,
      });
      if (!res.ok) setMsg(res.error);
      else {
        setMsg("Kaydedildi.");
        router.refresh();
      }
    });
  }

  const relPickList = useMemo(() => {
    const bound = new Set(props.initialRelated.map((r) => r.related_service_id));
    return props.allServices.filter((s) => s.id !== svc.id && !bound.has(s.id));
  }, [props.allServices, props.initialRelated, svc.id]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-xl font-bold text-[#0B3C5D] sm:text-2xl">{title || "Başlıksız"}</h1>
          <p className="text-xs font-semibold text-[#1A1A1A]/50">{status}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={pending} onClick={saveCore} className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
            Kaydet
          </button>
          <Link href={status === "published" ? previewPath : "#"} className={`rounded-xl border px-4 py-2 text-sm font-bold ${status === "published" ? "border-[#0B3C5D]/25 text-[#0B3C5D]" : "pointer-events-none border-[#0B3C5D]/10 text-[#1A1A1A]/35"}`} target="_blank" rel="noopener noreferrer">
            Önizle
          </Link>
          <Link href={SERVICE_STOREFRONT_PUBLIC_BASE} className="rounded-xl border border-[#0B3C5D]/15 px-4 py-2 text-sm font-bold text-[#0B3C5D]" target="_blank" rel="noopener noreferrer">
            Vitrin
          </Link>
        </div>
      </div>
      {msg ? <p className="text-sm font-semibold text-[#0B3C5D]">{msg}</p> : null}

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
        {tabBtn(tab === "content", () => setTab("content"), "İçerik")}
        {tabBtn(tab === "images", () => setTab("images"), "Görseller")}
        {tabBtn(tab === "pricing", () => setTab("pricing"), "Fiyatlandırma")}
        {tabBtn(tab === "service", () => setTab("service"), "Hizmet bilgileri")}
        {tabBtn(tab === "adv", () => setTab("adv"), "Avantajlar")}
        {tabBtn(tab === "faq", () => setTab("faq"), "SSS")}
        {tabBtn(tab === "seo", () => setTab("seo"), "SEO")}
        {tabBtn(tab === "publish", () => setTab("publish"), "Yayın")}
      </div>

      {tab === "content" ? (
        <div className="grid gap-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Hizmet adı
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Slug
            <div className="mt-1 flex gap-2">
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 rounded-xl border px-3 py-2 text-sm" />
              <button type="button" className="rounded-xl border px-3 text-xs font-bold text-[#0B3C5D]" onClick={() => setSlug(slugifyGrowth(title))}>
                Üret
              </button>
            </div>
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Kategori
            <input value={category} onChange={(e) => setCategory(e.target.value)} list="edit-cats" className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            <datalist id="edit-cats">
              {DEFAULT_CATS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Etiketler (virgülle)
            <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Kısa açıklama
            <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Uzun açıklama
            <textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={8} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
          </label>
        </div>
      ) : null}

      {tab === "images" ? (
        <div className="space-y-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#0B3C5D]">Görseller (1200×1200 kare önerilir)</p>
          <form
            className="space-y-3 rounded-xl border border-dashed border-[#0B3C5D]/20 bg-[#F7F9FB] p-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              fd.set("serviceId", svc.id);
              fd.set("image_type", galType);
              fd.set("alt_text", galAlt);
              fd.set("manual_url", galManual);
              run(async () => adminUploadServiceStorefrontImage(fd), "Yüklendi.");
              setGalAlt("");
              setGalManual("");
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <select value={galType} onChange={(e) => setGalType(e.target.value as ServiceStorefrontImageType)} className="rounded-xl border px-3 py-2 text-sm">
                <option value="square">Kare (1200)</option>
                <option value="cover">Kapak</option>
                <option value="detail">Detay</option>
                <option value="gallery">Galeri</option>
              </select>
              <input name="file" type="file" accept="image/png,image/jpeg,image/webp" className="text-sm" />
            </div>
            <input value={galAlt} onChange={(e) => setGalAlt(e.target.value)} placeholder="Alt metin" className="w-full rounded-xl border px-3 py-2 text-sm" />
            <details className="text-xs">
              <summary className="cursor-pointer font-bold text-[#0B3C5D]">Gelişmiş: manuel URL</summary>
              <input value={galManual} onChange={(e) => setGalManual(e.target.value)} className="mt-2 w-full rounded border px-2 py-1" placeholder="https://..." />
            </details>
            <button type="submit" disabled={side} className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white">
              Yükle
            </button>
          </form>
          <ul className="grid gap-3 sm:grid-cols-2">
            {gallerySorted.map((im, idx) => {
              const src = displayUrl(im);
              return (
                <li key={im.id} className="rounded-xl border p-3 text-xs">
                  <div className="relative mb-2 aspect-square max-h-40 w-full overflow-hidden rounded-lg bg-[#F7F9FB]">
                    {src ? (
                      <Image src={withSupabaseImageTransform(src, { width: 400, quality: 75 }) || src} alt="" fill className="object-cover" unoptimized={!src.includes("supabase")} />
                    ) : null}
                  </div>
                  <p className="font-bold text-[#0B3C5D]">
                    {im.image_type} {im.is_primary ? "· ana" : ""}
                  </p>
                  <input
                    defaultValue={im.alt_text ?? ""}
                    className="mt-1 w-full rounded border px-2 py-1"
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (v === (im.alt_text ?? "")) return;
                      void adminUpdateServiceStorefrontImage({ id: im.id, serviceId: svc.id, alt_text: v || null }).then(() => router.refresh());
                    }}
                  />
                  <div className="mt-2 flex flex-wrap gap-1">
                    <button type="button" disabled={idx === 0} className="rounded border px-2" onClick={() => {
                      const n = [...gallerySorted];
                      [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]];
                      run(() => adminReorderServiceStorefrontImages({ serviceId: svc.id, orderedIds: n.map((x) => x.id) }));
                    }}>↑</button>
                    <button type="button" disabled={idx === gallerySorted.length - 1} className="rounded border px-2" onClick={() => {
                      const n = [...gallerySorted];
                      [n[idx + 1], n[idx]] = [n[idx], n[idx + 1]];
                      run(() => adminReorderServiceStorefrontImages({ serviceId: svc.id, orderedIds: n.map((x) => x.id) }));
                    }}>↓</button>
                    <button type="button" className="rounded border px-2" onClick={() => run(() => adminSetPrimaryServiceStorefrontImage({ id: im.id, serviceId: svc.id }), "Ana görsel")}>Ana</button>
                    <button type="button" className="rounded border px-2" onClick={() => run(() => adminUpdateServiceStorefrontImage({ id: im.id, serviceId: svc.id, is_active: !im.is_active }))}>{im.is_active ? "Pasif" : "Aktif"}</button>
                    <button type="button" className="rounded border border-red-600/30 px-2 text-red-700" onClick={() => {
                      if (!confirm("Silinsin mi?")) return;
                      run(() => adminDeleteServiceStorefrontImage({ id: im.id, serviceId: svc.id }));
                    }}>Sil</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {tab === "pricing" ? (
        <div className="grid gap-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm sm:grid-cols-2">
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Para birimi
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm">
              <option value="TRY">TRY</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </label>
          <label className="flex items-end gap-2 pb-1 text-sm font-bold text-[#0B3C5D]">
            <input type="checkbox" checked={customPrice} onChange={(e) => setCustomPrice(e.target.checked)} />
            Teklif üzerinden
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Kurulum
            <input value={setup} onChange={(e) => setSetup(e.target.value)} disabled={customPrice} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm disabled:opacity-50" />
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Aylık abonelik
            <input value={subPrice} onChange={(e) => setSubPrice(e.target.value)} disabled={customPrice} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm disabled:opacity-50" />
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Yıllık abonelik
            <input value={yearlyPrice} onChange={(e) => setYearlyPrice(e.target.value)} disabled={customPrice} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm disabled:opacity-50" />
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Abonelik dönemi
            <input value={subPeriod} onChange={(e) => setSubPeriod(e.target.value)} placeholder="örn. aylık, yıllık" className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
          </label>
          <label className="sm:col-span-2 text-xs font-bold text-[#1A1A1A]/55">
            İndirim etiketi (opsiyonel)
            <input value={discountLabel} onChange={(e) => setDiscountLabel(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
          </label>
        </div>
      ) : null}

      {tab === "service" ? (
        <div className="grid gap-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
          {[
            ["Kurulum süresi", setupTime, setSetupTime],
            ["Teslimat süresi", deliveryTime, setDeliveryTime],
            ["Destek süresi", supportDuration, setSupportDuration],
            ["Hizmet kapsamı (genel)", serviceScope, setServiceScope],
            ["İlk kurulum kapsamı", setupScope, setSetupScope],
            ["Aylık hizmet kapsamı", monthlyScope, setMonthlyScope],
            ["Kimler için uygun?", targetAudience, setTargetAudience],
            ["Gerekli bilgiler", prerequisites, setPrerequisites],
            ["Hizmet sonrası destek", postSupport, setPostSupport],
            ["Uygulama süreci", processDescription, setProcessDescription],
          ].map(([label, val, set]) => (
            <label key={String(label)} className="text-xs font-bold text-[#1A1A1A]/55">
              {String(label)}
              <textarea value={val as string} onChange={(e) => (set as (s: string) => void)(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            </label>
          ))}
        </div>
      ) : null}

      {tab === "adv" ? (
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
          <ul className="space-y-2">
            {featSorted.map((f, idx) => (
              <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm">
                <span>
                  {f.icon ? `${f.icon} ` : null}
                  <strong>{f.title}</strong> {f.description ? <span className="text-[#1A1A1A]/55">— {f.description}</span> : null}
                </span>
                <div className="flex gap-1">
                  <button type="button" disabled={idx === 0} className="rounded border px-2 text-xs" onClick={() => {
                    const n = [...featSorted];
                    [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]];
                    run(() => adminReorderServiceStorefrontFeatures({ serviceId: svc.id, orderedIds: n.map((x) => x.id) }));
                  }}>↑</button>
                  <button type="button" disabled={idx === featSorted.length - 1} className="rounded border px-2 text-xs" onClick={() => {
                    const n = [...featSorted];
                    [n[idx + 1], n[idx]] = [n[idx], n[idx + 1]];
                    run(() => adminReorderServiceStorefrontFeatures({ serviceId: svc.id, orderedIds: n.map((x) => x.id) }));
                  }}>↓</button>
                  <button type="button" className="rounded border px-2 text-xs text-red-700" onClick={() => run(() => adminDeleteServiceStorefrontFeature({ id: f.id, serviceId: svc.id }))}>Sil</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <input value={newFeatIcon} onChange={(e) => setNewFeatIcon(e.target.value)} placeholder="İkon" className="rounded-xl border px-3 py-2 text-sm" />
            <input value={newFeatTitle} onChange={(e) => setNewFeatTitle(e.target.value)} placeholder="Başlık" className="rounded-xl border px-3 py-2 text-sm" />
            <textarea value={newFeatDesc} onChange={(e) => setNewFeatDesc(e.target.value)} placeholder="Açıklama" rows={2} className="sm:col-span-2 rounded-xl border px-3 py-2 text-sm" />
            <button type="button" className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white sm:col-span-2" onClick={() => run(async () => {
              const res = await adminUpsertServiceStorefrontFeature({ serviceId: svc.id, title: newFeatTitle, description: newFeatDesc || null, icon: newFeatIcon || null, sort_order: featSorted.length });
              if (res.ok) { setNewFeatTitle(""); setNewFeatDesc(""); setNewFeatIcon(""); }
              return res;
            }, "Eklendi")}>+ Avantaj ekle</button>
          </div>
        </div>
      ) : null}

      {tab === "faq" ? (
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
          <ul className="space-y-3">
            {faqSorted.map((f, idx) => (
              <li key={f.id} className="rounded-xl border p-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  <button type="button" disabled={idx === 0} className="rounded border px-2 text-xs" onClick={() => {
                    const n = [...faqSorted];
                    [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]];
                    run(() => adminReorderServiceStorefrontFaq({ serviceId: svc.id, orderedIds: n.map((x) => x.id) }));
                  }}>↑</button>
                  <button type="button" disabled={idx === faqSorted.length - 1} className="rounded border px-2 text-xs" onClick={() => {
                    const n = [...faqSorted];
                    [n[idx + 1], n[idx]] = [n[idx], n[idx + 1]];
                    run(() => adminReorderServiceStorefrontFaq({ serviceId: svc.id, orderedIds: n.map((x) => x.id) }));
                  }}>↓</button>
                  <button type="button" className="rounded border px-2 text-xs" onClick={() => run(() => adminPatchServiceStorefrontFaq({ id: f.id, serviceId: svc.id, is_active: !f.is_active }))}>{f.is_active ? "Pasif" : "Aktif"}</button>
                  <button type="button" className="rounded border px-2 text-xs text-red-700" onClick={() => { if (confirm("Silinsin mi?")) run(() => adminDeleteServiceStorefrontFaq({ id: f.id, serviceId: svc.id })); }}>Sil</button>
                </div>
                <p className="mt-2 font-bold">{f.question}</p>
                <p className="text-xs text-[#1A1A1A]/70">{f.answer}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 rounded-xl border border-dashed p-4">
            <input value={newFaqQ} onChange={(e) => setNewFaqQ(e.target.value)} placeholder="Soru" className="w-full rounded-xl border px-3 py-2 text-sm" />
            <textarea value={newFaqA} onChange={(e) => setNewFaqA(e.target.value)} placeholder="Cevap" rows={3} className="w-full rounded-xl border px-3 py-2 text-sm" />
            <button type="button" className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white" onClick={() => run(async () => {
              const res = await adminUpsertServiceStorefrontFaq({ serviceId: svc.id, question: newFaqQ, answer: newFaqA, sort_order: faqSorted.length });
              if (res.ok) { setNewFaqQ(""); setNewFaqA(""); }
              return res;
            }, "Eklendi")}>+ Soru ekle</button>
          </div>
          <div className="mt-6 border-t pt-4">
            <p className="text-sm font-bold text-[#0B3C5D]">Benzer hizmetler</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <select value={relPick} onChange={(e) => setRelPick(e.target.value)} className="min-w-[12rem] flex-1 rounded-xl border px-3 py-2 text-sm">
                <option value="">Hizmet seç…</option>
                {relPickList.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
              <button type="button" className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white" onClick={() => {
                if (!relPick) return;
                run(async () => {
                  const res = await adminAddServiceStorefrontRelated({ serviceId: svc.id, related_service_id: relPick });
                  if (res.ok) setRelPick("");
                  return res;
                }, "Bağlandı");
              }}>Bağla</button>
            </div>
            <ul className="mt-3 space-y-2">
              {relSorted.map((r, idx) => (
                <li key={r.id} className="flex flex-wrap justify-between gap-2 rounded border px-3 py-2 text-sm">
                  <span>{r.related_title}</span>
                  <div className="flex gap-1">
                    <button type="button" disabled={idx === 0} className="rounded border px-2 text-xs" onClick={() => {
                      const n = [...relSorted];
                      [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]];
                      run(() => adminReorderServiceStorefrontRelated({ serviceId: svc.id, orderedIds: n.map((x) => x.id) }));
                    }}>↑</button>
                    <button type="button" disabled={idx === relSorted.length - 1} className="rounded border px-2 text-xs" onClick={() => {
                      const n = [...relSorted];
                      [n[idx + 1], n[idx]] = [n[idx], n[idx + 1]];
                      run(() => adminReorderServiceStorefrontRelated({ serviceId: svc.id, orderedIds: n.map((x) => x.id) }));
                    }}>↓</button>
                    <button type="button" className="rounded border px-2 text-xs" onClick={() => run(() => adminUpdateServiceStorefrontRelated({ id: r.id, serviceId: svc.id, is_active: !r.is_active }))}>{r.is_active ? "Pasif" : "Aktif"}</button>
                    <button type="button" className="rounded border px-2 text-xs text-red-700" onClick={() => { if (confirm("Kaldır?")) run(() => adminDeleteServiceStorefrontRelated({ id: r.id, serviceId: svc.id })); }}>Kaldır</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {tab === "seo" ? (
        <div className="grid gap-6 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              SEO title
              <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Meta description ({seoDescription.trim().length})
              <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
              <span className="mt-1 block text-[11px] font-medium text-[#1A1A1A]/45">
                {seoDescription.trim().length < 140
                  ? "140–160 karakter önerilir."
                  : seoDescription.trim().length > 160
                    ? "160 karakter civarında tutmayı deneyin."
                    : "İyi uzunluk."}
              </span>
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Canonical path
              <input value={canonicalPath} onChange={(e) => setCanonicalPath(e.target.value)} placeholder={previewPath} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
              <span className="mt-1 block text-[11px] text-[#1A1A1A]/45">Boş bırakılırsa: {previewPath}</span>
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Odak anahtar kelime
              <input value={seoFocus} onChange={(e) => setSeoFocus(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              İkincil anahtar kelimeler (virgülle)
              <input value={seoSecondary} onChange={(e) => setSeoSecondary(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              OG görsel URL
              <select className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" value="" onChange={(e) => { const v = e.target.value; if (v) setOgUrl(v); }}>
                <option value="">Galeriden seç…</option>
                {galleryUrls.map((g) => (
                  <option key={g.id} value={g.url as string}>{g.label}</option>
                ))}
              </select>
              <input value={ogUrl} onChange={(e) => setOgUrl(e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2 text-xs" placeholder="veya doğrudan URL" />
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D]">
              <input type="checkbox" checked={robotsIndex} onChange={(e) => setRobotsIndex(e.target.checked)} />
              index
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D]">
              <input type="checkbox" checked={robotsFollow} onChange={(e) => setRobotsFollow(e.target.checked)} />
              follow
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D]">
              <input type="checkbox" checked={sitemapInclude} onChange={(e) => setSitemapInclude(e.target.checked)} />
              Sitemap
            </label>
          </div>
          <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4 text-sm">
            <p className="text-xs font-bold uppercase text-[#1A1A1A]/50">Önizleme</p>
            <p className="mt-2 font-bold text-[#0B3C5D]">{seoTitle.trim() || title}</p>
            <p className="mt-1 break-all text-xs text-[#0B3C5D]/80">{previewCanonical}</p>
            <p className="mt-2 text-xs text-[#1A1A1A]/70">{seoDescription.trim() || shortDescription}</p>
          </div>
        </div>
      ) : null}

      {tab === "publish" ? (
        <div className="grid gap-4 rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm sm:grid-cols-2">
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Durum
            <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm">
              <option value="draft">Taslak</option>
              <option value="published">Yayında</option>
              <option value="archived">Arşiv</option>
            </select>
          </label>
          <label className="text-xs font-bold text-[#1A1A1A]/55">
            Sıra
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] sm:col-span-2">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            Öne çıkar
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] sm:col-span-2">
            <input type="checkbox" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} />
            Popüler
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] sm:col-span-2">
            <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
            Yeni
          </label>
          <p className="text-xs text-[#1A1A1A]/55 sm:col-span-2">Satın al CTA vitrinde: <a className="font-semibold text-[#0B3C5D] underline" href={SERVICE_STOREFRONT_WHATSAPP_URL}>WhatsApp</a></p>
        </div>
      ) : null}

      <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4 text-xs text-[#1A1A1A]/60">
        Fiyat önizleme: kurulum {formatTryLira(numOrNull(setup)) ?? "—"} · abonelik {formatTryLira(numOrNull(subPrice)) ?? "—"}
        {customPrice ? " · teklif üzerinden" : null}
      </div>
    </div>
  );
}
