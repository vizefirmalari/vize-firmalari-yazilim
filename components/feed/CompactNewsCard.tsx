import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  post: FeedHubBlogPost;
};

/** Yatay mini haber kartı — kapak object-contain, kırpma yok */
export function CompactNewsCard({ post }: Props) {
  const tag = post.category_name?.trim() ?? "Akış";

  return (
    <article className="group flex min-w-0 flex-row items-start gap-3 rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition hover:border-[#d1d5db] hover:shadow-[0_4px_14px_rgba(0,0,0,0.07)] max-[359px]:flex-col max-[359px]:items-stretch sm:gap-3.5 sm:p-3.5 md:p-4">
      <Link
        href={post.target_url}
        className="relative shrink-0 overflow-hidden rounded-[10px] bg-[#f3f4f6] ring-1 ring-[#e5e7eb]/80 h-[84px] w-[120px] max-[359px]:mx-auto max-[359px]:h-[92px] max-[359px]:w-full max-[359px]:max-w-[260px] sm:h-[88px] sm:w-[136px] md:h-[90px] md:w-[140px]"
      >
        {post.image_url ? (
          <span className="relative flex size-full items-center justify-center box-border px-2 py-2">
            <img
              src={post.image_url}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="mx-auto block max-h-full max-w-full object-contain object-center"
            />
          </span>
        ) : (
          <span className="flex h-full items-center justify-center px-2 text-center text-[10px] font-medium leading-tight text-[#9ca3af]">
            Kapak yok
          </span>
        )}
      </Link>

      <div className="min-w-0 flex-1 py-0.5 text-left max-[359px]:self-stretch">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
          <span className="line-clamp-1">{tag}</span>
          <span className="text-[#d1d5db]">·</span>
          <FeedCardRelativeTime iso={post.created_at} className="shrink-0" />
        </div>
        <h3 className="mt-2 line-clamp-2 text-[15px] font-bold leading-snug text-[#111827] sm:text-base">
          <Link href={post.target_url} className="transition group-hover:text-[#0B3C5D] hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.description?.trim() ? (
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-[#4b5563] sm:text-[14px]">{post.description.trim()}</p>
        ) : null}
      </div>
    </article>
  );
}
