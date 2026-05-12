"use client";

import { DashboardMetricCard, DashboardMiniCard } from "@/components/firm-panel/corporateness-dashboard-shared";
import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";
import { parseFiniteGoogleRating } from "@/lib/firms/google-profile-public";

function sectionRatio(score: number, max: number): number {
  return max > 0 ? score / max : 1;
}

export default function OverviewTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const { corporateness, googleProfile, profileCompletenessPercent, hypeScoreDisplay, firm } = snapshot;
  const dbCorp = Number(firm.corporateness_score ?? corporateness.totalScore);
  const headline = Number.isFinite(dbCorp) ? Math.round(dbCorp) : corporateness.totalScore;
  const googleRating = parseFiniteGoogleRating(googleProfile?.rating ?? null);

  const strong: string[] = [];
  const weak: string[] = [];
  for (const sec of corporateness.sections) {
    const r = sectionRatio(sec.section_score, sec.section_max);
    if (r >= 0.82) strong.push(sec.label);
    else if (r <= 0.42) weak.push(sec.label);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardMetricCard
          title="Kurumsallık Skoru"
          value={`${headline}/100`}
          hint="Sistem tarafından hesaplanır; manuel değiştirilemez."
        />
        <DashboardMetricCard title="Hype Puanı" value={hypeScoreDisplay} hint="Platform içi görünürlük ve etkileşim metriği." />
        <DashboardMetricCard
          title="Google Puanı"
          value={googleRating != null ? googleRating.toFixed(1) : "—"}
          hint={
            googleProfile?.user_rating_count != null
              ? `${googleProfile.user_rating_count} değerlendirme`
              : "Google Haritalar verisi yoksa gösterilmez."
          }
        />
        <DashboardMetricCard
          title="Profil Tamamlanma Oranı"
          value={`%${profileCompletenessPercent}`}
          hint="Kayıtlı alanların doluluk oranı (tahmini gösterge)."
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <DashboardMiniCard title="Güçlü alanlar">
          {strong.length ? (
            <ul className="list-inside list-disc space-y-1 text-[#0B3C5D]">
              {strong.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[#1A1A1A]/50">Henüz belirgin güçlü bölüm ayrışmıyor; skor analizi sekmesine bakın.</p>
          )}
        </DashboardMiniCard>
        <DashboardMiniCard title="Eksik alanlar">
          {weak.length ? (
            <ul className="list-inside list-disc space-y-1 text-[#1A1A1A]/70">
              {weak.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[#1A1A1A]/50">Öncelikli zayıf bölüm tespiti için skor dökümünü inceleyin.</p>
          )}
        </DashboardMiniCard>
        <DashboardMiniCard title="Önerilen geliştirmeler">
          {corporateness.admin.nextSteps.length ? (
            <ol className="list-decimal space-y-2 pl-4 text-[#1A1A1A]/75">
              {corporateness.admin.nextSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          ) : (
            <p className="text-[#1A1A1A]/50">Harika — öncelikli öneri listesi boş veya tüm kriterler dengede.</p>
          )}
        </DashboardMiniCard>
      </div>

      <p className="text-xs leading-relaxed text-[#1A1A1A]/50">{corporateness.admin.summary}</p>
    </div>
  );
}
