"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

const PAGE_SIZE = 9;

type Props = {
  posts: FeedHubBlogPost[];
};

/** Alt bölüm üç sütun gazete grid’i — arama CTA yok */
export function DesktopMoreGrid({ posts }: Props) {
  const [visibleCount, setVisibleCount] = useState(9);

  const showMore = useCallback(() => {
    setVisibleCount((n) => Math.min(n + PAGE_SIZE, posts.length));
  }, [posts.length]);

  if (posts.length === 0) return null;

  const shown = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section className="mt-10 border-t-2 border-[#e5e7eb] pt-8" aria-labelledby="desk-akis-more-heading">
      <div className="mb-4">
        <h2 id="desk-akis-more-heading" className="text-xl font-bold tracking-tight text-[#111827] md:text-[1.35rem]">
          Daha Fazla Rehber ve Haber
        </h2>
      </div>

      <ul className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((post) => {
          const tag = post.category_name?.trim() ?? "Akış";
          return (
            <li key={post.id} className="min-w-0 self-start">
              <article className="h-auto border border-[#cdd4db] bg-white">
                <Link href={post.target_url} prefetch={false} className="group flex flex-col">
                  <span className="flex items-center justify-center bg-[#eef3f7] px-3 py-3">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="max-h-[176px] w-full max-w-full object-contain object-center"
                      />
                    ) : (
                      <span className="py-10 text-[11px] font-medium text-[#9ca3af]">Kapak yok</span>
                    )}
                  </span>
                  <span className="flex flex-col gap-2 px-3 py-3">
                    <span className="flex flex-wrap items-center gap-x-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6b7280]">
                      <span>{tag}</span>
                      <span className="text-[#d1d5db]">·</span>
                      <FeedCardRelativeTime iso={post.created_at} className="normal-case" />
                    </span>
                    <h3 className="text-[16px] font-bold leading-snug text-[#111827] group-hover:text-[#0B3C5D] group-hover:underline md:text-[17px]">
                      {post.title}
                    </h3>
                    {post.description?.trim() ? (
                      <p className="text-[13px] leading-relaxed text-[#4b5563]">{post.description.trim()}</p>
                    ) : null}
                  </span>
                </Link>
              </article>
            </li>
          );
        })}
      </ul>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={showMore}
            className="rounded-sm border border-[#cdd4db] bg-white px-6 py-2.5 text-[14px] font-semibold text-[#111827] hover:border-[#0B3C5D]/35 hover:bg-[#fafafa]"
          >
            Daha fazla göster
          </button>
        </div>
      ) : null}
    </section>
  );
}
