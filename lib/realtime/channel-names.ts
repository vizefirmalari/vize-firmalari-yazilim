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

export function userInboxTopic(userId: string): string {
  return `user-inbox:${userId}`;
}

export function firmInboxTopic(firmId: string): string {
  return `firm-inbox:${firmId}`;
}
