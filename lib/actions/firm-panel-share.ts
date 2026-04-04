"use server";

import { revalidatePath } from "next/cache";

import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ShareToolType = "campaign" | "video";

export async function recordFirmPanelShareAction(input: {
  firmId: string;
  tool: ShareToolType;
  title?: string;
}): Promise<{ ok: true; newHypeScore: number } | { ok: false; error: string }> {
  const firmId = input.firmId.trim();
  if (!firmId) return { ok: false, error: "Geçersiz firma." };

  const tool = input.tool;
  if (!["campaign", "video"].includes(tool)) {
    return { ok: false, error: "Geçersiz paylaşım türü." };
  }

  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Sunucu bağlantısı kurulamadı." };

  const { data: rpcData, error: rpcErr } = await supabase.rpc("record_firm_share_hype", {
    p_firm_id: firmId,
    p_share_type: tool,
    p_payload: {
      source: "firm_panel_share_center",
      title: input.title?.trim() || null,
    },
  });

  if (rpcErr) return { ok: false, error: rpcErr.message };

  const row = Array.isArray(rpcData) ? rpcData[0] : rpcData;
  const newHype = Number(
    (row as { new_hype_score?: number } | null)?.new_hype_score ?? 0
  );

  const { data: firmRow } = await supabase
    .from("firms")
    .select("slug")
    .eq("id", firmId)
    .maybeSingle();

  revalidatePath("/");
  revalidatePath(`/panel/${firmId}`);
  revalidatePath(`/panel/${firmId}/paylasim`);
  if (firmRow?.slug) {
    revalidatePath(`/firma/${String(firmRow.slug)}`);
  }

  return { ok: true, newHypeScore: Number.isFinite(newHype) ? newHype : 0 };
}
