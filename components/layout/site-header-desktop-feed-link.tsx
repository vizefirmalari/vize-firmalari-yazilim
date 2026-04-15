"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isPublicFeedPath, PUBLIC_FEED_ROUTE } from "@/lib/constants";

/**
 * Masaüstü header (lg+) — arama ile Hizmetler arası; mobilde kullanılmaz.
 */
export function SiteHeaderDesktopFeedLink() {
  const pathname = usePathname();
  const active = isPublicFeedPath(pathname);

  return (
    <Link
      href={PUBLIC_FEED_ROUTE}
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition-[box-shadow,filter,transform] duration-150 hover:brightness-[0.94] hover:shadow-md active:scale-[0.99] active:brightness-[0.9] active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
        active ? "shadow-md ring-2 ring-primary/35 ring-offset-2 ring-offset-surface" : ""
      }`}
    >
      Akış
    </Link>
  );
}
