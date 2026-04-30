"use client";

import { useEffect, useRef } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

import { firmVisaCasesTopic } from "@/lib/realtime/channel-names";
import {
  getSupabaseBrowserClientForRealtime,
  subscribeRealtimeChannel,
} from "@/lib/supabase/realtime";

type Options = {
  firmId: string | null;
  enabled?: boolean;
  onVisaCaseEvent: () => void;
};

/**
 * Firma paneli visa operasyonları — `firm-visa-cases:{firmId}` Broadcast `visa_case`.
 */
export function useVisaOperationsRealtime({ firmId, enabled = true, onVisaCaseEvent }: Options) {
  const pingRef = useRef(onVisaCaseEvent);
  pingRef.current = onVisaCaseEvent;

  useEffect(() => {
    if (!enabled || !firmId) return;

    const supabase: SupabaseClient | null = getSupabaseBrowserClientForRealtime();
    if (!supabase) return;

    const topic = firmVisaCasesTopic(firmId);
    const channel = supabase.channel(topic, {
      config: { private: true },
    });

    channel.on("broadcast", { event: "visa_case" }, () => {
      pingRef.current();
    });

    const unsub = subscribeRealtimeChannel(channel, () => {});
    return () => {
      unsub();
    };
  }, [firmId, enabled]);
}
