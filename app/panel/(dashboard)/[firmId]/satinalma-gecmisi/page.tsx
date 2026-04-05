import Link from "next/link";

import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { growthPaymentStatusLabel, growthPurchaseStatusLabel } from "@/lib/growth/growth-purchase-labels";
import { growthPriceLineFromSnapshots } from "@/lib/format/try-lira";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { GrowthPurchaseRequestRow } from "@/lib/types/growth-commerce";

type PageProps = { params: Promise<{ firmId: string }> };

const SELECT =
  "id,service_title,status,payment_status,is_subscription,setup_price_snapshot,monthly_price_snapshot,transfer_description,created_at,service_short_description_snapshot";

export default async function FirmPurchaseHistoryPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  let rows: GrowthPurchaseRequestRow[] = [];

  if (supabase) {
    const { data, error } = await supabase
      .from("growth_purchase_requests")
      .select(SELECT)
      .eq("firm_id", firmId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      rows = data as GrowthPurchaseRequestRow[];
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Satın alma geçmişi
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">İşini Büyüt satın almalarınız</h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Her kayıt anlık fiyat ve fatura bilgisiyle saklanır; yönetim ekibi talebinizi bu ekranlardan takip eder.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-10 text-center">
          <p className="text-sm font-medium text-[#1A1A1A]/70">
            Henüz kayıtlı bir satın alma işleminiz bulunmuyor.
          </p>
          <Link
            href={`/panel/${firmId}/isini-buyut`}
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
          >
            İşini Büyüt
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {rows.map((r) => {
            const summary = r.service_short_description_snapshot?.trim() || "";
            const pkg = growthPriceLineFromSnapshots(r.setup_price_snapshot, r.monthly_price_snapshot);
            const dateLabel = new Date(r.created_at).toLocaleString("tr-TR", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <li
                key={r.id}
                className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                      {r.is_subscription ? "Abonelik" : "Tek sefer"}
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#0B3C5D]">{r.service_title}</p>
                    <p className="mt-2 text-xs text-[#1A1A1A]/55">
                      <span className="font-medium text-[#1A1A1A]/75">{growthPurchaseStatusLabel(r.status)}</span>
                      {" · "}
                      <span className="text-[#1A1A1A]/60">{growthPaymentStatusLabel(r.payment_status)}</span>
                    </p>
                    <p className="mt-1 text-xs text-[#1A1A1A]/50">{dateLabel}</p>
                    <p className="mt-2 text-sm font-medium text-[#1A1A1A]/70">{pkg}</p>
                    {summary ? (
                      <p className="mt-2 line-clamp-2 text-xs text-[#1A1A1A]/55">{summary}</p>
                    ) : null}
                  </div>
                  <Link
                    href={`/panel/${firmId}/satinalma-gecmisi/${r.id}`}
                    className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
                  >
                    Detay
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
