"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";

import type { MessageBroadcastPayload, MessageWithAttachment } from "@/lib/messaging/types";
import { playNotificationSound } from "@/lib/messaging/notification-sound";
import { conversationTopic } from "@/lib/realtime/channel-names";
import {
  getSupabaseBrowserClientForRealtime,
  type RealtimeSubscribeStatus,
} from "@/lib/supabase/realtime";

type Options = {
  conversationId: string | null;
  /** Presence / typing için */
  userId: string | null;
  initialMessages: MessageWithAttachment[];
  onChannelStatus?: (status: RealtimeSubscribeStatus) => void;
};

function normalizeAttachment(
  raw: unknown
): MessageWithAttachment["attachment"] {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = o.id != null ? String(o.id) : "";
  const file_name = o.file_name != null ? String(o.file_name) : "";
  const mime_type = o.mime_type != null ? String(o.mime_type) : "";
  const storage_path = o.storage_path != null ? String(o.storage_path) : "";
  const byte_size = Number(o.byte_size);
  if (!id || !file_name || !storage_path || !Number.isFinite(byte_size)) {
    return null;
  }
  return {
    id,
    file_name,
    mime_type,
    byte_size,
    storage_path,
  };
}

function payloadToRow(p: MessageBroadcastPayload): MessageWithAttachment {
  const att = normalizeAttachment(p.attachment);
  const kind = (p.kind as MessageWithAttachment["kind"]) ?? "text";
  return {
    id: p.id,
    conversation_id: p.conversation_id,
    sender_id: p.sender_id,
    kind,
    body: p.preview?.trim() ? p.preview : null,
    created_at:
      typeof p.created_at === "string"
        ? p.created_at
        : new Date(p.created_at as unknown as string).toISOString(),
    attachment: kind === "attachment" ? att : null,
    deleted_at: p.deleted_at ?? null,
    deleted_by: p.deleted_by ?? null,
  };
}

/**
 * Private kanal: mesaj broadcast, typing broadcast, presence senkronu.
 */
export function useConversationRealtime({
  conversationId,
  userId,
  initialMessages,
  onChannelStatus,
}: Options) {
  const [messages, setMessages] = useState<MessageWithAttachment[]>(initialMessages);
  const [remoteTypingUserId, setRemoteTypingUserId] = useState<string | null>(null);
  const [peerOnline, setPeerOnline] = useState(false);
  const typingClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const statusCb = useRef(onChannelStatus);

  useEffect(() => {
    statusCb.current = onChannelStatus;
  }, [onChannelStatus]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const emitTyping = useCallback(() => {
    const ch = channelRef.current;
    if (!ch || !userId) return;
    void ch.send({
      type: "broadcast",
      event: "typing",
      payload: { userId, ts: Date.now() },
    });
  }, [userId]);

  useEffect(() => {
    if (!conversationId || !userId) {
      channelRef.current = null;
      return;
    }

    const supabase: SupabaseClient | null = getSupabaseBrowserClientForRealtime();
    if (!supabase) {
      return;
    }

    const topic = conversationTopic(conversationId);
    const channel = supabase.channel(topic, {
      config: {
        private: true,
        ...(userId ? { presence: { key: userId } } : {}),
      },
    });
    channelRef.current = channel;

    channel.on("broadcast", { event: "message" }, ({ payload }) => {
      const p = payload as MessageBroadcastPayload | undefined;
      if (!p?.id || !p.conversation_id) {
        return;
      }
      const isIncoming = p.sender_id && p.sender_id !== userId;
      const isTabHidden = typeof document !== "undefined" ? document.hidden : false;
      if (isIncoming && isTabHidden) {
        playNotificationSound({ minIntervalMs: 2200 });
      }
      if (isIncoming) {
        setRemoteTypingUserId(null);
      }
      setMessages((prev) => {
        const nextRow = payloadToRow(p);
        const idx = prev.findIndex((m) => m.id === p.id);
        if (idx >= 0) {
          const current = prev[idx];
          const merged: MessageWithAttachment = {
            ...current,
            ...nextRow,
            attachment: nextRow.attachment ?? current.attachment ?? null,
          };
          const cloned = [...prev];
          cloned[idx] = merged;
          return cloned;
        }
        return [...prev, nextRow];
      });
    });

    channel.on("broadcast", { event: "typing" }, ({ payload }) => {
      const p = payload as { userId?: string } | undefined;
      if (!p?.userId || p.userId === userId) {
        return;
      }
      if (typingClearRef.current) {
        clearTimeout(typingClearRef.current);
      }
      setRemoteTypingUserId(p.userId);
      typingClearRef.current = setTimeout(() => {
        setRemoteTypingUserId((cur) => (cur === p.userId ? null : cur));
      }, 2800);
    });

    if (userId) {
      channel.on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const others = Object.keys(state).filter((k) => k !== userId);
        setPeerOnline(others.length > 0);
      });
    }

    channel.subscribe(async (status) => {
      statusCb.current?.(status as RealtimeSubscribeStatus);
      if (status === "SUBSCRIBED" && userId) {
        try {
          await channel.track({ user_id: userId, at: new Date().toISOString() });
        } catch {
          setPeerOnline(false);
        }
      }
    });

    return () => {
      if (typingClearRef.current) {
        clearTimeout(typingClearRef.current);
      }
      channelRef.current = null;
      void channel.unsubscribe();
    };
  }, [conversationId, userId]);

  return {
    messages,
    setMessages,
    remoteTypingUserId,
    peerOnline,
    emitTyping,
  };
}
