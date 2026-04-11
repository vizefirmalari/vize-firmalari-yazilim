import { COUNTRY_FILTER_CATALOG } from "@/lib/constants/country-filter-catalog";
import { normalizeCountryKey } from "@/lib/firma/coverage-catalog";
import { VISA_REGION_LABEL } from "@/lib/visa-regions/tokens";

/** Filtre “ülke” listesinde gösterilmemesi gereken kıta / meta coğrafya anahtarları (normalize). */
const BLOCKED_COUNTRY_KEYS = new Set<string>([
  "afrika",
  "kuzeyamerika",
  "guneyamerika",
  "latinulkeleri",
  "latinamerika",
  "ortadogu",
  "uzakdoguasya",
  "uzakdogu",
  "asya",
  "avrupa",
  "avrupaschengenharic",
  "okyanusya",
  "schengenbolgesi",
  "schengen",
  "arapyarimadasi",
  "ortadoguulkeleri",
  "dunya",
  "kuresel",
]);

/**
 * Bölge motoru etiketleriyle çakışan; “ülke” checkbox listesinde olmaması gereken girişler.
 * (Ülke adı olan Amerika, Kanada, İngiltere, Avustralya burada yok — filtrede kalmalıdır.)
 */
const VISA_REGION_ONLY_LABEL_KEYS = new Set<string>([
  normalizeCountryKey(VISA_REGION_LABEL.schengen),
  normalizeCountryKey(VISA_REGION_LABEL.uae),
  normalizeCountryKey(VISA_REGION_LABEL.asia),
  normalizeCountryKey(VISA_REGION_LABEL.africa),
]);

/** Şehir / alt bölge / bölge taslakları — normalize anahtar */
const BLOCKED_SUBSTATE_OR_CITY_KEYS = new Set<string>([
  "dubai",
  "dubaibae",
  "galler",
  "wales",
  "iskocya",
  "scotland",
  "kuzeyirlanda",
  "northernireland",
]);

const BLOCKED_RAW_SUBSTRINGS = [
  "schengen dışı",
  "schengen disi",
  "avrupa (schengen",
  "uzak doğu",
  "uzak dogu",
  "dubai (bae)",
  "dubai / bae",
] as const;

function looksLikeBlockedContinent(k: string): boolean {
  if (BLOCKED_COUNTRY_KEYS.has(k)) return true;
  if (VISA_REGION_ONLY_LABEL_KEYS.has(k)) return true;
  if (BLOCKED_SUBSTATE_OR_CITY_KEYS.has(k)) return true;
  if (k.includes("schengen") && k.includes("bolgesi")) return true;
  if (k.includes("avrupa") && k.includes("birligi")) return true;
  if (k === "ab" || k === "eu") return true;
  return false;
}

function rawFragmentBlocked(name: string): boolean {
  const t = name.trim().toLowerCase();
  for (const f of BLOCKED_RAW_SUBSTRINGS) {
    if (t.includes(f)) return true;
  }
  if (t === "dubai") return true;
  if (t.includes("dubai") && !t.includes("emirlik") && !t.includes("arap")) return true;
  return false;
}

/**
 * CMS + firmalardan gelen ham isim listesinden filtre paneli “ülke” listesini üretir.
 * Kıta / bölge / vize bölgesi / şehir-altı etiketleri çıkarılır (bunlar “Bölgeler” bölümünde).
 */
export function filterCountryNamesForListing(names: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of names) {
    const name = raw?.trim();
    if (!name) continue;
    if (rawFragmentBlocked(name)) continue;
    const k = normalizeCountryKey(name);
    if (!k || seen.has(k)) continue;
    if (looksLikeBlockedContinent(k)) continue;
    seen.add(k);
    out.push(name);
  }
  return out.sort((a, b) => a.localeCompare(b, "tr"));
}

/**
 * CMS + firmalardan gelen birleşik liste + tam ülke kataloğu.
 * Mevcut eşleşme stringleri korunur (chip / URL değeri aynı kalır); yalnızca eksik ülkeler eklenir.
 */
export function buildUnifiedCountryFilterList(mergedNames: string[]): string[] {
  const cleaned = filterCountryNamesForListing(mergedNames);
  const byKey = new Map<string, string>();
  for (const label of cleaned) {
    const k = normalizeCountryKey(label);
    if (!byKey.has(k)) byKey.set(k, label);
  }
  for (const label of COUNTRY_FILTER_CATALOG) {
    const k = normalizeCountryKey(label);
    if (!byKey.has(k)) byKey.set(k, label);
  }
  return [...byKey.values()].sort((a, b) => a.localeCompare(b, "tr"));
}
