import Link from "next/link";
import { Suspense } from "react";

import { GrowthHeroIllustration } from "@/components/firm-panel/growth/growth-hero-illustration";
import { GrowthCategoriesSection } from "@/components/firm-panel/growth/growth-categories-section";
import { loadActiveGrowthCatalog } from "@/lib/data/growth-catalog";
import { getGrowthPaymentBankInfo } from "@/lib/firm-panel/growth-payment-config";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ firmId: string }> };

function GrowthCatalogFallback() {
  return (
    <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-medium text-[#1A1A1A]/65">Katalog yükleniyor…</p>
    </div>
  );
}

const heroHighlights = ["Daha fazla görünürlük", "Hazır platform trafiği", "Şeffaf raporlama"] as const;

const reachPillars = [
  { title: "Reklam ve performans", desc: "Google ve Meta tarafında yönetilen, ölçülebilir kampanyalar." },
  { title: "Otomasyon ve botlar", desc: "Talepleri yakalayan, yönlendiren akıllı akışlar." },
  { title: "Web ve premium sistemler", desc: "Güven veren vitrin ve operasyonel araçlar." },
] as const;

export default async function FirmGrowthHubPage({ params }: PageProps) {
  const { firmId } = await params;
  const membership = await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  const catalog = supabase ? await loadActiveGrowthCatalog(supabase) : [];
  const bank = getGrowthPaymentBankInfo();
  const firstCatWithServices = catalog.find((c) => c.services.length > 0);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl border border-[#0B3C5D]/12 bg-white shadow-[0_12px_40px_rgba(11,60,93,0.06)] sm:shadow-[0_16px_48px_rgba(11,60,93,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[1fr_minmax(0,300px)]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A]/45">Firma vitrini</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0B3C5D] sm:text-3xl">İşini Büyüt</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#1A1A1A]/72">
              Görünürlüğünüzü artırın, daha nitelikli başvurular alın, platformdaki varlığınızı güçlendirin.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/62">
              Bu alan; vitrin, reklam, otomasyon ve kurumsal web çözümlerini tek düzen üzerinden sunar. Her hizmet net
              fiyat veya teklif akışıyla ilerler; süreç panelinizden takip edilir.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {heroHighlights.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-[#0B3C5D]/12 bg-[#F7F9FB] px-3 py-1 text-xs font-semibold text-[#0B3C5D]/85"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[#1A1A1A]/48">
              Sonuç veya getiri garantisi sunulmaz; hizmetler şeffaf raporlama ve iyileştirme disipliniyle yürütülür.
            </p>
          </div>
          <div className="flex min-h-[200px] items-center justify-center bg-linear-to-br from-[#0B3C5D] via-[#124668] to-[#0B3C5D] px-6 py-10 lg:min-h-0">
            <GrowthHeroIllustration />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-[#0B3C5D] sm:text-xl">Neleri kapsıyor?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#1A1A1A]/62">
          Geniş erişim ağı ve içerik gücüyle firmanızı doğru kitleye taşıyın; paketler ihtiyaca göre seçilir, detaylar
          vitrin kartlarında özetlenir.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reachPillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-4 shadow-sm transition hover:border-[#0B3C5D]/18"
            >
              <p className="text-sm font-bold text-[#0B3C5D]">{p.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/58">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Suspense fallback={<GrowthCatalogFallback />}>
        <GrowthCategoriesSection
          firmId={firmId}
          firmName={membership.firmName}
          bank={bank}
          categories={catalog}
        />
      </Suspense>

      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white px-4 py-4 text-center text-sm font-medium text-[#1A1A1A]/68 shadow-sm sm:px-6">
        Dijital vitrinde rekabet günlük işin parçası.
        {firstCatWithServices ? (
          <>
            {" "}
            <Link
              href={`/panel/${firmId}/isini-buyut#kategori-${firstCatWithServices.id}`}
              className="font-semibold text-[#0B3C5D] underline-offset-2 hover:underline"
            >
              Çözüm kataloğuna göz atın
            </Link>
            .
          </>
        ) : (
          <>
            {" "}
            <span className="font-semibold text-[#0B3C5D]">Katalog güncellendiğinde paketler burada listelenir.</span>
          </>
        )}
      </div>
    </div>
  );
}
