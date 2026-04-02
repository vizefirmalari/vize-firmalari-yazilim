/**
 * Tek tip anahtar üretimi: alias eşleştirme ve set aramaları için.
 * Türkçe yerel büyük/küçük harf ve yaygın diakritik sadeleştirmesi.
 */
export function normalizeVisaLabelKey(input: string): string {
  const trimmed = input
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, "");
  if (!trimmed) return "";
  return trimmed
    .toLocaleLowerCase("tr")
    .normalize("NFC")
    .replace(/[ç]/g, "c")
    .replace(/[ğ]/g, "g")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ş]/g, "s")
    .replace(/[ü]/g, "u")
    .replace(/[^a-z0-9]+/g, "");
}
