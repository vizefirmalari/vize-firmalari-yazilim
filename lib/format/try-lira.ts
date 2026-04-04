/** Tam TL tutarlarını gösterim için biçimlendirir (DB integer). */
export function formatTryLira(amount: number | null | undefined): string | null {
  if (amount == null) return null;
  return `${amount.toLocaleString("tr-TR")} ₺`;
}

export function growthPriceLineFromSnapshots(
  setup: number | null | undefined,
  monthly: number | null | undefined
): string {
  const s = formatTryLira(setup ?? null);
  const m = formatTryLira(monthly ?? null);
  if (!s && !m) return "Teklif üzerinden";
  if (s && m) return `Kurulum ${s} · Aylık ${m}`;
  if (s) return `Kurulum ${s}`;
  return `Aylık ${m!}`;
}
