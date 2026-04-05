"use server";

import { revalidatePath } from "next/cache";

import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { slugify } from "@/lib/slug";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createFirmBlogCategory(
  firmId: string,
  rawName: string
): Promise<
  { ok: true; id: string; name: string; slug: string } | { ok: false; error: string }
> {
  const firm = firmId.trim();
  const name = rawName.trim();
  if (name.length < 2 || name.length > 80) {
    return { ok: false, error: "Kategori adı 2–80 karakter olmalıdır." };
  }

  await requireFirmPanelAccess(firm);

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu bağlantısı kurulamadı." };

  const { data: dupName } = await supabase
    .from("blog_categories")
    .select("id")
    .eq("name", name)
    .maybeSingle();
  if (dupName?.id) {
    return { ok: false, error: "Bu isimde bir kategori zaten var." };
  }

  const { data: maxRow } = await supabase
    .from("blog_categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = (typeof maxRow?.sort_order === "number" ? maxRow.sort_order : 0) + 1;

  let baseSlug = slugify(name);
  if (!baseSlug) baseSlug = "kategori";

  for (let attempt = 0; attempt < 12; attempt++) {
    const slug =
      attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`.slice(0, 120);

    const { data, error } = await supabase
      .from("blog_categories")
      .insert({
        name,
        slug,
        sort_order: nextOrder,
        is_active: true,
      })
      .select("id,name,slug")
      .single();

    if (!error && data) {
      revalidatePath("/admin/blog-categories");
      revalidatePath(`/panel/${firm}/paylasim/blog`);
      return { ok: true, id: data.id, name: data.name, slug: data.slug };
    }

    if (error?.code === "23505" && attempt < 11) continue;

    if (error?.code === "23505") {
      return {
        ok: false,
        error: "Bu kategori adı veya kısa adres (slug) zaten kullanılıyor.",
      };
    }
    return { ok: false, error: error?.message ?? "Kategori eklenemedi." };
  }

  return { ok: false, error: "Kategori eklenemedi." };
}
