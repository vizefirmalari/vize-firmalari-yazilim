"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { BusinessMembershipForm } from "@/components/forms/business-membership-form";

type Props = {
  /** Ödeme başarılı dönüşte forma kaydır (ileride entegrasyon) */
  scrollToFormOnPayment?: boolean;
};

const JOURNEY_STEPS = [
  {
    step: "1",
    title: "Ön başvurunuzu iletin",
    body: "Firma ve yetkili iletişim bilgilerinizi güvenli form üzerinden paylaşın; birkaç dakika sürer.",
  },
  {
    step: "2",
    title: "Platform değerlendirmesi",
    body: "Ekibimiz başvurunuzu inceler. Otomatik yayın yoktur; uygunluk ve güven standartlarına göre dönüş yapılır.",
  },
  {
    step: "3",
    title: "Yayın ve tam panel",
    body: "Onay sonrası profiliniz hazırlanır. Mesajlaşma, lead yönetimi, paylaşım ve vitrin araçlarına ek ücret olmadan erişirsiniz.",
  },
] as const;

const FREE_INCLUDES = [
  "Firma paneli: mesajlaşma, başvurular, dosya alışverişi",
  "Akış ve blog ile içerik paylaşımı",
  "SEO uyumlu firma sayfası ve arama görünürlüğü",
  "Kurumsallık skoru ve liste performansı",
  "Sıfır komisyon; platform müşteriden sizin adınıza ücret almaz",
] as const;

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

export function UyeMembershipShell({ scrollToFormOnPayment }: Props) {
  const formAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollToFormOnPayment) return;
    const t = window.setTimeout(() => {
      formAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => window.clearTimeout(t);
  }, [scrollToFormOnPayment]);

  return (
    <>
      <section
        id="uye-basvuru-alani"
        className="scroll-mt-22 border-t border-border/60 bg-linear-to-b from-background via-surface/40 to-surface/70 py-12 sm:scroll-mt-24 sm:py-16"
        aria-labelledby="uye-on-baslik"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">Ön başvuru</p>
            <h2
              id="uye-on-baslik"
              className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl"
            >
              Platform üyeliği: tüm araçlar ücretsiz
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-base">
              Onaylı üye iş yerleri için panel, mesajlaşma, lead yönetimi, paylaşım ve vitrin özellikleri{" "}
              <strong className="font-semibold text-foreground">ayrı abonelik veya katman gerektirmez</strong>. Bu
              sayfadaki form yalnızca ön başvurudur; yayın kararı yönetim incelemesine bağlıdır.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="order-2 space-y-5 lg:order-1 lg:col-span-5">
              <div className="rounded-2xl border border-primary/12 bg-white/90 p-5 shadow-[0_8px_36px_rgba(11,60,93,0.08)] sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary/80">Nasıl ilerler?</h3>
                <ol className="mt-4 space-y-0">
                  {JOURNEY_STEPS.map((item, i) => (
                    <li
                      key={item.step}
                      className="uye-journey-step relative flex gap-4 border-l border-primary/15 pb-6 pl-5 last:border-l-transparent last:pb-0"
                      style={{ animationDelay: `${80 + i * 100}ms` }}
                    >
                      <span
                        className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 bg-primary text-[11px] font-bold text-white shadow-sm"
                        aria-hidden
                      >
                        {item.step}
                      </span>
                      <div>
                        <p className="text-base font-bold text-primary">{item.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground/72">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-sm font-bold text-primary">Yayında sunulanlar</h3>
                <p className="mt-1 text-xs text-foreground/55">Ücretli paket ayrımı yok; tüm firmalar aynı operasyon setine erişir.</p>
                <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
                  {FREE_INCLUDES.map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div ref={formAnchorRef} className="order-1 lg:order-2 lg:col-span-7">
              <div className="uye-form-reveal space-y-4">
                <div className="rounded-2xl border border-primary/14 bg-white px-4 py-4 shadow-[0_12px_40px_rgba(11,60,93,0.09)] sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
                  <div>
                    <span className="inline-flex rounded-full border border-accent/35 bg-accent/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground">
                      Ücretsiz ön başvuru
                    </span>
                    <p className="mt-2 text-sm font-semibold text-primary sm:text-base">
                      Yetkili bilgilerinizi bırakın; ekibimiz size dönüş yapsın
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/60 sm:mt-0 sm:max-w-44 sm:text-right">
                    Ortalama 2–3 iş günü içinde yanıt hedeflenir.
                  </p>
                </div>
                <BusinessMembershipForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 p-3 shadow-[0_-8px_30px_rgba(11,60,93,0.08)] backdrop-blur-sm sm:hidden">
        <div className="pointer-events-auto mx-auto flex max-w-lg gap-2">
          <Link
            href="#uye-basvuru-alani"
            className="flex min-h-11 flex-2 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white shadow-sm"
          >
            Başvuru formu
          </Link>
          <Link
            href="/"
            className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-border bg-white text-sm font-semibold text-primary"
          >
            Ana sayfa
          </Link>
        </div>
      </div>

      {/* Mobil sabit çubuk için alt boşluk */}
      <div className="h-16 sm:hidden" aria-hidden />
    </>
  );
}
