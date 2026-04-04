import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type FirmPanelMembership = {
  firmId: string;
  firmName: string;
  firmSlug: string;
  logoUrl: string | null;
  role: string;
  status: string;
};

/**
 * Oturumdaki kullanıcının erişebildiği tüm firma panel kayıtları (aktif üyelik).
 */
export async function getFirmPanelMemberships(): Promise<FirmPanelMembership[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: rows, error } = await supabase
    .from("firm_panel_members")
    .select(
      `
      role,
      status,
      firms (
        id,
        name,
        slug,
        logo_url
      )
    `
    )
    .eq("user_id", user.id)
    .eq("status", "active");

  if (error || !rows?.length) return [];

  const out: FirmPanelMembership[] = [];
  for (const row of rows) {
    const firm = row.firms as
      | { id: string; name: string; slug: string; logo_url: string | null }
      | { id: string; name: string; slug: string; logo_url: string | null }[]
      | null;
    const f = Array.isArray(firm) ? firm[0] : firm;
    if (!f?.id) continue;
    out.push({
      firmId: f.id,
      firmName: f.name,
      firmSlug: f.slug,
      logoUrl: f.logo_url,
      role: row.role as string,
      status: row.status as string,
    });
  }
  return out;
}

/**
 * Belirli bir firmaya panel erişimi yoksa ana panel listesine yönlendirir.
 * Yetki `firm_panel_members` üzerinden doğrulanır; plan kısıtları alt sayfalarda ayrı guard ile uygulanır.
 */
export async function requireFirmPanelAccess(
  firmId: string
): Promise<FirmPanelMembership> {
  const list = await getFirmPanelMemberships();
  const hit = list.find((m) => m.firmId === firmId);
  if (!hit) {
    redirect("/panel");
  }

  return hit;
}

/**
 * Oturum gerekir; en az bir firma yoksa ana sayfaya veya hesaba yönlendirme için kullanılır.
 */
export async function requireAuthenticatedForPanel(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect("/?auth=login&next=/panel");
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/?auth=login&next=/panel");
  }
}
