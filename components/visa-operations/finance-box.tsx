"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import type { VisaCaseFinanceRow } from "@/lib/visa-operations/types";

import {
  VISA_INVOICE_STATUS_LABELS,
  VISA_PAYMENT_STATUS_LABELS,
} from "@/lib/visa-operations/constants";

import { updateVisaCaseFinanceAction } from "@/lib/visa-operations/actions";
import { formatVisaMoney } from "@/components/visa-operations/format-display";

const PAY_KEYS = ["bekliyor", "kısmi_ödendi", "ödendi", "iptal"] as const;
const INV_KEYS = ["bekliyor", "kesildi", "gerek_yok"] as const;

type Props = { firmId: string; caseId: string; finance: VisaCaseFinanceRow | null };

function toMoneyNumber(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number.parseFloat(String(v));
  return Number.isFinite(n) ? n : null;
}

export function FinanceBox({ firmId, caseId, finance }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const f = finance;

  const totalExplicit = toMoneyNumber(f?.total_fee);
  const cf = toMoneyNumber(f?.consulate_fee);
  const sf = toMoneyNumber(f?.service_fee);
  let displayTotal = "—";
  if (totalExplicit != null) {
    displayTotal = formatVisaMoney(totalExplicit);
  } else if (cf != null || sf != null) {
    displayTotal = formatVisaMoney((cf ?? 0) + (sf ?? 0));
  }

  return (
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-[0_2px_12px_rgba(11,60,93,0.04)]">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0B3C5D]/90">Finans</h3>
      <p className="mt-1 text-xs text-[#1A1A1A]/50">
        Toplam görünüm: önce <strong>manuel toplam</strong>; boşsa konsolosluk + hizmet toplamı.
      </p>
      <p className="mt-2 text-sm font-bold text-[#0B3C5D]">Özet tutar: {displayTotal}</p>

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

        <div className="sm:col-span-2 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Konsolosluk ücreti
            </label>
            <input
              name="consulateFee"
              disabled={pending}
              defaultValue={f?.consulate_fee ?? ""}
              inputMode="decimal"
              placeholder="0"
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A]"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Hizmet ücreti</label>
            <input
              name="serviceFee"
              disabled={pending}
              defaultValue={f?.service_fee ?? ""}
              inputMode="decimal"
              placeholder="0"
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A]"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
              Manuel toplam (ops.)
            </label>
            <input
              name="totalFee"
              disabled={pending}
              defaultValue={f?.total_fee ?? ""}
              inputMode="decimal"
              placeholder="Boş ise üst iki satırın toplanması önerilir"
              className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#1A1A1A]"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">Ödeme durumu</label>
          <select
            name="paymentStatus"
            disabled={pending}
            defaultValue={f?.payment_status ?? "bekliyor"}
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#0B3C5D]"
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
            className="mt-1 w-full rounded-xl border border-[#0B3C5D]/15 bg-[#F7F9FB] px-3 py-2 text-sm text-[#0B3C5D]"
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
