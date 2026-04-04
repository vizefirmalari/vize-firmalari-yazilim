"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { ConversationThreadView } from "@/components/messaging/conversation-thread-view";
import { firmInboxTopic } from "@/lib/realtime/channel-names";
import type { MessageWithAttachment } from "@/lib/messaging/types";
import { useInboxRealtime } from "@/hooks/use-inbox-realtime";

type Props = {
  firmId: string;
  conversationId: string;
  currentUserId: string;
  initialMessages: MessageWithAttachment[];
};

export function FirmAdminMessagesShell({ firmId, conversationId, currentUserId, initialMessages }: Props) {
  const router = useRouter();

  const onInboxPing = useCallback(() => {
    router.refresh();
  }, [router]);

  useInboxRealtime({
    topic: firmInboxTopic(firmId),
    enabled: Boolean(firmId),
    onInboxPing,
    playSoundOnPing: true,
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden lg:min-h-0">
      <div className="shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/55">
          Yönetici ile Mesajlaş
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-[#0B3C5D]">Platform yönetimi</h1>
        <p className="mt-1 max-w-2xl text-sm text-[#1A1A1A]/58">
          vizefirmalari.com yönetim ekibi ile tek kanal üzerinden yazışın; ek ve dosya paylaşımı desteklenir.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:min-h-[min(70dvh,640px)] lg:flex-row lg:rounded-xl lg:border lg:border-[#0B3C5D]/10 lg:bg-white lg:shadow-[0_2px_16px_rgba(11,60,93,0.05)]">
        <aside className="hidden w-[280px] shrink-0 flex-col border-[#0B3C5D]/10 lg:flex lg:border-r">
          <div className="border-b border-[#0B3C5D]/08 px-4 py-4">
            <p className="text-sm font-bold text-[#0B3C5D]">Yönetim</p>
            <p className="mt-0.5 text-xs text-[#1A1A1A]/50">Tüm talepleriniz bu konuşmada</p>
          </div>
          <div className="flex flex-1 items-start px-4 py-3">
            <div className="w-full rounded-xl border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-2.5">
              <p className="text-xs font-semibold text-[#0B3C5D]">Aktif kanal</p>
              <p className="mt-1 text-[11px] leading-snug text-[#1A1A1A]/55">
                Ödeme, hizmet ve panel konularında mesaj bırakabilirsiniz.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {currentUserId ? (
            <ConversationThreadView
              conversationId={conversationId}
              currentUserId={currentUserId}
              initialMessages={initialMessages}
              headerTitle="Platform yönetimi"
              headerSubtitle="vizefirmalari.com"
              embedInSplitPanel
            />
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-sm text-[#1A1A1A]/55">
              Oturum gerekli.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
