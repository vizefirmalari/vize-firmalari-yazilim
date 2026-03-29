import { createSupabaseServerClient } from "@/lib/supabase/server";

export type FirmPanelAnnouncement = {
  id: string;
  title: string;
  body: string;
  published_at: string;
  sort_order: number;
};

/**
 * Aktif firma paneli kullanıcıları için yayınlanmış duyurular (RLS).
 */
export async function getFirmPanelAnnouncementsForUser(): Promise<FirmPanelAnnouncement[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("firm_panel_announcements")
    .select("id, title, body, published_at, sort_order, expires_at")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[getFirmPanelAnnouncementsForUser]", error.message);
    return [];
  }

  const now = Date.now();
  const rows = (data ?? []).filter((r) => {
    if (r.expires_at == null) return true;
    const t = new Date(String(r.expires_at)).getTime();
    return !Number.isNaN(t) && t > now;
  });

  return rows.map((r) => ({
    id: r.id as string,
    title: r.title as string,
    body: r.body as string,
    published_at: r.published_at as string,
    sort_order: (r.sort_order as number) ?? 0,
  }));
}


/**
 * Admin listesi (taslak dahil).
 */
export async function getFirmPanelAnnouncementsForAdmin(): Promise<
  (FirmPanelAnnouncement & { is_published: boolean; expires_at: string | null })[]
> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("firm_panel_announcements")
    .select("id, title, body, published_at, sort_order, is_published, expires_at")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[getFirmPanelAnnouncementsForAdmin]", error.message);
    return [];
  }

  return (data ?? []).map((r) => ({
    id: r.id as string,
    title: r.title as string,
    body: r.body as string,
    published_at: r.published_at as string,
    sort_order: (r.sort_order as number) ?? 0,
    is_published: Boolean(r.is_published),
    expires_at: r.expires_at != null ? String(r.expires_at) : null,
  }));
}
