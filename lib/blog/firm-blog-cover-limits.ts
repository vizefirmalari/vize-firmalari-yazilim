/** Blog kapak yüklemesi: Server Action gövdesi ve doğrulama ile uyumlu tutulmalıdır. */
export const FIRM_BLOG_COVER_MAX_BYTES = 8 * 1024 * 1024;
export const FIRM_BLOG_COVER_MAX_MB = 8;

/** İstemci: Server Action yükleme hataları (timeout, gövde sınırı vb.) için okunabilir mesaj. */
export function firmBlogCoverUploadFailureMessage(err: unknown, dev?: boolean): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg === "UPLOAD_TIMEOUT" || msg === "TIMEOUT") {
    return "Yükleme zaman aşımına uğradı. Bağlantınızı kontrol edip tekrar deneyin veya daha küçük bir dosya seçin.";
  }
  const low = msg.toLowerCase();
  const looksTooLarge =
    (low.includes("body") && (low.includes("limit") || low.includes("exceeded") || low.includes("too large"))) ||
    low.includes("payload too large") ||
    low.includes("request entity too large") ||
    low.includes("max body") ||
    low.includes("413");
  if (looksTooLarge) {
    return `Dosya gönderim boyutu çok yüksek. Kapak görselini sıkıştırın veya daha küçük bir JPG/WebP seçin (en fazla yaklaşık ${FIRM_BLOG_COVER_MAX_MB} MB).`;
  }
  if (dev && msg.length > 0 && msg !== "[object Object]") {
    return `Görsel yüklenemedi (${msg}). Daha küçük bir JPG/WebP ile tekrar deneyin.`;
  }
  return "Görsel yüklenemedi. Daha küçük bir JPG veya WebP ile tekrar deneyin; sorun sürerse sayfayı yenileyip oturumu kontrol edin.";
}
