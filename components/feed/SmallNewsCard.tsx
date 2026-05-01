import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  post: FeedHubBlogPost;
  /** Manşet yanı 2×2 — daha güçlü görsel alanı */
  variant?: "featured" | "default";
};

/** Haber portalı küçük kutu — kırpmasız görsel */
export function SmallNewsCard({ post, variant = "default" }: Props) {
  const tag = post.category_name?.trim() || "Akış";
  const isFeatured = variant === "featured";

  return (
    <article
      className={`group flex min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] ${
        isFeatured ? "border border-[#e5e7eb] hover:border-[#d1d5db]" : "ring-1 ring-[#e5e7eb]"
      }`}
    >
      <Link
        href={post.target_url}
        className={`block shrink-0 bg-[#eef3f7] ${isFeatured ? "h-[132px] min-[460px]:h-[138px] lg:h-[146px]" : "min-h-[100px]"}`}
      >
        {post.image_url ? (
          <span className="flex size-full items-center justify-center px-3 py-2.5 lg:py-3">
            <img
              src={post.image_url}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className={`mx-auto w-full max-w-full object-contain object-center ${isFeatured ? "max-h-[118px] min-[460px]:max-h-[124px] lg:max-h-[132px]" : "max-h-24 sm:max-h-28"}`}
            />
          </span>
        ) : (
          <div className="flex size-full items-center justify-center px-2 text-[10px] font-medium text-[#9ca3af]">
            Kapak yok
          </div>
        )}
      </Link>
      <div className={`flex min-h-0 flex-1 flex-col ${isFeatured ? "gap-2 px-3.5 pb-3.5 pt-3 lg:gap-2.5 lg:px-4 lg:pb-4 lg:pt-3.5" : "gap-1.5 px-3 py-3"}`}>
        <div className="flex flex-wrap items-center gap-x-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
          <span className="line-clamp-1">{tag}</span>
          <span className="text-[#d1d5db]">·</span>
          <FeedCardRelativeTime iso={post.created_at} className="shrink-0 text-[10px]" />
        </div>
        <h3 className={`line-clamp-2 font-bold leading-snug text-[#111827] ${isFeatured ? "text-[14px] sm:text-[15px]" : "text-sm"}`}>
          <Link href={post.target_url} className="transition group-hover:text-[#0B3C5D] hover:underline">
            {post.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
