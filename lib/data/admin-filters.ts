import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type CountryAdminRow = {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  sort_order: number;
  is_featured: boolean;
  show_in_first_list: boolean;
};

export type ServiceTypeAdminRow = {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  sort_order: number;
};

export type CompanyTypeAdminRow = {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  sort_order: number;
};

export type MainServiceCategoryAdminRow = {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  sort_order: number;
};

export type SubServiceAdminRow = {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  sort_order: number;
};

export async function getAdminCountriesList(): Promise<CountryAdminRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("countries")
    .select("*")
    .order("sort_order", { ascending: true });

  return (data ?? []) as CountryAdminRow[];
}

export async function getAdminServiceTypesList(): Promise<ServiceTypeAdminRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("service_types")
    .select("*")
    .order("sort_order", { ascending: true });

  return (data ?? []) as ServiceTypeAdminRow[];
}

export async function getPicklistCountries(): Promise<
  { id: string; name: string }[]
> {
  const rows = await getAdminCountriesList();
  return rows.filter((r) => r.is_active).map((r) => ({ id: r.id, name: r.name }));
}

export async function getPicklistServiceTypes(): Promise<
  { id: string; name: string }[]
> {
  const rows = await getAdminServiceTypesList();
  return rows.filter((r) => r.is_active).map((r) => ({ id: r.id, name: r.name }));
}

export async function getAdminCompanyTypesList(): Promise<CompanyTypeAdminRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("company_types")
    .select("*")
    .order("sort_order", { ascending: true });

  return (data ?? []) as CompanyTypeAdminRow[];
}

export async function getAdminMainServiceCategoriesList(): Promise<MainServiceCategoryAdminRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("main_service_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  return (data ?? []) as MainServiceCategoryAdminRow[];
}

export async function getAdminSubServicesList(): Promise<SubServiceAdminRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("sub_services")
    .select("*")
    .order("sort_order", { ascending: true });

  return (data ?? []) as SubServiceAdminRow[];
}

export async function getPicklistCompanyTypes(): Promise<string[]> {
  const rows = await getAdminCompanyTypesList();
  return rows.filter((r) => r.is_active).map((r) => r.name);
}

export async function getPicklistMainServiceCategories(): Promise<string[]> {
  const rows = await getAdminMainServiceCategoriesList();
  return rows.filter((r) => r.is_active).map((r) => r.name);
}

export async function getPicklistSubServices(): Promise<string[]> {
  const rows = await getAdminSubServicesList();
  return rows.filter((r) => r.is_active).map((r) => r.name);
}
