"use client";

import { useEffect, useRef } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

import {
  getSupabaseBrowserClientForRealtime,
  subscribeRealtimeChannel,
} from "@/lib/supabase/realtime";

type Options = {
  topic: string | null;
  enabled: boolean;
  onInboxPing: () => void;
};

/**
 * Konuşma listesi yenilemesi — DB tetikleyicisi `firm-inbox:` / `user-inbox:` üzerinden `inbox` event.
 */
export function useInboxRealtime({ topic, enabled, onInboxPing }: Options) {
  const pingRef = useRef(onInboxPing);
  pingRef.current = onInboxPing;

  useEffect(() => {
    if (!enabled || !topic) {
      return;
    }

    const supabase: SupabaseClient | null = getSupabaseBrowserClientForRealtime();
    if (!supabase) {
      return;
    }

    const channel = supabase.channel(topic, {
      config: { private: true },
    });

    channel.on("broadcast", { event: "inbox" }, () => {
      pingRef.current();
    });

    const unsub = subscribeRealtimeChannel(channel, () => {});

    return () => {
      unsub();
    };
  }, [topic, enabled]);
}
