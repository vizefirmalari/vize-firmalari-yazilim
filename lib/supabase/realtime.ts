import type { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

/**
 * Tarayıcıda tek Supabase istemcisi; Realtime kanalları bu istemci üzerinden açılır.
 */
let browserSingleton: SupabaseClient | null = null;

export function getSupabaseBrowserClientForRealtime(): SupabaseClient | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (!browserSingleton) {
    browserSingleton = createSupabaseBrowserClient();
  }
  return browserSingleton;
}

export type RealtimeSubscribeStatus = "SUBSCRIBED" | "TIMED_OUT" | "CLOSED" | "CHANNEL_ERROR";

/**
 * Tek seferlik subscribe. Kopma sonrası yeniden bağlanma için üst katmanda
 * yeni RealtimeChannel oluşturup bu fonksiyonu tekrar çağırın (çift subscribe biriktirmez).
 */
export function subscribeRealtimeChannel(
  channel: RealtimeChannel,
  onStatus: (status: RealtimeSubscribeStatus) => void
): () => void {
  channel.subscribe((status) => {
    onStatus(status as RealtimeSubscribeStatus);
  });
  return () => {
    void channel.unsubscribe();
  };
}
