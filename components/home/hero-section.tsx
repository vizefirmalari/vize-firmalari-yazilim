import Link from "next/link";

export type HeroProps = {
  title?: string | null;
  subtitle?: string | null;
  ctaText?: string | null;
  ctaHref?: string | null;
};

export function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
}: HeroProps = {}) {
  const resolvedTitle =
    title?.trim() || "Vize Danışmanlık Firmalarını Karşılaştırın";
  const resolvedSubtitle =
    subtitle?.trim() ||
    "Güvenilir firmaları inceleyin, karşılaştırın ve başvurunuzu başlatın.";
  const resolvedCta = ctaText?.trim() || "Firmaları Gör";
  const resolvedHref = ctaHref?.trim() || "#firmalar";

  return (
    <section className="container-shell py-10 lg:py-14">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary to-secondary px-6 py-12 text-white shadow-sm sm:px-10">
        <div
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
          aria-hidden
        />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1 text-xs font-semibold tracking-wide">
            Premium Vize Ekosistemi
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            {resolvedTitle}
          </h1>
          <p className="mt-4 text-sm text-white/90 sm:text-base">
            {resolvedSubtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              href={resolvedHref}
              className="inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {resolvedCta}
            </Link>
            <Link
              href="/akis"
              className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Akışı İncele
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** @deprecated `Hero` kullanın; geriye dönük uyumluluk için aynı bileşen. */
export const HeroSection = Hero;
