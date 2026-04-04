"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { authPrimaryButtonClass } from "@/components/auth/auth-styles";
import { SUBSCRIPTION_PLANS, formatTl, type BillingPeriod } from "@/lib/subscription/subscription-plans-display";

export function CheckoutPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const billingParam = searchParams.get("billing") === "yearly" ? "yearly" : "monthly";
  const firmId = searchParams.get("firmId") ?? "";

  const [billing, setBilling] = useState<BillingPeriod>(billingParam);

  const plan = useMemo(() => {
    if (planParam === "pro" || planParam === "business") {
      return SUBSCRIPTION_PLANS.find((p) => p.id === planParam) ?? null;
    }
    return null;
  }, [planParam]);

  const showYearlyBadge = billing === "yearly";

  const amountLabel = (() => {
    if (!plan || plan.yearlyUnavailable || plan.priceYearly == null) {
      return plan ? `${formatTl(plan.priceMonthly)} TL / ay` : "—";
    }
    if (billing === "yearly") return `${formatTl(plan.priceYearly)} TL / yıl`;
    return `${formatTl(plan.priceMonthly)} TL / ay`;
  })();

  const completeDemo = () => {
    const q = new URLSearchParams();
    q.set("odeme", "basarili");
    if (planParam) q.set("plan", planParam);
    if (firmId) q.set("firmId", firmId);
    router.push(`/uye-is-yerimiz-olun?${q.toString()}`);
  };

  if (!plan) {
    return (
      <div className="min-h-dvh bg-background px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-lg font-bold text-primary">Plan bulunamadı</h1>
          <p className="mt-2 text-sm text-foreground/70">
            Geçerli bir plan seçmek için{" "}
            <Link href="/uye-is-yerimiz-olun#uye-plan-secimi" className="font-semibold text-secondary underline-offset-2 hover:underline">
              üyelik sayfası
            </Link>
            na dönün.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-surface/80 pb-12 pt-8">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <Link
          href="/uye-is-yerimiz-olun#uye-plan-secimi"
          className="text-sm font-semibold text-secondary underline-offset-2 hover:underline"
        >
          ← Planlara dön
        </Link>
        <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60">Ödeme</p>
          <h1 className="mt-2 text-xl font-bold text-primary">{plan.name} planı</h1>
          <p className="mt-2 text-sm text-foreground/70">{plan.tagline}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/55">Faturalama</span>
            <div className="inline-flex rounded-2xl border border-border bg-surface p-1">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`min-h-10 rounded-xl px-4 text-sm font-semibold transition ${
                  billing === "monthly" ? "bg-primary text-white shadow-sm" : "text-foreground/70"
                }`}
              >
                Aylık
              </button>
              <button
                type="button"
                onClick={() => setBilling("yearly")}
                className={`relative min-h-10 rounded-xl px-4 text-sm font-semibold transition ${
                  billing === "yearly" ? "bg-primary text-white shadow-sm" : "text-foreground/70"
                }`}
              >
                Yıllık
                {billing === "yearly" ? (
                  <span className="absolute -right-1 -top-2 rounded-full border border-accent/30 bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-foreground">
                    %20
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-primary/12 bg-surface px-4 py-3">
            <p className="text-xs text-foreground/55">Tutar (özet)</p>
            <p className="mt-1 text-lg font-bold text-primary">{amountLabel}</p>
            {billing === "yearly" && showYearlyBadge ? (
              <p className="mt-2 text-xs text-foreground/55">Yıllık faturalamada yaklaşık %20 tasarruf (12 aya göre).</p>
            ) : null}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-foreground/55">
            Gerçek ödeme (kart / 3D) entegrasyonu buraya bağlanacaktır. Şimdilik akışı test etmek için aşağıdaki
            düğme ile başarılı ödeme sonrası başvuru formuna yönlenebilirsiniz.
          </p>

          <button type="button" onClick={completeDemo} className={`${authPrimaryButtonClass} mt-6`}>
            Ödemeyi tamamla (demo)
          </button>
        </div>
      </div>
    </div>
  );
}
