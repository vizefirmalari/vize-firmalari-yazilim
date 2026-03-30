import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { FirmComplaintRow } from "@/lib/types/firm-complaint-db";

function mapRow(r: Record<string, unknown>): FirmComplaintRow {
  return {
    id: String(r.id),
    firm_id: r.firm_id != null ? String(r.firm_id) : null,
    firm_name_snapshot: String(r.firm_name_snapshot ?? ""),
    subject: String(r.subject ?? ""),
    message: String(r.message ?? ""),
    email: String(r.email ?? ""),
    phone: r.phone != null ? String(r.phone) : null,
    status: r.status as FirmComplaintRow["status"],
    is_read: Boolean(r.is_read),
    created_at: String(r.created_at ?? ""),
    created_by: r.created_by != null ? String(r.created_by) : null,
    source: "public_form",
  };
}

export async function getAdminFirmComplaintsList(): Promise<FirmComplaintRow[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("firm_complaints")
    .select(
      "id, firm_id, firm_name_snapshot, subject, message, email, phone, status, is_read, created_at, created_by, source"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAdminFirmComplaintsList]", error.message);
    return [];
  }

  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>));
}

export async function getAdminFirmComplaintById(
  id: string
): Promise<FirmComplaintRow | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("firm_complaints")
    .select(
      "id, firm_id, firm_name_snapshot, subject, message, email, phone, status, is_read, created_at, created_by, source"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[getAdminFirmComplaintById]", error.message);
    return null;
  }
  if (!data) return null;

  return mapRow(data as Record<string, unknown>);
}
