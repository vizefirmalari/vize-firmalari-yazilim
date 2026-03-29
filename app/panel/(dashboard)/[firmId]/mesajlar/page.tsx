import { ConversationScreen } from "@/components/messaging/ConversationScreen";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { loadConversationMessages } from "@/lib/messaging/server/messages";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ firmId: string }>;
  searchParams: Promise<{ c?: string }>;
};

export default async function FirmPanelMessagesPage({ params, searchParams }: PageProps) {
  const { firmId } = await params;
  const { c: conversationId } = await searchParams;
  await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  let currentUserId: string | null = null;
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    currentUserId = user?.id ?? null;
  }

  const initialMessages = conversationId ? await loadConversationMessages(conversationId) : [];

  return (
    <ConversationScreen
      firmId={firmId}
      conversationId={conversationId ?? null}
      initialMessages={initialMessages}
      currentUserId={currentUserId}
    />
  );
}
