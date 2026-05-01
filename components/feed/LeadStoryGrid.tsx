import type { FeedHubBlogPost } from "@/lib/data/feed";
import { LeadStorySlider } from "@/components/feed/LeadStorySlider";
import { SmallNewsCard } from "@/components/feed/SmallNewsCard";

type Props = {
  sliderPosts: FeedHubBlogPost[];
  sideFour: FeedHubBlogPost[];
};

/** Sol manşet slayt + sağ 2×2 öne çıkanlar — sıkı grid oranları */
export function LeadStoryGrid({ sliderPosts, sideFour }: Props) {
  if (sliderPosts.length === 0 && sideFour.length === 0) return null;

  return (
    <section aria-label="Öne çıkan yazılar ve manşet" className="mb-7 lg:mb-9">
      <div className="grid grid-cols-1 gap-6 items-start lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)] lg:items-stretch lg:gap-7">
        <div className="min-h-0 min-w-0 lg:flex lg:flex-col">
          <LeadStorySlider posts={sliderPosts} />
        </div>

        <div className="flex min-h-0 min-w-0 flex-col lg:h-full lg:justify-between lg:gap-5">
          <div className="mb-4 border-l-[3px] border-[#0B3C5D]/75 pl-3 lg:mb-0">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#111827]">Öne çıkanlar</p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 min-[460px]:grid-cols-2 lg:gap-4">
            {sideFour.map((post) => (
              <SmallNewsCard key={post.id} post={post} variant="featured" />
            ))}
          </div>
          {sideFour.length === 0 ? (
            <p className="rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-4 py-8 text-center text-sm text-[#6b7280]">
              Yakında daha fazla haber burada görünecek.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
