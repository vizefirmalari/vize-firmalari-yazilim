"use client";

import { useMemo, useState } from "react";

type Props = {
  tags: string[];
};

export function BlogTagsSection({ tags }: Props) {
  const [expanded, setExpanded] = useState(false);
  const mobileVisibleCount = 5;

  const { visibleTags, hiddenCount } = useMemo(() => {
    if (expanded) return { visibleTags: tags, hiddenCount: 0 };
    return {
      visibleTags: tags.slice(0, mobileVisibleCount),
      hiddenCount: Math.max(0, tags.length - mobileVisibleCount),
    };
  }, [expanded, tags]);

  return (
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#0B3C5D]/65 sm:text-sm sm:text-[#0B3C5D]/70">
        Etiketler
      </h2>

      <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-0.5 rounded-md border border-[#0B3C5D]/10 bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-medium text-[#0B3C5D]/90 sm:rounded-full sm:px-3 sm:py-1 sm:text-xs sm:text-[#0B3C5D]"
          >
            <span className="text-[#0B3C5D]/45">#</span>
            <span>{tag}</span>
          </span>
        ))}

        {hiddenCount > 0 ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center rounded-md border border-[#0B3C5D]/14 bg-white px-2 py-0.5 text-[11px] font-semibold text-[#0B3C5D] sm:hidden"
          >
            +{hiddenCount} etiket
          </button>
        ) : null}
      </div>

      {expanded && tags.length > mobileVisibleCount ? (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="mt-2 inline-flex rounded-md px-1 text-[11px] font-semibold text-[#0B3C5D]/80 sm:hidden"
        >
          Daha az göster
        </button>
      ) : null}
    </section>
  );
}

