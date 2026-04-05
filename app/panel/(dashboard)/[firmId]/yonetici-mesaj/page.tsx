import { FirmAdminMessagesShell } from "@/components/messaging/firm-admin-messages-shell";
import { ensureFirmAdminConversationId } from "@/lib/data/firm-admin-conversation";
import { loadConversationMessagesDetailed } from "@/lib/messaging/server/messages-detailed";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MessageWithAttachment } from "@/lib/messaging/types";

type PageProps = {
  params: Promise<{ firmId: string }>;
  searchParams: Promise<{ purchase?: string }>;
};

export default async function FirmAdminChatPage({ params, searchParams }: PageProps) {
  const { firmId } = await params;
  const { purchase: purchaseParam } = await searchParams;
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  let currentUserId = "";
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    currentUserId = user?.id ?? "";
  }

  const conversationId = await ensureFirmAdminConversationId(firmId);
  let initialMessages: MessageWithAttachment[] = [];
  if (conversationId && supabase && currentUserId) {
    const { data: participant } = await supabase
      .from("conversation_participants")
      .select("id")
      .eq("conversation_id", conversationId)
      .eq("user_id", currentUserId)
      .maybeSingle();
    if (participant) {
      initialMessages = await loadConversationMessagesDetailed(conversationId);
    }
  }

  let purchaseContext: { id: string; serviceTitle: string } | null = null;
  const purchaseId = purchaseParam?.trim();
  if (purchaseId && supabase) {
    const { data: pr } = await supabase
      .from("growth_purchase_requests")
      .select("id,service_title")
      .eq("id", purchaseId)
      .eq("firm_id", firmId)
      .maybeSingle();
    if (pr?.id && pr.service_title) {
      purchaseContext = { id: String(pr.id), serviceTitle: String(pr.service_title) };
    }
  }

  if (!conversationId) {
    return (
      <div className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-[#1A1A1A]/65">
          Sohbet kanalı şu an açılamıyor. Lütfen daha sonra tekrar deneyin veya destek ile iletişime geçin.
        </p>
      </div>
    );
  }

  return (
    <FirmAdminMessagesShell
      firmId={firmId}
      conversationId={conversationId}
      currentUserId={currentUserId}
      initialMessages={initialMessages}
      purchaseContext={purchaseContext}
    />
  );
}
