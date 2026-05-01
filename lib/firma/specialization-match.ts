import type { FirmRow } from "@/lib/types/firm";
import {
  RESERVED_SPECIALIZATION_SLUGS,
  SPECIALIZATION_ORDER,
  specializationKeyFromLabel,
  type SpecializationKey,
} from "@/lib/constants/firm-specializations";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * URL / filtre parametresinden uzmanlık anahtarı veya özel taxonomy slug'ı türetir.
 * Geçersiz girdiler elenir (eski davranışta `as SpecializationKey` sızıntısı olabiliyordu).
 */
export function normalizeSpecializationFilterToken(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  const fromLabel = specializationKeyFromLabel(t);
  if (fromLabel) return fromLabel;
  if (RESERVED_SPECIALIZATION_SLUGS.has(t)) return t;
  const lower = t.toLowerCase();
  if (SLUG_RE.test(lower)) return lower;
  return null;
}

function firmHasBuiltinKey(firm: FirmRow, key: SpecializationKey): boolean {
  return Boolean((firm as unknown as Record<string, unknown>)[key]);
}

function firmHasCustomSlug(firm: FirmRow, slug: string): boolean {
  const list = firm.custom_specializations;
  if (!Array.isArray(list)) return false;
  return list.some((c) => c.slug === slug);
}

/** Tek bir filtre değeri (builtin anahtar veya özel slug) firmada var mı? */
export function firmMatchesOneSpecializationToken(firm: FirmRow, token: string): boolean {
  const normalized = normalizeSpecializationFilterToken(token);
  if (!normalized) return false;
  if (RESERVED_SPECIALIZATION_SLUGS.has(normalized)) {
    return firmHasBuiltinKey(firm, normalized as SpecializationKey);
  }
  return firmHasCustomSlug(firm, normalized);
}

/**
 * Seçilen uzmanlıklardan en az biri firmada ise true (OR).
 * `getFirms` ve liste paneli aynı mantığı kullanır.
 */
export function firmMatchesSpecializationFilterTokens(
  firm: FirmRow,
  tokens: string[]
): boolean {
  if (!tokens.length) return true;
  return tokens.some((tok) => firmMatchesOneSpecializationToken(firm, tok));
}

/** `normalizeSpecializationFilterToken` sonrası builtin mi (boolean sütun)? */
export function isBuiltinSpecializationKey(s: string): s is SpecializationKey {
  return SPECIALIZATION_ORDER.includes(s as SpecializationKey);
}
