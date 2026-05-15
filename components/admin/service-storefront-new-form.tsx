"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition, type ReactNode } from "react";

import { EmojiTextarea } from "@/components/admin/emoji-textarea";
import { EMOJI_TEXT_CLASS } from "@/lib/admin/service-emoji";
import {
  adminCreateServiceStorefrontBundle,
  type ServiceStorefrontImageType,
} from "@/lib/actions/service-storefront-admin";
import {
  SERVICE_STOREFRONT_CURRENCIES,
  SERVICE_STOREFRONT_DEFAULT_CATEGORIES,
  SERVICE_STOREFRONT_IMAGE_HINT,
  SERVICE_STOREFRONT_IMAGE_MAX_BYTES,
  parseServiceStorefrontSecondaryKeywords,
  parseServiceStorefrontTags,
  serviceStorefrontNumOrNull,
} from "@/lib/admin/service-storefront-form-constants";
import { SERVICE_STOREFRONT_PUBLIC_BASE, serviceStorefrontDetailPath } from "@/lib/constants/service-storefront";
import { absoluteUrl, resolveCanonicalUrl } from "@/lib/seo/canonical";
import { slugifyGrowth } from "@/lib/slug/growth-slug";

type TabId = "content" | "pricing" | "images" | "service" | "adv" | "faq" | "seo" | "publish";

type DraftImage = {
  clientId: string;
  file: File;
  previewUrl: string;
  image_type: ServiceStorefrontImageType;
  alt_text: string;
  is_primary: boolean;
  manual_url: string;
};

type DraftFaq = {
  clientId: string;
  question: string;
  answer: string;
  is_active: boolean;
};

type DraftFeature = {
  clientId: string;
  title: string;
  description: string;
  icon: string;
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

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">{children}</div>;
}

function newClientId() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

export function ServiceStorefrontNewForm() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>("content");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<string>(SERVICE_STOREFRONT_DEFAULT_CATEGORIES[0]);
  const [tagsText, setTagsText] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const [setup, setSetup] = useState("");
  const [subPrice, setSubPrice] = useState("");
  const [yearlyPrice, setYearlyPrice] = useState("");
  const [subPeriod, setSubPeriod] = useState("");
  const [currency, setCurrency] = useState<(typeof SERVICE_STOREFRONT_CURRENCIES)[number]>("TRY");
  const [customPrice, setCustomPrice] = useState(false);
  const [discountLabel, setDiscountLabel] = useState("");

  const [images, setImages] = useState<DraftImage[]>([]);

  const [setupTime, setSetupTime] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [supportDuration, setSupportDuration] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [serviceScope, setServiceScope] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [processDescription, setProcessDescription] = useState("");

  const [features, setFeatures] = useState<DraftFeature[]>([]);
  const [newFeatIcon, setNewFeatIcon] = useState("");
  const [newFeatTitle, setNewFeatTitle] = useState("");
  const [newFeatDesc, setNewFeatDesc] = useState("");

  const [faqs, setFaqs] = useState<DraftFaq[]>([]);
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [canonicalPath, setCanonicalPath] = useState("");
  const [seoFocus, setSeoFocus] = useState("");
  const [seoSecondary, setSeoSecondary] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);
  const [sitemapInclude, setSitemapInclude] = useState(true);

  const [status, setStatus] = useState<"draft" | "published" | "archived">("draft");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);

  const slugResolved = slug.trim() || slugifyGrowth(title);
  const previewPath = serviceStorefrontDetailPath(slugResolved || "ornek-hizmet");
  const previewCanonical = useMemo(() => {
    const fb = absoluteUrl(previewPath);
    return resolveCanonicalUrl(canonicalPath.trim() || null, fb);
  }, [canonicalPath, previewPath]);

  const seoLen = seoDescription.trim().length;
  const seoLenHint =
    seoLen === 0 ? "140–160 karakter önerilir." : seoLen < 140 ? "Biraz kısa — 140+ karakter hedefleyin." : seoLen > 160 ? "Biraz uzun — 160 altında tutmayı deneyin." : "İyi uzunluk.";

  useEffect(() => {
    return () => {
      for (const im of images) URL.revokeObjectURL(im.previewUrl);
    };
  }, [images]);

  const addFiles = useCallback((files: FileList | File[]) => {
    const list = Array.from(files);
    const next: DraftImage[] = [];
    for (const file of list) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > SERVICE_STOREFRONT_IMAGE_MAX_BYTES) {
        setMsg(`${file.name}: en fazla 5 MB.`);
        continue;
      }
      next.push({
        clientId: newClientId(),
        file,
        previewUrl: URL.createObjectURL(file),
        image_type: "square",
        alt_text: title.trim() || "",
        is_primary: false,
        manual_url: "",
      });
    }
    if (!next.length) return;
    setImages((prev) => {
      const merged = [...prev, ...next];
      if (!merged.some((x) => x.is_primary) && merged.length) merged[0].is_primary = true;
      return [...merged];
    });
    setMsg(null);
  }, [title]);

  function buildPayload() {
    return {
      item: {
        title,
        slug: slugResolved || undefined,
        category,
        tags: parseServiceStorefrontTags(tagsText),
        short_description: shortDescription,
        long_description: longDescription.trim() || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        canonical_path: canonicalPath.trim() || null,
        og_image_url: ogUrl.trim() || null,
        seo_focus_keyword: seoFocus.trim() || null,
        seo_secondary_keywords: parseServiceStorefrontSecondaryKeywords(seoSecondary),
        status,
        is_featured: isFeatured,
        is_popular: isPopular,
        is_new: isNew,
        sort_order: sortOrder,
        setup_price: customPrice ? null : serviceStorefrontNumOrNull(setup),
        subscription_price: customPrice ? null : serviceStorefrontNumOrNull(subPrice),
        yearly_price: customPrice ? null : serviceStorefrontNumOrNull(yearlyPrice),
        subscription_period: subPeriod.trim() || null,
        currency,
        custom_price: customPrice,
        discount_label: discountLabel.trim() || null,
        delivery_time: deliveryTime.trim() || null,
        setup_time: setupTime.trim() || null,
        support_duration: supportDuration.trim() || null,
        target_audience: targetAudience.trim() || null,
        service_scope: serviceScope.trim() || null,
        setup_scope: null,
        monthly_scope: null,
        post_support_notes: null,
        prerequisites: prerequisites.trim() || null,
        process_description: processDescription.trim() || null,
        robots_index: robotsIndex,
        robots_follow: robotsFollow,
        sitemap_include: sitemapInclude,
      },
      faqs: faqs.map((f, i) => ({
        question: f.question,
        answer: f.answer,
        sort_order: i,
        is_active: f.is_active,
      })),
      features: features.map((f, i) => ({
        title: f.title,
        description: f.description.trim() || null,
        icon: f.icon.trim() || null,
        sort_order: i,
        is_active: f.is_active,
      })),
    };
  }

  function submit(mode: "draft" | "publish") {
    setMsg(null);
    if (!title.trim() || !shortDescription.trim()) {
      setMsg("Hizmet adı ve kısa açıklama zorunludur.");
      setTab("content");
      return;
    }
    start(async () => {
      const fd = new FormData();
      const payload = buildPayload();
      if (mode === "publish") payload.item.status = "published";
      fd.set("payload", JSON.stringify(payload));

      images.forEach((im, idx) => {
        fd.set(`image_file_${idx}`, im.file);
        fd.set(`image_type_${idx}`, im.image_type);
        fd.set(`image_alt_${idx}`, im.alt_text);
        fd.set(`image_primary_${idx}`, im.is_primary ? "true" : "false");
        if (im.manual_url.trim()) fd.set(`image_manual_${idx}`, im.manual_url.trim());
      });

      const res = await adminCreateServiceStorefrontBundle(fd);
      if (!res.ok) {
        setMsg(res.error);
        return;
      }
      router.replace(`/admin/hizmet-vitrini/hizmetler/${res.id}`);
      router.refresh();
    });
  }

  const imagePreviewOptions = images.map((im) => ({ id: im.clientId, url: im.previewUrl }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#1A1A1A]/60">
          Tüm vitrin alanlarını sekmelerde doldurun; kayıt sonrası tam düzenleme ekranına yönlendirilirsiniz.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={() => submit("draft")}
            className="rounded-xl border border-[#0B3C5D]/20 bg-white px-4 py-2.5 text-sm font-bold text-[#0B3C5D] disabled:opacity-50"
          >
            Taslak kaydet
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => submit("publish")}
            className="rounded-xl bg-[#0B3C5D] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
          >
            Oluştur ve yayınla
          </button>
        </div>
      </div>

      {msg ? <p className="rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-4 py-3 text-sm font-semibold text-[#0B3C5D]">{msg}</p> : null}

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
        {tabBtn(tab === "content", () => setTab("content"), "İçerik")}
        {tabBtn(tab === "pricing", () => setTab("pricing"), "Fiyat")}
        {tabBtn(tab === "images", () => setTab("images"), "Görsel")}
        {tabBtn(tab === "service", () => setTab("service"), "Hizmet bilgileri")}
        {tabBtn(tab === "adv", () => setTab("adv"), "Avantajlar")}
        {tabBtn(tab === "faq", () => setTab("faq"), "SSS")}
        {tabBtn(tab === "seo", () => setTab("seo"), "SEO")}
        {tabBtn(tab === "publish", () => setTab("publish"), "Yayın")}
      </div>

      {tab === "content" ? (
        <Card>
          <div className="grid gap-4">
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Hizmet adı *
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" required />
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Slug
              <div className="mt-1 flex gap-2">
                <input value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 rounded-xl border px-3 py-2 text-sm" placeholder={slugResolved} />
                <button type="button" className="shrink-0 rounded-xl border px-3 text-xs font-bold text-[#0B3C5D]" onClick={() => setSlug(slugifyGrowth(title))}>
                  Üret
                </button>
              </div>
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Kategori
              <input value={category} onChange={(e) => setCategory(e.target.value)} list="new-svc-cats" className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
              <datalist id="new-svc-cats">
                {SERVICE_STOREFRONT_DEFAULT_CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Etiketler (virgülle)
              <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            </label>
            <label className="block text-xs font-bold text-[#1A1A1A]/55">
              Kısa açıklama *
              <EmojiTextarea value={shortDescription} onChange={setShortDescription} rows={3} required />
            </label>
            <label className="block text-xs font-bold text-[#1A1A1A]/55">
              Uzun açıklama
              <EmojiTextarea value={longDescription} onChange={setLongDescription} rows={8} />
            </label>
          </div>
        </Card>
      ) : null}

      {tab === "pricing" ? (
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Para birimi
              <select value={currency} onChange={(e) => setCurrency(e.target.value as typeof currency)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm">
                {SERVICE_STOREFRONT_CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="flex items-end gap-2 pb-1 text-sm font-bold text-[#0B3C5D] sm:col-span-1">
              <input type="checkbox" checked={customPrice} onChange={(e) => setCustomPrice(e.target.checked)} />
              Teklif üzerinden
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Kurulum ücreti
              <input value={setup} onChange={(e) => setSetup(e.target.value)} disabled={customPrice} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm disabled:opacity-50" inputMode="numeric" />
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Aylık abonelik
              <input value={subPrice} onChange={(e) => setSubPrice(e.target.value)} disabled={customPrice} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm disabled:opacity-50" inputMode="numeric" />
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Yıllık abonelik
              <input value={yearlyPrice} onChange={(e) => setYearlyPrice(e.target.value)} disabled={customPrice} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm disabled:opacity-50" inputMode="numeric" />
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Abonelik dönemi
              <input value={subPeriod} onChange={(e) => setSubPeriod(e.target.value)} placeholder="örn. aylık" className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            </label>
            <label className="sm:col-span-2 text-xs font-bold text-[#1A1A1A]/55">
              İndirim etiketi (opsiyonel)
              <input value={discountLabel} onChange={(e) => setDiscountLabel(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            </label>
          </div>
        </Card>
      ) : null}

      {tab === "images" ? (
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-[#0B3C5D]">Hizmet görselleri</p>
              <p className="mt-1 text-xs text-[#1A1A1A]/50">{SERVICE_STOREFRONT_IMAGE_HINT}</p>
            </div>
            <div
              className="cursor-pointer rounded-xl border-2 border-dashed border-[#0B3C5D]/25 bg-[#F7F9FB] p-8 text-center transition hover:border-[#0B3C5D]/40"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
              }}
            >
              <p className="text-sm font-semibold text-[#0B3C5D]">Dosya seçin veya sürükleyip bırakın</p>
              <p className="mt-1 text-xs text-[#1A1A1A]/50">Kare vitrin, kapak, thumbnail veya galeri</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
            {images.length ? (
              <ul className="grid gap-4 sm:grid-cols-2">
                {images.map((im, idx) => (
                  <li key={im.clientId} className="rounded-xl border border-[#0B3C5D]/12 p-3">
                    <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-[#F7F9FB]">
                      <Image src={im.previewUrl} alt="" fill className="object-cover" unoptimized />
                    </div>
                    <select
                      value={im.image_type}
                      onChange={(e) => {
                        const v = e.target.value as ServiceStorefrontImageType;
                        setImages((prev) => prev.map((x) => (x.clientId === im.clientId ? { ...x, image_type: v } : x)));
                      }}
                      className="mt-2 w-full rounded-lg border px-2 py-1.5 text-xs"
                    >
                      <option value="square">Kare (vitrin)</option>
                      <option value="cover">Kapak</option>
                      <option value="detail">Detay</option>
                      <option value="gallery">Galeri</option>
                    </select>
                    <input
                      value={im.alt_text}
                      onChange={(e) => setImages((prev) => prev.map((x) => (x.clientId === im.clientId ? { ...x, alt_text: e.target.value } : x)))}
                      placeholder="Alt metin"
                      className="mt-2 w-full rounded-lg border px-2 py-1.5 text-xs"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className={`rounded-lg border px-2 py-1 text-xs font-bold ${im.is_primary ? "border-[#0B3C5D] bg-[#0B3C5D] text-white" : ""}`}
                        onClick={() =>
                          setImages((prev) =>
                            prev.map((x) => ({ ...x, is_primary: x.clientId === im.clientId }))
                          )
                        }
                      >
                        Ana görsel
                      </button>
                      <button type="button" disabled={idx === 0} className="rounded border px-2 text-xs" onClick={() => {
                        setImages((prev) => {
                          const n = [...prev];
                          [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]];
                          return n;
                        });
                      }}>↑</button>
                      <button type="button" disabled={idx === images.length - 1} className="rounded border px-2 text-xs" onClick={() => {
                        setImages((prev) => {
                          const n = [...prev];
                          [n[idx + 1], n[idx]] = [n[idx], n[idx + 1]];
                          return n;
                        });
                      }}>↓</button>
                      <button type="button" className="rounded border border-red-600/30 px-2 text-xs text-red-700" onClick={() => {
                        URL.revokeObjectURL(im.previewUrl);
                        setImages((prev) => {
                          const n = prev.filter((x) => x.clientId !== im.clientId);
                          if (!n.some((x) => x.is_primary) && n.length) n[0].is_primary = true;
                          return [...n];
                        });
                      }}>Kaldır</button>
                    </div>
                    <details className="mt-2 text-xs">
                      <summary className="cursor-pointer font-bold text-[#0B3C5D]/80">Gelişmiş: manuel URL</summary>
                      <input
                        value={im.manual_url}
                        onChange={(e) => setImages((prev) => prev.map((x) => (x.clientId === im.clientId ? { ...x, manual_url: e.target.value } : x)))}
                        className="mt-1 w-full rounded border px-2 py-1"
                        placeholder="https://..."
                      />
                    </details>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#1A1A1A]/50">Henüz görsel eklenmedi. En az bir kare görsel vitrin kartlarında güçlü görünür.</p>
            )}
          </div>
        </Card>
      ) : null}

      {tab === "service" ? (
        <Card>
          <div className="grid gap-4">
            {[
              ["Kurulum süresi", setupTime, setSetupTime],
              ["Teslimat süresi", deliveryTime, setDeliveryTime],
              ["Abonelik dönemi (metin)", subPeriod, setSubPeriod],
              ["Destek süresi", supportDuration, setSupportDuration],
              ["Kimler için uygun?", targetAudience, setTargetAudience],
              ["Hizmet kapsamı", serviceScope, setServiceScope],
              ["Gerekli ön bilgiler", prerequisites, setPrerequisites],
              ["Süreç nasıl işler?", processDescription, setProcessDescription],
            ].map(([label, val, set]) => (
              <label key={String(label)} className="block text-xs font-bold text-[#1A1A1A]/55">
                {String(label)}
                <EmojiTextarea value={val as string} onChange={set as (s: string) => void} rows={2} hint={null} />
              </label>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === "adv" ? (
        <Card>
          <div className="space-y-4">
            <ul className="space-y-2">
              {features.map((f, idx) => (
                <li key={f.clientId} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm">
                  <span>
                    {f.icon ? `${f.icon} ` : null}
                    <strong>{f.title}</strong>
                    {f.description ? <span className="text-[#1A1A1A]/55"> — {f.description}</span> : null}
                    {!f.is_active ? <span className="ml-2 text-xs text-[#1A1A1A]/45">(pasif)</span> : null}
                  </span>
                  <div className="flex gap-1">
                    <button type="button" disabled={idx === 0} className="rounded border px-2 text-xs" onClick={() => {
                      setFeatures((prev) => {
                        const n = [...prev];
                        [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]];
                        return n;
                      });
                    }}>↑</button>
                    <button type="button" disabled={idx === features.length - 1} className="rounded border px-2 text-xs" onClick={() => {
                      setFeatures((prev) => {
                        const n = [...prev];
                        [n[idx + 1], n[idx]] = [n[idx], n[idx + 1]];
                        return n;
                      });
                    }}>↓</button>
                    <button type="button" className="rounded border px-2 text-xs" onClick={() => setFeatures((prev) => prev.map((x) => (x.clientId === f.clientId ? { ...x, is_active: !x.is_active } : x)))}>{f.is_active ? "Pasif" : "Aktif"}</button>
                    <button type="button" className="rounded border px-2 text-xs text-red-700" onClick={() => setFeatures((prev) => prev.filter((x) => x.clientId !== f.clientId))}>Sil</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="grid gap-2 rounded-xl border border-dashed border-[#0B3C5D]/20 p-4 sm:grid-cols-2">
              <input value={newFeatIcon} onChange={(e) => setNewFeatIcon(e.target.value)} placeholder="İkon / emoji" className="rounded-xl border px-3 py-2 text-sm" />
              <input value={newFeatTitle} onChange={(e) => setNewFeatTitle(e.target.value)} placeholder="Başlık *" className="rounded-xl border px-3 py-2 text-sm" />
              <textarea value={newFeatDesc} onChange={(e) => setNewFeatDesc(e.target.value)} placeholder="Açıklama" rows={2} className="sm:col-span-2 rounded-xl border px-3 py-2 text-sm" />
              <button
                type="button"
                className="sm:col-span-2 rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white"
                onClick={() => {
                  if (!newFeatTitle.trim()) return;
                  setFeatures((prev) => [
                    ...prev,
                    { clientId: newClientId(), title: newFeatTitle.trim(), description: newFeatDesc, icon: newFeatIcon, is_active: true },
                  ]);
                  setNewFeatTitle("");
                  setNewFeatDesc("");
                  setNewFeatIcon("");
                }}
              >
                + Avantaj ekle
              </button>
            </div>
          </div>
        </Card>
      ) : null}

      {tab === "faq" ? (
        <Card>
          <div className="space-y-4">
            <ul className="space-y-3">
              {faqs.map((f, idx) => (
                <li key={f.clientId} className="rounded-xl border p-3 text-sm">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" disabled={idx === 0} className="rounded border px-2 text-xs" onClick={() => {
                      setFaqs((prev) => {
                        const n = [...prev];
                        [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]];
                        return n;
                      });
                    }}>↑</button>
                    <button type="button" disabled={idx === faqs.length - 1} className="rounded border px-2 text-xs" onClick={() => {
                      setFaqs((prev) => {
                        const n = [...prev];
                        [n[idx + 1], n[idx]] = [n[idx], n[idx + 1]];
                        return n;
                      });
                    }}>↓</button>
                    <button type="button" className="rounded border px-2 text-xs" onClick={() => setFaqs((prev) => prev.map((x) => (x.clientId === f.clientId ? { ...x, is_active: !x.is_active } : x)))}>{f.is_active ? "Pasif" : "Aktif"}</button>
                    <button type="button" className="rounded border px-2 text-xs text-red-700" onClick={() => setFaqs((prev) => prev.filter((x) => x.clientId !== f.clientId))}>Sil</button>
                  </div>
                  <p className="mt-2 font-bold">{f.question}</p>
                  <p className="text-xs text-[#1A1A1A]/70">{f.answer}</p>
                </li>
              ))}
            </ul>
            <div className="space-y-2 rounded-xl border border-dashed p-4">
              <input value={newFaqQ} onChange={(e) => setNewFaqQ(e.target.value)} placeholder="Soru" className="w-full rounded-xl border px-3 py-2 text-sm" />
              <textarea value={newFaqA} onChange={(e) => setNewFaqA(e.target.value)} placeholder="Cevap" rows={3} className="w-full rounded-xl border px-3 py-2 text-sm" />
              <button
                type="button"
                className="rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-bold text-white"
                onClick={() => {
                  if (!newFaqQ.trim() || !newFaqA.trim()) return;
                  setFaqs((prev) => [...prev, { clientId: newClientId(), question: newFaqQ.trim(), answer: newFaqA.trim(), is_active: true }]);
                  setNewFaqQ("");
                  setNewFaqA("");
                }}
              >
                + Soru ekle
              </button>
            </div>
          </div>
        </Card>
      ) : null}

      {tab === "seo" ? (
        <Card>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#1A1A1A]/55">
                SEO başlık
                <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
              </label>
              <label className="text-xs font-bold text-[#1A1A1A]/55">
                Meta açıklama ({seoLen} karakter)
                <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
                <span className="mt-1 block text-[11px] font-medium text-[#1A1A1A]/45">{seoLenHint}</span>
              </label>
              <label className="text-xs font-bold text-[#1A1A1A]/55">
                Canonical URL
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
                OG görsel
                {imagePreviewOptions.length ? (
                  <select
                    className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
                    value=""
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v) setOgUrl(v);
                    }}
                  >
                    <option value="">Yüklenen görsellerden seç…</option>
                    {imagePreviewOptions.map((g) => (
                      <option key={g.id} value={g.url}>{g.url.slice(0, 48)}…</option>
                    ))}
                  </select>
                ) : null}
                <input value={ogUrl} onChange={(e) => setOgUrl(e.target.value)} className="mt-2 w-full rounded-xl border px-3 py-2 text-xs" placeholder="veya URL" />
              </label>
            </div>
            <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4 text-sm">
              <p className="text-xs font-bold uppercase text-[#1A1A1A]/50">Önizleme</p>
              <p className="mt-2 font-bold text-[#0B3C5D]">{seoTitle.trim() || title || "Hizmet başlığı"}</p>
              <p className="mt-1 break-all text-xs text-[#0B3C5D]/80">{previewCanonical}</p>
              <p className={`mt-2 text-xs text-[#1A1A1A]/70 ${EMOJI_TEXT_CLASS}`}>{seoDescription.trim() || shortDescription || "Meta açıklama…"}</p>
            </div>
          </div>
        </Card>
      ) : null}

      {tab === "publish" ? (
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Yayın durumu
              <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm">
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
                <option value="archived">Arşiv</option>
              </select>
            </label>
            <label className="text-xs font-bold text-[#1A1A1A]/55">
              Sıralama
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value) || 0)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] sm:col-span-2">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
              Öne çıkan
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] sm:col-span-2">
              <input type="checkbox" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} />
              Popüler
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] sm:col-span-2">
              <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
              Yeni
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D]">
              <input type="checkbox" checked={robotsIndex} onChange={(e) => setRobotsIndex(e.target.checked)} />
              index
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D]">
              <input type="checkbox" checked={robotsFollow} onChange={(e) => setRobotsFollow(e.target.checked)} />
              follow
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-[#0B3C5D] sm:col-span-2">
              <input type="checkbox" checked={sitemapInclude} onChange={(e) => setSitemapInclude(e.target.checked)} />
              Sitemap’e dahil et
            </label>
            <p className="text-xs text-[#1A1A1A]/55 sm:col-span-2">
              Kamu vitrin: <Link href={SERVICE_STOREFRONT_PUBLIC_BASE} className="font-semibold text-[#0B3C5D] underline" target="_blank" rel="noopener noreferrer">{SERVICE_STOREFRONT_PUBLIC_BASE}</Link>
            </p>
          </div>
        </Card>
      ) : null}

      <div className="sticky bottom-0 z-10 flex flex-wrap justify-end gap-2 rounded-2xl border border-[#0B3C5D]/10 bg-white/95 p-4 shadow-lg backdrop-blur">
        <button type="button" disabled={pending} onClick={() => submit("draft")} className="rounded-xl border border-[#0B3C5D]/20 px-4 py-2.5 text-sm font-bold text-[#0B3C5D] disabled:opacity-50">
          Taslak kaydet
        </button>
        <button type="button" disabled={pending} onClick={() => submit("publish")} className="rounded-xl bg-[#0B3C5D] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">
          Oluştur ve yayınla
        </button>
      </div>
    </div>
  );
}
