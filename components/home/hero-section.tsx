import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#0B3C5D]/10 bg-[#0B3C5D] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#328CC1] blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#D9A441]/30 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,60,93,0.95),rgba(50,140,193,0.35))]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            Güvenilir karşılaştırma
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Vize Danışmanlık Firmalarını Karşılaştırın
          </h1>
          <p className="mt-4 text-lg text-white/85 sm:text-xl">
            Güvenilir firmaları inceleyin, karşılaştırın ve başvurunuzu başlatın
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#firmalar"
              className="inline-flex items-center justify-center rounded-xl bg-[#D9A441] px-6 py-3 text-base font-semibold text-[#1A1A1A] shadow-lg shadow-black/10 transition hover:bg-[#c8942f]"
            >
              Firmaları Gör
            </Link>
            <Link
              href="/firma-ekle"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Firmanızı ekleyin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
