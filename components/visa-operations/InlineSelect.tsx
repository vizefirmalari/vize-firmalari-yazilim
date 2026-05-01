"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";

export type InlineSelectOption = {
  value: string;
  label: string;
  badgeClassName: string;
  optionRowClassName: string;
};

type MenuPos = { top: number; left: number; width: number; maxHeight: number };

type Props = {
  value: string;
  options: InlineSelectOption[];
  onCommit: (next: string) => Promise<boolean>;
  disabled?: boolean;
  "aria-label"?: string;
};

export function InlineSelect({ value, options, onCommit, disabled = false, "aria-label": ariaLabel }: Props) {
  const rawListId = useId();
  const listId = rawListId.replace(/:/g, "");
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [tick, setTick] = useState(false);
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [pending, startTransition] = useTransition();

  const selected = options.find((o) => o.value === value) ?? options[0];
  const selectedIdx = Math.max(0, options.findIndex((o) => o.value === value));

  const updateMenuPos = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pad = 8;
    const maxH = Math.max(120, window.innerHeight - rect.bottom - pad);
    setMenuPos({
      top: rect.bottom + 2,
      left: rect.left,
      width: Math.max(rect.width, 192),
      maxHeight: Math.min(280, maxH),
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setMenuPos(null);
      return;
    }
    updateMenuPos();
    const onWin = () => updateMenuPos();
    window.addEventListener("resize", onWin);
    document.addEventListener("scroll", onWin, true);
    return () => {
      window.removeEventListener("resize", onWin);
      document.removeEventListener("scroll", onWin, true);
    };
  }, [open, updateMenuPos]);

  useEffect(() => {
    if (open) setHighlightIdx(selectedIdx);
  }, [open, selectedIdx]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const commitOption = useCallback(
    (optValue: string) => {
      if (optValue === value) {
        setOpen(false);
        btnRef.current?.focus();
        return;
      }
      setOpen(false);
      startTransition(async () => {
        const ok = await onCommit(optValue);
        if (ok) {
          setTick(true);
          window.setTimeout(() => setTick(false), 1000);
        }
        btnRef.current?.focus();
      });
    },
    [onCommit, value]
  );

  const onTriggerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (disabled || pending) return;
    if ((e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && !open) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlightIdx(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlightIdx(options.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[highlightIdx];
      if (opt) commitOption(opt.value);
    }
  };

  const menu =
    open && menuPos && typeof document !== "undefined"
      ? createPortal(
          <ul
            ref={menuRef}
            id={listId}
            role="listbox"
            style={{
              position: "fixed",
              top: menuPos.top,
              left: menuPos.left,
              width: menuPos.width,
              maxHeight: menuPos.maxHeight,
            }}
            className="z-[80] overflow-y-auto overflow-x-hidden rounded-xl border border-[#0B3C5D]/18 bg-white py-1 shadow-[0_12px_32px_rgba(11,60,93,0.14)]"
          >
            {options.map((opt, idx) => {
              const active = idx === highlightIdx;
              return (
                <li key={opt.value} role="none">
                  <button
                    id={`${listId}-opt-${idx}`}
                    type="button"
                    role="option"
                    aria-selected={opt.value === value}
                    disabled={pending}
                    className={`w-full ${opt.optionRowClassName} ${opt.value === value ? "ring-inset ring-1 ring-[#0B3C5D]/35" : ""} ${active ? "ring-1 ring-inset ring-[#0B3C5D]/22" : ""}`}
                    onMouseEnter={() => setHighlightIdx(idx)}
                    onClick={() => commitOption(opt.value)}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body
        )
      : null;

  return (
    <>
      <div ref={wrapRef} className="relative flex min-h-[26px] items-center gap-1">
        <button
          ref={btnRef}
          type="button"
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          disabled={disabled || pending}
          onClick={() => (pending ? undefined : setOpen((x) => !x))}
          onKeyDown={onTriggerKeyDown}
          className={`inline-flex max-w-[11rem] min-w-[7rem] items-center justify-between gap-2 rounded-lg border px-2 py-0.5 text-left text-[11px] font-semibold leading-snug outline-none ring-[#0B3C5D]/22 transition focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-55 ${selected?.badgeClassName ?? ""}`}
        >
          <span className="min-w-0 truncate">{selected?.label ?? "—"}</span>
          <span className={`shrink-0 text-[9px] opacity-70 transition ${open ? "rotate-180" : ""}`}>▼</span>
        </button>
        <span className="w-4 text-center font-semibold tabular-nums text-[11px]" aria-live="polite">
          {pending ? <span className="text-[#1A1A1A]/40">…</span> : tick ? <span className="text-emerald-700">✓</span> : null}
        </span>
      </div>
      {menu}
    </>
  );
}
