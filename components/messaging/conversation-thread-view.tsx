"use client";

import { useEffect, useRef } from "react";

import { markConversationRead } from "@/lib/actions/mark-conversation-read";
import { ConversationThreadHeader } from "@/components/messaging/conversation-thread-header";
import { Composer } from "@/components/messaging/Composer";
import { MessagingThreadBody } from "@/components/messaging/messaging-thread-body";
import { useConversationRealtime } from "@/hooks/use-conversation-realtime";
import type { MessageWithAttachment } from "@/lib/messaging/types";

type Props = {
  conversationId: string;
  currentUserId: string;
  initialMessages: MessageWithAttachment[];
  headerTitle: string;
  headerSubtitle?: string;
  headerDetail?: string;
  headerLogoUrl?: string | null;
  onBackMobile?: () => void;
};

/**
 * Aktif thread: header + mesaj gövdesi + composer; okundu ve realtime bu bileşende.
 */
export function ConversationThreadView({
  conversationId,
  currentUserId,
  initialMessages,
  headerTitle,
  headerSubtitle,
  headerDetail,
  headerLogoUrl,
  onBackMobile,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { messages, remoteTypingUserId, peerOnline, emitTyping } = useConversationRealtime({
    conversationId,
    userId: currentUserId,
    initialMessages,
  });

  useEffect(() => {
    void markConversationRead(conversationId);
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const statusText = peerOnline ? "Çevrimiçi" : "Pasif";
  const typingText = remoteTypingUserId ? "Yazıyor…" : null;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-[#0B3C5D]/10 bg-[#FAFBFC] shadow-[0_4px_24px_rgba(11,60,93,0.06)]">
      <ConversationThreadHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        detailLine={headerDetail}
        logoUrl={headerLogoUrl}
        statusText={statusText}
        typingText={typingText}
        onBack={onBackMobile}
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <MessagingThreadBody messages={messages} currentUserId={currentUserId} />
        <div ref={bottomRef} className="h-2 shrink-0" aria-hidden />
      </div>
      <div className="border-t border-[#0B3C5D]/10 bg-white p-3 sm:p-4">
        <Composer
          conversationId={conversationId}
          onTyping={emitTyping}
        />
      </div>
    </div>
  );
}
