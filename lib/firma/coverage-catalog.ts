/**
 * Bölge / ülke eşlemesi — sabit katalog (admin ülke isimleriyle eşleşmeye çalışır).
 * Veritabanındaki `firms.countries` dizisi ile fuzzy eşleşir.
 */

import type { FirmRow } from "@/lib/types/firm";

export function normalizeCountryKey(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[ç]/g, "c")
    .replace(/[ğ]/g, "g")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ş]/g, "s")
    .replace(/[ü]/g, "u")
    .replace(/\s+/g, "");
}

/** Schengen üye ülkeleri (yaygın Türkçe isimler + eş anlamlılar) */
export const SCHENGEN_COUNTRY_KEYS = new Set<string>([
  "almanya",
  "avusturya",
  "belcika",
  "czechya",
  "cekya",
  "danimarka",
  "estonya",
  "finlandiya",
  "fransa",
  "hirvatistan",
  "izlanda",
  "italya",
  "letonya",
  "liechtenstein",
  "litvanya",
  "luksemburg",
  "macaristan",
  "malta",
  "hollanda",
  "norvec",
  "polonya",
  "portekiz",
  "slovakya",
  "slovenya",
  "ispanya",
  "isvec",
  "isvicre",
  "yunanistan",
]);

/** Popüler satırlar — admin ülke listesindeki tam adla eşleştirilir */
export type PopularCountryRow = { label: string; value: string };

type PopularRowDef = { label: string; match: (n: string) => boolean };

const POPULAR_ROW_DEFS: PopularRowDef[] = [
  {
    label: "ABD",
    match: (n) =>
      (n.includes("amerika") && n.includes("birlesik")) ||
      n.includes("abd") ||
      n === "usa",
  },
  {
    label: "İngiltere",
    match: (n) => n.includes("ingiltere") || n.includes("birlesik krallik"),
  },
  { label: "Kanada", match: (n) => n.includes("kanada") },
  { label: "Almanya", match: (n) => n.includes("almanya") },
  { label: "Fransa", match: (n) => n.includes("fransa") },
  { label: "İtalya", match: (n) => n.includes("italya") },
  { label: "Avustralya", match: (n) => n.includes("avustralya") },
  { label: "Rusya", match: (n) => n.includes("rusya") },
  {
    label: "Çin",
    match: (n) =>
      (n.includes("cin") && !n.includes("guney") && !n.includes("kuzey")) ||
      n.includes("china"),
  },
  { label: "Japonya", match: (n) => n.includes("japonya") },
  { label: "Brezilya", match: (n) => n.includes("brezilya") },
  { label: "Katar", match: (n) => n.includes("katar") },
  {
    label: "BAE (Dubai)",
    match: (n) =>
      n.includes("arap emirlik") ||
      n.includes("birlesik arap") ||
      n.includes("dubai") ||
      n === "bae",
  },
];

/**
 * Admin panelindeki ülke adlarıyla birebir eşleşen popüler seçenekler (sıra sabit).
 */
export function resolvePopularCountryRows(
  countryOptions: string[]
): PopularCountryRow[] {
  const sorted = [...countryOptions].sort((a, b) =>
    a.localeCompare(b, "tr")
  );
  const used = new Set<string>();
  const out: PopularCountryRow[] = [];
  for (const def of POPULAR_ROW_DEFS) {
    const found = sorted.find((c) => {
      if (used.has(c)) return false;
      const n = normalizeCountryKey(c);
      return def.match(n);
    });
    if (found) {
      used.add(found);
      out.push({ label: def.label, value: found });
    }
  }
  return out;
}

export type RegionDef = {
  id: string;
  label: string;
  /** Türkçe ülke adları — admin verisiyle eşleşme için */
  countries: string[];
};

export const REGIONS: RegionDef[] = [
  {
    id: "schengen",
    label: "Schengen",
    countries: [],
  },
  {
    id: "north_america",
    label: "Kuzey Amerika",
    countries: [
      "Amerika Birleşik Devletleri",
      "Kanada",
      "Meksika",
    ],
  },
  {
    id: "south_america",
    label: "Güney Amerika",
    countries: ["Arjantin", "Şili", "Kolombiya", "Peru", "Ekvador", "Uruguay"],
  },
  {
    id: "latin_america",
    label: "Latin Ülkeleri",
    countries: [
      "Brezilya",
      "Arjantin",
      "Şili",
      "Meksika",
      "Kolombiya",
      "Peru",
      "Küba",
    ],
  },
  {
    id: "middle_east",
    label: "Orta Doğu",
    countries: [
      "Katar",
      "Birleşik Arap Emirlikleri",
      "Suudi Arabistan",
      "Kuveyt",
      "Ürdün",
      "Lübnan",
      "Irak",
      "İran",
      "İsrail",
    ],
  },
  {
    id: "far_east_asia",
    label: "Uzak Doğu / Asya",
    countries: [
      "Çin",
      "Japonya",
      "Güney Kore",
      "Tayland",
      "Vietnam",
      "Singapur",
      "Malezya",
      "Endonezya",
      "Filipinler",
    ],
  },
  {
    id: "africa",
    label: "Afrika",
    countries: [
      "Güney Afrika",
      "Mısır",
      "Fas",
      "Nijerya",
      "Kenya",
      "Cezayir",
      "Tunus",
    ],
  },
  {
    id: "europe_non_schengen",
    label: "Avrupa (Schengen dışı)",
    countries: [
      "İngiltere",
      "Rusya",
      "Ukrayna",
      "Belarus",
      "Sırbistan",
      "Arnavutluk",
      "Kuzey Makedonya",
      "Bosna Hersek",
    ],
  },
  {
    id: "arabian_peninsula",
    label: "Arap Yarımadası",
    countries: [
      "Katar",
      "Birleşik Arap Emirlikleri",
      "Suudi Arabistan",
      "Kuveyt",
      "Umman",
      "Bahreyn",
      "Yemen",
    ],
  },
];

function firmCountryKeys(firm: FirmRow): Set<string> {
  const set = new Set<string>();
  for (const c of firm.countries ?? []) {
    const k = normalizeCountryKey(c);
    if (k) set.add(k);
  }
  return set;
}

/**
 * Schengen: bölge etiketi, uzmanlık bayrağı veya birden fazla Schengen ülkesi.
 */
export function firmMatchesSchengenLogic(firm: FirmRow): boolean {
  const raw = firm.countries ?? [];
  const joined = raw.join(" ").toLowerCase();
  if (joined.includes("schengen")) return true;
  if (firm.schengen_expert === true) return true;

  const keys = firmCountryKeys(firm);
  let hits = 0;
  for (const k of keys) {
    if (SCHENGEN_COUNTRY_KEYS.has(k)) hits++;
    else {
      for (const sc of SCHENGEN_COUNTRY_KEYS) {
        if (k.includes(sc) || sc.includes(k)) {
          hits++;
          break;
        }
      }
    }
  }
  if (hits >= 2) return true;
  if (hits >= 1 && raw.length >= 4) return true;
  return false;
}

function firmMatchesCountryName(firm: FirmRow, name: string): boolean {
  const nk = normalizeCountryKey(name);
  if (!nk) return false;
  const keys = firmCountryKeys(firm);
  for (const k of keys) {
    if (k === nk || k.includes(nk) || nk.includes(k)) return true;
  }
  return false;
}

function firmMatchesRegionCountries(firm: FirmRow, countries: string[]): boolean {
  for (const c of countries) {
    if (firmMatchesCountryName(firm, c)) return true;
  }
  return false;
}

export function firmMatchesRegion(firm: FirmRow, regionId: string): boolean {
  if (regionId === "schengen") return firmMatchesSchengenLogic(firm);
  const r = REGIONS.find((x) => x.id === regionId);
  if (!r || r.countries.length === 0) return false;
  return firmMatchesRegionCountries(firm, r.countries);
}

/** Bölge + ülke seçimlerinin birleşimi (OR) */
export function firmMatchesCoverageSelection(
  firm: FirmRow,
  selection: {
    regionIds: string[];
    countries: string[];
  }
): boolean {
  const { regionIds, countries } = selection;
  const hasAny = regionIds.length > 0 || countries.length > 0;
  if (!hasAny) return true;

  for (const id of regionIds) {
    if (firmMatchesRegion(firm, id)) return true;
  }
  for (const c of countries) {
    if (firmMatchesCountryName(firm, c)) return true;
  }

  return false;
}
