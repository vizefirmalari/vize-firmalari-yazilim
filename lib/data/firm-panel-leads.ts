import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getFirmLeadApplications(firmId: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("lead_applications")
    .select(
      "id, application_no, applicant_name, visa_type, target_country, submitted_at, current_status, lead_score, lead_segment, lead_priority, readiness_status, score_reason_summary"
    )
    .eq("firm_id", firmId)
    .order("submitted_at", { ascending: false })
    .limit(100);

  return data ?? [];
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
    payload: { viewed_in: "firm_panel_forms_page" },
  });

  return { application: data, files: files ?? [] };
}
