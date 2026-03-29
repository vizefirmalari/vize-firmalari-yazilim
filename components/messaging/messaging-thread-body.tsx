"use client";

import { useCallback } from "react";

import type { MessageWithAttachment } from "@/lib/messaging/types";
import { formatFileSize } from "@/lib/messaging/identity";

type Props = {
  messages: MessageWithAttachment[];
  currentUserId: string | null;
};

function timeLabel(iso: string) {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function AttachmentCard({
  attachment,
  mine,
}: {
  attachment: NonNullable<MessageWithAttachment["attachment"]>;
  mine: boolean;
}) {
  const open = useCallback(async () => {
    try {
      const res = await fetch("/api/chat/signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: attachment.storage_path }),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (json.url) {
        window.open(json.url, "_blank", "noopener,noreferrer");
      }
    } catch {
      /* sessiz */
    }
  }, [attachment.storage_path]);

  return (
    <button
      type="button"
      onClick={open}
      className={
        mine
          ? "mt-1 w-full rounded-xl border border-white/25 bg-white/10 px-3 py-2.5 text-left transition hover:bg-white/15"
          : "mt-1 w-full rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2.5 text-left transition hover:bg-[#F7F9FB]"
      }
    >
      <div className={`text-xs font-semibold ${mine ? "text-white" : "text-[#0B3C5D]"}`}>
        {attachment.file_name}
      </div>
      <div className={`mt-0.5 text-[10px] ${mine ? "text-white/70" : "text-[#1A1A1A]/45"}`}>
        {attachment.mime_type} · {formatFileSize(attachment.byte_size)}
      </div>
      <div className={`mt-1 text-[10px] font-semibold ${mine ? "text-[#D9A441]" : "text-[#328CC1]"}`}>
        Görüntüle / indir
      </div>
    </button>
  );
}

export function MessagingThreadBody({ messages, currentUserId }: Props) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm font-medium text-[#1A1A1A]/50">Henüz mesaj yok</p>
        <p className="mt-1 max-w-sm text-xs text-[#1A1A1A]/40">
          Profesyonel ve güvenli iletişim için mesajınızı aşağıdan gönderebilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3 px-3 py-4 sm:px-4">
      {messages.map((m) => {
        const mine = currentUserId && m.sender_id === currentUserId;
        if (m.kind === "system") {
          return (
            <li key={m.id} className="flex justify-center">
              <span className="rounded-full bg-[#EEF1F4] px-3 py-1 text-center text-[11px] font-medium text-[#1A1A1A]/55">
                {m.body ?? "Sistem"}
              </span>
            </li>
          );
        }
        return (
          <li
            key={m.id}
            className={`flex w-full ${mine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[min(92%,28rem)] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                mine
                  ? "rounded-br-md bg-[#0B3C5D] text-white"
                  : "rounded-bl-md border border-[#0B3C5D]/10 bg-white text-[#1A1A1A]"
              }`}
            >
              {m.kind === "attachment" && m.attachment ? (
                <AttachmentCard attachment={m.attachment} mine={Boolean(mine)} />
              ) : null}
              {m.body?.trim() ? (
                <p
                  className={`whitespace-pre-wrap wrap-break-word text-sm leading-relaxed ${
                    m.kind === "attachment" && m.attachment ? "mt-2" : ""
                  } ${mine ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  {m.body}
                </p>
              ) : null}
              <p
                className={`mt-1 text-[10px] tabular-nums ${
                  mine ? "text-white/65" : "text-[#1A1A1A]/40"
                }`}
              >
                {timeLabel(m.created_at)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
