"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { StorefrontCategoryPlaceholder } from "@/components/software-storefront/storefront-category-placeholder";
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
  categorySlug,
  categoryName,
}: {
  images: PublicSoftwareProductImageRow[];
  serviceTitle: string;
  fallbackUrl: string | null;
  categorySlug: string;
  categoryName: string;
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
      <div className="overflow-hidden rounded-2xl border-2 border-border shadow-md">
        <StorefrontCategoryPlaceholder
          variant="detail"
          categorySlug={categorySlug}
          categoryName={categoryName}
          headline={serviceTitle}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-border bg-surface shadow-md">
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
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  i === idx ? "border-secondary ring-2 ring-secondary/30" : "border-border hover:border-secondary/25"
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
