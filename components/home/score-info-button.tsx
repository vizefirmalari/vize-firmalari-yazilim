"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ScoreInfoButtonProps = {
  text: string;
  label: string;
  title?: string;
  footnote?: string;
  href?: string | null;
  linkLabel?: string;
};

type FloatingPosition = {
  top: number;
  left: number;
  placement: "top" | "bottom";
};

const VIEWPORT_GAP = 12;
const PANEL_OFFSET = 8;

function canUseHover(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

function safeExternalHref(href: string | null | undefined): string | null {
  const trimmed = href?.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : null;
}

/** Küçük (i) — portal tabanlı floating bilgi paneli (mobil uyumlu). */
export function ScoreInfoButton({
  text,
  label,
  title,
  footnote,
  href,
  linkLabel = "Detayları görüntüle",
}: ScoreInfoButtonProps) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [position, setPosition] = useState<FloatingPosition | null>(null);
  const id = useId();
  const panelId = `${id}-panel`;
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const pointerFocusRef = useRef(false);
  const externalHref = safeExternalHref(href);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current == null) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const closePanel = useCallback(() => {
    clearCloseTimer();
    setOpen(false);
    setPinned(false);
  }, [clearCloseTimer]);

  const scheduleHoverClose = useCallback(() => {
    if (pinned) return;
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 120);
  }, [clearCloseTimer, pinned]);

  const updatePosition = useCallback(() => {
    const button = buttonRef.current;
    const panel = panelRef.current;
    if (!button || !panel) return;

    const buttonRect = button.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const maxLeft = Math.max(VIEWPORT_GAP, viewportWidth - panelRect.width - VIEWPORT_GAP);
    const preferredLeft = buttonRect.left + buttonRect.width / 2 - panelRect.width / 2;
    const left = Math.min(Math.max(preferredLeft, VIEWPORT_GAP), maxLeft);

    const bottomTop = buttonRect.bottom + PANEL_OFFSET;
    const topTop = buttonRect.top - panelRect.height - PANEL_OFFSET;
    const shouldFlipTop =
      bottomTop + panelRect.height > viewportHeight - VIEWPORT_GAP &&
      topTop >= VIEWPORT_GAP;

    const top = shouldFlipTop
      ? topTop
      : Math.min(bottomTop, Math.max(VIEWPORT_GAP, viewportHeight - panelRect.height - VIEWPORT_GAP));

    setPosition({
      top,
      left,
      placement: shouldFlipTop ? "top" : "bottom",
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent | PointerEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      closePanel();
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [closePanel, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closePanel, open]);

  useEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }

    const frame = window.requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  return (
    <span
      className="inline-flex align-middle"
      ref={rootRef}
      onMouseEnter={() => {
        if (!canUseHover()) return;
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleHoverClose}
    >
      <button
        ref={buttonRef}
        type="button"
        className="ml-0.5 inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#0B3C5D]/18 text-[10px] font-bold leading-none text-[#0B3C5D]/55 outline-none ring-[#328CC1]/25 transition hover:border-[#328CC1]/40 hover:bg-[#328CC1]/8 hover:text-[#0B3C5D] focus-visible:ring-2"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={label}
        onPointerDown={() => {
          pointerFocusRef.current = true;
          window.setTimeout(() => {
            pointerFocusRef.current = false;
          }, 0);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((currentOpen) => {
            const nextOpen = !currentOpen;
            setPinned(nextOpen);
            return nextOpen;
          });
        }}
        onFocus={() => {
          if (pointerFocusRef.current) return;
          setOpen(true);
        }}
      >
        i
      </button>
      {open
        ? createPortal(
            <div
              ref={panelRef}
              id={panelId}
              role={externalHref ? "dialog" : "tooltip"}
              aria-label={title ?? label}
              className="fixed z-9999 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-[#0B3C5D]/10 bg-white p-3 text-left text-xs leading-snug text-[#1A1A1A]/78 shadow-xl ring-1 ring-black/5"
              style={{
                top: position?.top ?? 0,
                left: position?.left ?? 0,
                opacity: position ? 1 : 0,
                pointerEvents: "auto",
              }}
              data-placement={position?.placement ?? "bottom"}
              onMouseEnter={() => {
                if (!canUseHover()) return;
                clearCloseTimer();
              }}
              onMouseLeave={scheduleHoverClose}
            >
              {title ? (
                <p className="text-sm font-semibold leading-snug text-[#0B3C5D]">
                  {title}
                </p>
              ) : null}
              <p className={title ? "mt-1.5" : ""}>{text}</p>
              {footnote ? (
                <p className="mt-2 text-[11px] leading-snug text-[#1A1A1A]/55">
                  {footnote}
                </p>
              ) : null}
              {externalHref ? (
                <a
                  href={externalHref}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="mt-3 inline-flex min-h-8 items-center justify-center rounded-lg border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-1.5 text-[11px] font-semibold text-[#0B3C5D] transition hover:bg-[#EEF2F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#328CC1]/25"
                >
                  {linkLabel}
                </a>
              ) : null}
            </div>,
            document.body
          )
        : null}
    </span>
  );
}
