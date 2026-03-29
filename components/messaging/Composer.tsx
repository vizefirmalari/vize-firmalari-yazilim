"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { sendChatMessage } from "@/lib/actions/chat-message";
import { CHAT_ATTACHMENT_MAX_BYTES, validateChatAttachment } from "@/lib/validation/chat-attachment";

type Props = {
  conversationId: string | null;
  disabled?: boolean;
  /** Realtime typing broadcast (debounce içeride) */
  onTyping?: () => void;
};

/**
 * Metin gönderimi + ek yükleme (FormData → /api/chat/upload).
 */
export function Composer({ conversationId, disabled, onTyping }: Props) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleTyping = useCallback(() => {
    if (!onTyping) return;
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    typingTimerRef.current = setTimeout(() => {
      onTyping();
    }, 450);
  }, [onTyping]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  const canSend = Boolean(conversationId) && !disabled && !isPending && !uploading;

  const handleSend = () => {
    if (!conversationId || !text.trim()) return;
    setError(null);
    startTransition(async () => {
      const res = await sendChatMessage(conversationId, text);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setText("");
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !conversationId) return;

    const v = validateChatAttachment(file);
    if (!v.ok) {
      setError(v.reason);
      return;
    }

    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("conversationId", conversationId);
      fd.set("file", file);
      const res = await fetch("/api/chat/upload", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? "Yükleme başarısız.");
      } else {
        router.refresh();
      }
    } finally {
      setUploading(false);
    }
  };

  if (!conversationId) {
    return null;
  }

  return (
    <div className="space-y-1.5 pb-[max(0rem,env(safe-area-inset-bottom,0px))] sm:space-y-2">
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50/80 px-2.5 py-1.5 text-xs text-red-700 sm:px-3 sm:py-2 sm:text-sm">
          {error}
        </p>
      ) : null}
      <div className="flex flex-row items-end gap-2 sm:items-end sm:gap-3">
        <textarea
          value={text}
          onChange={(ev) => {
            setText(ev.target.value);
            scheduleTyping();
          }}
          placeholder="Mesaj yazın…"
          rows={1}
          disabled={!canSend}
          className="min-h-[42px] max-h-[min(30vh,6.5rem)] flex-1 resize-none rounded-2xl border border-[#0B3C5D]/10 bg-white px-3 py-2 text-[0.8125rem] leading-snug text-[#1A1A1A] outline-none transition-[border-color,box-shadow] placeholder:text-[13px] placeholder:text-[#1A1A1A]/30 focus:border-[#0B3C5D]/25 focus:ring-[3px] focus:ring-[#0B3C5D]/07 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[76px] sm:max-h-[min(40vh,14rem)] sm:resize-y sm:rounded-xl sm:border-[#0B3C5D]/12 sm:px-3.5 sm:py-2.5 sm:text-sm sm:leading-relaxed sm:placeholder:text-sm sm:placeholder:text-[#1A1A1A]/38 sm:focus:border-[#0B3C5D]/28 sm:focus:ring-2 sm:focus:ring-[#0B3C5D]/10 sm:disabled:opacity-45"
        />
        <div className="flex shrink-0 items-center gap-1.5 pb-px sm:gap-2 sm:pb-0">
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.png,.jpg,.jpeg,.webp"
            onChange={handleFile}
          />
          <button
            type="button"
            disabled={!canSend}
            onClick={() => fileRef.current?.click()}
            className="min-h-10 rounded-xl border border-transparent bg-[#EEF1F4] px-3 py-2 text-xs font-medium text-[#0B3C5D]/75 transition-colors duration-200 hover:bg-[#E4E8EC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/22 disabled:cursor-not-allowed disabled:opacity-38 sm:min-h-0 sm:border-[#0B3C5D]/12 sm:bg-white sm:px-4 sm:py-2.5 sm:text-sm sm:font-medium sm:text-[#0B3C5D] sm:hover:bg-[#F7F9FB] sm:focus-visible:outline-[#0B3C5D]/28 sm:disabled:opacity-45"
          >
            {uploading ? "…" : "Dosya"}
          </button>
          <button
            type="button"
            disabled={!canSend || !text.trim()}
            onClick={handleSend}
            className="min-h-10 rounded-xl bg-[#0B3C5D] px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-[#0B3C5D]/15 transition-[opacity,transform] duration-200 hover:opacity-[0.96] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/38 disabled:cursor-not-allowed disabled:opacity-32 disabled:active:scale-100 sm:min-h-0 sm:px-5 sm:py-2.5 sm:text-sm sm:shadow-[#0B3C5D]/18 sm:disabled:opacity-38"
          >
            {isPending ? "…" : "Gönder"}
          </button>
        </div>
      </div>
      <p className="px-0.5 text-[9px] leading-snug tracking-wide text-[#1A1A1A]/32 sm:px-0 sm:text-[10px] sm:leading-relaxed sm:tracking-normal sm:text-[#1A1A1A]/40">
        Ek en fazla {Math.round(CHAT_ATTACHMENT_MAX_BYTES / (1024 * 1024))} MB; video gönderilemez.
      </p>
    </div>
  );
}
