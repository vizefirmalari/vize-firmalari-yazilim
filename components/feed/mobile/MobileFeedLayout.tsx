import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import type { AkisNewsHomeFilledSection } from "@/lib/feed/akis-news-home-data";
import { MobileLeadStory } from "@/components/feed/mobile/MobileLeadStory";
import { MobileNewsListItem } from "@/components/feed/mobile/MobileNewsListItem";

type Props = {
  lead: FeedHubBlogPost;
  featured: FeedHubBlogPost[];
  latest: FeedHubBlogPost[];
  sections: AkisNewsHomeFilledSection[];
};

function uniqById(posts: FeedHubBlogPost[]): FeedHubBlogPost[] {
  const seen = new Set<string>();
  return posts.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

/** Mobil `/akis`: manşet + kompakt listeler (_md_ altı) */
export function MobileFeedLayout({ lead, featured, latest, sections }: Props) {
  const cleanedFeatured = uniqById(featured).slice(0, 6);
  const excluded = new Set([lead.id, ...cleanedFeatured.map((p) => p.id)]);
  const cleanedLatest = uniqById(latest).filter((p) => !excluded.has(p.id)).slice(0, 12);

  return (
    <div className="flex flex-col">
      <MobileLeadStory post={lead} />

      {cleanedFeatured.length > 0 ? (
        <section className="mt-6" aria-labelledby="m-featured-heading">
          <h2 id="m-featured-heading" className="mb-3 text-[15px] font-bold text-[#111827]">
            Öne Çıkanlar
          </h2>
          <div>
            {cleanedFeatured.map((p) => (
              <MobileNewsListItem key={p.id} post={p} descriptionLine={false} />
            ))}
          </div>
        </section>
      ) : null}

      {cleanedLatest.length > 0 ? (
        <section className="mt-6" aria-labelledby="m-latest-heading">
          <h2 id="m-latest-heading" className="mb-3 text-[15px] font-bold text-[#111827]">
            Son Eklenenler
          </h2>
          <div>
            {cleanedLatest.map((p) => (
              <MobileNewsListItem key={p.id} post={p} descriptionLine />
            ))}
          </div>
        </section>
      ) : null}

      {sections.map((filled) => {
        const sliced = filled.posts.slice(0, 3);
        if (sliced.length === 0) return null;
        return (
          <section key={filled.config.viewAllSlug} className="mt-6" aria-labelledby={`m-sec-${filled.config.viewAllSlug}`}>
            <div className="mb-3 flex items-baseline justify-between gap-2 border-b border-[#e5e7eb] pb-2">
              <h2 id={`m-sec-${filled.config.viewAllSlug}`} className="text-[15px] font-bold text-[#111827]">
                {filled.config.displayTitle}
              </h2>
              <Link href={`/akis/${filled.config.viewAllSlug}`} prefetch={false} className="text-[13px] font-semibold text-[#0B3C5D]">
                Tümünü gör
              </Link>
            </div>
            <div>
              {sliced.map((p) => (
                <MobileNewsListItem key={p.id} post={p} descriptionLine={false} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-8 border-t border-[#e5e7eb] pt-6 pb-4">
        <h2 className="mb-2 text-[15px] font-bold text-[#111827]">Daha fazla</h2>
        <Link href="/arama" prefetch={false} className="text-[14px] font-semibold text-[#0B3C5D] underline-offset-4 hover:underline">
          Site genelinde ara ve keşfet →
        </Link>
      </div>
    </div>
  );
}
