"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { ConversationThreadView } from "@/components/messaging/conversation-thread-view";
import type { AdminFirmAdminConversationRow } from "@/lib/data/admin-firm-admin-conversations";
import type { MessageWithAttachment } from "@/lib/messaging/types";

type Props = {
  initialList: AdminFirmAdminConversationRow[];
  conversationId: string | null;
  currentUserId: string;
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

export function AdminFirmAdminInboxShell({
  initialList,
  conversationId,
  currentUserId,
  initialMessages,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initialList;
    return initialList.filter((r) => r.firm_name.toLowerCase().includes(q));
  }, [initialList, query]);

  const activeRow = useMemo(
    () => initialList.find((r) => r.conversation_id === conversationId) ?? null,
    [initialList, conversationId]
  );

  const showMobileThread = Boolean(conversationId);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden lg:min-h-0">
      <div className="shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/55">
          Firma — yönetim sohbeti
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-[#0B3C5D]">Yönetici mesajları</h1>
        <p className="mt-1 max-w-2xl text-sm text-[#1A1A1A]/58">
          Her firma ile tek kanal (<span className="font-medium">firm_admin</span>). Soldan firma seçin; ek
          yüklemesi mevcut sohbet altyapısı ile çalışır.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:min-h-[min(72dvh,680px)] lg:flex-row lg:rounded-xl lg:border lg:border-[#0B3C5D]/10 lg:bg-white lg:shadow-[0_2px_16px_rgba(11,60,93,0.05)]">
        <aside
          className={`flex min-h-0 w-full flex-col overflow-hidden border-[#0B3C5D]/10 lg:max-w-[380px] lg:shrink-0 lg:border-r ${
            showMobileThread ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="space-y-2 border-b border-[#0B3C5D]/08 px-3 py-3.5 sm:px-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Firma ara…"
              className="w-full rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] outline-none transition-shadow placeholder:text-[#1A1A1A]/38 focus:border-[#0B3C5D]/28 focus:ring-2 focus:ring-[#0B3C5D]/12"
            />
          </div>
          <ul className="max-h-[48vh] min-h-0 flex-1 overflow-y-auto lg:max-h-none">
            {filtered.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-[#1A1A1A]/48">
                Henüz kanal yok veya eşleşme yok. Firma panelinden &quot;Yönetici ile Mesajlaş&quot; açıldığında
                kayıt oluşur.
              </li>
            ) : (
              filtered.map((row) => {
                const active = row.conversation_id === conversationId;
                return (
                  <li key={row.conversation_id}>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/admin/firm-admin-messages?c=${row.conversation_id}`, { scroll: false })
                      }
                      className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors sm:px-4 sm:py-3 ${
                        active
                          ? "border-l-[3px] border-l-[#0B3C5D] bg-[#F2F5F8]"
                          : "border-l-[3px] border-l-transparent hover:bg-[#F7F9FB]"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="truncate text-sm font-semibold text-[#0B3C5D]">{row.firm_name}</span>
                          <span className="shrink-0 text-[10px] tabular-nums text-[#1A1A1A]/36">
                            {formatListTime(row.last_message_at)}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] text-[#1A1A1A]/42">Firma — yönetim</p>
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
                headerTitle={activeRow?.firm_name ?? "Firma"}
                headerSubtitle="Yönetim kanalı"
                onBackMobile={() => router.push("/admin/firm-admin-messages", { scroll: false })}
                embedInSplitPanel
              />
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center border-t border-[#0B3C5D]/08 bg-[#FAFBFC] px-5 py-14 text-center lg:border-t-0">
              <p className="text-sm font-semibold text-[#0B3C5D]/80">Konuşma seçin</p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-[#1A1A1A]/42">
                Soldan bir firma seçerek mesaj gönderin.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
