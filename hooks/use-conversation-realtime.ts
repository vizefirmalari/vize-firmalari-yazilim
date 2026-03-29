"use client";

import { useEffect, useRef, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { MessageBroadcastPayload, MessageRow } from "@/lib/messaging/types";
import { conversationTopic } from "@/lib/realtime/channel-names";
import {
  getSupabaseBrowserClientForRealtime,
  subscribeRealtimeChannel,
  type RealtimeSubscribeStatus,
} from "@/lib/supabase/realtime";

type Options = {
  conversationId: string | null;
  initialMessages: MessageRow[];
  onChannelStatus?: (status: RealtimeSubscribeStatus) => void;
};

/**
 * Private Broadcast kanalı: DB tetikleyicisi `event: message` ile uyumludur.
 * İlk liste SSR’dan; delta bu hook ile eklenir.
 */
export function useConversationRealtime({
  conversationId,
  initialMessages,
  onChannelStatus,
}: Options) {
  const [messages, setMessages] = useState<MessageRow[]>(initialMessages);
  const statusCb = useRef(onChannelStatus);
  statusCb.current = onChannelStatus;

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (!conversationId) {
      return;
    }

    const supabase: SupabaseClient | null = getSupabaseBrowserClientForRealtime();
    if (!supabase) {
      return;
    }

    const topic = conversationTopic(conversationId);
    const channel = supabase.channel(topic, {
      config: { private: true },
    });

    channel.on("broadcast", { event: "message" }, ({ payload }) => {
      const p = payload as MessageBroadcastPayload | undefined;
      if (!p?.id || !p.conversation_id) {
        return;
      }
      setMessages((prev) => {
        if (prev.some((m) => m.id === p.id)) {
          return prev;
        }
        const row: MessageRow = {
          id: p.id,
          conversation_id: p.conversation_id,
          sender_id: p.sender_id,
          kind: (p.kind as MessageRow["kind"]) ?? "text",
          body: p.preview ?? null,
          created_at:
            typeof p.created_at === "string"
              ? p.created_at
              : new Date(p.created_at as unknown as string).toISOString(),
        };
        return [...prev, row];
      });
    });

    const unsubscribe = subscribeRealtimeChannel(channel, (status) => {
      statusCb.current?.(status);
    });

    return () => {
      unsubscribe();
    };
  }, [conversationId]);

  return { messages, setMessages };
}
