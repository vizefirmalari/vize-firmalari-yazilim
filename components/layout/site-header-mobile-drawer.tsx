"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";

import { GlobalSearchBar } from "@/components/layout/global-search-bar";
import { HeaderMarketingMobileCategoryGrid } from "@/components/layout/header-marketing-category-strip";
import { HEADER_SERVICES_DROPDOWN } from "@/lib/seo/header-marketing-nav";

const serviceCardClass =
  "block rounded-xl border border-border/90 bg-white px-3 py-2.5 text-sm font-medium leading-snug text-foreground/90 shadow-[0_1px_0_0_rgba(11,60,93,0.04)] transition hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35";

type Props = {
  navUser: { id: string; email?: string | null } | null;
  searchValue: string;
  hiddenParams: Record<string, string>;
};

export function SiteHeaderMobileDrawer({
  navUser,
  searchValue,
  hiddenParams,
}: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const serviceLinks = useMemo(() => [...HEADER_SERVICES_DROPDOWN], []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        aria-controls={`${titleId}-panel`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/90 bg-white text-primary shadow-sm transition hover:border-primary/20 hover:bg-primary/5"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open ? (
        <div className="fixed inset-0 z-60 md:hidden">
          <button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 bg-foreground/35 backdrop-blur-[1px]"
            onClick={close}
          />
          <div
            id={`${titleId}-panel`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute right-0 top-0 flex h-full w-[min(100%,26rem)] flex-col border-l border-border/80 bg-surface shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <p id={titleId} className="text-sm font-semibold text-primary">
                Menü
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-secondary"
              >
                Kapat
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="border-b border-border/70 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">
                  Arama
                </p>
                <GlobalSearchBar
                  hiddenParams={hiddenParams}
                  defaultValue={searchValue}
                  inputId={`${titleId}-drawer-search`}
                  className="w-full"
                  placeholder="Ülke, vize türü veya firma ara"
                />
              </div>

              <div className="p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">
                  Kategoriler
                </p>
                <HeaderMarketingMobileCategoryGrid onNavigate={close} />
              </div>

              <div className="border-t border-border/70 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">
                  Hizmetler
                </p>
                <div className="max-h-[min(20rem,45vh)] space-y-2 overflow-y-auto pr-0.5 [-webkit-overflow-scrolling:touch]">
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={serviceCardClass}
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border/70 p-3">
              <Link
                href={navUser ? "/hesabim" : "/giris"}
                className="flex w-full items-center justify-center rounded-xl border border-primary/20 bg-primary/10 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/[0.14]"
                onClick={close}
              >
                {navUser ? "Hesabım" : "Giriş yap"}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
