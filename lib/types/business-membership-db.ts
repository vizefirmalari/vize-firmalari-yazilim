/**
 * `business_membership_applications` — yalnızca ön başvuru / talep kayıtları.
 * Otomatik firma yayını yok; `firms` ile doğrudan bağlı değildir.
 */
export type MembershipApplicationStatus =
  | "new"
  | "in_review"
  | "approved"
  | "rejected";

export interface BusinessMembershipApplicationRow {
  id: string;
  company_name: string;
  contact_name: string;
  website_url: string | null;
  phone: string;
  email: string | null;
  notes: string | null;
  status: MembershipApplicationStatus;
  is_read: boolean;
  created_at: string;
  created_by: string | null;
  source: "public_form";
}
