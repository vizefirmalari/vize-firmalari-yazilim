"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import { authPrimaryButtonClass } from "@/components/auth/auth-styles";
import {
  COMPARISON_ROWS,
  formatTl,
  type BillingPeriod,
  type PlanCardDef,
  type SubscriptionPlanId,
  SUBSCRIPTION_PLANS,
} from "@/lib/subscription/subscription-plans-display";

type Props = {
  firmName: string | null;
  needLabel: string | null;
  firmId: string;
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M16.25 5.625 8.125 13.75 3.75 9.375"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CellCheck({ ok }: { ok: boolean }) {
  return (
    <span className="flex justify-center" aria-label={ok ? "Dahil" : "Yok"}>
      {ok ? (
        <CheckIcon className="h-5 w-5 text-primary" />
      ) : (
        <span className="text-foreground/25">—</span>
      )}
    </span>
  );
}

function PlanPrice({
  plan,
  billing,
  showYearlyDiscountBadge,
}: {
  plan: PlanCardDef;
  billing: BillingPeriod;
  showYearlyDiscountBadge: boolean;
}) {
  if (plan.yearlyUnavailable || plan.priceYearly == null) {
    return (
      <div>
        <p className="text-2xl font-bold tabular-nums text-primary sm:text-3xl">{formatTl(plan.priceMonthly)} TL</p>
        <p className="mt-1 text-xs text-foreground/55">/ Ay</p>
      </div>
    );
  }

  if (billing === "yearly") {
    return (
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-2xl font-bold tabular-nums text-primary sm:text-3xl">{formatTl(plan.priceYearly)} TL</p>
          {showYearlyDiscountBadge ? (
            <span className="rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
              Yıllık %20
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-foreground/55">/ Yıl (tek fatura)</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-2xl font-bold tabular-nums text-primary sm:text-3xl">{formatTl(plan.priceMonthly)} TL</p>
      <p className="mt-1 text-xs text-foreground/55">/ Ay</p>
    </div>
  );
}

export function SubscriptionLandingClient({ firmName, needLabel, firmId }: Props) {
  const router = useRouter();
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId | null>(null);
  const planSectionRef = useRef<HTMLElement | null>(null);
  const compareSectionRef = useRef<HTMLElement | null>(null);

  const scrollToPlans = useCallback(() => {
    planSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToCompare = useCallback(() => {
    compareSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const showYearlyDiscountBadge = billing === "yearly";

  const goToCheckout = useCallback(
    (id: "pro" | "business") => {
      setSelectedPlan(id);
      const bill = billing === "yearly" ? "yearly" : "monthly";
      const q = new URLSearchParams({ plan: id, billing: bill });
      if (firmId) q.set("firmId", firmId);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("vf:subscription-plan-selected", {
            detail: { planId: id, billing: bill, firmId: firmId || undefined },
          })
        );
      }
      router.push(`/odeme?${q.toString()}`);
    },
    [billing, firmId, router]
  );

  const handleSelectPlan = (id: SubscriptionPlanId) => {
    if (id === "free") return;
    if (id === "pro" || id === "business") goToCheckout(id);
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70">Firma aboneliği</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="/panel"
              className="rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-primary transition hover:bg-surface sm:text-sm"
            >
              Panele dön
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-primary transition hover:bg-surface sm:text-sm"
            >
              Siteye dön
            </Link>
          </div>
        </div>
      </header>

      <main>
        {(firmName || needLabel) && (
          <div className="border-b border-border bg-white">
            <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
              {firmName ? (
                <p className="text-sm text-foreground/75">
                  <span className="font-semibold text-foreground">{firmName}</span> için paket seçimi
                </p>
              ) : null}
              {needLabel ? (
                <p className="mt-2 rounded-xl border border-primary/12 bg-surface px-4 py-3 text-sm text-foreground/80">
                  <span className="font-semibold text-primary">{needLabel}</span> paketi görünürlük ve sıralama
                  açısından daha güçlüdür. Tüm panel özellikleri her planda açıktır; yükseltme ile daha fazla trafik ve
                  öne çıkma elde edersiniz.
                </p>
              ) : null}
            </div>
          </div>
        )}

        {/* 1. Hero */}
        <section className="border-b border-border bg-surface/80">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-[1.35rem] font-bold leading-tight tracking-tight text-primary sm:text-3xl md:text-4xl">
                Daha Fazla Danışana Ulaşmak İçin Doğru Paket
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-foreground/75 sm:text-base">
                Vize Firmaları platformunda firmanızı sadece listelemek değil, aktif olarak müşteri kazanmak için doğru
                abonelik planını seçin.
              </p>
              <ul className="mx-auto mt-8 max-w-xl space-y-3 text-left text-sm text-foreground/80 sm:text-[0.9375rem]">
                <li className="flex gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>Tüm firmalar tam panel erişimine sahip — aktivasyon anında</span>
                </li>
                <li className="flex gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>Ücretli paketler listelerde sıralama ve görünürlük gücünü artırır</span>
                </li>
                <li className="flex gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>Business ile sponsorlu yerleşim ve promosyon önceliği</span>
                </li>
              </ul>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={scrollToCompare}
                  className={`${authPrimaryButtonClass} inline-flex w-full max-w-xs justify-center px-8 sm:w-auto`}
                >
                  Planları Karşılaştır
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Faturalama: aylık / yıllık */}
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/55">Faturalama</p>
            <div
              className="inline-flex rounded-2xl border border-border bg-white p-1 shadow-sm"
              role="group"
              aria-label="Faturalama dönemi"
            >
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`min-h-10 rounded-xl px-4 text-sm font-semibold transition ${
                  billing === "monthly" ? "bg-primary text-white shadow-sm" : "text-foreground/70 hover:bg-surface"
                }`}
              >
                Aylık
              </button>
              <button
                type="button"
                onClick={() => setBilling("yearly")}
                className={`relative min-h-10 rounded-xl px-4 text-sm font-semibold transition ${
                  billing === "yearly" ? "bg-primary text-white shadow-sm" : "text-foreground/70 hover:bg-surface"
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
            {billing === "yearly" ? (
              <p className="text-center text-xs text-foreground/55">Yıllık ödemede yaklaşık %20 tasarruf (12 aya göre).</p>
            ) : null}
          </div>
        </div>

        {/* 2. Plan kartları */}
        <section id="planlar" ref={planSectionRef} className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="sr-only">Abonelik planları</h2>
          <div className="lg:hidden">
            <p className="mb-3 text-center text-xs text-foreground/50">Planları kaydırarak inceleyin</p>
          </div>
          <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible scroll-smooth px-1 pb-4 pt-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const isRec = plan.variant === "recommended";
              const isStrong = plan.variant === "strong";
              const selected = selectedPlan === plan.id;
              const showYearly = billing === "yearly" && !plan.yearlyUnavailable;

              return (
                <article
                  key={plan.id}
                  className={`relative flex w-[min(100%,17.75rem)] shrink-0 snap-center flex-col rounded-2xl border bg-white px-5 pb-5 shadow-[0_4px_24px_rgba(11,60,93,0.07)] transition duration-200 will-change-transform sm:w-[min(100%,20rem)] lg:w-auto lg:min-w-0 lg:snap-none ${
                    isRec
                      ? "border-primary/35 pt-7 ring-1 ring-primary/15 lg:scale-[1.02]"
                      : isStrong
                        ? "border-primary/25 pt-7 ring-1 ring-primary/10"
                        : "border-border pt-5 hover:border-primary/20"
                  } ${selected ? "ring-2 ring-primary/35" : ""} hover:z-10 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(11,60,93,0.12)]`}
                >
                  {isRec ? (
                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/30 bg-accent/18 px-3 py-1 text-[10px] font-bold tracking-wide text-foreground">
                      Önerilen
                    </div>
                  ) : null}
                  {isStrong ? (
                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[10px] font-bold tracking-wide text-primary">
                      En Güçlü
                    </div>
                  ) : null}

                  <div className="min-h-12">
                    <h3 className="text-lg font-bold text-primary">{plan.name}</h3>
                  </div>

                  <div className="mt-4 min-h-20">
                    <PlanPrice plan={plan} billing={showYearly ? "yearly" : "monthly"} showYearlyDiscountBadge={showYearlyDiscountBadge} />
                  </div>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/72">{plan.tagline}</p>

                  <ul className="mt-5 space-y-2.5 border-t border-border/80 pt-4 text-sm text-foreground/80">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    {plan.id === "free" ? (
                      <Link
                        href="/uye-is-yerimiz-olun"
                        className="flex min-h-11 w-full items-center justify-center rounded-2xl border border-primary/20 bg-surface px-4 text-sm font-semibold text-primary transition hover:bg-primary/5"
                      >
                        {plan.ctaLabel}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`flex min-h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-semibold transition ${
                          isRec
                            ? "bg-primary text-white shadow-sm hover:bg-[#082f49]"
                            : isStrong
                              ? "border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                              : "border border-primary/20 bg-white text-primary hover:bg-surface"
                        }`}
                      >
                        {plan.ctaLabel}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          {selectedPlan ? (
            <p className="mt-4 text-center text-xs text-foreground/55" role="status">
              Seçilen plan:{" "}
              <span className="font-semibold text-primary">
                {SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan)?.name ?? selectedPlan}
              </span>{" "}
              — ödeme adımı yakında eklenecek.
            </p>
          ) : null}
        </section>

        {/* 4. Karşılaştırma */}
        <section id="karsilastir" ref={compareSectionRef} className="border-t border-border bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-xl font-bold text-primary sm:text-2xl">
              Panel erişimi ve görünürlük farkları
            </h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border shadow-sm">
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Özellik</th>
                    <th className="px-3 py-3 text-center font-semibold text-primary">Free</th>
                    <th className="px-3 py-3 text-center font-semibold text-primary">Pro</th>
                    <th className="px-3 py-3 text-center font-semibold text-primary">Business</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label} className="border-b border-border/80 odd:bg-surface/40">
                      <td className="px-4 py-3 font-medium text-foreground/85">{row.label}</td>
                      <td className="px-3 py-3">
                        <CellCheck ok={row.free} />
                      </td>
                      <td className="px-3 py-3">
                        <CellCheck ok={row.pro} />
                      </td>
                      <td className="px-3 py-3">
                        <CellCheck ok={row.business} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Güven */}
        <section className="border-t border-border bg-surface/60 py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold text-primary sm:text-xl">Güvenli ve Ölçeklenebilir Altyapı</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-[0.9375rem]">
                Platform, Supabase veri güvenliği ve Vercel altyapısı ile korunur. Tüm firma verileri izolasyonlu olarak
                saklanır ve yetkisiz erişime kapalıdır.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Veri izolasyonu (RLS)", "HTTPS güvenli bağlantı", "DDoS koruması"].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground/80"
                  >
                    <CheckIcon className="h-4 w-4 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Dönüşüm */}
        <section className="py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-lg font-bold text-primary sm:text-xl">Bu Sistem Size Ne Sağlar?</h2>
            <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {["Daha fazla müşteri", "Daha hızlı iletişim", "Ölçülebilir performans", "Sürekli görünürlük"].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-4 text-sm font-medium text-foreground/85 shadow-sm"
                >
                  <CheckIcon className="h-5 w-5 shrink-0 text-primary" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Alt CTA */}
        <section className="border-t border-border bg-primary pb-12 pt-10 text-white sm:pb-14 sm:pt-12">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-xl font-bold sm:text-2xl">Firmanızı büyütmeye bugün başlayın</h2>
            <button
              type="button"
              onClick={scrollToPlans}
              className="mt-6 inline-flex min-h-12 w-full max-w-sm items-center justify-center rounded-2xl bg-accent px-8 text-sm font-semibold text-foreground shadow-sm transition hover:brightness-95 sm:w-auto"
            >
              Aboneliği Başlat
            </button>
            <p className="mt-4 text-xs text-white/70">
              Ödeme ve sözleşme adımları yakında bu sayfada tamamlanacaktır.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
