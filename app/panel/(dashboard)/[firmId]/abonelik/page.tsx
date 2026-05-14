import Link from "next/link";

import { growthPriceLineFromSnapshots } from "@/lib/format/try-lira";
import {
  growthBillingCycleLabel,
  growthPaymentStatusLabel,
  growthPurchaseStatusLabel,
  growthServiceSubscriptionStatusLabel,
} from "@/lib/growth/growth-purchase-labels";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  FirmServiceSubscriptionRow,
  GrowthPurchaseRequestRow,
} from "@/lib/types/growth-commerce";

type PageProps = { params: Promise<{ firmId: string }> };

type FirmSubRow = {
  plan_type: string;
  billing_type: string;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
};

function subscriptionIsCurrent(row: FirmSubRow): boolean {
  if (!row.is_active) return false;
  const start = new Date(row.starts_at).getTime();
  if (start > Date.now()) return false;
  if (row.ends_at) {
    const end = new Date(row.ends_at).getTime();
    if (end <= Date.now()) return false;
  }
  return true;
}

function planDisplayName(planType: string): string {
  if (planType === "pro") return "Pro";
  if (planType === "business") return "Business";
  return planType;
}

function billingDisplayName(bt: string): string {
  return bt === "yearly" ? "Yıllık faturalama" : "Aylık faturalama";
}

function subStatusLabel(status: string): { label: string; tone: "ok" | "wait" | "muted" } {
  const label = growthServiceSubscriptionStatusLabel(status);
  if (status === "active") return { label, tone: "ok" };
  if (status === "pending") return { label, tone: "wait" };
  return { label, tone: "muted" };
}

function purchaseVisible(p: GrowthPurchaseRequestRow): boolean {
  if (["pending", "under_review", "approved"].includes(p.status)) return true;
  if (p.status === "activated" && p.payment_status === "waiting") return true;
  return false;
}

function purchaseLabel(p: GrowthPurchaseRequestRow): { label: string; tone: "ok" | "wait" | "muted" } {
  if (p.status === "cancelled") return { label: growthPurchaseStatusLabel(p.status), tone: "muted" };
  return {
    label: `${growthPurchaseStatusLabel(p.status)} · ${growthPaymentStatusLabel(p.payment_status)}`,
    tone: "wait",
  };
}

export default async function FirmPanelSubscriptionsPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  let sub: FirmSubRow | null = null;
  let subscriptions: FirmServiceSubscriptionRow[] = [];
  let purchases: GrowthPurchaseRequestRow[] = [];

  if (supabase) {
    const [subRes, subSvcRes, prRes] = await Promise.all([
      supabase.from("firm_subscriptions").select("*").eq("firm_id", firmId).maybeSingle(),
      supabase
        .from("firm_service_subscriptions")
        .select(
          "id,firm_id,service_id,service_title,setup_price_snapshot,monthly_price_snapshot,status,billing_cycle,start_date,end_date,purchase_request_id,created_at"
        )
        .eq("firm_id", firmId)
        .order("created_at", { ascending: false }),
      supabase
        .from("growth_purchase_requests")
        .select(
          "id,firm_id,service_id,service_title,setup_price_snapshot,monthly_price_snapshot,status,payment_status,is_subscription,firm_note,billing_full_name,billing_email,billing_phone,transfer_description,created_at"
        )
        .eq("firm_id", firmId)
        .order("created_at", { ascending: false }),
    ]);

    if (!subRes.error && subRes.data) sub = subRes.data as FirmSubRow;
    if (!subSvcRes.error && subSvcRes.data) subscriptions = subSvcRes.data as FirmServiceSubscriptionRow[];
    if (!prRes.error && prRes.data) purchases = prRes.data as GrowthPurchaseRequestRow[];
  }

  const subCurrent = sub && subscriptionIsCurrent(sub);
  const visiblePurchases = purchases.filter(purchaseVisible);
  const hasGrowthActivity = subscriptions.length > 0 || visiblePurchases.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Abonelikler
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">Abonelikler ve hizmetleriniz</h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Platform görünürlük planınız, İşini Büyüt talepleriniz ve aktif hizmet abonelikleriniz.
        </p>
      </div>

      <section className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold text-[#0B3C5D]">Platform görünürlük planı</h2>
        <p className="mt-1 text-xs text-[#1A1A1A]/55">
          Liste sıralaması, öne çıkma ve promosyon katmanları bu planla ilişkilidir.
        </p>
        {subCurrent && sub ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-bold text-[#0B3C5D]">{planDisplayName(sub.plan_type)}</p>
              <p className="mt-1 text-sm text-[#1A1A1A]/65">{billingDisplayName(sub.billing_type)}</p>
              <p className="mt-1 text-xs text-[#1A1A1A]/50">
                Başlangıç:{" "}
                {new Date(sub.starts_at).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <Link
              href={`/abonelik-sec?firmId=${encodeURIComponent(firmId)}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-4 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
            >
              Planları incele
            </Link>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#1A1A1A]/65">
              Ücretli plan kaydı görünmüyor veya süresi dolmuş olabilir. Karşılaştırma ve yükseltme için plan sayfasını
              açın.
            </p>
            <Link
              href={`/abonelik-sec?firmId=${encodeURIComponent(firmId)}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
            >
              Paketleri incele
            </Link>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-sm font-bold text-[#0B3C5D]">Hizmet vitrini ve geçmiş</h2>
        <p className="mt-1 text-xs text-[#1A1A1A]/55">Hizmet abonelikleri ve açık satın alma talepleri.</p>

        {!hasGrowthActivity ? (
          <div className="mt-4 rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-8 text-center">
            <p className="text-sm font-medium text-[#1A1A1A]/70">Aktif aboneliğiniz bulunmuyor.</p>
            <p className="mt-2 text-xs text-[#1A1A1A]/50">
              Açık satın alma talebiniz yoksa aşağıdan vitrine gidebilir veya geçmiş kayıtlarınızı görüntüleyebilirsiniz.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link
                href="/hizmet-vitrini"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B3C5D] px-5 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
              >
                Hizmet vitrini
              </Link>
              <Link
                href={`/panel/${firmId}/satinalma-gecmisi`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-5 text-sm font-semibold text-[#0B3C5D] transition hover:bg-white"
              >
                Satın alma geçmişi
              </Link>
            </div>
          </div>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {subscriptions.map((o) => {
              const st = subStatusLabel(o.status);
              const toneClass =
                st.tone === "ok"
                  ? "bg-[#0B3C5D]/10 text-[#0B3C5D]"
                  : st.tone === "wait"
                    ? "bg-[#D9A441]/15 text-[#1A1A1A]"
                    : "bg-[#1A1A1A]/8 text-[#1A1A1A]/60";
              const startRaw = o.start_date || o.created_at;
              const startLabel = new Date(startRaw).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              const pkg = growthPriceLineFromSnapshots(o.setup_price_snapshot, o.monthly_price_snapshot);
              const cycle = o.billing_cycle || "monthly";
              const adminMsgHref = o.purchase_request_id
                ? `/panel/${firmId}/yonetici-mesaj?purchase=${encodeURIComponent(o.purchase_request_id)}`
                : `/panel/${firmId}/yonetici-mesaj`;
              return (
                <li
                  key={`sub-${o.id}`}
                  className="flex flex-col rounded-2xl border border-[#0B3C5D]/12 bg-white p-5 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                      Hizmet aboneliği
                    </p>
                    <p className="mt-1 font-bold text-[#0B3C5D]">{o.service_title}</p>
                    <p className="mt-2 text-xs text-[#1A1A1A]/50">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${toneClass}`}>
                        {st.label}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-[#1A1A1A]/55">
                      Yenileme:{" "}
                      <span className="font-medium text-[#1A1A1A]/75">{growthBillingCycleLabel(cycle)}</span>
                    </p>
                    <p className="mt-2 text-xs text-[#1A1A1A]/55">
                      Başlangıç: <span className="font-medium text-[#1A1A1A]/75">{startLabel}</span>
                    </p>
                    {o.end_date ? (
                      <p className="mt-1 text-xs text-[#1A1A1A]/55">
                        Bitiş:{" "}
                        <span className="font-medium text-[#1A1A1A]/75">
                          {new Date(o.end_date).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm font-medium text-[#1A1A1A]/70">{pkg}</p>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href="/hizmet-vitrini"
                      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-3 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
                    >
                      Vitrin
                    </Link>
                    <Link
                      href={adminMsgHref}
                      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl bg-[#0B3C5D] px-3 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
                    >
                      Yönetici ile Mesajlaş
                    </Link>
                  </div>
                </li>
              );
            })}

            {visiblePurchases.map((o) => {
              const st = purchaseLabel(o);
              const toneClass =
                st.tone === "wait"
                  ? "bg-[#D9A441]/15 text-[#1A1A1A]"
                  : st.tone === "ok"
                    ? "bg-[#0B3C5D]/10 text-[#0B3C5D]"
                    : "bg-[#1A1A1A]/8 text-[#1A1A1A]/60";
              const startLabel = new Date(o.created_at).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              const pkg = growthPriceLineFromSnapshots(o.setup_price_snapshot, o.monthly_price_snapshot);
              return (
                <li
                  key={`pr-${o.id}`}
                  className="flex flex-col rounded-2xl border border-[#0B3C5D]/12 bg-white p-5 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
                      Satın alma talebi
                    </p>
                    <p className="mt-1 font-bold text-[#0B3C5D]">{o.service_title}</p>
                    <p className="mt-2 text-xs text-[#1A1A1A]/50">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${toneClass}`}>
                        {st.label}
                      </span>
                    </p>
                    <p className="mt-2 text-xs text-[#1A1A1A]/55">
                      Talep tarihi: <span className="font-medium text-[#1A1A1A]/75">{startLabel}</span>
                    </p>
                    <p className="mt-2 text-sm font-medium text-[#1A1A1A]/70">{pkg}</p>
                    {o.transfer_description ? (
                      <p className="mt-2 break-words text-xs text-[#1A1A1A]/55">
                        Havale açıklaması:{" "}
                        <span className="font-mono font-medium text-[#1A1A1A]/70">{o.transfer_description}</span>
                      </p>
                    ) : null}
                    {o.billing_full_name ? (
                      <p className="mt-1 text-xs text-[#1A1A1A]/55">
                        Fatura: <span className="font-medium text-[#1A1A1A]/70">{o.billing_full_name}</span>
                        {o.billing_email ? (
                          <>
                            {" · "}
                            <span className="text-[#1A1A1A]/65">{o.billing_email}</span>
                          </>
                        ) : null}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href="/hizmet-vitrini"
                      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border border-[#0B3C5D]/20 bg-white px-3 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
                    >
                      Vitrin
                    </Link>
                    <Link
                      href={`/panel/${firmId}/yonetici-mesaj?purchase=${encodeURIComponent(o.id)}`}
                      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl bg-[#0B3C5D] px-3 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
                    >
                      Yönetici ile Mesajlaş
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
