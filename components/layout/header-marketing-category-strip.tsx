"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HEADER_PRIMARY_NAV } from "@/lib/seo/header-marketing-nav";

const cardBase =
  "inline-flex min-h-[2.75rem] max-w-full items-center rounded-xl border border-border/90 bg-white px-4 py-2.5 text-[15px] font-medium leading-snug text-foreground/90 shadow-[0_1px_0_0_rgba(11,60,93,0.04)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm";

const cardActive =
  "border-primary/25 bg-primary/10 text-primary shadow-sm hover:border-primary/30 hover:bg-primary/10";

const mobileCardBase =
  "flex min-h-[3rem] w-full max-w-full flex-col items-center justify-center rounded-xl border border-border/90 bg-white px-3 py-2.5 text-center text-[14px] font-medium leading-snug text-foreground/90 shadow-[0_1px_0_0_rgba(11,60,93,0.04)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm sm:text-[15px]";

/** Mobil keşif paneli: daha büyük dokunma alanı, basılı halde hafif geri bildirim. */
const mobileDrawerVitrinCard =
  "flex min-h-[3.5rem] w-full max-w-full flex-col items-center justify-center rounded-2xl border border-border/90 bg-white px-3 py-3 text-center text-[15px] font-semibold leading-snug text-foreground/90 shadow-[0_1px_3px_0_rgba(11,60,93,0.08)] transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 active:scale-[0.98] active:bg-primary/[0.06]";

export function HeaderMarketingCategoryStrip() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Popüler vize koleksiyonları"
      className="flex flex-wrap gap-2 sm:gap-3"
    >
      {HEADER_PRIMARY_NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${cardBase} ${active ? cardActive : "hover:text-primary"}`}
          >
            <span className="line-clamp-2 text-balance">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function HeaderMarketingMobileCategoryGrid({
  onNavigate,
  variant = "default",
}: {
  onNavigate?: () => void;
  /** `drawer`: mobil hamburger panelindeki vitrin kartları. */
  variant?: "default" | "drawer";
}) {
  const pathname = usePathname();
  const baseCard = variant === "drawer" ? mobileDrawerVitrinCard : mobileCardBase;

  return (
    <nav
      aria-label="Popüler vize koleksiyonları"
      className={variant === "drawer" ? "grid grid-cols-2 gap-2.5" : "grid grid-cols-2 gap-2"}
    >
      {HEADER_PRIMARY_NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`${baseCard} ${active ? cardActive : "hover:border-primary/20 hover:bg-primary/5"}`}
          >
            <span className="line-clamp-3 text-pretty">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
