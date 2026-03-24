import Link from "next/link";

import { HeaderSearchForm } from "@/components/layout/header-search-form";
import { SiteAuthNav } from "@/components/layout/site-auth-nav";
import { SITE_HEADER_LOGO_URL } from "@/lib/constants";

type SiteHeaderProps = {
  /** @deprecated `defaultQuery` ile aynı */
  query?: string;
  defaultQuery?: string;
  /** Arama gönderilirken mevcut filtreleri koru */
  hiddenParams?: Record<string, string>;
};

const headerBarClass =
  "border-b border-border/70 bg-surface/85 shadow-[0_1px_0_0_rgba(11,60,93,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-surface/75";

export function SiteHeader({
  query,
  defaultQuery = "",
  hiddenParams = {},
}: SiteHeaderProps) {
  const searchValue = query ?? defaultQuery;

  return (
    <header
      className={`sticky top-0 z-50 pt-[env(safe-area-inset-top,0px)] ${headerBarClass}`}
    >
      <div className="container-shell flex min-h-[3.25rem] items-center gap-2 py-2 sm:min-h-[5.25rem] sm:gap-4 sm:py-3">
        <Link
          href="/"
          aria-label="Vize Firmaları — Ana sayfa"
          className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
            className="h-10 w-10 shrink-0 object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03] sm:h-12 sm:w-12"
          />
          <span className="flex min-w-0 items-baseline gap-x-1 leading-none sm:gap-x-1.5">
            <span className="bg-linear-to-br from-primary via-primary to-secondary bg-clip-text text-[1.0625rem] font-bold tracking-tight text-transparent sm:text-2xl">
              Vize
            </span>
            <span className="text-[1rem] font-semibold tracking-tight text-primary/88 sm:text-[1.375rem]">
              Firmaları
            </span>
          </span>
        </Link>

        <HeaderSearchForm
          hiddenParams={hiddenParams}
          defaultValue={searchValue}
          inputId="header-search"
          className="hidden min-w-0 flex-1 md:block"
        />

        <nav
          aria-label="Oturum ve firma"
          className="ml-auto flex shrink-0 flex-nowrap items-center justify-end gap-1.5 sm:gap-2"
        >
          <SiteAuthNav />
          <Link
            href="/firma-ekle"
            aria-label="Firma ekle"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-accent px-2.5 py-2 text-[0.8125rem] font-semibold text-primary shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:min-h-0 sm:min-w-0 sm:px-4 sm:text-sm"
          >
            <span className="sm:hidden">Ekle</span>
            <span className="hidden sm:inline">Firma Ekle</span>
          </Link>
        </nav>
      </div>

      <div className="container-shell border-t border-border/40 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-2 md:hidden">
        <HeaderSearchForm
          hiddenParams={hiddenParams}
          defaultValue={searchValue}
          inputId="header-search-mobile"
        />
      </div>
    </header>
  );
}
