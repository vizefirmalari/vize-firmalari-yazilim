import Link from "next/link";
import type { FeedCategoryDef } from "@/lib/feed/feed-categories";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";

type Props = {
  defs: readonly FeedCategoryDef[];
  /** Boş ise URL’den türetilmez — üst bileşenden geçilir. */
  activeSlug?: string | null;
};

/**
 * Kategori sayfası ve `/akis` üst şeridine ortak konu bağlantıları (`/akis/[slug]`).
 */
export function AkisFeedTopicChips({ defs, activeSlug }: Props) {
  if (defs.length === 0) return null;

  return (
    <section className="-mx-3 border-b border-[#e5e7eb] bg-[#fafafa]/90 px-3 py-3 sm:-mx-4 sm:px-4" aria-label="Konu başlıkları">
      <HomepageHorizontalScroller gapClass="gap-2" snap={false} flushMobile={false} className="w-full">
        {defs.map((c) => {
          const active = Boolean(activeSlug && activeSlug === c.slug);
          return (
            <Link
              key={c.slug}
              href={`/akis/${c.slug}`}
              prefetch={false}
              className={`inline-flex shrink-0 items-center rounded-full border px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap transition ${
                active
                  ? "border-[#0B3C5D]/35 bg-[#0B3C5D]/10 text-[#0B3C5D]"
                  : "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#dbe2ea] hover:bg-[#f9fafb]"
              }`}
            >
              {c.title}
            </Link>
          );
        })}
      </HomepageHorizontalScroller>
    </section>
  );
}
