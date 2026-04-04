"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  adminActivateGrowthFromPurchase,
  adminSetGrowthPurchaseRequest,
} from "@/lib/actions/growth-admin";

export type PurchaseRow = {
  id: string;
  firm_id: string;
  service_title: string;
  status: string;
  payment_status: string;
  created_at: string;
  firm_name: string;
  billing_full_name: string | null;
  billing_email: string | null;
  billing_phone: string | null;
  transfer_description: string | null;
};

function firmNameFromJoin(
  firms: { name: string } | { name: string }[] | null | undefined
): string {
  if (!firms) return "Firma";
  const f = Array.isArray(firms) ? firms[0] : firms;
  return f?.name?.trim() || "Firma";
}

export function GrowthPurchaseRequestsTable({ rows }: { rows: Record<string, unknown>[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const normalized: PurchaseRow[] = rows.map((r) => ({
    id: String(r.id),
    firm_id: String(r.firm_id),
    service_title: String(r.service_title),
    status: String(r.status),
    payment_status: String(r.payment_status),
    created_at: String(r.created_at),
    firm_name: firmNameFromJoin(r.firms as { name: string } | { name: string }[] | null),
    billing_full_name: r.billing_full_name != null ? String(r.billing_full_name) : null,
    billing_email: r.billing_email != null ? String(r.billing_email) : null,
    billing_phone: r.billing_phone != null ? String(r.billing_phone) : null,
    transfer_description: r.transfer_description != null ? String(r.transfer_description) : null,
  }));

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    startTransition(async () => {
      const res = await fn();
      if (res.ok) router.refresh();
      else alert(res.error ?? "Hata");
    });
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[#0B3C5D]/10 bg-[#F7F9FB] text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          <tr>
            <th className="px-4 py-3">Firma</th>
            <th className="px-4 py-3">Hizmet</th>
            <th className="px-4 py-3">Fatura / iletişim</th>
            <th className="px-4 py-3">Talep</th>
            <th className="px-4 py-3">Ödeme</th>
            <th className="px-4 py-3">Tarih</th>
            <th className="px-4 py-3">Aksiyon</th>
          </tr>
        </thead>
        <tbody>
          {normalized.map((r) => (
            <tr key={r.id} className="border-b border-[#0B3C5D]/08">
              <td className="px-4 py-2 font-medium text-[#0B3C5D]">{r.firm_name}</td>
              <td className="px-4 py-2 text-[#1A1A1A]/70">{r.service_title}</td>
              <td className="max-w-[220px] px-4 py-2 text-xs text-[#1A1A1A]/65">
                {r.billing_full_name || r.billing_email || r.billing_phone ? (
                  <div className="space-y-0.5">
                    {r.billing_full_name ? <p className="font-medium text-[#1A1A1A]/80">{r.billing_full_name}</p> : null}
                    {r.billing_email ? <p>{r.billing_email}</p> : null}
                    {r.billing_phone ? <p>{r.billing_phone}</p> : null}
                    {r.transfer_description ? (
                      <p className="break-words font-mono text-[11px] text-[#1A1A1A]/50">{r.transfer_description}</p>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-[#1A1A1A]/40">—</span>
                )}
              </td>
              <td className="px-4 py-2 text-xs">{r.status}</td>
              <td className="px-4 py-2 text-xs">{r.payment_status}</td>
              <td className="px-4 py-2 text-xs text-[#1A1A1A]/55">
                {new Date(r.created_at).toLocaleString("tr-TR")}
              </td>
              <td className="space-y-1 px-4 py-2">
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      run(() =>
                        adminSetGrowthPurchaseRequest({
                          id: r.id,
                          status: "approved",
                          payment_status: "waiting",
                        })
                      )
                    }
                    className="rounded-lg border border-[#0B3C5D]/15 px-2 py-1 text-[11px] font-semibold text-[#0B3C5D] disabled:opacity-50"
                  >
                    Onayla
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      run(() =>
                        adminSetGrowthPurchaseRequest({
                          id: r.id,
                          status: "rejected",
                          payment_status: "waiting",
                        })
                      )
                    }
                    className="rounded-lg border border-[#1A1A1A]/12 px-2 py-1 text-[11px] font-semibold text-[#1A1A1A]/60 disabled:opacity-50"
                  >
                    Reddet
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      run(() =>
                        adminSetGrowthPurchaseRequest({
                          id: r.id,
                          status: "approved",
                          payment_status: "paid",
                        })
                      )
                    }
                    className="rounded-lg border border-[#D9A441]/35 px-2 py-1 text-[11px] font-semibold text-[#5F470E] disabled:opacity-50"
                  >
                    Ödeme alındı
                  </button>
                </div>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    if (!confirm("Aboneliği oluşturup talebi onaylı + ödendi yapmak istiyor musunuz?")) return;
                    run(() => adminActivateGrowthFromPurchase(r.id));
                  }}
                  className="rounded-lg bg-[#0B3C5D] px-2 py-1 text-[11px] font-semibold text-white disabled:opacity-50"
                >
                  Aktif aboneliğe çevir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
