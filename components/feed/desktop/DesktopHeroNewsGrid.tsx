import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";
import { DesktopSidebarHeadlineList } from "@/components/feed/desktop/DesktopHeroSidebarBlocks";
import { DesktopFourAcross } from "@/components/feed/desktop/DesktopFourAcross";
import { DesktopHeadlineSlider } from "@/components/feed/desktop/DesktopHeadlineSlider";

type Props = {
  sliderPosts: FeedHubBlogPost[];
  sidebarMedium: FeedHubBlogPost[];
  /** Güncel Rehberler — hero aside’da en fazla 3 */
  sidebarHeadlines: FeedHubBlogPost[];
  belowHeroPosts: FeedHubBlogPost[];
};

function MediumTeaser({ post }: { post: FeedHubBlogPost }) {
  const tag = post.category_name?.trim();
  return (
    <article className="border border-[#cdd4db] bg-white">
      <Link href={post.target_url} prefetch={false} className="block">
        <div className="flex h-auto items-center justify-center bg-[#eef3f7] px-3 py-3">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="max-h-[132px] w-full max-w-full object-contain object-center"
            />
          ) : (
            <span className="py-6 text-[11px] font-medium text-[#9ca3af]">Kapak yok</span>
          )}
        </div>
        <div className="border-t border-[#e5e7eb] px-3 py-2.5">
          {tag ? <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0B3C5D]">{tag}</p> : null}
          <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] font-medium text-[#6b7280]">
            <FeedCardRelativeTime iso={post.created_at} />
          </div>
          <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-[#111827]">{post.title}</h3>
        </div>
      </Link>
    </article>
  );
}

/**
 * Ana manşet: sol slider + dörtlü; sağda yalnızca kısa sidebar (2 öne çıkan + en fazla 3 başlık).
 * Uzun listeler hero dışına taşınır — sol tarafta gereksiz boşluk oluşmaz.
 */
export function DesktopHeroNewsGrid({ sliderPosts, sidebarMedium, sidebarHeadlines, belowHeroPosts }: Props) {
  const media = sidebarMedium.slice(0, 2);
  const headlines = sidebarHeadlines.slice(0, 3);

  return (
    <section aria-label="Ana manşet" className="border-b border-[#e5e7eb] pb-5">
      <div className="grid grid-cols-1 items-start gap-5 self-start lg:grid-cols-[minmax(0,2fr)_360px]">
        <main className="min-w-0 space-y-5 self-start">
          <DesktopHeadlineSlider posts={sliderPosts} />
          <DesktopFourAcross posts={belowHeroPosts} />
        </main>

        <aside className="min-w-0 space-y-4 self-start" aria-label="Öne çıkanlar ve güncel başlıklar">
          {media.length > 0 ? (
            <section>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b7280]">Öne çıkanlar</p>
              <div className="flex flex-col gap-3">
                {media.map((p) => (
                  <MediumTeaser key={p.id} post={p} />
                ))}
              </div>
            </section>
          ) : null}

          <DesktopSidebarHeadlineList title="Güncel Rehberler" items={headlines} />
        </aside>
      </div>
    </section>
  );
}
