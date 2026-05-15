export const SERVICE_STOREFRONT_DEFAULT_CATEGORIES = [
  "Reklam & Müşteri Kazanımı",
  "Yapay Zeka & Otomasyon",
  "Web & Yazılım",
  "İçerik & Medya",
  "Premium Sistemler",
  "Akıllı Paketler",
] as const;

export const SERVICE_STOREFRONT_CURRENCIES = ["TRY", "EUR", "USD", "GBP"] as const;

export type ServiceStorefrontCurrency = (typeof SERVICE_STOREFRONT_CURRENCIES)[number];

export const SERVICE_STOREFRONT_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export const SERVICE_STOREFRONT_IMAGE_HINT = "Öneri: 1080×1080 veya 1200×1200 px kare (JPG, PNG, WebP · en fazla 5 MB).";

export function parseServiceStorefrontTags(text: string): string[] {
  return text
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 40);
}

export function parseServiceStorefrontSecondaryKeywords(text: string): string[] {
  return text
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 30);
}

export function serviceStorefrontNumOrNull(v: string): number | null {
  const t = v.trim();
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : null;
}
