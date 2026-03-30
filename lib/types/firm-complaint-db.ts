/** `firm_complaints` tablosu — DB satırı */
export type FirmComplaintStatus = "new" | "in_review" | "resolved" | "closed";

export type FirmComplaintRow = {
  id: string;
  firm_id: string | null;
  firm_name_snapshot: string;
  subject: string;
  message: string;
  email: string;
  phone: string | null;
  status: FirmComplaintStatus;
  is_read: boolean;
  created_at: string;
  created_by: string | null;
  source: "public_form";
};
