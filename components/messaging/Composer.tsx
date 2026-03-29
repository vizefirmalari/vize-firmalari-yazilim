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
    <div className="space-y-2">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <textarea
          value={text}
          onChange={(ev) => {
            setText(ev.target.value);
            scheduleTyping();
          }}
          placeholder="Mesajınızı yazın…"
          rows={3}
          disabled={!canSend}
          className="min-h-[88px] flex-1 resize-y rounded-2xl border border-[#1A1A1A]/15 bg-white px-4 py-3 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/20 placeholder:text-[#1A1A1A]/40 focus:border-[#0B3C5D]/40 focus:ring-2 disabled:opacity-50"
        />
        <div className="flex shrink-0 gap-2">
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
            className="rounded-2xl border border-[#1A1A1A]/15 bg-white px-4 py-3 text-sm font-medium text-[#0B3C5D] transition hover:bg-[#F7F7F7] disabled:opacity-50"
          >
            {uploading ? "…" : "Dosya"}
          </button>
          <button
            type="button"
            disabled={!canSend || !text.trim()}
            onClick={handleSend}
            className="rounded-2xl bg-[#0B3C5D] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-40"
          >
            {isPending ? "…" : "Gönder"}
          </button>
        </div>
      </div>
      <p className="text-[10px] text-[#1A1A1A]/45">
        Ek en fazla {Math.round(CHAT_ATTACHMENT_MAX_BYTES / (1024 * 1024))} MB; video gönderilemez.
      </p>
    </div>
  );
}
