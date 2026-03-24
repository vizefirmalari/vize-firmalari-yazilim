import type { SupabaseClient } from "@supabase/supabase-js";

export async function logAdminActivity(
  supabase: SupabaseClient,
  actorId: string,
  action: string,
  entityType: string,
  entityId: string | null,
  meta?: Record<string, unknown> | null
) {
  await supabase.from("admin_activity_log").insert({
    actor_id: actorId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    meta: meta === undefined ? null : meta,
  });
}
