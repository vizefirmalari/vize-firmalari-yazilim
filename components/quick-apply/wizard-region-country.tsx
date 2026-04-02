"use client";

import { useMemo, useState } from "react";
import {
  flagEmojiForCountry,
  getCountryByCode,
  listCountriesInRegion,
  POPULAR_BY_REGION,
  type RegionId,
  REGIONS,
  searchCountries,
} from "@/lib/quick-apply/regions-countries";

type Props = {
  regionId: RegionId | null;
  countryCode: string | null;
  countryUnsure: boolean;
  onRegion: (id: RegionId | null) => void;
  onCountry: (code: string | null, unsure: boolean) => void;
};

export function WizardRegionCountry({ regionId, countryCode, countryUnsure, onRegion, onCountry }: Props) {
  const [query, setQuery] = useState("");
  const [showAllInRegion, setShowAllInRegion] = useState(false);

  const popular = useMemo(() => {
    if (!regionId || regionId === "unsure") return [];
    const codes = POPULAR_BY_REGION[regionId];
    return codes.map((c) => getCountryByCode(c)).filter(Boolean) as NonNullable<ReturnType<typeof getCountryByCode>>[];
  }, [regionId]);

  const searchHits = useMemo(() => {
    if (!regionId || regionId === "unsure") return [];
    return searchCountries(query, regionId);
  }, [query, regionId]);

  const browseAll = useMemo(() => {
    if (!regionId || regionId === "unsure") return [];
    return listCountriesInRegion(regionId);
  }, [regionId]);

  const selectedCountry = countryCode ? getCountryByCode(countryCode) : undefined;
  const regionMeta = regionId ? REGIONS.find((r) => r.id === regionId) : null;

  const showSearchResults = query.trim().length >= 2;
  const showBrowseList = showAllInRegion && !showSearchResults;

  return (
    <div className="space-y-8">
      {/* 1 — Bölge */}
      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-[0_1px_3px_rgba(11,60,93,0.06)] sm:p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B3C5D] text-sm font-bold text-white">1</span>
          <div>
            <p className="text-base font-semibold text-[#0B3C5D]">Hedef bölge</p>
            <p className="text-xs text-[#1A1A1A]/55">Danışmanlık rotası ve belge seti bölgeye göre değişir.</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {REGIONS.map((r) => {
            const active = regionId === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  onRegion(r.id);
                  setQuery("");
                  setShowAllInRegion(false);
                  if (r.id === "unsure") onCountry(null, true);
                }}
                className={`rounded-2xl border px-4 py-3.5 text-left transition ${
                  active
                    ? "border-[#0B3C5D] bg-[#F7F9FB] shadow-[inset_0_0_0_1px_rgba(11,60,93,0.08)]"
                    : "border-[#0B3C5D]/12 bg-[#FAFBFC] hover:border-[#0B3C5D]/28"
                }`}
              >
                <span className="block text-sm font-semibold text-[#0B3C5D]">{r.label}</span>
                <span className="mt-0.5 block text-xs leading-snug text-[#1A1A1A]/55">{r.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bölge özeti + ülke adımı */}
      {regionId && regionId !== "unsure" ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-2 rounded-xl border border-[#D9A441]/35 bg-[#FFFBF3] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm">
              <span className="font-semibold text-[#0B3C5D]">{regionMeta?.label}</span>
              <span className="text-[#1A1A1A]/60"> · hedef ülke seçimi</span>
            </div>
            <button
              type="button"
              onClick={() => {
                onRegion(null);
                setQuery("");
                setShowAllInRegion(false);
                onCountry(null, false);
              }}
              className="shrink-0 text-sm font-semibold text-[#0B3C5D] underline decoration-[#0B3C5D]/25 underline-offset-2 hover:decoration-[#0B3C5D]"
            >
              Bölgeyi değiştir
            </button>
          </div>

          <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-[0_1px_3px_rgba(11,60,93,0.06)] sm:p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B3C5D] text-sm font-bold text-white">2</span>
              <div>
                <p className="text-base font-semibold text-[#0B3C5D]">Hedef ülke</p>
                <p className="text-xs text-[#1A1A1A]/55">Önce sık başvurulanları seçin; gerekirse arama veya tam listeyi kullanın.</p>
              </div>
            </div>

            {selectedCountry && !countryUnsure ? (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[#0B3C5D]/20 bg-[#F7F9FB] px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-2xl leading-none" aria-hidden>
                    {flagEmojiForCountry(selectedCountry.code)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#1A1A1A]/45">Seçilen</p>
                    <p className="truncate text-sm font-semibold text-[#0B3C5D]">{selectedCountry.name}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onCountry(null, false)}
                  className="shrink-0 text-sm font-semibold text-[#0B3C5D] hover:underline"
                >
                  Değiştir
                </button>
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
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">Sık seçilenler</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {popular.map((c) => {
                    const active = countryCode === c.code && !countryUnsure;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => onCountry(c.code, false)}
                        className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                          active
                            ? "border-[#0B3C5D] bg-[#0B3C5D] text-white shadow-[0_4px_14px_rgba(11,60,93,0.2)]"
                            : "border-[#0B3C5D]/12 bg-[#FAFBFC] hover:border-[#0B3C5D]/28"
                        }`}
                      >
                        <span className="text-2xl leading-none" aria-hidden>
                          {flagEmojiForCountry(c.code)}
                        </span>
                        <span className={`text-sm font-semibold ${active ? "text-white" : "text-[#0B3C5D]"}`}>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {showSearchResults ? (
              <div className="mt-4 max-h-52 overflow-y-auto rounded-xl border border-[#0B3C5D]/10">
                {searchHits.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-[#1A1A1A]/55">Bu aramaya uygun ülke bulunamadı.</p>
                ) : (
                  <ul className="divide-y divide-[#0B3C5D]/8">
                    {searchHits.map((c) => {
                      const active = countryCode === c.code && !countryUnsure;
                      return (
                        <li key={c.code}>
                          <button
                            type="button"
                            onClick={() => {
                              onCountry(c.code, false);
                              setQuery("");
                            }}
                            className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition ${
                              active ? "bg-[#F7F9FB] font-semibold text-[#0B3C5D]" : "hover:bg-[#F7F9FB]/90"
                            }`}
                          >
                            <span className="text-xl" aria-hidden>
                              {flagEmojiForCountry(c.code)}
                            </span>
                            <span>{c.name}</span>
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
                        const active = countryCode === c.code && !countryUnsure;
                        return (
                          <li key={c.code}>
                            <button
                              type="button"
                              onClick={() => onCountry(c.code, false)}
                              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition ${
                                active ? "bg-[#F7F9FB] font-semibold text-[#0B3C5D]" : "hover:bg-[#F7F9FB]/90"
                              }`}
                            >
                              <span className="text-lg" aria-hidden>
                                {flagEmojiForCountry(c.code)}
                              </span>
                              <span>{c.name}</span>
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
              onClick={() => onCountry(null, true)}
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

      {regionId === "unsure" ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-4 py-3">
            <p className="text-sm text-[#1A1A1A]/75">
              <span className="font-semibold text-[#0B3C5D]">Emin değilim</span> seçildi. Bir sonraki adımda özetinizle birlikte hedefi netleştireceğiz.
            </p>
            <button
              type="button"
              onClick={() => onRegion(null)}
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
