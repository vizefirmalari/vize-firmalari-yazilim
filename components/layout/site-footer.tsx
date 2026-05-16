import Link from "next/link";
import Image from "next/image";
import { SITE_HEADER_LOGO_URL } from "@/lib/constants";
import { SERVICE_STOREFRONT_PUBLIC_BASE } from "@/lib/constants/service-storefront";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import { PLATFORM_WHATSAPP_PHONE, PLATFORM_WHATSAPP_URL } from "@/lib/constants/contact";
import { siteLogoAltText } from "@/lib/seo/defaults";

const BRAND_DESCRIPTION_LINES =
  "Vize başvuru süreçlerinde doğru firmayı bulmanızı sağlayan,\nkarşılaştırma ve danışmanlık platformu.";

const OFFICE_ADDRESS =
  "Office Köşkü, Mithatpaşa Mahallesi, Ortakapı Caddesi No:28 Hatchet, 22020 Edirne";

const CONTACT_EMAIL = "iletisim@vizefirmalari.com";

const navLinkClass =
  "flex min-h-11 w-full items-start rounded-md px-1 py-2.5 text-left text-[13px] leading-snug text-foreground/72 transition hover:bg-primary/4 hover:text-primary lg:min-h-0 lg:items-center lg:px-0 lg:py-1.5";

function FooterLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <Link href={href} className={navLinkClass}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={navLinkClass}>
      {children}
    </button>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <details className="overflow-hidden rounded-lg border border-primary/10 bg-white shadow-[0_1px_6px_rgba(11,60,93,0.04)] lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-2.5 text-left transition hover:bg-primary/3 active:bg-primary/5 [&::-webkit-details-marker]:hidden">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70">
            {title}
          </span>
          <span className="shrink-0 text-primary/45" aria-hidden>
            <ChevronDownGlyph className="h-4 w-4" />
          </span>
        </summary>
        <ul className="space-y-0 border-t border-border/60 px-1.5 py-1.5">{children}</ul>
      </details>
      <div className="hidden lg:block">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/55">
          {title}
        </h3>
        <ul className="mt-4 space-y-0.5">{children}</ul>
      </div>
    </div>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary/65 shadow-[0_1px_2px_rgba(11,60,93,0.04)] transition hover:border-primary/20 hover:bg-surface hover:text-primary lg:h-10 lg:w-10"
    >
      {children}
    </a>
  );
}

function ChevronDownGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const logoAlt = siteLogoAltText();
  const footerLogoSrc = withSupabaseImageTransform(SITE_HEADER_LOGO_URL, {
    width: 104,
    height: 104,
    quality: 72,
  });

  const ctaCard = (
    <div className="rounded-2xl border border-primary/12 bg-white p-4 shadow-[0_6px_24px_rgba(11,60,93,0.07)] max-lg:border-l-[3px] max-lg:border-l-accent/85 sm:p-6 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-8 lg:shadow-[0_8px_30px_rgba(11,60,93,0.06)]">
      <div className="min-w-0 lg:flex-1">
        <p className="text-[0.9375rem] font-semibold leading-snug text-primary sm:text-lg">
          Üye İş Yerimiz Olun
        </p>
        <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-foreground/65 sm:mt-1.5 sm:text-sm">
          Platformda yer alarak daha fazla müşteriye ulaşın
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-3 lg:mt-0 lg:shrink-0 lg:justify-end">
        <Link
          href="/uye-is-yerimiz-olun"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent/90 sm:w-auto"
        >
          Üye İş Yerimiz Olun
        </Link>
        <Link
          href={SERVICE_STOREFRONT_PUBLIC_BASE}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border-2 border-primary/25 bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/92 sm:w-auto"
        >
          Yazılım Çözümleri
        </Link>
        <Link
          href="/firma-sikayet"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface sm:w-auto"
        >
          Firma Şikayet Et
        </Link>
      </div>
    </div>
  );

  const linkColumns = (
    <div className="grid min-w-0 gap-2 sm:grid-cols-2 sm:gap-6 lg:col-span-4 lg:grid-cols-4 lg:gap-8 max-lg:rounded-2xl max-lg:border max-lg:border-primary/10 max-lg:bg-white/70 max-lg:p-2 max-lg:shadow-[0_2px_10px_rgba(11,60,93,0.04)]">
      <FooterColumn title="Platform">
        <li>
          <FooterLink href="/yardim-merkezi">Yardım Merkezi</FooterLink>
        </li>
        <li>
          <FooterLink href="/sss-ve-islem-rehberi">
            S.S.S. ve İşlem Rehberi
          </FooterLink>
        </li>
        <li>
          <FooterLink href="/kullanim-kosullari">
            Kullanım Koşulları
          </FooterLink>
        </li>
        <li>
          <FooterLink href="/hizmet-kosullari">Hizmet Koşulları</FooterLink>
        </li>
        <li>
          <FooterLink href="/mesafeli-satis-sozlesmesi">
            Mesafeli Satış Sözleşmesi
          </FooterLink>
        </li>
        <li>
          <FooterLink href="/sorumluluk-reddi-beyani">
            Sorumluluk Reddi Beyanı
          </FooterLink>
        </li>
      </FooterColumn>

      <FooterColumn title="Gizlilik & Hukuk">
        <li>
          <FooterLink href="/aydinlatma-metni">Aydınlatma Metni</FooterLink>
        </li>
        <li>
          <FooterLink href="/kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi">
            Kişisel Verilerin Korunması ve İşlenmesi ve Gizlilik
            Politikası
          </FooterLink>
        </li>
        <li>
          <FooterLink href="/cerez-politikasi">Çerez Politikası</FooterLink>
        </li>
        <li>
          <FooterLink href="/bilgi-toplumu-hizmetleri">
            Bilgi Toplumu Hizmetleri
          </FooterLink>
        </li>
        <li>
          <FooterLink href="/veri-guvenligi-politikasi">
            Veri Güvenliği Politikası
          </FooterLink>
        </li>
        <li>
          <FooterLink href="/kullanici-sozlesmesi">
            Kullanıcı Sözleşmesi
          </FooterLink>
        </li>
      </FooterColumn>

      <FooterColumn title="Kurumsal">
        <li>
          <FooterLink href="/hakkimizda">Hakkımızda</FooterLink>
        </li>
        <li>
          <FooterLink href="/iletisim">İletişim</FooterLink>
        </li>
        <li>
          <FooterLink href="/is-ortagimiz-olun">İş Ortağımız Olun</FooterLink>
        </li>
        <li>
          <FooterLink href="/uye-is-yerimiz-olun">Üye İş Yerimiz Olun</FooterLink>
        </li>
        <li>
          <FooterLink href="/kurumsal-site">Kurumsal Site</FooterLink>
        </li>
        <li>
          <FooterLink href="/kariyer">Kariyer</FooterLink>
        </li>
      </FooterColumn>

      <FooterColumn title="Keşfet">
        <li>
          <FooterLink href="/ulkelere-gore-vize-rehberi">
            Ülkelere Göre Vize Rehberi
          </FooterLink>
        </li>
        <li>
          <FooterLink>Vize Türleri</FooterLink>
        </li>
        <li>
          <FooterLink>Popüler Vize Süreçleri</FooterLink>
        </li>
        <li>
          <FooterLink>Vize Başvuru Rehberi</FooterLink>
        </li>
        <li>
          <FooterLink>Blog & Rehberler</FooterLink>
        </li>
        <li>
          <FooterLink>Güncel Duyurular</FooterLink>
        </li>
      </FooterColumn>
    </div>
  );

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-shell max-w-7xl py-8 sm:py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6 lg:gap-10 xl:gap-12">
          {/* Brand + contact + social: order 1 mobile; col 1 desktop */}
          <div className="order-1 flex min-w-0 flex-col gap-0 lg:col-span-2 lg:order-0 lg:gap-0">
            {/* 1–2. Brand + contact: grouped on mobile */}
            <div className="rounded-2xl border border-primary/10 bg-white p-4 shadow-[0_2px_12px_rgba(11,60,93,0.05)] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-3 lg:gap-3">
                { }
                <Image
                  src={footerLogoSrc ?? SITE_HEADER_LOGO_URL}
                  alt={logoAlt}
                  width={52}
                  height={52}
                  className="h-12 w-12 shrink-0 object-contain sm:h-[52px] sm:w-[52px] lg:h-12 lg:w-12"
                />
                <div className="min-w-0 text-left sm:text-left">
                  <p className="text-lg font-semibold tracking-tight text-primary">
                    Vize Firmaları
                  </p>
                  <p className="mt-1 max-w-sm whitespace-pre-line text-[13px] leading-snug text-foreground/68 sm:mt-1.5 sm:leading-relaxed lg:mt-2">
                    {BRAND_DESCRIPTION_LINES}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 border-t border-primary/10 pt-4 sm:space-y-3 lg:mt-8 lg:space-y-3.5 lg:border-border lg:pt-8">
                <p className="flex gap-2 text-[13px] leading-relaxed text-foreground/72">
                  <span className="mt-0.5 shrink-0 leading-none" aria-hidden>
                    📍
                  </span>
                  <span className="min-w-0">{OFFICE_ADDRESS}</span>
                </p>
                <p className="flex gap-2 text-[13px] leading-relaxed text-foreground/72">
                  <span className="mt-0.5 shrink-0 leading-none" aria-hidden>
                    ✉️
                  </span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="min-w-0 break-all font-medium text-secondary transition hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            {/* 3. Social */}
            <div className="mt-3.5 rounded-xl border border-primary/10 bg-white/90 p-3 shadow-[0_2px_10px_rgba(11,60,93,0.04)] sm:mt-4 lg:mt-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/50 lg:hidden">
                Sosyal medya
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start lg:justify-start lg:gap-2">
                <SocialIconLink
                  href="https://www.facebook.com/vizefirmalari"
                  label="Facebook — Vize Firmaları"
                >
                  <FacebookGlyph className="h-5 w-5" />
                </SocialIconLink>
                <SocialIconLink
                  href="https://www.instagram.com/vizefirmalari"
                  label="Instagram — Vize Firmaları"
                >
                  <InstagramGlyph className="h-5 w-5" />
                </SocialIconLink>
                <SocialIconLink
                  href={PLATFORM_WHATSAPP_URL}
                  label={`WhatsApp — Vize Firmaları (${PLATFORM_WHATSAPP_PHONE})`}
                >
                  <WhatsAppGlyph className="h-5 w-5" />
                </SocialIconLink>
                <SocialIconLink
                  href={`mailto:${CONTACT_EMAIL}`}
                  label={`E-posta — ${CONTACT_EMAIL}`}
                >
                  <EnvelopeGlyph className="h-5 w-5" />
                </SocialIconLink>
              </div>
            </div>
          </div>

          {/* 4. CTA — directly under social on mobile (order-2); full width row on desktop after columns */}
          <div className="order-2 lg:order-3 lg:col-span-6">{ctaCard}</div>

          {/* 5. Nav groups */}
          <div className="order-3 lg:order-2 lg:col-span-4">{linkColumns}</div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-white/90">
        <div className="container-shell max-w-7xl py-5">
          <p className="text-center text-[12px] text-foreground/50 sm:text-left">
            © {year} Vize Firmaları – Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16V9h-1c-1 0-1.3.62-1.3 1.26V12h2.2l-.35 3H13v6.8c4.56-.93 8-4.96 8-9.8z" />
    </svg>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EnvelopeGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
