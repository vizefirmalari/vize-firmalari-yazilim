"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isPublicFeedPath, PUBLIC_FEED_ROUTE } from "@/lib/constants";

export function HeaderFlowNavButton() {
  const pathname = usePathname();
  const active = isPublicFeedPath(pathname);

  return (
    <Link
      href={PUBLIC_FEED_ROUTE}
      aria-label="Akış"
      className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-2 text-[0.8125rem] font-semibold transition sm:min-h-0 sm:min-w-0 sm:px-3 sm:text-xs ${
        active
          ? "border-primary bg-primary text-white"
          : "border-primary/15 bg-white text-primary hover:bg-secondary/10"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
        <path
          d="M5 7h14M5 12h14M5 17h10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="hidden sm:inline">Akış</span>
    </Link>
  );
}

