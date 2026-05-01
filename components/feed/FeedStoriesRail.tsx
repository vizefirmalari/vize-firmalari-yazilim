import Link from "next/link";
import type { FeedStoryStripItem } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";

type Props = {
  stories: FeedStoryStripItem[];
};

/** Kısa akış gönderileri (`firm_feed_posts`) — ana blog hub’ının yanında hafif yatay şerit. */
export function FeedStoriesRail({ stories }: Props) {
  if (!stories.length) return null;

  return (
    <section className="mb-8" aria-labelledby="akis-story-rail-heading">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 id="akis-story-rail-heading" className="text-base font-bold text-[#111827] sm:text-lg">
          Güncel paylaşımlar
        </h2>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">Firma akışı</span>
      </div>
      <HomepageHorizontalScroller gapClass="gap-3" snap className="w-full">
        {stories.map((s) => (
          <article
            key={s.id}
            className="snap-start max-w-[85vw] shrink-0 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] sm:max-w-[280px]"
          >
            <Link href={s.target_url} className="flex min-h-[112px] gap-3 p-3">
              <div className="relative h-24 w-23 shrink-0 overflow-hidden rounded-xl bg-[#eef2f7]">
                {s.image_url ? (
                  <img
                    src={s.image_url}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 m-auto block h-auto max-h-full max-w-full object-contain object-center"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-2 text-center text-[10px] font-medium text-[#9ca3af]">
                    Görsel yok
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="line-clamp-1 text-[12px] font-semibold text-[#0B3C5D]">{s.company_name}</p>
                <p className="mt-1 line-clamp-3 text-[13px] leading-snug text-[#374151]">{s.excerpt}</p>
                <FeedCardRelativeTime iso={s.created_at} className="mt-2 inline-block text-[11px] text-[#9ca3af]" />
              </div>
            </Link>
          </article>
        ))}
      </HomepageHorizontalScroller>
    </section>
  );
}
