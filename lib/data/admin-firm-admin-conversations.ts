import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminFirmAdminConversationRow = {
  conversation_id: string;
  firm_id: string;
  firm_name: string;
  last_message_at: string | null;
};

function firmNameFromJoin(
  firms: { name: string } | { name: string }[] | null | undefined
): string {
  if (!firms) return "Firma";
  const f = Array.isArray(firms) ? firms[0] : firms;
  return f?.name?.trim() || "Firma";
}

export async function loadAdminFirmAdminConversationList(): Promise<AdminFirmAdminConversationRow[]> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("conversations")
    .select("id, firm_id, last_message_at, firms(name)")
    .eq("kind", "firm_admin")
    .order("last_message_at", { ascending: false, nullsFirst: false });

  if (error || !data) return [];

  return data.map((row: Record<string, unknown>) => ({
    conversation_id: String(row.id),
    firm_id: String(row.firm_id),
    firm_name: firmNameFromJoin(row.firms as { name: string } | { name: string }[] | null),
    last_message_at: row.last_message_at ? String(row.last_message_at) : null,
  }));
}
