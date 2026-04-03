import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { requireFirmPlanAtLeast } from "@/lib/subscriptions/require-plan";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdReachSummary, getSocialSummary, type SocialMetricRow } from "@/lib/data/ad-reach";
import Link from "next/link";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmPanelAdsPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);
  await requireFirmPlanAtLeast(firmId, "business");
  const supabase =
    createSupabaseServiceRoleClient() ?? (await createSupabaseServerClient());

  if (!supabase) {
    return (
      <div className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-6">
        <h1 className="text-xl font-bold text-[#0B3C5D]">Reklam ver</h1>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Reklam verileri şu an yüklenemiyor. Lütfen daha sonra tekrar deneyin.
        </p>
      </div>
    );
  }

  const [reachSummary, socialRowsRaw] = await Promise.all([
    getAdReachSummary(supabase),
    supabase
      .from("platform_social_metrics")
      .select(
        "id,platform_name,handle,follower_count,monthly_reach,engagement_rate,estimated_lead_rate,is_active,sort_order"
      )
      .order("sort_order", { ascending: true }),
  ]);
  const socialRows = (socialRowsRaw.data ?? []) as SocialMetricRow[];
  const socialSummary = getSocialSummary(socialRows);
  const combinedMonthlyReach = reachSummary.estimatedMonthlyReach + socialSummary.totalReach;
  const combinedUniqueUsers = Math.round(
    reachSummary.estimatedUniqueUsers + socialSummary.totalReach * 0.45
  );
  const combinedPotentialLeads =
    reachSummary.estimatedPotentialLeads + socialSummary.estimatedLeads;
  const potentialRangeMin = Math.max(0, Math.round(combinedPotentialLeads * 0.8));
  const potentialRangeMax = Math.round(combinedPotentialLeads * 1.2);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#0B3C5D]/12 bg-linear-to-br from-[#0B3C5D] via-[#124668] to-[#0B3C5D] p-6 text-white shadow-[0_20px_44px_rgba(11,60,93,0.25)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Reklam merkezi</p>
        <h1 className="mt-2 text-2xl font-bold">Reklam Ver</h1>
        <p className="mt-2 max-w-3xl text-sm text-white/82">
          Sosyal medya ve web platformu reklamlarını ayrı stratejilerle planlayın. Gösterilen
          tüm metrikler son 30 günlük sistem analizine dayalı tahmini değerlerdir.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <MetricCard label="Tahmini Aylık Erişim" value={combinedMonthlyReach} />
          <MetricCard label="Tahmini Tekil Kullanıcı" value={combinedUniqueUsers} />
          <MetricCard
            label="Tahmini Potansiyel Müşteri"
            value={`${potentialRangeMin.toLocaleString("tr-TR")} - ${potentialRangeMax.toLocaleString("tr-TR")}`}
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0B3C5D]/65">
            Sosyal Medyada Reklam Ver
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#0B3C5D]">Topluluk tabanlı görünürlük</h2>
          <p className="mt-2 text-sm text-[#1A1A1A]/68">
            Güncel platform takipçi ve erişim verileri yönetim panelinden canlı güncellenir.
          </p>
          <div className="mt-4 space-y-2">
            {socialRows.filter((x) => x.is_active).map((row) => (
              <div key={row.id} className="flex items-center justify-between rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-[#0B3C5D]">{row.platform_name}</p>
                  <p className="text-xs text-[#1A1A1A]/60">{row.handle ?? "Aktif kanal"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#0B3C5D]">{row.follower_count.toLocaleString("tr-TR")}</p>
                  <p className="text-xs text-[#1A1A1A]/60">takipçi</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <InfoCell label="Topluluk büyüklüğü" value={socialSummary.totalFollowers.toLocaleString("tr-TR")} />
            <InfoCell label="Aylık tahmini erişim" value={socialSummary.totalReach.toLocaleString("tr-TR")} />
            <InfoCell label="Tahmini tıklama" value={socialSummary.estimatedClicks.toLocaleString("tr-TR")} />
            <InfoCell label="Tahmini potansiyel müşteri" value={socialSummary.estimatedLeads.toLocaleString("tr-TR")} />
          </div>
          <div className="mt-4">
            <Link
              href={`/panel/${firmId}/mesajlar`}
              className="inline-flex min-h-10 items-center rounded-xl bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white"
            >
              Teklif Al
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0B3C5D]/65">
            Web Platformunda Reklam Ver
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#0B3C5D]">Slot ve içerik odaklı envanter</h2>
          <p className="mt-2 text-sm text-[#1A1A1A]/68">
            Blog detay top/middle/bottom slotları ve akış reklam alanları içerik üretim hacmine göre büyür.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <InfoCell label="Toplam blog içeriği" value={reachSummary.publishedBlogCount.toLocaleString("tr-TR")} />
            <InfoCell label="Toplam akış içeriği" value={reachSummary.feedContentCount.toLocaleString("tr-TR")} />
            <InfoCell label="Aktif reklam alanı" value={reachSummary.activeSlotCapacity.toLocaleString("tr-TR")} />
            <InfoCell label="30g potansiyel gösterim" value={reachSummary.last30Impressions.toLocaleString("tr-TR")} />
            <InfoCell label="Tahmini tekil kullanıcı" value={reachSummary.estimatedUniqueUsers.toLocaleString("tr-TR")} />
            <InfoCell label="Tahmini potansiyel müşteri" value={reachSummary.estimatedPotentialLeads.toLocaleString("tr-TR")} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {reachSummary.slotSummary.map((slot) => (
              <span key={slot.slot} className="rounded-full border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-1 text-xs text-[#0B3C5D]">
                {slot.slot.toUpperCase()} CTR %{slot.ctr.toFixed(2)}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/akis"
              className="inline-flex min-h-10 items-center rounded-xl bg-[#D9A441] px-4 py-2 text-sm font-semibold text-[#1A1A1A]"
            >
              Plan Oluştur
            </Link>
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/65">Performans notu</h3>
        <ul className="mt-3 space-y-2 text-sm text-[#1A1A1A]/68">
          <li>• Reklam alanları içerik üretim hacmine göre dinamik artış gösterir.</li>
          <li>• Daha fazla blog ve akış içeriği, daha yüksek görünürlük envanteri sağlar.</li>
          <li>• Gösterilen değerler son 30 günlük verilerle üretilen tahmini model çıktılarıdır.</li>
        </ul>
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/70">{label}</p>
      <p className="mt-1 text-xl font-bold">{typeof value === "number" ? value.toLocaleString("tr-TR") : value}</p>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]/55">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#0B3C5D]">{value}</p>
    </div>
  );
}
