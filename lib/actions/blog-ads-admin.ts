"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export async function upsertBlogAd(input: {
  id?: string;
  ad_type: "image" | "native";
  title: string;
  advertiser_name: string;
  image_url?: string;
  cta_text?: string;
  sponsor_name?: string;
  sponsor_logo_url?: string;
  native_image_url?: string;
  native_title?: string;
  native_description?: string;
  target_url: string;
  position: "top" | "middle" | "bottom";
  weight: number;
  start_date: string;
  end_date?: string | null;
  is_active: boolean;
  target_category_ids?: string[];
  target_countries?: string[];
  target_visa_types?: string[];
}): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return { ok: false, error: "Service role bağlantısı eksik." };

  const row = {
    ad_type: input.ad_type,
    title: input.title.trim(),
    advertiser_name: input.advertiser_name.trim(),
    image_url: input.image_url?.trim() || null,
    cta_text: input.cta_text?.trim() || null,
    sponsor_name: input.sponsor_name?.trim() || null,
    sponsor_logo_url: input.sponsor_logo_url?.trim() || null,
    native_image_url: input.native_image_url?.trim() || null,
    native_title: input.native_title?.trim() || null,
    native_description: input.native_description?.trim() || null,
    target_url: input.target_url.trim(),
    position: input.position,
    weight: Math.max(1, Number(input.weight) || 1),
    start_date: input.start_date,
    end_date: input.end_date?.trim() ? input.end_date : null,
    is_active: Boolean(input.is_active),
    target_category_ids: (input.target_category_ids ?? []).filter(Boolean),
    target_countries: (input.target_countries ?? []).filter(Boolean),
    target_visa_types: (input.target_visa_types ?? []).filter(Boolean),
    updated_at: new Date().toISOString(),
  };
  if (!row.title || !row.advertiser_name || !row.target_url) {
    return { ok: false, error: "Reklam adı, reklamveren ve hedef URL zorunlu." };
  }
  if (row.ad_type === "image" && !row.image_url) {
    return { ok: false, error: "Görsel reklam için görsel zorunlu." };
  }
  if (row.ad_type === "native" && (!row.sponsor_name || !row.native_title || !row.native_description)) {
    return { ok: false, error: "Sponsorlu kart için sponsor adı, başlık ve açıklama zorunlu." };
  }

  const query = input.id
    ? supabase.from("blog_ads").update(row).eq("id", input.id)
    : supabase.from("blog_ads").insert(row);
  const { error } = await query;
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/blog-ads");
  revalidatePath("/firma");
  return { ok: true };
}

export async function uploadBlogAdAsset(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireAdmin();
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return { ok: false, error: "Service role bağlantısı eksik." };

  const file = formData.get("file");
  const kind = String(formData.get("kind") || "image");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Dosya seçilmedi." };

  const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
  if (!["png", "jpg", "jpeg", "webp"].includes(ext)) {
    return { ok: false, error: "Yalnızca PNG, JPG veya WebP yükleyin." };
  }

  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const path = `ads/blog/${kind}/${stamp}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from("media").upload(path, buffer, {
    contentType: file.type || "image/webp",
    upsert: true,
  });
  if (error) return { ok: false, error: error.message };
  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);
  return { ok: true, url: publicUrl };
}

export async function deleteBlogAd(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const supabase = createSupabaseServiceRoleClient();
  if (!supabase) return { ok: false, error: "Service role bağlantısı eksik." };
  const { error } = await supabase.from("blog_ads").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/blog-ads");
  return { ok: true };
}

