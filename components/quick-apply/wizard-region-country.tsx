"use client";

import { useMemo, useState } from "react";
import { WizardCountryFlag } from "@/components/quick-apply/wizard-country-flag";
import {
  getCountryByCode,
  listCountriesInRegions,
  popularCountriesForRegions,
  REGIONS,
  REGION_REPRESENTATIVE_FLAG_ISO,
  searchCountriesInRegions,
  type RegionId,
} from "@/lib/quick-apply/regions-countries";

type Props = {
  regionCodes: RegionId[];
  countryCodes: string[];
  countryUnsure: boolean;
  onRegionCodesChange: (ids: RegionId[]) => void;
  onCountryCodesChange: (codes: string[], unsure: boolean) => void;
};

function toggleInList<T extends string>(list: T[], item: T, checked: boolean): T[] {
  if (checked) return list.includes(item) ? list : [...list, item];
  return list.filter((x) => x !== item);
}

export function WizardRegionCountry({
  regionCodes,
  countryCodes,
  countryUnsure,
  onRegionCodesChange,
  onCountryCodesChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [showAllInRegion, setShowAllInRegion] = useState(false);

  const nonUnsureRegions = useMemo(
    () => regionCodes.filter((r) => r !== "unsure"),
    [regionCodes]
  );

  const popular = useMemo(() => {
    if (nonUnsureRegions.length === 0) return [];
    return popularCountriesForRegions(nonUnsureRegions);
  }, [nonUnsureRegions]);

  const searchHits = useMemo(() => {
    if (nonUnsureRegions.length === 0) return [];
    return searchCountriesInRegions(query, nonUnsureRegions);
  }, [query, nonUnsureRegions]);

  const browseAll = useMemo(() => {
    if (nonUnsureRegions.length === 0) return [];
    return listCountriesInRegions(nonUnsureRegions);
  }, [nonUnsureRegions]);

  const regionLabels = useMemo(
    () =>
      nonUnsureRegions
        .map((id) => REGIONS.find((r) => r.id === id)?.label)
        .filter(Boolean) as string[],
    [nonUnsureRegions]
  );

  const showSearchResults = query.trim().length >= 2;
  const showBrowseList = showAllInRegion && !showSearchResults;

  const handleRegionClick = (id: RegionId) => {
    if (id === "unsure") {
      onRegionCodesChange(["unsure"]);
      setQuery("");
      setShowAllInRegion(false);
      return;
    }
    const withoutUnsure = regionCodes.filter((r) => r !== "unsure");
    const next = toggleInList(withoutUnsure, id, !withoutUnsure.includes(id));
    onRegionCodesChange(next);
    setQuery("");
    setShowAllInRegion(false);
  };

  const toggleCountry = (code: string) => {
    if (countryUnsure) {
      onCountryCodesChange([code], false);
      return;
    }
    const next = toggleInList(countryCodes, code, !countryCodes.includes(code));
    onCountryCodesChange(next, false);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-[0_1px_3px_rgba(11,60,93,0.06)] sm:p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B3C5D] text-sm font-bold text-white">
            1
          </span>
          <div>
            <p className="text-base font-semibold text-[#0B3C5D]">Hedef bölge</p>
            <p className="text-xs text-[#1A1A1A]/55">
              Birden fazla seçebilirsiniz. Danışmanlık rotası ve belge seti bölgeye göre değişir.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {REGIONS.map((r) => {
            const active =
              r.id === "unsure"
                ? regionCodes.length === 1 && regionCodes[0] === "unsure"
                : regionCodes.includes(r.id);
            const flagIso = REGION_REPRESENTATIVE_FLAG_ISO[r.id];
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRegionClick(r.id)}
                className={`flex gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                  active
                    ? "border-[#0B3C5D] bg-[#F7F9FB] shadow-[inset_0_0_0_1px_rgba(11,60,93,0.08)]"
                    : "border-[#0B3C5D]/12 bg-[#FAFBFC] hover:border-[#0B3C5D]/28"
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {flagIso ? (
                    <WizardCountryFlag code={flagIso} size="sm" />
                  ) : (
                    <span
                      className="inline-flex h-3.5 w-[22px] min-w-[22px] items-center justify-center rounded-[3px] border border-[#0B3C5D]/10 bg-[#F0F2F4] text-[10px] font-bold leading-none text-[#1A1A1A]/35"
                      aria-hidden
                    >
                      ?
                    </span>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#0B3C5D]">{r.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-[#1A1A1A]/55">{r.hint}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {nonUnsureRegions.length > 0 ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-2 rounded-xl border border-[#D9A441]/35 bg-[#FFFBF3] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 text-sm">
              <span className="font-semibold text-[#0B3C5D]">
                {regionLabels.length ? regionLabels.join(", ") : ""}
              </span>
              <span className="text-[#1A1A1A]/60"> · hedef ülke seçimi</span>
            </div>
            <button
              type="button"
              onClick={() => {
                onRegionCodesChange([]);
                onCountryCodesChange([], false);
                setQuery("");
                setShowAllInRegion(false);
              }}
              className="shrink-0 text-sm font-semibold text-[#0B3C5D] underline decoration-[#0B3C5D]/25 underline-offset-2 hover:decoration-[#0B3C5D]"
            >
              Bölge seçimini sıfırla
            </button>
          </div>

          <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-[0_1px_3px_rgba(11,60,93,0.06)] sm:p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B3C5D] text-sm font-bold text-white">
                2
              </span>
              <div>
                <p className="text-base font-semibold text-[#0B3C5D]">Hedef ülke</p>
                <p className="text-xs text-[#1A1A1A]/55">
                  Birden fazla ülke işaretleyebilirsiniz; gerekirse arama veya tam listeyi kullanın.
                </p>
              </div>
            </div>

            {countryCodes.length > 0 && !countryUnsure ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {countryCodes.map((code) => {
                  const c = getCountryByCode(code);
                  if (!c) return null;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => toggleCountry(code)}
                      className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#0B3C5D]/18 bg-[#F7F9FB] py-1 pl-1 pr-2.5 text-left text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#0B3C5D]/08"
                    >
                      <WizardCountryFlag code={code} size="sm" />
                      <span className="min-w-0 truncate">{c.name}</span>
                      <span className="text-[#1A1A1A]/35" aria-hidden>
                        ×
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="mt-5">
              <label className="block text-xs font-medium text-[#0B3C5D]/90" htmlFor="lead-country-search">
                Ülke ara
              </label>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/35" aria-hidden>
                  ⌕
                </span>
                <input
                  id="lead-country-search"
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowAllInRegion(false);
                  }}
                  placeholder="Örn. Portekiz, Polonya, İsviçre…"
                  className="w-full rounded-xl border border-[#0B3C5D]/20 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-[#1A1A1A]/45 focus:border-[#0B3C5D]"
                  autoComplete="off"
                />
              </div>
              <p className="mt-1 text-[11px] text-[#1A1A1A]/45">En az 2 karakter yazınca sonuçlar filtrelenir.</p>
            </div>

            {popular.length > 0 && !showSearchResults ? (
              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
                  Sık seçilenler
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {popular.map((c) => {
                    const active = countryCodes.includes(c.code) && !countryUnsure;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => toggleCountry(c.code)}
                        className={`flex min-h-[48px] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition sm:min-h-0 sm:px-4 sm:py-3.5 ${
                          active
                            ? "border-[#0B3C5D] bg-[#0B3C5D] text-white shadow-[0_4px_14px_rgba(11,60,93,0.2)]"
                            : "border-[#0B3C5D]/12 bg-[#FAFBFC] hover:border-[#0B3C5D]/28"
                        }`}
                      >
                        <WizardCountryFlag code={c.code} size="md" active={active} />
                        <span
                          className={`min-w-0 text-sm font-semibold leading-snug ${active ? "text-white" : "text-[#0B3C5D]"}`}
                        >
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {showSearchResults ? (
              <div className="mt-4 max-h-52 overflow-y-auto rounded-xl border border-[#0B3C5D]/10">
                {searchHits.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-[#1A1A1A]/55">
                    Bu aramaya uygun ülke bulunamadı.
                  </p>
                ) : (
                  <ul className="divide-y divide-[#0B3C5D]/8">
                    {searchHits.map((c) => {
                      const active = countryCodes.includes(c.code) && !countryUnsure;
                      return (
                        <li key={c.code}>
                          <button
                            type="button"
                            onClick={() => {
                              toggleCountry(c.code);
                              setQuery("");
                            }}
                            className={`flex min-h-[48px] w-full items-center gap-3 px-4 py-3 text-left text-sm transition sm:min-h-0 ${
                              active ? "bg-[#F7F9FB] font-semibold text-[#0B3C5D]" : "hover:bg-[#F7F9FB]/90"
                            }`}
                          >
                            <WizardCountryFlag code={c.code} size="sm" />
                            <span className="min-w-0">{c.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ) : null}

            {!showSearchResults ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowAllInRegion((v) => !v)}
                  className="text-sm font-semibold text-[#0B3C5D] underline decoration-[#0B3C5D]/25 underline-offset-2 hover:decoration-[#0B3C5D]"
                >
                  {showBrowseList ? "Tam listeyi gizle" : "Tüm uygun ülkeleri listele"}
                </button>
                {showBrowseList ? (
                  <div className="mt-3 max-h-56 overflow-y-auto rounded-xl border border-[#0B3C5D]/10">
                    <ul className="divide-y divide-[#0B3C5D]/8">
                      {browseAll.map((c) => {
                        const active = countryCodes.includes(c.code) && !countryUnsure;
                        return (
                          <li key={c.code}>
                            <button
                              type="button"
                              onClick={() => toggleCountry(c.code)}
                              className={`flex min-h-[48px] w-full items-center gap-3 px-4 py-3 text-left text-sm transition sm:min-h-0 sm:py-2.5 ${
                                active ? "bg-[#F7F9FB] font-semibold text-[#0B3C5D]" : "hover:bg-[#F7F9FB]/90"
                              }`}
                            >
                              <WizardCountryFlag code={c.code} size="sm" />
                              <span className="min-w-0">{c.name}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => {
                if (countryUnsure) {
                  onCountryCodesChange([], false);
                } else {
                  onCountryCodesChange([], true);
                }
              }}
              className={`mt-6 w-full rounded-2xl border px-4 py-3.5 text-left text-sm font-semibold transition ${
                countryUnsure
                  ? "border-[#0B3C5D] bg-[#F7F9FB] text-[#0B3C5D] shadow-[inset_0_0_0_1px_rgba(11,60,93,0.08)]"
                  : "border-[#0B3C5D]/12 bg-[#FAFBFC] text-[#1A1A1A]/80 hover:border-[#0B3C5D]/25"
              }`}
            >
              Henüz emin değilim — danışmanla netleştireceğim
            </button>
          </div>
        </div>
      ) : null}

      {regionCodes.length === 1 && regionCodes[0] === "unsure" ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-4 py-3">
            <p className="text-sm text-[#1A1A1A]/75">
              <span className="font-semibold text-[#0B3C5D]">Emin değilim</span> seçildi. Bir sonraki adımda özetinizle
              birlikte hedefi netleştireceğiz.
            </p>
            <button
              type="button"
              onClick={() => onRegionCodesChange([])}
              className="text-sm font-semibold text-[#0B3C5D] underline underline-offset-2"
            >
              Bölge seçimine dön
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
