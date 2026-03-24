import Image from "next/image";
import Link from "next/link";

type SiteHeaderProps = {
  /** @deprecated `defaultQuery` ile aynı */
  query?: string;
  defaultQuery?: string;
  /** Arama gönderilirken mevcut filtreleri koru */
  hiddenParams?: Record<string, string>;
};

export function SiteHeader({
  query,
  defaultQuery = "",
  hiddenParams = {},
}: SiteHeaderProps) {
  const searchValue = query ?? defaultQuery;

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-surface/90 backdrop-blur">
      <div className="container-shell flex min-h-[5.25rem] items-center gap-4 py-3">
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2"
        >
          <Image
            src="/logo.png"
            alt=""
            width={220}
            height={66}
            priority
            aria-hidden
            className="h-12 w-auto shrink-0 object-contain object-left transition-transform duration-200 group-hover:scale-[1.02] sm:h-14"
          />
          <span className="min-w-0 bg-gradient-to-br from-primary to-secondary bg-clip-text font-black leading-[1.1] tracking-tight text-transparent sm:leading-none">
            <span className="block text-lg sm:text-xl md:text-2xl">
              Vize Firmaları
            </span>
          </span>
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
          <input
            id="header-search"
            name="q"
            type="search"
            defaultValue={searchValue}
            placeholder="Ülke veya firma ara"
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-secondary"
          />
        </form>

        <nav className="ml-auto flex items-center gap-2">
          <Link
            href="/giris"
            className="rounded-xl px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            Giriş Yap
          </Link>
          <Link
            href="/firma-ekle"
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:brightness-95"
          >
            Firma Ekle
          </Link>
        </nav>
      </div>

      <div className="container-shell pb-3 md:hidden">
        <form action="/" method="get" role="search">
          {Object.entries(hiddenParams).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <label htmlFor="header-search-mobile" className="sr-only">
            Ülke veya firma ara
          </label>
          <input
            id="header-search-mobile"
            name="q"
            type="search"
            defaultValue={searchValue}
            placeholder="Ülke veya firma ara"
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-secondary"
          />
        </form>
      </div>
    </header>
  );
}
