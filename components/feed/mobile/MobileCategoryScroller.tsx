import Link from "next/link";
import { getAkisCategoryNavOrderedDefs } from "@/lib/feed/feed-categories";

type Props = {
  className?: string;
  /** `/akis/[slug]` sayfasında mevcut kategori vurgulanır */
  activeSlug?: string | null;
};

/**
 * Mobilde yalnızca parmakla kaydırma — ok yok, scrollbar gizli, px 16 ile hizalı.
 */
export function MobileCategoryScroller({ className = "", activeSlug = null }: Props) {
  const normalizedActive = activeSlug?.trim().toLowerCase() ?? null;
  const defs = getAkisCategoryNavOrderedDefs();

  return (
    <nav
      aria-label="Konular"
      className={`-mx-4 px-4 md:mx-0 md:px-0 ${className}`.trim()}
    >
      <div
        className="flex flex-nowrap gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {defs.map((c) => {
          const active = normalizedActive === c.slug;
          return (
          <Link
            key={c.slug}
            href={`/akis/${c.slug}`}
            prefetch={false}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap transition active:bg-[#eef3f7] ${
              active
                ? "border-[#0B3C5D]/45 bg-[#0B3C5D]/12 text-[#0B3C5D] shadow-[inset_0_-1px_0_rgba(11,60,93,0.12)]"
                : "border-[#e5e7eb] bg-[#f8fafc] text-[#374151] hover:border-[#0B3C5D]/25 hover:bg-white hover:text-[#0B3C5D]"
            }`}
          >
            {c.title}
          </Link>
          );
        })}
      </div>
    </nav>
  );
}
