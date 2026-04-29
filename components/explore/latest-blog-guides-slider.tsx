"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import type { LatestBlogGuide } from "@/lib/explore/latest-blog-guides";

type Props = {
  items: LatestBlogGuide[];
};

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function LatestBlogGuidesSlider({ items }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dateMap = useMemo(() => new Map(items.map((item) => [item.id, formatDate(item.publishedAt)])), [items]);

  if (!items.length) return null;

  const slide = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = Math.max(260, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: direction === "next" ? delta : -delta, behavior: "smooth" });
  };

  return (
    <section className="mt-5 rounded-2xl border border-border/70 bg-white p-4 shadow-[0_1px_8px_rgba(11,60,93,0.06)] sm:mt-6 sm:p-5">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-primary md:text-xl">Güncel vize rehberleri</h2>
          <p className="mt-1 text-sm text-foreground/68">
            Başvuru süreçleri, ülke rehberleri ve vize türleri hakkında en yeni içerikleri inceleyin.
          </p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => slide("prev")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Önceki rehberler"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => slide("next")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Sonraki rehberler"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1"
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="group min-w-[82vw] snap-start overflow-hidden rounded-2xl border border-border bg-background shadow-[0_1px_6px_rgba(11,60,93,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(11,60,93,0.12)] sm:min-w-[46vw] lg:min-w-[31%] xl:min-w-[24%]"
          >
            <Link href={item.href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <div className="relative aspect-1200/630 overflow-hidden bg-primary/6">
                {item.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.coverImageUrl}
                    alt={item.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/90 to-secondary/85 text-sm font-semibold text-white/90">
                    Vize Rehberi
                  </div>
                )}
              </div>
              <div className="space-y-2 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex rounded-full bg-primary/8 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    {item.categoryLabel}
                  </span>
                  <time className="text-[11px] text-foreground/60">{dateMap.get(item.id)}</time>
                </div>
                <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-primary">{item.title}</h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-foreground/72">{item.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                  Rehberi oku <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
