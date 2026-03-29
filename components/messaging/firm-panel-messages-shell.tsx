"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { ConversationThreadView } from "@/components/messaging/conversation-thread-view";
import { MessagingAvatar } from "@/components/messaging/messaging-avatar";
import { firmInboxTopic } from "@/lib/realtime/channel-names";
import { previewFromMessage, resolveUserDisplayName } from "@/lib/messaging/identity";
import type { FirmInboxRow, FirmMessageStats } from "@/lib/messaging/inbox-types";
import type { MessageWithAttachment } from "@/lib/messaging/types";
import { useInboxRealtime } from "@/hooks/use-inbox-realtime";

type FilterKey = "all" | "unread" | "await" | "attach";

type Props = {
  firmId: string;
  currentUserId: string;
  initialList: FirmInboxRow[];
  initialStats: FirmMessageStats;
  conversationId: string | null;
  initialMessages: MessageWithAttachment[];
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

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-[#0B3C5D]/10 bg-white px-3 py-2.5 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
        {label}
      </div>
      <div className="mt-1 text-lg font-bold tabular-nums text-[#0B3C5D]">{value}</div>
    </div>
  );
}

export function FirmPanelMessagesShell({
  firmId,
  currentUserId,
  initialList,
  initialStats,
  conversationId,
  initialMessages,
}: Props) {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const onInboxPing = useCallback(() => {
    router.refresh();
  }, [router]);

  useInboxRealtime({
    topic: firmInboxTopic(firmId),
    enabled: Boolean(firmId),
    onInboxPing,
  });

  const filtered = useMemo(() => {
    let rows = initialList;
    if (filter === "unread") {
      rows = rows.filter((r) => r.unread_for_firm > 0);
    } else if (filter === "await") {
      rows = rows.filter(
        (r) =>
          r.last_sender_id &&
          r.primary_end_user_id &&
          r.last_sender_id === r.primary_end_user_id
      );
    } else if (filter === "attach") {
      rows = rows.filter((r) => r.has_attachment);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter((r) => {
        const name = (r.user_display_name ?? "").toLowerCase();
        const mail = (r.user_email ?? "").toLowerCase();
        const prev = (r.last_body ?? "").toLowerCase();
        return name.includes(q) || mail.includes(q) || prev.includes(q);
      });
    }
    return [...rows].sort((a, b) => {
      if (a.unread_for_firm !== b.unread_for_firm) {
        return b.unread_for_firm - a.unread_for_firm;
      }
      const ta = a.last_message_at ? new Date(a.last_message_at).getTime() : 0;
      const tb = b.last_message_at ? new Date(b.last_message_at).getTime() : 0;
      return tb - ta;
    });
  }, [initialList, filter, query]);

  const activeRow = useMemo(
    () => initialList.find((r) => r.conversation_id === conversationId) ?? null,
    [initialList, conversationId]
  );

  const showMobileThread = Boolean(conversationId);

  const displayName = activeRow
    ? resolveUserDisplayName(activeRow.user_display_name, activeRow.user_email)
    : "Konuşma";

  const filterBtn = (key: FilterKey, label: string) => (
    <button
      key={key}
      type="button"
      onClick={() => setFilter(key)}
      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/35 ${
        filter === key
          ? "bg-[#0B3C5D] text-white"
          : "bg-[#F7F9FB] text-[#0B3C5D] ring-1 ring-[#0B3C5D]/12 hover:bg-[#EEF1F4]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Gelen mesajlar
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">Mesaj yönetimi</h1>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatCard label="Okunmamış" value={initialStats.unreadTotal} />
        <StatCard label="Kullanıcı" value={initialStats.uniqueUserCount} />
        <StatCard label="Bugün" value={initialStats.todayMessageCount} />
        <StatCard label="Açık konuşma" value={initialStats.openConversationCount} />
      </div>

      <div className="flex min-h-[min(100dvh-16rem,760px)] flex-col lg:flex-row lg:rounded-xl lg:border lg:border-[#0B3C5D]/10 lg:bg-white lg:shadow-[0_4px_24px_rgba(11,60,93,0.06)]">
        <aside
          className={`flex w-full flex-col border-[#0B3C5D]/10 lg:max-w-[400px] lg:border-r ${
            showMobileThread ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="space-y-3 border-b border-[#0B3C5D]/10 p-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="İsim, e-posta veya mesaj ara…"
              className="w-full rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none ring-[#0B3C5D]/15 placeholder:text-[#1A1A1A]/40 focus:border-[#0B3C5D]/35 focus:ring-2"
            />
            <div className="flex flex-wrap gap-2">
              {filterBtn("all", "Tümü")}
              {filterBtn("unread", "Okunmamış")}
              {filterBtn("await", "Yanıt bekleyen")}
              {filterBtn("attach", "Ek dosyalı")}
            </div>
          </div>

          <ul className="max-h-[48vh] min-h-0 flex-1 overflow-y-auto lg:max-h-none">
            {filtered.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-[#1A1A1A]/45">
                Sonuç yok
              </li>
            ) : (
              filtered.map((row) => {
                const active = row.conversation_id === conversationId;
                const name = resolveUserDisplayName(row.user_display_name, row.user_email);
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
                        router.push(`/panel/${firmId}/mesajlar?c=${row.conversation_id}`)
                      }
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-[#F7F9FB] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0B3C5D]/30 ${
                        active ? "bg-[#F0F4F8] ring-1 ring-inset ring-[#0B3C5D]/10" : ""
                      }`}
                    >
                      <MessagingAvatar
                        name={name}
                        imageUrl={row.user_avatar_url}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="truncate text-sm font-semibold text-[#0B3C5D]">
                            {name}
                          </span>
                          <span className="shrink-0 text-[10px] tabular-nums text-[#1A1A1A]/40">
                            {formatListTime(row.last_message_at)}
                          </span>
                        </div>
                        {row.user_email ? (
                          <div className="truncate text-[11px] text-[#1A1A1A]/45">
                            {row.user_email}
                          </div>
                        ) : null}
                        <p className="mt-0.5 line-clamp-2 text-xs text-[#1A1A1A]/55">
                          {preview}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        {row.unread_for_firm > 0 ? (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D9A441] px-1.5 text-[10px] font-bold text-[#1A1A1A]">
                            {row.unread_for_firm > 9 ? "9+" : row.unread_for_firm}
                          </span>
                        ) : null}
                        {row.has_attachment ? (
                          <span className="text-[10px] text-[#1A1A1A]/35" aria-hidden>
                            📎
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
          className={`flex min-h-0 min-w-0 flex-1 flex-col ${showMobileThread ? "flex" : "hidden lg:flex"}`}
        >
          {conversationId && currentUserId ? (
            <ConversationThreadView
              conversationId={conversationId}
              currentUserId={currentUserId}
              initialMessages={initialMessages}
              headerTitle={displayName}
              headerSubtitle="Kullanıcı"
              headerDetail={activeRow?.user_email ?? undefined}
              headerLogoUrl={activeRow?.user_avatar_url ?? null}
              onBackMobile={() => router.push(`/panel/${firmId}/mesajlar`)}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center border-t border-[#0B3C5D]/10 bg-[#FAFBFC] px-6 py-16 text-center lg:border-t-0">
              <p className="text-sm font-medium text-[#1A1A1A]/50">
                Görüntülenecek konuşmayı seçin
              </p>
              <p className="mt-1 max-w-sm text-xs text-[#1A1A1A]/40">
                Soldan bir kullanıcı seçerek mesajlara yanıt verebilir veya ek dosyaları
                görüntüleyebilirsiniz.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
