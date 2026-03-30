"use client";

import { useEffect, useRef, useState } from "react";

import { getConversationPeerReadState } from "@/lib/actions/conversation-read-state";
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
  const [peerLastReadMessageId, setPeerLastReadMessageId] = useState<string | null>(null);
  const { messages, setMessages, remoteTypingUserId, peerOnline, emitTyping } = useConversationRealtime({
    conversationId,
    userId: currentUserId,
    initialMessages,
  });

  useEffect(() => {
    void markConversationRead(conversationId);
  }, [conversationId]);

  useEffect(() => {
    let alive = true;
    const syncReadState = async () => {
      const res = await getConversationPeerReadState(conversationId);
      if (!alive || !res.ok) return;
      setPeerLastReadMessageId(res.peerLastReadMessageId);
    };
    void syncReadState();
    const timer = setInterval(() => {
      void syncReadState();
    }, 6500);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [conversationId]);

  useEffect(() => {
    let alive = true;
    const syncReadState = async () => {
      const res = await getConversationPeerReadState(conversationId);
      if (!alive || !res.ok) return;
      setPeerLastReadMessageId(res.peerLastReadMessageId);
    };
    void syncReadState();
    return () => {
      alive = false;
    };
  }, [conversationId, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const statusText = peerOnline ? "Çevrimiçi" : "Pasif";
  const typingText = remoteTypingUserId ? "Yazıyor…" : null;
  const handleLocalSoftDelete = (messageId: string, deletedAt: string, deletedBy: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? {
              ...m,
              body: "Bu mesaj silindi",
              deleted_at: deletedAt,
              deleted_by: deletedBy,
            }
          : m
      )
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#0B3C5D]/10 bg-[#F8F9FA] max-md:rounded-none max-md:border-0 max-md:bg-[#F0F2F4]">
      <ConversationThreadHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        detailLine={headerDetail}
        logoUrl={headerLogoUrl}
        statusText={statusText}
        typingText={typingText}
        onBack={onBackMobile}
      />
      <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain">
        <MessagingThreadBody
          messages={messages}
          currentUserId={currentUserId}
          peerLastReadMessageId={peerLastReadMessageId}
          onSoftDeleteMessage={handleLocalSoftDelete}
        />
        <div ref={bottomRef} className="h-0.5 shrink-0 sm:h-2" aria-hidden />
      </div>
      <div className="shrink-0 border-t border-[#0B3C5D]/08 bg-white px-2.5 py-2 shadow-[0_-6px_24px_rgba(11,60,93,0.06)] sm:px-4 sm:py-3 sm:shadow-none md:shadow-none">
        <Composer conversationId={conversationId} onTyping={emitTyping} />
      </div>
    </div>
  );
}
