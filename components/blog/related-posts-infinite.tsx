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
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0B3C5D]">Benzer İçerikler</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/firma/${firmSlug}/blog/${item.slug}`}
            className="overflow-hidden rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC] transition hover:bg-[#F1F5F9]"
          >
            {item.coverImageUrl ? (
              <div className="relative h-32 w-full">
                <Image src={item.coverImageUrl} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
              </div>
            ) : null}
            <div className="space-y-1 p-3">
              <p className="line-clamp-2 text-sm font-semibold text-[#0B3C5D]">{item.title}</p>
              <p className="line-clamp-2 text-xs text-[#1A1A1A]/65">{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      <div ref={sentinelRef} className="h-2" />
      {loading ? <p className="mt-2 text-xs text-[#1A1A1A]/55">Yükleniyor...</p> : null}
    </section>
  );
}

