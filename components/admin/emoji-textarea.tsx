"use client";

import { useCallback, useId, useRef, useState, type TextareaHTMLAttributes } from "react";

import { EMOJI_TEXT_CLASS, SERVICE_DESCRIPTION_EMOJIS, insertTextAtCursor } from "@/lib/admin/service-emoji";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  /** Altında gösterilir; `null` verilirse ipucu gizlenir. */
  hint?: string | null;
};

export function EmojiTextarea({ value, onChange, hint, className = "", rows = 4, ...rest }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const insertEmoji = useCallback(
    (emoji: string) => {
      const el = ref.current;
      const start = el?.selectionStart ?? value.length;
      const end = el?.selectionEnd ?? value.length;
      const { next, cursor } = insertTextAtCursor(value, emoji, start, end);
      onChange(next);
      setOpen(false);
      requestAnimationFrame(() => {
        const ta = ref.current;
        if (!ta) return;
        ta.focus();
        ta.setSelectionRange(cursor, cursor);
      });
    },
    [onChange, value]
  );

  return (
    <div className="mt-1 space-y-1.5">
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={`w-full rounded-xl border px-3 py-2 pr-12 text-sm leading-relaxed ${EMOJI_TEXT_CLASS} ${className}`}
          {...rest}
        />
        <div className="absolute bottom-2 right-2">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            title="Emoji ekle"
            className="rounded-lg border border-[#0B3C5D]/15 bg-white/95 px-2 py-1 text-base shadow-sm transition hover:border-[#0B3C5D]/30"
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden>😀</span>
            <span className="sr-only">Emoji ekle</span>
          </button>
        </div>
        {open ? (
          <div
            id={panelId}
            role="listbox"
            aria-label="Emoji seç"
            className="absolute bottom-11 right-0 z-20 max-h-40 w-[min(100%,16rem)] overflow-y-auto rounded-xl border border-[#0B3C5D]/15 bg-white p-2 shadow-lg"
          >
            <div className="flex flex-wrap gap-0.5">
              {SERVICE_DESCRIPTION_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  role="option"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-lg transition hover:bg-[#F7F9FB]"
                  onClick={() => insertEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {hint !== null ? (
        <p className="text-[11px] font-medium text-[#1A1A1A]/45">
          {hint ?? "Emojiler desteklenir; yapıştırabilir veya 😀 ile ekleyebilirsiniz."}
        </p>
      ) : null}
    </div>
  );
}

