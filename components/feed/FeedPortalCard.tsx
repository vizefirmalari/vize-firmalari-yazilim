import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  post: FeedHubBlogPost;
  categoryLabel?: string | null;
};

/**
 * İçerik merkeği grid kartı (`/akis`). Mevcut `FeedCard.tsx` liste akışı için ayrı tutulmuştur.
 */
export function FeedPortalCard({ post, categoryLabel }: Props) {
  const label = categoryLabel ?? post.category_name ?? "Rehber";

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      <Link href={post.target_url} className="block bg-[#eef2f7]">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt=""
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto w-full max-h-48 max-w-full object-contain object-center md:max-h-52"
            draggable={false}
          />
        ) : (
          <div className="flex min-h-[140px] items-center justify-center px-4 py-8 text-center text-xs font-medium text-[#1A1A1A]/45">
            Kapak yok
          </div>
        )}
      </Link>
      <div className="flex min-h-0 flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-[#6b7280]">
          <span className="line-clamp-1 rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-2 py-0.5 text-[11px] text-[#374151]">
            {label}
          </span>
          <FeedCardRelativeTime iso={post.created_at} />
        </div>
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-[#111827]">
          <Link href={post.target_url} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.description ? (
          <p className="line-clamp-3 flex-1 text-[13px] leading-relaxed text-[#4b5563]">{post.description}</p>
        ) : null}
      </div>
    </article>
  );
}
