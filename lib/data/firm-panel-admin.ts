import { createSupabaseServerClient } from "@/lib/supabase/server";

export type FirmPanelMemberRow = {
  id: string;
  user_id: string;
  role: string;
  status: string;
  created_at: string;
  email: string | null;
};

export type FirmPanelInvitationRow = {
  id: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
};

/**
 * Admin firma paneli ekranı: üyeler (e-posta RPC ile) ve davetler.
 */
export async function getFirmPanelAccessLists(firmId: string): Promise<{
  members: FirmPanelMemberRow[];
  invitations: FirmPanelInvitationRow[];
}> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { members: [], invitations: [] };

  const { data: memberRows, error: mErr } = await supabase.rpc(
    "admin_list_firm_panel_members",
    { p_firm_id: firmId }
  );

  if (mErr) {
    console.error("[getFirmPanelAccessLists] members rpc", mErr.message);
  }

  const { data: invitations, error: iErr } = await supabase
    .from("firm_panel_invitations")
    .select("id, email, role, status, created_at")
    .eq("firm_id", firmId)
    .order("created_at", { ascending: false });

  if (iErr) {
    console.error("[getFirmPanelAccessLists] invitations", iErr.message);
  }

  const members: FirmPanelMemberRow[] = (memberRows ?? []).map(
    (r: Record<string, unknown>) => ({
      id: String(r.id),
      user_id: String(r.user_id),
      role: String(r.role),
      status: String(r.status),
      created_at: String(r.created_at),
      email: r.email != null ? String(r.email) : null,
    })
  );

  return {
    members,
    invitations: (invitations ?? []) as FirmPanelInvitationRow[],
  };
}
