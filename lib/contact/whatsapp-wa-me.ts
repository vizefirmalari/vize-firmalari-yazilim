/**
 * Firma kaydındaki WhatsApp metninden wa.me için uluslararası rakam dizisi üretir.
 * TR için 0 / 5xx / +90 varyantlarını destekler; wa.me veya api.whatsapp.com linki varsa oradan okur.
 */
export function parseWhatsappDigitsForWaMe(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;

  const waMatch = t.match(/(?:https?:\/\/)?(?:www\.)?wa\.me\/(\d+)/i);
  if (waMatch?.[1]) return waMatch[1];

  const apiMatch = t.match(/(?:api\.)?whatsapp\.com\/send\?[^#]*phone=(\d+)/i);
  if (apiMatch?.[1]) return apiMatch[1];

  const digits = t.replace(/\D/g, "");
  if (!digits) return null;

  if (digits.startsWith("90") && digits.length >= 12) return digits;
  if (digits.startsWith("0") && digits.length >= 11 && digits[1] === "5") {
    return `90${digits.slice(1)}`;
  }
  if (digits.length === 10 && digits.startsWith("5")) {
    return `90${digits}`;
  }
  if (digits.length >= 8 && digits.length <= 15) return digits;

  return null;
}

export function buildWhatsappWaMeUrl(raw: string): string | null {
  const d = parseWhatsappDigitsForWaMe(raw);
  if (!d) return null;
  return `https://wa.me/${d}`;
}
