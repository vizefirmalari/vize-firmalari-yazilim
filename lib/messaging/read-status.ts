import type { MessageWithAttachment } from "@/lib/messaging/types";

export function buildMessageOrderIndex(messages: MessageWithAttachment[]): Map<string, number> {
  return new Map(messages.map((m, idx) => [m.id, idx]));
}

export function isMessageReadByPeer(params: {
  messageId: string;
  peerLastReadMessageId: string | null;
  orderIndex: Map<string, number>;
}): boolean {
  const { messageId, peerLastReadMessageId, orderIndex } = params;
  if (!peerLastReadMessageId) return false;
  const current = orderIndex.get(messageId);
  const peerReadIdx = orderIndex.get(peerLastReadMessageId);
  if (typeof current !== "number" || typeof peerReadIdx !== "number") return false;
  return current <= peerReadIdx;
}
