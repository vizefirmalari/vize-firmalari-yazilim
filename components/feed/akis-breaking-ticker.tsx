"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  items: FeedHubBlogPost[];
  intervalMs?: number;
  className?: string;
};

/** Tek görünür başlık; otomatik döngü — kırpma yok (doğal sarma, çoğu ekranda ~2 satır) */
export function AkisBreakingTicker({ items, intervalMs = 4000, className = "" }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  useEffect(() => {
    if (items.length <= 1 || reduceMotion) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [items.length, intervalMs, reduceMotion]);

  if (items.length === 0) return null;

  const current = items[Math.min(activeIndex, items.length - 1)]!;
  const tag = current.category_name?.trim();

  return (
    <div className={`flex min-h-[48px] items-stretch border-b border-[#cdd4db] bg-[#f1f5f9] ${className}`.trim()}>
      <div className="flex w-[94px] shrink-0 flex-col justify-center border-r border-[#cbd5e1] bg-[#0B3C5D]/9 px-3 py-2 md:w-[104px] md:px-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B3C5D] md:text-xs">GÜNCEL</span>
      </div>

      <Link
        href={current.target_url}
        prefetch={false}
        aria-live="polite"
        aria-atomic="true"
        key={current.id}
        className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-3 py-2.5 text-left md:gap-1 md:px-4 md:py-3"
      >
        <div className="flex flex-wrap items-center gap-x-2 text-[11px] font-medium text-[#64748b]">
          {tag ? <span>{tag}</span> : null}
          {tag ? <span className="text-[#cbd5e1]">·</span> : null}
          <FeedCardRelativeTime iso={current.created_at} className="text-[11px]" />
        </div>
        <span className="hyphens-none text-sm font-semibold leading-snug text-[#111827] md:text-[15px]" lang="tr">
          {current.title}
        </span>
      </Link>
    </div>
  );
}
