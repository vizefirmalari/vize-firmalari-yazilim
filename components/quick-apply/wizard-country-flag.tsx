"use client";

import { useState } from "react";
import { flagUrlForIso } from "@/lib/firma/country-flag";

/** Görsel genişlik `flagUrlForIso` ile uyumlu olmalı (flagcdn yalnızca w20, w40, …). */
const DIMS = {
  sm: { w: 20, box: "h-3.5 w-[22px] min-w-[22px]" },
  md: { w: 40, box: "h-6 w-10 min-w-[2.5rem]" },
  lg: { w: 40, box: "h-6 w-10 min-w-[2.5rem]" },
} as const;

export type WizardCountryFlagSize = keyof typeof DIMS;

type Props = {
  code: string;
  size?: WizardCountryFlagSize;
  /** Sık seçilenlerde seçili (koyu mavi zemin) kart */
  active?: boolean;
  className?: string;
};

/**
 * Lead sihirbazı ülke seçimi: emoji yerine flagcdn PNG — tüm ISO2 kodlarında tutarlı görünüm.
 */
export function WizardCountryFlag({
  code,
  size = "md",
  active = false,
  className = "",
}: Props) {
  const iso = code?.toUpperCase().replace(/[^A-Z]/g, "");
  const [failed, setFailed] = useState(false);
  const d = DIMS[size];

  const border = active
    ? "border-white/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"
    : "border-[#0B3C5D]/12 bg-white shadow-[0_1px_2px_rgba(11,60,93,0.06)]";

  if (!iso || iso === "UNSURE" || failed) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-[3px] border border-[#0B3C5D]/10 bg-[#F0F2F4] ${d.box} ${className}`}
        aria-hidden
      >
        <span className="text-[8px] font-bold leading-none text-[#1A1A1A]/28">
          ·
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-[3px] ${border} ${className}`}
    >
      { }
      <img
        src={flagUrlForIso(iso, d.w)}
        alt=""
        width={d.w}
        height={Math.round(d.w * 0.65)}
        className={`${d.box} object-cover`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
