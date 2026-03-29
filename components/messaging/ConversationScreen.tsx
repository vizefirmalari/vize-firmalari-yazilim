"use client";

import { useConversationRealtime } from "@/hooks/use-conversation-realtime";
import type { MessageRow } from "@/lib/messaging/types";

import { Composer } from "./Composer";
import { MessageThread } from "./MessageThread";

type Props = {
  firmId: string;
  conversationId: string | null;
  initialMessages: MessageRow[];
  currentUserId: string | null;
};

/**
 * Firma paneli sohbet gövdesi: SSR ilk mesajlar + Realtime delta.
 * conversationId yoksa yer tutucu (konuşma oluşturma akışı ayrı RPC ile eklenebilir).
 */
export function ConversationScreen({
  firmId,
  conversationId,
  initialMessages,
  currentUserId,
}: Props) {
  const { messages } = useConversationRealtime({
    conversationId,
    initialMessages,
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
          Gelen mesajlar
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#0B3C5D]">Mesaj kutusu</h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Firma: <span className="font-medium text-[#1A1A1A]">{firmId}</span>
          {conversationId ? (
            <>
              {" "}
              · Konuşma <span className="font-mono text-xs">{conversationId}</span>
            </>
          ) : (
            <> · Henüz seçili konuşma yok — URL&apos;ye <code className="rounded bg-[#1A1A1A]/5 px-1">?c=konuşma-uuid</code> ekleyin.</>
          )}
        </p>
      </div>

      <MessageThread messages={messages} currentUserId={currentUserId} />
      <Composer conversationId={conversationId} disabled={!conversationId} />
    </div>
  );
}
