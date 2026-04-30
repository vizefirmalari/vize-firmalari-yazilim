/**
 * Kullanıcı sorgusunu eş anlamlı / yaygın yazım varyantlarıyla zenginleştirir.
 * Keşfet landing verisi (EXPLORE_CATEGORIES) değiştirilmez — yalnızca arama iğnesi çoğaltılır.
 */

/** SEO canonical: trim, boşluk, Türkçe küçük harf */
export function canonicalizeSearchQueryForSeo(raw: string): string {
  const t = raw.trim().replace(/\s+/g, " ");
  if (!t) return "";
  return t.toLocaleLowerCase("tr");
}

/**
 * İç eşleşme için sorguyu sırayla yerel kural dizisinden geçirir (küçük harf).
 */
function expandQueryLower(lower: string): string {
  return lower
    .replace(/\bamerika\b/gi, "abd")
    .replace(/\bunited states\b/g, "abd")
    .replace(/\bingiltere vizesi\b/g, "ingiltere")
    .replace(/\bgreen card\b/g, "green card başvuruları")
    .replace(/\bwork permit\b/g, "çalışma izni")
    .replace(/\bvisa refusal\b/g, "ret")
    .replace(/\bfamily reunion\b/g, "aile birleşimi")
    .replace(/\bskilled worker\b/g, "nitelikli işçi")
    .replace(/\bfreelancer\b/g, "serbest çalışma")
    .replace(/\bstartup\b/g, "girişimci vizesi")
    .replace(/\bgolden visa\b/g, "yatırım yoluyla oturum")
    .replace(/\bd tipi\b/g, "uzun dönemli")
    .replace(/\bred sonrası\b/g, "itiraz")
    .replace(/\bret sonrası\b/g, "itiraz")
    .replace(/\bogrencı\b/g, "öğrenci")
    .replace(/\bogrenci\b/g, "öğrenci")
    .replace(/\bhemsire\b/g, "hemşirelik")
    .replace(/\bhemsi̇re\b/g, "hemşirelik")
    .replace(/\bhemşire\b/g, "hemşirelik")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Hem orijinal hem genişletilmiş iğne seti — `firmMatchesAramaQuery` vb. için.
 */
export function collectMatchNeedles(rawQuery: string): string[] {
  const base = rawQuery.trim().replace(/\s+/g, " ");
  if (!base || base.length < 2) return [];

  const set = new Set<string>();
  const add = (s: string) => {
    const t = s.trim().replace(/\s+/g, " ");
    if (t.length >= 2) set.add(t);
  };

  add(base);

  const low = base.toLocaleLowerCase("tr");
  add(low);

  add(expandQueryLower(low));

  const latinish = expandQueryLower(
    base
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLocaleLowerCase("tr")
  );
  if (latinish !== expandQueryLower(low)) add(latinish);

  return Array.from(set);
}

export function normalizeForRankingCompare(s: string): string {
  return canonicalizeSearchQueryForSeo(s);
}
