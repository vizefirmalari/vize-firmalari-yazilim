import type { BadgeVariant } from "./types";

/** Veritabanı ve UI ile birebir aynı sıra kullanılacak tek kaynaklı durum kümesi */
export const VISA_CASE_STATUSES = [
  "hazırlanıyor",
  "randevu_alındı",
  "konsoloslukta",
  "pasaport_teslim",
  "vize_çıktı",
  "red",
] as const;

export type VisaCaseStatus = (typeof VISA_CASE_STATUSES)[number];

export const VISA_CASE_STATUS_LABELS: Record<VisaCaseStatus, string> = {
  hazırlanıyor: "Hazırlanıyor",
  randevu_alındı: "Randevu alındı",
  konsoloslukta: "Konsoloslukta",
  pasaport_teslim: "Pasaport teslim",
  vize_çıktı: "Vize çıktı",
  red: "Red",
};

export const VISA_CASE_STATUS_MAIL_SUBJECT_KEYS: Record<VisaCaseStatus, string> = {
  hazırlanıyor: "Başvurunuz hazırlanıyor",
  randevu_alındı: "Randevunuz alındı",
  konsoloslukta: "Dosyanız konsoloslukta",
  pasaport_teslim: "Pasaport teslim aşamasında",
  vize_çıktı: "Vizeniz çıktı",
  red: "Başvurunuz red oldu",
};

/**
 * Liste ve pipeline görünümü için sabit sıra (ilerleme mantığı için index tabanlı).
 */
export function compareVisaCaseStatusOrder(a: string, b: string): number {
  const ia = VISA_CASE_STATUSES.indexOf(a as VisaCaseStatus);
  const ib = VISA_CASE_STATUSES.indexOf(b as VisaCaseStatus);
  const sa = ia === -1 ? 999 : ia;
  const sb = ib === -1 ? 999 : ib;
  return sa - sb;
}

export function isValidVisaCaseStatus(v: unknown): v is VisaCaseStatus {
  return typeof v === "string" && (VISA_CASE_STATUSES as readonly string[]).includes(v);
}

/**
 * Badge görünümü — yalnızca mecut palet (#0B3C5D, nötr yüzey, #D9A441 vurgu).
 */
export const VISA_CASE_STATUS_VARIANT: Record<VisaCaseStatus, BadgeVariant> = {
  hazırlanıyor: "neutral",
  randevu_alındı: "info",
  konsoloslukta: "info",
  pasaport_teslim: "warning",
  vize_çıktı: "success",
  red: "danger",
};
