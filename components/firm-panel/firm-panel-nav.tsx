"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = (firmId: string) =>
  [
    { href: `/panel/${firmId}`, label: "Genel bakış", icon: "◈" },
    { href: `/panel/${firmId}/mesajlar`, label: "Gelen mesajlar", icon: "✉" },
    { href: `/panel/${firmId}/formlar`, label: "Gelen formlar", icon: "▤" },
    { href: `/panel/${firmId}/reklam`, label: "Reklam ver", icon: "◎" },
    { href: `/panel/${firmId}/abonelik`, label: "Abonelik", icon: "◇" },
    { href: `/panel/${firmId}/hesap`, label: "Hesap güvenliği", icon: "⚙" },
  ] as const;

type Props = { firmId: string };

export function FirmPanelNav({ firmId }: Props) {
  const pathname = usePathname();
  const nav = items(firmId);

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
            <span className="w-5 text-center opacity-85" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
