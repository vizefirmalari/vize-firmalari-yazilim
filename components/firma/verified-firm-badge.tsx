"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { VERIFIED_FIRM_BADGE_IMAGE_URL } from "@/lib/constants/verified-firm-badge";

const NARROW_UI_MQ = "(max-width: 1023px)";

function useNarrowSheetUi(): boolean {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(NARROW_UI_MQ);
    const fn = () => setNarrow(m.matches);
    fn();
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return narrow;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

const EXPLAIN_TITLE = "Doğrulanmış Firma";
const EXPLAIN_BODY =
  "Bu firma, platform yönetimine gerekli doğrulama belgelerini (vergi levhası ve/veya lisans bilgileri) beyan etmiştir. Sunulan bilgiler doğrultusunda firmanın faaliyetlerini yasal çerçevede yürüttüğü doğrulanmıştır.";
const EXPLAIN_FOOTNOTE =
  "Bu doğrulama, platform içi güven sinyali sağlar; hizmet kalitesi için garanti niteliği taşımaz.";

function VerifiedExplainBody({
  companyName,
  logoUrl,
  logoAlt,
}: {
  companyName: string;
  logoUrl: string | null | undefined;
  logoAlt: string;
}) {
  return (
    <>
      <div className="flex gap-3 border-b border-border/80 pb-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-surface ring-1 ring-primary/10">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoAlt}
              fill
              sizes="44px"
              className="object-contain object-center p-1"
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-xs font-bold text-primary"
              aria-hidden
            >
              {initials(companyName)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold leading-snug text-primary">{companyName}</p>
        </div>
      </div>
      <h3 className="mt-3 text-sm font-bold text-foreground">{EXPLAIN_TITLE}</h3>
      <p className="mt-2 text-xs leading-relaxed text-foreground/75">{EXPLAIN_BODY}</p>
      <p className="mt-2.5 text-[11px] leading-snug text-foreground/55">{EXPLAIN_FOOTNOTE}</p>
    </>
  );
}

type Props = {
  isVerified: boolean;
  companyName: string;
  logoUrl: string | null | undefined;
  /** Kart logosu köşesi veya detay kahraman başlığı */
  variant?: "card" | "hero";
  className?: string;
};

export function VerifiedFirmBadge({
  isVerified,
  companyName,
  logoUrl,
  variant = "card",
  className = "",
}: Props) {
  const narrowUi = useNarrowSheetUi();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; width: number } | null>(
    null
  );
  const labelId = useId();
  const logoAlt = `${companyName} logosu`;

  const closeAll = useCallback(() => {
    setOpen(false);
    setPinned(false);
    setPopoverPos(null);
  }, []);

  useLayoutEffect(() => {
    if (!open || narrowUi || !triggerRef.current) return;
    const el = triggerRef.current;
    const rect = el.getBoundingClientRect();
    const vw = typeof window !== "undefined" ? window.innerWidth : 360;
    const width = Math.min(340, Math.max(280, vw - 24));
    const left = Math.min(Math.max(12, rect.left + rect.width / 2 - width / 2), vw - width - 12);
    const top = rect.bottom + 8;
    setPopoverPos({ top, left, width });
  }, [open, narrowUi]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeAll]);

  useEffect(() => {
    if (!open || !narrowUi) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, narrowUi]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      closeAll();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, closeAll]);

  useEffect(() => {
    if (!open || narrowUi) return;
    function onScroll() {
      if (!pinned) closeAll();
      else if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const width = Math.min(340, Math.max(280, vw - 24));
        const left = Math.min(Math.max(12, rect.left + rect.width / 2 - width / 2), vw - width - 12);
        setPopoverPos({ top: rect.bottom + 8, left, width });
      }
    }
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, narrowUi, pinned, closeAll]);

  if (!isVerified) return null;

  /** 18–24px aralığı; dokunma hedefi ayrı tutulur. */
  const imgSize =
    variant === "hero" ? "h-5 w-5 sm:h-6 sm:w-6" : "h-[18px] w-[18px] sm:h-5 sm:w-5";
  const minTap = variant === "hero" ? "min-h-9 min-w-9 sm:min-h-10 sm:min-w-10" : "min-h-9 min-w-9";
  const ringSurface =
    variant === "hero"
      ? "ring-2 ring-white shadow-[0_2px_10px_rgba(11,60,93,0.22)]"
      : "ring-1 ring-[#0B3C5D]/12 shadow-[0_1px_6px_rgba(11,60,93,0.12)]";

  const openSheet = () => {
    setOpen(true);
    setPinned(false);
  };

  const toggleDesktop = () => {
    if (narrowUi) {
      openSheet();
      return;
    }
    if (open && pinned) {
      closeAll();
      return;
    }
    setPinned(true);
    setOpen(true);
  };

  const portal =
    open && typeof document !== "undefined" ? (
      narrowUi ? (
        <div className="fixed inset-0 z-[220]">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Kapat"
            onClick={closeAll}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-hidden rounded-t-2xl border border-border/90 bg-white shadow-[0_-12px_40px_rgba(11,60,93,0.18)]">
            <div className="flex items-center justify-center pt-2 pb-1" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-foreground/20" />
            </div>
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelId}
              className="max-h-[min(78dvh,520px)] overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2"
            >
              <p id={labelId} className="sr-only">
                {EXPLAIN_TITLE} — {companyName}
              </p>
              <VerifiedExplainBody companyName={companyName} logoUrl={logoUrl} logoAlt={logoAlt} />
              <button
                type="button"
                onClick={closeAll}
                className="mt-4 w-full rounded-xl border border-border bg-background py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      ) : popoverPos ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          className="fixed z-[220] rounded-xl border border-border/90 bg-white p-4 shadow-[0_16px_48px_rgba(11,60,93,0.16)]"
          style={{
            top: popoverPos.top,
            left: popoverPos.left,
            width: popoverPos.width,
          }}
        >
          <p id={labelId} className="sr-only">
            {EXPLAIN_TITLE} — {companyName}
          </p>
          <VerifiedExplainBody companyName={companyName} logoUrl={logoUrl} logoAlt={logoAlt} />
        </div>
      ) : null
    ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`relative z-20 inline-flex shrink-0 items-center justify-center rounded-full bg-white p-0.5 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 ${ringSurface} ${minTap} ${className}`}
        aria-label={`${companyName} — doğrulanmış firma bilgisi`}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleDesktop();
        }}
        onMouseEnter={() => {
          if (!narrowUi && !pinned) setOpen(true);
        }}
        onMouseLeave={() => {
          if (!narrowUi && !pinned) setOpen(false);
        }}
      >
        <span className={`relative block overflow-hidden rounded-full ${imgSize}`}>
          <Image
            src={VERIFIED_FIRM_BADGE_IMAGE_URL}
            alt=""
            width={112}
            height={112}
            className="h-full w-full object-cover"
            sizes="(max-width: 640px) 20px, 24px"
          />
        </span>
      </button>
      {portal ? createPortal(portal, document.body) : null}
    </>
  );
}
