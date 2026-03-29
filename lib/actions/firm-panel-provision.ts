"use server";

import { randomBytes } from "crypto";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export type ProvisionFirmPanelResult =
  | {
      ok: true;
      password: string;
      kind: "created" | "updated";
      userId: string;
    }
  | { ok: false; error: string };

/**
 * Güçlü rastgele şifre (harf, rakam, özel karakter).
 */
function generateStrongPassword(): string {
  const base = randomBytes(18).toString("base64url");
  return `${base.slice(0, 10)}Aa1!${base.slice(10, 18)}`;
}

/**
 * Supabase Auth’ta kullanıcı oluşturur veya şifresini günceller; firmaya panel üyeliği ekler.
 * `SUPABASE_SERVICE_ROLE_KEY` gerekir (.env.local).
 */
export async function provisionFirmPanelAccount(
  firmId: string,
  email: string
): Promise<ProvisionFirmPanelResult> {
  const ctx = await requireAdmin();
  const adminClient = createSupabaseServiceRoleClient();
  if (!adminClient) {
    return {
      ok: false,
      error:
        "Sunucuda SUPABASE_SERVICE_ROLE_KEY tanımlı değil. Vercel / .env.local içine ekleyin veya yalnızca e-posta daveti kullanın.",
    };
  }

  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) {
    return { ok: false, error: "Geçerli bir e-posta girin." };
  }

  const password = generateStrongPassword();

  const { data: created, error: createErr } = await adminClient.auth.admin.createUser({
    email: normalized,
    password,
    email_confirm: true,
  });

  let userId: string | null = created.user?.id ?? null;
  let kind: "created" | "updated" = "created";

  if (createErr) {
    const msg = createErr.message?.toLowerCase() ?? "";
    const exists =
      msg.includes("registered") ||
      msg.includes("already") ||
      msg.includes("duplicate");
    if (!exists) {
      return { ok: false, error: createErr.message };
    }

    const { data: list, error: listErr } = await adminClient.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (listErr) {
      return { ok: false, error: listErr.message };
    }
    const found = list.users.find((u) => (u.email ?? "").toLowerCase() === normalized);
    if (!found) {
      return { ok: false, error: "Kullanıcı bulunamadı; lütfen tekrar deneyin." };
    }
    userId = found.id;
    kind = "updated";

    const { error: updErr } = await adminClient.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
    });
    if (updErr) {
      return { ok: false, error: updErr.message };
    }
  }

  if (!userId) {
    return { ok: false, error: "Kullanıcı oluşturulamadı." };
  }

  const { error: memErr } = await adminClient.from("firm_panel_members").upsert(
    {
      firm_id: firmId,
      user_id: userId,
      role: "owner",
      status: "active",
      created_by: ctx.userId,
    },
    { onConflict: "firm_id,user_id", ignoreDuplicates: false }
  );

  if (memErr) {
    return { ok: false, error: memErr.message };
  }

  await adminClient
    .from("firm_panel_invitations")
    .update({ status: "cancelled" })
    .eq("firm_id", firmId)
    .eq("email", normalized)
    .eq("status", "pending");

  revalidatePath("/admin/firm-panel");
  revalidatePath(`/admin/firms/${firmId}/panel`);
  revalidatePath("/panel");

  return { ok: true, password, kind, userId };
}

/** Davet + RPC ile aynı sonuç (service role olmadan). */
export async function assignFirmPanelInviteOnly(firmId: string, email: string) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false as const, error: "Yapılandırma eksik" };
  const { data, error } = await supabase.rpc("admin_assign_firm_panel_by_email", {
    p_firm_id: firmId,
    p_email: email.trim(),
  });
  if (error) return { ok: false as const, error: error.message };
  const kind = (data as { kind?: string })?.kind;
  revalidatePath("/admin/firm-panel");
  return { ok: true as const, kind };
}
