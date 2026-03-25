"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logAdminActivity } from "@/lib/actions/activity";
import { getAdminContext } from "@/lib/auth/admin";
import { slugify } from "@/lib/slug";

export async function upsertCountry(input: {
  id?: string;
  name: string;
  slug?: string;
  is_active: boolean;
  sort_order: number;
  is_featured: boolean;
  show_in_first_list: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const slug = input.slug?.trim() || slugify(input.name);
  const row = {
    name: input.name.trim(),
    slug,
    is_active: input.is_active,
    sort_order: input.sort_order,
    is_featured: input.is_featured,
    show_in_first_list: input.show_in_first_list,
  };

  if (input.id) {
    const { error } = await supabase.from("countries").update(row).eq("id", input.id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase.from("countries").insert(row);
    if (error) return { ok: false, error: error.message };
  }

  await logAdminActivity(supabase, ctx.userId, "country.upserted", "country", input.id ?? null, {
    name: row.name,
  });
  revalidatePath("/admin/filters/countries");
  revalidatePath("/");
  return { ok: true };
}

export async function upsertServiceType(input: {
  id?: string;
  name: string;
  slug?: string;
  is_active: boolean;
  sort_order: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const slug = input.slug?.trim() || slugify(input.name);
  const row = {
    name: input.name.trim(),
    slug,
    is_active: input.is_active,
    sort_order: input.sort_order,
  };

  if (input.id) {
    const { error } = await supabase.from("service_types").update(row).eq("id", input.id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase.from("service_types").insert(row);
    if (error) return { ok: false, error: error.message };
  }

  await logAdminActivity(supabase, ctx.userId, "service_type.upserted", "service_type", input.id ?? null, {
    name: row.name,
  });
  revalidatePath("/admin/filters/services");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteCountry(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const { error } = await supabase.from("countries").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  await logAdminActivity(supabase, ctx.userId, "country.deleted", "country", id, null);
  revalidatePath("/admin/filters/countries");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteServiceType(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const { error } = await supabase.from("service_types").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  await logAdminActivity(supabase, ctx.userId, "service_type.deleted", "service_type", id, null);
  revalidatePath("/admin/filters/services");
  revalidatePath("/");
  return { ok: true };
}

async function ensureUniqueName(
  table: "countries" | "company_types" | "main_service_categories" | "sub_services",
  name: string
): Promise<{ ok: true; id: string; name: string } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const normalized = name.trim();
  if (!normalized) return { ok: false, error: "Boş değer eklenemez." };

  const { data: existing, error: existingErr } = await supabase
    .from(table)
    .select("id,name")
    .ilike("name", normalized)
    .maybeSingle();
  if (existingErr && existingErr.code !== "PGRST116") {
    return { ok: false, error: existingErr.message };
  }
  if (existing) {
    return {
      ok: true,
      id: String((existing as { id: string }).id),
      name: String((existing as { name: string }).name),
    };
  }

  const slug = slugify(normalized);
  const { data, error } = await supabase
    .from(table)
    .insert({ name: normalized, slug, is_active: true, sort_order: 100 })
    .select("id,name")
    .single();
  if (error) return { ok: false, error: error.message };

  await logAdminActivity(supabase, ctx.userId, `${table}.inline_created`, table, String(data.id), {
    name: normalized,
  });

  revalidatePath("/admin/firms/new");
  revalidatePath("/admin/firms");
  revalidatePath("/admin/filters/countries");
  revalidatePath("/admin/filters/services");
  revalidatePath("/");

  return {
    ok: true,
    id: String((data as { id: string }).id),
    name: String((data as { name: string }).name),
  };
}

export async function createInlineCountry(name: string) {
  return ensureUniqueName("countries", name);
}

export async function createInlineCompanyType(name: string) {
  return ensureUniqueName("company_types", name);
}

export async function createInlineMainServiceCategory(name: string) {
  return ensureUniqueName("main_service_categories", name);
}

export async function createInlineSubService(name: string) {
  return ensureUniqueName("sub_services", name);
}
