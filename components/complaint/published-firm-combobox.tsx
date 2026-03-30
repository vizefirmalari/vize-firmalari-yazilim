"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { authInputClass } from "@/components/auth/auth-styles";
import { firmInitials } from "@/lib/firma/firm-initials";
import type { PublishedFirmPickerRow } from "@/lib/types/published-firm-picker";

type Props = {
  id?: string;
  firms: PublishedFirmPickerRow[];
  value: string;
  onChange: (firmId: string) => void;
  error?: string;
  disabled?: boolean;
};

function normalize(s: string) {
  return s.trim().toLocaleLowerCase("tr");
}

function firmMatchesQuery(f: PublishedFirmPickerRow, q: string) {
  const n = normalize(q);
  if (!n) return true;
  if (normalize(f.name).includes(n)) return true;
  const slugNorm = normalize(f.slug.replace(/-/g, " "));
  if (slugNorm.includes(n)) return true;
  if (normalize(f.slug).includes(n.replace(/\s+/g, ""))) return true;
  return false;
}

function subtitleLine(f: PublishedFirmPickerRow): string | null {
  const s = f.short_description?.trim();
  if (!s) return null;
  if (s.length <= 72) return s;
  return `${s.slice(0, 69)}…`;
}

export function PublishedFirmCombobox({
  id: _id,
  firms,
  value,
  onChange,
  error,
  disabled,
}: Props) {
  const autoId = useId();
  const listId = `${autoId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selected = useMemo(
    () => firms.find((f) => f.id === value) ?? null,
    [firms, value]
  );

  const filtered = useMemo(() => {
    return firms.filter((f) => firmMatchesQuery(f, searchQuery));
  }, [firms, searchQuery]);

  const close = useCallback(() => {
    setOpen(false);
    setSearchQuery("");
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => searchRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onDoc(ev: MouseEvent) {
      const el = rootRef.current;
      if (!el?.contains(ev.target as Node)) close();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, close]);

  const emptyList = firms.length === 0;
  const triggerDisabled = disabled || emptyList;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={_id}
        disabled={triggerDisabled}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        onClick={() => {
          if (triggerDisabled) return;
          setOpen((o) => !o);
          if (!open) setSearchQuery("");
        }}
        className={`flex min-h-12 w-full items-center gap-3 rounded-xl border border-primary/15 bg-[#F7F9FB] px-3 py-2.5 text-left text-sm outline-none transition ring-secondary/30 focus:border-secondary/40 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? "border-red-300 ring-1 ring-red-200" : ""
        }`}
      >
        {selected ? (
          <>
            <FirmPickerAvatar firm={selected} size="md" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-foreground">
                {selected.name}
              </span>
              {subtitleLine(selected) ? (
                <span className="mt-0.5 block truncate text-xs text-foreground/55">
                  {subtitleLine(selected)}
                </span>
              ) : (
                <span className="mt-0.5 block truncate text-xs text-foreground/40">
                  /{selected.slug}
                </span>
              )}
            </span>
          </>
        ) : (
          <span className="min-w-0 flex-1 text-foreground/45">
            {emptyList
              ? "Yayınlanmış firma bulunamadı"
              : "Firma seçiniz"}
          </span>
        )}
        <span
          aria-hidden
          className={`shrink-0 text-primary/50 transition ${open ? "rotate-180" : ""}`}
        >
          <ChevronIcon />
        </span>
      </button>

      {open && !emptyList ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 z-40 mt-1 overflow-hidden rounded-xl border border-primary/15 bg-white shadow-[0_12px_40px_rgba(11,60,93,0.12)]"
        >
          <div className="border-b border-border/80 p-2">
            <input
              ref={searchRef}
              type="search"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Firma ara…"
              aria-label="Firma ara"
              className={`${authInputClass} mt-0! border-primary/12 bg-surface text-sm`}
            />
          </div>
          <ul className="max-h-[min(16rem,50vh)] overflow-y-auto overscroll-contain py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-8 text-center">
                <p className="m-0 text-sm font-medium text-foreground/70">
                  Sonuç bulunamadı
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/50">
                  Farklı bir arama terimi deneyin veya listeden seçin.
                </p>
              </li>
            ) : (
              filtered.map((f) => {
                const isSelected = f.id === value;
                const sub = subtitleLine(f);
                return (
                  <li key={f.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      className={`flex w-full min-h-13 items-center gap-3 px-3 py-2.5 text-left transition focus-visible:outline-none ${
                        isSelected
                          ? "bg-primary/10 ring-1 ring-inset ring-primary/15"
                          : "hover:bg-primary/6 focus-visible:bg-primary/8"
                      }`}
                      onClick={() => {
                        onChange(f.id);
                        close();
                      }}
                    >
                      <FirmPickerAvatar firm={f} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-foreground">
                          {f.name}
                        </span>
                        {sub ? (
                          <span className="mt-0.5 block truncate text-xs text-foreground/55">
                            {sub}
                          </span>
                        ) : (
                          <span className="mt-0.5 block truncate text-xs text-foreground/40">
                            /{f.slug}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}

      {emptyList ? (
        <p className="mt-2 text-xs leading-relaxed text-foreground/65">
          Şu an veritabanında yayınlanmış firma yok veya liste yüklenemedi. Sorun devam ederse{" "}
          <Link
            href="/iletisim"
            className="font-medium text-secondary underline-offset-2 hover:underline"
          >
            İletişim
          </Link>{" "}
          sayfasından bize yazabilirsiniz.
        </p>
      ) : null}

      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-800" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FirmPickerAvatar({
  firm,
  size,
}: {
  firm: PublishedFirmPickerRow;
  size: "sm" | "md";
}) {
  const px = size === "md" ? 40 : 36;
  const tw = size === "md" ? "h-10 w-10" : "h-9 w-9";
  const textClass = size === "md" ? "text-sm" : "text-xs";
  const alt =
    firm.logo_alt_text?.trim() || `${firm.name} logosu`;

  return (
    <div
      className={`relative ${tw} shrink-0 overflow-hidden rounded-lg border border-primary/12 bg-surface ring-1 ring-primary/6`}
    >
      {firm.logo_url ? (
        <Image
          src={firm.logo_url}
          alt={alt}
          width={px}
          height={px}
          className="h-full w-full object-contain p-1"
          sizes={`${px}px`}
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center text-[0.7rem] font-bold tracking-tight text-primary ${textClass}`}
          aria-hidden
        >
          {firmInitials(firm.name)}
        </span>
      )}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
