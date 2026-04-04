"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { BlogCtaButtonsRenderer } from "@/components/blog/blog-cta-buttons-renderer";
import type { BlogCtaButton } from "@/lib/blog/cta-buttons";

function renderRichLine(line: string, keyPrefix: string) {
  const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-[#111827]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2 && !part.startsWith("**")) {
      return (
        <em key={`${keyPrefix}-${i}`} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{part}</span>;
  });
}

export function FeedCardFeedPostBody({
  text,
  targetUrl,
  ctaButtons,
  tags,
}: {
  text: string;
  targetUrl: string;
  ctaButtons: BlogCtaButton[];
  tags: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const lines = useMemo(() => text.replace(/\r\n/g, "\n").split("\n"), [text]);
  const needsMore = lines.length > 3 || text.length > 280;
  const showExpand = needsMore && !expanded;

  return (
    <div className="px-4 pb-2 pt-4 sm:px-5">
      <div
        className={`whitespace-pre-wrap break-words text-[14px] leading-relaxed text-[#374151] ${
          showExpand ? "line-clamp-3" : ""
        }`}
      >
        {lines.map((line, li) => (
          <span key={li}>
            {li > 0 ? <br /> : null}
            {line.length > 0 ? renderRichLine(line, `l${li}`) : ""}
          </span>
        ))}
      </div>
      {needsMore ? (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-1 text-[13px] font-semibold text-[#0B3C5D] hover:underline"
        >
          {expanded ? "Daha az göster" : "Devamını oku"}
        </button>
      ) : null}

      {ctaButtons.length > 0 ? <BlogCtaButtonsRenderer buttons={ctaButtons} /> : null}

      {tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#0B3C5D]/12 bg-[#F2F5F8] px-2 py-0.5 text-[11px] font-medium text-[#0B3C5D]/85"
            >
              #{t}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-3">
        <Link href={targetUrl} className="text-[13px] font-semibold text-[#0B3C5D] hover:underline">
          Firma profilini aç →
        </Link>
      </div>
    </div>
  );
}
