"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

import { isPublicFeedPath, PUBLIC_FEED_ROUTE } from "@/lib/constants";

const HIDE_PREFIXES = ["/admin", "/panel", "/auth"];
const HIDE_PATHS = ["/giris", "/kayit", "/sifre-unuttum", "/sifre-yenile"];
const FEED_BADGE_REFRESH_MS = 60_000;

/**
 * Akıllı Asistan rotası — ortadaki sparkle butonu buraya yönlendirir.
 * Tek kaynak: değiştirilirse hem nav hem aktiflik kontrolü güncellenmeli.
 */
const AI_ASSISTANT_ROUTE = "/ai" as const;

function isAiAssistantPath(pathname: string): boolean {
  return pathname === AI_ASSISTANT_ROUTE || pathname.startsWith(`${AI_ASSISTANT_ROUTE}/`);
}

type TabItem = {
  href: string;
  /** Erişilebilirlik için her zaman dolu; ekranda gösterim `showLabel` ile kontrol edilir. */
  label: string;
  icon: string;
  isCenter?: boolean;
  /** false → ikon altında metin gizli (ortadaki sparkle butonu için). */
  showLabel?: boolean;
  match: (pathname: string) => boolean;
};

const TABS: TabItem[] = [
  { href: "/", label: "Ana Sayfa", icon: "⌂", showLabel: true, match: (p) => p === "/" },
  /**
   * "Keşfet" sekmesi: label korunur, içerik olarak mevcut Akış sayfası (/akis) gösterilir.
   * /kesfet rotası hâlâ erişilebilir; oraya düşen kullanıcı için de Keşfet aktif kalsın.
   */
  {
    href: PUBLIC_FEED_ROUTE,
    label: "Keşfet",
    icon: "◫",
    showLabel: true,
    match: (p) => isPublicFeedPath(p) || p.startsWith("/kesfet"),
  },
  /**
   * Ortadaki büyük sparkle butonu: Akıllı Asistan ekranı (/ai).
   * Görünür label yok; aria-label erişilebilirlik için doludur.
   */
  {
    href: AI_ASSISTANT_ROUTE,
    label: "Akıllı Asistan",
    icon: "✦",
    isCenter: true,
    showLabel: false,
    match: isAiAssistantPath,
  },
  { href: "/mesajlar", label: "Mesajlar", icon: "✉", showLabel: true, match: (p) => p.startsWith("/mesajlar") },
  { href: "/hesabim", label: "Profil", icon: "◉", showLabel: true, match: (p) => p.startsWith("/hesabim") },
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
    if (isPublicFeedPath(pathname)) {
      try {
        localStorage.setItem("vf:akis:last-seen", new Date().toISOString());
        localStorage.setItem("vf:akis:last-check", String(Date.now()));
      } catch {}
      setHasNewFlow(false);
      return;
    }

    try {
      const lastCheckRaw = localStorage.getItem("vf:akis:last-check");
      const lastCheck = lastCheckRaw ? Number(lastCheckRaw) : 0;
      if (lastCheck > 0 && Date.now() - lastCheck < FEED_BADGE_REFRESH_MS) return;
      localStorage.setItem("vf:akis:last-check", String(Date.now()));
    } catch {}

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
      <nav className="fixed inset-x-0 bottom-0 z-[90] h-16 border-t border-[#eee] bg-white md:hidden">
        <div className="mx-auto flex h-full max-w-[720px] items-center justify-between px-3">
          {TABS.map((tab) => {
            const active = tab.match(pathname);
            if (tab.isCenter) {
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-label={tab.label}
                  className={`relative inline-flex h-14 w-14 -translate-y-2.5 touch-manipulation items-center justify-center rounded-full text-lg shadow-[0_8px_22px_rgba(11,60,93,0.22)] transition ${
                    active ? "bg-primary text-white" : "bg-primary/90 text-white hover:bg-primary"
                  }`}
                >
                  <span aria-hidden>{tab.icon}</span>
                </Link>
              );
            }

            /**
             * "Keşfet" artık /akis içeriğini açıyor; yeni-akış kırmızı noktası bu sekmeye taşındı.
             */
            const showFeedBadge = hasNewFlow && isPublicFeedPath(tab.href);

            const tabAria =
              tab.href === "/" ? `${tab.label} — alt gezinme çubuğu` : `${tab.label} sekmesi`;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-label={tabAria}
                className={`relative inline-flex min-w-14 touch-manipulation flex-col items-center justify-center gap-0.5 px-1 text-xs ${
                  active ? "text-[#0B3C5D]" : "text-[#9ca3af]"
                }`}
              >
                <span className="text-base" aria-hidden>
                  {tab.icon}
                </span>
                {tab.showLabel === false ? null : (
                  <span className="leading-none">{tab.label}</span>
                )}
                {showFeedBadge ? (
                  <span className="absolute right-1.5 top-1 h-2 w-2 rounded-full bg-[#ef4444] ring-2 ring-white" />
                ) : null}
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

