"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HomepageHorizontalScroller } from "@/components/home/homepage-horizontal-scroller";

type Props = {
  categories: Array<{ id: string; name: string }>;
  countries: string[];
  visaTypes: string[];
};

export function FeedFiltersBar({ categories, countries, visaTypes }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [draftSearch, setDraftSearch] = useState("");
  const [draftCategory, setDraftCategory] = useState("");
  const [draftCountry, setDraftCountry] = useState("");
  const [draftVisaType, setDraftVisaType] = useState("");
  const [draftPremium, setDraftPremium] = useState(false);

  const current = useMemo(
    () => ({
      sort: searchParams.get("sort") ?? "smart",
      category: searchParams.get("category") ?? "",
      country: searchParams.get("country") ?? "",
      visaType: searchParams.get("visaType") ?? "",
      premium: searchParams.get("premium") === "true",
    }),
    [searchParams]
  );
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (current.category) count += 1;
    if (current.country) count += 1;
    if (current.visaType) count += 1;
    if (current.premium) count += 1;
    if (searchParams.get("search")) count += 1;
    return count;
  }, [current, searchParams]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    if (key !== "search") next.delete("offset");
    router.push(`${pathname}?${next.toString()}`);
  };

  const openSheet = () => {
    setDraftSearch(searchParams.get("search") ?? "");
    setDraftCategory(current.category);
    setDraftCountry(current.country);
    setDraftVisaType(current.visaType);
    setDraftPremium(current.premium);
    setIsSheetOpen(true);
  };

  const applyMobileFilters = () => {
    const next = new URLSearchParams(searchParams.toString());
    const setOrDelete = (key: string, value: string) => {
      if (!value) next.delete(key);
      else next.set(key, value);
    };
    setOrDelete("search", draftSearch.trim());
    setOrDelete("category", draftCategory);
    setOrDelete("country", draftCountry);
    setOrDelete("visaType", draftVisaType);
    setOrDelete("premium", draftPremium ? "true" : "");
    next.delete("offset");
    router.push(`${pathname}?${next.toString()}`);
    setSearch(draftSearch.trim());
    setIsSheetOpen(false);
  };

  const clearMobileFilters = () => {
    setDraftSearch("");
    setDraftCategory("");
    setDraftCountry("");
    setDraftVisaType("");
    setDraftPremium(false);
    const next = new URLSearchParams(searchParams.toString());
    ["search", "category", "country", "visaType", "premium", "offset"].forEach((k) =>
      next.delete(k)
    );
    router.push(`${pathname}?${next.toString()}`);
    setSearch("");
    setIsSheetOpen(false);
  };

  const removeFilterChip = (key: "search" | "category" | "country" | "visaType" | "premium") => {
    if (key === "search") setSearch("");
    setParam(key, "");
  };

  const categoryLabel = categories.find((c) => c.id === current.category)?.name;
  const chips = [
    current.category ? { key: "category" as const, label: categoryLabel ?? "Kategori" } : null,
    current.country ? { key: "country" as const, label: current.country } : null,
    current.visaType ? { key: "visaType" as const, label: current.visaType } : null,
    current.premium ? { key: "premium" as const, label: "Premium" } : null,
    searchParams.get("search")
      ? { key: "search" as const, label: `Ara: ${searchParams.get("search")}` }
      : null,
  ].filter(Boolean) as Array<{ key: "search" | "category" | "country" | "visaType" | "premium"; label: string }>;

  return (
    <>
      <div className="sticky top-16 z-20 mb-4 md:hidden sm:top-20">
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-2.5 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                  <path d="M4 12h16M4 7h10M4 17h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <select
                value={current.sort}
                onChange={(e) => setParam("sort", e.target.value)}
                className="h-10 w-full rounded-full border border-[#e5e7eb] bg-[#f9fafb] pl-9 pr-3 text-sm text-[#111827] outline-none"
              >
                <option value="smart">Akıllı Sıralama</option>
                <option value="new">En Yeni</option>
                <option value="top">En Çok İlgi Gören</option>
                <option value="trending">Öne Çıkanlar</option>
              </select>
            </div>
            <button
              type="button"
              onClick={openSheet}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-3 text-sm font-medium text-[#111827]"
            >
              Filtrele
              {activeFiltersCount > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0B3C5D] px-1.5 text-[11px] text-white">
                  {activeFiltersCount}
                </span>
              ) : null}
            </button>
          </div>
          {chips.length > 0 ? (
            <HomepageHorizontalScroller
              gapClass="gap-1.5"
              snap={false}
              flushMobile={false}
              className="mt-2"
            >
              {chips.map((chip) => (
                <button
                  type="button"
                  key={`${chip.key}-${chip.label}`}
                  onClick={() => removeFilterChip(chip.key)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#dbe2ea] bg-white px-2.5 py-1 text-xs text-[#334155]"
                >
                  {chip.label}
                  <span aria-hidden>✕</span>
                </button>
              ))}
            </HomepageHorizontalScroller>
          ) : null}
        </div>
      </div>

      {isSheetOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Filtre panelini kapat"
            onClick={() => setIsSheetOpen(false)}
            className="absolute inset-0 bg-black/35"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[78dvh] overflow-hidden rounded-t-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eef2f7] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#111827]">Filtreler</h2>
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="rounded-full border border-[#e5e7eb] px-2.5 py-1 text-xs text-[#374151]"
              >
                Kapat
              </button>
            </div>
            <div className="max-h-[calc(78dvh-132px)] space-y-3 overflow-y-auto px-4 py-4">
              <input
                value={draftSearch}
                onChange={(e) => setDraftSearch(e.target.value)}
                placeholder="Firma adına göre ara"
                className="h-11 w-full rounded-xl border border-[#e5e7eb] px-3 text-sm outline-none"
              />
              <select
                value={draftCategory}
                onChange={(e) => setDraftCategory(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#e5e7eb] px-3 text-sm outline-none"
              >
                <option value="">Tüm kategoriler</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={draftCountry}
                onChange={(e) => setDraftCountry(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#e5e7eb] px-3 text-sm outline-none"
              >
                <option value="">Tüm ülkeler</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={draftVisaType}
                onChange={(e) => setDraftVisaType(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#e5e7eb] px-3 text-sm outline-none"
              >
                <option value="">Tüm vize türleri</option>
                {visaTypes.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <label className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] px-3 py-2.5 text-sm text-[#111827]">
                <input
                  type="checkbox"
                  checked={draftPremium}
                  onChange={(e) => setDraftPremium(e.target.checked)}
                />
                Premium içerikler
              </label>
            </div>
            <div className="flex items-center gap-2 border-t border-[#eef2f7] p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
              <button
                type="button"
                onClick={clearMobileFilters}
                className="h-11 flex-1 rounded-xl border border-[#e5e7eb] bg-white text-sm font-semibold text-[#334155]"
              >
                Temizle
              </button>
              <button
                type="button"
                onClick={applyMobileFilters}
                className="h-11 flex-1 rounded-xl bg-[#0B3C5D] text-sm font-semibold text-white"
              >
                Uygula
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="sticky top-16 z-20 mb-4 hidden rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm md:block lg:top-20">
        <div className="grid gap-2 md:grid-cols-3">
          <select value={current.sort} onChange={(e) => setParam("sort", e.target.value)} className="rounded-xl border border-[#e5e7eb] px-3 py-2 text-sm">
            <option value="smart">Akıllı Sıralama</option>
            <option value="new">En Yeni</option>
            <option value="trending">Öne Çıkan</option>
            <option value="top">En Çok İlgi Gören</option>
          </select>
          <select value={current.category} onChange={(e) => setParam("category", e.target.value)} className="rounded-xl border border-[#e5e7eb] px-3 py-2 text-sm">
            <option value="">Tüm kategoriler</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select value={current.country} onChange={(e) => setParam("country", e.target.value)} className="rounded-xl border border-[#e5e7eb] px-3 py-2 text-sm">
            <option value="">Tüm ülkeler</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select value={current.visaType} onChange={(e) => setParam("visaType", e.target.value)} className="rounded-xl border border-[#e5e7eb] px-3 py-2 text-sm">
            <option value="">Tüm vize türleri</option>
            {visaTypes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setParam("search", search.trim());
            }}
            placeholder="Firma adına göre ara"
            className="rounded-xl border border-[#e5e7eb] px-3 py-2 text-sm"
          />
          <label className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] px-3 py-2 text-sm">
            <input
              type="checkbox"
              checked={current.premium}
              onChange={(e) => setParam("premium", e.target.checked ? "true" : "")}
            />
            Premium içerikler
          </label>
        </div>
      </div>
    </>
  );
}

