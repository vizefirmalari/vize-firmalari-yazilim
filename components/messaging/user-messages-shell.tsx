"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { ConversationThreadView } from "@/components/messaging/conversation-thread-view";
import { MessagingAvatar } from "@/components/messaging/messaging-avatar";
import { userInboxTopic } from "@/lib/realtime/channel-names";
import { previewFromMessage } from "@/lib/messaging/identity";
import type { UserInboxRow } from "@/lib/messaging/inbox-types";
import type { MessageWithAttachment } from "@/lib/messaging/types";
import { useInboxRealtime } from "@/hooks/use-inbox-realtime";
import type { UserThreadHeaderFirm } from "@/lib/messaging/inbox-types";

type Props = {
  userId: string;
  initialList: UserInboxRow[];
  conversationId: string | null;
  initialMessages: MessageWithAttachment[];
  firmHeader: UserThreadHeaderFirm | null;
};

function formatListTime(iso: string | null) {
  if (!iso) return "";
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

export function UserMessagesShell({
  userId,
  initialList,
  conversationId,
  initialMessages,
  firmHeader,
}: Props) {
  const router = useRouter();

  const sortedList = useMemo(() => {
    return [...initialList].sort((a, b) => {
      if (a.unread_for_user !== b.unread_for_user) {
        return b.unread_for_user - a.unread_for_user;
      }
      const ta = a.last_message_at ? new Date(a.last_message_at).getTime() : 0;
      const tb = b.last_message_at ? new Date(b.last_message_at).getTime() : 0;
      return tb - ta;
    });
  }, [initialList]);

  const onInboxPing = useCallback(() => {
    router.refresh();
  }, [router]);

  useInboxRealtime({
    topic: userInboxTopic(userId),
    enabled: Boolean(userId),
    onInboxPing,
  });

  const showMobileThread = Boolean(conversationId);

  return (
    <div className="flex min-h-[min(100dvh-12rem,720px)] flex-1 flex-col md:flex-row md:rounded-xl md:border md:border-[#0B3C5D]/10 md:bg-white md:shadow-[0_4px_24px_rgba(11,60,93,0.06)]">
      <aside
        className={`flex w-full flex-col border-[#0B3C5D]/10 md:max-w-[380px] md:border-r ${
          showMobileThread ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="border-b border-[#0B3C5D]/10 px-4 py-4">
          <h1 className="text-lg font-semibold text-[#0B3C5D]">Mesajlar</h1>
          <p className="mt-1 text-xs text-[#1A1A1A]/55">
            Firmalarınızla güvenli mesajlaşma
          </p>
        </div>
        <ul className="max-h-[50vh] min-h-0 flex-1 overflow-y-auto md:max-h-none">
          {sortedList.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-[#1A1A1A]/45">
              Henüz konuşma yok. Bir firma kartından &quot;Firma ile Mesajlaş&quot; ile başlayın.
            </li>
          ) : (
            sortedList.map((row) => {
              const active = row.conversation_id === conversationId;
              const preview = previewFromMessage(
                row.last_kind,
                row.last_body,
                row.has_attachment
              );
              return (
                <li key={row.conversation_id}>
                  <button
                    type="button"
                    onClick={() => router.push(`/mesajlar?c=${row.conversation_id}`)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-[#F7F9FB] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0B3C5D]/30 ${
                      active ? "bg-[#F0F4F8] ring-1 ring-inset ring-[#0B3C5D]/10" : ""
                    }`}
                  >
                    <MessagingAvatar
                      name={row.firm_name}
                      imageUrl={row.firm_logo_url}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-[#0B3C5D]">
                          {row.firm_name}
                        </span>
                        <span className="shrink-0 text-[10px] tabular-nums text-[#1A1A1A]/40">
                          {formatListTime(row.last_message_at)}
                        </span>
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs text-[#1A1A1A]/55">{preview}</p>
                    </div>
                    {row.unread_for_user > 0 ? (
                      <span className="mt-0.5 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#D9A441] px-1.5 text-[10px] font-bold text-[#1A1A1A]">
                        {row.unread_for_user > 9 ? "9+" : row.unread_for_user}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </aside>

      <section
        className={`flex min-h-0 min-w-0 flex-1 flex-col ${showMobileThread ? "flex" : "hidden md:flex"}`}
      >
        {conversationId ? (
          <ConversationThreadView
            conversationId={conversationId}
            currentUserId={userId}
            initialMessages={initialMessages}
            headerTitle={firmHeader?.name ?? "Firma"}
            headerSubtitle="Şirket temsilcisi"
            headerLogoUrl={firmHeader?.logo_url ?? null}
            onBackMobile={() => router.push("/mesajlar")}
          />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center border-t border-[#0B3C5D]/10 bg-[#FAFBFC] px-6 py-16 text-center md:border-t-0">
            <p className="text-sm font-medium text-[#1A1A1A]/50">Bir konuşma seçin</p>
            <p className="mt-1 max-w-xs text-xs text-[#1A1A1A]/40">
              Soldaki listeden devam etmek istediğiniz firmayı seçerek mesajlaşmaya başlayın.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
