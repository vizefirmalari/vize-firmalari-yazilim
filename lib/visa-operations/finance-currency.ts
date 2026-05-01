export const VISA_FINANCE_CURRENCIES = ["TRY", "EUR", "USD", "GBP"] as const;

export type VisaFinanceCurrency = (typeof VISA_FINANCE_CURRENCIES)[number];

/** Select seçenek metinleri — mevcut panel dilinde */
export const VISA_FINANCE_CURRENCY_SELECT_LABELS: Record<VisaFinanceCurrency, string> = {
  TRY: "₺ TRY",
  EUR: "€ EUR",
  USD: "$ USD",
  GBP: "£ GBP",
};

export function isValidVisaFinanceCurrency(v: unknown): v is VisaFinanceCurrency {
  return typeof v === "string" && (VISA_FINANCE_CURRENCIES as readonly string[]).includes(v.trim().toUpperCase());
}

export function normalizeVisaFinanceCurrency(v: unknown): VisaFinanceCurrency {
  if (typeof v !== "string") return "TRY";
  const up = v.trim().toUpperCase();
  return isValidVisaFinanceCurrency(up) ? up : "TRY";
}

/** Özet/liste için: rakam biçimi + kod (kur yok). */
export function formatVisaFinanceAmountLine(amount: number, currency: VisaFinanceCurrency): string {
  const n = amount.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  return `${n} ${currency}`;
}
