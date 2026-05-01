/** YYYY-MM-DD karşılaştırması; saat dilimi kayması yok. */
export function compareIsoDateOnly(a: string, b: string): number {
  return a.localeCompare(b);
}

/** İki uç dahil gün sayısı (aynı gün = 1). */
export function inclusiveDaysBetween(startIso: string, endIso: string): number {
  const [ys, ms, ds] = startIso.slice(0, 10).split("-").map(Number);
  const [ye, me, de] = endIso.slice(0, 10).split("-").map(Number);
  const t0 = Date.UTC(ys, ms - 1, ds);
  const t1 = Date.UTC(ye, me - 1, de);
  return Math.floor((t1 - t0) / 86400000) + 1;
}

export function isValidIsoDateOnly(s: string | null | undefined): boolean {
  if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}
