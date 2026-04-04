"use client";

import Image from "next/image";
import { useState } from "react";

export function FeedCardImageCarousel({
  urls,
  alt,
  targetUrl,
}: {
  urls: string[];
  alt: string;
  targetUrl: string;
}) {
  const [idx, setIdx] = useState(0);
  if (urls.length === 0) {
    return (
      <a href={targetUrl} className="flex aspect-1200/640 w-full items-center justify-center bg-[#f9fafb]" />
    );
  }
  const safeIdx = Math.min(idx, urls.length - 1);
  const url = urls[safeIdx]!;

  return (
    <div className="relative aspect-1200/640 w-full bg-[#f9fafb]">
      <a href={targetUrl} className="relative block h-full w-full">
        <Image
          src={url}
          alt={alt}
          width={1200}
          height={640}
          className="max-h-full max-w-full object-contain"
          sizes="(max-width: 768px) 100vw, 720px"
          loading="lazy"
        />
      </a>
      {urls.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1">
            {urls.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i === safeIdx ? "bg-[#0B3C5D]" : "bg-white/70"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Önceki görsel"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIdx((i) => (i - 1 + urls.length) % urls.length);
            }}
            className="absolute left-2 top-1/2 z-[1] -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-[#0B3C5D] shadow-md"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Sonraki görsel"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIdx((i) => (i + 1) % urls.length);
            }}
            className="absolute right-2 top-1/2 z-[1] -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-[#0B3C5D] shadow-md"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}
