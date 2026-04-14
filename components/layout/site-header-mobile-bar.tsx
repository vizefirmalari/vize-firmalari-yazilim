import Link from "next/link";

import { GlobalSearchBar } from "@/components/layout/global-search-bar";
import { SiteHeaderMobileDrawer } from "@/components/layout/site-header-mobile-drawer";
import { SITE_HEADER_LOGO_URL } from "@/lib/constants";

type Props = {
  searchValue: string;
  hiddenParams: Record<string, string>;
  navUser: { id: string; email?: string | null } | null;
};

const headerShellClass =
  "mx-auto w-full max-w-[min(100%,90rem)] px-3 sm:px-4 lg:px-6 xl:px-7";

export function SiteHeaderMobileBar({ searchValue, hiddenParams, navUser }: Props) {
  return (
    <div
      className={`${headerShellClass} flex min-h-14 items-center gap-2 py-2 md:hidden`}
    >
      <Link
        href="/"
        aria-label="Vize Firmaları — Ana sayfa"
        className="group flex shrink-0 items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2"
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
        <span className="max-[380px]:hidden text-sm font-semibold tracking-tight text-primary">
          Vize Firmaları
        </span>
      </Link>
      <GlobalSearchBar
        hiddenParams={hiddenParams}
        defaultValue={searchValue}
        inputId="header-search-mobile-inline"
        className="min-w-0 flex-1"
        placeholder="Ülke, vize türü veya firma ara"
        compact
      />
      <SiteHeaderMobileDrawer
        navUser={navUser}
        searchValue={searchValue}
        hiddenParams={hiddenParams}
      />
    </div>
  );
}
