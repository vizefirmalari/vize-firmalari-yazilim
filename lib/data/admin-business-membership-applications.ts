import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { BusinessMembershipApplicationRow } from "@/lib/types/business-membership-db";

function mapRow(r: Record<string, unknown>): BusinessMembershipApplicationRow {
  return {
    id: String(r.id),
    company_name: String(r.company_name ?? ""),
    contact_name: String(r.contact_name ?? ""),
    website_url: r.website_url != null ? String(r.website_url) : null,
    phone: String(r.phone ?? ""),
    email: r.email != null && String(r.email).trim() !== "" ? String(r.email) : null,
    notes: r.notes != null && String(r.notes).trim() !== "" ? String(r.notes) : null,
    status: r.status as BusinessMembershipApplicationRow["status"],
    is_read: Boolean(r.is_read),
    created_at: String(r.created_at ?? ""),
    created_by: r.created_by != null ? String(r.created_by) : null,
    source: "public_form",
  };
}

export async function getAdminBusinessMembershipApplications(): Promise<
  BusinessMembershipApplicationRow[]
> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("business_membership_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAdminBusinessMembershipApplications]", error.message);
    return [];
  }

  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}

export async function getAdminBusinessMembershipApplicationById(
  id: string
): Promise<BusinessMembershipApplicationRow | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("business_membership_applications")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[getAdminBusinessMembershipApplicationById]", error.message);
    return null;
  }
  if (!data) return null;

  return mapRow(data as Record<string, unknown>);
}
