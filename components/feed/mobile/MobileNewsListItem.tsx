import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  post: FeedHubBlogPost;
  /** 112×72 kutuda object-contain (kırpma yok) */
  imageClassName?: string;
  /** Liste altı border */
  bordered?: boolean;
  /** Varsa tek satır açıklama */
  descriptionLine?: boolean;
  /** Kart gölgesi / yuvarlak — mobil listelerde kapalı */
  padded?: boolean;
};

export function MobileNewsListItem({
  post,
  imageClassName = "h-[72px] w-[112px] shrink-0",
  bordered = true,
  descriptionLine = false,
  padded = false,
}: Props) {
  const tag = post.category_name?.trim() ?? "Akış";

  const inner = (
    <>
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded bg-[#eef3f7] ring-1 ring-[#e5e7eb]/80 ${imageClassName}`}
      >
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
      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex flex-wrap items-center gap-x-1.5 text-[11px] font-medium text-[#6b7280]">
          <span className="line-clamp-1">{tag}</span>
          <span className="text-[#d1d5db]">·</span>
          <FeedCardRelativeTime iso={post.created_at} className="shrink-0 text-[11px]" />
        </div>
        <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-snug text-[#111827]">
          <Link href={post.target_url} className="hover:text-[#0B3C5D] hover:underline">
            {post.title}
          </Link>
        </h3>
        {descriptionLine && post.description?.trim() ? (
          <p className="mt-1 line-clamp-1 text-[13px] leading-snug text-[#4b5563]">{post.description.trim()}</p>
        ) : null}
      </div>
    </>
  );

  return (
    <article
      className={`flex gap-3 ${bordered ? "border-b border-[#eaeaea] pb-3 pt-3 first:pt-0" : ""} ${padded ? "rounded-lg px-2" : ""}`.trim()}
    >
      {inner}
    </article>
  );
}
