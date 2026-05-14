import type { Metadata } from "next";
import Link from "next/link";

import { STOREFRONT_HUB_PATH } from "@/lib/software/storefront-hubs";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "İşini büyüt",
  description: `Vize danışmanlık firmaları için reklam, otomasyon, web ve CRM çözümleri vitrin alanı. ${SITE_BRAND_NAME} — şeffaf paketler ve talep akışı.`,
  alternates: { canonical: absoluteUrl("/isini-buyut") },
};

export default function IsiniBuyutLandingPage() {
  return (
    <div className="container-shell py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">Growth stack</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">İşini büyüt</h1>
        <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
          Reklam ve müşteri kazanımından yapay zekâ otomasyonuna, web sistemlerinden CRM ve operasyon katmanına kadar
          seçilebilir çözümler. Bu vitrin; firma panelindeki satın alma akışıyla aynı kataloğu kamuya açık ve SEO uyumlu
          biçimde sunar.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-foreground/50">
          Sonuç veya getiri garantisi sunulmaz; süreçler şeffaf raporlama ve iyileştirme disiplimiyle yürütülür.
        </p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={STOREFRONT_HUB_PATH["yazilim-cozumleri"]}
          className="premium-card group block p-6 transition hover:border-secondary/30 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/45">Vitrin</p>
          <p className="mt-2 text-lg font-bold text-primary group-hover:underline">Yazılım çözümleri</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/65">
            Web, içerik, reklam ve premium sistem vitrini — tek kolon mobil kart deneyimi.
          </p>
        </Link>
        <Link
          href={STOREFRONT_HUB_PATH["otomasyon-cozumleri"]}
          className="premium-card group block p-6 transition hover:border-secondary/30 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/45">Otomasyon</p>
          <p className="mt-2 text-lg font-bold text-primary group-hover:underline">Otomasyon çözümleri</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/65">
            Yapay zekâ, botlar ve entegrasyon katmanları; talep toplama ve yönlendirme odağı.
          </p>
        </Link>
        <Link
          href="/iletisim"
          className="premium-card group flex flex-col justify-between p-6 transition hover:border-secondary/30 hover:shadow-md sm:col-span-2 lg:col-span-1"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/45">Operasyon</p>
            <p className="mt-2 text-lg font-bold text-primary group-hover:underline">Teklif ve bilgi</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/65">
              Kurumsal ihtiyaçlarınızı birlikte netleştirelim; kapsam ve süre proje bazında planlanır.
            </p>
          </div>
          <span className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">
            İletişime geç
          </span>
        </Link>
      </div>
    </div>
  );
}
