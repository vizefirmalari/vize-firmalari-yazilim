"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logAdminActivity } from "@/lib/actions/activity";
import { getAdminContext } from "@/lib/auth/admin";
import { firmFormSchema } from "@/lib/validations/firm";

async function syncFirmDenormalized(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  firmId: string
) {
  const { data: fc } = await supabase
    .from("firm_countries")
    .select("country_id")
    .eq("firm_id", firmId);
  const cids = (fc ?? []).map((r) => r.country_id as string);
  let countryNames: string[] = [];
  if (cids.length) {
    const { data: countries } = await supabase
      .from("countries")
      .select("name")
      .in("id", cids);
    countryNames = (countries ?? []).map((c) => c.name as string);
  }

  const { data: fs } = await supabase
    .from("firm_service_types")
    .select("service_type_id")
    .eq("firm_id", firmId);
  const sids = (fs ?? []).map((r) => r.service_type_id as string);
  let typeNames: string[] = [];
  if (sids.length) {
    const { data: types } = await supabase
      .from("service_types")
      .select("name")
      .in("id", sids);
    typeNames = (types ?? []).map((t) => t.name as string);
  }

  const { data: firmRow } = await supabase
    .from("firms")
    .select("custom_services")
    .eq("id", firmId)
    .single();

  const custom = (firmRow?.custom_services as string[] | null) ?? [];
  const services = [...typeNames, ...custom];

  await supabase
    .from("firms")
    .update({
      countries: countryNames,
      services,
      updated_at: new Date().toISOString(),
    })
    .eq("id", firmId);
}

export async function createFirmFromForm(
  raw: unknown
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };

  const parsed = firmFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Geçersiz form" };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const v = parsed.data;
  const payload = {
    name: v.name,
    slug: v.slug,
    logo_url: v.logo_url ?? null,
    short_description: v.short_description ?? null,
    description: v.description ?? null,
    trust_score: v.trust_score,
    phone: v.phone || null,
    whatsapp: v.whatsapp || null,
    email: v.email || null,
    website: v.website || null,
    instagram: v.instagram || null,
    facebook: v.facebook || null,
    twitter: v.twitter || null,
    linkedin: v.linkedin || null,
    status: v.status,
    featured: v.featured,
    show_on_homepage: v.show_on_homepage,
    seo_title: v.seo_title ?? null,
    meta_description: v.meta_description ?? null,
    canonical_url: v.canonical_url || null,
    og_title: v.og_title ?? null,
    og_description: v.og_description ?? null,
    og_image_url: v.og_image_url || null,
    custom_cta_text: v.custom_cta_text ?? null,
    page_heading: v.page_heading ?? null,
    page_subheading: v.page_subheading ?? null,
    admin_note: v.admin_note ?? null,
    custom_services: v.custom_service_labels ?? [],
  };

  const { data: inserted, error } = await supabase
    .from("firms")
    .insert(payload)
    .select("id")
    .single();

  if (error || !inserted) {
    return { ok: false, error: error?.message ?? "Kayıt oluşturulamadı" };
  }

  const firmId = inserted.id as string;

  if (v.country_ids.length) {
    await supabase.from("firm_countries").insert(
      v.country_ids.map((country_id) => ({ firm_id: firmId, country_id }))
    );
  }
  if (v.service_type_ids.length) {
    await supabase.from("firm_service_types").insert(
      v.service_type_ids.map((service_type_id) => ({
        firm_id: firmId,
        service_type_id,
      }))
    );
  }

  await syncFirmDenormalized(supabase, firmId);
  await logAdminActivity(supabase, ctx.userId, "firm.created", "firm", firmId, {
    name: v.name,
  });

  revalidatePath("/");
  revalidatePath("/admin/firms");
  revalidatePath(`/firma/${v.slug}`);
  return { ok: true, id: firmId };
}

export async function updateFirmFromForm(
  firmId: string,
  raw: unknown
): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };

  const parsed = firmFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Geçersiz form" };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const v = parsed.data;
  const payload = {
    name: v.name,
    slug: v.slug,
    logo_url: v.logo_url ?? null,
    short_description: v.short_description ?? null,
    description: v.description ?? null,
    trust_score: v.trust_score,
    phone: v.phone || null,
    whatsapp: v.whatsapp || null,
    email: v.email || null,
    website: v.website || null,
    instagram: v.instagram || null,
    facebook: v.facebook || null,
    twitter: v.twitter || null,
    linkedin: v.linkedin || null,
    status: v.status,
    featured: v.featured,
    show_on_homepage: v.show_on_homepage,
    seo_title: v.seo_title ?? null,
    meta_description: v.meta_description ?? null,
    canonical_url: v.canonical_url || null,
    og_title: v.og_title ?? null,
    og_description: v.og_description ?? null,
    og_image_url: v.og_image_url || null,
    custom_cta_text: v.custom_cta_text ?? null,
    page_heading: v.page_heading ?? null,
    page_subheading: v.page_subheading ?? null,
    admin_note: v.admin_note ?? null,
    custom_services: v.custom_service_labels ?? [],
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("firms").update(payload).eq("id", firmId);

  if (error) return { ok: false, error: error.message };

  await supabase.from("firm_countries").delete().eq("firm_id", firmId);
  await supabase.from("firm_service_types").delete().eq("firm_id", firmId);

  if (v.country_ids.length) {
    await supabase.from("firm_countries").insert(
      v.country_ids.map((country_id) => ({ firm_id: firmId, country_id }))
    );
  }
  if (v.service_type_ids.length) {
    await supabase.from("firm_service_types").insert(
      v.service_type_ids.map((service_type_id) => ({
        firm_id: firmId,
        service_type_id,
      }))
    );
  }

  await syncFirmDenormalized(supabase, firmId);
  await logAdminActivity(supabase, ctx.userId, "firm.updated", "firm", firmId, {
    name: v.name,
  });

  revalidatePath("/");
  revalidatePath("/admin/firms");
  revalidatePath(`/firma/${v.slug}`);
  return { ok: true };
}

export async function deleteFirm(
  firmId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const { data: row } = await supabase
    .from("firms")
    .select("slug")
    .eq("id", firmId)
    .maybeSingle();

  const { error } = await supabase.from("firms").delete().eq("id", firmId);
  if (error) return { ok: false, error: error.message };

  await logAdminActivity(supabase, ctx.userId, "firm.deleted", "firm", firmId, null);
  revalidatePath("/");
  revalidatePath("/admin/firms");
  if (row?.slug) revalidatePath(`/firma/${row.slug}`);
  return { ok: true };
}

export async function setFirmStatus(
  firmId: string,
  status: "draft" | "published" | "inactive"
): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const { error } = await supabase
    .from("firms")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", firmId);
  if (error) return { ok: false, error: error.message };

  await logAdminActivity(supabase, ctx.userId, `firm.status.${status}`, "firm", firmId, null);
  revalidatePath("/");
  revalidatePath("/admin/firms");
  return { ok: true };
}

export async function bulkFirmAction(
  ids: string[],
  action: "publish" | "inactive" | "delete"
): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };
  if (!ids.length) return { ok: false, error: "Kayıt seçilmedi" };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  if (action === "delete") {
    const { error } = await supabase.from("firms").delete().in("id", ids);
    if (error) return { ok: false, error: error.message };
    await logAdminActivity(supabase, ctx.userId, "firm.bulk_deleted", "firm", null, {
      count: ids.length,
    });
  } else {
    const status = action === "publish" ? "published" : "inactive";
    const { error } = await supabase
      .from("firms")
      .update({ status, updated_at: new Date().toISOString() })
      .in("id", ids);
    if (error) return { ok: false, error: error.message };
    await logAdminActivity(supabase, ctx.userId, `firm.bulk_${status}`, "firm", null, {
      count: ids.length,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/firms");
  return { ok: true };
}

export async function uploadFirmLogo(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Dosya yok" };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `logos/${ctx.userId}/${Date.now()}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from("media").upload(path, buffer, {
    contentType: file.type || "image/png",
    upsert: true,
  });

  if (error) return { ok: false, error: error.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);

  return { ok: true, url: publicUrl };
}

