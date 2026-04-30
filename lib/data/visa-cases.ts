import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { VisaCaseDocumentRow, VisaCaseEventRow, VisaCaseFinanceRow, VisaCaseRow } from "@/lib/visa-operations/types";

const CASE_FIELDS =
  "id,firm_id,source_lead_id,customer_name,phone,email,passport_no,country,visa_type,status,appointment_date,travel_date,public_tracking_code,internal_note,created_at,updated_at";

export async function getVisaCaseIdForSourceLead(firmId: string, leadId: string): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("visa_cases")
    .select("id")
    .eq("firm_id", firmId)
    .eq("source_lead_id", leadId)
    .maybeSingle();

  const row = data as { id?: string } | null;
  return row?.id ?? null;
}

export async function loadVisaCasesForFirm(firmId: string): Promise<VisaCaseRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("visa_cases")
    .select(CASE_FIELDS)
    .eq("firm_id", firmId)
    .order("updated_at", { ascending: false });
  if (error || !data) return [];
  return data as VisaCaseRow[];
}

export type VisaCaseDetailPack = {
  case: VisaCaseRow;
  finance: VisaCaseFinanceRow | null;
  documents: VisaCaseDocumentRow[];
  events: VisaCaseEventRow[];
};

export async function loadVisaCaseDetailPack(firmId: string, caseId: string): Promise<VisaCaseDetailPack | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const [{ data: cRows, error: cErr }, fin, docs, events] = await Promise.all([
    supabase.from("visa_cases").select(CASE_FIELDS).eq("firm_id", firmId).eq("id", caseId).maybeSingle(),
    supabase
      .from("visa_case_finance")
      .select("id,case_id,firm_id,consulate_fee,service_fee,total_fee,payment_status,invoice_status,updated_at")
      .eq("firm_id", firmId)
      .eq("case_id", caseId)
      .maybeSingle(),
    supabase
      .from("visa_case_documents")
      .select("id,case_id,firm_id,file_path,file_name,file_type,document_type,uploaded_at")
      .eq("firm_id", firmId)
      .eq("case_id", caseId)
      .order("uploaded_at", { ascending: false }),
    supabase
      .from("visa_case_events")
      .select("id,case_id,firm_id,old_status,new_status,note,created_at")
      .eq("firm_id", firmId)
      .eq("case_id", caseId)
      .order("created_at", { ascending: false }),
  ]);

  if (cErr || !cRows) return null;
  const row = cRows as VisaCaseRow;

  const finRow = fin.data as VisaCaseFinanceRow | null | undefined;
  return {
    case: row,
    finance: finRow ?? null,
    documents: (docs.data ?? []) as VisaCaseDocumentRow[],
    events: (events.data ?? []) as VisaCaseEventRow[],
  };
}
