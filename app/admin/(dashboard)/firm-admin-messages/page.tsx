import { redirect } from "next/navigation";

import { AdminFirmAdminInboxShell } from "@/components/messaging/admin-firm-admin-inbox-shell";
import { getAdminContext } from "@/lib/auth/admin";
import { loadAdminFirmAdminConversationList } from "@/lib/data/admin-firm-admin-conversations";
import { loadConversationMessagesDetailed } from "@/lib/messaging/server/messages-detailed";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MessageWithAttachment } from "@/lib/messaging/types";

export const metadata = {
  title: "Firma — yönetim sohbeti",
  robots: { index: false, follow: false },
};

type PageProps = { searchParams: Promise<{ c?: string }> };

export default async function AdminFirmAdminMessagesPage({ searchParams }: PageProps) {
  const ctx = await getAdminContext();
  if (!ctx) redirect("/admin/login");

  const { c: rawC } = await searchParams;
  const conversationId = rawC?.trim() || null;

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  if (conversationId) {
    const { data: conv } = await supabase
      .from("conversations")
      .select("firm_id")
      .eq("id", conversationId)
      .maybeSingle();
    const fid = conv?.firm_id as string | undefined;
    if (fid) {
      await supabase.rpc("ensure_firm_admin_conversation", { p_firm_id: fid });
    }
  }

  const list = await loadAdminFirmAdminConversationList();

  let initialMessages: MessageWithAttachment[] = [];
  if (conversationId) {
    const { data: participant } = await supabase
      .from("conversation_participants")
      .select("id")
      .eq("conversation_id", conversationId)
      .eq("user_id", ctx.userId)
      .maybeSingle();
    if (participant) {
      initialMessages = await loadConversationMessagesDetailed(conversationId);
    }
  }

  return (
    <AdminFirmAdminInboxShell
      initialList={list}
      conversationId={conversationId}
      currentUserId={ctx.userId}
      initialMessages={initialMessages}
    />
  );
}
