export type GrowthServiceCategoryRow = {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
};

export type GrowthServiceRow = {
  id: string;
  category_id: string;
  title: string;
  description: string;
  long_description: string | null;
  setup_price: number | null;
  monthly_price: number | null;
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
  created_at: string;
};

export type FirmServiceSubscriptionRow = {
  id: string;
  firm_id: string;
  service_id: string;
  service_title: string;
  setup_price_snapshot: number | null;
  monthly_price_snapshot: number | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
};
