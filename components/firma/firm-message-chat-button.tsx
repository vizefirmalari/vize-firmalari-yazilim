"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ensureUserFirmConversationAction } from "@/lib/actions/ensure-user-firm-conversation";

type Props = {
  firmId: string;
  /** Kart ve detay sayfası aynı sınıfları paylaşır */
  className?: string;
  disabled?: boolean;
};

const defaultClassName =
  "inline-flex h-10 w-full min-w-0 shrink flex-nowrap items-center justify-center gap-1 whitespace-nowrap rounded-xl border border-[#0B3C5D]/12 bg-white px-2.5 text-center text-xs font-semibold leading-none text-[#0B3C5D] transition hover:border-[#0B3C5D]/18 hover:bg-[#F7F9FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/35 disabled:pointer-events-none disabled:opacity-50 sm:px-3 sm:text-sm";

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 10h8M8 14h5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M6.5 19.5 8 17H18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12l2.5-2.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Firma kartı / detay: oturum → konuşma bul/oluştur → /mesajlar?c=
 * Oturum yoksa girişten sonra /mesajlar?firm= ile devam eder.
 */
export function FirmMessageChatButton({ firmId, className, disabled }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading || disabled) return;
    setLoading(true);
    try {
      const res = await ensureUserFirmConversationAction(firmId);
      if (!res.ok) {
        if (res.code === "AUTH") {
          toast.error(res.error);
          router.push(`/?auth=login&next=${encodeURIComponent(`/mesajlar?firm=${firmId}`)}`);
        } else {
          toast.error(res.error);
        }
        return;
      }

      router.push(`/mesajlar?c=${res.conversationId}`);
    } catch {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className={className ?? defaultClassName}
      aria-busy={loading}
    >
      {loading ? (
        <span
          className="size-3 shrink-0 animate-spin rounded-full border-[1.5px] border-[#0B3C5D]/25 border-t-[#0B3C5D]"
          aria-hidden
        />
      ) : (
        <ChatBubbleIcon className="size-3 shrink-0 opacity-90" />
      )}
      <span>Firma ile Mesajlaş</span>
    </button>
  );
}
