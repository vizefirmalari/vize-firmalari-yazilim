/**
 * Realtime Broadcast topic adları — DB tetikleyicisi (realtime.send) ve istemci
 * abonelikleri aynı string’i kullanmalıdır.
 *
 * Örnek: `conversation:${uuid}`, `notifications:${userUuid}`
 */
export function conversationTopic(conversationId: string): string {
  return `conversation:${conversationId}`;
}

export function notificationTopic(userId: string): string {
  return `notifications:${userId}`;
}
