"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

const HIDE_PREFIXES = ["/admin", "/panel", "/auth"];
const HIDE_PATHS = ["/giris", "/kayit", "/sifre-unuttum", "/sifre-yenile"];

type TabItem = {
  href: string;
  label: string;
  icon: string;
  isCenter?: boolean;
  match: (pathname: string) => boolean;
};

const TABS: TabItem[] = [
  { href: "/", label: "Vize Firmaları", icon: "⌂", match: (p) => p === "/" },
  { href: "/kesfet", label: "Keşfet", icon: "◫", match: (p) => p.startsWith("/kesfet") },
  { href: "/akis", label: "Akış", icon: "✦", isCenter: true, match: (p) => p.startsWith("/akis") },
  { href: "/mesajlar", label: "Mesajlar", icon: "✉", match: (p) => p.startsWith("/mesajlar") },
  { href: "/hesabim", label: "Profil", icon: "◉", match: (p) => p.startsWith("/hesabim") },
];

function MobileTabBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasNewFlow, setHasNewFlow] = useState(false);

  const hidden = useMemo(() => {
    if (!pathname) return true;
    if (HIDE_PATHS.includes(pathname)) return true;
    if (HIDE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
    return false;
  }, [pathname]);

  /** Aktif konuşmada tam ekran sohbet; alt çubuk composer’ı kapatıyordu + body scroll üretiyordu. */
  const hideForActiveMesajlarThread = useMemo(() => {
    if (!pathname?.startsWith("/mesajlar")) return false;
    return Boolean(searchParams.get("c")?.trim());
  }, [pathname, searchParams]);

  useEffect(() => {
    if (hidden) return;
    if (pathname.startsWith("/akis")) {
      try {
        localStorage.setItem("vf:akis:last-seen", new Date().toISOString());
      } catch {}
      setHasNewFlow(false);
      return;
    }

    let cancelled = false;
    fetch("/api/feed/items?offset=0&limit=1")
      .then((r) => r.json())
      .then((payload: { items?: Array<{ created_at?: string }> }) => {
        if (cancelled) return;
        const latest = payload.items?.[0]?.created_at;
        if (!latest) return;
        const seen = localStorage.getItem("vf:akis:last-seen");
        if (!seen || new Date(latest).getTime() > new Date(seen).getTime()) {
          setHasNewFlow(true);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [pathname, hidden]);

  if (hidden || hideForActiveMesajlarThread) return null;

  return (
    <>
      <div className="h-20 md:hidden" aria-hidden />
      <nav className="fixed inset-x-0 bottom-0 z-90 h-16 border-t border-[#eee] bg-white md:hidden">
        <div className="mx-auto flex h-full max-w-[720px] items-center justify-between px-3">
          {TABS.map((tab) => {
            const active = tab.match(pathname);
            if (tab.isCenter) {
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-label={tab.label}
                  className={`relative inline-flex h-14 w-14 -translate-y-2.5 items-center justify-center rounded-full text-lg shadow-[0_8px_22px_rgba(11,60,93,0.22)] transition ${
                    active ? "bg-primary text-white" : "bg-primary/90 text-white hover:bg-primary"
                  }`}
                >
                  <span aria-hidden>{tab.icon}</span>
                  {hasNewFlow ? (
                    <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#ef4444] ring-2 ring-white" />
                  ) : null}
                </Link>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`inline-flex min-w-14 flex-col items-center justify-center gap-0.5 px-1 text-xs ${
                  active ? "text-[#0B3C5D]" : "text-[#9ca3af]"
                }`}
              >
                <span className="text-base" aria-hidden>
                  {tab.icon}
                </span>
                <span className="leading-none">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export function MobileTabBar() {
  return (
    <Suspense fallback={null}>
      <MobileTabBarInner />
    </Suspense>
  );
}

