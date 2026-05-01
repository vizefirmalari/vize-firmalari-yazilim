"use client";

import { useCallback, useMemo, useState } from "react";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { AKIS_QUICK_TOPIC_CHIPS } from "@/lib/feed/akis-quick-topic-chips";
import { getFeedCategoryBySlug } from "@/lib/feed/feed-categories";
import { postMatchesAkisCategoryLanding } from "@/lib/feed/feed-category-match";
import { AkisDigestCard } from "@/components/feed/akis-digest-card";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";

type Props = {
  pool: FeedHubBlogPost[];
};

const INITIAL_VISIBLE = 6;
const STEP = 6;

/**
 * Haber mantığında konu chipleri: route değiştirmeden Havuz filtresi + “daha fazla” ile tembel genişletme (sunucuya ek istek yok).
 */
export function AkisTopicsFilterBlock({ pool }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filtered = useMemo(() => {
    if (!activeSlug) return pool;
    const def = getFeedCategoryBySlug(activeSlug);
    if (!def) return pool;
    return pool.filter((p) => postMatchesAkisCategoryLanding(p, def));
  }, [pool, activeSlug]);

  const slice = filtered.slice(0, visibleCount);
  const canLoadMore = filtered.length > visibleCount;

  const selectChip = useCallback((slug: string | null) => {
    setActiveSlug(slug);
    setVisibleCount(INITIAL_VISIBLE);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((v) => v + STEP);
  }, []);

  if (pool.length === 0) return null;

  return (
    <section className="mb-14 md:mb-16" aria-labelledby="akis-topic-strip-heading">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between md:mb-8">
        <h2 id="akis-topic-strip-heading" className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl">
          Konular
        </h2>
        <p className="text-[13px] text-[#6b7280]">Yazılar bu sayfa içinde filtrelenir; URL değişmez.</p>
      </div>

      <nav className="-mx-1 mb-10 md:mb-12" aria-label="Hızlı konular">
        <HomepageHorizontalScroller gapClass="gap-2.5" snap={false} flushMobile={false} className="w-full py-2">
          <button
            type="button"
            onClick={() => selectChip(null)}
            className={`inline-flex shrink-0 items-center rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition ${
              activeSlug === null
                ? "bg-[#0B3C5D] text-white shadow-sm"
                : "bg-[#f3f4f6] text-[#374151] ring-1 ring-transparent hover:bg-[#e5e7eb]"
            }`}
          >
            Tümü
          </button>
          {AKIS_QUICK_TOPIC_CHIPS.map(({ slug, label }) => {
            const active = activeSlug === slug;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => selectChip(slug)}
                className={`inline-flex shrink-0 items-center rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition ${
                  active
                    ? "bg-[#0B3C5D] text-white shadow-sm"
                    : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </HomepageHorizontalScroller>
      </nav>

      {slice.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {slice.map((p) => (
            <AkisDigestCard key={p.id} post={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#f9fafb] px-6 py-12 text-center">
          <p className="text-sm font-semibold text-[#111827]">
            Bu konuda daha fazla liste öğesi yok.
          </p>
          <p className="mt-2 text-sm text-[#6b7280]">“Tümü” ile yeniden listeleyebilirsiniz.</p>
          <button
            type="button"
            onClick={() => selectChip(null)}
            className="mt-5 inline-flex items-center rounded-full bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0A3552]"
          >
            Tümünü göster
          </button>
        </div>
      )}

      {canLoadMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            className="rounded-full border border-[#e5e7eb] bg-white px-5 py-2.5 text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-[#fafafa]"
          >
            Daha fazla göster
          </button>
        </div>
      ) : null}
    </section>
  );
}
