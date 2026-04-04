"use server";

import { revalidatePath } from "next/cache";

import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import {
  FIRM_FEED_POST_DAILY_PUBLISH_LIMIT,
  firmFeedPostDraftSchema,
  firmFeedPostPublishSchema,
} from "@/lib/validations/firm-feed-post";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

function startOfUtcDayIso(): string {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0)).toISOString();
}

export async function uploadFirmFeedPostImage(
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
  const path = `firms/${firmId}/feed-posts/${stamp}.${ext}`;
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

export async function saveFirmFeedPostDraft(input: {
  firmId: string;
  postId?: string | null;
  body: string;
  imageUrls: string[];
  ctaButtons: unknown;
  tags: string[];
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const firmId = input.firmId.trim();
  if (!firmId) return { ok: false, error: "Geçersiz firma." };

  await requireFirmPanelAccess(firmId);

  const parsed = firmFeedPostDraftSchema.safeParse({
    body: input.body,
    imageUrls: input.imageUrls,
    ctaButtons: input.ctaButtons,
    tags: input.tags,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Geçersiz veri." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu bağlantısı kurulamadı." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { ok: false, error: "Oturum gerekli." };

  const v = parsed.data;
  const row = {
    body: v.body,
    image_urls: v.imageUrls,
    cta_buttons: v.ctaButtons.map((b) => ({
      id: b.id,
      platform: b.platform,
      label: b.label,
      url: b.url,
      sort_order: b.sort_order,
      is_enabled: b.is_enabled,
    })),
    link_url: null,
    link_label: null,
    tags: v.tags,
    status: "draft" as const,
    updated_at: new Date().toISOString(),
  };

  const existingId = input.postId?.trim();
  if (existingId) {
    const { data: existing } = await supabase
      .from("firm_feed_posts")
      .select("id,status")
      .eq("id", existingId)
      .eq("firm_id", firmId)
      .maybeSingle();
    if (!existing) return { ok: false, error: "Taslak bulunamadı." };
    if (String(existing.status) === "published") {
      return { ok: false, error: "Yayınlanmış gönderi taslak olarak kaydedilemez." };
    }
    const { error } = await supabase.from("firm_feed_posts").update(row).eq("id", existingId);
    if (error) return { ok: false, error: error.message };
    await revalidateFeedPaths(firmId);
    return { ok: true, id: existingId };
  }

  const { data, error } = await supabase
    .from("firm_feed_posts")
    .insert({
      firm_id: firmId,
      created_by: user.id,
      ...row,
    })
    .select("id")
    .single();
  if (error || !data?.id) return { ok: false, error: error?.message ?? "Kayıt oluşturulamadı." };
  await revalidateFeedPaths(firmId);
  return { ok: true, id: String(data.id) };
}

export async function publishFirmFeedPost(input: {
  firmId: string;
  postId?: string | null;
  body: string;
  imageUrls: string[];
  ctaButtons: unknown;
  tags: string[];
}): Promise<
  { ok: true; id: string; newHypeScore?: number } | { ok: false; error: string }
> {
  const firmId = input.firmId.trim();
  if (!firmId) return { ok: false, error: "Geçersiz firma." };

  await requireFirmPanelAccess(firmId);

  const parsed = firmFeedPostPublishSchema.safeParse({
    body: input.body,
    imageUrls: input.imageUrls,
    ctaButtons: input.ctaButtons,
    tags: input.tags,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Geçersiz veri." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu bağlantısı kurulamadı." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { ok: false, error: "Oturum gerekli." };

  const dayStart = startOfUtcDayIso();
  const { count: todayCount, error: countErr } = await supabase
    .from("firm_feed_posts")
    .select("id", { count: "exact", head: true })
    .eq("firm_id", firmId)
    .eq("status", "published")
    .gte("published_at", dayStart);
  if (countErr) return { ok: false, error: countErr.message };
  if ((todayCount ?? 0) >= FIRM_FEED_POST_DAILY_PUBLISH_LIMIT) {
    return {
      ok: false,
      error: `Günlük yayın limitine ulaştınız (en fazla ${FIRM_FEED_POST_DAILY_PUBLISH_LIMIT} gönderi).`,
    };
  }

  const v = parsed.data;
  const publishRow = {
    body: v.body.trim(),
    image_urls: v.imageUrls,
    cta_buttons: v.ctaButtons.map((b) => ({
      id: b.id,
      platform: b.platform,
      label: b.label,
      url: b.url,
      sort_order: b.sort_order,
      is_enabled: b.is_enabled,
    })),
    link_url: null,
    link_label: null,
    tags: v.tags,
    status: "published" as const,
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  let postId = input.postId?.trim() ?? "";

  if (postId) {
    const { data: existing } = await supabase
      .from("firm_feed_posts")
      .select("id,status,hype_points_awarded")
      .eq("id", postId)
      .eq("firm_id", firmId)
      .maybeSingle();
    if (!existing) return { ok: false, error: "Gönderi bulunamadı." };
    if (String(existing.status) === "published" && Boolean(existing.hype_points_awarded)) {
      return { ok: false, error: "Bu gönderi zaten yayında." };
    }
    const { error } = await supabase.from("firm_feed_posts").update(publishRow).eq("id", postId);
    if (error) return { ok: false, error: error.message };
  } else {
    const { data, error } = await supabase
      .from("firm_feed_posts")
      .insert({
        firm_id: firmId,
        created_by: user.id,
        ...publishRow,
      })
      .select("id")
      .single();
    if (error || !data?.id) return { ok: false, error: error?.message ?? "Yayınlanamadı." };
    postId = String(data.id);
  }

  const { data: hypeResult, error: hypeErr } = await supabase.rpc("award_firm_feed_post_hype", {
    p_post_id: postId,
  });
  if (hypeErr) {
    console.error("[publishFirmFeedPost] award_firm_feed_post_hype", hypeErr.message);
  }
  const hypePayload = (hypeResult ?? {}) as { ok?: boolean; new_hype_score?: number; reason?: string };
  const newHype =
    hypePayload.ok === true && typeof hypePayload.new_hype_score === "number"
      ? hypePayload.new_hype_score
      : undefined;

  await revalidateFeedPaths(firmId);
  return { ok: true, id: postId, newHypeScore: newHype };
}

async function revalidateFeedPaths(firmId: string) {
  const supabase = await createSupabaseServerClient();
  let slug: string | null = null;
  if (supabase) {
    const { data } = await supabase.from("firms").select("slug").eq("id", firmId).maybeSingle();
    slug = data?.slug ? String(data.slug) : null;
  }
  revalidatePath("/");
  revalidatePath("/akis");
  revalidatePath(`/panel/${firmId}/paylasim`);
  revalidatePath(`/panel/${firmId}/gonderi-olustur`);
  if (slug) revalidatePath(`/firma/${slug}`);
}
