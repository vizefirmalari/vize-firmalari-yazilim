import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

import { GlobalSearchBar } from "@/components/layout/global-search-bar";
import { HeaderFlowNavButton } from "@/components/layout/header-flow-nav-button";
import { SiteAuthNav } from "@/components/layout/site-auth-nav";
import { SITE_HEADER_LOGO_URL } from "@/lib/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SiteHeaderProps = {
  /** @deprecated `defaultQuery` ile aynı */
  query?: string;
  defaultQuery?: string;
  /** Arama gönderilirken mevcut filtreleri koru */
  hiddenParams?: Record<string, string>;
};

const headerBarClass =
  "border-b border-border/70 bg-surface/85 shadow-[0_1px_0_0_rgba(11,60,93,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-surface/75";

function HeaderFallback({
  searchValue,
  hiddenParams,
}: {
  searchValue: string;
  hiddenParams: Record<string, string>;
}) {
  return (
    <header
      className={`sticky top-0 z-50 pt-[env(safe-area-inset-top,0px)] ${headerBarClass}`}
    >
      <div className="container-shell flex min-h-14 items-center gap-1.5 py-2 md:hidden">
        <Link
          href="/"
          aria-label="Vize Firmaları — Ana sayfa"
          className="group flex shrink-0 items-center gap-1.5 focus-visible:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE_HEADER_LOGO_URL}
            alt=""
            width={36}
            height={36}
            fetchPriority="high"
            decoding="async"
            aria-hidden
            className="h-9 w-9 shrink-0 object-contain"
          />
          <span className="text-sm font-semibold tracking-tight text-primary max-[359px]:hidden">
            Vize Firmaları
          </span>
        </Link>
        <GlobalSearchBar
          hiddenParams={hiddenParams}
          defaultValue={searchValue}
          inputId="header-search-mobile-inline"
          className="min-w-0 flex-1"
          placeholder="Ara..."
          compact
        />
        <Link
          href="/giris"
          aria-label="Hesap"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white text-primary"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.3 0-6 1.8-6 4v1h12v-1c0-2.2-2.7-4-6-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="container-shell hidden min-h-13 items-center gap-2 py-2 sm:min-h-21 sm:gap-4 sm:py-3 md:flex">
        <Link
          href="/"
          aria-label="Vize Firmaları — Ana sayfa"
          className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE_HEADER_LOGO_URL}
            alt=""
            width={48}
            height={48}
            fetchPriority="high"
            decoding="async"
            aria-hidden
            className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
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
        <GlobalSearchBar
          hiddenParams={hiddenParams}
          defaultValue={searchValue}
          inputId="header-search"
          className="hidden min-w-0 flex-1 md:block"
        />
        <nav
          aria-label="Oturum ve firma"
          className="ml-auto flex shrink-0 flex-nowrap items-center justify-end gap-1.5 sm:gap-2"
        >
          <HeaderFlowNavButton />
          <span className="inline-block min-h-11 w-21 shrink-0 animate-pulse rounded-xl bg-primary/8 sm:w-23" />
          <Link
            href="/firma-ekle"
            aria-label="Firma ekle"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-accent px-2.5 py-2 text-[0.8125rem] font-semibold text-primary shadow-sm sm:min-h-0 sm:min-w-0 sm:px-4 sm:text-sm"
          >
            <span className="sm:hidden">Ekle</span>
            <span className="hidden sm:inline">Firma Ekle</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

async function SiteHeaderAsync({
  query,
  defaultQuery = "",
  hiddenParams = {},
}: SiteHeaderProps) {
  noStore();

  const searchValue = query ?? defaultQuery;

  const supabase = await createSupabaseServerClient();
  let navUser: { id: string; email?: string | null } | null = null;
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      navUser = { id: user.id, email: user.email };
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 pt-[env(safe-area-inset-top,0px)] ${headerBarClass}`}
    >
      <div className="container-shell flex min-h-14 items-center gap-1.5 py-2 md:hidden">
        <Link
          href="/"
          aria-label="Vize Firmaları — Ana sayfa"
          className="group flex shrink-0 items-center gap-1.5 focus-visible:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE_HEADER_LOGO_URL}
            alt=""
            width={36}
            height={36}
            fetchPriority="high"
            decoding="async"
            aria-hidden
            className="h-9 w-9 shrink-0 object-contain"
          />
          <span className="text-sm font-semibold tracking-tight text-primary max-[359px]:hidden">
            Vize Firmaları
          </span>
        </Link>
        <GlobalSearchBar
          hiddenParams={hiddenParams}
          defaultValue={searchValue}
          inputId="header-search-mobile-inline"
          className="min-w-0 flex-1"
          placeholder="Ara..."
          compact
        />
        <Link
          href={navUser ? "/hesabim" : "/giris"}
          aria-label={navUser ? "Profil" : "Giriş yap"}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white text-primary"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.3 0-6 1.8-6 4v1h12v-1c0-2.2-2.7-4-6-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="container-shell hidden min-h-13 items-center gap-2 py-2 sm:min-h-21 sm:gap-4 sm:py-3 md:flex">
        <Link
          href="/"
          aria-label="Vize Firmaları — Ana sayfa"
          className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
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

        <GlobalSearchBar
          hiddenParams={hiddenParams}
          defaultValue={searchValue}
          inputId="header-search"
          className="hidden min-w-0 flex-1 md:block"
        />

        <nav
          aria-label="Oturum ve firma"
          className="ml-auto flex shrink-0 flex-nowrap items-center justify-end gap-1.5 sm:gap-2"
        >
          <HeaderFlowNavButton />
          <SiteAuthNav serverUser={navUser} />
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
    </header>
  );
}

export function SiteHeader(props: SiteHeaderProps) {
  const searchValue = props.query ?? props.defaultQuery ?? "";
  const hiddenParams = props.hiddenParams ?? {};
  return (
    <Suspense
      fallback={
        <HeaderFallback searchValue={searchValue} hiddenParams={hiddenParams} />
      }
    >
      <SiteHeaderAsync {...props} />
    </Suspense>
  );
}
