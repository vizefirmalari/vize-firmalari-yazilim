"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import type { PublicSoftwareProductImageRow } from "@/lib/types/software-storefront";

function sortGalleryImages(images: PublicSoftwareProductImageRow[]): PublicSoftwareProductImageRow[] {
  const typeRank: Record<string, number> = { cover: 0, gallery: 1, feature: 2, thumbnail: 3, mobile_cover: 4 };
  const seen = new Set<string>();
  const deduped: PublicSoftwareProductImageRow[] = [];
  for (const img of images) {
    const k = img.display_url;
    if (seen.has(k)) continue;
    seen.add(k);
    deduped.push(img);
  }
  return deduped.sort((a, b) => {
    if (a.is_primary !== b.is_primary) return Number(b.is_primary) - Number(a.is_primary);
    const tr = (typeRank[a.image_type] ?? 9) - (typeRank[b.image_type] ?? 9);
    if (tr !== 0) return tr;
    return a.sort_order - b.sort_order || a.id.localeCompare(b.id);
  });
}

export function StorefrontServiceDetailGallery({
  images,
  serviceTitle,
  fallbackUrl,
}: {
  images: PublicSoftwareProductImageRow[];
  serviceTitle: string;
  fallbackUrl: string | null;
}) {
  const ordered = useMemo(() => sortGalleryImages(images), [images]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const p = ordered.findIndex((i) => i.is_primary);
    setIdx(p >= 0 ? p : 0);
  }, [ordered]);

  const current = ordered[idx];
  const mainRaw = current?.display_url ?? fallbackUrl;
  const main = mainRaw ? withSupabaseImageTransform(mainRaw, { width: 1200, height: 900, quality: 82 }) : null;
  const alt = current?.alt_text?.trim() || `${serviceTitle} görseli`;

  if (!main) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/45">Vitrin</span>
          <p className="text-sm font-semibold text-primary">Görsel hazırlanıyor</p>
          <p className="max-w-xs text-xs leading-relaxed text-foreground/55">
            Bu çözüm için henüz vitrin görseli tanımlanmadı. İçerik yönetiminden galeri ekleyebilir veya kapak URL alanlarını
            doldurabilirsiniz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface">
        <Image
          src={main}
          alt={alt}
          fill
          priority={idx === 0}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-contain sm:object-cover"
        />
      </div>
      {ordered.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ordered.map((img, i) => {
            const thumbSrc = withSupabaseImageTransform(img.display_url, { width: 160, height: 120, quality: 70 });
            if (!thumbSrc) return null;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setIdx(i)}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border transition ${
                  i === idx ? "border-secondary ring-2 ring-secondary/25" : "border-border opacity-90 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumbSrc}
                  alt=""
                  fill
                  loading={i > 3 ? "lazy" : "eager"}
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
