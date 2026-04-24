"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { useMobileProgressLoader } from "@/hooks/use-mobile-progress-loader";
import { sendChatMessage } from "@/lib/actions/chat-message";
import { CHAT_ATTACHMENT_MAX_BYTES, validateChatAttachment } from "@/lib/validation/chat-attachment";

type Props = {
  conversationId: string | null;
  disabled?: boolean;
  /** Realtime typing broadcast (debounce içeride) */
  onTyping?: () => void;
  /**
   * Görsel viewport klavye payı (px). Üst bileşen (thread) composer şeridine padding verir;
   * burada tekrar etmeyiz; sadece textarea yüksekliği / odak davranışı için kullanılır.
   */
  keyboardInsetPx?: number;
};

/**
 * Metin gönderimi + ek yükleme (FormData → /api/chat/upload).
 * Mobilde klavye: üstteki ConversationThreadView composer şeridi visualViewport padding ile kalkar.
 */
export function Composer({ conversationId, disabled, onTyping, keyboardInsetPx = 0 }: Props) {
  const mobileLoader = useMobileProgressLoader();
  const closeIfTaskRef = useRef(mobileLoader.closeIfTask);
  closeIfTaskRef.current = mobileLoader.closeIfTask;
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const keyboardLikelyOpen = keyboardInsetPx > 12;

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

  /** Sadece mesaj/dosya "task" loader'ını kapatır; sayfa linki (nav) loader'ına karışmaz. */
  useEffect(
    () => () => {
      closeIfTaskRef.current();
    },
    [conversationId]
  );

  const canSend = Boolean(conversationId) && !disabled && !isPending && !uploading;

  const handleSend = () => {
    if (!conversationId || !text.trim()) return;
    setError(null);
    mobileLoader.startTask();
    startTransition(async () => {
      try {
        const res = await sendChatMessage(conversationId, text);
        if (!res.ok) {
          setError(res.error);
          return;
        }
        setText("");
      } finally {
        mobileLoader.done();
      }
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
    mobileLoader.startTask();
    try {
      const fd = new FormData();
      fd.set("conversationId", conversationId);
      fd.set("file", file);
      const res = await fetch("/api/chat/upload", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? "Yükleme başarısız.");
      }
      /* Başarı: DB tetikleyicisi attachment sonrası conversation broadcast — tam liste refresh gerekmez */
    } finally {
      setUploading(false);
      mobileLoader.done();
    }
  };

  if (!conversationId) {
    return null;
  }

  /** Tık / dokunuşla odak: tarayıcının window scroll ile alanı göstermesini engeller. */
  const handleTextareaPointerDown = (e: React.PointerEvent<HTMLTextAreaElement>) => {
    if (!canSend) return;
    const ta = textareaRef.current;
    if (!ta) return;
    if (document.activeElement === ta) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    ta.focus({ preventScroll: true });
  };

  /** Gönder / Dosya tıklanınca odak taşınmasın → tarayıcı scroll-into-view tetiklemesin. */
  const preventFocusStealScroll = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  /** Klavye açıkken dvh küçülür; kapalıyken svh ile adres çubuğu oynamasına karşı daha stabil max yükseklik. */
  const mobileTextareaMax =
    keyboardLikelyOpen
      ? "max-md:max-h-[min(38dvh,7rem)]"
      : "max-md:max-h-[min(24svh,5rem)]";

  const btnBase =
    "inline-flex h-10 shrink-0 items-center justify-center rounded-xl px-3 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed sm:min-h-[2.5rem] sm:px-4 sm:text-sm";

  return (
    <div className="space-y-1 sm:space-y-1.5">
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50/80 px-2.5 py-1.5 text-xs text-red-700 sm:px-3 sm:py-2 sm:text-sm">
          {error}
        </p>
      ) : null}
      <div className="flex flex-row items-end gap-2 sm:gap-3">
        <textarea
          ref={textareaRef}
          value={text}
          onPointerDown={handleTextareaPointerDown}
          onChange={(ev) => {
            setText(ev.target.value);
            scheduleTyping();
          }}
          placeholder="Mesaj yazın…"
          rows={1}
          enterKeyHint="send"
          disabled={!canSend}
          className={`min-h-[2.75rem] flex-1 resize-none overflow-y-auto rounded-2xl border border-[#0B3C5D]/10 bg-white px-3 py-2 text-[0.8125rem] leading-snug text-[#1A1A1A] outline-none transition-[border-color,box-shadow,max-height] scroll-my-0 placeholder:text-[13px] placeholder:text-[#1A1A1A]/30 focus:border-[#0B3C5D]/25 focus:ring-[3px] focus:ring-[#0B3C5D]/07 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[3rem] sm:max-h-[min(40vh,14rem)] sm:rounded-xl sm:border-[#0B3C5D]/12 sm:px-3.5 sm:py-2.5 sm:text-sm sm:leading-relaxed sm:placeholder:text-sm sm:placeholder:text-[#1A1A1A]/38 sm:focus:border-[#0B3C5D]/28 sm:focus:ring-2 sm:focus:ring-[#0B3C5D]/10 sm:disabled:opacity-45 ${mobileTextareaMax}`}
        />
        <div className="flex shrink-0 flex-row items-end gap-1.5 sm:gap-2">
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
            onMouseDown={preventFocusStealScroll}
            onClick={() => fileRef.current?.click()}
            className={`${btnBase} border border-transparent bg-[#EEF1F4] text-[#0B3C5D]/75 hover:bg-[#E4E8EC] focus-visible:outline-[#0B3C5D]/22 disabled:opacity-38 sm:border-[#0B3C5D]/12 sm:bg-white sm:font-medium sm:text-[#0B3C5D] sm:hover:bg-[#F7F9FB] sm:focus-visible:outline-[#0B3C5D]/28 sm:disabled:opacity-45`}
          >
            {uploading ? "…" : "Dosya"}
          </button>
          <button
            type="button"
            disabled={!canSend || !text.trim()}
            onMouseDown={preventFocusStealScroll}
            onClick={handleSend}
            className={`${btnBase} bg-[#0B3C5D] px-3.5 font-semibold text-white shadow-sm shadow-[#0B3C5D]/15 hover:opacity-[0.96] active:scale-[0.98] focus-visible:outline-[#0B3C5D]/38 disabled:opacity-32 disabled:active:scale-100 sm:px-5 sm:shadow-[#0B3C5D]/18 sm:disabled:opacity-38`}
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
