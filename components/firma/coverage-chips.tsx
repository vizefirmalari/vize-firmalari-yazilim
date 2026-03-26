"use client";

import { useEffect, useState } from "react";
import { isRegionCoverageLabel } from "@/lib/firma/split-coverage-regions-countries";
import {
  euFlagUrl,
  flagUrlForIso,
  getCountryFlagCodeFromName,
  logMissingCountryMapping,
  regionUsesEuFlag,
} from "@/lib/firma/country-flag";

const CHIP_BASE =
  "inline-flex h-7 max-w-full items-center gap-2 rounded-md border border-[#0B3C5D]/10 bg-[#FAFBFC] px-2.5 text-xs font-medium text-[#0B3C5D]/85";

type ChipProps = {
  className?: string;
  onClick?: () => void;
};

export function CountryChip({
  countryName,
  onClick,
  className = "",
}: ChipProps & { countryName: string }) {
  const code = getCountryFlagCodeFromName(countryName);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    setImgOk(true);
  }, [countryName]);

  if (!code) {
    logMissingCountryMapping(countryName);
  }

  const showFlag = Boolean(code) && imgOk;
  const cls = `${CHIP_BASE} ${onClick ? "cursor-pointer" : ""} ${className}`.trim();

  const inner = (
    <>
      {showFlag ? (
        <img
          src={flagUrlForIso(code!)}
          alt=""
          width={24}
          height={16}
          className="h-4 w-auto shrink-0 rounded-[3px] object-cover"
          loading="lazy"
          onError={() => setImgOk(false)}
        />
      ) : null}
      <span className="truncate whitespace-nowrap">{countryName}</span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  }

  return <span className={cls}>{inner}</span>;
}

function RegionPinIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-[#328CC1]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function RegionChip({
  regionLabel,
  onClick,
  className = "",
}: ChipProps & { regionLabel: string }) {
  const useEu = regionUsesEuFlag(regionLabel);
  const [euOk, setEuOk] = useState(true);

  useEffect(() => {
    setEuOk(true);
  }, [regionLabel]);

  const showEuFlag = useEu && euOk;
  const cls = `${CHIP_BASE} ${onClick ? "cursor-pointer" : ""} ${className}`.trim();

  const inner = (
    <>
      {showEuFlag ? (
        <img
          src={euFlagUrl()}
          alt=""
          width={24}
          height={16}
          className="h-4 w-auto shrink-0 rounded-[3px] object-cover"
          loading="lazy"
          onError={() => setEuOk(false)}
        />
      ) : (
        <RegionPinIcon />
      )}
      <span className="truncate whitespace-nowrap">{regionLabel}</span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  }

  return <span className={cls}>{inner}</span>;
}

/**
 * Ham etiket: bölge ise RegionChip, değilse CountryChip (kart / liste ortak).
 */
export function CoverageChip({
  label,
  onClick,
  className,
}: ChipProps & { label: string }) {
  if (isRegionCoverageLabel(label)) {
    return (
      <RegionChip regionLabel={label} onClick={onClick} className={className} />
    );
  }
  return (
    <CountryChip countryName={label} onClick={onClick} className={className} />
  );
}
