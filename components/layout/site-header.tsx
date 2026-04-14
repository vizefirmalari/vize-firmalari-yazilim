import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

import { SiteHeaderDesktopCluster } from "@/components/layout/site-header-desktop-cluster";
import { SiteHeaderMobileBar } from "@/components/layout/site-header-mobile-bar";
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
      <SiteHeaderMobileBar searchValue={searchValue} hiddenParams={hiddenParams} navUser={null} />
      <SiteHeaderDesktopCluster searchValue={searchValue} hiddenParams={hiddenParams} navUser={null} />
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
      <SiteHeaderMobileBar searchValue={searchValue} hiddenParams={hiddenParams} navUser={navUser} />
      <SiteHeaderDesktopCluster searchValue={searchValue} hiddenParams={hiddenParams} navUser={navUser} />
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
