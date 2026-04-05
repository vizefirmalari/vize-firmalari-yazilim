/**
 * Keşfet eşleştirmesi için metin normalizasyonu (Türkçe uyumlu, tire/boşluk).
 */
export function normalizeExploreText(raw: string): string {
  const s = raw
    .trim()
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  return s
    .replace(/[_/]+/g, " ")
    .replace(/[^a-z0-9ğüşöçıı\s-]+/gi, " ")
    .replace(/[\s-]+/g, " ")
    .trim();
}

/**
 * Birleşik services / ana / alt hizmet etiketleri için liste normalizasyonu.
 */
export function normalizeServiceLabel(label: string): string {
  return normalizeExploreText(label);
}

export function normalizeExploreTokenList(labels: string[] | null | undefined): string[] {
  if (!Array.isArray(labels)) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of labels) {
    const n = normalizeExploreText(String(raw ?? ""));
    if (n && !seen.has(n)) {
      seen.add(n);
      out.push(n);
    }
  }
  return out;
}
