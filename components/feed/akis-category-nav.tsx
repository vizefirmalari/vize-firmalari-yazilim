import Link from "next/link";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";
import { getAkisCategoryNavOrderedDefs } from "@/lib/feed/feed-categories";

type Props = {
  activeSlug?: string | null;
  className?: string;
};

/** /akis gazete üst menüsü — önce öncelikli konular; yatay kaydırma (oklar, touch, scrollbar). */
export function AkisCategoryNav({ activeSlug = null, className = "" }: Props) {
  const normalized = activeSlug?.trim().toLowerCase() ?? null;
  const defs = getAkisCategoryNavOrderedDefs();

  return (
    <nav
      aria-label="Akış konuları"
      className={`border-t border-b border-[#e2e8f0] bg-white ${className}`.trim()}
    >
      <HomepageHorizontalScroller gapClass="gap-6 md:gap-7" snap={false} flushMobile={true} className="py-0">
        {defs.map((c) => {
          const active = normalized === c.slug;
          return (
            <Link
              key={c.slug}
              href={`/akis/${c.slug}`}
              prefetch={false}
              aria-current={active ? "page" : undefined}
              className={`inline-flex h-12 shrink-0 items-center whitespace-nowrap border-b-2 text-sm font-medium tracking-tight transition-colors ${
                active
                  ? "border-[#0B3C5D] text-[#0B3C5D]"
                  : "border-transparent text-[#334155] hover:text-[#0B3C5D] hover:underline hover:underline-offset-4"
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
