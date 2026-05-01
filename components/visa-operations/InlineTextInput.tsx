"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  initialValue: string | null;
  debounceMs?: number;
  onCommit: (note: string | null) => Promise<boolean>;
  disabled?: boolean;
  placeholder?: string;
  "aria-label"?: string;
};

export function InlineTextInput({
  initialValue,
  debounceMs = 500,
  onCommit,
  disabled = false,
  placeholder,
  "aria-label": ariaLabel,
}: Props) {
  const [draft, setDraft] = useState(initialValue ?? "");
  const [saving, setSaving] = useState(false);
  const [tick, setTick] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSyncedRef = useRef<string | null>(initialValue ?? null);

  useEffect(() => setDraft(initialValue ?? ""), [initialValue]);
  useEffect(() => {
    lastSyncedRef.current = initialValue ?? null;
  }, [initialValue]);

  const normalized = useCallback((text: string) => {
    const t = text.trim();
    return t === "" ? null : t;
  }, []);

  const runCommit = useCallback(
    async (text: string) => {
      const next = normalized(text);
      const prevRaw = lastSyncedRef.current ?? null;
      if (next === prevRaw || (next == null && (prevRaw == null || prevRaw.trim() === ""))) return;

      setSaving(true);
      const ok = await onCommit(next);
      setSaving(false);
      if (ok) {
        lastSyncedRef.current = next;
        setTick(true);
        window.setTimeout(() => setTick(false), 800);
      } else {
        setDraft(initialValue ?? "");
      }
    },
    [normalized, onCommit, initialValue]
  );

  const queue = useCallback(
    (text: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        void runCommit(text);
      }, debounceMs);
    },
    [debounceMs, runCommit]
  );

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  return (
    <div className="flex min-h-[26px] max-w-[16rem] items-center gap-1">
      <input
        aria-label={ariaLabel}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        value={draft}
        onBlur={() => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          void runCommit(draft);
        }}
        onChange={(e) => {
          const v = e.target.value;
          setDraft(v);
          queue(v);
        }}
        className="min-w-[7rem] max-w-[15rem] flex-1 truncate rounded-lg border border-[#0B3C5D]/14 bg-[#F7F9FB] px-2 py-0.5 text-[11px] font-medium leading-snug text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 transition focus:bg-white focus:ring-[1px] disabled:opacity-55"
      />
      <span className="w-4 shrink-0 text-center text-[11px] font-semibold tabular-nums" aria-live="polite">
        {saving ? <span className="text-[#1A1A1A]/40">…</span> : tick ? <span className="text-emerald-700">✓</span> : null}
      </span>
    </div>
  );
}
