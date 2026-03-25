"use client";

import { useEffect, useId, useState } from "react";

type ScoreInfoButtonProps = {
  text: string;
  label: string;
};

/** Küçük (i) — tıklanınca kısa açıklama (mobil uyumlu) */
export function ScoreInfoButton({ text, label }: ScoreInfoButtonProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      const el = document.getElementById(id);
      if (el && !el.contains(t)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open, id]);

  return (
    <span className="relative inline-flex align-middle" id={id}>
      <button
        type="button"
        className="ml-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#0B3C5D]/18 text-[10px] font-bold leading-none text-[#0B3C5D]/55 transition hover:border-[#328CC1]/40 hover:bg-[#328CC1]/8 hover:text-[#0B3C5D]"
        aria-expanded={open}
        aria-label={label}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        i
      </button>
      {open ? (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-20 mt-1 w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-[#0B3C5D]/10 bg-white p-2.5 text-left text-[11px] leading-snug text-[#1A1A1A]/85 shadow-md sm:left-0 sm:w-56 sm:translate-x-0"
        >
          {text}
        </span>
      ) : null}
    </span>
  );
}
