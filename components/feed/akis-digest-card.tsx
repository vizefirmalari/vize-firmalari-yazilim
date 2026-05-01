import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  post: FeedHubBlogPost;
};

/** /akis haber özeti kartı — sade, kırpmasız görsel (object-contain). */
export function AkisDigestCard({ post }: Props) {
  const tag = post.category_name?.trim() || "Akış";

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-[#fafafa] ring-1 ring-[#e5e7eb]/80 transition hover:bg-white hover:ring-[#d1d5db]">
      <Link href={post.target_url} className="block bg-[#eef2f7]/80 px-4 pt-6 pb-0">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt=""
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto w-full max-h-44 max-w-full object-contain object-center md:max-h-48"
            draggable={false}
          />
        ) : (
          <div className="flex min-h-[120px] items-center justify-center px-4 py-10 text-center text-xs font-medium text-[#9ca3af]">
            Kapak yok
          </div>
        )}
      </Link>
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-5 pb-6 pt-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
          <span>{tag}</span>
          <span className="text-[#d1d5db]">·</span>
          <FeedCardRelativeTime iso={post.created_at} />
        </div>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-[#111827] sm:text-[17px] sm:leading-snug">
          <Link href={post.target_url} className="hover:text-[#0B3C5D] hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.description ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-[#4b5563]">{post.description}</p>
        ) : null}
      </div>
    </article>
  );
}
