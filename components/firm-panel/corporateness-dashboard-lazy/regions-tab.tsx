"use client";

import { RegionChip } from "@/components/firma/coverage-chips";
import { EmptyValue } from "@/components/firm-panel/corporateness-dashboard-shared";
import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";
import { flagUrlForIso, getCountryFlagCodeFromName } from "@/lib/firma/country-flag";
import { deriveVisaRegions } from "@/lib/visa-regions/derive";
import { isExcludedCountryPicklistName } from "@/lib/visa-regions/picklist-exclusions";
import Image from "next/image";

export default function RegionsTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const f = snapshot.firm;
  const names = Array.isArray(f.countries) ? (f.countries as string[]) : [];
  const filtered = names.filter((n) => !isExcludedCountryPicklistName(n));
  const regions = deriveVisaRegions(filtered);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] p-4 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
            Ülke sayısı
          </p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[#0B3C5D]">{filtered.length}</p>
        </div>
        <div className="rounded-xl border border-[#0B3C5D]/8 bg-[#FAFBFC] p-4 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
            Bölgesel kapsama
          </p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[#0B3C5D]">{regions.length}</p>
          <p className="mt-1 text-xs text-[#1A1A1A]/55">Ülke listesinden otomatik türetilen bölgeler</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-[#0B3C5D]">Hizmet verilen ülkeler</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {filtered.length ? (
            filtered.map((name) => {
              const code = getCountryFlagCodeFromName(name);
              const src = code ? flagUrlForIso(code, 40) : null;
              return (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0B3C5D]/10 bg-white py-1 pl-1 pr-3 text-xs font-medium text-[#0B3C5D] shadow-sm"
                >
                  {src ? (
                    <Image
                      src={src}
                      alt=""
                      width={22}
                      height={16}
                      className="rounded-sm object-cover"
                      unoptimized
                    />
                  ) : null}
                  {name}
                </span>
              );
            })
          ) : (
            <EmptyValue />
          )}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-[#0B3C5D]">Otomatik bölgeler</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {regions.length ? (
            regions.map((label) => <RegionChip key={label} regionLabel={label} />)
          ) : (
            <EmptyValue />
          )}
        </div>
      </div>
    </div>
  );
}
