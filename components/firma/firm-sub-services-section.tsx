"use client";

import { useId, useState } from "react";

/** Liste uzunsa özet görünüm + genişlet; tüm kalemler her zaman DOM’da (SEO). */
const COLLAPSE_THRESHOLD = 17;

type FirmSubServicesSectionProps = {
  items: string[];
};

export function FirmSubServicesSection({ items }: FirmSubServicesSectionProps) {
  const reactId = useId();
  const regionId = `${reactId}-sub-services-chips`;
  const [expanded, setExpanded] = useState(false);

  const needsToggle = items.length >= COLLAPSE_THRESHOLD;

  return (
    <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0B3C5D]">Alt hizmetler</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-[#1A1A1A]/60">
        Süreç ve destek kapsamındaki tüm kalemler aşağıda listelenir.
      </p>

      <div className="relative mt-4">
        <div
          id={regionId}
          className={
            needsToggle && !expanded
              ? "max-h-[9.5rem] overflow-hidden sm:max-h-[13rem]"
              : undefined
          }
        >
          <div className="flex flex-wrap gap-2" role="list" aria-label="Alt hizmet kalemleri">
            {items.map((label) => (
              <span
                key={label}
                role="listitem"
                className="inline-flex max-w-full items-center rounded-full border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-1.5 text-sm font-medium leading-snug text-[#1A1A1A]/85 transition hover:border-[#0B3C5D]/20 hover:bg-[#EEF2F6]"
              >
                <span className="min-w-0 wrap-break-word">{label}</span>
              </span>
            ))}
          </div>
        </div>

        {needsToggle && !expanded ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent"
            aria-hidden
          />
        ) : null}
      </div>

      {needsToggle ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="w-full min-h-11 rounded-xl border border-[#0B3C5D]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB] sm:w-auto"
            aria-expanded={expanded}
            aria-controls={regionId}
          >
            {expanded ? "Daha az göster" : "Tüm alt hizmetleri göster"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
