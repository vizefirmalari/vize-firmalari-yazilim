import Link from "next/link";
import type { Viewport } from "next";

import { FirmPanelAnnouncementsStrip } from "@/components/firm-panel/firm-panel-announcements-strip";
import { FirmPanelNav } from "@/components/firm-panel/firm-panel-nav";
import { getFirmPanelAnnouncementsForUser } from "@/lib/data/firm-panel-announcements";
import { getFirmPanelMemberships, requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { getFirmPlanTypeForPanel } from "@/lib/subscriptions/firm-plan-server";
import { loadFirmInboxRows } from "@/lib/messaging/server/inbox-firm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ firmId: string }>;
};

/** Firma panelinde (mesajlar dahil) klavye ile layout’un uyumlu küçülmesi. */
export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
};

/**
 * Firma bazlı panel kabuğu: platform duyuruları + sol menü + marka alanı.
 */
export default async function FirmPanelSectionLayout({ children, params }: Props) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);
  const planType = await getFirmPlanTypeForPanel(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: firm } = await supabase
    .from("firms")
    .select("name, slug, logo_url")
    .eq("id", firmId)
    .maybeSingle();

  if (!firm) notFound();

  const announcements = await getFirmPanelAnnouncementsForUser();
  const allMemberships = await getFirmPanelMemberships();
  const showFirmSwitcher = allMemberships.length > 1;
  const inboxRows = await loadFirmInboxRows(firmId);
  const unreadMessagesCount = inboxRows.reduce((sum, row) => sum + row.unread_for_firm, 0);

  const name = firm.name as string;
  const logoUrl = firm.logo_url as string | null;

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <FirmPanelAnnouncementsStrip announcements={announcements} />

      <div className="mx-auto flex max-w-[1400px] min-h-0 flex-col lg:min-h-[calc(100vh-0px)] lg:flex-row">
        <aside className="flex w-full flex-col border-[#1A1A1A]/10 bg-[#0B3C5D] text-white lg:w-64 lg:shrink-0 lg:border-r">
          <div className="flex items-center gap-3 px-4 py-5 sm:px-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/15">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="" className="h-full w-full object-contain" />
              ) : (
                <span className="text-lg font-bold text-white/80">{name.slice(0, 1).toUpperCase()}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-tight">{name}</p>
              <p className="truncate text-xs text-white/55">vizefirmalari.com</p>
            </div>
          </div>

          <div className="border-t border-white/10 px-2 py-3 lg:flex-1">
            <FirmPanelNav firmId={firmId} planType={planType} unreadMessagesCount={unreadMessagesCount} />
          </div>

          <div className="mt-auto space-y-1 border-t border-white/10 px-3 py-4">
            {showFirmSwitcher ? (
              <Link
                href="/panel"
                className="flex rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/8"
              >
                ← Firma değiştir
              </Link>
            ) : null}
            <Link
              href="/hesabim"
              className="flex rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/8"
            >
              Hesabım
            </Link>
            <Link
              href="/"
              className="flex rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/8"
            >
              Siteye dön
            </Link>
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
