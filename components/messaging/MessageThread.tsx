"use client";

import type { MessageRow } from "@/lib/messaging/types";

type Props = {
  messages: MessageRow[];
  currentUserId: string | null;
};

/**
 * Basit mesaj listesi — uzun geçmişte virtualize edilebilir.
 */
export function MessageThread({ messages, currentUserId }: Props) {
  if (messages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#1A1A1A]/20 bg-white/80 px-6 py-10 text-center text-sm text-[#1A1A1A]/50">
        Bu konuşmada henüz mesaj yok. İlk mesajı siz gönderin.
      </div>
    );
  }

  return (
    <ul className="flex max-h-[min(60vh,520px)] flex-col gap-3 overflow-y-auto rounded-2xl border border-[#1A1A1A]/10 bg-white p-4">
      {messages.map((m) => {
        const mine = currentUserId && m.sender_id === currentUserId;
        return (
          <li
            key={m.id}
            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
              mine
                ? "ml-auto bg-[#0B3C5D] text-white"
                : "mr-auto border border-[#1A1A1A]/10 bg-[#F7F7F7] text-[#1A1A1A]"
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{m.body ?? (m.kind === "attachment" ? "Ek" : "")}</p>
            <p
              className={`mt-1 text-[10px] uppercase tracking-wide ${mine ? "text-white/70" : "text-[#1A1A1A]/45"}`}
            >
              {new Date(m.created_at).toLocaleString("tr-TR")}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
