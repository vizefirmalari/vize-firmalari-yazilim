"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type RelatedItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImageUrl: string | null;
  publishedAt: string | null;
};

type Props = {
  firmSlug: string;
  currentId: string;
  categoryId: string | null;
  tags: string[];
  countries: string[];
  initialItems: RelatedItem[];
};

export function RelatedPostsInfinite({
  firmSlug,
  currentId,
  categoryId,
  tags,
  countries,
  initialItems,
}: Props) {
  const [items, setItems] = useState<RelatedItem[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialItems.length >= 6);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set("currentId", currentId);
    if (categoryId) params.set("categoryId", categoryId);
    if (tags.length) params.set("tags", tags.join(","));
    if (countries.length) params.set("countries", countries.join(","));
    return params;
  }, [currentId, categoryId, tags, countries]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || loading || !hasMore) return;
        setLoading(true);
        const params = new URLSearchParams(query);
        params.set("offset", String(items.length));
        fetch(`/api/blog/related?${params.toString()}`)
          .then((r) => r.json())
          .then((payload: { items: RelatedItem[]; hasMore: boolean }) => {
            setItems((prev) => [...prev, ...(payload.items ?? [])]);
            setHasMore(Boolean(payload.hasMore));
          })
          .finally(() => setLoading(false));
      },
      { rootMargin: "320px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [query, items.length, loading, hasMore]);

  if (items.length === 0) return null;

  return (
    <section className="min-w-0 max-w-full overflow-x-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm max-md:p-4 max-md:shadow-sm">
      <h2 className="text-lg font-semibold text-[#0B3C5D] max-md:text-base">Benzer İçerikler</h2>
      <div className="mt-3 max-md:mt-2.5 grid min-w-0 max-w-full gap-2.5 sm:mt-4 sm:gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/firma/${firmSlug}/blog/${item.slug}`}
            className="min-w-0 max-w-full overflow-hidden rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC] transition hover:bg-[#F1F5F9] max-md:rounded-[0.7rem] wrap-anywhere"
          >
            {item.coverImageUrl ? (
              <div className="relative aspect-1200/630 w-full max-w-full min-h-0 min-w-0 overflow-hidden bg-[#F1F5F9]">
                <Image src={item.coverImageUrl} alt={item.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 320px" />
              </div>
            ) : null}
            <div className="min-w-0 max-w-full space-y-0.5 p-2.5 sm:space-y-1 sm:p-3 wrap-break-word">
              <p className="line-clamp-2 text-sm font-semibold text-[#0B3C5D] max-md:text-[13px] max-md:leading-snug">{item.title}</p>
              <p className="line-clamp-2 text-xs text-[#1A1A1A]/65 max-md:text-[11px] max-md:leading-normal">{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      <div ref={sentinelRef} className="h-2" />
      {loading ? <p className="mt-2 text-xs text-[#1A1A1A]/55 max-md:mt-1.5">Yükleniyor...</p> : null}
    </section>
  );
}

