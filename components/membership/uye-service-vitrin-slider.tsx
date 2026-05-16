"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { StorefrontCategoryPlaceholder } from "@/components/software-storefront/storefront-category-placeholder";
import {
  SERVICE_STOREFRONT_PUBLIC_BASE,
  serviceStorefrontDetailPath,
} from "@/lib/constants/service-storefront";
import type { ServiceStorefrontPromoCard } from "@/lib/data/service-storefront-membership-promo";
import { formatTryLira, growthServicePriceLine } from "@/lib/format/try-lira";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";

type Props = {
  items: ServiceStorefrontPromoCard[];
  /** compact: form altı şerit */
  variant?: "default" | "compact";
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-primary">
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

function priceSnippet(item: ServiceStorefrontPromoCard): string | null {
  if (item.custom_price) return "Teklif üzerinden";
  if (item.setup_price != null && item.subscription_price != null) {
    return `${formatTryLira(item.setup_price)} kurulum · ${formatTryLira(item.subscription_price)} abonelik`;
  }
  if (item.setup_price != null) return `Kurulum ${formatTryLira(item.setup_price)}`;
  if (item.subscription_price != null) return `Abonelik ${formatTryLira(item.subscription_price)}`;
  const line = growthServicePriceLine(item.setup_price, item.subscription_price, false);
  return line === "Fiyat teklif üzerinden" ? null : line;
}

export function UyeServiceVitrinSlider({ items, variant = "default" }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const compact = variant === "compact";
  const cardBasis = compact
    ? "min-w-[72%] sm:min-w-[48%] md:min-w-[32%]"
    : "min-w-[82%] sm:min-w-[46%] md:min-w-[30%] lg:min-w-[24%]";

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => updateArrows());
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateArrows, items.length]);

  const scrollBy = useCallback((dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: Math.round(el.clientWidth * 0.85) * dir, behavior: "smooth" });
  }, []);

  if (!items.length) return null;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-linear-to-r from-white/95 to-transparent sm:block" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-10 bg-linear-to-l from-white/95 to-transparent sm:block" aria-hidden />

      {canPrev ? (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="absolute left-0 top-[42%] z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white shadow-md transition hover:bg-surface sm:flex"
          aria-label="Önceki hizmetler"
        >
          <Chevron dir="left" />
        </button>
      ) : null}
      {canNext ? (
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="absolute right-0 top-[42%] z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white shadow-md transition hover:bg-surface sm:flex"
          aria-label="Sonraki hizmetler"
        >
          <Chevron dir="right" />
        </button>
      ) : null}

      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const href = serviceStorefrontDetailPath(item.slug);
          const img = item.image_url
            ? withSupabaseImageTransform(item.image_url, { width: 640, height: 640, quality: 80 })
            : null;
          const price = priceSnippet(item);
          return (
            <article
              key={item.id}
              className={`${cardBasis} max-w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:border-primary/25 hover:shadow-md`}
            >
              <Link href={href} className="flex h-full flex-col">
                <div className={`relative w-full bg-white ${compact ? "aspect-[4/3]" : "aspect-square"}`}>
                  {img ? (
                    <Image
                      src={img}
                      alt={item.title}
                      fill
                      sizes="(max-width:640px) 85vw, 28vw"
                      loading="lazy"
                      className="object-contain p-2"
                    />
                  ) : (
                    <StorefrontCategoryPlaceholder
                      variant="card"
                      categorySlug={item.category_slug}
                      categoryName={item.category}
                      headline={item.title}
                    />
                  )}
                  {item.is_featured ? (
                    <span className="absolute left-2 top-2 rounded-full bg-secondary/90 px-2 py-0.5 text-[10px] font-bold text-primary">
                      Öne çıkan
                    </span>
                  ) : null}
                </div>
                <div className={`flex flex-1 flex-col ${compact ? "p-3" : "p-4"}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-primary/70">{item.category}</span>
                  <h4 className={`mt-1 font-bold leading-snug text-primary ${compact ? "line-clamp-2 text-sm" : "text-base"}`}>
                    {item.title}
                  </h4>
                  {!compact ? (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-foreground/78">{item.short_description}</p>
                  ) : null}
                  {price ? <p className="mt-2 text-[11px] font-semibold text-foreground/70">{price}</p> : null}
                  <span className="mt-auto pt-3 text-xs font-bold text-primary">Detayları gör →</span>
                </div>
              </Link>
            </article>
          );
        })}

        <article
          className={`${cardBasis} flex max-w-[280px] shrink-0 snap-start flex-col justify-center rounded-2xl border-2 border-dashed border-primary/25 bg-primary/5 p-5 sm:p-6`}
        >
          <p className="text-sm font-bold text-primary sm:text-base">Tüm yazılım hizmetlerini görün</p>
          <p className="mt-2 text-xs leading-relaxed text-foreground/75 sm:text-sm">
            Reklam, yapay zekâ, otomasyon, web ve CRM çözümlerini inceleyin.
          </p>
          <Link
            href={SERVICE_STOREFRONT_PUBLIC_BASE}
            className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 text-xs font-bold text-white transition hover:bg-primary/92 sm:text-sm"
          >
            Tüm hizmetleri gör
          </Link>
        </article>
      </div>
    </div>
  );
}
