import Link from "next/link";

import { GlobalSearchBar } from "@/components/layout/global-search-bar";
import { HeaderMarketingCategoryStrip } from "@/components/layout/header-marketing-category-strip";
import { HeaderMarketingServicesMenu } from "@/components/layout/header-marketing-services-menu";
import { SiteAuthNav } from "@/components/layout/site-auth-nav";
import { SiteHeaderDesktopFeedLink } from "@/components/layout/site-header-desktop-feed-link";
import { SITE_HEADER_LOGO_URL } from "@/lib/constants";

type Props = {
  searchValue: string;
  hiddenParams: Record<string, string>;
  navUser: { id: string; email?: string | null } | null;
};

const headerShellClass =
  "mx-auto w-full max-w-[min(100%,90rem)] px-3 sm:px-4 lg:px-6 xl:px-7";

export function SiteHeaderDesktopCluster({
  searchValue,
  hiddenParams,
  navUser,
}: Props) {
  return (
    <div className="hidden min-h-0 flex-col md:flex">
      <div className={`${headerShellClass} flex flex-col gap-0 pb-1 pt-2 sm:pt-2.5`}>
        <div className="flex min-w-0 items-center gap-3 lg:gap-5">
          <Link
            href="/"
            aria-label="Vize Firmaları — Ana sayfa"
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:gap-3.5"
          >
            <img
              src={SITE_HEADER_LOGO_URL}
              alt=""
              width={48}
              height={48}
              decoding="async"
              aria-hidden
              className="h-10 w-10 shrink-0 object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03] sm:h-11 sm:w-11"
            />
            <span className="flex min-w-0 items-baseline gap-x-1 leading-none sm:gap-x-1.5">
              <span className="bg-linear-to-br from-primary via-primary to-secondary bg-clip-text text-[1.0625rem] font-bold tracking-tight text-transparent sm:text-xl lg:text-2xl">
                Vize
              </span>
              <span className="text-[1rem] font-semibold tracking-tight text-primary/88 sm:text-[1.25rem] lg:text-[1.375rem]">
                Firmaları
              </span>
            </span>
          </Link>

          <div className="flex min-w-0 flex-1 justify-center px-1 sm:px-2">
            <div className="w-full max-w-2xl lg:max-w-3xl">
              <GlobalSearchBar
                hiddenParams={hiddenParams}
                defaultValue={searchValue}
                inputId="header-search"
                className="min-w-0 w-full"
                placeholder="Ülke, vize türü veya firma ara"
              />
            </div>
          </div>

          <div className="hidden shrink-0 items-center lg:flex">
            <SiteHeaderDesktopFeedLink />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <HeaderMarketingServicesMenu />
            <SiteAuthNav serverUser={navUser} />
          </div>
        </div>

        <div className="mt-2 border-t border-border/60 pt-2.5 sm:mt-2.5 sm:pt-3">
          <HeaderMarketingCategoryStrip />
        </div>
      </div>
    </div>
  );
}
