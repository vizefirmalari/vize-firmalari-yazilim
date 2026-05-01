"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import type { VisaCaseFinanceRow } from "@/lib/visa-operations/types";
import {
  VISA_FINANCE_CURRENCIES,
  VISA_FINANCE_CURRENCY_SELECT_LABELS,
  normalizeVisaFinanceCurrency,
} from "@/lib/visa-operations/finance-currency";
import { buildFinanceSummaryDisplay } from "@/lib/visa-operations/finance-summary";
import {
  VISA_INVOICE_STATUS_LABELS,
  VISA_PAYMENT_STATUS_LABELS,
} from "@/lib/visa-operations/constants";

import { updateVisaCaseFinanceAction } from "@/lib/visa-operations/actions";

const PAY_KEYS = ["bekliyor", "kısmi_ödendi", "ödendi", "iptal"] as const;
const INV_KEYS = ["bekliyor", "kesildi", "gerek_yok"] as const;

type Props = { firmId: string; caseId: string; finance: VisaCaseFinanceRow | null };

const inputClass =
  "min-h-10 flex-1 rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 focus:ring-2";

const selectCurrencyClass =
  "min-h-10 w-full shrink-0 rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-2 py-2 text-sm font-medium text-[#0B3C5D] outline-none ring-[#0B3C5D]/25 focus:ring-2 sm:w-[7.5rem]";

function CurrencySelect(props: {
  name: string;
  defaultCurrency: unknown;
  disabled: boolean;
}) {
  const d = normalizeVisaFinanceCurrency(props.defaultCurrency);
  return (
    <select name={props.name} defaultValue={d} disabled={props.disabled} className={selectCurrencyClass}>
      {VISA_FINANCE_CURRENCIES.map((code) => (
        <option key={code} value={code}>
          {VISA_FINANCE_CURRENCY_SELECT_LABELS[code]}
        </option>
      ))}
    </select>
  );
}

export function FinanceBox({ firmId, caseId, finance }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const f = finance;

  const summaryLine = buildFinanceSummaryDisplay(f);

  return (
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_2px_12px_rgba(11,60,93,0.04)]">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">Finans</h3>
      <p className="mt-1 text-xs text-[#1A1A1A]/50 leading-relaxed">
        Özet: Önce manuel toplam ve para birimi; boşsa konsolosluk + hizmet. Para birimleri aynıysa toplanır;
        farklıysa kur uydurulmadan iki terim olarak gösterilir.
      </p>
      <p className="mt-2 text-sm font-bold text-[#0B3C5D]">Özet tutar: {summaryLine}</p>

      <form
        className="mt-4 grid gap-3 sm:grid-cols-2"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setErr(null);
          setOk(false);
          const fd = new FormData(e.currentTarget);
          fd.set("firmId", firmId);
          fd.set("caseId", caseId);
          start(async () => {
            const r = await updateVisaCaseFinanceAction(fd);
            if (r && "ok" in r && r.ok === false) {
              setErr(r.error);
              return;
            }
            setOk(true);
            router.refresh();
          });
        }}
      >
        <input type="hidden" name="firmId" value={firmId} />
        <input type="hidden" name="caseId" value={caseId} />

        <div className="sm:col-span-2 space-y-4">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Konsolosluk ücreti
            </label>
            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <input
                name="consulateFee"
                disabled={pending}
                defaultValue={f?.consulate_fee ?? ""}
                inputMode="decimal"
                placeholder="0"
                className={inputClass}
              />
              <CurrencySelect name="consulateFeeCurrency" defaultCurrency={f?.consulate_fee_currency} disabled={pending} />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Hizmet ücreti</label>
            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <input
                name="serviceFee"
                disabled={pending}
                defaultValue={f?.service_fee ?? ""}
                inputMode="decimal"
                placeholder="0"
                className={inputClass}
              />
              <CurrencySelect name="serviceFeeCurrency" defaultCurrency={f?.service_fee_currency} disabled={pending} />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Manuel toplam (isteğe bağlı)
            </label>
            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <input
                name="totalFee"
                disabled={pending}
                defaultValue={f?.total_fee ?? ""}
                inputMode="decimal"
                placeholder="Boş bırakırsanız üst iki kalem özete yansır"
                className={inputClass}
              />
              <CurrencySelect name="totalFeeCurrency" defaultCurrency={f?.total_fee_currency} disabled={pending} />
            </div>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Ödeme durumu</label>
          <select
            name="paymentStatus"
            disabled={pending}
            defaultValue={f?.payment_status ?? "bekliyor"}
            className="mt-1 w-full min-h-10 rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#0B3C5D]"
          >
            {PAY_KEYS.map((k) => (
              <option key={k} value={k}>
                {VISA_PAYMENT_STATUS_LABELS[k]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Fatura</label>
          <select
            name="invoiceStatus"
            disabled={pending}
            defaultValue={f?.invoice_status ?? "bekliyor"}
            className="mt-1 w-full min-h-10 rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#0B3C5D]"
          >
            {INV_KEYS.map((k) => (
              <option key={k} value={k}>
                {VISA_INVOICE_STATUS_LABELS[k]}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0B3C5D]/22 bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
          >
            {pending ? "Kaydediliyor…" : "Finansı kaydet"}
          </button>
          {ok ? <span className="text-xs font-semibold text-[#0B3C5D]">Kayıt güncellendi.</span> : null}
          {err ? <span className="text-xs font-medium text-[#1A1A1A]/65">{err}</span> : null}
        </div>
      </form>
    </section>
  );
}
