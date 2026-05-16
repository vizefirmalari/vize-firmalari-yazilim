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

export const SERVICE_STOREFRONT_IMAGE_MAX_BYTES = 4 * 1024 * 1024;

export const SERVICE_STOREFRONT_IMAGE_HINT = "Öneri: 1080×1080 veya 1200×1200 px kare (JPG, PNG, WebP · en fazla 4 MB; canlı ortamda tek istek sınırına uyar).";

/** Server Action / ağ hatalarında kullanıcıya okunur mesaj. */
export function serviceStorefrontBundleFailureMessage(err: unknown, dev?: boolean): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg === "UPLOAD_TIMEOUT" || msg === "TIMEOUT") {
    return "İşlem zaman aşımına uğradı. Bağlantınızı kontrol edip daha küçük görsellerle tekrar deneyin.";
  }
  const low = msg.toLowerCase();
  const looksTooLarge =
    (low.includes("body") && (low.includes("limit") || low.includes("exceeded") || low.includes("too large"))) ||
    low.includes("payload too large") ||
    low.includes("request entity too large") ||
    low.includes("max body") ||
    low.includes("413");
  if (looksTooLarge) {
    return "Gönderilen veri boyutu sunucu sınırını aştı (canlıda genelde istek başına ~4,5 MB). Görselleri sıkıştırın veya en fazla 4 MB seçin; ardından tekrar deneyin.";
  }
  if (dev && msg.length > 0 && msg !== "[object Object]") {
    return `Kayıt tamamlanamadı (${msg}).`;
  }
  return "Kayıt sırasında beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse görsellerin boyutunu ve sayısını azaltın.";
}

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
