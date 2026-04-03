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
        d="M4 6h16v12H4V6zm2 2v8h12V8H6zm3 2h6M9 14h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
  const formRef = useRef<HTMLDivElement>(null);
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
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const openFreeForm = () => {
    setSelectedPlan("free");
    setIsFormVisible(true);
    scrollToForm();
  };

  const scrollToStickyTarget = () => {
    if (isFormVisible) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      if (selectedPlan === "free" && isFormVisible) {
        scrollToForm();
        return;
      }
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
            Size uygun paketi seçin
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-foreground/70">
            Ücretsiz vitrin ile arama motorlarında görünür olun; Pro ve Business ile panel, lead yönetimi, mesajlaşma ve
            büyüme araçlarına geçiş yapın. Ücretsiz pakette formu anında açabilirsiniz.
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

          <div className="mt-8 flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-5">
            {UYE_PAGE_PLANS.map((plan) => {
              const isRec = plan.variant === "recommended";
              const isStrong = plan.variant === "strong";
              const isFree = plan.id === "free";
              const showY = billing === "yearly" && !isFree;
              const blockBilling: BillingPeriod = isFree ? billing : showY ? "yearly" : "monthly";
              const freeSelected = isFree && selectedPlan === "free" && isFormVisible;

              const shell = isFree
                ? "border-primary/22 bg-primary/[0.045] pt-6 hover:border-primary/30 hover:bg-primary/[0.06]"
                : isRec
                  ? "border-primary/42 pt-7 ring-2 ring-primary/14 hover:border-primary/50 hover:ring-primary/22"
                  : isStrong
                    ? "border-primary/30 bg-primary/[0.05] pt-7 ring-1 ring-primary/14 hover:border-primary/38 hover:shadow-[0_14px_44px_rgba(11,60,93,0.11)]"
                    : "border-border pt-6";

              const activeRing = freeSelected ? " ring-2 ring-primary/38 ring-offset-2 ring-offset-background" : "";

              return (
                <article
                  key={plan.id}
                  className={`relative flex h-full flex-col rounded-2xl border bg-white px-5 pb-5 shadow-[0_4px_24px_rgba(11,60,93,0.07)] transition-all duration-200 hover:z-[1] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(11,60,93,0.11)] ${shell}${activeRing}`}
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
                  ) : null}

                  <h3 className={`min-h-8 text-lg font-bold text-primary ${!isFree ? "pr-16" : ""}`}>{plan.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-snug text-foreground/78">{plan.subtitle}</p>

                  <div className="mt-4 min-h-[4.25rem] shrink-0">
                    <UyePlanPriceBlock plan={plan} billing={blockBilling} showYearlyBadge={showYearlyBadge} />
                  </div>

                  <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-foreground/72 sm:min-h-[5rem]">
                    {plan.description}
                  </p>

                  <ul className="mt-4 flex flex-1 flex-col gap-2 border-t border-border/80 pt-4 text-sm text-foreground/82">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    <button
                      type="button"
                      onClick={() => handlePlanCta(plan)}
                      aria-pressed={isFree && freeSelected ? true : undefined}
                      className={`flex min-h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-semibold transition ${
                        isFree && freeSelected
                          ? "cursor-pointer border border-primary/35 bg-primary/10 text-primary shadow-sm hover:bg-primary/14"
                          : isFree
                            ? "border border-primary/28 bg-white text-primary shadow-sm hover:bg-primary/5"
                            : isRec
                              ? "bg-primary text-white shadow-sm hover:bg-[#082f49]"
                              : "border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                      }`}
                    >
                      {isFree && freeSelected ? "Seçildi" : plan.ctaLabel}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-foreground/55">
            Pro ve Business ödemesi yakında bu sayfada tamamlanacak; ardından aynı başvuru formu ile kayıt sürecine
            devam edebileceksiniz.
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
              className="rounded-2xl border border-border bg-white p-6 text-center shadow-[0_4px_28px_rgba(11,60,93,0.07)] sm:p-8"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                <PlaceholderIcon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-base font-bold text-primary sm:text-lg">Firmanız için en uygun paketi seçin</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/72">
                Ücretsiz vitrin ile hemen başvurabilir, ücretli paketlerle ise panel, lead yönetimi, mesajlaşma ve büyüme
                araçlarına erişebilirsiniz.
              </p>
              <Link
                href="#uye-plan-secimi"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f49]"
              >
                Paketleri incele
              </Link>
            </div>
          ) : (
            <div ref={formRef} className="uye-form-reveal">
              {selectedPlan === "free" ? (
                <div className="mb-5 rounded-2xl border border-border bg-white p-4 text-left shadow-sm sm:p-5">
                  <p className="text-sm font-bold text-primary sm:text-base">Ücretsiz Vitrin Başvurusu</p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/75 sm:text-sm">
                    Bu başvuru ücretsiz vitrin paketi için alınır. Yönetim incelemesi sonrası uygun bulunan firmalar
                    manuel olarak yayına alınır.
                  </p>
                </div>
              ) : null}
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
            {isFormVisible ? "Forma git" : "Paket seç"}
          </button>
        </div>
      </div>
    </>
  );
}
