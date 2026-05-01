import Link from "next/link";
import { FEED_CATEGORY_DEFS } from "@/lib/feed/feed-categories";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";

type Props = {
  className?: string;
  /** `/akis/[slug]` sayfasında ilgili kategori vurgulanır */
  activeSlug?: string | null;
};

/** İnce üst haber navigasyonu — `feed-categories` içindeki tüm kategoriler → `/akis/[slug]` */
export function FeedCategoryNav({ className = "", activeSlug = null }: Props) {
  const normalizedActive = activeSlug?.trim().toLowerCase() ?? null;

  return (
    <nav
      aria-label="Akış kategorileri"
      className={`border-y border-[#e5e7eb] bg-[#f8fafc] ${className}`.trim()}
    >
      <HomepageHorizontalScroller
        gapClass="gap-1 sm:gap-2"
        snap={false}
        flushMobile={false}
        className="w-full py-1.5 sm:py-2"
      >
        {FEED_CATEGORY_DEFS.map((c) => {
          const active = normalizedActive === c.slug;
          return (
            <Link
              key={c.slug}
              href={`/akis/${c.slug}`}
              prefetch={false}
              aria-current={active ? "page" : undefined}
              className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-md border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide transition sm:px-3 sm:text-[11px] ${
                active
                  ? "border-[#0B3C5D]/45 bg-[#0B3C5D]/12 text-[#0B3C5D] shadow-[inset_0_-1px_0_rgba(11,60,93,0.12)]"
                  : "border-transparent text-[#4b5563] hover:border-[#e5e7eb] hover:bg-white hover:text-[#0B3C5D]"
              }`}
            >
              {c.title}
            </Link>
          );
        })}
      </HomepageHorizontalScroller>
    </nav>
  );
}
