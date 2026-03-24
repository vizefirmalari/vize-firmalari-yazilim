import Link from "next/link";

import { SITE_HEADER_LOGO_URL } from "@/lib/constants";

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
          aria-label="Vize Firmaları — Ana sayfa"
          className="group flex min-w-0 shrink-0 items-center gap-3 sm:gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2"
        >
          {/* `next/image` + yerel /logo.png bazı ortamlarda `/_next/image` ile kırılıyor; CDN’den doğrudan yükleme */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE_HEADER_LOGO_URL}
            alt=""
            width={48}
            height={48}
            fetchPriority="high"
            decoding="async"
            aria-hidden
            className="h-11 w-11 shrink-0 object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03] sm:h-12 sm:w-12"
          />
          <span className="flex min-w-0 items-baseline gap-x-1.5 leading-none">
            <span className="bg-linear-to-br from-primary via-primary to-secondary bg-clip-text text-[1.125rem] font-bold tracking-tight text-transparent sm:text-2xl">
              Vize
            </span>
            <span className="text-[1.0625rem] font-semibold tracking-tight text-primary/88 sm:text-[1.375rem]">
              Firmaları
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

        <nav className="ml-auto flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <Link
            href="/giris"
            className="rounded-xl px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 sm:px-4"
          >
            Giriş yap
          </Link>
          <Link
            href="/kayit"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-secondary hover:bg-secondary/10 sm:px-4"
          >
            Kayıt ol
          </Link>
          <Link
            href="/firma-ekle"
            className="rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-primary shadow-sm hover:brightness-95 sm:px-4"
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
