import Link from "next/link";
import { notFound } from "next/navigation";

import { FirmDashboardModuleGrid } from "@/components/firm-panel/firm-dashboard-module-grid";
import { FirmPanelStatCards } from "@/components/firm-panel/firm-panel-stat-cards";
import { buildFirmPanelConnectionCode } from "@/lib/firm-panel/connection-code";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { allowedDashboardModuleIdsForPlan } from "@/lib/subscriptions/dashboard-modules-for-plan";
import { getFirmPlanTypeForPanel } from "@/lib/subscriptions/firm-plan-server";
import { getFirmPanelAnnouncementsForUser } from "@/lib/data/firm-panel-announcements";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmPanelOverviewPage({ params }: PageProps) {
  const { firmId } = await params;
  const membership = await requireFirmPanelAccess(firmId);
  const planType = await getFirmPlanTypeForPanel(firmId);
  const allowedModuleIds = allowedDashboardModuleIdsForPlan(planType);

  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: firm } = await supabase
    .from("firms")
    .select(
      "name, slug, logo_url, website, corporateness_score, hype_score, raw_hype_score, status, brand_name, show_in_search, updated_at, firm_page_enabled"
    )
    .eq("id", firmId)
    .maybeSingle();

  if (!firm) notFound();

  const corp = Number(firm.corporateness_score ?? 0);
  const hype = Number(firm.hype_score ?? 0);
  const rawHype = Number(firm.raw_hype_score ?? 0);
  const refCode = buildFirmPanelConnectionCode(firmId);
  const displayName = (firm.brand_name as string | null) || (firm.name as string);
  const isPublished = (firm.status as string) === "published";
  const isVisible = firm.show_in_search !== false && firm.firm_page_enabled !== false;
  const updatedAt = new Date(String(firm.updated_at ?? ""));
  const updatedLabel = Number.isNaN(updatedAt.getTime())
    ? "—"
    : new Intl.DateTimeFormat("tr-TR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(updatedAt);

  const announcements = await getFirmPanelAnnouncementsForUser();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let hiddenModuleIds: string[] = [];
  if (user?.id) {
    const { data: pref } = await supabase
      .from("firm_panel_dashboard_preferences")
      .select("hidden_module_ids")
      .eq("user_id", user.id)
      .eq("firm_id", firmId)
      .maybeSingle();
    hiddenModuleIds = Array.isArray(pref?.hidden_module_ids)
      ? (pref?.hidden_module_ids as string[])
      : [];
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-[#0B3C5D]/12 bg-linear-to-br from-[#0B3C5D] via-[#13486E] to-[#0B3C5D] p-5 text-white shadow-[0_18px_46px_rgba(11,60,93,0.28)] sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-14 h-44 w-44 rounded-full bg-[#328CC1]/22 blur-3xl" />
        <div className="pointer-events-none absolute -left-14 -bottom-16 h-44 w-44 rounded-full bg-[#D9A441]/14 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Firma paneli | Genel bakış
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Hoş geldiniz, {displayName}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/80">
            Paneliniz yönetim verileriyle senkron çalışır. Profil durumu, skorlar ve modüller son
            kayıtlarınıza göre anlık olarak yenilenir.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
              Durum: {isPublished ? "Yayında" : "Taslak"}
            </span>
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
              Profil: {isVisible ? "Görünür" : "Gizli"}
            </span>
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
              Rol: {membership.role}
            </span>
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
              Ref: <span className="font-mono">{refCode}</span>
            </span>
            <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
              Son güncelleme: {updatedLabel}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                Kurumsallık
              </p>
              <p className="mt-1 text-3xl font-bold tabular-nums">{corp}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                Hype
              </p>
              <p className="mt-1 text-3xl font-bold tabular-nums">{hype}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                Liste skoru
              </p>
              <p className="mt-1 text-3xl font-bold tabular-nums">{rawHype}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                Senkron
              </p>
              <p className="mt-1 text-lg font-semibold">{announcements.length} duyuru aktif</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0B3C5D]/70">
            Hızlı aksiyon
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#0B3C5D]">Profil ve yayın kontrolü</h2>
          <p className="mt-1 text-sm text-[#1A1A1A]/58">
            Profil, yayın ve görünürlük durumlarınızı tek noktadan kontrol edin.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/firma/${firm.slug as string}`}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
            >
              Sitedeki profili aç
            </Link>
            <Link
              href={`/panel/${firmId}/hesap`}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#1A1A1A]/15 bg-[#F4F6F8] px-4 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#EAF0F6]"
            >
              Hesap güvenliği
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0B3C5D]/70">
            Platform duyuruları
          </p>
          {announcements.length === 0 ? (
            <p className="mt-2 text-sm text-[#1A1A1A]/58">
              Şu an aktif duyuru yok. Yeni bildirimler bu kutuda görünecek.
            </p>
          ) : (
            <ul className="mt-2 space-y-3">
              {announcements.slice(0, 2).map((a) => (
                <li key={a.id} className="rounded-xl border border-[#0B3C5D]/10 bg-[#F8FAFC] p-3">
                  <p className="text-sm font-semibold text-[#0B3C5D]">{a.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/65">
                    {a.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <FirmDashboardModuleGrid
        firmId={firmId}
        initialHiddenModuleIds={hiddenModuleIds}
        allowedModuleIds={allowedModuleIds}
      />

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#0B3C5D]/80">
            Diğer araçlar
          </h2>
        </div>
        {/* Gelen mesajlar ve Gelen formlar kartları bilinçli olarak aynen korunur. */}
        {planType !== "business" ? (
          <div className="rounded-2xl border border-[#0B3C5D]/12 bg-[#FFFCF7] px-4 py-3 text-sm text-[#1A1A1A]/80">
            <Link
              href={`/panel/${firmId}/abonelik`}
              className="font-semibold text-[#0B3C5D] underline-offset-2 hover:underline"
            >
              Daha fazla görünürlük için yükselt
            </Link>
            <span className="text-[#1A1A1A]/55">
              {" "}
              — Liste önceliği, sponsorlu yerleşim ve promosyon araçlarında üst katmanlar.
            </span>
          </div>
        ) : null}
        <FirmPanelStatCards firmId={firmId} />
      </section>

      <section className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-[#0B3C5D]">Yakında / gelişmekte olan modüller</h2>
        <ul className="mt-4 grid gap-3 text-sm text-[#1A1A1A]/70 sm:grid-cols-2">
          <li className="flex gap-2">
            <span className="text-[#0B3C5D]">→</span> Kampanya merkezi ve takvimli paylaşım
          </li>
          <li className="flex gap-2">
            <span className="text-[#0B3C5D]">→</span> Reklam performans metrikleri ve raporlar
          </li>
          <li className="flex gap-2">
            <span className="text-[#0B3C5D]">→</span> Lead havuzu ve teklif yönetimi
          </li>
          <li className="flex gap-2">
            <span className="text-[#0B3C5D]">→</span> Evrak talepleri ve canlı destek modülleri
          </li>
        </ul>
      </section>
    </div>
  );
}
