import Link from "next/link";
import { notFound } from "next/navigation";

import { FirmPanelStatCards } from "@/components/firm-panel/firm-panel-stat-cards";
import { buildFirmPanelConnectionCode } from "@/lib/firm-panel/connection-code";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmPanelOverviewPage({ params }: PageProps) {
  const { firmId } = await params;
  const membership = await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: firm } = await supabase
    .from("firms")
    .select(
      "name, slug, logo_url, website, corporateness_score, hype_score, raw_hype_score, status, brand_name"
    )
    .eq("id", firmId)
    .maybeSingle();

  if (!firm) notFound();

  const corp = Number(firm.corporateness_score ?? 0);
  const hype = Number(firm.hype_score ?? 0);
  const rawHype = Number(firm.raw_hype_score ?? 0);
  const refCode = buildFirmPanelConnectionCode(firmId);
  const displayName = (firm.brand_name as string | null) || (firm.name as string);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 border-b border-[#1A1A1A]/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/65">
            Genel bakış
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B3C5D] sm:text-3xl">
            {displayName}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#1A1A1A]/60">
            Paylaşımlarınız ve kampanyalarınız akışta markanızın logosu ve adıyla görünür. Skorlar
            yönetim paneli ile senkron güncellenir.
          </p>
          <p className="mt-2 text-xs font-medium text-[#1A1A1A]/45">
            Erişim: <span className="text-[#1A1A1A]/70">{membership.role}</span>
            {" · "}
            Referans: <span className="font-mono text-[#1A1A1A]/65">{refCode}</span>
          </p>
        </div>
        <Link
          href={`/firma/${firm.slug as string}`}
          className="inline-flex min-h-11 shrink-0 items-center justify-center self-start rounded-xl border border-[#1A1A1A]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#0B3C5D] shadow-sm transition hover:bg-[#F4F6F8]"
        >
          Profil sayfası (herkese açık)
        </Link>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Kurumsallık skoru
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-[#0B3C5D]">{corp}</p>
          <p className="mt-1 text-xs text-[#1A1A1A]/50">Platform ile senkron (0–100)</p>
        </div>
        <div className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/45">
            Hype puanı
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-[#0B3C5D]">{hype}</p>
          <p className="mt-1 text-xs text-[#1A1A1A]/50">
            Birikimli metrik · Liste (0–100): {rawHype}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-[#1A1A1A]/10 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#0B3C5D]/85">
          Profil işlemleri
        </h2>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Kamuya açık profil içeriği yönetim panelinden düzenlenir; buradan hızlı önizleme yapın.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/firma/${firm.slug as string}`}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#1A1A1A]/15 bg-[#F4F6F8] px-4 py-2 text-sm font-semibold text-[#0B3C5D] hover:bg-[#0B3C5D]/8"
          >
            Sitedeki profili aç
          </Link>
          <span className="inline-flex min-h-10 items-center rounded-xl border border-dashed border-[#1A1A1A]/20 px-4 py-2 text-xs text-[#1A1A1A]/45">
            Durum: {(firm.status as string) === "published" ? "Yayında" : String(firm.status)}
          </span>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#0B3C5D]/80">
            Diğer araçlar
          </h2>
        </div>
        <FirmPanelStatCards firmId={firmId} />
      </section>

      <section className="rounded-2xl border border-[#1A1A1A]/8 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-[#0B3C5D]">Yakında</h2>
        <ul className="mt-4 grid gap-3 text-sm text-[#1A1A1A]/70 sm:grid-cols-2">
          <li className="flex gap-2">
            <span className="text-[#0B3C5D]">→</span> Blog ve reels yayınları
          </li>
          <li className="flex gap-2">
            <span className="text-[#0B3C5D]">→</span> Reklam ve abonelik paketleri
          </li>
          <li className="flex gap-2">
            <span className="text-[#0B3C5D]">→</span> Oturumlu kullanıcılarla mesajlaşma
          </li>
          <li className="flex gap-2">
            <span className="text-[#0B3C5D]">→</span> Gelişmiş formlar ve lead yönetimi
          </li>
        </ul>
      </section>
    </div>
  );
}
