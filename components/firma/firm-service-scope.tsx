"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { countryFlagEmoji } from "@/lib/firma/country-flag";

const MAX_COUNTRIES_VISIBLE = 6;
const MAX_MAIN_SERVICES_VISIBLE = 4;
const MAX_SPECIALIZATION_VISIBLE = 4;

type FirmServiceScopeProps = {
  countries: string[];
  mainServices: string[];
  subServices: string[];
  customTags: string[];
  specializationLabels: string[];
};

export function FirmServiceScope({
  countries,
  mainServices,
  subServices,
  customTags,
  specializationLabels,
}: FirmServiceScopeProps) {
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [mainServicesOpen, setMainServicesOpen] = useState(false);
  const [specOpen, setSpecOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const idBase = useId();
  const countriesTitleId = `${idBase}-countries`;
  const mainTitleId = `${idBase}-main`;
  const specTitleId = `${idBase}-spec`;
  const detailsTitleId = `${idBase}-details`;

  const shownCountries = countries.slice(0, MAX_COUNTRIES_VISIBLE);
  const restCountryCount = Math.max(0, countries.length - shownCountries.length);

  const shownMain = mainServices.slice(0, MAX_MAIN_SERVICES_VISIBLE);
  const restMainCount = Math.max(0, mainServices.length - shownMain.length);

  const shownSpec = specializationLabels.slice(0, MAX_SPECIALIZATION_VISIBLE);
  const restSpecCount = Math.max(
    0,
    specializationLabels.length - shownSpec.length
  );

  const hasCountries = countries.length > 0;
  const hasMain = mainServices.length > 0;
  const hasSpec = specializationLabels.length > 0;
  const hasDetailsContent = subServices.length > 0 || customTags.length > 0;
  const hasSummaryAboveDetails = hasCountries || hasMain || hasSpec;

  const detailSummaryParts: string[] = [];
  if (subServices.length > 0) {
    detailSummaryParts.push(`${subServices.length} alt kalem`);
  }
  if (customTags.length > 0) {
    detailSummaryParts.push(`${customTags.length} etiket`);
  }
  const detailSummaryText = detailSummaryParts.join(" · ");

  return (
    <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0B3C5D]">Hizmet kapsamı</h2>

      {hasCountries ? (
        <div className="mt-7">
          <h3 className="text-sm font-semibold text-[#0B3C5D]">Ülkeler</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {shownCountries.map((c) => {
              const flag = countryFlagEmoji(c);
              return (
                <li key={c}>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[#0B3C5D]/10 bg-[#FAFBFC] px-2.5 py-1 text-xs font-medium text-[#0B3C5D]/85">
                    <span className="text-[13px] leading-none" aria-hidden>
                      {flag ?? "🌍"}
                    </span>
                    {c}
                  </span>
                </li>
              );
            })}
            {restCountryCount > 0 ? (
              <li>
                <button
                  type="button"
                  onClick={() => setCountriesOpen(true)}
                  className="rounded-md border border-[#D9A441]/35 bg-[#FFFBF5] px-2.5 py-1 text-xs font-semibold text-[#1A1A1A] transition hover:bg-[#FFF6E8]"
                  aria-label={`Tüm ülkeleri görüntüle, ${restCountryCount} ek`}
                >
                  +{restCountryCount} ülke
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {hasMain ? (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-[#0B3C5D]">
            Sunulan hizmetler
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {shownMain.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 rounded-lg bg-[#F7F9FB] px-3 py-1.5 text-sm font-medium text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10"
              >
                <span
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#328CC1]/10 text-[#0B3C5D]"
                  aria-hidden
                >
                  <ServiceIcon />
                </span>
                {s}
              </span>
            ))}
            {restMainCount > 0 ? (
              <button
                type="button"
                onClick={() => setMainServicesOpen(true)}
                className="rounded-lg border border-[#0B3C5D]/12 bg-white px-3 py-1.5 text-sm font-semibold text-[#0B3C5D] shadow-sm transition hover:bg-[#F7F9FB]"
                aria-label={`Tüm hizmetleri görüntüle, ${restMainCount} ek`}
              >
                +{restMainCount} hizmet
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {hasSpec ? (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-[#0B3C5D]">
            Uzmanlık vurgusu
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {shownSpec.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-lg border border-[#D9A441]/45 bg-gradient-to-b from-[#FFF9ED] to-[#FFF3DC] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#0B3C5D] shadow-[0_1px_0_rgba(217,164,65,0.15)]"
              >
                {s}
              </span>
            ))}
            {restSpecCount > 0 ? (
              <button
                type="button"
                onClick={() => setSpecOpen(true)}
                className="rounded-lg border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F0F4F8]"
                aria-label={`Tüm uzmanlık alanlarını görüntüle, ${restSpecCount} ek`}
              >
                +{restSpecCount} uzmanlık
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {hasDetailsContent ? (
        <div
          className={
            hasSummaryAboveDetails
              ? "mt-8 border-t border-[#0B3C5D]/8 pt-6"
              : "mt-6"
          }
        >
          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-4 py-3 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F0F4F8] sm:w-auto sm:justify-start"
            aria-expanded={detailsOpen}
          >
            <span>Tüm hizmet detaylarını gör</span>
            {detailSummaryText ? (
              <span className="text-xs font-medium text-[#1A1A1A]/45">
                ({detailSummaryText})
              </span>
            ) : null}
          </button>
        </div>
      ) : null}

      <ModalShell
        open={countriesOpen}
        onClose={() => setCountriesOpen(false)}
        titleId={countriesTitleId}
        title="Hizmet verilen ülkeler"
      >
        <ul className="flex flex-wrap gap-2">
          {countries.map((c) => {
            const flag = countryFlagEmoji(c);
            return (
              <li key={c}>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-[#0B3C5D]/10 bg-[#FAFBFC] px-2.5 py-1 text-xs font-medium text-[#0B3C5D]/85">
                  <span className="text-[13px]" aria-hidden>
                    {flag ?? "🌍"}
                  </span>
                  {c}
                </span>
              </li>
            );
          })}
        </ul>
      </ModalShell>

      <ModalShell
        open={mainServicesOpen}
        onClose={() => setMainServicesOpen(false)}
        titleId={mainTitleId}
        title="Sunulan hizmetler"
      >
        <div className="flex flex-wrap gap-2">
          {mainServices.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 rounded-lg bg-[#F7F9FB] px-3 py-1.5 text-sm font-medium text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10"
            >
              <span
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#328CC1]/10"
                aria-hidden
              >
                <ServiceIcon />
              </span>
              {s}
            </span>
          ))}
        </div>
      </ModalShell>

      <ModalShell
        open={specOpen}
        onClose={() => setSpecOpen(false)}
        titleId={specTitleId}
        title="Uzmanlık alanları"
      >
        <div className="flex flex-wrap gap-2">
          {specializationLabels.map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-lg border border-[#D9A441]/45 bg-gradient-to-b from-[#FFF9ED] to-[#FFF3DC] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#0B3C5D]"
            >
              {s}
            </span>
          ))}
        </div>
      </ModalShell>

      <ModalShell
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        titleId={detailsTitleId}
        title="Hizmet detayları"
      >
        <div className="space-y-8">
          {subServices.length > 0 ? (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
                Alt hizmet detayları
              </h4>
              <ul className="mt-3 space-y-2">
                {subServices.map((s) => (
                  <li
                    key={s}
                    className="flex gap-3 rounded-lg border border-[#0B3C5D]/8 bg-[#FAFBFC] px-3 py-2.5 text-sm text-[#1A1A1A]/85"
                  >
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#328CC1]/10 text-[#0B3C5D]"
                      aria-hidden
                    >
                      <ServiceIcon />
                    </span>
                    <span className="leading-snug">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {customTags.length > 0 ? (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
                Özel etiketler
              </h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {customTags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-[#EEF1F4] px-2 py-1 text-[11px] font-medium text-[#1A1A1A]/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </ModalShell>
    </section>
  );
}

function ModalShell({
  open,
  onClose,
  title,
  titleId,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative mx-auto flex h-full w-full max-w-lg items-end justify-center p-3 sm:items-center">
        <div
          className="w-full overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-[0_8px_30px_rgba(11,60,93,0.16)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#0B3C5D]/10 px-4 py-3">
            <h3 id={titleId} className="text-sm font-semibold text-[#0B3C5D]">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#0B3C5D]/15 bg-white px-3 py-1 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
            >
              Kapat
            </button>
          </div>
          <div className="max-h-[min(70vh,560px)] overflow-y-auto px-4 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
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
