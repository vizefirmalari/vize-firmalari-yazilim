"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import type { BlogAdRow } from "@/lib/blog/ads";

export function BlogAdSlot({
  ad,
  postId,
  slot,
}: {
  ad: BlogAdRow | null;
  postId: string;
  slot: "top" | "middle" | "bottom";
}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const clickHref = useMemo(() => {
    if (!ad) return "#";
    const params = new URLSearchParams({
      adId: ad.id,
      postId,
      slot,
      target: ad.target_url,
    });
    return `/api/blog/ads/click?${params.toString()}`;
  }, [ad, postId, slot]);

  useEffect(() => {
    if (!ad || !rootRef.current) return;
    const node = rootRef.current;
    let sent = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting || sent) return;
        sent = true;
        fetch("/api/blog/ads/impression", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ adId: ad.id, postId, slot }),
          keepalive: true,
        }).catch(() => {});
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ad, postId, slot]);

  if (!ad) return null;
  return (
    <aside ref={rootRef} className="overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
      <a
        href={clickHref}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="block"
      >
        {ad.ad_type === "native" ? (
          <div className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0B3C5D]/60">Sponsorlu</p>
            <div className="mt-2 flex items-start gap-3">
              {ad.sponsor_logo_url ? (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#F4F6F8]">
                  <Image src={ad.sponsor_logo_url} alt={ad.sponsor_name || ad.advertiser_name} fill sizes="40px" className="object-contain" loading="lazy" />
                </div>
              ) : null}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0B3C5D]">{ad.native_title || ad.title}</p>
                <p className="mt-1 text-xs text-[#1A1A1A]/70">{ad.native_description || ad.sponsor_name || ad.advertiser_name}</p>
                <p className="mt-2 text-xs font-semibold text-[#0B3C5D]">{ad.cta_text || "Detayları incele"}</p>
              </div>
            </div>
            {ad.native_image_url ? (
              <div className="relative mt-3 aspect-1200/300 w-full overflow-hidden rounded-xl bg-[#F4F6F8]">
                <Image src={ad.native_image_url} alt={ad.native_title || ad.title} fill sizes="(max-width: 1024px) 100vw, 960px" className="object-cover" loading="lazy" />
              </div>
            ) : null}
          </div>
        ) : ad.image_url ? (
          <div className="relative aspect-1200/300 w-full bg-[#F4F6F8]">
            <Image
              src={ad.image_url}
              alt={ad.title}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        ) : null}
      </a>
    </aside>
  );
}

