"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logAdminActivity } from "@/lib/actions/activity";
import { getAdminContext } from "@/lib/auth/admin";
import { firmFormSchema, type FirmFormInput } from "@/lib/validations/firm";
import {
  countActiveTaxonomySlugsForCorporateness,
  replaceFirmSpecializationCustom,
} from "@/lib/data/specialization-taxonomy";
import { computePersistedCorporatenessFields } from "@/lib/firms/corporateness-persist";
import { resolveHypeBigintFromRow } from "@/lib/firms/hype-resolve";
import {
  recalculateCorporatenessScore,
  recalculateCorporatenessScoreWithClient,
} from "@/lib/firms/recalculate-corporateness";
import { deriveVisaRegions } from "@/lib/visa-regions/derive";
import { absoluteUrl } from "@/lib/seo/canonical";
import { submitIndexNowUrls } from "@/lib/seo/indexnow";

/** Yönetici paneli / cron — `WithClient` doğrudan `lib/firms/recalculate-corporateness` içinden import edin. */
export { recalculateCorporatenessScore };

type SupabaseAdmin = NonNullable<
  Awaited<ReturnType<typeof createSupabaseServerClient>>
>;

function scheduleIndexNowForFirmSlugs(slugs: string[]) {
  const urls = slugs
    .map((s) => String(s).trim())
    .filter(Boolean)
    .map((slug) => absoluteUrl(`/firma/${slug}`));
  if (urls.length) {
    after(() => submitIndexNowUrls(urls));
  }
}

function emptyToNull(s: string | null | undefined): string | null {
  if (s === undefined || s === null) return null;
  const t = s.trim();
  return t.length ? t : null;
}

/**
 * Firma satırı — Kurumsallık ve güven skoru her zaman `computePersistedCorporatenessFields`
 * ile hesaplanır; istemciden gelen alanlar güvenilir değildir.
 */
function firmRowPayload(
  v: FirmFormInput,
  hypeForTrust: bigint,
  corpOpts?: { customSpecializationScoreCount?: number }
) {
  const persisted = computePersistedCorporatenessFields(v, {
    hypeForTrust,
    customSpecializationScoreCount: corpOpts?.customSpecializationScoreCount,
  });
  const licenseVal = emptyToNull(v.license_number ?? v.permit_number ?? undefined);
  const taxDoc = v.has_tax_document || v.has_tax_certificate;
  const nz = (s: string | null | undefined) => Boolean(s && String(s).trim().length);
  const profileHasSeo =
    (nz(v.seo_title) && nz(v.meta_description)) ||
    nz(v.focus_keyword) ||
    (v.tags?.length ?? 0) > 0 ||
    nz(v.secondary_keywords) ||
    nz(v.page_heading) ||
    nz(v.page_subheading) ||
    nz(v.og_title) ||
    nz(v.og_description) ||
    nz(v.og_image_url) ||
    Boolean(v.has_blog);
  return {
    name: v.name,
    slug: v.slug,
    logo_url: v.logo_url ?? null,
    logo_alt_text: v.logo_url?.trim()
      ? v.logo_alt_text?.trim() || null
      : null,
    logo_title: v.logo_url?.trim()
      ? emptyToNull(v.logo_title ?? undefined)
      : null,
    logo_description: v.logo_url?.trim()
      ? emptyToNull(v.logo_description ?? undefined)
      : null,
    tags: [...new Set((v.tags ?? []).map((t) => t.trim()).filter(Boolean))],
    cover_image_url: v.cover_image_url ?? null,
    gallery_images: v.gallery_images ?? [],
    office_photo_urls: v.office_photo_urls ?? [],
    team_photo_url: v.team_photo_url ?? null,
    document_image_urls: v.document_image_urls ?? [],
    promo_image_urls: v.promo_image_urls ?? [],
    short_description: v.short_description ?? null,
    description: v.description ?? null,
    slogan: v.slogan ?? null,
    short_badge: v.short_badge ?? null,
    page_intro: v.page_intro ?? null,
    status_summary: v.status_summary ?? null,
    firm_category: v.firm_category ?? null,
    brand_name: emptyToNull(v.brand_name ?? undefined),
    card_highlight_text: emptyToNull(v.card_highlight_text ?? undefined),
    legal_company_name: emptyToNull(v.legal_company_name ?? undefined),
    owner_name: emptyToNull(v.owner_name ?? undefined),
    company_structure: emptyToNull(v.company_structure ?? undefined),
    corporateness_score: persisted.corporateness_score,
    corporateness_score_breakdown: persisted.corporateness_score_breakdown,
    trust_score: persisted.trust_score,
    phone: v.phone || null,
    whatsapp: v.whatsapp || null,
    email: v.email ?? null,
    website: v.website ?? null,
    instagram: v.instagram || null,
    facebook: v.facebook || null,
    twitter: v.twitter || null,
    linkedin: v.linkedin || null,
    youtube: emptyToNull(v.youtube ?? undefined),
    telegram: v.telegram || null,
    address: v.address || null,
    city: v.city || null,
    district: v.district || null,
    hq_country: v.hq_country || null,
    postal_code: emptyToNull(v.postal_code ?? undefined),
    maps_url: emptyToNull(v.maps_url ?? undefined),
    working_hours: v.working_hours || null,
    weekend_hours_note: v.weekend_hours_note || null,
    contact_person_name: v.contact_person_name || null,
    contact_person_role: v.contact_person_role || null,
    support_email: v.support_email ?? null,
    second_phone: v.second_phone || null,
    second_whatsapp: v.second_whatsapp || null,
    has_landline: v.has_landline,
    supported_languages: v.supported_languages ?? [],
    weekend_support: v.weekend_support,
    show_phone: v.show_phone,
    show_whatsapp: v.show_whatsapp,
    show_email: v.show_email,
    show_website: v.show_website,
    show_address: v.show_address,
    show_working_hours: v.show_working_hours,
    offers_online_service: v.offers_online_service,
    offers_physical_office: v.offers_physical_office,
    offers_remote_support: v.offers_remote_support,
    offers_multilingual_support: v.offers_multilingual_support,
    company_type: v.company_type || null,
    has_tax_document: taxDoc,
    has_tax_certificate: v.has_tax_certificate,
    tax_number: v.tax_number || null,
    tax_office: v.tax_office || null,
    permit_number: licenseVal,
    license_number: licenseVal,
    license_description: v.license_description || null,
    legal_authorization_note: v.legal_authorization_note || null,
    has_physical_office: v.has_physical_office,
    office_address_verified: v.office_address_verified,
    employee_count: v.employee_count ?? null,
    consultant_count: v.consultant_count ?? null,
    support_staff_count: v.support_staff_count ?? null,
    office_count: v.office_count ?? null,
    founded_year: v.founded_year ?? null,
    cities_served_count: v.cities_served_count ?? null,
    has_blog: v.has_blog,
    has_corporate_email: v.has_corporate_email,
    has_corporate_domain: v.has_corporate_domain,
    has_professional_website:
      (v.website_quality_level ?? "none") === "professional",
    website_quality_level: v.website_quality_level ?? "none",
    social_follower_count_total: v.social_follower_count_total ?? 0,
    social_post_count_total: v.social_post_count_total ?? 0,
    schengen_expert: v.schengen_expert,
    usa_visa_expert: v.usa_visa_expert,
    student_visa_support: v.student_visa_support,
    work_visa_support: v.work_visa_support,
    tourist_visa_support: v.tourist_visa_support,
    business_visa_support: v.business_visa_support,
    family_reunion_support: v.family_reunion_support,
    appeal_support: v.appeal_support,
    social_media_activity: v.social_media_activity || null,
    testimonials_level: v.testimonials_level || null,
    multilingual_team: v.multilingual_team,
    international_expertise_level: v.international_expertise_level ?? null,
    profile_completeness: v.profile_completeness ?? null,
    corporate_score_factors: v.corporate_score_factors ?? {},
    profile_has_logo: Boolean(v.logo_url?.trim()),
    profile_has_short_desc: Boolean(v.short_description?.trim()),
    profile_has_long_desc: Boolean(v.description?.trim()),
    profile_has_seo_fields: profileHasSeo,
    about_section: v.about_section || null,
    service_process_text: v.service_process_text || null,
    application_process_text: v.application_process_text || null,
    documents_process_text: v.documents_process_text || null,
    appointment_process_text: v.appointment_process_text || null,
    visa_fees_note: v.visa_fees_note || null,
    why_this_firm: v.why_this_firm || null,
    corporate_summary_box: v.corporate_summary_box || null,
    disclaimer_notice: v.disclaimer_notice || null,
    campaign_text: v.campaign_text || null,
    video_promo_text: v.video_promo_text || null,
    faq_json: v.faq_json ?? [],
    advantages_list: v.advantages_list ?? [],
    show_faq: v.show_faq,
    show_campaign_area: v.show_campaign_area,
    show_process_section: v.show_process_section,
    show_contact_box: v.show_contact_box,
    show_social_section: v.show_social_section,
    status: v.status,
    featured: v.featured,
    show_on_homepage: v.show_on_homepage,
    is_indexable: v.is_indexable,
    show_in_search: v.show_in_search,
    firm_page_enabled: v.firm_page_enabled,
    show_on_card: v.show_on_card,
    contact_popup_enabled: v.contact_popup_enabled,
    quick_apply_enabled: v.quick_apply_enabled,
    social_buttons_enabled: v.social_buttons_enabled,
    sort_priority: v.sort_priority,
    sponsored_display: v.sponsored_display,
    premium_badge: v.premium_badge,
    verified_badge: v.verified_badge,
    seo_title: v.seo_title ?? null,
    focus_keyword: emptyToNull(v.focus_keyword ?? undefined),
    secondary_keywords: emptyToNull(v.secondary_keywords ?? undefined),
    meta_description: v.meta_description ?? null,
    canonical_url: v.canonical_url || null,
    og_title: v.og_title ?? null,
    og_description: v.og_description ?? null,
    og_image_url: v.og_image_url || null,
    custom_cta_text: v.custom_cta_text ?? null,
    page_heading: v.page_heading ?? null,
    page_subheading: v.page_subheading ?? null,
    admin_note: v.admin_note ?? null,
    main_services: [...new Set(v.main_services ?? [])],
    sub_services: [...new Set(v.sub_services ?? [])],
    custom_services: [...new Set(v.custom_service_labels ?? [])],
  };
}

function privateRowPayload(v: FirmFormInput) {
  return {
    admin_evaluation_note: emptyToNull(v.admin_evaluation_note ?? undefined),
    internal_review: emptyToNull(v.internal_review ?? undefined),
    research_notes: emptyToNull(v.research_notes ?? undefined),
    last_meeting_at: emptyToNull(v.last_meeting_at ?? undefined),
    last_reviewed_at: emptyToNull(v.last_reviewed_at ?? undefined),
    status_history_json: v.status_history ?? [],
    team_notes: emptyToNull(v.team_notes ?? undefined),
    updated_at: new Date().toISOString(),
  };
}

async function assertSlugAvailable(
  supabase: SupabaseAdmin,
  slug: string,
  excludeFirmId?: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { data, error } = await supabase
    .from("firms")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: true };
  if (excludeFirmId && data.id === excludeFirmId) return { ok: true };
  return { ok: false, error: "Bu slug başka bir firmada kullanılıyor." };
}

async function upsertFirmAdminPrivate(supabase: SupabaseAdmin, firmId: string, v: FirmFormInput) {
  const row = { firm_id: firmId, ...privateRowPayload(v) };
  const { error } = await supabase.from("firm_admin_private").upsert(row, {
    onConflict: "firm_id",
  });
  if (error) throw new Error(error.message);
}

/**
 * Place ID doluysa görünürlük bayraklarıyla upsert; boşsa satır silinir.
 * API’den gelen puan/yorum/sync alanlarına dokunulmaz (upsert PATCH alanları sınırlı).
 */
async function syncFirmGoogleProfileAdmin(
  supabase: SupabaseAdmin,
  firmId: string,
  v: FirmFormInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const placeId = String(v.google_place_id ?? "").trim();
  if (!placeId) {
    const { error } = await supabase.from("firm_google_profiles").delete().eq("firm_id", firmId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }

  const row = {
    firm_id: firmId,
    google_place_id: placeId,
    show_on_card: Boolean(v.google_maps_show_rating_on_card),
    show_reviews_on_detail: Boolean(v.google_maps_show_reviews_on_detail),
  };

  const { error } = await supabase.from("firm_google_profiles").upsert(row, {
    onConflict: "firm_id",
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

async function syncFirmDenormalized(supabase: SupabaseAdmin, firmId: string) {
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

  const { data: ff } = await supabase
    .from("firm_featured_countries")
    .select("country_id")
    .eq("firm_id", firmId);
  const fids = (ff ?? []).map((r) => r.country_id as string);
  let featuredNames: string[] = [];
  if (fids.length) {
    const { data: countries } = await supabase
      .from("countries")
      .select("name")
      .in("id", fids);
    featuredNames = (countries ?? []).map((c) => c.name as string);
  }

  const { data: firmRow } = await supabase
    .from("firms")
    .select("main_services, sub_services, custom_services")
    .eq("id", firmId)
    .single();

  const main = (firmRow?.main_services as string[] | null) ?? [];
  const sub = (firmRow?.sub_services as string[] | null) ?? [];
  const custom = (firmRow?.custom_services as string[] | null) ?? [];
  const services = [...new Set([...main, ...sub, ...custom])];
  const visa_regions = deriveVisaRegions(countryNames);

  await supabase
    .from("firms")
    .update({
      countries: countryNames,
      featured_countries: featuredNames,
      services,
      visa_regions,
      updated_at: new Date().toISOString(),
    })
    .eq("id", firmId);
}

export async function createFirmFromForm(
  raw: unknown
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };

  /** Kurumsallık skoru `firmRowPayload` içinde sunucuda hesaplanır; gövdede gönderilmez. */
  const parsed = firmFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Geçersiz form" };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const v = parsed.data;

  const slugOk = await assertSlugAvailable(supabase, v.slug);
  if (!slugOk.ok) return { ok: false, error: slugOk.error };

  const customScore = await countActiveTaxonomySlugsForCorporateness(
    supabase,
    v.custom_specialization_slugs ?? []
  );
  const payload = {
    ...firmRowPayload(v, BigInt(0), { customSpecializationScoreCount: customScore }),
    updated_at: new Date().toISOString(),
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

  try {
    await upsertFirmAdminPrivate(supabase, firmId, v);
  } catch (e) {
    await supabase.from("firms").delete().eq("id", firmId);
    return { ok: false, error: e instanceof Error ? e.message : "Özel alanlar kaydedilemedi" };
  }

  if (v.country_ids.length) {
    await supabase.from("firm_countries").insert(
      v.country_ids.map((country_id) => ({ firm_id: firmId, country_id }))
    );
  }
  if (v.featured_country_ids.length) {
    await supabase.from("firm_featured_countries").insert(
      v.featured_country_ids.map((country_id) => ({ firm_id: firmId, country_id }))
    );
  }
  await supabase.from("firm_service_types").delete().eq("firm_id", firmId);

  await syncFirmDenormalized(supabase, firmId);

  const specSync = await replaceFirmSpecializationCustom(
    supabase,
    firmId,
    v.custom_specialization_slugs ?? []
  );
  if (!specSync.ok) {
    console.error("[createFirmFromForm] specialization junction:", specSync.error);
  }

  const gpSync = await syncFirmGoogleProfileAdmin(supabase, firmId, v);
  if (!gpSync.ok) {
    console.error("[createFirmFromForm] firm_google_profiles:", gpSync.error);
    return { ok: false, error: gpSync.error };
  }

  const recalc = await recalculateCorporatenessScoreWithClient(supabase, firmId, {
    revalidate: false,
  });
  if (!recalc.ok) {
    console.error("[createFirmFromForm] recalculateCorporatenessScore:", recalc.error);
  }

  await logAdminActivity(supabase, ctx.userId, "firm.created", "firm", firmId, {
    name: v.name,
  });

  revalidatePath("/");
  revalidatePath("/admin/firms");
  revalidatePath(`/firma/${v.slug}`);
  if (v.status === "published") {
    scheduleIndexNowForFirmSlugs([v.slug]);
  }
  return { ok: true, id: firmId };
}

export async function updateFirmFromForm(
  firmId: string,
  raw: unknown
): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };

  /** Kurumsallık skoru `firmRowPayload` içinde sunucuda hesaplanır; gövdede gönderilmez. */
  const parsed = firmFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Geçersiz form" };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const v = parsed.data;

  const slugOk = await assertSlugAvailable(supabase, v.slug, firmId);
  if (!slugOk.ok) return { ok: false, error: slugOk.error };

  const { data: priorHype } = await supabase
    .from("firms")
    .select("hype_score, raw_hype_score")
    .eq("id", firmId)
    .maybeSingle();

  const hypeForTrust = resolveHypeBigintFromRow((priorHype ?? {}) as Record<string, unknown>);
  const customScore = await countActiveTaxonomySlugsForCorporateness(
    supabase,
    v.custom_specialization_slugs ?? []
  );
  const payload = {
    ...firmRowPayload(v, hypeForTrust, { customSpecializationScoreCount: customScore }),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("firms").update(payload).eq("id", firmId);

  if (error) return { ok: false, error: error.message };

  try {
    await upsertFirmAdminPrivate(supabase, firmId, v);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Özel alanlar kaydedilemedi" };
  }

  await supabase.from("firm_countries").delete().eq("firm_id", firmId);
  await supabase.from("firm_featured_countries").delete().eq("firm_id", firmId);
  await supabase.from("firm_service_types").delete().eq("firm_id", firmId);

  if (v.country_ids.length) {
    await supabase.from("firm_countries").insert(
      v.country_ids.map((country_id) => ({ firm_id: firmId, country_id }))
    );
  }
  if (v.featured_country_ids.length) {
    await supabase.from("firm_featured_countries").insert(
      v.featured_country_ids.map((country_id) => ({ firm_id: firmId, country_id }))
    );
  }

  await syncFirmDenormalized(supabase, firmId);

  const specSync = await replaceFirmSpecializationCustom(
    supabase,
    firmId,
    v.custom_specialization_slugs ?? []
  );
  if (!specSync.ok) {
    console.error("[updateFirmFromForm] specialization junction:", specSync.error);
  }

  const gpSync = await syncFirmGoogleProfileAdmin(supabase, firmId, v);
  if (!gpSync.ok) {
    return { ok: false, error: gpSync.error };
  }

  const recalc = await recalculateCorporatenessScoreWithClient(supabase, firmId, {
    revalidate: false,
  });
  if (!recalc.ok) {
    console.error("[updateFirmFromForm] recalculateCorporatenessScore:", recalc.error);
  }

  await logAdminActivity(supabase, ctx.userId, "firm.updated", "firm", firmId, {
    name: v.name,
  });

  revalidatePath("/");
  revalidatePath("/admin/firms");
  revalidatePath(`/firma/${v.slug}`);
  if (v.status === "published") {
    scheduleIndexNowForFirmSlugs([v.slug]);
  }
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

  const { data: row, error } = await supabase
    .from("firms")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", firmId)
    .select("slug")
    .maybeSingle();
  if (error) return { ok: false, error: error.message };

  await logAdminActivity(supabase, ctx.userId, `firm.status.${status}`, "firm", firmId, null);
  revalidatePath("/");
  revalidatePath("/admin/firms");
  if (status === "published" && row?.slug) {
    scheduleIndexNowForFirmSlugs([String(row.slug)]);
  }
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
    const { data: rows, error } = await supabase
      .from("firms")
      .update({ status, updated_at: new Date().toISOString() })
      .in("id", ids)
      .select("slug");
    if (error) return { ok: false, error: error.message };
    await logAdminActivity(supabase, ctx.userId, `firm.bulk_${status}`, "firm", null, {
      count: ids.length,
    });
    if (action === "publish" && rows?.length) {
      scheduleIndexNowForFirmSlugs(rows.map((r) => String(r.slug ?? "")));
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/firms");
  return { ok: true };
}

const MEDIA_KINDS = new Set([
  "logo",
  "cover",
  "gallery",
  "office",
  "team",
  "document",
  "promo",
]);

export async function uploadFirmMedia(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const ctx = await getAdminContext();
  if (!ctx) return { ok: false, error: "Yetkisiz" };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Dosya yok" };
  }

  const rawKind = String(formData.get("kind") ?? "logo");
  const kind = MEDIA_KINDS.has(rawKind) ? rawKind : "gallery";
  const firmIdRaw = formData.get("firmId");
  const firmId =
    typeof firmIdRaw === "string" && firmIdRaw.length >= 32 ? firmIdRaw : null;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase yapılandırması eksik" };

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  if (!["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) {
    return { ok: false, error: "Yalnızca PNG, JPG, WebP veya GIF" };
  }

  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const path = firmId
    ? `firms/${firmId}/${kind}/${stamp}.${ext}`
    : `pending/${ctx.userId}/${kind}/${stamp}.${ext}`;

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

export async function uploadFirmLogo(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  formData.set("kind", "logo");
  return uploadFirmMedia(formData);
}
