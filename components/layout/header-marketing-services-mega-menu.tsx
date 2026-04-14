"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import {
  HEADER_PRIMARY_NAV,
  HEADER_SERVICES_DROPDOWN,
} from "@/lib/seo/header-marketing-nav";

const itemCard =
  "flex min-h-[2.75rem] flex-col justify-center rounded-xl border border-border/90 bg-white px-3 py-2.5 text-left text-[15px] font-medium leading-snug text-foreground/90 shadow-[0_1px_0_0_rgba(11,60,93,0.04)] transition hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

const itemCardActive =
  "border-primary/25 bg-primary/10 text-primary shadow-sm hover:border-primary/30 hover:bg-primary/10";

export function HeaderMarketingServicesMegaMenu() {
  const pathname = usePathname();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const primary = useMemo(() => [...HEADER_PRIMARY_NAV], []);
  const services = useMemo(() => [...HEADER_SERVICES_DROPDOWN], []);

  const q = query.trim().toLowerCase();
  const filteredPrimary = useMemo(() => {
    if (!q) return primary;
    return primary.filter((i) => i.label.toLowerCase().includes(q));
  }, [primary, q]);
  const filteredServices = useMemo(() => {
    if (!q) return services;
    return services.filter((i) => i.label.toLowerCase().includes(q));
  }, [services, q]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
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
    if (!open) setQuery("");
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        id={`${id}-mega-btn`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-mega-panel`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/10 px-3.5 py-2 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Hizmetler
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary/70" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div
          id={`${id}-mega-panel`}
          role="dialog"
          aria-label="Hizmetler ve kategoriler"
          className="absolute right-0 z-50 mt-2 w-[min(calc(100vw-1.25rem),42rem)] overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-xl ring-1 ring-black/4"
        >
          <div className="border-b border-border/70 bg-surface/90 p-3 backdrop-blur-sm">
            <label htmlFor={`${id}-mega-search`} className="sr-only">
              Kategori ara
            </label>
            <input
              ref={inputRef}
              id={`${id}-mega-search`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Kategori ara…"
              autoComplete="off"
              className="w-full rounded-xl border border-border/90 bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/45 focus-visible:border-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
            />
          </div>

          <div className="max-h-[min(31.25rem,calc(100dvh-10rem))] overflow-y-auto overscroll-contain p-3 [-webkit-overflow-scrolling:touch]">
            {filteredPrimary.length > 0 ? (
              <div>
                <p className="px-0.5 pb-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">
                  Vitrin kategorileri
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {filteredPrimary.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`${itemCard} ${active ? itemCardActive : ""}`}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {filteredServices.length > 0 ? (
              <div className={filteredPrimary.length > 0 ? "mt-4 border-t border-border/60 pt-4" : ""}>
                <p className="px-0.5 pb-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">
                  Keşfet ve kısayollar
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {filteredServices.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={itemCard}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {filteredPrimary.length === 0 && filteredServices.length === 0 ? (
              <p className="py-6 text-center text-sm text-foreground/55">
                Sonuç bulunamadı. Farklı bir arama deneyin.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
