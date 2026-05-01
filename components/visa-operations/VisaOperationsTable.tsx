"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import type { VisaOperationsTableLoadedRow } from "@/lib/data/visa-cases";
import { VISA_PAYMENT_STATUSES, VISA_PAYMENT_STATUS_LABELS } from "@/lib/visa-operations/finance-labels";
import { VISA_CASE_STATUSES, VISA_CASE_STATUS_LABELS } from "@/lib/visa-operations/status";

import { CreateCaseDialog } from "@/components/visa-operations/create-case-dialog";
import { VisaOperationsRow } from "@/components/visa-operations/VisaOperationsRow";

type Props = {
  firmId: string;
  rows: VisaOperationsTableLoadedRow[];
};

export function VisaOperationsTable({ firmId, rows }: Props) {
  const statusFilterId = useId().replace(/:/g, "");
  const paymentFilterId = useId().replace(/:/g, "");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("tr-TR");
    return rows.filter(({ caseRow: c, finance: f }) => {
      const pay = f?.payment_status ?? "bekliyor";
      if (paymentFilter && pay !== paymentFilter) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      if (!needle) return true;
      const blob = `${c.customer_name} ${c.phone ?? ""} ${c.email ?? ""} ${c.public_tracking_code ?? ""}`.toLocaleLowerCase(
        "tr-TR"
      );
      return blob.includes(needle);
    });
  }, [rows, query, statusFilter, paymentFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:flex-wrap xl:items-center xl:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <CreateCaseDialog
            firmId={firmId}
            triggerLabel="+ Vize Ekle"
            navigateToDetailOnCreate={false}
          />
          <Link
            href={`/panel/${firmId}/formlar`}
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl border border-[#0B3C5D]/22 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
          >
            Gelen başvurular
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end xl:justify-end xl:gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="İsim, telefon veya e‑posta ara"
            aria-label="Operasyon ara"
            className="min-w-0 shrink rounded-xl border border-[#0B3C5D]/14 bg-white px-3 py-2 text-sm font-medium text-[#1A1A1A] outline-none ring-[#0B3C5D]/22 focus-visible:ring-2 sm:w-56 xl:w-64"
          />
          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor={statusFilterId}>
              Vize durumu filtresi
            </label>
            <select
              id={statusFilterId}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="min-w-[9.5rem] rounded-xl border border-[#0B3C5D]/14 bg-white px-2.5 py-2 text-xs font-semibold text-[#0B3C5D] outline-none ring-[#0B3C5D]/22 focus-visible:ring-2"
            >
              <option value="">Tüm vize durumları</option>
              {VISA_CASE_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {VISA_CASE_STATUS_LABELS[s]}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor={paymentFilterId}>
              Ödeme filtresi
            </label>
            <select
              id={paymentFilterId}
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="min-w-[8.75rem] rounded-xl border border-[#0B3C5D]/14 bg-white px-2.5 py-2 text-xs font-semibold text-[#0B3C5D] outline-none ring-[#0B3C5D]/22 focus-visible:ring-2"
            >
              <option value="">Tüm ödemeler</option>
              {VISA_PAYMENT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {VISA_PAYMENT_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#0B3C5D]/20 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-medium text-[#1A1A1A]/55">Henüz operasyon dosyası yok.</p>
          <p className="mt-2 text-xs text-[#1A1A1A]/45">
            Üstten yeni kayıt açabilir veya gelen başvurudan dönüşüm yapabilirsiniz.
          </p>
        </div>
      ) : (
        <div className="-mx-1 overflow-x-auto rounded-xl border border-[#0B3C5D]/12 bg-white pb-px shadow-sm sm:-mx-0">
          <table className="min-w-[1280px] w-full caption-bottom border-collapse text-left">
            <thead className="sticky top-0 z-[2] shadow-[inset_0_-1px_0_0_rgba(11,60,93,0.09)] backdrop-blur-sm">
              <tr className="bg-[#F5F9FC]/95">
                <th
                  scope="col"
                  className="sticky left-0 z-[3] whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55"
                  style={{ minWidth: "4.75rem" }}
                >
                  İşlem
                </th>
                <th scope="col" className="whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55">
                  Takip kodu
                </th>
                <th scope="col" className="whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55">
                  Müşteri
                </th>
                <th scope="col" className="whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55">
                  Ücret
                </th>
                <th scope="col" className="whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55">
                  Fatura
                </th>
                <th scope="col" className="whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55">
                  Ödeme
                </th>
                <th scope="col" className="whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55">
                  Vize durumu
                </th>
                <th scope="col" className="whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55">
                  Açıklama
                </th>
                <th scope="col" className="whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55">
                  Pasaport
                </th>
                <th scope="col" className="whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55">
                  Vize süreci
                </th>
                <th
                  scope="col"
                  className="sticky right-0 z-[3] whitespace-nowrap border-b border-[#0B3C5D]/10 px-2 py-2 text-right text-[10px] font-bold uppercase tracking-wide text-[#0B3C5D]/55"
                  style={{ minWidth: "4.75rem" }}
                >
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-6 py-10 text-center text-sm text-[#1A1A1A]/50">
                    Filtrelere uygun kayıt yok.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <VisaOperationsRow key={r.caseRow.id} firmId={firmId} row={r} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}