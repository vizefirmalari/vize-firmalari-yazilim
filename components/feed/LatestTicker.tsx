import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";

type Props = {
  posts: FeedHubBlogPost[];
};

/** Haber bandı: sol başlık + yatay kısa linkler */
export function LatestTicker({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="-mx-px mb-7 border-y border-[#d8dee6] bg-[#f4f7fb] lg:mb-8" aria-labelledby="akis-latest-ticker-heading">
      <div className="flex flex-col gap-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="shrink-0 border-b border-[#d8dee6] px-1 py-2.5 sm:border-b-0 sm:border-r sm:py-2 sm:pr-5 lg:py-3 lg:pr-7">
          <h2 id="akis-latest-ticker-heading" className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#111827]">
            Güncel Rehberler
          </h2>
        </div>
        <HomepageHorizontalScroller
          gapClass="gap-0"
          snap={false}
          flushMobile={false}
          className="min-h-0 min-w-0 flex-1 py-2 sm:py-2.5 lg:py-3"
        >
          {posts.map((p, idx) => {
            const tag = p.category_name?.trim() || "Rehber";
            return (
              <div
                key={p.id}
                className={`flex min-w-[min(260px,calc(100vw-10rem))] shrink-0 flex-col justify-center border-[#dfe4ea] px-5 py-2 sm:min-w-62 sm:py-2.5 sm:pr-8 md:min-w-66 ${
                  idx > 0 ? "border-l" : ""
                }`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0B3C5D]">{tag}</p>
                <Link
                  href={p.target_url}
                  className="mt-1 line-clamp-2 text-left text-[13px] font-semibold leading-snug text-[#111827] underline-offset-2 hover:text-[#0B3C5D] hover:underline"
                >
                  {p.title}
                </Link>
              </div>
            );
          })}
        </HomepageHorizontalScroller>
      </div>
    </section>
  );
}
