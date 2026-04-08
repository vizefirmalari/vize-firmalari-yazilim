"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { ConversationThreadView } from "@/components/messaging/conversation-thread-view";
import { MessagingAvatar } from "@/components/messaging/messaging-avatar";
import { DATE_TIME_OPTS_LIST_COMPACT, formatInstantInTurkey } from "@/lib/datetime/turkey-time";
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
    return formatInstantInTurkey(iso, DATE_TIME_OPTS_LIST_COMPACT);
  } catch {
    return "";
  }
}

function StatCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: number | string;
  variant?: "default" | "accent" | "muted";
}) {
  const shell =
    variant === "accent"
      ? "border border-[#0B3C5D]/10 border-l-[3px] border-l-[#D9A441]/85 bg-white"
      : variant === "muted"
        ? "border border-[#0B3C5D]/08 bg-[#FAFBFC]"
        : "border border-[#0B3C5D]/10 bg-white";

  return (
    <div className={`flex min-h-[4.5rem] flex-col justify-center rounded-xl px-3.5 py-3 ${shell}`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/38">
        {label}
      </div>
      <div className="mt-1.5 text-xl font-bold tabular-nums tracking-tight text-[#0B3C5D]">
        {value}
      </div>
    </div>
  );
}

function EmptyInboxIllustration() {
  return (
    <div
      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#0B3C5D]/10 bg-white text-[#0B3C5D]/35"
      aria-hidden
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
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
    playSoundOnPing: true,
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
      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3C5D]/35 ${
        filter === key
          ? "bg-[#0B3C5D] text-white"
          : "bg-[#F7F9FB] text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10 hover:bg-[#EEF1F4]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col gap-5 overflow-hidden lg:min-h-0">
      <div className="shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/55">
          Gelen mesajlar
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-[#0B3C5D]">Mesaj yönetimi</h1>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        <StatCard label="Okunmamış" value={initialStats.unreadTotal} variant="accent" />
        <StatCard label="Kullanıcı" value={initialStats.uniqueUserCount} variant="default" />
        <StatCard label="Bugün" value={initialStats.todayMessageCount} variant="muted" />
        <StatCard label="Açık konuşma" value={initialStats.openConversationCount} variant="default" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:min-h-0 lg:flex-row lg:items-stretch lg:rounded-xl lg:border lg:border-[#0B3C5D]/10 lg:bg-white lg:shadow-[0_2px_16px_rgba(11,60,93,0.05)]">
        <aside
          className={`flex min-h-0 w-full flex-col overflow-hidden border-[#0B3C5D]/10 lg:max-w-[400px] lg:shrink-0 lg:border-r ${
            showMobileThread ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="space-y-3 border-b border-[#0B3C5D]/08 px-3 py-3.5 sm:px-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="İsim, e-posta veya mesaj ara…"
              className="w-full rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] outline-none transition-shadow placeholder:text-[#1A1A1A]/38 focus:border-[#0B3C5D]/28 focus:ring-2 focus:ring-[#0B3C5D]/12 focus-visible:outline-none"
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
              <li className="px-4 py-12 text-center">
                <p className="text-sm font-medium text-[#1A1A1A]/48">Sonuç yok</p>
                <p className="mt-1 text-xs text-[#1A1A1A]/38">Farklı bir arama veya filtre deneyin.</p>
              </li>
            ) : (
              filtered.map((row) => {
                const active = row.conversation_id === conversationId;
                const unread = row.unread_for_firm > 0;
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
                        router.push(`/panel/${firmId}/mesajlar?c=${row.conversation_id}`, {
                          scroll: false,
                        })
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
                        name={name}
                        imageUrl={row.user_avatar_url}
                        size="sm"
                        className={unread && !active ? "ring-[#D9A441]/25" : ""}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span
                            className={`truncate text-sm ${unread ? "font-semibold text-[#0B3C5D]" : "font-medium text-[#0B3C5D]/90"}`}
                          >
                            {name}
                          </span>
                          <span className="shrink-0 text-[10px] tabular-nums leading-none text-[#1A1A1A]/36">
                            {formatListTime(row.last_message_at)}
                          </span>
                        </div>
                        {row.user_email ? (
                          <div className="mt-0.5 truncate text-[11px] leading-tight text-[#1A1A1A]/42">
                            {row.user_email}
                          </div>
                        ) : null}
                        <p className="mt-1 line-clamp-2 text-xs leading-snug text-[#1A1A1A]/50">
                          {preview}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                        {unread ? (
                          <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#D9A441] px-1 text-[10px] font-bold tabular-nums text-[#1A1A1A]">
                            {row.unread_for_firm > 9 ? "9+" : row.unread_for_firm}
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
          className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:min-h-0 ${showMobileThread ? "flex" : "hidden lg:flex"}`}
        >
          {conversationId && currentUserId ? (
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:min-h-0">
              <ConversationThreadView
                conversationId={conversationId}
                currentUserId={currentUserId}
                initialMessages={initialMessages}
                headerTitle={displayName}
                headerSubtitle="Kullanıcı"
                headerDetail={activeRow?.user_email ?? undefined}
                headerLogoUrl={activeRow?.user_avatar_url ?? null}
                onBackMobile={() => router.push(`/panel/${firmId}/mesajlar`, { scroll: false })}
                embedInSplitPanel
              />
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center border-t border-[#0B3C5D]/08 bg-[#FAFBFC] px-5 py-14 text-center lg:border-t-0 lg:py-20">
              <EmptyInboxIllustration />
              <p className="text-sm font-semibold text-[#0B3C5D]/80">Konuşma seçin</p>
              <p className="mt-1 max-w-68 text-xs leading-relaxed text-[#1A1A1A]/42">
                Soldan bir kullanıcı seçerek yanıt verin.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
