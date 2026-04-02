import { normalizeCountryKey } from "@/lib/firma/coverage-catalog";
import { VISA_REGION_LABEL } from "@/lib/visa-regions/tokens";

/** Filtre “ülke” listesinde gösterilmemesi gereken coğrafi / bölgesel sabitler (normalize anahtar) */
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
  "amerika",
  "guneyamerika",
  "kuzeyamerika",
  "ortadoguulkeleri",
  "dunya",
  "kuresel",
]);

/**
 * Bölge motoru etiketleriyle çakışan ama ülke listesinde olmaması gereken girişler.
 * İngiltere, Kanada, ABD, Avustralya gibi hem ülke hem bölge kartında geçen adlar
 * burada YOK — ülke filtresinde gösterilmeleri gerekir.
 */
const VISA_REGION_ONLY_LABEL_KEYS = new Set<string>([
  normalizeCountryKey(VISA_REGION_LABEL.schengen),
  normalizeCountryKey(VISA_REGION_LABEL.uae),
  normalizeCountryKey(VISA_REGION_LABEL.asia),
  normalizeCountryKey(VISA_REGION_LABEL.africa),
]);

function looksLikeBlockedContinent(k: string): boolean {
  if (BLOCKED_COUNTRY_KEYS.has(k)) return true;
  if (VISA_REGION_ONLY_LABEL_KEYS.has(k)) return true;
  if (k.includes("schengen") && k.includes("bolgesi")) return true;
  if (k.includes("avrupa") && k.includes("birligi")) return true;
  if (k === "ab" || k === "eu") return true;
  return false;
}

/**
 * CMS + firmalardan gelen ham isim listesinden filtre paneli “ülke” listesini üretir.
 * Kıta / bölge / vize bölgesi etiketleri çıkarılır (bunlar bölgeler sekmesinde).
 */
export function filterCountryNamesForListing(names: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of names) {
    const name = raw?.trim();
    if (!name) continue;
    const k = normalizeCountryKey(name);
    if (!k || seen.has(k)) continue;
    if (looksLikeBlockedContinent(k)) continue;
    seen.add(k);
    out.push(name);
  }
  return out.sort((a, b) => a.localeCompare(b, "tr"));
}
