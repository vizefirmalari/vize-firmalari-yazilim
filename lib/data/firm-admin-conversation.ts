import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function ensureFirmAdminConversationId(firmId: string): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("ensure_firm_admin_conversation", {
    p_firm_id: firmId,
  });

  if (error || data == null) {
    return null;
  }
  return String(data);
}
