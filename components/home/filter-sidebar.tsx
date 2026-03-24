"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import {
  ALL_COUNTRIES,
  SERVICE_OPTIONS,
  TOP_COUNTRIES,
} from "@/lib/constants/filters";
import type { FirmSort } from "@/lib/types/firm";

function parseCsv(param: string | null): string[] {
  if (!param) return [];
  return param
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toCsv(list: string[]): string {
  return list.join(",");
}

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAllCountries, setShowAllCountries] = useState(false);

  const q = searchParams.get("q") ?? "";
  const selectedCountries = useMemo(
    () => parseCsv(searchParams.get("countries")),
    [searchParams]
  );
  const selectedServices = useMemo(
    () => parseCsv(searchParams.get("services")),
    [searchParams]
  );
  const sort = (searchParams.get("sort") as FirmSort | null) ?? "trust_desc";

  const pushParams = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, val]) => {
        if (val === null || val === "") next.delete(key);
        else next.set(key, val);
      });
      const qs = next.toString();
      router.push(qs ? `/?${qs}` : "/");
    },
    [router, searchParams]
  );

  const toggleCountry = (c: string) => {
    const set = new Set(selectedCountries);
    if (set.has(c)) set.delete(c);
    else set.add(c);
    const list = [...set];
    pushParams({
      countries: list.length ? toCsv(list) : null,
      q: q || null,
    });
  };

  const toggleService = (s: string) => {
    const set = new Set(selectedServices);
    if (set.has(s)) set.delete(s);
    else set.add(s);
    const list = [...set];
    pushParams({
      services: list.length ? toCsv(list) : null,
      q: q || null,
    });
  };

  const setSort = (next: FirmSort) => {
    pushParams({ sort: next === "trust_desc" ? null : next, q: q || null });
  };

  const visibleCountries = showAllCountries ? ALL_COUNTRIES : [...TOP_COUNTRIES];

  return (
    <aside className="lg:sticky lg:top-[5.25rem] lg:self-start">
      <div className="rounded-xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_8px_30px_rgba(11,60,93,0.06)]">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]">
          Filtreler
        </h2>

        <div className="mt-6">
          <p className="text-xs font-medium text-[#1A1A1A]/55">Ülke Seçimi</p>
          <div
            className={
              showAllCountries
                ? "mt-3 max-h-60 space-y-2 overflow-y-auto pr-1"
                : "mt-3 space-y-2"
            }
          >
            {visibleCountries.map((c) => (
              <label
                key={c}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 text-sm text-[#1A1A1A] hover:bg-[#F7F9FB]"
              >
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(c)}
                  onChange={() => toggleCountry(c)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1] focus:ring-[#328CC1]"
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowAllCountries((v) => !v)}
            className="mt-3 w-full rounded-lg border border-[#0B3C5D]/15 bg-[#F7F9FB] py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#0B3C5D]/5"
          >
            {showAllCountries ? "Daralt" : "Tümünü Göster"}
          </button>
        </div>

        <div className="mt-8 border-t border-[#0B3C5D]/10 pt-6">
          <p className="text-xs font-medium text-[#1A1A1A]/55">İşlem Türü</p>
          <div className="mt-3 space-y-2">
            {SERVICE_OPTIONS.map((s) => (
              <label
                key={s}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 text-sm text-[#1A1A1A] hover:bg-[#F7F9FB]"
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(s)}
                  onChange={() => toggleService(s)}
                  className="h-4 w-4 rounded border-[#0B3C5D]/25 text-[#328CC1] focus:ring-[#328CC1]"
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-[#0B3C5D]/10 pt-6">
          <p className="text-xs font-medium text-[#1A1A1A]/55">Sıralama</p>
          <fieldset className="mt-3 space-y-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 text-sm text-[#1A1A1A] hover:bg-[#F7F9FB]">
              <input
                type="radio"
                name="sort"
                checked={sort === "trust_desc"}
                onChange={() => setSort("trust_desc")}
                className="h-4 w-4 border-[#0B3C5D]/25 text-[#328CC1] focus:ring-[#328CC1]"
              />
              Güven Endeksi (yüksek → düşük)
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 text-sm text-[#1A1A1A] hover:bg-[#F7F9FB]">
              <input
                type="radio"
                name="sort"
                checked={sort === "trust_asc"}
                onChange={() => setSort("trust_asc")}
                className="h-4 w-4 border-[#0B3C5D]/25 text-[#328CC1] focus:ring-[#328CC1]"
              />
              Güven Endeksi (düşük → yüksek)
            </label>
          </fieldset>
        </div>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-8 w-full rounded-xl border border-[#0B3C5D]/15 py-2.5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
        >
          Filtreleri temizle
        </button>
      </div>
    </aside>
  );
}
