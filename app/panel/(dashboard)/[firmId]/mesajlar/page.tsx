import { FirmPanelMessagesShell } from "@/components/messaging/firm-panel-messages-shell";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { loadFirmInboxRows, loadFirmMessageStats } from "@/lib/messaging/server/inbox-firm";
import { loadConversationMessagesDetailed } from "@/lib/messaging/server/messages-detailed";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MessageWithAttachment } from "@/lib/messaging/types";

type PageProps = {
  params: Promise<{ firmId: string }>;
  searchParams: Promise<{ c?: string }>;
};

export default async function FirmPanelMessagesPage({ params, searchParams }: PageProps) {
  const { firmId } = await params;
  const { c: conversationId } = await searchParams;
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  let currentUserId = "";
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    currentUserId = user?.id ?? "";
  }

  const inboxRows = await loadFirmInboxRows(firmId);
  const stats = await loadFirmMessageStats(firmId, inboxRows);

  let initialMessages: MessageWithAttachment[] = [];
  const activeC = conversationId?.trim();
  if (activeC && supabase && currentUserId) {
    const { data: participant } = await supabase
      .from("conversation_participants")
      .select("id")
      .eq("conversation_id", activeC)
      .eq("user_id", currentUserId)
      .maybeSingle();
    if (participant) {
      initialMessages = await loadConversationMessagesDetailed(activeC);
    }
  }

  return (
    <FirmPanelMessagesShell
      firmId={firmId}
      currentUserId={currentUserId}
      initialList={inboxRows}
      initialStats={stats}
      conversationId={conversationId?.trim() ?? null}
      initialMessages={initialMessages}
    />
  );
}
