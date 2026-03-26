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

export const POPULAR_DESTINATIONS: {
  id: string;
  label: string;
  aliases: string[];
}[] = [
  {
    id: "abd",
    label: "Amerika Birleşik Devletleri (ABD)",
    aliases: [
      "amerika birlesik devletleri",
      "abd",
      "amerika",
      "united states",
      "usa",
    ],
  },
  {
    id: "uk",
    label: "İngiltere",
    aliases: ["ingiltere", "birlesik krallik", "uk", "great britain"],
  },
  { id: "canada", label: "Kanada", aliases: ["kanada", "canada"] },
  { id: "germany", label: "Almanya", aliases: ["almanya", "germany"] },
  { id: "france", label: "Fransa", aliases: ["fransa", "france"] },
  { id: "italy", label: "İtalya", aliases: ["italya", "italy"] },
  { id: "russia", label: "Rusya", aliases: ["rusya", "russia"] },
  { id: "china", label: "Çin", aliases: ["cin", "china", "cinhalk cumhuriyeti"] },
  { id: "japan", label: "Japonya", aliases: ["japonya", "japan"] },
  { id: "brazil", label: "Brezilya", aliases: ["brezilya", "brazil"] },
  { id: "qatar", label: "Katar", aliases: ["katar", "qatar"] },
  {
    id: "uae",
    label: "Dubai (BAE)",
    aliases: [
      "birlesik arap emirlikleri",
      "bae",
      "dubai",
      "abu dabi",
      "uae",
    ],
  },
  {
    id: "australia",
    label: "Avustralya",
    aliases: ["avustralya", "australia"],
  },
];

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

function aliasKeysForPopular(id: string): Set<string> {
  const p = POPULAR_DESTINATIONS.find((x) => x.id === id);
  if (!p) return new Set();
  const keys = new Set<string>();
  for (const a of [p.label, ...p.aliases]) {
    const k = normalizeCountryKey(a);
    if (k) keys.add(k);
  }
  return keys;
}

/** Firma satırındaki ülke metni popüler hedefle eşleşiyor mu */
export function firmMatchesPopular(firm: FirmRow, popularId: string): boolean {
  const keys = firmCountryKeys(firm);
  const want = aliasKeysForPopular(popularId);
  for (const k of keys) {
    for (const w of want) {
      if (k.includes(w) || w.includes(k)) return true;
    }
  }
  return false;
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

/** Bölge + ülke + popüler seçimlerinin birleşimi (OR) */
export function firmMatchesCoverageSelection(
  firm: FirmRow,
  selection: {
    popularIds: string[];
    regionIds: string[];
    countries: string[];
  }
): boolean {
  const { popularIds, regionIds, countries } = selection;
  const hasAny =
    popularIds.length > 0 ||
    regionIds.length > 0 ||
    countries.length > 0;
  if (!hasAny) return true;

  for (const id of popularIds) {
    if (firmMatchesPopular(firm, id)) return true;
  }
  for (const id of regionIds) {
    if (firmMatchesRegion(firm, id)) return true;
  }
  for (const c of countries) {
    if (firmMatchesCountryName(firm, c)) return true;
  }

  return false;
}
