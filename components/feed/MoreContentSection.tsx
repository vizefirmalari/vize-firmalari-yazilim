"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { CompactNewsCard } from "@/components/feed/CompactNewsCard";

const PAGE_SIZE = 12;

type Props = {
  posts: FeedHubBlogPost[];
  /** “Tüm akışı görüntüle” hedefi (geniş içerik araması / keşif) */
  seeAllHref?: string;
};

export function MoreContentSection({ posts, seeAllHref = "/arama" }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const showMore = useCallback(() => {
    setVisibleCount((n) => Math.min(n + PAGE_SIZE, posts.length));
  }, [posts.length]);

  if (posts.length === 0) return null;

  const shown = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section className="mt-12 border-t border-[#e5e7eb] pt-10 sm:mt-14 sm:pt-12" aria-labelledby="akis-more-rehber-heading">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <h2 id="akis-more-rehber-heading" className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl md:text-[1.35rem]">
            Daha Fazla Rehber ve Haber
          </h2>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#4b5563] sm:text-sm md:text-[15px]">
            Vize, yurtdışı eğitim, çalışma ve göç süreçlerine dair güncel içerikler.
          </p>
        </div>
        <Link
          href={seeAllHref}
          prefetch={false}
          className="shrink-0 self-start rounded-md border border-[#e5e7eb] bg-[#fafafa] px-3 py-2 text-[13px] font-semibold text-[#0B3C5D] hover:border-[#0B3C5D]/35 hover:bg-white sm:self-auto"
        >
          Tüm akışı görüntüle
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-x-8 lg:gap-y-6">
        {shown.map((post) => (
          <li key={post.id} className="min-w-0">
            <CompactNewsCard post={post} />
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            onClick={showMore}
            className="rounded-full border border-[#e5e7eb] bg-white px-5 py-2.5 text-sm font-semibold text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:border-[#0B3C5D]/30 hover:bg-[#fafafa] hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)]"
          >
            Daha fazla göster
          </button>
        </div>
      ) : null}
    </section>
  );
}
