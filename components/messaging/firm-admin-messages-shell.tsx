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
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:max-h-[min(78dvh,820px)]">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:min-h-[min(64dvh,600px)] lg:flex-row lg:rounded-xl lg:border lg:border-[#0B3C5D]/10 lg:bg-white lg:shadow-[0_2px_16px_rgba(11,60,93,0.05)]">
        <aside className="hidden w-[260px] shrink-0 flex-col border-[#0B3C5D]/10 lg:flex lg:border-r">
          <div className="border-b border-[#0B3C5D]/08 px-3 py-3">
            <p className="text-xs font-bold text-[#0B3C5D]">Platform</p>
            <p className="mt-0.5 text-[11px] leading-snug text-[#1A1A1A]/50">Tek kanal — tüm talepler burada.</p>
          </div>
          <div className="flex flex-1 items-start px-3 py-2">
            <p className="text-[11px] leading-relaxed text-[#1A1A1A]/52">
              Ödeme, İşini Büyüt ve panel konularında yazabilirsiniz.
            </p>
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
              firmAdminLayout
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
