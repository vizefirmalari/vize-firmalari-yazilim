"use client";

import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { deleteChatMessage } from "@/lib/actions/delete-chat-message";
import type { MessageWithAttachment } from "@/lib/messaging/types";
import { formatFileSize } from "@/lib/messaging/identity";
import { buildMessageOrderIndex, isMessageReadByPeer } from "@/lib/messaging/read-status";

type Props = {
  messages: MessageWithAttachment[];
  currentUserId: string | null;
  peerLastReadMessageId?: string | null;
  onSoftDeleteMessage?: (messageId: string, deletedAt: string, deletedBy: string) => void;
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

function ReadTick({ read }: { read: boolean }) {
  return (
    <span
      className={`inline-flex items-center ${read ? "text-[#D9A441]/95" : "text-current opacity-80"}`}
      aria-label={read ? "Okundu" : "Gönderildi"}
      title={read ? "Okundu" : "Gönderildi"}
    >
      {read ? (
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
          <path d="M2.5 8.2 5.1 10.8 8.1 6.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.7 8.2 10.3 10.8 13.3 6.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
          <path d="M4.2 8.2 6.9 10.8 11.7 6.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

/** Balon dışında (metinle aynı kutuda değil). Mobilde küçük icon-button. */
function MessageActionTrigger({
  menuOpen,
  onToggle,
  deleting,
}: {
  menuOpen: boolean;
  onToggle: () => void;
  deleting: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={deleting}
      className={`inline-flex h-6 w-6 shrink-0 touch-manipulation items-center justify-center rounded-md border border-[#0B3C5D]/12 bg-[#FAFBFC] text-[#0B3C5D]/75 shadow-sm transition hover:border-[#0B3C5D]/20 hover:bg-white hover:text-[#0B3C5D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/28 disabled:opacity-40 max-md:h-7 max-md:w-7 md:shadow-none md:transition-opacity md:duration-200 md:group-hover:shadow-sm md:focus-visible:opacity-100 ${menuOpen ? "md:opacity-100" : "md:opacity-0 md:group-hover:opacity-100"}`}
      aria-label="Mesaj menüsü"
      aria-expanded={menuOpen}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3 max-md:h-3.5 max-md:w-3.5" fill="none" aria-hidden>
        <path d="M5 12h.01M12 12h.01M19 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function MessageActionDropdown({
  align,
  children,
}: {
  align: "left" | "right";
  children: ReactNode;
}) {
  const pos = align === "right" ? "right-0" : "left-0";
  return (
    <div className={`absolute ${pos} top-full z-30 mt-1 min-w-30 rounded-xl border border-[#0B3C5D]/12 bg-white py-1 shadow-lg ring-1 ring-[#0B3C5D]/06`}>
      {children}
    </div>
  );
}

export function MessagingThreadBody({
  messages,
  currentUserId,
  peerLastReadMessageId = null,
  onSoftDeleteMessage,
}: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const deletingSet = useMemo(() => new Set(deletingId ? [deletingId] : []), [deletingId]);
  const orderIndex = useMemo(() => buildMessageOrderIndex(messages), [messages]);

  const handleDelete = async (messageId: string) => {
    if (!currentUserId || deletingSet.has(messageId)) return;
    setDeletingId(messageId);
    setOpenMenuId((cur) => (cur === messageId ? null : cur));
    try {
      const res = await deleteChatMessage(messageId);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      onSoftDeleteMessage?.(res.messageId, res.deletedAt, res.deletedBy);
    } catch {
      toast.error("Mesaj silinirken bir hata oluştu.");
    } finally {
      setDeletingId((cur) => (cur === messageId ? null : cur));
    }
  };

  if (messages.length === 0) {
    return (
      <div className="box-border flex min-h-full w-full flex-col items-center justify-center px-4 py-10 text-center sm:px-5 sm:py-16">
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
        const isDeleted = Boolean(m.deleted_at);
        const readByPeer = mine
          ? isMessageReadByPeer({
              messageId: m.id,
              peerLastReadMessageId,
              orderIndex,
            })
          : false;

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

        const showActionMenu = mine && !isDeleted;
        /** Giden mesaj: sağ dış; ileride gelen mesaj aksiyonu eklenirse "left" + satırda [menü][balon] kullanılır. */
        const menuOuterSide: "left" | "right" = "right";

        const bubbleInner = (
          <>
            {m.kind === "attachment" && m.attachment && !isDeleted ? (
              <AttachmentCard attachment={m.attachment} mine={Boolean(mine)} />
            ) : null}
            {isDeleted ? (
              <p
                className={`text-[0.8125rem] italic leading-[1.45] sm:text-sm sm:leading-relaxed ${
                  mine ? "text-white/80" : "text-[#1A1A1A]/55"
                }`}
              >
                Bu mesaj silindi
              </p>
            ) : m.body?.trim() ? (
              <p
                className={`whitespace-pre-wrap wrap-break-word text-[0.8125rem] leading-[1.45] sm:text-sm sm:leading-relaxed ${
                  m.kind === "attachment" && m.attachment ? "mt-2" : ""
                } ${mine ? "text-white" : "text-[#1A1A1A]"}`}
              >
                {m.body}
              </p>
            ) : null}
            {showTime ? (
              <div
                className={`mt-1.5 inline-flex items-center gap-1 text-[10px] tabular-nums leading-none ${
                  mine ? "text-white/55" : "text-[#1A1A1A]/36"
                }`}
              >
                <span>{timeLabel(m.created_at)}</span>
                {mine ? <ReadTick read={readByPeer} /> : null}
              </div>
            ) : null}
          </>
        );

        const bubbleClass = `min-w-0 px-3 py-2 sm:px-3.5 sm:py-2.5 ${bubbleRound} ${mine ? bubbleBg : ""}`;

        const menuColumn = showActionMenu ? (
          <div className="relative shrink-0 self-start pt-0.5">
            <MessageActionTrigger
              menuOpen={openMenuId === m.id}
              deleting={deletingId === m.id}
              onToggle={() => setOpenMenuId((cur) => (cur === m.id ? null : m.id))}
            />
            {openMenuId === m.id ? (
              <MessageActionDropdown align={menuOuterSide}>
                <button
                  type="button"
                  onClick={() => void handleDelete(m.id)}
                  disabled={deletingId === m.id}
                  className="flex min-h-9 w-full items-center justify-start px-3 py-1.5 text-xs font-medium text-[#1A1A1A] transition hover:bg-[#F0F3F6] active:bg-[#E8ECF0] disabled:opacity-50 max-md:min-h-10 max-md:py-2 max-md:text-[13px]"
                >
                  Sil
                </button>
              </MessageActionDropdown>
            ) : null}
          </div>
        ) : null;

        return (
          <li key={m.id} className={`flex w-full ${mine ? "justify-end" : "justify-start"} ${topGap}`}>
            {showActionMenu ? (
              <div className="group flex max-w-[min(96%,30rem)] flex-nowrap items-start gap-2.5 sm:gap-3">
                <div className={`max-w-[min(88%,26rem)] min-w-0 flex-1 ${bubbleClass}`}>{bubbleInner}</div>
                {menuColumn}
              </div>
            ) : (
              <div className={`max-w-[min(88%,26rem)] ${bubbleClass}`}>{bubbleInner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
