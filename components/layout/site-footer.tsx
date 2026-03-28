import Link from "next/link";
import { SITE_HEADER_LOGO_URL } from "@/lib/constants";
import { siteLogoAltText } from "@/lib/seo/defaults";

const BRAND_DESCRIPTION_LINES =
  "Vize başvuru süreçlerinde doğru firmayı bulmanızı sağlayan,\nkarşılaştırma ve danışmanlık platformu.";

const OFFICE_ADDRESS =
  "Office Köşkü, Mithatpaşa Mahallesi, Ortakapı Caddesi No:28 Hatchet, 22020 Edirne";

const CONTACT_EMAIL = "iletisim@vizefirmalari.com";

const navLinkClass =
  "block w-full rounded-md py-1.5 text-left text-[13px] leading-snug text-foreground/72 transition hover:bg-primary/4 hover:text-primary sm:py-1";

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
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/55">
        {title}
      </h3>
      <ul className="mt-4 space-y-0.5">{children}</ul>
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary/65 shadow-[0_1px_2px_rgba(11,60,93,0.04)] transition hover:border-primary/20 hover:bg-surface hover:text-primary"
    >
      {children}
    </a>
  );
}

function SocialIconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 cursor-default items-center justify-center rounded-xl border border-primary/10 bg-white text-primary/45 shadow-[0_1px_2px_rgba(11,60,93,0.04)]"
    >
      {children}
    </span>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const logoAlt = siteLogoAltText();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-shell max-w-7xl py-12 sm:py-14">
        <div className="grid gap-12 lg:grid-cols-6 lg:gap-10 xl:gap-12">
          {/* Brand */}
          <div className="min-w-0 lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_HEADER_LOGO_URL}
                alt={logoAlt}
                width={52}
                height={52}
                className="h-12 w-12 shrink-0 object-contain"
                decoding="async"
              />
              <div>
                <p className="text-lg font-semibold tracking-tight text-primary">
                  Vize Firmaları
                </p>
                <p className="mt-2 max-w-sm whitespace-pre-line text-[13px] leading-relaxed text-foreground/68">
                  {BRAND_DESCRIPTION_LINES}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-border pt-8">
              <p className="text-[13px] leading-relaxed text-foreground/72">
                <span className="mr-1.5" aria-hidden>
                  📍
                </span>
                {OFFICE_ADDRESS}
              </p>
              <p className="text-[13px] leading-relaxed text-foreground/72">
                <span className="mr-1.5" aria-hidden>
                  ✉️
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-secondary transition hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
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
              <SocialIconButton label="WhatsApp (yakında)">
                <WhatsAppGlyph className="h-5 w-5" />
              </SocialIconButton>
              <SocialIconButton label="E-posta">
                <EnvelopeGlyph className="h-5 w-5" />
              </SocialIconButton>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid min-w-0 gap-10 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4 lg:gap-8">
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
                <FooterLink>Bilgi Toplumu Hizmetleri</FooterLink>
              </li>
              <li>
                <FooterLink>Veri Güvenliği Politikası</FooterLink>
              </li>
              <li>
                <FooterLink>Kullanıcı Sözleşmesi</FooterLink>
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
                <FooterLink>İş Ortağımız Olun</FooterLink>
              </li>
              <li>
                <FooterLink href="/firma-ekle">Üye İş Yerimiz Olun</FooterLink>
              </li>
              <li>
                <FooterLink>Kurumsal Site</FooterLink>
              </li>
              <li>
                <FooterLink>Kariyer</FooterLink>
              </li>
            </FooterColumn>

            <FooterColumn title="Keşfet">
              <li>
                <FooterLink>Ülkelere Göre Vize Rehberi</FooterLink>
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
        </div>

        {/* CTA */}
        <div className="mt-12 lg:mt-14">
          <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-[0_8px_30px_rgba(11,60,93,0.06)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="min-w-0 lg:flex-1">
              <p className="text-base font-semibold text-primary sm:text-lg">
                Üye İş Yerimiz Olun
              </p>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-foreground/65">
                Platformda yer alarak daha fazla müşteriye ulaşın
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-0 lg:shrink-0">
              <Link
                href="/firma-ekle"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent/90"
              >
                Üye İş Yerimiz Olun
              </Link>
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface"
              >
                Firma Şikayet Et
              </button>
            </div>
          </div>
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
