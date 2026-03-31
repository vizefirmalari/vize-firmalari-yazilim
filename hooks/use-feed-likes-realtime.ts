"use client";

import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function useFeedLikesRealtime({
  postIds,
  onCount,
}: {
  postIds: string[];
  onCount: (postId: string, count: number) => void;
}) {
  useEffect(() => {
    if (postIds.length === 0) return;
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    const idSet = new Set(postIds);
    const channel = supabase
      .channel("feed-likes")
      .on("postgres_changes", { event: "*", schema: "public", table: "post_likes" }, async (payload) => {
        const postId =
          String((payload.new as { post_id?: string } | null)?.post_id ?? "") ||
          String((payload.old as { post_id?: string } | null)?.post_id ?? "");
        if (!postId || !idSet.has(postId)) return;
        const { data } = await supabase.from("post_likes").select("id").eq("post_id", postId);
        onCount(postId, (data ?? []).length);
      })
      .subscribe();

    return () => {
      void channel.unsubscribe();
    };
  }, [postIds, onCount]);
}

