export type FirmPlanType = "free" | "pro" | "business";

const RANK: Record<FirmPlanType, number> = {
  free: 0,
  pro: 1,
  business: 2,
};

export function planRank(plan: FirmPlanType): number {
  return RANK[plan] ?? 0;
}

/**
 * Plan hiyerarşisi: free, pro, business. Panel özellikleri plandan bağımsızdır;
 * görünürlük, sıralama ve promosyon katmanları için kullanılabilir.
 */
export function planMeets(plan: FirmPlanType, min: Exclude<FirmPlanType, "free">): boolean {
  return RANK[plan] >= RANK[min];
}
