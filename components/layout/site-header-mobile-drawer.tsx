"use client";

import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useId, useMemo, useState } from "react";

import { GlobalSearchBar } from "@/components/layout/global-search-bar";
import { HeaderMarketingMobileCategoryGrid } from "@/components/layout/header-marketing-category-strip";
import { SITE_HEADER_LOGO_URL } from "@/lib/constants";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";
import { listServiceCategoryNavItems } from "@/lib/seo/service-category-landings";

const serviceCatCardClass =
  "flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-border/90 bg-white px-2.5 py-2.5 text-center text-[13px] font-semibold leading-snug text-foreground/90 shadow-[0_1px_3px_0_rgba(11,60,93,0.07)] transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 active:scale-[0.98] active:bg-primary/[0.06] sm:text-sm";

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
  const [mounted, setMounted] = useState(false);
  const [svcQuery, setSvcQuery] = useState("");
  const titleId = useId();

  const serviceCategories = useMemo(() => listServiceCategoryNavItems(), []);
  const q = svcQuery.trim().toLowerCase();
  const filteredServices = useMemo(() => {
    if (!q) return serviceCategories;
    return serviceCategories.filter((i) => i.label.toLowerCase().includes(q));
  }, [serviceCategories, q]);
  const headerLogoSrc = withSupabaseImageTransform(SITE_HEADER_LOGO_URL, {
    width: 88,
    height: 88,
    quality: 72,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (!open) setSvcQuery("");
  }, [open]);

  const close = () => setOpen(false);

  const panel = open ? (
    <div className="fixed inset-0 z-90 md:hidden" role="presentation">
      <button
        type="button"
        aria-label="Menüyü kapat"
        className="absolute inset-0 bg-primary/18"
        onClick={close}
      />
      <div
        id={`${titleId}-panel`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${titleId}-heading`}
        className="absolute inset-y-0 right-0 flex h-full w-full max-w-[min(100%,26.5rem)] flex-col border-l border-border/70 bg-surface shadow-[-12px_0_40px_rgba(11,60,93,0.12)]"
      >
        <div className="shrink-0 border-b border-border/70 px-4 pb-3 pt-[max(0.5rem,env(safe-area-inset-top,0px))]">
          <div className="flex items-center justify-between gap-3">
            <h2 id={`${titleId}-heading`} className="text-base font-bold tracking-tight text-primary">
              Menü
            </h2>
            <button
              type="button"
              onClick={close}
              className="rounded-xl border border-border/80 bg-white px-3 py-2 text-xs font-semibold text-primary shadow-sm transition active:scale-[0.98] active:bg-primary/5"
            >
              Kapat
            </button>
          </div>
          <div className="mt-3 h-px w-full bg-border/60" aria-hidden />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] pt-4 [-webkit-overflow-scrolling:touch]">
          <div className="rounded-2xl border border-border/80 bg-white p-4 shadow-[0_2px_12px_rgba(11,60,93,0.06)]">
            <Link
              href="/"
              className="flex items-start gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
              onClick={close}
            >
              { }
              <Image
                src={headerLogoSrc ?? SITE_HEADER_LOGO_URL}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 object-contain"
              />
              <div className="min-w-0 pt-0.5">
                <p className="text-base font-bold tracking-tight text-primary">Vize Firmaları</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/60">
                  Vize ve danışmanlık kategorilerini keşfedin
                </p>
              </div>
            </Link>
            <Link
              href={navUser ? "/hesabim" : "/giris"}
              className="mt-4 flex w-full items-center justify-center rounded-xl border border-primary/25 bg-primary/10 py-3 text-sm font-semibold text-primary shadow-sm transition active:scale-[0.99] active:bg-primary/[0.14]"
              onClick={close}
            >
              {navUser ? "Hesabım" : "Giriş yap"}
            </Link>
          </div>

          <section className="mt-6" aria-labelledby={`${titleId}-search-h`}>
            <h3
              id={`${titleId}-search-h`}
              className="text-[11px] font-semibold uppercase tracking-wide text-foreground/50"
            >
              Arama
            </h3>
            <div className="mt-2 rounded-2xl border border-border/70 bg-white p-3 shadow-[0_1px_3px_rgba(11,60,93,0.05)]">
              <GlobalSearchBar
                hiddenParams={hiddenParams}
                defaultValue={searchValue}
                inputId={`${titleId}-drawer-search`}
                className="w-full"
                placeholder="Ülke, vize türü veya firma ara"
              />
            </div>
          </section>

          <section className="mt-7" aria-labelledby={`${titleId}-vitrin-h`}>
            <h3
              id={`${titleId}-vitrin-h`}
              className="text-sm font-semibold text-primary"
            >
              Vitrin kategorileri
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-foreground/55">
              Ülke ve koleksiyon vitrinlerine hızlı geçiş
            </p>
            <div className="mt-3">
              <HeaderMarketingMobileCategoryGrid variant="drawer" onNavigate={close} />
            </div>
          </section>

          <section className="mt-8 border-t border-border/60 pt-7" aria-labelledby={`${titleId}-hizmet-h`}>
            <h3 id={`${titleId}-hizmet-h`} className="text-sm font-semibold text-primary">
              Hizmetler
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-foreground/55">
              Ana hizmet kategorisine göre firmaları keşfedin
            </p>
            <label htmlFor={`${titleId}-svc-search`} className="sr-only">
              Kategori ara
            </label>
            <input
              id={`${titleId}-svc-search`}
              type="search"
              value={svcQuery}
              onChange={(e) => setSvcQuery(e.target.value)}
              placeholder="Kategori ara…"
              autoComplete="off"
              className="mt-3 w-full rounded-xl border border-border/90 bg-white px-3 py-3 text-sm text-foreground placeholder:text-foreground/45 shadow-[0_1px_2px_rgba(11,60,93,0.04)] focus-visible:border-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
            />
            <div className="mt-3 max-h-[min(42vh,22rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border/50 bg-white/80 p-2 [-webkit-overflow-scrolling:touch]">
              <div className="grid grid-cols-2 gap-2">
                {filteredServices.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={serviceCatCardClass}
                    onClick={close}
                  >
                    <span className="line-clamp-4 text-pretty">{item.label}</span>
                  </Link>
                ))}
              </div>
              {filteredServices.length === 0 ? (
                <p className="py-6 text-center text-xs text-foreground/55">Eşleşen kategori yok.</p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        aria-controls={open ? `${titleId}-panel` : undefined}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/90 bg-white text-primary shadow-sm transition active:scale-[0.97] active:bg-primary/5"
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

      {mounted && panel ? createPortal(panel, document.body) : null}
    </>
  );
}
