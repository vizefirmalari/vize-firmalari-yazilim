"use client";

import { useEffect, useId, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  CountryChip,
  RegionChip,
} from "@/components/firma/coverage-chips";

const MAX_COUNTRIES_VISIBLE = 6;
const MAX_MAIN_SERVICES_VISIBLE = 4;
const MAX_SPECIALIZATION_VISIBLE = 4;

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
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);
  const [mainServicesOpen, setMainServicesOpen] = useState(false);
  const [specOpen, setSpecOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const anyModalOpen =
    countriesOpen || regionsOpen || mainServicesOpen || specOpen || detailsOpen;

  // Prevent background scroll while any modal is open.
  useEffect(() => {
    if (!anyModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [anyModalOpen]);

  const idBase = useId();
  const countriesTitleId = `${idBase}-countries`;
  const mainTitleId = `${idBase}-main`;
  const specTitleId = `${idBase}-spec`;
  const detailsTitleId = `${idBase}-details`;

  const shownCountries = countries.slice(0, MAX_COUNTRIES_VISIBLE);
  const restCountryCount = Math.max(0, countries.length - shownCountries.length);

  const shownRegions = regions.slice(0, MAX_COUNTRIES_VISIBLE);
  const restRegionCount = Math.max(0, regions.length - shownRegions.length);

  const shownMain = mainServices.slice(0, MAX_MAIN_SERVICES_VISIBLE);
  const restMainCount = Math.max(0, mainServices.length - shownMain.length);

  const shownSpec = specializationLabels.slice(0, MAX_SPECIALIZATION_VISIBLE);
  const restSpecCount = Math.max(
    0,
    specializationLabels.length - shownSpec.length
  );

  const hasCountries = countries.length > 0;
  const hasRegions = regions.length > 0;
  const hasMain = mainServices.length > 0;
  const hasSpec = specializationLabels.length > 0;
  // "Tüm hizmet detayları" etkileşimi yalnızca alt hizmet detayları (süreç/alt kalemler) için gösterilir.
  const hasDetailsContent = subServices.length > 0;
  const hasSummaryAboveDetails = hasRegions || hasCountries || hasMain || hasSpec;

  const detailSummaryParts: string[] = [];
  if (subServices.length > 0) {
    detailSummaryParts.push(`${subServices.length} alt kalem`);
  }
  const detailSummaryText = detailSummaryParts.join(" · ");

  return (
    <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0B3C5D]">Hizmet kapsamı</h2>

      {hasRegions ? (
        <div className="mt-7">
          <h3 className="text-sm font-semibold text-[#0B3C5D]">Hizmet verilen bölgeler</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {shownRegions.map((r) => (
              <li key={r}>
                <RegionChip regionLabel={r} />
              </li>
            ))}
            {restRegionCount > 0 ? (
              <li>
                <button
                  type="button"
                  onClick={() => setRegionsOpen(true)}
                  className="rounded-md border border-[#D9A441]/35 bg-[#FFFBF5] px-2.5 py-1 text-xs font-semibold text-[#1A1A1A] transition hover:bg-[#FFF6E8]"
                  aria-label={`Tüm bölgeleri görüntüle, ${restRegionCount} ek`}
                >
                  +{restRegionCount} bölge
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {hasCountries ? (
        <div className="mt-7">
          <h3 className="text-sm font-semibold text-[#0B3C5D]">Hizmet verilen ülkeler</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {shownCountries.map((c) => {
              return (
                <li key={c}>
                  <CountryChip countryName={c} />
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
            return (
              <li key={c}>
                <CountryChip countryName={c} />
              </li>
            );
          })}
        </ul>
      </ModalShell>

      <ModalShell
        open={regionsOpen}
        onClose={() => setRegionsOpen(false)}
        titleId={`${idBase}-regions`}
        title="Hizmet verilen bölgeler"
      >
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <RegionChip key={r} regionLabel={r} />
          ))}
        </div>
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
        title="Tüm Hizmet Detayları"
        size="wide"
      >
        <div className="space-y-8">
          {mainServices.length > 0 ? (
            <DetailGroup
              title="Vize Türleri"
              icon={<ServiceIcon />}
              divider={false}
            >
              <div className="mt-3 flex flex-wrap gap-2">
                {mainServices.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#F7F9FB] px-3 py-1.5 text-xs font-medium text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10"
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
              </div>
            </DetailGroup>
          ) : null}

          {countries.length > 0 ? (
            <DetailGroup
              title="Ülke Bazlı Hizmetler"
              icon={<WorldIcon />}
              divider={mainServices.length > 0}
            >
              {regions.length > 0 ? (
                <div className="mt-2">
                  <h5 className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
                    Bölgeler
                  </h5>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {regions.map((r) => (
                      <RegionChip key={r} regionLabel={r} />
                    ))}
                  </div>
                </div>
              ) : null}

              {countries.length > 0 ? (
                <div className={regions.length > 0 ? "mt-6" : "mt-3"}>
                  <h5 className="text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
                    Ülkeler
                  </h5>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {countries.map((c) => (
                      <CountryChip key={c} countryName={c} />
                    ))}
                  </div>
                </div>
              ) : null}
            </DetailGroup>
          ) : null}

          {subServices.length > 0 ? (
            <DetailGroup
              title="Süreç Hizmetleri"
              icon={<ServiceIcon />}
              divider={countries.length > 0 || regions.length > 0 || mainServices.length > 0}
            >
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
            </DetailGroup>
          ) : null}
        </div>
      </ModalShell>
    </section>
  );
}

function DetailGroup({
  title,
  icon,
  divider,
  children,
}: {
  title: string;
  icon: ReactNode;
  divider: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      {divider ? <div className="mb-6 border-t border-[#0B3C5D]/10 pt-6" /> : null}
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#0B3C5D]/70">
        <span className="inline-flex h-5 w-5 items-center justify-center text-[#0B3C5D]">
          {icon}
        </span>
        {title}
      </h4>
      {children}
    </div>
  );
}

function WorldIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.5 12h17M12 3.5c2.8 3.2 4.3 6.4 4.3 8.5S14.8 17.3 12 20.5c-2.8-3.2-4.3-6.4-4.3-8.5S9.2 6.7 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ModalShell({
  open,
  onClose,
  title,
  titleId,
  size = "default",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId: string;
  size?: "default" | "wide";
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Trigger CSS transition on next frame.
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), 200);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  const portalRoot =
    typeof document !== "undefined" ? document.body : null;
  if (!portalRoot) return null;

  const maxWidthClass =
    size === "wide"
      ? "max-w-4xl sm:max-w-3xl lg:max-w-5xl"
      : "max-w-lg";

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <div className={`relative mx-auto flex h-full w-full items-end justify-center p-3 sm:items-center ${maxWidthClass}`}>
        <div
          className={`relative z-[10001] w-full overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-[0_8px_30px_rgba(11,60,93,0.16)] transition-all duration-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-[10002] flex items-center justify-between gap-3 border-b border-[#0B3C5D]/10 bg-white px-4 py-3">
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
          <div className="max-h-[min(70vh,620px)] overflow-y-auto px-4 py-5">
            {children}
          </div>
        </div>
      </div>
    </div>,
    portalRoot
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
