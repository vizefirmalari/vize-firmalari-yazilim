export type GrowthServiceCategoryRow = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
};

export type GrowthServiceRow = {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string | null;
  setup_price: number | null;
  monthly_price: number | null;
  is_custom_price: boolean;
  package_includes: string[];
  is_active: boolean;
  is_featured: boolean;
  badge: string | null;
  sort_order: number;
};

export type GrowthCatalogCategory = GrowthServiceCategoryRow & {
  services: GrowthServiceRow[];
};

export type GrowthPurchaseRequestRow = {
  id: string;
  firm_id: string;
  service_id: string;
  service_title: string;
  setup_price_snapshot: number | null;
  monthly_price_snapshot: number | null;
  status: string;
  payment_status: string;
  firm_note: string | null;
  billing_full_name: string | null;
  billing_company_name: string | null;
  billing_tax_office: string | null;
  billing_tax_number: string | null;
  billing_email: string | null;
  billing_phone: string | null;
  billing_address: string | null;
  transfer_description: string | null;
  category_snapshot: string | null;
  company_name_snapshot: string | null;
  company_logo_snapshot: string | null;
  service_short_description_snapshot: string | null;
  is_subscription: boolean;
  payment_iban_snapshot: string | null;
  payment_receiver_name_snapshot: string | null;
  payment_bank_name_snapshot: string | null;
  payment_type_label: string | null;
  created_at: string;
  updated_at?: string;
};

export type FirmServiceSubscriptionRow = {
  id: string;
  firm_id: string;
  service_id: string;
  service_title: string;
  setup_price_snapshot: number | null;
  monthly_price_snapshot: number | null;
  status: string;
  billing_cycle: string;
  start_date: string | null;
  end_date: string | null;
  purchase_request_id: string | null;
  created_at: string;
};
