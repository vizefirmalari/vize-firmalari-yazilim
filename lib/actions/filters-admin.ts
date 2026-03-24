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
