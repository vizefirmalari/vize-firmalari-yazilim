/**
 * Birikimli `hype_score` (bigint) öncelikli; yoksa eski `raw_hype_score` (0–100) ×100 ile uyum.
 */
export function resolveHypeBigintFromRow(row: Record<string, unknown>): bigint {
  const hs = row.hype_score;
  const zero = BigInt(0);
  if (typeof hs === "bigint" && hs > zero) return hs;
  if (typeof hs === "string" && /^\d+$/.test(hs)) {
    const b = BigInt(hs);
    if (b > zero) return b;
  }
  if (typeof hs === "number" && Number.isFinite(hs) && hs > 0) {
    return BigInt(Math.round(hs));
  }
  const raw = Number(row.raw_hype_score ?? 0);
  if (Number.isFinite(raw) && raw > 0) {
    return BigInt(Math.round(raw * 100));
  }
  return BigInt(0);
}
