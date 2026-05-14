"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition, type ReactNode } from "react";

import {
  adminClearGrowthServiceSurfaceImage,
  adminSaveGrowthService,
  adminUploadGrowthServiceSurfaceImage,
  type GrowthServiceSurfaceImageField,
} from "@/lib/actions/growth-admin";
import {
  adminAddSoftwareProductRelated,
  adminDeleteSoftwareProductFaq,
  adminDeleteSoftwareProductFeature,
  adminDeleteSoftwareProductImage,
  adminDeleteSoftwareProductRelated,
  adminPatchSoftwareProductFaq,
  adminReorderSoftwareProductFaq,
  adminReorderSoftwareProductImages,
  adminReorderSoftwareProductRelated,
  adminSaveGrowthContentBlocks,
  adminSetPrimarySoftwareProductImage,
  adminUpdateSoftwareProductImage,
  adminUpdateSoftwareProductRelated,
  adminUploadSoftwareProductImage,
  adminUpsertSoftwareProductFaq,
  adminUpsertSoftwareProductFeature,
  type SoftwareStorefrontImageType,
} from "@/lib/actions/growth-storefront-admin";
import { formatTryLira, growthServicePriceLine } from "@/lib/format/try-lira";
import type { ParsedGrowthContentBlock } from "@/lib/growth/growth-service-content-blocks";
import { parseGrowthContentBlocksJson } from "@/lib/growth/growth-service-content-blocks";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import { publicMediaObjectUrl } from "@/lib/media/supabase-public";
import { absoluteUrl, resolveCanonicalUrl } from "@/lib/seo/canonical";
import { slugifyGrowth } from "@/lib/slug/growth-slug";

type Cat = { id: string; name: string };
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
type FaqRow = { id: string; question: string; answer: string; sort_order: number; is_active: boolean };
type RelRow = { id: string; related_service_id: string; sort_order: number; is_active: boolean; related_title: string };
type FeatRow = { id: string; title: string; description: string | null; icon: string | null; sort_order: number };
type SvcOpt = { id: string; title: string };

type TabId =
  | "basic"
  | "pricing"
  | "images"
  | "package"
  | "detail"
  | "faq"
  | "related"
  | "seo";

type BlockDraft = ParsedGrowthContentBlock & { clientId: string };
type PkgDraft = { clientId: string; text: string };

function newId() {
  return globalThis.crypto.randomUUID();
}

function displayUrlForAdmin(img: ImgRow): string | null {
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

function tabBtn(active: boolean, onClick: () => void, children: ReactNode) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-bold transition sm:text-sm ${
        active ? "border-[#0B3C5D] bg-[#0B3C5D] text-white" : "border-[#0B3C5D]/15 bg-white text-[#0B3C5D] hover:border-[#0B3C5D]/35"
      }`}
    >
      {children}
    </button>
  );
}

function SurfaceDrop({
  label,
  hint,
  url,
  field,
  serviceId,
  onDone,
  aspectClass,
}: {
  label: string;
  hint: string;
  url: string | null;
  field: GrowthServiceSurfaceImageField;
  serviceId: string;
  onDone: (nextUrl: string | null) => void;
  aspectClass: string;
}) {
  const router = useRouter();
  const [busy, go] = useTransition();
  const [drag, setDrag] = useState(false);

  function uploadFile(file: File) {
    go(async () => {
      const fd = new FormData();
      fd.set("serviceId", serviceId);
      fd.set("field", field);
      fd.set("file", file);
      const res = await adminUploadGrowthServiceSurfaceImage(fd);
      if (res.ok) onDone(res.url);
      router.refresh();
    });
  }

  return (
    <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm">
      <p className="text-sm font-bold text-[#0B3C5D]">{label}</p>
      <p className="mt-0.5 text-xs text-[#1A1A1A]/55">{hint}</p>
      <label
        className={`mt-3 flex ${aspectClass} cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition ${
          drag ? "border-[#0B3C5D] bg-[#F7F9FB]" : "border-[#0B3C5D]/20 bg-[#F7F9FB]/60"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) uploadFile(f);
        }}
      >
        {url ? (
          <div className="relative h-full min-h-[140px] w-full">
            <Image
              src={withSupabaseImageTransform(url, { width: 800, quality: 80 }) ?? url}
              alt=""
              fill
              className="object-cover"
              unoptimized={!url.includes("supabase")}
            />
          </div>
        ) : (
          <span className="p-8 text-center text-xs font-semibold text-[#1A1A1A]/50">Sürükleyip bırakın veya dosya seçin</span>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (f) uploadFile(f);
          }}
        />
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy || !url}
          className="rounded-lg border border-[#0B3C5D]/20 px-3 py-1 text-xs font-bold text-[#0B3C5D] disabled:opacity-40"
          onClick={() => {
            go(async () => {
              await adminClearGrowthServiceSurfaceImage({ serviceId, field });
              onDone(null);
              router.refresh();
            });
          }}
        >
          Kaldır
        </button>
      </div>
    </div>
  );
}

export type GrowthServiceEditInitial = {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string | null;
  setup_price: number | null;
  monthly_price: number | null;
  yearly_price: number | null;
  is_custom_price: boolean;
  package_includes: string[];
  is_active: boolean;
  is_featured: boolean;
  is_popular: boolean;
  is_new: boolean;
  is_fast_setup: boolean;
  public_storefront_enabled: boolean;
  badge: string | null;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  canonical_path_override: string | null;
  og_image_url: string | null;
  hero_image_url: string | null;
  cover_image_url: string | null;
  thumbnail_image_url: string | null;
  mobile_cover_image_url: string | null;
  what_it_does: string | null;
  who_for: string | null;
  how_it_works: string | null;
  content_blocks: ParsedGrowthContentBlock[];
  robots_index: boolean;
  robots_follow: boolean;
  sitemap_include: boolean;
};

export function GrowthServiceEditShell(props: {
  categories: Cat[];
  categoryName: string;
  publicDetailPath: string;
  initial: GrowthServiceEditInitial;
  initialImages: ImgRow[];
  initialFaq: FaqRow[];
  initialRelated: RelRow[];
  initialFeatures: FeatRow[];
  allServices: SvcOpt[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("basic");
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [pending, startSave] = useTransition();
  const [sidePending, startSide] = useTransition();

  const svc = props.initial;

  const [categoryId, setCategoryId] = useState(svc.category_id);
  const [title, setTitle] = useState(svc.title);
  const [slug, setSlug] = useState(svc.slug);
  const [shortDescription, setShortDescription] = useState(svc.short_description);
  const [longDescription, setLongDescription] = useState(svc.long_description ?? "");
  const [badge, setBadge] = useState(svc.badge ?? "");
  const [sortOrder, setSortOrder] = useState(svc.sort_order);
  const [isActive, setIsActive] = useState(svc.is_active);
  const [isFeatured, setIsFeatured] = useState(svc.is_featured);
  const [isPopular, setIsPopular] = useState(svc.is_popular);
  const [isNew, setIsNew] = useState(svc.is_new);
  const [isFastSetup, setIsFastSetup] = useState(svc.is_fast_setup);
  const [publicStorefront, setPublicStorefront] = useState(svc.public_storefront_enabled);

  const [setup, setSetup] = useState(svc.setup_price != null ? String(svc.setup_price) : "");
  const [monthly, setMonthly] = useState(svc.monthly_price != null ? String(svc.monthly_price) : "");
  const [yearly, setYearly] = useState(svc.yearly_price != null ? String(svc.yearly_price) : "");
  const [isCustomPrice, setIsCustomPrice] = useState(svc.is_custom_price);

  const [heroUrl, setHeroUrl] = useState(svc.hero_image_url ?? "");
  const [coverUrl, setCoverUrl] = useState(svc.cover_image_url ?? "");
  const [thumbUrl, setThumbUrl] = useState(svc.thumbnail_image_url ?? "");
  const [mobileUrl, setMobileUrl] = useState(svc.mobile_cover_image_url ?? "");
  const [ogUrl, setOgUrl] = useState(svc.og_image_url ?? "");
  const [advUrlOpen, setAdvUrlOpen] = useState(false);
  const [advHero, setAdvHero] = useState("");
  const [advCover, setAdvCover] = useState("");
  const [advThumb, setAdvThumb] = useState("");
  const [advMobile, setAdvMobile] = useState("");
  const [advOg, setAdvOg] = useState("");

  const [pkgLines, setPkgLines] = useState<PkgDraft[]>(() =>
    svc.package_includes.map((text) => ({ clientId: newId(), text }))
  );
  const [bulkPkg, setBulkPkg] = useState("");

  const [whatItDoes, setWhatItDoes] = useState(svc.what_it_does ?? "");
  const [whoFor, setWhoFor] = useState(svc.who_for ?? "");
  const [howItWorks, setHowItWorks] = useState(svc.how_it_works ?? "");
  const [blocks, setBlocks] = useState<BlockDraft[]>(() =>
    svc.content_blocks.map((b) => ({ ...b, clientId: newId() }))
  );
  const [advJson, setAdvJson] = useState("");

  const [seoTitle, setSeoTitle] = useState(svc.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(svc.seo_description ?? "");
  const [canonicalOverride, setCanonicalOverride] = useState(svc.canonical_path_override ?? "");
  const [robotsIndex, setRobotsIndex] = useState(svc.robots_index);
  const [robotsFollow, setRobotsFollow] = useState(svc.robots_follow);
  const [sitemapInclude, setSitemapInclude] = useState(svc.sitemap_include);

  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");
  const [relSearch, setRelSearch] = useState("");
  const [newRelId, setNewRelId] = useState("");
  const [newFeatIcon, setNewFeatIcon] = useState("");
  const [newFeatTitle, setNewFeatTitle] = useState("");
  const [newFeatDesc, setNewFeatDesc] = useState("");

  const [galType, setGalType] = useState<SoftwareStorefrontImageType>("gallery");
  const [galAlt, setGalAlt] = useState("");
  const [galManual, setGalManual] = useState("");

  const syncFromServer = useCallback(() => {
    const s = props.initial;
    setCategoryId(s.category_id);
    setTitle(s.title);
    setSlug(s.slug);
    setShortDescription(s.short_description);
    setLongDescription(s.long_description ?? "");
    setBadge(s.badge ?? "");
    setSortOrder(s.sort_order);
    setIsActive(s.is_active);
    setIsFeatured(s.is_featured);
    setIsPopular(s.is_popular);
    setIsNew(s.is_new);
    setIsFastSetup(s.is_fast_setup);
    setPublicStorefront(s.public_storefront_enabled);
    setSetup(s.setup_price != null ? String(s.setup_price) : "");
    setMonthly(s.monthly_price != null ? String(s.monthly_price) : "");
    setYearly(s.yearly_price != null ? String(s.yearly_price) : "");
    setIsCustomPrice(s.is_custom_price);
    setHeroUrl(s.hero_image_url ?? "");
    setCoverUrl(s.cover_image_url ?? "");
    setThumbUrl(s.thumbnail_image_url ?? "");
    setMobileUrl(s.mobile_cover_image_url ?? "");
    setOgUrl(s.og_image_url ?? "");
    setPkgLines(s.package_includes.map((text) => ({ clientId: newId(), text })));
    setWhatItDoes(s.what_it_does ?? "");
    setWhoFor(s.who_for ?? "");
    setHowItWorks(s.how_it_works ?? "");
    setBlocks(s.content_blocks.map((b) => ({ ...b, clientId: newId() })));
    setSeoTitle(s.seo_title ?? "");
    setSeoDescription(s.seo_description ?? "");
    setCanonicalOverride(s.canonical_path_override ?? "");
    setRobotsIndex(s.robots_index);
    setRobotsFollow(s.robots_follow);
    setSitemapInclude(s.sitemap_include);
  }, [props.initial]);

  useEffect(() => {
    syncFromServer();
  }, [syncFromServer]);

  const previewCanonical = useMemo(() => {
    const fallback = absoluteUrl(props.publicDetailPath);
    return resolveCanonicalUrl(canonicalOverride || null, fallback);
  }, [canonicalOverride, props.publicDetailPath]);

  const previewTitle = seoTitle.trim() || `${title} | Vitrin`;
  const previewDesc = seoDescription.trim() || shortDescription;

  const galleryPickUrls = useMemo(() => {
    const out: { id: string; label: string; url: string }[] = [];
    for (const im of props.initialImages) {
      const u = displayUrlForAdmin(im);
      if (u) out.push({ id: im.id, label: `${im.image_type} #${im.sort_order}`, url: u });
    }
    return out;
  }, [props.initialImages]);

  const relatedPickList = useMemo(() => {
    const bound = new Set(props.initialRelated.map((r) => r.related_service_id));
    return props.allServices.filter((s) => s.id !== svc.id && !bound.has(s.id));
  }, [props.allServices, props.initialRelated, svc.id]);

  const filteredRelatedPick = useMemo(() => {
    const q = relSearch.trim().toLowerCase();
    if (!q) return relatedPickList;
    return relatedPickList.filter((s) => s.title.toLowerCase().includes(q));
  }, [relSearch, relatedPickList]);

  function runSide(fn: () => Promise<{ ok: boolean; error?: string }>, okMsg?: string) {
    setSaveMsg(null);
    startSide(async () => {
      const res = await fn();
      if (!res.ok) {
        setSaveMsg("error" in res && res.error ? res.error : "Hata");
        return;
      }
      setSaveMsg(okMsg ?? "Güncellendi.");
      router.refresh();
    });
  }

  function saveAll() {
    setSaveMsg(null);
    const package_includes = pkgLines.map((p) => p.text.trim()).filter(Boolean);
    const content_blocks = blocks.map((b, i) => ({
      sort_order: Number.isFinite(b.sort_order) ? b.sort_order : i,
      heading: b.heading.trim(),
      body: b.body.trim(),
      is_active: b.is_active,
    }));

    startSave(async () => {
      const res = await adminSaveGrowthService({
        id: svc.id,
        category_id: categoryId,
        slug: slug.trim() || undefined,
        title,
        short_description: shortDescription,
        long_description: longDescription.trim() || null,
        setup_price: numOrNull(setup),
        monthly_price: numOrNull(monthly),
        yearly_price: numOrNull(yearly),
        is_custom_price: isCustomPrice,
        package_includes,
        is_active: isActive,
        is_featured: isFeatured,
        is_popular: isPopular,
        is_new: isNew,
        is_fast_setup: isFastSetup,
        public_storefront_enabled: publicStorefront,
        badge: badge.trim() || null,
        sort_order: sortOrder,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        canonical_path_override: canonicalOverride.trim() || null,
        og_image_url: advOg.trim() || ogUrl.trim() || null,
        hero_image_url: advHero.trim() || heroUrl.trim() || null,
        cover_image_url: advCover.trim() || coverUrl.trim() || null,
        thumbnail_image_url: advThumb.trim() || thumbUrl.trim() || null,
        mobile_cover_image_url: advMobile.trim() || mobileUrl.trim() || null,
        what_it_does: whatItDoes.trim() || null,
        who_for: whoFor.trim() || null,
        how_it_works: howItWorks.trim() || null,
        content_blocks,
        robots_index: robotsIndex,
        robots_follow: robotsFollow,
        sitemap_include: sitemapInclude,
      });
      if (!res.ok) {
        setSaveMsg(res.error);
        return;
      }
      setSaveMsg("Kaydedildi.");
      router.refresh();
    });
  }

  const priceLinePreview = useMemo(() => {
    return growthServicePriceLine(numOrNull(setup), numOrNull(monthly), isCustomPrice);
  }, [setup, monthly, isCustomPrice]);

  const shortLen = shortDescription.length;

  const gallerySorted = useMemo(
    () => [...props.initialImages].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialImages]
  );
  const faqSortedList = useMemo(
    () => [...props.initialFaq].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialFaq]
  );
  const relSortedList = useMemo(
    () => [...props.initialRelated].sort((a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)),
    [props.initialRelated]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-2">
          <Link href="/admin/hizmet-vitrini/hizmetler" className="text-sm font-semibold text-[#0B3C5D] hover:underline">
            ← Hizmet listesi
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B3C5D] sm:text-2xl">{title || "Başlıksız"}</h1>
          </div>
          <p className="text-sm font-medium text-[#1A1A1A]/60">{props.categoryName}</p>
          <div className="flex flex-wrap gap-2 text-[11px] font-bold">
            <span
              className={`rounded-full border px-2.5 py-0.5 ${
                isActive ? "border-[#0B3C5D]/35 text-[#0B3C5D]" : "border-[#0B3C5D]/20 text-[#1A1A1A]/55"
              }`}
            >
              {isActive ? "Aktif" : "Pasif"}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 ${
                publicStorefront ? "border-[#0B3C5D]/25 text-[#0B3C5D]" : "border-[#0B3C5D]/15 text-[#1A1A1A]/50"
              }`}
            >
              {publicStorefront ? "Vitrinde" : "Vitrin dışı"}
            </span>
            {isFeatured ? (
              <span className="rounded-full border border-[#0B3C5D]/20 bg-[#0B3C5D]/5 px-2.5 py-0.5 text-[#0B3C5D]">Öne çıkan</span>
            ) : null}
            {isPopular ? <span className="rounded-full border px-2.5 py-0.5">Popüler</span> : null}
            {isNew ? <span className="rounded-full border px-2.5 py-0.5">Yeni</span> : null}
            {isFastSetup ? <span className="rounded-full border px-2.5 py-0.5">Hızlı kurulum</span> : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={saveAll}
            className="rounded-xl bg-[#0B3C5D] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
          >
            Kaydet
          </button>
          <Link
            href={props.publicDetailPath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#0B3C5D]/25 px-4 py-2.5 text-sm font-bold text-[#0B3C5D]"
          >
            Önizle
          </Link>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              const next = !isActive;
              setIsActive(next);
              startSave(async () => {
                const res = await adminSaveGrowthService({
                  id: svc.id,
                  category_id: categoryId,
                  slug: slug.trim() || undefined,
                  title,
                  short_description: shortDescription,
                  long_description: longDescription.trim() || null,
                  setup_price: numOrNull(setup),
                  monthly_price: numOrNull(monthly),
                  yearly_price: numOrNull(yearly),
                  is_custom_price: isCustomPrice,
                  package_includes: pkgLines.map((p) => p.text.trim()).filter(Boolean),
                  is_active: next,
                  is_featured: isFeatured,
                  is_popular: isPopular,
                  is_new: isNew,
                  is_fast_setup: isFastSetup,
                  public_storefront_enabled: publicStorefront,
                  badge: badge.trim() || null,
                  sort_order: sortOrder,
                  seo_title: seoTitle.trim() || null,
                  seo_description: seoDescription.trim() || null,
                  canonical_path_override: canonicalOverride.trim() || null,
                  og_image_url: ogUrl.trim() || null,
                  hero_image_url: heroUrl.trim() || null,
                  cover_image_url: coverUrl.trim() || null,
                  thumbnail_image_url: thumbUrl.trim() || null,
                  mobile_cover_image_url: mobileUrl.trim() || null,
                  what_it_does: whatItDoes.trim() || null,
                  who_for: whoFor.trim() || null,
                  how_it_works: howItWorks.trim() || null,
                  content_blocks: blocks.map((b, i) => ({
                    sort_order: b.sort_order ?? i,
                    heading: b.heading,
                    body: b.body,
                    is_active: b.is_active,
                  })),
                  robots_index: robotsIndex,
                  robots_follow: robotsFollow,
                  sitemap_include: sitemapInclude,
                });
                if (!res.ok) {
                  setIsActive(!next);
                  setSaveMsg(res.error);
                } else {
                  setSaveMsg(next ? "Aktifleştirildi." : "Yayından kaldırıldı.");
                  router.refresh();
                }
              });
            }}
            className="rounded-xl border border-[#0B3C5D]/30 px-4 py-2.5 text-sm font-bold text-[#0B3C5D] disabled:opacity-50"
          >
            {isActive ? "Yayından kaldır" : "Aktif et"}
          </button>
        </div>
      </div>

      {saveMsg ? <p className="text-sm font-semibold text-[#0B3C5D]">{saveMsg}</p> : null}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabBtn(tab === "basic", () => setTab("basic"), "Temel")}
            {tabBtn(tab === "pricing", () => setTab("pricing"), "Fiyat")}
            {tabBtn(tab === "images", () => setTab("images"), "Görseller")}
            {tabBtn(tab === "package", () => setTab("package"), "Paket")}
            {tabBtn(tab === "detail", () => setTab("detail"), "Detay")}
            {tabBtn(tab === "faq", () => setTab("faq"), "SSS")}
            {tabBtn(tab === "related", () => setTab("related"), "İlgili")}
            {tabBtn(tab === "seo", () => setTab("seo"), "SEO")}
          </div>

          {tab === "basic" ? (
            <div className="grid gap-6">
              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Kimlik</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold text-[#1A1A1A]/55">
                    Kategori
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm font-semibold text-[#0B3C5D]"
                    >
                      {props.categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-xs font-bold text-[#1A1A1A]/55">
                    Sıra
                    <input
                      type="number"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
                      className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="sm:col-span-2 block text-xs font-bold text-[#1A1A1A]/55">
                    Başlık
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
                    />
                  </label>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#1A1A1A]/55">Slug</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="min-w-[12rem] flex-1 rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        className="rounded-xl border border-[#0B3C5D]/25 px-3 py-2 text-xs font-bold text-[#0B3C5D]"
                        onClick={() => setSlug(slugifyGrowth(title))}
                      >
                        Slug üret
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Metinler</p>
                <label className="mt-4 block text-xs font-bold text-[#1A1A1A]/55">
                  Kısa açıklama
                  <textarea
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
                  />
                  <span className="mt-1 block text-[11px] text-[#1A1A1A]/45">{shortLen} karakter</span>
                </label>
                <label className="mt-4 block text-xs font-bold text-[#1A1A1A]/55">
                  Uzun açıklama
                  <textarea
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    rows={6}
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm leading-relaxed"
                  />
                </label>
                <label className="mt-4 block text-xs font-bold text-[#1A1A1A]/55">
                  Rozet (opsiyonel)
                  <input
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 px-3 py-2 text-sm"
                  />
                </label>
              </div>

              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Durum</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B3C5D]">
                    <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                    Aktif
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B3C5D]">
                    <input type="checkbox" checked={publicStorefront} onChange={(e) => setPublicStorefront(e.target.checked)} />
                    Vitrinde göster
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B3C5D]">
                    <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                    Öne çıkar
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B3C5D]">
                    <input type="checkbox" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} />
                    En çok tercih edilen
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B3C5D]">
                    <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
                    Yeni
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#0B3C5D]">
                    <input type="checkbox" checked={isFastSetup} onChange={(e) => setIsFastSetup(e.target.checked)} />
                    Hızlı kurulum
                  </label>
                </div>
              </div>
            </div>
          ) : null}

          {tab === "pricing" ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Fiyat kartı</p>
                <p className="mt-1 text-xs text-[#1A1A1A]/55">Tam TL, boş bırakılan alan vitrinde “—” olur.</p>
                <label className="mt-4 block text-xs font-bold text-[#1A1A1A]/55">
                  Kurulum (TL)
                  <input value={setup} onChange={(e) => setSetup(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
                <label className="mt-3 block text-xs font-bold text-[#1A1A1A]/55">
                  Aylık (TL)
                  <input value={monthly} onChange={(e) => setMonthly(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
                <label className="mt-3 block text-xs font-bold text-[#1A1A1A]/55">
                  Yıllık (TL)
                  <input value={yearly} onChange={(e) => setYearly(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
                <label className="mt-4 flex items-center gap-2 text-sm font-bold text-[#0B3C5D]">
                  <input type="checkbox" checked={isCustomPrice} onChange={(e) => setIsCustomPrice(e.target.checked)} />
                  Teklif üzerinden
                </label>
                <p className="mt-2 text-xs text-[#1A1A1A]/55">Para birimi: TRY (sabit)</p>
              </div>
              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Vitrin özeti</p>
                <p className="mt-3 text-sm font-bold text-[#0B3C5D]">{priceLinePreview}</p>
                {!isCustomPrice ? (
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-[#0B3C5D]/10 bg-white px-3 py-3">
                      <dt className="font-bold text-[#1A1A1A]/55">Kurulum</dt>
                      <dd className="mt-1 text-lg font-bold text-[#0B3C5D]">{formatTryLira(numOrNull(setup)) ?? "—"}</dd>
                    </div>
                    <div className="rounded-xl border border-[#0B3C5D]/10 bg-white px-3 py-3">
                      <dt className="font-bold text-[#1A1A1A]/55">Aylık</dt>
                      <dd className="mt-1 text-lg font-bold text-[#0B3C5D]">{formatTryLira(numOrNull(monthly)) ?? "—"}</dd>
                    </div>
                  </dl>
                ) : (
                  <p className="mt-4 rounded-xl border border-[#0B3C5D]/15 bg-white px-4 py-3 text-sm font-bold text-[#0B3C5D]">Teklif üzerinden</p>
                )}
              </div>
            </div>
          ) : null}

          {tab === "images" ? (
            <div className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <SurfaceDrop
                  label="Kapak görseli"
                  hint="growth_services.cover_image_url"
                  url={coverUrl || null}
                  field="cover_image_url"
                  serviceId={svc.id}
                  onDone={(u) => setCoverUrl(u ?? "")}
                  aspectClass="min-h-[200px]"
                />
                <SurfaceDrop
                  label="Hero"
                  hint="Üst vitrin görseli"
                  url={heroUrl || null}
                  field="hero_image_url"
                  serviceId={svc.id}
                  onDone={(u) => setHeroUrl(u ?? "")}
                  aspectClass="min-h-[200px]"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <SurfaceDrop
                  label="Thumbnail"
                  hint="Kart görünümü"
                  url={thumbUrl || null}
                  field="thumbnail_image_url"
                  serviceId={svc.id}
                  onDone={(u) => setThumbUrl(u ?? "")}
                  aspectClass="min-h-[120px]"
                />
                <SurfaceDrop
                  label="Mobil kapak"
                  hint="Dikey / mobil oran"
                  url={mobileUrl || null}
                  field="mobile_cover_image_url"
                  serviceId={svc.id}
                  onDone={(u) => setMobileUrl(u ?? "")}
                  aspectClass="min-h-[180px]"
                />
              </div>
              <SurfaceDrop
                label="OG görseli (satır)"
                hint="SEO sekmesinden de seçilebilir"
                url={ogUrl || null}
                field="og_image_url"
                serviceId={svc.id}
                onDone={(u) => setOgUrl(u ?? "")}
                aspectClass="min-h-[160px]"
              />

              <details className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4" open={advUrlOpen} onToggle={(e) => setAdvUrlOpen((e.target as HTMLDetailsElement).open)}>
                <summary className="cursor-pointer text-sm font-bold text-[#0B3C5D]">Gelişmiş: manuel URL</summary>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="text-xs font-bold text-[#1A1A1A]/55">
                    Hero URL
                    <input value={advHero} onChange={(e) => setAdvHero(e.target.value)} className="mt-1 w-full rounded-lg border px-2 py-1 text-xs" />
                  </label>
                  <label className="text-xs font-bold text-[#1A1A1A]/55">
                    Kapak URL
                    <input value={advCover} onChange={(e) => setAdvCover(e.target.value)} className="mt-1 w-full rounded-lg border px-2 py-1 text-xs" />
                  </label>
                  <label className="text-xs font-bold text-[#1A1A1A]/55">
                    Thumbnail URL
                    <input value={advThumb} onChange={(e) => setAdvThumb(e.target.value)} className="mt-1 w-full rounded-lg border px-2 py-1 text-xs" />
                  </label>
                  <label className="text-xs font-bold text-[#1A1A1A]/55">
                    Mobil URL
                    <input value={advMobile} onChange={(e) => setAdvMobile(e.target.value)} className="mt-1 w-full rounded-lg border px-2 py-1 text-xs" />
                  </label>
                  <label className="sm:col-span-2 text-xs font-bold text-[#1A1A1A]/55">
                    OG URL
                    <input value={advOg} onChange={(e) => setAdvOg(e.target.value)} className="mt-1 w-full rounded-lg border px-2 py-1 text-xs" />
                  </label>
                </div>
                <p className="mt-2 text-[11px] text-[#1A1A1A]/50">Kaydet ile birlikte yazılır; yükleme alanları önceliklidir.</p>
              </details>

              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Galeri ve türler</p>
                <p className="mt-1 text-xs text-[#1A1A1A]/55">Dosya yükleyin; URL isteğe bağlı.</p>
                <form
                  className="mt-4 space-y-3 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    fd.set("serviceId", svc.id);
                    fd.set("image_type", galType);
                    fd.set("alt_text", galAlt);
                    fd.set("manual_url", galManual);
                    runSide(async () => adminUploadSoftwareProductImage(fd), "Görsel eklendi.");
                    setGalAlt("");
                    setGalManual("");
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-xs font-bold text-[#1A1A1A]/55">
                      Tür
                      <select
                        value={galType}
                        onChange={(e) => setGalType(e.target.value as SoftwareStorefrontImageType)}
                        className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                      >
                        <option value="gallery">Galeri</option>
                        <option value="cover">Kapak</option>
                        <option value="thumbnail">Thumbnail</option>
                        <option value="mobile_cover">Mobil kapak</option>
                        <option value="feature">Özellik</option>
                      </select>
                    </label>
                    <label className="text-xs font-bold text-[#1A1A1A]/55">
                      Dosya
                      <input name="file" type="file" accept="image/png,image/jpeg,image/webp" className="mt-1 block w-full text-xs" />
                    </label>
                  </div>
                  <input
                    value={galAlt}
                    onChange={(e) => setGalAlt(e.target.value)}
                    placeholder="Alt metin (önerilir)"
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                  />
                  <input
                    value={galManual}
                    onChange={(e) => setGalManual(e.target.value)}
                    placeholder="Manuel URL (dosya yoksa)"
                    className="w-full rounded-xl border px-3 py-2 text-sm"
                  />
                  <button type="submit" disabled={sidePending} className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
                    Yükle
                  </button>
                </form>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {gallerySorted.map((img, idx) => {
                    const src = displayUrlForAdmin(img);
                    return (
                      <li key={img.id} className="rounded-xl border border-[#0B3C5D]/10 p-3 text-xs">
                        <div className="relative mb-2 h-28 w-full overflow-hidden rounded-lg bg-[#F7F9FB]">
                          {src ? (
                            <Image src={src} alt="" fill className="object-cover" sizes="200px" unoptimized={!src.includes("supabase")} />
                          ) : null}
                        </div>
                        <p className="font-bold text-[#0B3C5D]">
                          {img.image_type} · {img.is_primary ? "ana" : "—"}
                        </p>
                        <input
                          defaultValue={img.alt_text ?? ""}
                          className="mt-1 w-full rounded border px-2 py-1"
                          onBlur={(e) => {
                            const v = e.target.value.trim();
                            if (v === (img.alt_text ?? "")) return;
                            void adminUpdateSoftwareProductImage({ id: img.id, serviceId: svc.id, alt_text: v || null }).then(() => router.refresh());
                          }}
                        />
                        <div className="mt-2 flex flex-wrap gap-1">
                          <button
                            type="button"
                            className="rounded border px-2 py-0.5"
                            disabled={idx === 0}
                            onClick={() => {
                              const next = [...gallerySorted];
                              [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                              runSide(() => adminReorderSoftwareProductImages({ serviceId: svc.id, orderedIds: next.map((x) => x.id) }));
                            }}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            className="rounded border px-2 py-0.5"
                            disabled={idx === gallerySorted.length - 1}
                            onClick={() => {
                              const next = [...gallerySorted];
                              [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                              runSide(() => adminReorderSoftwareProductImages({ serviceId: svc.id, orderedIds: next.map((x) => x.id) }));
                            }}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            className="rounded border px-2 py-0.5"
                            onClick={() => runSide(() => adminSetPrimarySoftwareProductImage({ id: img.id, serviceId: svc.id }), "Ana görsel")}
                          >
                            Ana
                          </button>
                          <button
                            type="button"
                            className="rounded border px-2 py-0.5"
                            onClick={() => runSide(() => adminUpdateSoftwareProductImage({ id: img.id, serviceId: svc.id, is_active: !img.is_active }))}
                          >
                            {img.is_active ? "Pasif" : "Aktif"}
                          </button>
                          <button
                            type="button"
                            className="rounded border border-red-600/30 px-2 py-0.5 text-red-700"
                            onClick={() => {
                              if (!confirm("Silinsin mi?")) return;
                              runSide(() => adminDeleteSoftwareProductImage({ id: img.id, serviceId: svc.id }));
                            }}
                          >
                            Sil
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : null}

          {tab === "package" ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Paket içeriği</p>
                <ul className="mt-4 space-y-2">
                  {pkgLines.map((p, i) => (
                    <li key={p.clientId} className="flex gap-2">
                      <span className="mt-2 font-bold text-[#0B3C5D]">✓</span>
                      <input
                        value={p.text}
                        onChange={(e) => {
                          const v = e.target.value;
                          setPkgLines((prev) => prev.map((x) => (x.clientId === p.clientId ? { ...x, text: v } : x)));
                        }}
                        className="flex-1 rounded-xl border px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        className="rounded-lg border px-2 text-xs font-bold"
                        disabled={i === 0}
                        onClick={() => {
                          const next = [...pkgLines];
                          [next[i - 1], next[i]] = [next[i], next[i - 1]];
                          setPkgLines(next);
                        }}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border px-2 text-xs font-bold"
                        disabled={i === pkgLines.length - 1}
                        onClick={() => {
                          const next = [...pkgLines];
                          [next[i + 1], next[i]] = [next[i], next[i + 1]];
                          setPkgLines(next);
                        }}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border border-red-600/30 px-2 text-xs text-red-700"
                        onClick={() => setPkgLines((prev) => prev.filter((x) => x.clientId !== p.clientId))}
                      >
                        Sil
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-3 rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white"
                  onClick={() => setPkgLines((prev) => [...prev, { clientId: newId(), text: "" }])}
                >
                  + Madde ekle
                </button>
                <label className="mt-6 block text-xs font-bold text-[#1A1A1A]/55">
                  Toplu yapıştır (satır başına bir madde — uygula ile eklenir)
                  <textarea value={bulkPkg} onChange={(e) => setBulkPkg(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
                <button
                  type="button"
                  className="mt-2 rounded-xl border border-[#0B3C5D]/25 px-4 py-2 text-sm font-bold text-[#0B3C5D]"
                  onClick={() => {
                    const lines = bulkPkg.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
                    setPkgLines((prev) => [...prev, ...lines.map((text) => ({ clientId: newId(), text }))]);
                    setBulkPkg("");
                  }}
                >
                  Toplu uygula
                </button>
                <div className="mt-6 rounded-xl border border-dashed border-[#0B3C5D]/15 bg-[#F7F9FB] p-4">
                  <p className="text-xs font-bold text-[#0B3C5D]">Kartta ilk 4 madde</p>
                  <ul className="mt-2 space-y-1 text-sm font-semibold text-[#0B3C5D]">
                    {pkgLines
                      .map((p) => p.text.trim())
                      .filter(Boolean)
                      .slice(0, 4)
                      .map((t) => (
                        <li key={t}>✓ {t}</li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Özellik kartları</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {props.initialFeatures.map((f) => (
                    <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2">
                      <span>
                        {f.icon ? `${f.icon} ` : null}
                        <strong>{f.title}</strong> {f.description ? <span className="text-[#1A1A1A]/55">— {f.description}</span> : null}
                      </span>
                      <button
                        type="button"
                        className="text-xs font-bold text-red-700"
                        onClick={() => runSide(() => adminDeleteSoftwareProductFeature({ id: f.id, serviceId: svc.id }))}
                      >
                        Sil
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <input value={newFeatIcon} onChange={(e) => setNewFeatIcon(e.target.value)} placeholder="İkon" className="rounded-xl border px-3 py-2 text-sm" />
                  <input value={newFeatTitle} onChange={(e) => setNewFeatTitle(e.target.value)} placeholder="Başlık" className="rounded-xl border px-3 py-2 text-sm" />
                  <textarea
                    value={newFeatDesc}
                    onChange={(e) => setNewFeatDesc(e.target.value)}
                    placeholder="Açıklama"
                    rows={2}
                    className="sm:col-span-2 rounded-xl border px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white sm:col-span-2"
                    onClick={() =>
                      runSide(async () => {
                        const res = await adminUpsertSoftwareProductFeature({
                          serviceId: svc.id,
                          title: newFeatTitle,
                          description: newFeatDesc || null,
                          icon: newFeatIcon || null,
                          sort_order: props.initialFeatures.length,
                        });
                        if (res.ok) {
                          setNewFeatTitle("");
                          setNewFeatDesc("");
                          setNewFeatIcon("");
                        }
                        return res;
                      }, "Eklendi")
                    }
                  >
                    Özellik ekle
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {tab === "detail" ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Sabit bölümler (detay sayfası)</p>
                <label className="mt-4 block text-xs font-bold text-[#1A1A1A]/55">
                  Sistem ne işe yarar?
                  <textarea value={whatItDoes} onChange={(e) => setWhatItDoes(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
                <label className="mt-4 block text-xs font-bold text-[#1A1A1A]/55">
                  Kimler için uygun?
                  <textarea value={whoFor} onChange={(e) => setWhoFor(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
                <label className="mt-4 block text-xs font-bold text-[#1A1A1A]/55">
                  Süreç nasıl işler?
                  <textarea value={howItWorks} onChange={(e) => setHowItWorks(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
              </div>

              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Ek içerik blokları (JSON yazmadan)</p>
                <ul className="mt-4 space-y-4">
                  {blocks.map((b, i) => (
                    <li key={b.clientId} className="rounded-xl border border-[#0B3C5D]/10 p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded border px-2 text-xs"
                          disabled={i === 0}
                          onClick={() => {
                            const next = [...blocks];
                            [next[i - 1], next[i]] = [next[i], next[i - 1]];
                            setBlocks(next);
                          }}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className="rounded border px-2 text-xs"
                          disabled={i === blocks.length - 1}
                          onClick={() => {
                            const next = [...blocks];
                            [next[i + 1], next[i]] = [next[i], next[i + 1]];
                            setBlocks(next);
                          }}
                        >
                          ↓
                        </button>
                        <label className="flex items-center gap-1 text-xs font-bold">
                          <input
                            type="checkbox"
                            checked={b.is_active}
                            onChange={(e) =>
                              setBlocks((prev) => prev.map((x) => (x.clientId === b.clientId ? { ...x, is_active: e.target.checked } : x)))
                            }
                          />
                          Aktif
                        </label>
                        <button
                          type="button"
                          className="rounded border border-red-600/30 px-2 text-xs text-red-700"
                          onClick={() => setBlocks((prev) => prev.filter((x) => x.clientId !== b.clientId))}
                        >
                          Sil
                        </button>
                      </div>
                      <input
                        value={b.heading}
                        onChange={(e) => setBlocks((prev) => prev.map((x) => (x.clientId === b.clientId ? { ...x, heading: e.target.value } : x)))}
                        className="mt-2 w-full rounded-lg border px-2 py-1 text-sm font-bold"
                        placeholder="Başlık"
                      />
                      <textarea
                        value={b.body}
                        onChange={(e) => setBlocks((prev) => prev.map((x) => (x.clientId === b.clientId ? { ...x, body: e.target.value } : x)))}
                        rows={4}
                        className="mt-2 w-full rounded-lg border px-2 py-1 text-sm"
                        placeholder="Açıklama"
                      />
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-3 rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white"
                  onClick={() => setBlocks((prev) => [...prev, { clientId: newId(), sort_order: prev.length, heading: "", body: "", is_active: true }])}
                >
                  + İçerik bloğu ekle
                </button>
              </div>

              <details
                className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4"
                onToggle={(e) => {
                  const o = (e.target as HTMLDetailsElement).open;
                  if (o) {
                    const raw = blocks.map(({ clientId: _c, ...rest }) => rest);
                    setAdvJson(JSON.stringify(raw, null, 2));
                  }
                }}
              >
                <summary className="cursor-pointer text-sm font-bold text-[#0B3C5D]">Gelişmiş JSON düzenleyici</summary>
                <textarea value={advJson} onChange={(e) => setAdvJson(e.target.value)} rows={10} className="mt-2 w-full rounded-xl border px-3 py-2 font-mono text-xs" />
                <button
                  type="button"
                  className="mt-2 rounded-xl border border-[#0B3C5D]/25 px-4 py-2 text-sm font-bold text-[#0B3C5D]"
                  onClick={() => {
                    try {
                      const parsed = JSON.parse(advJson || "[]");
                      const list = parseGrowthContentBlocksJson(parsed);
                      setBlocks(list.map((x) => ({ ...x, clientId: newId() })));
                      setSaveMsg("JSON uygulandı (Kaydet ile kalıcılaştırın).");
                    } catch {
                      setSaveMsg("Geçersiz JSON.");
                    }
                  }}
                >
                  JSON&apos;u forma uygula
                </button>
                <button
                  type="button"
                  className="ml-2 mt-2 rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white"
                  onClick={() => runSide(() => adminSaveGrowthContentBlocks({ serviceId: svc.id, jsonText: advJson }), "JSON doğrudan kaydedildi")}
                >
                  JSON&apos;u doğrudan kaydet
                </button>
              </details>
            </div>
          ) : null}

          {tab === "faq" ? (
            <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
              {props.initialFaq.length === 0 ? <p className="text-sm text-[#1A1A1A]/55">Henüz SSS eklenmedi.</p> : null}
              <ul className="space-y-4">
                {faqSortedList.map((f, idx) => (
                    <li key={f.id} className="rounded-xl border border-[#0B3C5D]/10 p-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={idx === 0}
                          className="rounded border px-2 text-xs"
                          onClick={() => {
                            const next = [...faqSortedList];
                            [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                            runSide(() => adminReorderSoftwareProductFaq({ serviceId: svc.id, orderedIds: next.map((x) => x.id) }));
                          }}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          disabled={idx === faqSortedList.length - 1}
                          className="rounded border px-2 text-xs"
                          onClick={() => {
                            const next = [...faqSortedList];
                            [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                            runSide(() => adminReorderSoftwareProductFaq({ serviceId: svc.id, orderedIds: next.map((x) => x.id) }));
                          }}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className="rounded border px-2 text-xs"
                          onClick={() => runSide(() => adminPatchSoftwareProductFaq({ id: f.id, serviceId: svc.id, is_active: !f.is_active }))}
                        >
                          {f.is_active ? "Pasif" : "Aktif"}
                        </button>
                        <button
                          type="button"
                          className="rounded border border-red-600/30 px-2 text-xs text-red-700"
                          onClick={() => {
                            if (!confirm("Silinsin mi?")) return;
                            runSide(() => adminDeleteSoftwareProductFaq({ id: f.id, serviceId: svc.id }));
                          }}
                        >
                          Sil
                        </button>
                      </div>
                      <FaqInline f={f} serviceId={svc.id} onSaved={() => router.refresh()} />
                    </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 rounded-xl border border-dashed border-[#0B3C5D]/20 p-4">
                <input value={newFaqQ} onChange={(e) => setNewFaqQ(e.target.value)} placeholder="Soru" className="w-full rounded-xl border px-3 py-2 text-sm" />
                <textarea value={newFaqA} onChange={(e) => setNewFaqA(e.target.value)} placeholder="Cevap" rows={3} className="w-full rounded-xl border px-3 py-2 text-sm" />
                <button
                  type="button"
                  className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white"
                  onClick={() =>
                    runSide(async () => {
                      const res = await adminUpsertSoftwareProductFaq({
                        serviceId: svc.id,
                        question: newFaqQ,
                        answer: newFaqA,
                        sort_order: props.initialFaq.length,
                      });
                      if (res.ok) {
                        setNewFaqQ("");
                        setNewFaqA("");
                      }
                      return res;
                    }, "Eklendi")
                  }
                >
                  + Soru ekle
                </button>
              </div>
            </div>
          ) : null}

          {tab === "related" ? (
            <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
              <input
                value={relSearch}
                onChange={(e) => setRelSearch(e.target.value)}
                placeholder="Hizmet ara…"
                className="mb-3 w-full rounded-xl border px-3 py-2 text-sm"
              />
              <div className="flex flex-wrap gap-2">
                <select value={newRelId} onChange={(e) => setNewRelId(e.target.value)} className="min-w-[14rem] flex-1 rounded-xl border px-3 py-2 text-sm">
                  <option value="">Hizmet seç…</option>
                  {filteredRelatedPick.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white"
                  onClick={() => {
                    if (!newRelId) return;
                    runSide(async () => {
                      const res = await adminAddSoftwareProductRelated({ serviceId: svc.id, related_service_id: newRelId });
                      if (res.ok) setNewRelId("");
                      return res;
                    }, "Bağlandı");
                  }}
                >
                  Bağla
                </button>
              </div>
              <ul className="mt-4 space-y-2">
                {relSortedList.map((r, idx) => (
                    <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm">
                      <span className="font-semibold text-[#0B3C5D]">{r.related_title}</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={idx === 0}
                          className="rounded border px-2 text-xs"
                          onClick={() => {
                            const next = [...relSortedList];
                            [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                            runSide(() => adminReorderSoftwareProductRelated({ serviceId: svc.id, orderedIds: next.map((x) => x.id) }));
                          }}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          disabled={idx === relSortedList.length - 1}
                          className="rounded border px-2 text-xs"
                          onClick={() => {
                            const next = [...relSortedList];
                            [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                            runSide(() => adminReorderSoftwareProductRelated({ serviceId: svc.id, orderedIds: next.map((x) => x.id) }));
                          }}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className="rounded border px-2 text-xs"
                          onClick={() => runSide(() => adminUpdateSoftwareProductRelated({ id: r.id, serviceId: svc.id, is_active: !r.is_active }))}
                        >
                          {r.is_active ? "Pasif" : "Aktif"}
                        </button>
                        <button
                          type="button"
                          className="rounded border border-red-600/30 px-2 text-xs text-red-700"
                          onClick={() => {
                            if (!confirm("Kaldırılsın mı?")) return;
                            runSide(() => adminDeleteSoftwareProductRelated({ id: r.id, serviceId: svc.id }));
                          }}
                        >
                          Kaldır
                        </button>
                      </div>
                    </li>
                ))}
              </ul>
            </div>
          ) : null}

          {tab === "seo" ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-[#0B3C5D]">Alanlar</p>
                <label className="mt-4 block text-xs font-bold text-[#1A1A1A]/55">
                  SEO title
                  <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
                <label className="mt-3 block text-xs font-bold text-[#1A1A1A]/55">
                  Meta description ({seoDescription.trim().length} karakter, öneri 140–160)
                  <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
                <label className="mt-3 block text-xs font-bold text-[#1A1A1A]/55">
                  Canonical path (boşsa {props.publicDetailPath})
                  <input value={canonicalOverride} onChange={(e) => setCanonicalOverride(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                </label>
                <label className="mt-3 block text-xs font-bold text-[#1A1A1A]/55">
                  OG görseli — galeriden seç
                  <select
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    value=""
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v) setOgUrl(v);
                    }}
                  >
                    <option value="">Seçin…</option>
                    {galleryPickUrls.map((g) => (
                      <option key={g.id} value={g.url}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="mt-4 space-y-2 text-sm font-semibold text-[#0B3C5D]">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={robotsIndex} onChange={(e) => setRobotsIndex(e.target.checked)} />
                    robots: index
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={robotsFollow} onChange={(e) => setRobotsFollow(e.target.checked)} />
                    robots: follow
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={publicStorefront} onChange={(e) => setPublicStorefront(e.target.checked)} />
                    Public vitrin
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={sitemapInclude} onChange={(e) => setSitemapInclude(e.target.checked)} />
                    Sitemap&apos;e dahil
                  </label>
                </div>
              </div>
              <div className="lg:sticky lg:top-24">
                <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/50">Google önizleme</p>
                  <p className="mt-2 text-lg font-bold text-[#1A1A1A]">{previewTitle}</p>
                  <p className="mt-1 break-all text-sm text-[#0B3C5D]/80">{previewCanonical}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-[#1A1A1A]/70">{previewDesc}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="w-full shrink-0 space-y-4 lg:sticky lg:top-24 lg:w-80">
          <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-[#1A1A1A]/50">Kart önizleme</p>
            <div className="mt-3 overflow-hidden rounded-xl border border-[#0B3C5D]/10">
              <div className="relative h-36 w-full bg-[#F7F9FB]">
                {coverUrl || thumbUrl ? (
                  <Image
                    src={
                      withSupabaseImageTransform(coverUrl || thumbUrl, { width: 400, quality: 75 }) ||
                      coverUrl ||
                      thumbUrl
                    }
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized={!(coverUrl || thumbUrl).includes("supabase")}
                  />
                ) : null}
              </div>
              <div className="space-y-2 p-4">
                <p className="text-[10px] font-bold uppercase text-[#1A1A1A]/50">{props.categoryName}</p>
                <p className="line-clamp-2 text-sm font-bold text-[#0B3C5D]">{title || "Başlık"}</p>
                <p className="line-clamp-2 text-xs text-[#1A1A1A]/65">{shortDescription}</p>
                <p className="text-xs font-bold text-[#0B3C5D]">{priceLinePreview}</p>
                <div className="flex flex-wrap gap-1 text-[10px] font-bold">
                  {isFeatured ? <span className="rounded border px-2 py-0.5">Öne çıkan</span> : null}
                  {isPopular ? <span className="rounded border px-2 py-0.5">Popüler</span> : null}
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <span className="rounded-xl bg-[#0B3C5D] py-2 text-center text-xs font-bold text-white">Satın Al</span>
                  <span className="rounded-xl border border-[#0B3C5D]/25 py-2 text-center text-xs font-bold text-[#0B3C5D]">Detay</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FaqInline({ f, serviceId, onSaved }: { f: FaqRow; serviceId: string; onSaved: () => void }) {
  const [q, setQ] = useState(f.question);
  const [a, setA] = useState(f.answer);
  useEffect(() => {
    setQ(f.question);
    setA(f.answer);
  }, [f.question, f.answer]);
  return (
    <div className="mt-2 space-y-2">
      <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full rounded-lg border px-2 py-1 text-sm font-semibold" />
      <textarea value={a} onChange={(e) => setA(e.target.value)} rows={3} className="w-full rounded-lg border px-2 py-1 text-sm" />
      <button
        type="button"
        className="rounded-lg bg-[#0B3C5D] px-3 py-1 text-xs font-bold text-white"
        onClick={async () => {
          const res = await adminUpsertSoftwareProductFaq({
            id: f.id,
            serviceId,
            question: q,
            answer: a,
            sort_order: f.sort_order,
            is_active: f.is_active,
          });
          if (res.ok) onSaved();
        }}
      >
        Soruyu kaydet
      </button>
    </div>
  );
}
