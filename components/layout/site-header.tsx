import Link from "next/link";

type SiteHeaderProps = {
  defaultQuery?: string;
  /** Arama gönderilirken mevcut filtreleri koru */
  hiddenParams?: Record<string, string>;
};

export function SiteHeader({
  defaultQuery = "",
  hiddenParams = {},
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#0B3C5D]/10 bg-[#F7F9FB]/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-[#0B3C5D]"
        >
          VizeFirmalari
        </Link>

        <form
          action="/"
          method="get"
          className="hidden min-w-0 flex-1 md:block"
          role="search"
        >
          {Object.entries(hiddenParams).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <label htmlFor="header-search" className="sr-only">
            Ülke veya firma ara
          </label>
          <div className="relative">
            <span
              className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#0B3C5D]/50"
              aria-hidden
            >
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              id="header-search"
              name="q"
              type="search"
              placeholder="Ülke veya firma ara"
              defaultValue={defaultQuery}
              className="w-full rounded-xl border border-[#0B3C5D]/10 bg-white py-2.5 pl-10 pr-4 text-sm text-[#1A1A1A] shadow-sm outline-none ring-[#328CC1]/40 transition placeholder:text-[#1A1A1A]/40 focus:border-[#328CC1] focus:ring-2"
            />
          </div>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/giris"
            className="rounded-xl px-3 py-2 text-sm font-medium text-[#0B3C5D] transition hover:bg-[#0B3C5D]/5"
          >
            Giriş Yap
          </Link>
          <Link
            href="/firma-ekle"
            className="rounded-xl bg-[#D9A441] px-4 py-2 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f]"
          >
            Firma Ekle
          </Link>
        </div>
      </div>

      <form action="/" method="get" className="border-t border-[#0B3C5D]/5 px-4 pb-3 md:hidden">
        {Object.entries(hiddenParams).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
        <label htmlFor="header-search-mobile" className="sr-only">
          Ülke veya firma ara
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#0B3C5D]/50">
            <SearchIcon className="h-4 w-4" />
          </span>
          <input
            id="header-search-mobile"
            name="q"
            type="search"
            placeholder="Ülke veya firma ara"
            defaultValue={defaultQuery}
            className="w-full rounded-xl border border-[#0B3C5D]/10 bg-white py-2.5 pl-10 pr-4 text-sm text-[#1A1A1A] shadow-sm outline-none ring-[#328CC1]/40 focus:border-[#328CC1] focus:ring-2"
          />
        </div>
      </form>
    </header>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
