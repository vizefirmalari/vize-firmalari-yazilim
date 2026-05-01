import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  post: FeedHubBlogPost;
};

/** Tek mobil manşet — düşük yükseklik, tam genişlik, object-contain */
export function MobileLeadStory({ post }: Props) {
  const tag = post.category_name?.trim() ?? "Manşet";

  return (
    <article className="mb-2 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
      <Link href={post.target_url} className="block">
        <div className="flex max-h-[220px] items-center justify-center bg-[#eef3f7] px-4 py-3">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable={false}
              className="max-h-[210px] w-full max-w-full object-contain object-center"
            />
          ) : (
            <div className="flex min-h-[100px] w-full items-center justify-center text-xs font-medium text-[#9ca3af]">
              Kapak yok
            </div>
          )}
        </div>
        <div className="space-y-2 px-4 pb-4 pt-3">
          <div className="flex flex-wrap items-center gap-x-2 text-[12px] font-medium text-[#6b7280]">
            <span>{tag}</span>
            <span className="text-[#d1d5db]">·</span>
            <FeedCardRelativeTime iso={post.created_at} />
          </div>
          <h2 className="line-clamp-2 text-[21px] font-bold leading-tight tracking-tight text-[#111827]">
            {post.title}
          </h2>
          {post.description?.trim() ? (
            <p className="line-clamp-2 text-[13px] leading-snug text-[#4b5563]">{post.description.trim()}</p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
