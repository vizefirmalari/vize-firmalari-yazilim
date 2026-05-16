"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { StorefrontCategoryPlaceholder } from "@/components/software-storefront/storefront-category-placeholder";
import type { PublicServiceStorefrontImageRow } from "@/lib/data/service-storefront-public";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import { serviceVitrinCategorySlug } from "@/lib/service-vitrin/category-slug";
import { sortServiceVitrinGalleryImages } from "@/lib/service-vitrin/sort-gallery-images";

type Props = {
  images: PublicServiceStorefrontImageRow[];
  title: string;
  category: string;
};

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="text-primary">
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceVitrinGallery({ images, title, category }: Props) {
  const ordered = useMemo(() => sortServiceVitrinGalleryImages(images), [images]);
  const categorySlug = serviceVitrinCategorySlug(category);
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);
  const swipeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const primaryIdx = ordered.findIndex((i) => i.is_primary);
    setIdx(primaryIdx >= 0 ? primaryIdx : 0);
  }, [ordered]);

  const count = ordered.length;
  const current = ordered[idx];
  const mainRaw = current?.display_url ?? null;
  const mainSrc = mainRaw ? withSupabaseImageTransform(mainRaw, { width: 1200, height: 1200, quality: 85 }) : null;
  const alt = current?.alt_text?.trim() || title;

  const go = useCallback(
    (delta: number) => {
      if (count <= 1) return;
      setIdx((i) => (i + delta + count) % count);
    },
    [count]
  );

  useEffect(() => {
    const node = swipeRef.current;
    if (!node || count <= 1) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0]?.clientX ?? 0;
    };
    const onEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0]?.clientX ?? 0;
      const dx = endX - startX;
      if (Math.abs(dx) > 48) go(dx > 0 ? -1 : 1);
    };
    node.addEventListener("touchstart", onStart, { passive: true });
    node.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      node.removeEventListener("touchstart", onStart);
      node.removeEventListener("touchend", onEnd);
    };
  }, [count, go]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, go]);

  if (!mainSrc) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <StorefrontCategoryPlaceholder variant="detail" categorySlug={categorySlug} categoryName={category} headline={title} />
      </div>
    );
  }

  const lightboxSrc = withSupabaseImageTransform(mainRaw, { width: 1600, height: 1600, quality: 90 });

  const lightboxNode =
    lightbox && mounted && lightboxSrc
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/88 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} görsel galerisi`}
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              onClick={() => setLightbox(false)}
              aria-label="Kapat"
            >
              <span className="text-xl leading-none" aria-hidden>
                ×
              </span>
            </button>
            {count > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/95 shadow-md transition hover:bg-white sm:left-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Önceki görsel"
                >
                  <ChevronIcon dir="left" />
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/95 shadow-md transition hover:bg-white sm:right-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Sonraki görsel"
                >
                  <ChevronIcon dir="right" />
                </button>
                <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
                  {idx + 1} / {count}
                </p>
              </>
            ) : null}
            <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightboxSrc} alt={alt} className="max-h-[90vh] max-w-[90vw] object-contain" />
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="space-y-3">
        <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <button
            ref={swipeRef}
            type="button"
            className="relative h-full w-full cursor-zoom-in"
            onClick={() => setLightbox(true)}
            aria-label="Görseli büyüt"
          >
            <Image
              src={mainSrc}
              alt={alt}
              fill
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-2 sm:p-4"
            />
          </button>
          {count > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 shadow-md transition hover:bg-white"
                onClick={() => go(-1)}
                aria-label="Önceki görsel"
              >
                <ChevronIcon dir="left" />
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 shadow-md transition hover:bg-white"
                onClick={() => go(1)}
                aria-label="Sonraki görsel"
              >
                <ChevronIcon dir="right" />
              </button>
              <span className="absolute bottom-3 right-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-bold text-white">
                {idx + 1}/{count}
              </span>
            </>
          ) : null}
        </div>
        {count > 1 ? (
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ordered.map((img, i) => {
              const thumbSrc = withSupabaseImageTransform(img.display_url, { width: 160, height: 160, quality: 72 });
              if (!thumbSrc) return null;
              const active = i === idx;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border-2 bg-white transition sm:h-20 sm:w-20 ${
                    active ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/35"
                  }`}
                  aria-label={`Görsel ${i + 1}`}
                  aria-current={active ? "true" : undefined}
                >
                  <Image src={thumbSrc} alt="" fill sizes="80px" loading={i > 4 ? "lazy" : "eager"} className="object-contain p-0.5" />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      {lightboxNode}
    </>
  );
}
