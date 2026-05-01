import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Variant = "large" | "compact";

type Props = {
  post: FeedHubBlogPost;
  variant: Variant;
};

/**
 * Mobil `/akis` karışık akış: büyük kart veya yatay kompakt kart; açıklama yok.
 */
export function MobileMixedFeedItem({ post, variant }: Props) {
  const tag = post.category_name?.trim() ?? "Akış";

  if (variant === "compact") {
    return (
      <article className="flex gap-3 border-b border-[#eaeaea] py-3 first:pt-0">
        <div className="relative flex h-[80px] w-[128px] shrink-0 items-center justify-center overflow-hidden rounded bg-[#eef3f7] ring-1 ring-[#e5e7eb]/80">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="max-h-full max-w-full object-contain object-center"
            />
          ) : (
            <span className="px-2 text-center text-[9px] font-medium text-[#9ca3af]">Kapak yok</span>
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-center gap-x-1.5 text-[11px] font-medium text-[#6b7280]">
            <span className="line-clamp-1">{tag}</span>
            <span className="text-[#d1d5db]">·</span>
            <FeedCardRelativeTime iso={post.created_at} className="shrink-0 text-[11px]" />
          </div>
          <h3 className="mt-1 line-clamp-3 text-[16px] font-bold leading-snug text-[#111827]">
            <Link href={post.target_url} prefetch={false} className="hover:text-[#0B3C5D] hover:underline">
              {post.title}
            </Link>
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article className="mb-5 overflow-hidden rounded-[15px] border border-[#e5e7eb] bg-white">
      <Link href={post.target_url} prefetch={false} className="block">
        <div className="flex max-h-[220px] items-center justify-center bg-[#eef3f7] px-3 py-2">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="max-h-[210px] w-full max-w-full object-contain object-center"
            />
          ) : (
            <div className="flex min-h-[100px] w-full items-center justify-center text-[12px] font-medium text-[#9ca3af]">
              Kapak yok
            </div>
          )}
        </div>
        <div className="space-y-1.5 px-3 pb-3.5 pt-2.5">
          <div className="flex flex-wrap items-center gap-x-2 text-[12px] font-medium text-[#6b7280]">
            <span className="line-clamp-1">{tag}</span>
            <span className="text-[#d1d5db]">·</span>
            <FeedCardRelativeTime iso={post.created_at} />
          </div>
          <h3 className="text-[20px] font-bold leading-snug text-[#111827]">{post.title}</h3>
        </div>
      </Link>
    </article>
  );
}
