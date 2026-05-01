"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  adminActivateGrowthFromPurchase,
  adminPatchGrowthPurchaseRequest,
} from "@/lib/actions/growth-admin";
import { growthPaymentStatusLabel, growthPurchaseStatusLabel } from "@/lib/growth/growth-purchase-labels";

export type PurchaseRow = {
  id: string;
  firm_id: string;
  service_title: string;
  status: string;
  payment_status: string;
  created_at: string;
  is_subscription: boolean;
  firm_name: string;
  firm_logo: string | null;
  billing_full_name: string | null;
  billing_email: string | null;
  billing_phone: string | null;
  transfer_description: string | null;
};

function firmFromJoin(
  firms: { name: string; logo_url?: string | null } | { name: string; logo_url?: string | null }[] | null | undefined
): { name: string; logo: string | null } {
  if (!firms) return { name: "Firma", logo: null };
  const f = Array.isArray(firms) ? firms[0] : firms;
  return {
    name: f?.name?.trim() || "Firma",
    logo: f?.logo_url != null ? String(f.logo_url) : null,
  };
}

export function GrowthPurchaseRequestsTable({ rows }: { rows: Record<string, unknown>[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const normalized: PurchaseRow[] = rows.map((r) => {
    const ff = firmFromJoin(
      r.firms as { name: string; logo_url?: string | null } | { name: string; logo_url?: string | null }[] | null
    );
    return {
      id: String(r.id),
      firm_id: String(r.firm_id),
      service_title: String(r.service_title),
      status: String(r.status),
      payment_status: String(r.payment_status),
      created_at: String(r.created_at),
      is_subscription: Boolean(r.is_subscription),
      firm_name: ff.name,
      firm_logo: ff.logo,
      billing_full_name: r.billing_full_name != null ? String(r.billing_full_name) : null,
      billing_email: r.billing_email != null ? String(r.billing_email) : null,
      billing_phone: r.billing_phone != null ? String(r.billing_phone) : null,
      transfer_description: r.transfer_description != null ? String(r.transfer_description) : null,
    };
  });

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    startTransition(async () => {
      const res = await fn();
      if (res.ok) router.refresh();
      else alert(res.error ?? "Hata");
    });
  }

  if (!normalized.length) {
    return (
      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-10 text-center text-sm font-medium text-[#1A1A1A]/65">
        Şu anda bekleyen yeni hizmet satın alma talebi bulunmuyor.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[#0B3C5D]/10 bg-[#F7F9FB] text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
          <tr>
            <th className="px-4 py-3">Firma</th>
            <th className="px-4 py-3">Hizmet</th>
            <th className="px-4 py-3">Tür</th>
            <th className="px-4 py-3">Durum</th>
            <th className="px-4 py-3">Ödeme</th>
            <th className="px-4 py-3">Tarih</th>
            <th className="px-4 py-3">Hızlı işlem</th>
            <th className="px-4 py-3">Detay</th>
          </tr>
        </thead>
        <tbody>
          {normalized.map((r) => (
            <tr key={r.id} className="border-b border-[#0B3C5D]/08">
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#1A1A1A]/10 bg-[#F7F9FB]">
                    {r.firm_logo ? (
                       
                      <img src={r.firm_logo} alt="" className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-xs font-bold text-[#0B3C5D]/35">{r.firm_name.slice(0, 1)}</span>
                    )}
                  </div>
                  <span className="font-medium text-[#0B3C5D]">{r.firm_name}</span>
                </div>
              </td>
              <td className="px-4 py-2 text-[#1A1A1A]/70">{r.service_title}</td>
              <td className="px-4 py-2 text-xs text-[#1A1A1A]/60">{r.is_subscription ? "Abonelik" : "Tek sefer"}</td>
              <td className="max-w-[140px] px-4 py-2 text-xs text-[#1A1A1A]/70">
                {growthPurchaseStatusLabel(r.status)}
              </td>
              <td className="max-w-[120px] px-4 py-2 text-xs text-[#1A1A1A]/70">
                {growthPaymentStatusLabel(r.payment_status)}
              </td>
              <td className="px-4 py-2 text-xs text-[#1A1A1A]/55">
                {new Date(r.created_at).toLocaleString("tr-TR")}
              </td>
              <td className="space-y-1 px-4 py-2">
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      run(() => adminPatchGrowthPurchaseRequest({ id: r.id, payment_status: "verified" }))
                    }
                    className="rounded-lg border border-[#D9A441]/35 px-2 py-1 text-[11px] font-semibold text-[#5F470E] disabled:opacity-50"
                  >
                    Ödeme ✓
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      if (!confirm("Talebi sonlandırıp abonelik/tek sefer akışını tamamlamak istiyor musunuz?")) return;
                      run(() => adminActivateGrowthFromPurchase(r.id));
                    }}
                    className="rounded-lg bg-[#0B3C5D] px-2 py-1 text-[11px] font-semibold text-white disabled:opacity-50"
                  >
                    Aktif et
                  </button>
                </div>
              </td>
              <td className="px-4 py-2">
                <Link
                  href={`/admin/growth/purchase-requests/${r.id}`}
                  className="text-xs font-semibold text-[#0B3C5D] underline-offset-2 hover:underline"
                >
                  Detay
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
