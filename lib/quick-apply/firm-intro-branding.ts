import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";
import type { FirmRow } from "@/lib/types/firm";

/** Giriş ekranı üst satırı: uzmanlık + hizmet kısa etiketleri (ör. Schengen · Çalışma) */
export function buildQuickApplyExpertiseLine(firm: FirmRow): string | null {
  const spec = SPECIALIZATION_OPTIONS.filter(({ key }) =>
    Boolean((firm as unknown as Record<string, unknown>)[key])
  ).map((s) => s.label);
  const raw =
    Array.isArray(firm.main_services) && firm.main_services.length > 0
      ? firm.main_services
      : firm.services;
  const services = Array.isArray(raw) ? raw : [];
  const merged = [...spec.slice(0, 3), ...services.slice(0, 2)].filter(Boolean) as string[];
  const seen = new Set<string>();
  const uniq: string[] = [];
  for (const x of merged) {
    const t = x.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    uniq.push(t);
  }
  return uniq.length ? uniq.slice(0, 4).join(" · ") : null;
}

/** İkinci bilgi satırı: kısa tanıtım veya kurumsal fallback */
export function buildQuickApplySubtitle(firm: FirmRow): string {
  const short = firm.short_description?.trim();
  if (short && short.length > 0) {
    return short.length > 80 ? `${short.slice(0, 80)}…` : short;
  }
  return "Vize danışmanlık · Güvenli başvuru akışı";
}
