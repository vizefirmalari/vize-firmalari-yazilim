export type RegionId =
  | "schengen"
  | "uk"
  | "north_america"
  | "middle_east"
  | "east_asia"
  | "balkans"
  | "other_europe"
  | "unsure";

export type CountryItem = {
  code: string;
  name: string;
};

export const REGIONS: Array<{
  id: RegionId;
  label: string;
  hint: string;
}> = [
  { id: "schengen", label: "Schengen", hint: "Avrupa Schengen bölgesi ülkeleri" },
  { id: "uk", label: "Birleşik Krallık", hint: "İngiltere ve ilgili rotalar" },
  { id: "north_america", label: "Kuzey Amerika", hint: "ABD, Kanada" },
  { id: "middle_east", label: "Orta Doğu", hint: "BAE, Katar, Suudi Arabistan vb." },
  { id: "east_asia", label: "Uzak Doğu / Asya", hint: "Japonya, Kore, Çin vb." },
  { id: "balkans", label: "Balkanlar", hint: "Sırbistan, Arnavutluk, Karadağ vb." },
  { id: "other_europe", label: "Diğer Avrupa", hint: "Schengen dışı Avrupa ülkeleri" },
  {
    id: "unsure",
    label: "Emin değilim / birden fazla seçenek",
    hint: "Henüz net değilse buradan ilerleyin; danışman yönlendirmesi kolaylaşır",
  },
];

/** Tüm ülkeler (arama için düz liste) */
export const ALL_COUNTRIES: CountryItem[] = [
  { code: "DE", name: "Almanya" },
  { code: "NL", name: "Hollanda" },
  { code: "FR", name: "Fransa" },
  { code: "IT", name: "İtalya" },
  { code: "ES", name: "İspanya" },
  { code: "BE", name: "Belçika" },
  { code: "AT", name: "Avusturya" },
  { code: "GB", name: "İngiltere" },
  { code: "US", name: "Amerika Birleşik Devletleri" },
  { code: "CA", name: "Kanada" },
  { code: "AE", name: "BAE (Dubai)" },
  { code: "QA", name: "Katar" },
  { code: "SA", name: "Suudi Arabistan" },
  { code: "JP", name: "Japonya" },
  { code: "KR", name: "Güney Kore" },
  { code: "CN", name: "Çin" },
  { code: "RS", name: "Sırbistan" },
  { code: "BA", name: "Bosna Hersek" },
  { code: "ME", name: "Karadağ" },
  { code: "AL", name: "Arnavutluk" },
  { code: "MK", name: "Kuzey Makedonya" },
  { code: "IE", name: "İrlanda" },
  { code: "RO", name: "Romanya" },
  { code: "BG", name: "Bulgaristan" },
  { code: "CH", name: "İsviçre" },
  { code: "PT", name: "Portekiz" },
  { code: "GR", name: "Yunanistan" },
  { code: "PL", name: "Polonya" },
  { code: "HR", name: "Hırvatistan" },
  { code: "CZ", name: "Çekya" },
  { code: "HU", name: "Macaristan" },
  { code: "SE", name: "İsveç" },
  { code: "DK", name: "Danimarka" },
  { code: "FI", name: "Finlandiya" },
  { code: "SK", name: "Slovakya" },
  { code: "SI", name: "Slovenya" },
  { code: "LT", name: "Litvanya" },
  { code: "LV", name: "Letonya" },
  { code: "EE", name: "Estonya" },
  { code: "LU", name: "Lüksemburg" },
  { code: "MT", name: "Malta" },
  { code: "IS", name: "İzlanda" },
  { code: "NO", name: "Norveç" },
];

/** Kartlarda öne çıkan ülkeler (bölge başına ilk sıra) */
export const POPULAR_BY_REGION: Record<RegionId, string[]> = {
  schengen: ["DE", "NL", "FR", "IT", "ES", "BE", "AT"],
  uk: ["GB"],
  north_america: ["US", "CA"],
  middle_east: ["AE", "QA", "SA"],
  east_asia: ["JP", "KR", "CN"],
  balkans: ["RS", "BA", "ME", "AL", "MK"],
  other_europe: ["IE", "RO", "BG"],
  unsure: [],
};

/** Arama / “tümünü göster” için bölgeye ek ülke kodları (öneri kartlarından geniş) */
export const REGION_SEARCH_EXTRA: Partial<Record<RegionId, string[]>> = {
  schengen: ["CH", "PT", "GR", "PL", "HR", "CZ", "HU", "SE", "DK", "FI", "SK", "SI", "LT", "LV", "EE", "LU", "MT", "IS", "NO"],
};

export function getCountryByCode(code: string): CountryItem | undefined {
  return ALL_COUNTRIES.find((c) => c.code === code);
}

/** Bölgeye bağlı tüm aranabilir ülke kodları (önerilen + ek liste) */
export function countryCodesForRegion(regionId: RegionId): Set<string> {
  if (regionId === "unsure") return new Set(ALL_COUNTRIES.map((c) => c.code));
  const pop = POPULAR_BY_REGION[regionId] ?? [];
  const extra = REGION_SEARCH_EXTRA[regionId] ?? [];
  return new Set([...pop, ...extra]);
}

/** Seçilen bölgelerin birleşik ülke kodları (unsure hariç) */
export function countryCodesForRegions(regionIds: RegionId[]): Set<string> {
  const ids = regionIds.filter((r) => r !== "unsure");
  if (ids.length === 0) return new Set();
  const union = new Set<string>();
  for (const id of ids) {
    for (const c of countryCodesForRegion(id)) union.add(c);
  }
  return union;
}

/** Bölge listesi değişince ülke kodlarını geçerli kümede tut */
export function filterCountryCodesForRegions(
  regionIds: RegionId[],
  countryCodes: string[]
): string[] {
  const allowed = countryCodesForRegions(regionIds);
  if (allowed.size === 0) return [];
  return countryCodes.filter((c) => allowed.has(c));
}

export function listCountriesInRegions(regionIds: RegionId[]): CountryItem[] {
  const allowed = countryCodesForRegions(regionIds);
  return ALL_COUNTRIES.filter((c) => allowed.has(c.code)).sort((a, b) =>
    a.name.localeCompare(b.name, "tr")
  );
}

export function searchCountriesInRegions(query: string, regionIds: RegionId[]): CountryItem[] {
  const allowed = countryCodesForRegions(regionIds);
  if (allowed.size === 0) return [];
  const q = query.trim().toLowerCase();
  const base = ALL_COUNTRIES.filter((c) => allowed.has(c.code));
  if (!q) return [];
  return base.filter(
    (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
  );
}

/** Sık seçilenler: bölgelere göre sırayla, mükerrer yok */
export function popularCountriesForRegions(regionIds: RegionId[]): CountryItem[] {
  const seen = new Set<string>();
  const out: CountryItem[] = [];
  for (const id of regionIds) {
    if (id === "unsure") continue;
    for (const code of POPULAR_BY_REGION[id] ?? []) {
      if (seen.has(code)) continue;
      seen.add(code);
      const c = getCountryByCode(code);
      if (c) out.push(c);
    }
  }
  return out;
}

export function listCountriesInRegion(regionId: RegionId): CountryItem[] {
  const codes = countryCodesForRegion(regionId);
  return ALL_COUNTRIES.filter((c) => codes.has(c.code)).sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

export function searchCountries(query: string, regionId: RegionId | null): CountryItem[] {
  const q = query.trim().toLowerCase();
  const inRegion = (c: CountryItem) => {
    if (!regionId || regionId === "unsure") return true;
    return countryCodesForRegion(regionId).has(c.code);
  };
  const base = ALL_COUNTRIES.filter(inRegion);
  if (!q) return [];
  return base.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
}

export function buildTargetCountryLabel(regionId: RegionId | null, countryCode: string | null, countryUnsure: boolean): string {
  if (countryUnsure || regionId === "unsure") {
    return "Henüz net değil / danışmanla netleştirilecek";
  }
  const c = countryCode ? getCountryByCode(countryCode) : undefined;
  if (!c) return "";
  const r = regionId ? REGIONS.find((x) => x.id === regionId) : null;
  return r ? `${c.name} (${r.label})` : c.name;
}

/** Çoklu bölge + ülke → özet metin (target_country / panel) */
export function buildTargetCountryLabelMulti(
  regionCodes: RegionId[],
  countryCodes: string[],
  countryUnsure: boolean
): string {
  if (countryUnsure || regionCodes.includes("unsure") || regionCodes.length === 0) {
    return "Henüz net değil / danışmanla netleştirilecek";
  }
  const names = countryCodes
    .map((c) => getCountryByCode(c)?.name)
    .filter((n): n is string => Boolean(n));
  const regionLabels = regionCodes
    .filter((r) => r !== "unsure")
    .map((id) => REGIONS.find((x) => x.id === id)?.label)
    .filter((n): n is string => Boolean(n));
  if (names.length === 0) return "";
  const countriesPart = names.join(", ");
  if (regionLabels.length === 0) return countriesPart;
  if (names.length === 1 && regionLabels.length === 1) {
    return `${names[0]} (${regionLabels[0]})`;
  }
  return `${countriesPart} · ${regionLabels.join(", ")}`;
}
