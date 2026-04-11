import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";

export type HomepageSettingsRow = {
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_cta_text: string | null;
  hero_cta_link: string | null;
  featured_section_title: string | null;
  announcement_text: string | null;
  promo_banner_html: string | null;
  seo_title: string | null;
  meta_description: string | null;
  featured_firm_ids: string[];
};

export async function getHomepageSettings(): Promise<HomepageSettingsRow | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data } = await supabase.from("homepage_settings").select("*").eq("id", 1).maybeSingle();
  if (!data) return null;

  return {
    hero_title: data.hero_title as string | null,
    hero_subtitle: data.hero_subtitle as string | null,
    hero_cta_text: data.hero_cta_text as string | null,
    hero_cta_link: data.hero_cta_link as string | null,
    featured_section_title: data.featured_section_title as string | null,
    announcement_text: data.announcement_text as string | null,
    promo_banner_html: data.promo_banner_html as string | null,
    seo_title: data.seo_title as string | null,
    meta_description: data.meta_description as string | null,
    featured_firm_ids: (data.featured_firm_ids as string[]) ?? [],
  };
}

export type ContactPopupPublic = {
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  working_hours: string | null;
  show_phone: boolean;
  show_whatsapp: boolean;
  show_email: boolean;
  show_website: boolean;
};

export async function getContactPopupSettings(): Promise<ContactPopupPublic | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("contact_popup_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (!data) return null;

  return {
    phone: data.phone as string | null,
    whatsapp: data.whatsapp as string | null,
    email: data.email as string | null,
    website: data.website as string | null,
    address: data.address as string | null,
    working_hours: data.working_hours as string | null,
    show_phone: data.show_phone as boolean,
    show_whatsapp: data.show_whatsapp as boolean,
    show_email: data.show_email as boolean,
    show_website: data.show_website as boolean,
  };
}

export type FilterCountryRow = {
  id: string;
  name: string;
  slug: string;
  is_featured: boolean;
  show_in_first_list: boolean;
  sort_order: number;
};

export type FilterServiceRow = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export async function getPublicFilterCountries(): Promise<FilterCountryRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("countries")
    .select("id, name, slug, is_featured, show_in_first_list, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return (data ?? []) as FilterCountryRow[];
}

export async function getPublicFilterServiceTypes(): Promise<FilterServiceRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("service_types")
    .select("id, name, slug, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return (data ?? []) as FilterServiceRow[];
}

export type FilterCompanyTypeRow = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type FilterMainServiceCategoryRow = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export async function getPublicFilterMainServiceCategories(): Promise<
  FilterMainServiceCategoryRow[]
> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("main_service_categories")
    .select("id, name, slug, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return (data ?? []) as FilterMainServiceCategoryRow[];
}

export async function getPublicFilterCompanyTypes(): Promise<
  FilterCompanyTypeRow[]
> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("company_types")
    .select("id, name, slug, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return (data ?? []) as FilterCompanyTypeRow[];
}
