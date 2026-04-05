import Link from "next/link";

export function ExploreHubFallback() {
  return (
    <div className="premium-card my-6 p-8 text-center md:p-10">
      <p className="text-base font-semibold text-primary">Keşfet kartları</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/75">
        Şu an veri setine göre gösterilecek keşfet kategorisi bulunmuyor. Tüm
        yayınlanmış firmaları ana listeden inceleyebilirsiniz.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
      >
        Firmalara git
      </Link>
    </div>
  );
}
