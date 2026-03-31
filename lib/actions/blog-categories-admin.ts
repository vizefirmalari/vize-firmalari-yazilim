"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminContext } from "@/lib/auth/admin";
import { slugify } from "@/lib/slug";

export async function upsertBlogCategory(input: {
  id?: string;
  name: string;
  slug?: string;
  sort_order: number;
  is_active: boolean;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const row = {
    name: input.name.trim(),
    slug: input.slug?.trim() || slugify(input.name),
    sort_order: Number(input.sort_order) || 100,
    is_active: Boolean(input.is_active),
    updated_at: new Date().toISOString(),
  };

  if (!row.name) return { ok: false, error: "Kategori adı gerekli." };

  const query = input.id
    ? supabase.from("blog_categories").update(row).eq("id", input.id)
    : supabase.from("blog_categories").insert(row);
  const { error } = await query;
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/blog-categories");
  revalidatePath(`/panel`);
  return { ok: true };
}

export async function deleteBlogCategory(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };
  const { error } = await supabase.from("blog_categories").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/blog-categories");
  return { ok: true };
}
