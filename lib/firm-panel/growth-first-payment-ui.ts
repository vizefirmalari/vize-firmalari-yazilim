export type GrowthServiceMiniForPayment = {
  setup_price: number | null;
  monthly_price: number | null;
  is_custom_price: boolean;
};

function nonNegativeAmount(n: number | null | undefined): number {
  if (n == null || !Number.isFinite(n)) return 0;
  return Math.max(0, n);
}

/**
 * Havale ilk transferinde kullanıcıya gösterilecek tutar özeti (yalnızca UI).
 * Kurallar: özel fiyat → tutar hesaplanmaz; aksi halde kurulum + (varsa) ilk aylık toplanır.
 */
export function computeGrowthFirstPaymentUi(service: GrowthServiceMiniForPayment) {
  if (service.is_custom_price) {
    return { mode: "custom" as const };
  }
  const setup = nonNegativeAmount(service.setup_price);
  const monthly = nonNegativeAmount(service.monthly_price);
  const firstPaymentTotal = setup + monthly;
  return {
    mode: "numeric" as const,
    setup,
    monthly,
    firstPaymentTotal,
    hasSetup: setup > 0,
    hasMonthly: monthly > 0,
  };
}
