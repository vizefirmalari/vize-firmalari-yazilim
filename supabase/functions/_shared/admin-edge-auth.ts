import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

export type AdminAuthOk = {
  ok: true;
  userId: string;
  service: SupabaseClient;
};

export type AdminAuthFail = {
  ok: false;
  status: number;
  message: string;
};

/**
 * İstek başlığındaki kullanıcı JWT’sini doğrular; `profiles.role === 'admin'` ise
 * service_role istemci döner (RLS üstü DB yazımı).
 */
export async function requireAdminServiceClient(
  req: Request
): Promise<AdminAuthOk | AdminAuthFail> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim() ?? "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim() ?? "";

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return {
      ok: false,
      status: 500,
      message: "Supabase ortam değişkenleri eksik.",
    };
  }

  const auth = req.headers.get("Authorization")?.trim() ?? "";
  if (!auth.startsWith("Bearer ")) {
    return { ok: false, status: 401, message: "Authorization gerekli." };
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: auth } },
  });
  const {
    data: { user },
    error: uErr,
  } = await userClient.auth.getUser();
  if (uErr || !user?.id) {
    return { ok: false, status: 401, message: "Oturum geçersiz veya süresi dolmuş." };
  }

  const service = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: prof, error: pErr } = await service
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (pErr || (prof as { role?: string } | null)?.role !== "admin") {
    return { ok: false, status: 403, message: "Yalnız yöneticiler bu işlemi yapabilir." };
  }

  return { ok: true, userId: user.id, service };
}
