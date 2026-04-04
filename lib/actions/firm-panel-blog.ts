"use server";

import { revalidatePath } from "next/cache";

import { normalizeBlogCtaButtons } from "@/lib/blog/cta-buttons";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

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
  faqItems: Array<{ question: string; answer: string }>;
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
  const bodyRich = payload.bodyRich.trim();
  const bodyPlainText = payload.bodyPlainText.trim();
  const words = bodyPlainText.split(/\s+/).map((s) => s.trim()).filter(Boolean).length;
  const faqItems = payload.faqItems
    .map((x) => ({ question: x.question.trim(), answer: x.answer.trim() }))
    .filter((x) => x.question.length > 0 || x.answer.length > 0);

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
    return { ok: false, error: "En az 2 adet SSS girişi zorunlu." };
  }
  const invalidFaq = faqItems.some(
    (item) =>
      item.question.length < 10 ||
      item.question.length > 120 ||
      item.answer.length < 50 ||
      item.answer.length > 400
  );
  if (invalidFaq) {
    return { ok: false, error: "SSS alanında soru/yanıt karakter sınırlarını kontrol edin." };
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
              text: item.answer,
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

  revalidatePath("/");
  revalidatePath("/akis");
  revalidatePath(`/panel/${firmId}/paylasim`);
  revalidatePath(`/panel/${firmId}/paylasim/blog`);
  revalidatePath(`/firma/${String(firm.slug)}`);

  return { ok: true, id: savedId, status };
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

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  if (!["png", "jpg", "jpeg", "webp"].includes(ext)) {
    return { ok: false, error: "Yalnızca PNG, JPG veya WebP yükleyin." };
  }

  const serviceRole = createSupabaseServiceRoleClient();
  const supabase = serviceRole ?? (await createSupabaseServerClient());
  if (!supabase) return { ok: false, error: "Sunucu bağlantısı kurulamadı." };

  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const path = `firms/${firmId}/blog-cover/${stamp}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from("media").upload(path, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: true,
  });
  if (error) return { ok: false, error: error.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);
  return { ok: true, url: publicUrl };
}
