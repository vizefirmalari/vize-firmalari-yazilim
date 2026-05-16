import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { UyeMembershipShell } from "@/components/membership/uye-membership-shell";
import { UyeServiceVitrinPromoSection } from "@/components/membership/uye-service-vitrin-promo-section";
import type { ServiceStorefrontPromoCard } from "@/lib/data/service-storefront-membership-promo";

const benefitCards = [
  {
    title: "Sıfır komisyon modeli",
    body: "Platform, müşteriden sizin adınıza ücret almaz; gelir modeliniz tamamen sizin kontrolünüzdedir.",
    icon: IconCommission,
  },
  {
    title: "Nitelikli danışan erişimi",
    body: "Lead skor sistemi ile gerçekten ilgilenen kullanıcılarla eşleşin; zamanı doğru talebe harcayın.",
    icon: IconLead,
  },
  {
    title: "Mesajlaşma ve dosya akışı",
    body: "Danışanlarla doğrudan yazışın; belge ve dosya paylaşımıyla süreci tek kanalda yürütün.",
    icon: IconChat,
  },
  {
    title: "SEO ile Google görünürlüğü",
    body: "Ücretsiz SEO desteği ve yapılandırılmış profil ile arama motorlarında keşfedilme şansını artırın.",
    icon: IconSeo,
  },
  {
    title: "Sosyal medya gücü",
    body: "Facebook ve Instagram’da toplam 160K+ takipçiye ulaşan kanallarımızda ücretsiz tanıtım fırsatları.",
    icon: IconSocial,
  },
  {
    title: "Kurumsal skor ve hype",
    body: "Kurumsallık skoru ile güven verin; akışta içerik paylaşarak hype puanınızı yükseltin ve listede öne çıkın.",
    icon: IconScore,
  },
] as const;

type UyePageProps = {
  /** Ödeme tamamlandıktan sonra forma kaydır (URL: ?odeme=basarili) */
  scrollToFormOnPayment?: boolean;
  promoServices?: ServiceStorefrontPromoCard[];
};

export function UyeIsYerimizOlunPage({ scrollToFormOnPayment, promoServices = [] }: UyePageProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="border-b border-border/60 bg-linear-to-b from-surface to-background">
          <div className="mx-auto max-w-5xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-primary/55">
              Firma ortaklığı
            </p>
            <h1 className="mt-3 text-center text-[1.65rem] font-bold leading-tight tracking-tight text-primary sm:text-3xl md:text-4xl md:leading-[1.15]">
              Platformumuzda Yer Alın,
              <br className="hidden sm:inline" />{" "}
              <span className="text-primary">Daha Fazla Danışana Ulaşın</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-center text-[0.9375rem] leading-relaxed text-foreground/80 sm:text-lg">
              Vize Firmaları; vize danışmanlığı arayan kullanıcılar ile profesyonel ofisleri buluşturan,
              <strong className="font-semibold text-foreground"> güven odaklı bir vitrin platformudur</strong>.
              Aşağıdaki avantajlar, <strong className="font-semibold text-foreground">yayına alınmış üye iş yeri</strong>{" "}
              profilleri için geçerlidir. Bu sayfadaki form yalnızca{" "}
              <strong className="font-semibold text-foreground">ön başvuru / talep toplama</strong> içindir;{" "}
              firma otomatik olarak listeye eklenmez,{" "}
              <strong className="font-semibold text-foreground">yönetim incelemesi sonrası</strong> firma kaydı ayrıca
              oluşturulur.
            </p>

            <div
              className="mx-auto mt-8 max-w-3xl rounded-xl border border-primary/15 bg-surface/90 p-4 text-left text-sm leading-relaxed text-foreground/85 sm:p-5 sm:text-[0.9375rem]"
              role="note"
            >
              <p className="m-0 font-semibold text-foreground">Önemli</p>
              <p className="mt-2 mb-0">
                Bu formu doldurmanız, firmanızın platformda yayınlanacağı anlamına gelmez. Gönderdiğiniz bilgiler
                sistemde kayıt altına alınır ancak doğrudan yayına alınmaz. Başvurular platform yönetimi tarafından
                incelenir ve yalnızca uygun bulunan firmalar <strong className="font-semibold text-foreground">manuel
                olarak</strong> sisteme eklenir. Otomatik yayınlama <strong className="font-semibold text-foreground">
                yoktur</strong>.
              </p>
            </div>

            <div className="mx-auto mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="#uye-basvuru-alani"
                className="inline-flex min-h-12 w-full max-w-sm items-center justify-center rounded-2xl bg-primary px-6 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(11,60,93,0.22)] transition hover:bg-[#082f49] sm:w-auto sm:max-w-none"
              >
                Ön başvuru formuna git
              </Link>
              <p className="max-w-xs text-center text-xs text-foreground/55 sm:text-left">
                Form ücretsizdir; yayın yönetim onayına bağlıdır.
              </p>
            </div>

            <ul className="mx-auto mt-10 max-w-3xl space-y-3 text-left text-sm leading-relaxed text-foreground/85 sm:text-[0.9375rem]">
              <HeroCheck>
                <strong className="font-semibold text-foreground">Sıfır komisyon</strong> — müşteriden
                platform adına ücret alınmaz.
              </HeroCheck>
              <HeroCheck>
                <strong className="font-semibold text-foreground">Lead skor sistemi</strong> ile gerçek
                niyetli danışanlara erişim.
              </HeroCheck>
              <HeroCheck>
                <strong className="font-semibold text-foreground">Doğrudan mesajlaşma</strong> ve dosya
                gönderme / alma ile tek kanalda iletişim.
              </HeroCheck>
              <HeroCheck>
                <strong className="font-semibold text-foreground">Ücretsiz SEO desteği</strong> ve Google
                görünürlüğünü güçlendiren profil yapısı.
              </HeroCheck>
              <HeroCheck>
                <strong className="font-semibold text-foreground">Facebook + Instagram toplam 160K+</strong>{" "}
                takipçi ağında ücretsiz tanıtım imkânları.
              </HeroCheck>
              <HeroCheck>
                Akışa özel <strong className="font-semibold text-foreground">içerik paylaşımı</strong>;
                etiketler, içerikler ve WhatsApp butonları ile erişimi büyütme.
              </HeroCheck>
              <HeroCheck>
                <strong className="font-semibold text-foreground">Kurumsal skor</strong> ile güven;
                içerik paylaşarak <strong className="font-semibold text-foreground">hype puanı</strong>{" "}
                artırma ve listede öne çıkma.
              </HeroCheck>
            </ul>
          </div>
        </section>

        <UyeMembershipShell scrollToFormOnPayment={scrollToFormOnPayment} promoServices={promoServices} />

        {/* Avantaj kartları */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          {promoServices.length > 0 ? (
            <UyeServiceVitrinPromoSection variant="after-publish" items={promoServices} className="mb-10" />
          ) : null}
          <h2 className="text-center text-xl font-bold tracking-tight text-primary sm:text-2xl">
            Yayında sizi neler bekliyor?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-foreground/65 sm:text-base">
            Aşağıdaki faydalar, onaylanıp yayına alındıktan sonra ücretsiz sunulan üye iş yeri deneyimini özetler. Ön
            başvuru formu bu özellikleri tek başına açmaz; yönetim onayı sonrası geçerlidir.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {benefitCards.map((c, i) => (
              <div
                key={c.title}
                className="uye-benefit-card flex flex-col rounded-2xl border border-primary/10 bg-white p-5 shadow-[0_4px_24px_rgba(11,60,93,0.06)] transition hover:border-primary/18 hover:shadow-[0_8px_32px_rgba(11,60,93,0.09)] sm:p-6"
                style={{ animationDelay: `${100 + i * 70}ms` }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold tracking-tight text-primary sm:text-[1.0625rem]">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/72">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kısa hukuki not */}
        <section className="mx-auto max-w-3xl px-4 pb-14 pt-2 sm:px-6 lg:px-8 lg:pb-16">
          <div className="rounded-xl border border-primary/12 bg-white/80 p-5 text-sm leading-relaxed text-foreground/75 shadow-sm sm:p-6">
            <p className="m-0">
              <strong className="font-semibold text-foreground">Vize Firmaları yalnızca aracı platformdur</strong>
              ; mesleki danışmanlık sunmaz, müşteri ile firma arasındaki sözleşmeye taraf olmaz. Ayrıntılar
              için{" "}
              <Link href="/hizmet-kosullari" className="font-medium text-secondary underline-offset-2 hover:underline">
                Hizmet Koşulları
              </Link>
              {" "}ve{" "}
              <Link
                href="/kullanici-sozlesmesi"
                className="font-medium text-secondary underline-offset-2 hover:underline"
              >
                Kullanıcı Sözleşmesi
              </Link>
              .
            </p>
            <p className="mt-3 mb-0 text-foreground/65">
              <strong className="font-semibold text-foreground/80">Not:</strong> Yukarıdaki form yalnızca ön başvuru
              toplar; gönderim tek başına yayınlanmış firma kaydı oluşturmaz. Kurumsal kayıt akışı için{" "}
              <Link href="/firma-ekle" className="font-medium text-secondary underline-offset-2 hover:underline">
                firma ekle
              </Link>{" "}
              sayfasındaki sürece de bakabilirsiniz (platform kuralları geçerlidir).
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function HeroCheck({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

function IconCommission(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v18M8 7h8M8 17h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M6 12h12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />
    </svg>
  );
}

function IconLead(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 1116 0H4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChat(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v10H9l-5 4V6z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconSeo(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 11h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconSocial(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 8h3v3M8 16H5v-3M16 16l-4-4-3 3-4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function IconScore(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l2.4 7.4h7.8l-6.3 4.6 2.4 7.4L12 17.8l-6.3 4.6 2.4-7.4L2 10.4h7.8L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
