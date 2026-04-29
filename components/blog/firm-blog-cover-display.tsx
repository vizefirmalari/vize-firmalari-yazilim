"use client";

import { useEffect, useState } from "react";

/** `lib/search/site-search` SEARCH_BLOG_COVER_FALLBACK ile aynı; site geneli OG yedek görseli */
const DEFAULT_BLOG_COVER_FALLBACK = "/og-share.png";

/**
 * Blog / akış kapak: sabit oran yok; görsel doğal en-boy oranında, kırpılmadan (object-contain).
 * 1200×630 yalnızca editörde önerilen paylaşım ölçüsü; burada zorunlu değil.
 */

export type FirmBlogCoverDisplayProps = {
  src?: string | null;
  alt: string;
  priority?: boolean;
  outerClassName?: string;
  /** Yükleme hatasında gösterilecek yedek görsel (varsayılan site OG görseli). */
  fallbackSrc?: string;
  /** true: src boşken "Kapak yok" kutusu; false: src boşsa hiçbir şey gösterme */
  showEmptyPlaceholder?: boolean;
  /** Liste / özet: daha düşük boşluk ve max yükseklik */
  compact?: boolean;
  /** NEXT_PUBLIC_FEED_COVER_DEBUG=1 — /akis teşhis paneli ve img kök öznitelikleri */
  diagAkisCover?: boolean;
  diagFeedImageUrl?: string | null;
  diagDbCoverImageUrl?: string | null;
};

export function FirmBlogCoverDisplay({
  src,
  alt,
  priority,
  outerClassName,
  fallbackSrc = DEFAULT_BLOG_COVER_FALLBACK,
  showEmptyPlaceholder = false,
  compact = false,
  diagAkisCover = false,
  diagFeedImageUrl,
  diagDbCoverImageUrl,
}: FirmBlogCoverDisplayProps) {
  const resolved = typeof src === "string" ? src.trim() : "";
  /** ok: asıl URL; fallback: yedek; failed: her ikisi de yüklenmedi */
  const [loadState, setLoadState] = useState<"ok" | "fallback" | "failed">("ok");
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    setLoadState("ok");
    setNaturalSize(null);
  }, [resolved]);

  const wrapClass = `w-full min-w-0 overflow-hidden rounded-2xl bg-slate-100 ${outerClassName ?? ""}`;

  const emptyPadding = compact ? "min-h-[56px] px-2 py-2" : "min-h-[120px] px-4 py-8";
  const imgMax = compact ? "max-h-16 max-w-full sm:max-h-[4.25rem]" : "max-h-[70vh]";

  if (!resolved) {
    if (!showEmptyPlaceholder) return null;
    return (
      <div className={wrapClass}>
        <div
          className={`flex flex-col items-center justify-center gap-1 text-center ${emptyPadding}`}
        >
          <p
            className={`font-medium text-[#1A1A1A]/55 ${compact ? "text-[11px] leading-snug" : "text-sm"}`}
          >
            Kapak yok
          </p>
          {!compact ? (
            <p className="text-xs text-[#1A1A1A]/45">Kapak görseli yüklenince burada görünür.</p>
          ) : null}
        </div>
      </div>
    );
  }

  if (loadState === "failed") {
    return (
      <div className={wrapClass}>
        <div className={`flex flex-col items-center justify-center gap-1 text-center ${emptyPadding}`}>
          <p className={`font-medium text-[#1A1A1A]/55 ${compact ? "text-[11px]" : "text-sm"}`}>
            Görsel yüklenemedi
          </p>
          {!compact ? (
            <p className="text-xs text-[#1A1A1A]/45">
              Bağlantıyı kontrol edin veya kapak görselini yeniden yükleyin.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  const imgSrc = loadState === "fallback" ? fallbackSrc : resolved;
  const urlMatchDiag =
    typeof diagFeedImageUrl === "string" &&
    typeof diagDbCoverImageUrl === "string" &&
    diagFeedImageUrl.trim() === diagDbCoverImageUrl.trim();

  return (
    <div className={wrapClass}>
      {diagAkisCover && resolved ? (
        <div className="rounded-t-2xl border-b border-dashed border-[#1A1A1A]/12 bg-[#F8FAFC] px-2 py-1.5 font-mono text-[10px] leading-snug text-[#1A1A1A]/85">
          <div>feed item image_url (FeedItem): {diagFeedImageUrl ?? "(yok)"}</div>
          <div>
            firm_blog_posts.cover_image_url (DB snapshot):{" "}
            {diagDbCoverImageUrl ?? "(yok)"}
          </div>
          <div>Aynı string mi?: {urlMatchDiag ? "evet" : "hayır veya eksik prop"}</div>
          <div>kullanılan komponent: FirmBlogCoverDisplay</div>
          <div className={naturalSize ? "text-[#0B3C5D]" : ""}>
            doğal px (naturalWidth × naturalHeight):{" "}
            {naturalSize ? `${naturalSize.w} × ${naturalSize.h}` : "bekleniyor…"}
          </div>
          <p className="mt-1 pt-1 text-[9px] text-[#1A1A1A]/55">
            Kontrol: aynı adresi tarayıcıda yeni sekmede aç; tam görünüyorsa kırpma CSS/parent ile
            oluşmuş olabilir, dosya doğru ise natural boyut beklenişe uygun olmalı.
          </p>
        </div>
      ) : null}
      <img
        src={imgSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        data-cover-src={imgSrc}
        data-component="FirmBlogCoverDisplay"
        {...(diagAkisCover
          ? {
              onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
                const el = e.currentTarget;
                setNaturalSize({
                  w: el.naturalWidth,
                  h: el.naturalHeight,
                });
              },
            }
          : {})}
        onError={() => {
          setLoadState((prev) => {
            if (prev === "ok") return resolved !== fallbackSrc ? "fallback" : "failed";
            return "failed";
          });
        }}
        className={`mx-auto block h-auto w-full max-w-full object-contain object-center ${imgMax}`}
        draggable={false}
      />
    </div>
  );
}
