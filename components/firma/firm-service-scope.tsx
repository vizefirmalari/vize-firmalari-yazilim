"use client";

import { useId, useState } from "react";
import {
  CountryChip,
  RegionChip,
} from "@/components/firma/coverage-chips";

/** Çok uzun alt hizmet listelerinde ilk görünür satır sayısı; gerçek kalemler her zaman metin olarak gösterilir. */
const SUB_SERVICES_COLLAPSED_COUNT = 12;

type FirmServiceScopeProps = {
  regions: string[];
  countries: string[];
  mainServices: string[];
  subServices: string[];
  specializationLabels: string[];
};

export function FirmServiceScope({
  regions,
  countries,
  mainServices,
  subServices,
  specializationLabels,
}: FirmServiceScopeProps) {
  const idBase = useId();
  const subListId = `${idBase}-sub-services`;

  const hasCountries = countries.length > 0;
  const hasRegions = regions.length > 0;
  const hasMain = mainServices.length > 0;
  const hasSpec = specializationLabels.length > 0;
  const hasSub = subServices.length > 0;
  const hasSummaryAboveSub =
    hasRegions || hasCountries || hasMain || hasSpec;

  /** Detay sayfasında önce tam liste; çok uzunsa kullanıcı daraltabilir. */
  const [subExpanded, setSubExpanded] = useState(true);
  const subNeedsToggle = subServices.length > SUB_SERVICES_COLLAPSED_COUNT;
  const visibleSubServices =
    subNeedsToggle && !subExpanded
      ? subServices.slice(0, SUB_SERVICES_COLLAPSED_COUNT)
      : subServices;

  return (
    <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-[#0B3C5D]">Hizmet kapsamı</h2>

      {hasRegions ? (
        <div className="mt-7">
          <h3 className="text-sm font-semibold text-[#0B3C5D]">
            Hizmet verilen bölgeler
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Hizmet verilen bölgeler">
            {regions.map((r) => (
              <li key={r} className="min-w-0 max-w-full">
                <RegionChip regionLabel={r} variant="detail" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {hasCountries ? (
        <div className="mt-7">
          <h3 className="text-sm font-semibold text-[#0B3C5D]">
            Hizmet verilen ülkeler
          </h3>
          <ul
            className="mt-3 flex flex-wrap gap-2"
            aria-label="Hizmet verilen ülkeler"
          >
            {countries.map((c) => (
              <li key={c} className="min-w-0 max-w-full">
                <CountryChip countryName={c} variant="detail" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {hasMain ? (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-[#0B3C5D]">
            Sunulan hizmetler
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {mainServices.map((s) => (
              <span
                key={s}
                className="inline-flex min-h-[2.5rem] max-w-full items-center gap-2 rounded-lg bg-[#F7F9FB] px-3 py-2 text-sm font-medium leading-snug text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10"
              >
                <span
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#328CC1]/10 text-[#0B3C5D]"
                  aria-hidden
                >
                  <ServiceIcon />
                </span>
                <span className="min-w-0 wrap-break-word">{s}</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {hasSpec ? (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-[#0B3C5D]">
            Uzmanlık vurgusu
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {specializationLabels.map((s) => (
              <span
                key={s}
                className="inline-flex min-h-[2.25rem] max-w-full items-center rounded-lg border border-[#D9A441]/45 bg-gradient-to-b from-[#FFF9ED] to-[#FFF3DC] px-3 py-2 text-xs font-semibold leading-snug tracking-wide text-[#0B3C5D] shadow-[0_1px_0_rgba(217,164,65,0.15)]"
              >
                <span className="wrap-break-word">{s}</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {hasSub ? (
        <div
          className={
            hasSummaryAboveSub
              ? "mt-8 border-t border-[#0B3C5D]/8 pt-7"
              : "mt-7"
          }
        >
          <h3 className="text-sm font-semibold text-[#0B3C5D]">
            Alt hizmetler
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[#1A1A1A]/60">
            Süreç ve destek kapsamındaki tüm kalemler aşağıda listelenir.
          </p>
          <ul
            id={subListId}
            className="mt-4 space-y-2"
            aria-label="Alt hizmet kalemleri"
          >
            {visibleSubServices.map((s) => (
              <li
                key={s}
                className="flex gap-3 rounded-lg border border-[#0B3C5D]/8 bg-[#FAFBFC] px-3 py-3 text-sm text-[#1A1A1A]/85 sm:py-2.5"
              >
                <span
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#328CC1]/10 text-[#0B3C5D]"
                  aria-hidden
                >
                  <ServiceIcon />
                </span>
                <span className="min-w-0 flex-1 leading-snug wrap-break-word">
                  {s}
                </span>
              </li>
            ))}
          </ul>
          {subNeedsToggle ? (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setSubExpanded((v) => !v)}
                className="rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-4 py-3 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F0F4F8]"
                aria-expanded={subExpanded}
                aria-controls={subListId}
              >
                {subExpanded
                  ? "Daha az göster"
                  : "Tüm hizmet kalemlerini göster"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function ServiceIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 7h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M5 9V7a2 2 0 0 1 2-2h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9.5 12h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
