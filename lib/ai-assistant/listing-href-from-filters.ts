import { normalizeSpecializationFilterToken } from "@/lib/firma/specialization-match";

const MAX_SEGMENTS = 12;
const MAX_SEGMENT_LEN = 96;
const MAX_QUERY_LEN = 1800;

function coerceStringArray(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v
      .filter((x): x is string => typeof x === "string")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function coerceSingleString(v: unknown): string[] {
  if (typeof v === "string" && v.trim()) return [v.trim()];
  return [];
}

/** Güvenli filtre segmenti: çok uzun / kontrol karakterli değerleri atar. */
function sanitizeSegments(raw: string[]): string[] {
  const out: string[] = [];
  for (const s of raw) {
    const t = s.trim();
    if (!t || t.length > MAX_SEGMENT_LEN) continue;
    if (/[<>]|[\x00-\x1f]/.test(t)) continue;
    out.push(t);
    if (out.length >= MAX_SEGMENTS) break;
  }
  return out;
}

/**
 * `ai_assistant_requests.filters` JSON'undan ana sayfa firma listesi URL'i üretir.
 * Üretilemeyen / şüpheli durumda `/#firmalar` döner (mevcut anchor ile liste bölümü).
 */
export function buildHomeFirmsListingHrefFromAiRequestFilters(
  filters: unknown
): string {
  if (filters == null || typeof filters !== "object" || Array.isArray(filters)) {
    return "/#firmalar";
  }

  const o = filters as Record<string, unknown>;
  const countries = sanitizeSegments([
    ...coerceStringArray(o.countries),
    ...coerceSingleString(o.country),
  ]);
  const regions = sanitizeSegments([
    ...coerceStringArray(o.regions),
    ...coerceStringArray(o.visa_regions),
    ...coerceSingleString(o.region),
  ]);
  const visaRaw = [
    ...coerceStringArray(o.visaTypes),
    ...coerceStringArray(o.visa_types),
    ...coerceStringArray(o.visaType),
  ];

  const sp = new URLSearchParams();
  if (countries.length) sp.set("countries", countries.join(","));
  if (regions.length) sp.set("regions", regions.join(","));

  const visaKeys = new Set<string>();
  for (const v of visaRaw) {
    const n = normalizeSpecializationFilterToken(v);
    if (n) visaKeys.add(n);
  }
  if (visaKeys.size) sp.set("visaTypes", [...visaKeys].join(","));

  const hedef =
    typeof o.hedef === "string"
      ? o.hedef.trim()
      : typeof o.exploreFocusSlug === "string"
        ? o.exploreFocusSlug.trim()
        : "";
  if (hedef && hedef.length <= 64 && !/[<>]|[\x00-\x1f]/.test(hedef)) {
    sp.set("hedef", hedef);
  }

  const qs = sp.toString();
  if (!qs) return "/#firmalar";
  if (qs.length > MAX_QUERY_LEN) return "/#firmalar";
  return `/?${qs}#firmalar`;
}
