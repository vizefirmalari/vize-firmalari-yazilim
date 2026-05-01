import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { VisaCaseDocumentRow, VisaCaseEventRow, VisaCaseFinanceRow, VisaCaseRow } from "@/lib/visa-operations/types";

/** Liste ve özet kartları */
const CASE_LIST_FIELDS =
  "id,firm_id,source_lead_id,customer_name,phone,email,passport_no,country,visa_type,status,appointment_date,travel_date,travel_end_date,public_tracking_code,internal_note,priority,next_action,next_action_date,created_at,updated_at";

/** Operasyon paneli tablosu (satır sıkığı + finans özeti için evrak teslim süreçleri dahil) */
const CASE_TABLE_LIST_FIELDS =
  `${CASE_LIST_FIELDS},document_delivery_status,biometric_status,passport_delivery_status`;

/** Detay ekranı — tüm operasyon alanları */
const CASE_DETAIL_FIELDS = `${CASE_LIST_FIELDS},identity_no,birth_date,nationality,passport_expiry_date,application_center,application_city,assigned_staff_name,stay_duration_days,travel_purpose,sponsor_status,document_delivery_status,biometric_status,passport_delivery_status`;

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
    .select(CASE_LIST_FIELDS)
    .eq("firm_id", firmId)
    .order("updated_at", { ascending: false });
  if (error || !data) return [];
  return data as VisaCaseRow[];
}

/** Tablo görünümü: dosya satırı + tek finans satırı (varsa trigger ile oluşturulur) */
export type VisaOperationsTableCaseRow = VisaCaseRow & {
  document_delivery_status?: string | null;
  biometric_status?: string | null;
  passport_delivery_status?: string | null;
};

export type VisaOperationsTableLoadedRow = {
  caseRow: VisaOperationsTableCaseRow;
  finance: VisaCaseFinanceRow | null;
};

export async function loadVisaCasesTableRowsForFirm(firmId: string): Promise<VisaOperationsTableLoadedRow[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const financeSelect =
    "id,case_id,firm_id,consulate_fee,service_fee,total_fee,consulate_fee_currency,service_fee_currency,total_fee_currency,payment_status,invoice_status,updated_at";
  const { data, error } = await supabase
    .from("visa_cases")
    .select(`${CASE_TABLE_LIST_FIELDS},visa_case_finance(${financeSelect})`)
    .eq("firm_id", firmId)
    .order("updated_at", { ascending: false });

  if (error || !data || !Array.isArray(data)) return [];

  type Raw = VisaOperationsTableCaseRow & { visa_case_finance?: VisaCaseFinanceRow[] | VisaCaseFinanceRow | null };

  return (data as Raw[]).map((row) => {
    const { visa_case_finance: vf, ...rest } = row;
    let finance: VisaCaseFinanceRow | null = null;
    if (Array.isArray(vf)) {
      finance = vf[0] ?? null;
    } else if (vf && typeof vf === "object") {
      finance = vf as VisaCaseFinanceRow;
    }
    return { caseRow: rest as VisaOperationsTableCaseRow, finance };
  });
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
    supabase.from("visa_cases").select(CASE_DETAIL_FIELDS).eq("firm_id", firmId).eq("id", caseId).maybeSingle(),
    supabase
      .from("visa_case_finance")
      .select(
        "id,case_id,firm_id,consulate_fee,service_fee,total_fee,consulate_fee_currency,service_fee_currency,total_fee_currency,payment_status,invoice_status,updated_at"
      )
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
