import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Anonim kullanıcı için HttpOnly çerez. İstemci doğrudan okuyamaz;
 * tüm AI istek doğrulamaları sunucu tarafında bu çerez üzerinden yapılır.
 * Süre: 90 gün — Akıllı Asistan geçmişine dönüş için yeterli.
 */
const ANON_COOKIE_NAME = "vf_aai_anon" as const;
const ANON_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

export type AiAssistantOwner =
  | { kind: "auth"; user_id: string; anonymous_id: null }
  | { kind: "anon"; user_id: null; anonymous_id: string };

/**
 * Aktif kullanıcı varsa user_id; yoksa anon çerezini okur (gerekirse oluşturur)
 * ve anonymous_id döner. Server action / API route içinden çağrılır.
 */
export async function resolveAiAssistantOwner(): Promise<AiAssistantOwner> {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user?.id) {
      return { kind: "auth", user_id: data.user.id, anonymous_id: null };
    }
  }

  const jar = await cookies();
  const existing = jar.get(ANON_COOKIE_NAME)?.value?.trim();
  /** 8–128 karakter aralığı `ai_sessions_owner_present` constraint'iyle hizalı. */
  const valid =
    existing && existing.length >= 8 && existing.length <= 128 ? existing : null;

  if (valid) {
    return { kind: "anon", user_id: null, anonymous_id: valid };
  }

  const fresh = randomUUID();
  try {
    jar.set({
      name: ANON_COOKIE_NAME,
      value: fresh,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ANON_COOKIE_MAX_AGE,
    });
  } catch {
    /** RSC bağlamında set bazen reddedilir; ilk POST/GET route'ta yine yazılır. */
  }
  return { kind: "anon", user_id: null, anonymous_id: fresh };
}

/**
 * Yalnızca okuma; cookie yoksa null. Mevcut session sahipliğini doğrulamada kullanılır.
 */
export async function readAiAssistantOwner(): Promise<AiAssistantOwner | null> {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user?.id) {
      return { kind: "auth", user_id: data.user.id, anonymous_id: null };
    }
  }

  const jar = await cookies();
  const existing = jar.get(ANON_COOKIE_NAME)?.value?.trim();
  if (existing && existing.length >= 8 && existing.length <= 128) {
    return { kind: "anon", user_id: null, anonymous_id: existing };
  }
  return null;
}
