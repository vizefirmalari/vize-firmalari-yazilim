import {
  formatVisaFinanceAmountLine,
  normalizeVisaFinanceCurrency,
} from "@/lib/visa-operations/finance-currency";
import type { VisaCaseFinanceRow } from "@/lib/visa-operations/types";

function toMoneyNumber(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number.parseFloat(String(v));
  return Number.isFinite(n) ? n : null;
}

/**
 * Manuel toplam varsa tek satır + total_fee_currency;
 * yoksa aynı para biriminde ikili toplama; farklıysa iki terim olarak gösterilir.
 */
export function buildFinanceSummaryDisplay(f: VisaCaseFinanceRow | null): string {
  if (!f) return "—";

  const totalExplicit = toMoneyNumber(f.total_fee);
  if (totalExplicit != null) {
    const cur = normalizeVisaFinanceCurrency(f.total_fee_currency);
    return formatVisaFinanceAmountLine(totalExplicit, cur);
  }

  const cf = toMoneyNumber(f.consulate_fee);
  const sf = toMoneyNumber(f.service_fee);
  const curC = normalizeVisaFinanceCurrency(f.consulate_fee_currency);
  const curS = normalizeVisaFinanceCurrency(f.service_fee_currency);

  if (cf != null && sf != null) {
    if (curC === curS) {
      return formatVisaFinanceAmountLine(cf + sf, curC);
    }
    return `${formatVisaFinanceAmountLine(cf, curC)} + ${formatVisaFinanceAmountLine(sf, curS)}`;
  }
  if (cf != null) return formatVisaFinanceAmountLine(cf, curC);
  if (sf != null) return formatVisaFinanceAmountLine(sf, curS);
  return "—";
}
