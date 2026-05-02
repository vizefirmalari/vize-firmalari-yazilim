"use client";

import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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

export type FirmBadgeInfoDialogProps = {
  ariaLabel: string;
  srDialogTitle: string;
  srContextLine: string;
  triggerClassName: string;
  triggerChildren: ReactNode;
  panelBody: ReactNode;
};

/**
 * Doğrulanmış firma rozeti ile aynı etkileşim: masaüstü hover + tıkta sabitleme/toggle,
 * mobil alt sayfa sheet, dışarı tıklayınca kapanır, ESC kapanır.
 */
export function FirmBadgeInfoDialog({
  ariaLabel,
  srDialogTitle,
  srContextLine,
  triggerClassName,
  triggerChildren,
  panelBody,
}: FirmBadgeInfoDialogProps) {
  const narrowUi = useNarrowSheetUi();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; width: number } | null>(
    null
  );
  const labelId = useId();

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
                {srDialogTitle} — {srContextLine}
              </p>
              {panelBody}
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
            {srDialogTitle} — {srContextLine}
          </p>
          {panelBody}
        </div>
      ) : null
    ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`relative z-20 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 ${triggerClassName}`}
        aria-label={ariaLabel}
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
        {triggerChildren}
      </button>
      {portal ? createPortal(portal, document.body) : null}
    </>
  );
}
