"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "Genel Bakış", icon: "◎" },
  { href: "/admin/firms", label: "Firmalar", icon: "▤" },
  { href: "/admin/firm-complaints", label: "Gelen şikayetler", icon: "⚑" },
  { href: "/admin/firm-panel", label: "Firma panel", icon: "▣" },
  { href: "/admin/filters/countries", label: "Ülkeler", icon: "⌖" },
  { href: "/admin/filters/services", label: "İşlem türleri", icon: "☰" },
  { href: "/admin/homepage", label: "Ana sayfa", icon: "◇" },
  { href: "/admin/contact-popup", label: "İletişim popup", icon: "✉" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#0B3C5D] text-white lg:flex">
      <div className="border-b border-white/10 px-5 py-6">
        <Link href="/admin" className="block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Yönetim
          </p>
          <p className="mt-1 text-lg font-bold tracking-tight">VizeFirmalari</p>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-white/75 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-base opacity-80" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
        >
          Siteye dön
        </Link>
      </div>
    </aside>
  );
}
