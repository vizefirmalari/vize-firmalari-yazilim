import {
  CountryChip,
  RegionChip,
} from "@/components/firma/coverage-chips";

type FirmServiceScopeProps = {
  regions: string[];
  countries: string[];
  mainServices: string[];
  specializationLabels: string[];
};

export function FirmServiceScope({
  regions,
  countries,
  mainServices,
  specializationLabels,
}: FirmServiceScopeProps) {
  const hasCountries = countries.length > 0;
  const hasRegions = regions.length > 0;
  const hasMain = mainServices.length > 0;
  const hasSpec = specializationLabels.length > 0;

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
