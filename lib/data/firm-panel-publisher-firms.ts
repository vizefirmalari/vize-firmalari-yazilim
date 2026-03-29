import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type FirmPanelPublisherFirm = {
  id: string;
  name: string;
  slug: string;
  status: string;
  corporateness_score: number;
  hype_score: number;
  /** Aktif panel üyesi sayısı */
  panelMemberCount: number;
  /** Bekleyen davet sayısı */
  pendingInviteCount: number;
  /** En az bir aktif üye var mı */
  isPanelLinked: boolean;
};

/**
 * Yalnızca yayınlanmış firmalar + panel bağlantı özeti (yönetim hub’ı için).
 */
export async function getPublishedFirmsForFirmPanelHub(): Promise<FirmPanelPublisherFirm[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data: firms, error } = await supabase
    .from("firms")
    .select("id, name, slug, status, corporateness_score, hype_score")
    .eq("status", "published")
    .order("name", { ascending: true });

  if (error || !firms?.length) {
    if (error) console.error("[getPublishedFirmsForFirmPanelHub]", error.message);
    return [];
  }

  const ids = firms.map((f) => f.id as string);

  const [{ data: members }, { data: invites }] = await Promise.all([
    supabase.from("firm_panel_members").select("firm_id").in("firm_id", ids).eq("status", "active"),
    supabase.from("firm_panel_invitations").select("firm_id").in("firm_id", ids).eq("status", "pending"),
  ]);

  const memberCount = new Map<string, number>();
  for (const row of members ?? []) {
    const id = row.firm_id as string;
    memberCount.set(id, (memberCount.get(id) ?? 0) + 1);
  }

  const inviteCount = new Map<string, number>();
  for (const row of invites ?? []) {
    const id = row.firm_id as string;
    inviteCount.set(id, (inviteCount.get(id) ?? 0) + 1);
  }

  return firms.map((f) => {
    const id = f.id as string;
    const pc = memberCount.get(id) ?? 0;
    const ic = inviteCount.get(id) ?? 0;
    return {
      id,
      name: f.name as string,
      slug: f.slug as string,
      status: f.status as string,
      corporateness_score: Number(f.corporateness_score ?? 0),
      hype_score: Number(f.hype_score ?? 0),
      panelMemberCount: pc,
      pendingInviteCount: ic,
      isPanelLinked: pc > 0,
    };
  });
}
