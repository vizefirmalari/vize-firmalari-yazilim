"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    if (key !== "search") next.delete("offset");
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="sticky top-16 z-20 mb-4 rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm sm:top-20">
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
  );
}

