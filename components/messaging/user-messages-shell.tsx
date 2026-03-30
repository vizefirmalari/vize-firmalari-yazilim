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

function EmptyListGlyph() {
  return (
    <div
      className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#0B3C5D]/10 bg-white text-[#0B3C5D]/30"
      aria-hidden
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </div>
  );
}

function PlaceholderGlyph() {
  return (
    <div
      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#0B3C5D]/10 bg-white text-[#0B3C5D]/35"
      aria-hidden
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16v12H5.17L4 17.17V4zm0-2a2 2 0 0 0-2 2v15l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z" />
      </svg>
    </div>
  );
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
    playSoundOnPing: true,
  });

  const showMobileThread = Boolean(conversationId);

  return (
    <div
      className={`flex h-full min-h-0 flex-1 flex-col overflow-hidden md:max-h-[min(100dvh-11rem,720px)] md:min-h-[min(100dvh-11rem,720px)] md:flex-row md:rounded-xl md:border md:border-[#0B3C5D]/10 md:bg-white md:shadow-[0_2px_16px_rgba(11,60,93,0.05)] ${
        showMobileThread ? "max-md:min-h-0 max-md:flex-1" : ""
      }`}
    >
      <aside
        className={`flex min-h-0 w-full flex-col overflow-hidden border-[#0B3C5D]/10 md:max-w-[380px] md:shrink-0 md:border-r ${
          showMobileThread ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="border-b border-[#0B3C5D]/08 px-3 py-3.5 sm:px-4 sm:py-4">
          <h1 className="text-lg font-bold tracking-tight text-[#0B3C5D]">Mesajlar</h1>
          <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/48">
            Firmalarınızla güvenli mesajlaşma
          </p>
        </div>
        <ul className="max-h-[50vh] min-h-0 flex-1 overflow-y-auto md:max-h-none">
          {sortedList.length === 0 ? (
            <li className="px-4 py-12 text-center">
              <EmptyListGlyph />
              <p className="text-sm font-medium text-[#1A1A1A]/48">Henüz konuşma yok</p>
              <p className="mt-1.5 max-w-[18rem] mx-auto text-xs leading-relaxed text-[#1A1A1A]/38">
                Bir firma sayfasından <span className="font-medium text-[#0B3C5D]/70">Firma ile Mesajlaş</span> ile başlayın.
              </p>
            </li>
          ) : (
            sortedList.map((row) => {
              const active = row.conversation_id === conversationId;
              const unread = row.unread_for_user > 0;
              const preview = previewFromMessage(
                row.last_kind,
                row.last_body,
                row.has_attachment
              );
              return (
                <li key={row.conversation_id}>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/mesajlar?c=${row.conversation_id}`, { scroll: false })
                    }
                    className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0B3C5D]/28 sm:px-4 sm:py-3 ${
                      active
                        ? "border-l-[3px] border-l-[#0B3C5D] bg-[#F2F5F8]"
                        : unread
                          ? "border-l-[3px] border-l-transparent bg-[#FFFCF7]/90 hover:bg-[#FAF6EF]"
                          : "border-l-[3px] border-l-transparent hover:bg-[#F7F9FB]"
                    }`}
                  >
                    <MessagingAvatar
                      name={row.firm_name}
                      imageUrl={row.firm_logo_url}
                      size="sm"
                      className={unread && !active ? "ring-[#D9A441]/25" : ""}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={`truncate text-sm ${unread ? "font-semibold text-[#0B3C5D]" : "font-medium text-[#0B3C5D]/90"}`}
                        >
                          {row.firm_name}
                        </span>
                        <span className="shrink-0 text-[10px] tabular-nums leading-none text-[#1A1A1A]/36">
                          {formatListTime(row.last_message_at)}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-snug text-[#1A1A1A]/50">
                        {preview}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                      {unread ? (
                        <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#D9A441] px-1 text-[10px] font-bold tabular-nums text-[#1A1A1A]">
                          {row.unread_for_user > 9 ? "9+" : row.unread_for_user}
                        </span>
                      ) : null}
                      {row.has_attachment ? (
                        <span
                          className="rounded border border-[#0B3C5D]/12 bg-[#FAFBFC] px-1 py-px text-[8px] font-bold uppercase tracking-[0.08em] text-[#0B3C5D]/50"
                          aria-label="Ek dosya"
                        >
                          Ek
                        </span>
                      ) : null}
                    </div>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </aside>

      <section
        className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden ${showMobileThread ? "flex min-h-0" : "hidden md:flex"}`}
      >
        {conversationId ? (
          <ConversationThreadView
            conversationId={conversationId}
            currentUserId={userId}
            initialMessages={initialMessages}
            headerTitle={firmHeader?.name ?? "Firma"}
            headerSubtitle="Şirket temsilcisi"
            headerLogoUrl={firmHeader?.logo_url ?? null}
            onBackMobile={() => router.push("/mesajlar", { scroll: false })}
          />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center border-t border-[#0B3C5D]/08 bg-[#FAFBFC] px-5 py-14 text-center md:border-t-0 md:py-20">
            <PlaceholderGlyph />
            <p className="text-sm font-semibold text-[#0B3C5D]/80">Bir konuşma seçin</p>
            <p className="mt-1 max-w-68 text-xs leading-relaxed text-[#1A1A1A]/42">
              Soldaki listeden firmayı seçerek devam edin.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
