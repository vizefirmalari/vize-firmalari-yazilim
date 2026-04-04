"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { adminUpdateFirmServiceSubscription } from "@/lib/actions/growth-admin";

export type SubRow = {
  id: string;
  firm_name: string;
  service_title: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
};

function firmNameFromJoin(
  firms: { name: string } | { name: string }[] | null | undefined
): string {
  if (!firms) return "Firma";
  const f = Array.isArray(firms) ? firms[0] : firms;
  return f?.name?.trim() || "Firma";
}

export function GrowthSubscriptionsTable({ rows }: { rows: Record<string, unknown>[] }) {
  const router = useRouter();

  const normalized: SubRow[] = rows.map((r) => ({
    id: String(r.id),
    firm_name: firmNameFromJoin(r.firms as { name: string } | { name: string }[] | null),
    service_title: String(r.service_title),
    status: String(r.status),
    start_date: r.start_date ? String(r.start_date) : null,
    end_date: r.end_date ? String(r.end_date) : null,
    created_at: String(r.created_at),
  }));

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[#0B3C5D]/10 bg-[#F7F9FB] text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          <tr>
            <th className="px-4 py-3">Firma</th>
            <th className="px-4 py-3">Hizmet</th>
            <th className="px-4 py-3">Durum</th>
            <th className="px-4 py-3">Tarihler</th>
            <th className="px-4 py-3">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {normalized.map((r) => (
            <SubscriptionRow key={r.id} row={r} onDone={() => router.refresh()} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SubscriptionRow({ row, onDone }: { row: SubRow; onDone: () => void }) {
  const [pending, startTransition] = useTransition();
  const [endDate, setEndDate] = useState(row.end_date ?? "");

  return (
    <tr className="border-b border-[#0B3C5D]/08">
      <td className="px-4 py-2 font-medium text-[#0B3C5D]">{row.firm_name}</td>
      <td className="px-4 py-2 text-[#1A1A1A]/70">{row.service_title}</td>
      <td className="px-4 py-2 text-xs font-semibold">{row.status}</td>
      <td className="px-4 py-2 text-xs text-[#1A1A1A]/55">
        <div>Başlangıç: {row.start_date ?? "—"}</div>
        <div>Bitiş: {row.end_date ?? "—"}</div>
      </td>
      <td className="space-y-2 px-4 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-lg border border-[#0B3C5D]/15 px-2 py-1 text-xs"
          />
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                const res = await adminUpdateFirmServiceSubscription({
                  id: row.id,
                  end_date: endDate.trim() || null,
                });
                if (res.ok) onDone();
                else alert(res.error);
              });
            }}
            className="rounded-lg border border-[#0B3C5D]/20 px-2 py-1 text-[11px] font-semibold text-[#0B3C5D] disabled:opacity-50"
          >
            Bitiş kaydet
          </button>
        </div>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (!confirm("Aboneliği pasifleştirmek istiyor musunuz?")) return;
            startTransition(async () => {
              const res = await adminUpdateFirmServiceSubscription({
                id: row.id,
                status: "passive",
              });
              if (res.ok) onDone();
              else alert(res.error);
            });
          }}
          className="rounded-lg bg-[#1A1A1A]/12 px-2 py-1 text-[11px] font-semibold text-[#1A1A1A]/70 disabled:opacity-50"
        >
          İptal / pasif
        </button>
      </td>
    </tr>
  );
}
