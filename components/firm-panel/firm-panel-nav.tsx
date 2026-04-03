"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { planMeets, type FirmPlanType } from "@/lib/subscriptions/plan-types";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  minPlan?: Exclude<FirmPlanType, "free">;
};

function buildNavItems(firmId: string, plan: FirmPlanType): NavItem[] {
  const all: NavItem[] = [
    { href: `/panel/${firmId}`, label: "Genel bakış", icon: "◈" },
    { href: `/panel/${firmId}/mesajlar`, label: "Gelen mesajlar", icon: "✉", minPlan: "pro" },
    { href: `/panel/${firmId}/formlar`, label: "Gelen başvurular", icon: "▤", minPlan: "pro" },
    { href: `/panel/${firmId}/reklam`, label: "Reklam ver", icon: "◎", minPlan: "business" },
    { href: `/panel/${firmId}/abonelik`, label: "Abonelik", icon: "◇" },
    { href: `/panel/${firmId}/hesap`, label: "Hesap güvenliği", icon: "⚙" },
  ];
  return all.filter((item) => !item.minPlan || planMeets(plan, item.minPlan));
}

type Props = { firmId: string; planType: FirmPlanType };

function formatCompactBadge(count: number): string {
  return count > 99 ? "99+" : String(count);
}

export function FirmPanelNav({
  firmId,
  planType,
  unreadMessagesCount = 0,
}: Props & { unreadMessagesCount?: number }) {
  const pathname = usePathname();
  const nav = buildNavItems(firmId, planType);

  return (
    <nav
      className="flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0"
      aria-label="Firma paneli"
    >
      {nav.map((item) => {
        const active =
          item.href === `/panel/${firmId}`
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition lg:gap-3 lg:whitespace-normal ${
              active
                ? "bg-white/12 text-white shadow-inner"
                : "text-white/75 hover:bg-white/6 hover:text-white"
            }`}
          >
            <span className="relative w-5 text-center opacity-85" aria-hidden>
              {item.icon}
              {item.href === `/panel/${firmId}/mesajlar` && unreadMessagesCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#D9A441] lg:hidden" />
              ) : null}
            </span>
            <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
              <span className="truncate">{item.label}</span>
              {item.href === `/panel/${firmId}/mesajlar` && unreadMessagesCount > 0 ? (
                <span className="hidden h-5 min-w-5 items-center justify-center rounded-full bg-[#D9A441] px-1.5 text-[10px] font-bold leading-none text-[#1A1A1A] lg:inline-flex">
                  {formatCompactBadge(unreadMessagesCount)}
                </span>
              ) : null}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
