"use client";

import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

function useLgMedia() {
  const [lg, setLg] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 1024px)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const fn = () => setLg(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return lg;
}

function ChevronDown({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 text-foreground/45 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function listingFilterMultiSummary(
  selected: readonly string[],
  emptyLabel: string
): string {
  const t = [...selected].map((s) => s.trim()).filter(Boolean);
  if (t.length === 0) return emptyLabel;
  if (t.length === 1) return t[0]!;
  if (t.length === 2) return `${t[0]}, ${t[1]}`;
  return `${t[0]}, ${t[1]} +${t.length - 2}`;
}

export type ListingFilterSearchableMultiPickerProps = {
  /** aria / id öneki */
  variantId: string;
  triggerEmptyLabel: string;
  panelEyebrow: string;
  panelHint?: string;
  searchPlaceholder: string;
  listAriaLabel: string;
  selected: readonly string[];
  optionsSorted: readonly string[];
  normalizeKey: (raw: string) => string;
  onToggle: (value: string, checked: boolean) => void;
  onClearAll?: () => void;
  clearAriaLabel?: string;
};

export function ListingFilterSearchableMultiPicker({
  variantId,
  triggerEmptyLabel,
  panelEyebrow,
  panelHint,
  searchPlaceholder,
  listAriaLabel,
  selected,
  optionsSorted,
  normalizeKey,
  onToggle,
  onClearAll,
  clearAriaLabel = "Seçimi temizle",
}: ListingFilterSearchableMultiPickerProps) {
  const baseId = useId();
  const listId = `${variantId}-${baseId}-list`;
  const triggerId = `${variantId}-${baseId}-trigger`;
  const lg = useLgMedia();
  const [open, setOpen] = useState(false);
  const [panelQ, setPanelQ] = useState("");
  const deferredPanelQ = useDeferredValue(panelQ);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const summary = useMemo(
    () => listingFilterMultiSummary(selected, triggerEmptyLabel),
    [selected, triggerEmptyLabel]
  );

  const filteredOptions = useMemo(() => {
    const needle = normalizeKey(deferredPanelQ.trim());
    if (!needle) return [...optionsSorted];
    return optionsSorted.filter((o) => normalizeKey(o).includes(needle));
  }, [optionsSorted, deferredPanelQ, normalizeKey]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t)) return;
      if (sheetRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) setPanelQ("");
  }, [open]);

  useEffect(() => {
    if (!open || lg) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, lg]);

  const triggerButton = (
    <div className="relative flex min-w-0 gap-1">
      <button
        id={triggerId}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[42px] min-w-0 flex-1 items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 py-2 text-left text-sm font-medium text-foreground shadow-sm transition hover:border-border hover:bg-background focus-visible:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span className="min-w-0 flex-1 truncate text-foreground/90">{summary}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {onClearAll && selected.length > 0 ? (
        <button
          type="button"
          aria-label={clearAriaLabel}
          title={clearAriaLabel}
          onClick={(e) => {
            e.stopPropagation();
            onClearAll();
          }}
          className="flex h-[42px] w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-lg leading-none text-foreground/40 transition hover:bg-primary/5 hover:text-foreground/70"
        >
          ×
        </button>
      ) : null}
    </div>
  );

  const searchInput = (
    <input
      type="search"
      value={panelQ}
      onChange={(e) => setPanelQ(e.target.value)}
      placeholder={searchPlaceholder}
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/40"
      autoComplete="off"
      enterKeyHint="search"
    />
  );

  const scrollList = (
    <div
      id={listId}
      role="listbox"
      aria-label={listAriaLabel}
      className="max-h-[min(320px,52vh)] space-y-2 overflow-y-auto overscroll-contain py-1 pr-1 [-webkit-overflow-scrolling:touch]"
    >
      {filteredOptions.length === 0 ? (
        <p className="py-3 text-center text-xs text-foreground/55">Eşleşen sonuç yok.</p>
      ) : (
        filteredOptions.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1.5 text-sm text-foreground/90 hover:bg-primary/5"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={(e) => onToggle(opt, e.target.checked)}
              className="accent-primary"
            />
            <span className="min-w-0 flex-1 wrap-break-word leading-snug">{opt}</span>
          </label>
        ))
      )}
    </div>
  );

  const introBlock = (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground/55">
        {panelEyebrow}
      </p>
      {panelHint ? (
        <p className="mt-1 text-xs leading-relaxed text-foreground/50">{panelHint}</p>
      ) : null}
    </div>
  );

  const desktopPanelBody = (
    <div className="flex flex-col gap-3 p-4 pt-3">
      {introBlock}
      {searchInput}
      {scrollList}
    </div>
  );

  const mobilePanelBody = (
    <div className="flex flex-col gap-3 px-4 pb-4 pt-1">
      {panelHint ? (
        <p className="text-xs leading-relaxed text-foreground/50">{panelHint}</p>
      ) : null}
      {searchInput}
      {scrollList}
    </div>
  );

  return (
    <>
      <div ref={wrapRef} className="relative min-w-0">
        {triggerButton}

        {open && lg ? (
          <div className="absolute left-0 right-0 top-full z-[40] mt-1.5 overflow-hidden rounded-xl border border-border bg-background shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-border/60">
            {desktopPanelBody}
          </div>
        ) : null}
      </div>

      {open && !lg ? (
        <div className="fixed inset-0 z-[125] flex flex-col justify-end lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
            aria-label="Kapat"
            onClick={() => setOpen(false)}
          />
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${listId}-sheet-title`}
            className="relative z-[126] flex max-h-[88dvh] flex-col rounded-t-2xl border border-border bg-background shadow-2xl ring-1 ring-border"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
              <h2
                id={`${listId}-sheet-title`}
                className="text-base font-semibold text-primary"
              >
                {panelEyebrow}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-secondary hover:bg-primary/5"
              >
                Tamam
              </button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{mobilePanelBody}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
