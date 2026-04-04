import type { FirmRow, FirmSort } from "@/lib/types/firm";

import type { FirmPlanType } from "./plan-types";

/**
 * Abonelik artık özellik kilidi değil; görünürlük / sıralama / sponsorlu yerleşim için kullanılır.
 * Liste sıralamasında eşit skorlu firmalar arasında son tie-breaker (büyük = önce).
 */
export function planListingTiebreaker(plan: FirmPlanType | undefined): number {
  switch (plan ?? "free") {
    case "business":
      return 2;
    case "pro":
      return 1;
    default:
      return 0;
  }
}

/** Business: sponsorlu / maksimum görünürlük katmanı (UI veya kampanya mantığı). */
export function planHasSponsoredPlacement(plan: FirmPlanType | undefined): boolean {
  return plan === "business";
}

const hypeVal = (x: FirmRow) => x.hype_score ?? x.raw_hype_score * 100;
const mpVal = (x: FirmRow) => x.manual_priority ?? 0;

/**
 * Varsayılan liste sıralamalarında (kurumsallık / hype eşitliği) plan katmanını tie-breaker olarak uygular.
 */
export function compareFirmRowsWithPlanVisibility(
  a: FirmRow,
  b: FirmRow,
  sort: Extract<FirmSort, "hype_desc" | "hype_score_desc" | "corp_desc">
): number {
  if (sort === "corp_desc") {
    const d = b.corporateness_score - a.corporateness_score;
    if (d !== 0) return d;
    return planListingTiebreaker(b.subscription_plan) - planListingTiebreaker(a.subscription_plan);
  }
  if (sort === "hype_score_desc") {
    const d = hypeVal(b) - hypeVal(a);
    if (d !== 0) return d;
    return planListingTiebreaker(b.subscription_plan) - planListingTiebreaker(a.subscription_plan);
  }
  if (b.corporateness_score !== a.corporateness_score) {
    return b.corporateness_score - a.corporateness_score;
  }
  const hb = hypeVal(b);
  const ha = hypeVal(a);
  if (hb !== ha) return hb - ha;
  const mpd = mpVal(b) - mpVal(a);
  if (mpd !== 0) return mpd;
  return planListingTiebreaker(b.subscription_plan) - planListingTiebreaker(a.subscription_plan);
}
