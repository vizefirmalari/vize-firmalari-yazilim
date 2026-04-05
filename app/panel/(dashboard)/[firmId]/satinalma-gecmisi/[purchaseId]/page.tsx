import Link from "next/link";
import { notFound } from "next/navigation";

import { GrowthPurchaseReportPaymentButton } from "@/components/firm-panel/growth/growth-purchase-report-payment-button";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { growthPaymentStatusLabel, growthPurchaseStatusLabel } from "@/lib/growth/growth-purchase-labels";
import { growthPriceLineFromSnapshots } from "@/lib/format/try-lira";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ firmId: string; purchaseId: string }> };

export default async function FirmPurchaseDetailPage({ params }: PageProps) {
  const { firmId, purchaseId } = await params;
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: row, error } = await supabase
    .from("growth_purchase_requests")
    .select("*")
    .eq("id", purchaseId)
    .eq("firm_id", firmId)
    .maybeSingle();

  if (error || !row) notFound();

  const p = row as Record<string, unknown>;
  const canReportPayment =
    p.status !== "cancelled" &&
    p.status !== "completed" &&
    p.payment_status !== "verified" &&
    p.payment_status !== "rejected";

  const msgHref = `/panel/${firmId}/yonetici-mesaj?purchase=${encodeURIComponent(purchaseId)}`;
  const priceLine = growthPriceLineFromSnapshots(
    p.setup_price_snapshot as number | null,
    p.monthly_price_snapshot as number | null
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href={`/panel/${firmId}/satinalma-gecmisi`}
            className="text-xs font-semibold text-[#0B3C5D]/80 underline-offset-2 hover:underline"
          >
            ← Satın alma geçmişi
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-[#0B3C5D]">{String(p.service_title)}</h1>
          <p className="mt-2 text-sm text-[#1A1A1A]/60">
            {growthPurchaseStatusLabel(String(p.status))} · {growthPaymentStatusLabel(String(p.payment_status))}
            {Boolean(p.is_subscription) ? " · Abonelik" : " · Tek sefer"}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Link
            href={msgHref}
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
          >
            Yönetici ile mesajlaş
          </Link>
          {canReportPayment ? (
            <GrowthPurchaseReportPaymentButton firmId={firmId} purchaseId={purchaseId} />
          ) : null}
        </div>
      </div>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#0B3C5D]">Özet</h2>
        <p className="mt-2 text-sm font-medium text-[#1A1A1A]/75">{priceLine}</p>
        {p.transfer_description ? (
          <p className="mt-3 break-words text-xs text-[#1A1A1A]/55">
            Havale açıklaması:{" "}
            <span className="font-mono font-semibold text-[#1A1A1A]/75">{String(p.transfer_description)}</span>
          </p>
        ) : null}
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">IBAN (talep anı)</dt>
            <dd className="break-all font-mono text-xs">{String(p.payment_iban_snapshot || "—")}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Alıcı</dt>
            <dd>{String(p.payment_receiver_name_snapshot || "—")}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#0B3C5D]">Fatura bilgileriniz</h2>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Ad soyad</dt>
            <dd className="font-medium">{String(p.billing_full_name || "—")}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Ünvan</dt>
            <dd>{String(p.billing_company_name || "—")}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Vergi dairesi</dt>
            <dd>{String(p.billing_tax_office || "—")}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">VKN / TC</dt>
            <dd className="font-mono">{String(p.billing_tax_number || "—")}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">E-posta</dt>
            <dd>{String(p.billing_email || "—")}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#1A1A1A]/50">Telefon</dt>
            <dd>{String(p.billing_phone || "—")}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs text-[#1A1A1A]/50">Adres</dt>
            <dd className="whitespace-pre-wrap">{String(p.billing_address || "—")}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
