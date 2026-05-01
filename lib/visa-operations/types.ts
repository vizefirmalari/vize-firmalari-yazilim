export type BadgeVariant = "neutral" | "info" | "warning" | "success" | "danger";

export type VisaCaseFinanceRow = {
  id: string;
  case_id: string;
  firm_id: string;
  consulate_fee: number | string | null;
  service_fee: number | string | null;
  total_fee: number | string | null;
  consulate_fee_currency?: string | null;
  service_fee_currency?: string | null;
  total_fee_currency?: string | null;
  payment_status: string;
  invoice_status: string;
  updated_at?: string;
};

export type VisaCaseDocumentRow = {
  id: string;
  case_id: string;
  firm_id: string;
  file_path: string;
  file_name: string | null;
  file_type: string | null;
  document_type: string | null;
  uploaded_at: string;
};

export type VisaCaseEventRow = {
  id: string;
  case_id: string;
  firm_id: string;
  old_status: string | null;
  new_status: string;
  note: string | null;
  created_at: string;
};

export type VisaCaseRow = {
  id: string;
  firm_id: string;
  source_lead_id: string | null;
  customer_name: string;
  phone: string | null;
  email: string | null;
  passport_no: string | null;
  country: string | null;
  visa_type: string | null;
  status: string;
  appointment_date: string | null;
  travel_date: string | null;
  public_tracking_code: string | null;
  internal_note: string | null;
  identity_no?: string | null;
  birth_date?: string | null;
  nationality?: string | null;
  passport_expiry_date?: string | null;
  application_center?: string | null;
  application_city?: string | null;
  assigned_staff_name?: string | null;
  priority?: string | null;
  travel_end_date?: string | null;
  stay_duration_days?: number | null;
  travel_purpose?: string | null;
  sponsor_status?: string | null;
  document_delivery_status?: string | null;
  biometric_status?: string | null;
  passport_delivery_status?: string | null;
  next_action?: string | null;
  next_action_date?: string | null;
  created_at: string;
  updated_at: string;
};
