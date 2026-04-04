/**
 * Havale bilgileri — üretimde env ile doldurulmalıdır.
 */
export function getGrowthPaymentBankInfo(): {
  iban: string | null;
  accountHolder: string | null;
  bankName: string | null;
} {
  return {
    iban: process.env.GROWTH_PAYMENT_IBAN?.trim() || null,
    accountHolder: process.env.GROWTH_PAYMENT_ACCOUNT_HOLDER?.trim() || null,
    bankName: process.env.GROWTH_PAYMENT_BANK_NAME?.trim() || null,
  };
}
