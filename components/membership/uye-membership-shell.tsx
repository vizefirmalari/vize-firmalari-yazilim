"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BusinessMembershipForm } from "@/components/forms/business-membership-form";
import { PremiumSoonModal } from "@/components/membership/premium-soon-modal";
import {
  formatUyePlanPrice,
  UYE_PAGE_PLANS,
  type UyePagePlanDef,
} from "@/lib/membership/uye-page-plans";
import type { BillingPeriod } from "@/lib/subscription/subscription-plans-display";

type PlanId = "free" | "pro" | "business";

type Props = {
  /** Ödeme başarılı dönüşte forma aç (paymentEnabled true olduğunda) */
  scrollToFormOnPayment?: boolean;
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

function PlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 12h6M9 16h6M8 5h8l1 3H7l1-3zM6 8h12v11a2 2 0 01-2 2H8a2 2 0 01-2-2V8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function selectedPackageLabel(plan: PlanId | null): string {
  if (plan === "pro") return "Pro";
  if (plan === "business") return "Business";
  return "Ücretsiz Vitrin";
}

function UyePlanPriceBlock({
  plan,
  billing,
  showYearlyBadge,
}: {
  plan: UyePagePlanDef;
  billing: BillingPeriod;
  showYearlyBadge: boolean;
}) {
  const { main, period } = formatUyePlanPrice(plan, billing);

  if (plan.id === "free") {
    return (
      <div>
        <p className="text-xl font-bold tabular-nums text-primary sm:text-2xl">{main}</p>
        <p className="mt-1 text-xs text-foreground/55">{period}</p>
      </div>
    );
  }

  if (billing === "yearly" && plan.priceYearly != null) {
    return (
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xl font-bold tabular-nums text-primary sm:text-2xl">{main}</p>
          {showYearlyBadge ? (
            <span className="rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
              Yıllık %20
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-foreground/55">{period}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xl font-bold tabular-nums text-primary sm:text-2xl">{main}</p>
      <p className="mt-1 text-xs text-foreground/55">{period}</p>
    </div>
  );
}

export function UyeMembershipShell({ scrollToFormOnPayment }: Props) {
  const formWrapRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const showYearlyBadge = billing === "yearly";

  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);

  /** Ödeme entegrasyonu aktif olunca true yapın; URL ile ödeme sonrası form açılabilir */
  const paymentEnabled = false;

  const scrollToForm = () => {
    window.setTimeout(() => {
      formWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const openFreeForm = () => {
    setSelectedPlan("free");
    setIsFormVisible(true);
    scrollToForm();
  };

  const scrollToStickyTarget = () => {
    if (isFormVisible) {
      formWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      placeholderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (scrollToFormOnPayment && paymentEnabled) {
      const t = window.setTimeout(() => {
        setSelectedPlan("free");
        setIsFormVisible(true);
        scrollToForm();
      }, 150);
      return () => window.clearTimeout(t);
    }
  }, [scrollToFormOnPayment, paymentEnabled]);

  const handlePlanCta = (plan: UyePagePlanDef) => {
    if (plan.id === "free") {
      openFreeForm();
      return;
    }
    setSelectedPlan(plan.id);
    if (!paymentEnabled) {
      setPremiumModalOpen(true);
    }
  };

  return (
    <>
      <PremiumSoonModal
        open={premiumModalOpen}
        onClose={() => setPremiumModalOpen(false)}
        onContinueFree={() => {
          openFreeForm();
        }}
      />

      <section
        id="uye-plan-secimi"
        className="border-t border-border/60 bg-gradient-to-b from-surface to-background py-10 sm:py-12"
        aria-labelledby="uye-plan-baslik"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="uye-plan-baslik" className="text-center text-xl font-bold tracking-tight text-primary sm:text-2xl">
            Başvuru öncesi paket seçimi
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-foreground/70">
            Önce paketinizi seçin. Ücretsiz vitrin ile hemen başvuru formunu açabilirsiniz; ücretli planlarda ödeme
            tamamlandığında aynı form ile devam edilecektir.
          </p>

          <div className="mx-auto mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/55">Fiyat gösterimi</span>
            <div
              className="inline-flex rounded-2xl border border-border bg-white p-1 shadow-sm"
              role="group"
              aria-label="Aylık veya yıllık"
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
          </div>

          <div className="mt-8 flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-5">
            {UYE_PAGE_PLANS.map((plan) => {
              const isRec = plan.variant === "recommended";
              const isStrong = plan.variant === "strong";
              const isFree = plan.id === "free";
              const showY = billing === "yearly" && !isFree;
              /** Ücretsiz kartta toggle yıllık/aylık metnini gösterir; ücretli kartlarda yıllık fiyat için */
              const blockBilling: BillingPeriod = isFree ? billing : showY ? "yearly" : "monthly";
              const freeSelected = isFree && selectedPlan === "free" && isFormVisible;

              const shell =
                isFree
                  ? "border-primary/20 bg-primary/[0.04] pt-6"
                  : isRec
                    ? "border-primary/40 pt-7 ring-2 ring-primary/15"
                    : isStrong
                      ? "border-primary/28 bg-primary/[0.045] pt-7 ring-1 ring-primary/12"
                      : "border-border pt-6";

              const activeRing = freeSelected ? " ring-2 ring-primary/35 ring-offset-2 ring-offset-background" : "";

              return (
                <article
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border bg-white px-5 pb-5 shadow-[0_4px_24px_rgba(11,60,93,0.07)] transition duration-200 ${shell}${activeRing}`}
                >
                  {plan.badge ? (
                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/30 bg-accent/18 px-3 py-1 text-[10px] font-bold tracking-wide text-foreground">
                      {plan.badge}
                    </div>
                  ) : null}

                  {!isFree ? (
                    <span className="absolute right-3 top-3 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/55">
                      Yakında
                    </span>
                  ) : freeSelected ? (
                    <span className="absolute right-3 top-3 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                      Seçildi
                    </span>
                  ) : null}

                  <h3 className="min-h-8 pr-16 text-lg font-bold text-primary">{plan.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-snug text-foreground/75">{plan.subtitle}</p>

                  <div className="mt-4 min-h-[4.25rem]">
                    <UyePlanPriceBlock plan={plan} billing={blockBilling} showYearlyBadge={showYearlyBadge} />
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/72">{plan.description}</p>

                  <ul className="mt-4 space-y-2 border-t border-border/80 pt-4 text-sm text-foreground/80">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => handlePlanCta(plan)}
                      className={`flex min-h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-semibold transition ${
                        isFree
                          ? "border border-primary/25 bg-white text-primary shadow-sm hover:bg-primary/5"
                          : isRec
                            ? "bg-primary text-white shadow-sm hover:bg-[#082f49]"
                            : "border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                      }`}
                    >
                      {plan.ctaLabel}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-foreground/55">
            Pro ve Business için ödeme entegrasyonu hazırlanmaktadır. Aktif olduğunda ödeme sonrası bu sayfadaki aynı
            başvuru formu ile devam edebileceksiniz.
          </p>
        </div>
      </section>

      <section
        id="uye-basvuru-alani"
        className="border-t border-border/60 bg-surface/50 pb-24 pt-12 sm:pb-16 sm:py-16"
        aria-labelledby="basvuru-baslik"
      >
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <h2 id="basvuru-baslik" className="sr-only">
            Üyelik başvurusu
          </h2>

          {!isFormVisible ? (
            <div
              ref={placeholderRef}
              className="rounded-2xl border border-dashed border-border bg-white/90 p-6 text-center shadow-sm sm:p-8"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                <PlaceholderIcon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-base font-bold text-primary">Başvuru formu paket seçiminizden sonra açılır</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-foreground/70">
                Ücretsiz vitrin başvurusu için ücretsiz paketi seçin. Ücretli paketlerde ise ödeme entegrasyonu
                tamamlandığında ödeme sonrası aynı form ile devam edilecektir.
              </p>
            </div>
          ) : (
            <div ref={formWrapRef} className="uye-form-reveal">
              <p className="mb-4 rounded-xl border border-border bg-white px-3 py-2 text-center text-xs font-semibold text-foreground/80">
                Seçilen paket: {selectedPackageLabel(selectedPlan)}
              </p>
              <BusinessMembershipForm />
            </div>
          )}
        </div>
      </section>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 p-3 shadow-[0_-8px_30px_rgba(11,60,93,0.08)] backdrop-blur-sm sm:hidden">
        <div className="pointer-events-auto mx-auto flex max-w-lg gap-2">
          <Link
            href="#uye-plan-secimi"
            className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-border bg-white text-sm font-semibold text-primary"
          >
            Planlar
          </Link>
          <button
            type="button"
            onClick={scrollToStickyTarget}
            className="flex min-h-11 flex-[2] items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white shadow-sm"
          >
            {isFormVisible ? "Forma git" : "Başvuru alanı"}
          </button>
        </div>
      </div>
    </>
  );
}
