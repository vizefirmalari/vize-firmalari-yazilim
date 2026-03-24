import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#0B3C5D]/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-base font-semibold text-[#0B3C5D]">VizeFirmalari</p>
          <p className="mt-1 max-w-md text-sm text-[#1A1A1A]/65">
            Vize danışmanlık firmalarını karşılaştırın; güven ve şeffaflık önceliğimizdir.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-[#328CC1]">
          <Link href="/" className="hover:underline">
            Ana Sayfa
          </Link>
          <Link href="/firma-ekle" className="hover:underline">
            Firma Ekle
          </Link>
        </div>
      </div>
      <div className="border-t border-[#0B3C5D]/5 py-4 text-center text-xs text-[#1A1A1A]/45">
        © {new Date().getFullYear()} VizeFirmalari. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
