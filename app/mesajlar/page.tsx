import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { UserMessagesShell } from "@/components/messaging/user-messages-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadFirmMetaForConversation } from "@/lib/messaging/server/conversation-header";
import { loadUserInboxRows } from "@/lib/messaging/server/inbox-user";
import { loadConversationMessagesDetailed } from "@/lib/messaging/server/messages-detailed";
import type { MessageWithAttachment } from "@/lib/messaging/types";

export const metadata: Metadata = {
  title: "Mesajlar",
  description: "Firma ile mesajlaşma",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ c?: string; firm?: string }>;
};

function mesajlarReturnPath(sp: { c?: string; firm?: string }) {
  if (sp.c?.trim()) {
    return `/mesajlar?c=${encodeURIComponent(sp.c.trim())}`;
  }
  if (sp.firm?.trim()) {
    return `/mesajlar?firm=${encodeURIComponent(sp.firm.trim())}`;
  }
  return "/mesajlar";
}

export default async function MesajlarPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const supabase = await createSupabaseServerClient();
  const loginBase = `/?auth=login&next=${encodeURIComponent(mesajlarReturnPath(sp))}`;

  if (!supabase) {
    redirect(loginBase);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(loginBase);
  }

  await supabase.rpc("accept_firm_panel_invites_for_user");

  let conversationId = sp.c?.trim() ?? null;

  if (!conversationId && sp.firm?.trim()) {
    const { data: ensured, error: ensureErr } = await supabase.rpc("ensure_user_firm_conversation", {
      p_firm_id: sp.firm.trim(),
    });
    if (ensureErr || !ensured || typeof ensured !== "string") {
      return (
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
            <h1 className="text-xl font-semibold text-[#0B3C5D]">Mesajlar</h1>
            <p className="mt-2 text-sm text-[#1A1A1A]/65">
              Konuşma başlatılamadı. Firma temsilcisi atanmamış olabilir veya bir sorun oluştu.
            </p>
          </main>
          <SiteFooter />
        </div>
      );
    }
    redirect(`/mesajlar?c=${ensured}`);
  }

  const inboxRows = await loadUserInboxRows();

  let initialMessages: MessageWithAttachment[] = [];
  let firmHeader = null;

  if (conversationId) {
    const { data: participant } = await supabase
      .from("conversation_participants")
      .select("id")
      .eq("conversation_id", conversationId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (!participant) {
      redirect("/hesabim");
    }

    initialMessages = await loadConversationMessagesDetailed(conversationId);
    firmHeader = await loadFirmMetaForConversation(conversationId);
  }

  const mobileThreadFocus = Boolean(conversationId);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main
        className={`mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col ${
          mobileThreadFocus
            ? "max-md:overflow-hidden px-0 py-0 md:px-4 md:py-6"
            : "px-4 py-6"
        }`}
      >
        <UserMessagesShell
          userId={user.id}
          initialList={inboxRows}
          conversationId={conversationId}
          initialMessages={initialMessages}
          firmHeader={firmHeader}
        />
      </main>
      <div className={mobileThreadFocus ? "max-md:hidden" : undefined}>
        <SiteFooter />
      </div>
    </div>
  );
}
