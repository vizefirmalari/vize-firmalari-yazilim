/**
 * İşini Büyüt havale bilgileri.
 * Üretimde `GROWTH_PAYMENT_*` env ile ezilir; env yoksa platform varsayılanı kullanılır (firma paneli boş kalmasın).
 */
const PLATFORM_GROWTH_PAYMENT_DEFAULTS = {
  iban: "TR850006701000000055445417",
  bankName: "Yapı Kredi",
  accountHolder: "Bugra Keser",
} as const;

export type GrowthPaymentBankInfo = {
  iban: string;
  accountHolder: string;
  bankName: string;
};

export function getGrowthPaymentBankInfo(): GrowthPaymentBankInfo {
  return {
    iban: process.env.GROWTH_PAYMENT_IBAN?.trim() || PLATFORM_GROWTH_PAYMENT_DEFAULTS.iban,
    accountHolder:
      process.env.GROWTH_PAYMENT_ACCOUNT_HOLDER?.trim() || PLATFORM_GROWTH_PAYMENT_DEFAULTS.accountHolder,
    bankName: process.env.GROWTH_PAYMENT_BANK_NAME?.trim() || PLATFORM_GROWTH_PAYMENT_DEFAULTS.bankName,
  };
}
