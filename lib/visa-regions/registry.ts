import type { VisaRegionToken } from "./tokens";
import { normalizeVisaLabelKey } from "./normalize";

/**
 * Schengen üyesi veya üyesi sayılan ülkeler (İrlanda hariç; Romanya/ Bulgaristan
 * tam kara sınırı Schengen’e dahil değil — yanlış “Schengen” etiketi için dışarıda).
 * Anahtarlar normalizeVisaLabelKey ile eşleşir.
 */
const SCHENGEN_COUNTRY_KEYS = new Set<string>([
  "almanya",
  "germany",
  "deutschland",
  "fransa",
  "france",
  "italya",
  "italy",
  "italia",
  "ispanya",
  "spain",
  "hollanda",
  "netherlands",
  "holland",
  "thenetherlands",
  "belcika",
  "belgium",
  "avusturya",
  "austria",
  "portekiz",
  "portugal",
  "yunanistan",
  "greece",
  "polonya",
  "poland",
  "isvec",
  "sweden",
  "norvec",
  "norway",
  "danimarka",
  "denmark",
  "finlandiya",
  "finland",
  "cekya",
  "cekcumhuriyeti",
  "czechrepublic",
  "czechia",
  "czech",
  "slovakya",
  "slovakia",
  "slovenya",
  "slovenia",
  "macaristan",
  "hungary",
  "estonya",
  "estonia",
  "letonya",
  "latvia",
  "litvanya",
  "lithuania",
  "luksemburg",
  "luxembourg",
  "malta",
  "hirvatistan",
  "croatia",
  "isvicre",
  "switzerland",
  "schweiz",
  "suisse",
  "izlanda",
  "iceland",
  "lihtenstayn",
  "liechtenstein",
]);

/** Alias → tek token (ülke / bölge adı varyasyonları) */
const ALIAS_TO_TOKEN_RAW: Record<string, VisaRegionToken> = {
  // ——— ABD ———
  amerika: "usa",
  abd: "usa",
  usa: "usa",
  unitedstates: "usa",
  unitedstatesofamerica: "usa",
  us: "usa",
  america: "usa",
  // ——— Kanada ———
  kanada: "canada",
  canada: "canada",
  // ——— İngiltere / UK (İskoçya, Galler, K.İrlanda dahil) ———
  ingiltere: "uk",
  england: "uk",
  birlesikkrallik: "uk",
  unitedkingdom: "uk",
  uk: "uk",
  greatbritain: "uk",
  britain: "uk",
  iskocya: "uk",
  scotland: "uk",
  galler: "uk",
  wales: "uk",
  kuzeyirlanda: "uk",
  northernireland: "uk",
  // ——— BAE / Dubai ———
  dubai: "uae",
  bae: "uae",
  uae: "uae",
  birlesikarapemirlikleri: "uae",
  unitedarabemirates: "uae",
  emirates: "uae",
  // ——— Avustralya ———
  avustralya: "australia",
  australia: "australia",
  // ——— Asya (seçilmiş ülkeler) ———
  cin: "asia",
  china: "asia",
  japonya: "asia",
  japan: "asia",
  guneykore: "asia",
  southkorea: "asia",
  kore: "asia",
  singapur: "asia",
  singapore: "asia",
  tayland: "asia",
  thailand: "asia",
  malezya: "asia",
  malaysia: "asia",
  endonezya: "asia",
  indonesia: "asia",
  vietnam: "asia",
  hindistan: "asia",
  india: "asia",
  pakistan: "asia",
  // ——— Afrika (seçilmiş ülkeler) ———
  guneyafrika: "africa",
  southafrica: "africa",
  misir: "africa",
  egypt: "africa",
  fas: "africa",
  morocco: "africa",
  kenya: "africa",
  // ——— Doğrudan bölge/metin (eski veri uyumu) ———
  schengen: "schengen",
  schengenbolgesi: "schengen",
};

/** “Schengen Bölgesi” vb. tam metinler */
const REGION_PHRASE_TO_TOKEN: Array<{ test: (k: string) => boolean; token: VisaRegionToken }> = [
  { test: (k) => k.includes("schengen"), token: "schengen" },
];

function buildAliasMap(): Map<string, VisaRegionToken> {
  const m = new Map<string, VisaRegionToken>();
  for (const [raw, token] of Object.entries(ALIAS_TO_TOKEN_RAW)) {
    const k = normalizeVisaLabelKey(raw);
    if (k) m.set(k, token);
  }
  return m;
}

function dedupeAliasMap(m: Map<string, VisaRegionToken>): Map<string, VisaRegionToken> {
  const out = new Map<string, VisaRegionToken>();
  for (const [k, v] of m) {
    if (!out.has(k)) out.set(k, v);
  }
  return out;
}

export const ALIAS_TO_TOKEN = dedupeAliasMap(buildAliasMap());

export function tokenForNormalizedKey(key: string): VisaRegionToken | null {
  if (!key) return null;

  const direct = ALIAS_TO_TOKEN.get(key);
  if (direct) return direct;

  for (const { test, token } of REGION_PHRASE_TO_TOKEN) {
    if (test(key)) return token;
  }

  if (SCHENGEN_COUNTRY_KEYS.has(key)) return "schengen";

  return null;
}

export function tokensForRawInput(raw: string): VisaRegionToken[] {
  const key = normalizeVisaLabelKey(raw);
  if (!key) return [];

  const t = tokenForNormalizedKey(key);
  if (t) return [t];

  return [];
}
