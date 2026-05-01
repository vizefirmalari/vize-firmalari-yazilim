"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { after } from "next/server";

import { sanitizeFirmBlogBodyRichForStorage } from "@/lib/blog/firm-blog-body-html";
import { stripFaqAnswerToPlainText } from "@/lib/blog/firm-blog-faq";
import { normalizeBlogCtaButtons } from "@/lib/blog/cta-buttons";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import { absoluteUrl } from "@/lib/seo/canonical";
import { submitIndexNowUrls } from "@/lib/seo/indexnow";
import { FIRM_BLOG_COVER_MAX_BYTES, FIRM_BLOG_COVER_MAX_MB } from "@/lib/blog/firm-blog-cover-limits";

type SaveMode = "draft" | "scheduled" | "published";

type SavePayload = {
  postId?: string | null;
  firmId: string;
  mode: SaveMode;
  title: string;
  slug: string;
  categoryId: string;
  summary: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  metaDescription: string;
  bodyRich: string;
  bodyPlainText: string;
  tags: string[];
  faqItems: Array<{
    id?: string;
    question: string;
    answer: string;
    cta_buttons?: unknown[];
  }>;
  relatedCountries: string[];
  relatedVisaTypes: string[];
  ctaButtons: unknown[];
  scheduledAt?: string | null;
  publishAt?: string | null;
};

function uniqueText(values: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const v of values) {
    const t = v.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/** Akış / arama / keşfet ve firma blog detayı önbelleğini günceller. */
function revalidateFirmBlogPublicSurfaces(opts: {
  firmId: string;
  firmSlug: string | null;
  postSlug: string | null;
}) {
  const { firmId, firmSlug, postSlug } = opts;
  revalidatePath("/");
  revalidatePath("/akis");
  revalidatePath("/arama");
  revalidatePath("/kesfet");
  try {
    revalidatePath("/akis", "layout");
    revalidatePath("/kesfet", "layout");
  } catch {
    /* Next sürümüne bağlı */
  }
  revalidatePath("/api/feed/items");
  revalidatePath(`/panel/${firmId}/paylasim`);
  revalidatePath(`/panel/${firmId}/paylasim/blog`);
  if (firmSlug) {
    revalidatePath(`/firma/${firmSlug}`);
    try {
      revalidatePath(`/firma/${firmSlug}`, "layout");
    } catch {
      /* ignore */
    }
    if (postSlug) {
      revalidatePath(`/firma/${firmSlug}/blog/${postSlug}`);
    }
  }
}

function isMissingColumnError(error: { message?: string } | null): boolean {
  const msg = String(error?.message ?? "").toLowerCase();
  return msg.includes("could not find the") && msg.includes("column");
}

export async function saveFirmBlogPost(
  payload: SavePayload
): Promise<{ ok: true; id: string; status: SaveMode } | { ok: false; error: string }> {
  const firmId = payload.firmId.trim();
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu bağlantısı kurulamadı." };
  const adminSupabase = createSupabaseServiceRoleClient() ?? supabase;

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) return { ok: false, error: "Oturum gerekli." };

  const { data: firm, error: firmErr } = await supabase
    .from("firms")
    .select("id, name, brand_name, logo_url, slug")
    .eq("id", firmId)
    .maybeSingle();
  if (firmErr || !firm) return { ok: false, error: "Firma bulunamadı." };

  const title = payload.title.trim();
  const slug = payload.slug.trim().toLowerCase();
  const categoryId = payload.categoryId.trim();
  const summary = payload.summary.trim();
  const metaDescription = payload.metaDescription.trim();
  const bodyRich = sanitizeFirmBlogBodyRichForStorage(payload.bodyRich.trim());
  const bodyPlainText = payload.bodyPlainText.trim();
  const faqItems = payload.faqItems
    .map((x) => {
      const id = typeof x.id === "string" && x.id.trim() ? x.id.trim() : randomUUID();
      return {
        id,
        question: x.question.trim(),
        answer: sanitizeFirmBlogBodyRichForStorage(x.answer.trim()),
        cta_buttons: normalizeBlogCtaButtons(x.cta_buttons ?? []),
      };
    })
    .filter(
      (x) => x.question.length > 0 && stripFaqAnswerToPlainText(x.answer).length > 0
    );

  if (!title || title.length < 8) return { ok: false, error: "Başlık çok kısa." };
  if (!slug || slug.length < 3) return { ok: false, error: "Geçerli bir slug girin." };
  if (!categoryId) return { ok: false, error: "Kategori seçimi zorunlu." };
  if (summary.length > 150) {
    return { ok: false, error: "Akış açıklaması en fazla 150 karakter olabilir." };
  }
  if (!bodyPlainText || bodyPlainText.length < 80) {
    return { ok: false, error: "İçerik gövdesi yeterli değil." };
  }
  if (faqItems.length < 2) {
    return { ok: false, error: "En az 2 adet tamamlanmış SSS (soru + yanıt) zorunlu." };
  }
  if (!metaDescription || metaDescription.length < 60) {
    return { ok: false, error: "Meta açıklama çok kısa." };
  }
  if (payload.mode === "published" && !payload.coverImageUrl?.trim()) {
    return { ok: false, error: "Yayınlamak için hero görsel zorunlu." };
  }

  let scheduledAt: string | null = null;
  let publishedAt: string | null = null;
  if (payload.mode === "scheduled" || payload.mode === "published") {
    // İstemci `datetime-local` → UTC ISO (`toISOString`) göndermeli; sunucu TZ’si ile parse edilmez.
    const rawPublishAt = payload.publishAt?.trim() || payload.scheduledAt?.trim() || "";
    if (!rawPublishAt) {
      return { ok: false, error: "Yayınlanma zamanı zorunlu." };
    }
    const dt = new Date(rawPublishAt);
    if (Number.isNaN(dt.getTime())) return { ok: false, error: "Geçersiz yayınlanma zamanı." };
    const iso = dt.toISOString();
    if (payload.mode === "scheduled") scheduledAt = iso;
    if (payload.mode === "published") publishedAt = iso;
  }

  const nowIso = new Date().toISOString();
  const status: SaveMode = payload.mode;
  const finalPublishedAt = status === "published" ? (publishedAt ?? nowIso) : null;
  const finalScheduledAt = status === "scheduled" ? scheduledAt : null;

  const rowBase = {
    firm_id: firmId,
    created_by: user.id,
    title,
    slug,
    category_id: categoryId,
    summary, // Feed description olarak da kullanılır.
    body_rich: bodyRich,
    body_plain_text: bodyPlainText,
    cover_image_url: payload.coverImageUrl?.trim() || null,
    cover_image_alt: payload.coverImageAlt?.trim() || "",
    meta_description: metaDescription,
    status,
    scheduled_at: finalScheduledAt,
    published_at: finalPublishedAt,
    tags: uniqueText(payload.tags),
    faq_items: faqItems,
    related_countries: uniqueText(payload.relatedCountries),
    related_visa_types: uniqueText(payload.relatedVisaTypes),
    cta_buttons: normalizeBlogCtaButtons(payload.ctaButtons),
    author_display_name: (firm.brand_name as string | null) || (firm.name as string),
    company_name: (firm.name as string) || "",
    company_logo_url: (firm.logo_url as string | null) ?? null,
    updated_at: nowIso,
  };
  const faqSchemaJson =
    faqItems.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: stripFaqAnswerToPlainText(item.answer),
            },
          })),
        }
      : null;

  let savedId = payload.postId?.trim() || "";
  if (savedId) {
    let { error } = await adminSupabase
      .from("firm_blog_posts")
      .update({ ...rowBase, company_slug: String(firm.slug ?? ""), faq_schema_json: faqSchemaJson })
      .eq("id", savedId)
      .eq("firm_id", firmId);
    if (isMissingColumnError(error)) {
      const retry = await adminSupabase
        .from("firm_blog_posts")
        .update(rowBase)
        .eq("id", savedId)
        .eq("firm_id", firmId);
      error = retry.error;
    }
    if (error) return { ok: false, error: error.message };
  } else {
    let { data, error } = await adminSupabase
      .from("firm_blog_posts")
      .insert({ ...rowBase, company_slug: String(firm.slug ?? ""), faq_schema_json: faqSchemaJson })
      .select("id")
      .single();
    if (isMissingColumnError(error)) {
      const retry = await adminSupabase
        .from("firm_blog_posts")
        .insert(rowBase)
        .select("id")
        .single();
      data = retry.data;
      error = retry.error;
    }
    if (error || !data?.id) return { ok: false, error: error?.message ?? "Blog kaydı oluşturulamadı." };
    savedId = String(data.id);
  }

  if (status === "published") {
    const { data: hypeResult, error: hypeErr } = await supabase.rpc("award_firm_blog_post_hype", {
      p_post_id: savedId,
    });
    if (hypeErr) {
      console.error("[saveFirmBlogPost] award_firm_blog_post_hype", hypeErr.message);
    } else {
      const payload = (hypeResult ?? {}) as { ok?: boolean; reason?: string };
      if (payload.ok === false && process.env.NODE_ENV === "development") {
        console.info("[saveFirmBlogPost] hype not applied:", payload.reason);
      }
    }
  }

  revalidateFirmBlogPublicSurfaces({
    firmId,
    firmSlug: firm.slug ? String(firm.slug) : null,
    postSlug: slug,
  });

  if (status === "published" && firm.slug) {
    const blogUrl = absoluteUrl(`/firma/${String(firm.slug)}/blog/${slug}`);
    after(() => submitIndexNowUrls([blogUrl]));
  }

  return { ok: true, id: savedId, status };
}

/**
 * Yayınlanmış tüm blog yazıları için ortak önbellik yenilemesi.
 * `firm_blog_posts.cover_image_url` tekil tablodur; akış ayrı bir `feed_items` satırı kullanmaz.
 */
export async function revalidateFirmBlogCachesForFirm(
  firmIdRaw: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const firmId = firmIdRaw.trim();
  if (!firmId) return { ok: false, error: "Geçersiz firma." };
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu bağlantısı kurulamadı." };
  const adminSupabase = createSupabaseServiceRoleClient() ?? supabase;

  const { data: firmRow } = await adminSupabase
    .from("firms")
    .select("slug")
    .eq("id", firmId)
    .maybeSingle();
  const firmSlug = firmRow?.slug ? String(firmRow.slug) : null;

  const { data: published } = await adminSupabase
    .from("firm_blog_posts")
    .select("slug")
    .eq("firm_id", firmId)
    .eq("status", "published")
    .not("published_at", "is", null);

  revalidatePath("/");
  revalidatePath("/akis");
  revalidatePath("/arama");
  revalidatePath("/kesfet");
  try {
    revalidatePath("/akis", "layout");
    revalidatePath("/kesfet", "layout");
  } catch {
    /* ignore */
  }
  revalidatePath("/api/feed/items");
  revalidatePath(`/panel/${firmId}/paylasim`);
  revalidatePath(`/panel/${firmId}/paylasim/blog`);
  if (firmSlug) {
    revalidatePath(`/firma/${firmSlug}`);
    try {
      revalidatePath(`/firma/${firmSlug}`, "layout");
    } catch {
      /* ignore */
    }
    for (const row of published ?? []) {
      const ps = String((row as { slug?: string }).slug ?? "").trim();
      if (ps) revalidatePath(`/firma/${firmSlug}/blog/${ps}`);
    }
  }

  return { ok: true };
}

/**
 * Sadece `cover_image_url` günceller; slug/SEO/metadata/yayın içeriği değişmez.
 * Panel upload sonrası DB ile senkron ve ön yüz önbelliği güncellenir.
 */
export async function updateFirmBlogCoverOnly(payload: {
  firmId: string;
  postId: string;
  coverImageUrl: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const firmId = payload.firmId.trim();
  const postId = payload.postId.trim();
  if (!firmId || !postId) return { ok: false, error: "Geçersiz istek." };

  await requireFirmPanelAccess(firmId);

  const rawTrimmed =
    payload.coverImageUrl === null || payload.coverImageUrl === undefined
      ? ""
      : String(payload.coverImageUrl).trim();

  if (!rawTrimmed) {
    return { ok: false, error: "Yeni kapak için geçerli bir HTTPS URL gerekli." };
  }
  if (rawTrimmed.length > 2048 || !/^https:\/\/.+/i.test(rawTrimmed)) {
    return { ok: false, error: "Geçersiz görsel bağlantısı (HTTPS, doğrudan URL gerekli)." };
  }
  const lower = rawTrimmed.toLowerCase();
  if (lower.includes("/storage/v1/render/") || lower.includes("/render/image")) {
    return {
      ok: false,
      error:
        "Dönüştürülmüş/thumbnail bağlantıları kullanılmaz; yalnızca orijinal depo (public) adresi kabul edilir.",
    };
  }
  const coverImageUrl = rawTrimmed;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu bağlantısı kurulamadı." };
  const adminSupabase = createSupabaseServiceRoleClient() ?? supabase;

  const { data: postRow, error: postErr } = await adminSupabase
    .from("firm_blog_posts")
    .select("id, slug, cover_image_url")
    .eq("id", postId)
    .eq("firm_id", firmId)
    .maybeSingle();
  if (postErr || !postRow?.id) {
    return { ok: false, error: postErr?.message ?? "Yazı bulunamadı." };
  }

  const oldUrl = String(postRow.cover_image_url ?? "").trim();
  if (oldUrl === coverImageUrl) {
    return {
      ok: false,
      error:
        "Yeni dosya farklı bir adreste olmalı (veritabanındaki URL ile aynı). Yüklemeyi tekrar deneyin.",
    };
  }

  const { data: firmRow } = await adminSupabase
    .from("firms")
    .select("slug")
    .eq("id", firmId)
    .maybeSingle();

  const nowIso = new Date().toISOString();
  const { error } = await adminSupabase
    .from("firm_blog_posts")
    .update({ cover_image_url: coverImageUrl, updated_at: nowIso })
    .eq("id", postId)
    .eq("firm_id", firmId);
  if (error) return { ok: false, error: error.message };

  revalidateFirmBlogPublicSurfaces({
    firmId,
    firmSlug: firmRow?.slug ? String(firmRow.slug) : null,
    postSlug: postRow.slug ? String(postRow.slug) : null,
  });

  return { ok: true };
}

export async function uploadFirmBlogCoverImage(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const firmIdRaw = formData.get("firmId");
  const firmId = typeof firmIdRaw === "string" ? firmIdRaw.trim() : "";
  if (!firmId) return { ok: false, error: "Geçersiz firma." };

  await requireFirmPanelAccess(firmId);

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Dosya seçilmedi." };
  }
  if (file.size > FIRM_BLOG_COVER_MAX_BYTES) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      ok: false,
      error: `Kapak görseli çok büyük (${mb} MB). En fazla ${FIRM_BLOG_COVER_MAX_MB} MB yükleyebilirsiniz; JPEG veya WebP sıkıştırılmış dosya kullanın.`,
    };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  if (!["png", "jpg", "jpeg", "webp"].includes(ext)) {
    return { ok: false, error: "Yalnızca PNG, JPG veya WebP yükleyin." };
  }

  const serviceRole = createSupabaseServiceRoleClient();
  const supabase = serviceRole ?? (await createSupabaseServerClient());
  if (!supabase) return { ok: false, error: "Sunucu bağlantısı kurulamadı." };

  const fileId = `${Date.now()}-${randomUUID().replace(/-/g, "").slice(0, 16)}`;
  const path = `firms/${firmId}/blog-cover/${fileId}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from("media").upload(path, buffer, {
    contentType: file.type || "application/octet-stream",
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) return { ok: false, error: error.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);
  return { ok: true, url: publicUrl };
}
