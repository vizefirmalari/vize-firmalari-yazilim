import { createSupabaseServerClient } from "@/lib/supabase/server";

export type FirmLeadListRow = {
  id: string;
  application_no: string;
  applicant_name: string;
  visa_type: string;
  target_country: string | null;
  country_name: string | null;
  short_summary: string | null;
  submitted_at: string;
  created_at: string;
  current_status: string;
  lead_score: number;
  lead_segment: string;
  lead_priority: string;
  readiness_status: string;
  preferred_contact_method: string | null;
  phone: string;
  email: string | null;
};

export type FirmLeadListFilters = {
  status?: string;
  visaType?: string;
  country?: string;
  priority?: string;
  readiness?: string;
  dateFrom?: string;
  dateTo?: string;
  q?: string;
};

function escapeIlike(s: string): string {
  return s.replace(/[%_\\]/g, "\\$&");
}

function matchesLeadSearch(row: FirmLeadListRow, q: string): boolean {
  const t = q.trim().toLowerCase();
  if (!t) return true;
  const name = row.applicant_name?.toLowerCase() ?? "";
  const phone = row.phone?.toLowerCase() ?? "";
  const email = row.email?.toLowerCase() ?? "";
  return name.includes(t) || phone.includes(t) || email.includes(t);
}

/** Varsayılan: new önce, sonra lead_score desc, created_at desc */
export function sortFirmLeadsDefault<T extends { current_status: string; lead_score: number; created_at: string }>(
  rows: T[]
): T[] {
  return [...rows].sort((a, b) => {
    const aNew = a.current_status === "new" ? 0 : 1;
    const bNew = b.current_status === "new" ? 0 : 1;
    if (aNew !== bNew) return aNew - bNew;
    if (b.lead_score !== a.lead_score) return b.lead_score - a.lead_score;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

export async function getFirmLeadApplications(firmId: string, filters: FirmLeadListFilters = {}): Promise<FirmLeadListRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  let query = supabase
    .from("lead_applications")
    .select(
      "id, application_no, applicant_name, visa_type, target_country, country_name, short_summary, submitted_at, created_at, current_status, lead_score, lead_segment, lead_priority, readiness_status, preferred_contact_method, phone, email"
    )
    .eq("firm_id", firmId);

  if (filters.status) query = query.eq("current_status", filters.status);
  if (filters.visaType) query = query.eq("visa_type", filters.visaType);
  if (filters.priority) query = query.eq("lead_priority", filters.priority);
  if (filters.readiness) query = query.eq("readiness_status", filters.readiness);

  if (filters.dateFrom) {
    const d = filters.dateFrom.trim();
    if (d) query = query.gte("submitted_at", `${d}T00:00:00.000Z`);
  }
  if (filters.dateTo) {
    const d = filters.dateTo.trim();
    if (d) query = query.lte("submitted_at", `${d}T23:59:59.999Z`);
  }

  if (filters.country?.trim()) {
    const raw = filters.country.trim();
    const t = `%${escapeIlike(raw)}%`;
    query = query.or(`target_country.ilike.${t},country_name.ilike.${t}`);
  }

  const { data, error } = await query.limit(500);
  if (error) {
    console.error("getFirmLeadApplications", error);
    return [];
  }

  let rows = (data ?? []) as FirmLeadListRow[];
  if (filters.q?.trim()) {
    rows = rows.filter((r) => matchesLeadSearch(r, filters.q!));
  }
  return sortFirmLeadsDefault(rows);
}

/** Filtre açılır listeleri için firmaya özgü değerler */
export async function getFirmLeadDistinctFieldValues(
  firmId: string
): Promise<{ countries: string[] }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { countries: [] };

  const { data } = await supabase
    .from("lead_applications")
    .select("target_country, country_name")
    .eq("firm_id", firmId)
    .limit(2000);

  const set = new Set<string>();
  for (const row of data ?? []) {
    const r = row as { target_country?: string | null; country_name?: string | null };
    const a = r.target_country?.trim();
    const b = r.country_name?.trim();
    if (a) set.add(a);
    if (b) set.add(b);
  }
  return { countries: Array.from(set).sort((a, b) => a.localeCompare(b, "tr")) };
}

export async function getFirmLeadApplicationDetail(firmId: string, applicationId: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("lead_applications")
    .select("*")
    .eq("firm_id", firmId)
    .eq("id", applicationId)
    .maybeSingle();

  if (!data) return null;

  const { data: files } = await supabase
    .from("lead_application_files")
    .select("id, file_type, storage_path, original_name, mime_type, size_bytes, uploaded_at")
    .eq("application_id", applicationId)
    .order("uploaded_at", { ascending: false });

  await supabase.from("lead_application_events").insert({
    application_id: applicationId,
    firm_id: firmId,
    event_type: "application_viewed_by_firm",
    payload: { viewed_in: "firm_panel_leads_page" },
  });

  return { application: data, files: files ?? [] };
}
