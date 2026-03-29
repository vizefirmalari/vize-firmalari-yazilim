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
          ? "mt-1.5 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-left transition-colors duration-200 hover:bg-white/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
          : "mt-1.5 w-full rounded-lg border border-[#0B3C5D]/10 bg-[#FAFBFC] px-3 py-2 text-left transition-colors duration-200 hover:bg-[#F3F5F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/25"
      }
    >
      <div className={`text-xs font-semibold leading-snug ${mine ? "text-white" : "text-[#0B3C5D]"}`}>
        {attachment.file_name}
      </div>
      <div className={`mt-0.5 text-[10px] leading-tight ${mine ? "text-white/65" : "text-[#1A1A1A]/42"}`}>
        {attachment.mime_type} · {formatFileSize(attachment.byte_size)}
      </div>
      <div className={`mt-1 text-[10px] font-semibold ${mine ? "text-[#E8C56B]" : "text-[#0B3C5D]/70"}`}>
        Görüntüle / indir
      </div>
    </button>
  );
}

export function MessagingThreadBody({ messages, currentUserId }: Props) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-5 sm:py-16">
        <div
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#0B3C5D]/10 bg-white text-[#0B3C5D]/30"
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16v12H5.17L4 17.17V4zm0-2a2 2 0 0 0-2 2v15l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-[#0B3C5D]/75">Henüz mesaj yok</p>
        <p className="mt-1 max-w-72 text-xs leading-relaxed text-[#1A1A1A]/42">
          İlk mesajınızı aşağıdan gönderebilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col px-2 py-2 pb-3 sm:px-4 sm:py-4 sm:pb-4">
      {messages.map((m, i) => {
        const prev = i > 0 ? messages[i - 1] : null;
        const next = i < messages.length - 1 ? messages[i + 1] : null;
        const mine = Boolean(currentUserId && m.sender_id === currentUserId);

        if (m.kind === "system") {
          return (
            <li key={m.id} className={`flex justify-center ${i > 0 ? "mt-4" : ""}`}>
              <span className="max-w-[95%] rounded-md border border-[#0B3C5D]/08 bg-[#F4F6F8] px-3 py-1.5 text-center text-[11px] font-medium leading-snug text-[#1A1A1A]/48">
                {m.body ?? "Sistem"}
              </span>
            </li>
          );
        }

        const prevSame = prev && prev.kind !== "system" && prev.sender_id === m.sender_id;
        const nextSame = next && next.kind !== "system" && next.sender_id === m.sender_id;

        const topGap = prevSame ? "mt-1" : i > 0 ? "mt-3" : "";
        const showTime = !nextSame;

        const bubbleRound = mine
          ? prevSame
            ? "rounded-xl rounded-tr-sm rounded-br-sm shadow-none"
            : "rounded-xl rounded-br-sm shadow-sm shadow-[#0B3C5D]/12"
          : prevSame
            ? "rounded-xl rounded-tl-sm rounded-bl-sm border border-[#0B3C5D]/08 bg-white shadow-none"
            : "rounded-xl rounded-bl-sm border border-[#0B3C5D]/09 bg-white shadow-sm shadow-[#0B3C5D]/04";

        const bubbleBg = mine ? "bg-[#0B3C5D] text-white" : "";

        return (
          <li key={m.id} className={`flex w-full ${mine ? "justify-end" : "justify-start"} ${topGap}`}>
            <div className={`max-w-[min(88%,26rem)] px-3 py-2 sm:px-3.5 sm:py-2.5 ${bubbleRound} ${mine ? bubbleBg : ""}`}>
              {m.kind === "attachment" && m.attachment ? (
                <AttachmentCard attachment={m.attachment} mine={Boolean(mine)} />
              ) : null}
              {m.body?.trim() ? (
                <p
                  className={`whitespace-pre-wrap wrap-break-word text-[0.8125rem] leading-[1.45] sm:text-sm sm:leading-relaxed ${
                    m.kind === "attachment" && m.attachment ? "mt-2" : ""
                  } ${mine ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  {m.body}
                </p>
              ) : null}
              {showTime ? (
                <p
                  className={`mt-1.5 text-[10px] tabular-nums leading-none ${
                    mine ? "text-white/55" : "text-[#1A1A1A]/36"
                  }`}
                >
                  {timeLabel(m.created_at)}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
