"use client";

import Link from "next/link";
import { memo, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import type { VisaOperationsTableLoadedRow } from "@/lib/data/visa-cases";
import type { VisaCaseFinanceRow } from "@/lib/visa-operations/types";
import { buildFinanceSummaryDisplay } from "@/lib/visa-operations/finance-summary";
import type { VisaInvoiceStatus, VisaPaymentStatus } from "@/lib/visa-operations/finance-labels";
import {
  VISA_INVOICE_STATUS_LABELS,
  VISA_PAYMENT_STATUS_LABELS,
  VISA_PAYMENT_STATUSES,
} from "@/lib/visa-operations/finance-labels";
import {
  patchVisaCaseInternalNoteAction,
  patchVisaCasePaymentStatusAction,
  deleteVisaCaseAction,
  setVisaCaseStatusAction,
} from "@/lib/visa-operations/actions";
import { VISA_BIOMETRIC_OPTIONS, VISA_PASSPORT_DELIVERY_OPTIONS } from "@/lib/visa-operations/case-operational-labels";
import { VISA_PAYMENT_OPTION_STYLES, VISA_CASE_STATUS_INLINE_STYLES } from "@/lib/visa-operations/table-select-styles";
import { VISA_CASE_STATUSES, VISA_CASE_STATUS_LABELS, type VisaCaseStatus } from "@/lib/visa-operations/status";

import { InlineSelect, type InlineSelectOption } from "@/components/visa-operations/InlineSelect";
import { InlineTextInput } from "@/components/visa-operations/InlineTextInput";

function passportLabel(raw: string | null | undefined): string {
  if (!raw) return "—";
  return VISA_PASSPORT_DELIVERY_OPTIONS.find((o) => o.value === raw)?.label ?? raw;
}

function biometricLabel(raw: string | null | undefined): string {
  if (!raw) return "—";
  return VISA_BIOMETRIC_OPTIONS.find((o) => o.value === raw)?.label ?? raw;
}

function invoiceBadgeClasses(status: string | undefined): string {
  switch (status) {
    case "kesildi":
      return "border border-[#0B3C5D]/22 bg-[#0B3C5D]/6 text-[#0B3C5D]";
    case "gerek_yok":
      return "border border-[#0B3C5D]/10 bg-[#F7F9FB] text-[#1A1A1A]/55";
    default:
      return "border border-[#0B3C5D]/14 bg-[#F4F6F8] text-[#1A1A1A]/65";
  }
}

const PAY_OPTIONS: InlineSelectOption[] = VISA_PAYMENT_STATUSES.map((k) => {
  const sty = VISA_PAYMENT_OPTION_STYLES[k];
  return {
    value: k,
    label: VISA_PAYMENT_STATUS_LABELS[k],
    badgeClassName: sty.badge,
    optionRowClassName: sty.optionRow,
  };
});

const VISA_OPTS: InlineSelectOption[] = VISA_CASE_STATUSES.map((k) => {
  const sty = VISA_CASE_STATUS_INLINE_STYLES[k];
  return {
    value: k,
    label: VISA_CASE_STATUS_LABELS[k],
    badgeClassName: sty.badge,
    optionRowClassName: sty.optionRow,
  };
});

type Props = {
  firmId: string;
  row: VisaOperationsTableLoadedRow;
};

function VisaOperationsRowInner({ firmId, row }: Props) {
  const router = useRouter();
  const c = row.caseRow;
  const f = row.finance;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [delPending, startDelTransition] = useTransition();

  const detailHref = `/panel/${firmId}/visa-operations/${c.id}`;

  const payStatus = (f?.payment_status ?? "bekliyor") as VisaPaymentStatus;

  const invoiceKey = (f?.invoice_status ?? "bekliyor") as VisaInvoiceStatus;
  const invoiceLabel = VISA_INVOICE_STATUS_LABELS[invoiceKey] ?? invoiceKey ?? "—";

  const confirmModal =
    confirmOpen &&
    typeof document !== "undefined" &&
    createPortal(
      <div className="fixed inset-0 z-[140]" aria-live="polite">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-[#0B3C5D]/35 backdrop-blur-[2px]"
            aria-label="İptal"
            onClick={() => (!delPending ? setConfirmOpen(false) : undefined)}
          />
          <div className="relative z-[141] max-w-sm rounded-2xl border border-[#0B3C5D]/12 bg-white p-5 shadow-xl">
            <p className="text-sm font-bold text-[#0B3C5D]">Dosyayı silinsin mi?</p>
            <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/65">
              {c.customer_name} kaydı ve ilişkili finans/evrak kayıtları kalıcı olarak silinir. Bu işlem geri alınamaz.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-xl border border-[#0B3C5D]/14 bg-white py-2.5 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
                disabled={delPending}
                onClick={() => setConfirmOpen(false)}
              >
                Vazgeç
              </button>
              <button
                type="button"
                className="flex-1 rounded-xl bg-[#1A1A1A]/10 py-2.5 text-xs font-semibold text-red-900 transition hover:bg-red-50 disabled:opacity-50"
                disabled={delPending}
                onClick={() => {
                  startDelTransition(async () => {
                    const r = await deleteVisaCaseAction(firmId, c.id);
                    if (r.ok) {
                      setConfirmOpen(false);
                      router.refresh();
                    }
                  });
                }}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
    <tr className="group border-t border-[#0B3C5D]/10 hover:bg-[#F7FAFC]/80">
      <td className="sticky left-0 z-[1] min-w-[4.75rem] border-r border-[#0B3C5D]/10 bg-[#FAFCFD] px-2 py-1 shadow-[inset_-8px_0_8px_-8px_rgba(11,60,93,0.08)] backdrop-blur-[1px] group-hover:bg-[#F3F8FB]/95">
        <div className="flex items-center gap-2">
          <Link
            href={detailHref}
            className="inline-flex size-8 items-center justify-center rounded-lg border border-[#0B3C5D]/16 text-[13px] font-bold text-[#0B3C5D] transition hover:bg-[#0B3C5D]/6"
            aria-label={`Detay (${c.customer_name})`}
            title="Detay"
          >
            ›
          </Link>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-[#1A1A1A]/12 text-[13px] text-[#1A1A1A]/50 transition hover:border-red-700/35 hover:bg-red-50 hover:text-red-900"
            aria-label={`Dosyayı sil (${c.customer_name})`}
            title="Sil"
            onClick={() => setConfirmOpen(true)}
          >
            ×
          </button>
        </div>
      </td>
      <td className="min-w-[6.75rem] max-w-[9rem] px-2 py-1 font-mono text-[11px] text-[#0B3C5D]/90">
        <span className="truncate block">{c.public_tracking_code ?? "—"}</span>
      </td>
      <td className="min-w-[10rem] max-w-[13rem] px-2 py-1">
        <div className="truncate text-[12px] font-semibold leading-tight text-[#0B3C5D]">{c.customer_name}</div>
        <div className="truncate text-[10px] text-[#1A1A1A]/45">{c.phone ?? c.email ?? ""}</div>
      </td>
      <td className="min-w-[7rem] max-w-[9rem] whitespace-nowrap px-2 py-1 text-[11px] font-medium text-[#1A1A1A]/80">
        {buildFinanceSummaryDisplay(f as VisaCaseFinanceRow | null)}
      </td>
      <td className="min-w-[5.5rem] px-2 py-1 align-middle">
        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${invoiceBadgeClasses(f?.invoice_status)}`}>
          {invoiceLabel}
        </span>
      </td>
      <td className="min-w-[9.5rem] px-2 py-1 align-middle">
        <InlineSelect
          aria-label={`Ödeme durumu — ${c.customer_name}`}
          value={payStatus}
          options={PAY_OPTIONS}
          onCommit={async (next) => {
            const r = await patchVisaCasePaymentStatusAction({
              firmId,
              caseId: c.id,
              paymentStatus: next as VisaPaymentStatus,
            });
            if (r.ok) router.refresh();
            return !!("ok" in r && r.ok);
          }}
        />
      </td>
      <td className="min-w-[10.5rem] px-2 py-1 align-middle">
        <InlineSelect
          aria-label={`Vize durumu — ${c.customer_name}`}
          value={c.status}
          options={VISA_OPTS}
          onCommit={async (next) => {
            const r = await setVisaCaseStatusAction({
              firmId,
              caseId: c.id,
              newStatus: next as VisaCaseStatus,
              note: null,
            });
            if (r.ok) router.refresh();
            return !!("ok" in r && r.ok);
          }}
        />
      </td>
      <td className="min-w-[12rem] max-w-[17rem] px-2 py-1 align-middle">
        <InlineTextInput
          aria-label={`Açıklama — ${c.customer_name}`}
          initialValue={c.internal_note}
          debounceMs={500}
          onCommit={async (note) => {
            const r = await patchVisaCaseInternalNoteAction({ firmId, caseId: c.id, internalNote: note });
            if (r.ok) router.refresh();
            return !!("ok" in r && r.ok);
          }}
        />
      </td>
      <td className="min-w-[7.75rem] max-w-[9rem] truncate px-2 py-1 text-[11px] text-[#1A1A1A]/72">
        {passportLabel(c.passport_delivery_status)}
      </td>
      <td className="min-w-[8rem] max-w-[10rem] truncate px-2 py-1 text-[11px] text-[#1A1A1A]/72">
        {biometricLabel(c.biometric_status)}
      </td>
      <td className="sticky right-0 z-[1] min-w-[4.75rem] border-l border-[#0B3C5D]/10 bg-[#FAFCFD] px-2 py-1 text-right shadow-[inset_8px_0_8px_-8px_rgba(11,60,93,0.08)] backdrop-blur-[1px] group-hover:bg-[#F3F8FB]/95">
        <Link
          href={detailHref}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B3C5D] underline-offset-2 hover:underline"
        >
          Detay
        </Link>
      </td>
    </tr>
    {confirmModal}
    </>
  );
}

function rowComparable(a: Props, b: Props): boolean {
  const ca = a.row.caseRow;
  const cb = b.row.caseRow;
  const fa = a.row.finance;
  const fb = b.row.finance;
  const sum = (z: Props["row"]["finance"]) =>
    `${z?.consulate_fee ?? ""}:${z?.service_fee ?? ""}:${z?.total_fee ?? ""}:${z?.consulate_fee_currency ?? ""}:${z?.service_fee_currency ?? ""}:${z?.total_fee_currency ?? ""}`;
  return (
    a.firmId === b.firmId &&
    ca.id === cb.id &&
    ca.updated_at === cb.updated_at &&
    ca.customer_name === cb.customer_name &&
    ca.phone === cb.phone &&
    ca.email === cb.email &&
    ca.public_tracking_code === cb.public_tracking_code &&
    ca.internal_note === cb.internal_note &&
    ca.status === cb.status &&
    ca.passport_delivery_status === cb.passport_delivery_status &&
    ca.biometric_status === cb.biometric_status &&
    (fa?.updated_at ?? "") === (fb?.updated_at ?? "") &&
    sum(fa) === sum(fb) &&
    (fa?.payment_status ?? "") === (fb?.payment_status ?? "") &&
    (fa?.invoice_status ?? "") === (fb?.invoice_status ?? "")
  );
}

export const VisaOperationsRow = memo(VisaOperationsRowInner, rowComparable);
