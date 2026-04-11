/** Arama eşlemesi: boşluk sadeleştirme + TR küçük harf */
export function normalizeSearchText(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** ASCII katmanı — “ogrenci” ↔ “öğrenci” yakınlığı için ikinci kanal */
export function foldAsciiLower(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function textMatchesQuery(haystack: string, queryRaw: string): boolean {
  const q = normalizeSearchText(queryRaw);
  if (!q) return true;
  const h = normalizeSearchText(haystack);
  if (!h) return false;
  if (h.includes(q) || h.startsWith(q)) return true;
  const qa = foldAsciiLower(queryRaw);
  const ha = foldAsciiLower(haystack);
  if (!qa) return true;
  return ha.includes(qa) || ha.startsWith(qa);
}
