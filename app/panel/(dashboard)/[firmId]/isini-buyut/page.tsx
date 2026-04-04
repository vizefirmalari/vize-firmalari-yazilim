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

export default async function FirmGrowthHubPage({ params }: PageProps) {
  const { firmId } = await params;
  const membership = await requireFirmPanelAccess(firmId);

  const supabase = await createSupabaseServerClient();
  const catalog = supabase ? await loadActiveGrowthCatalog(supabase) : [];
  const bank = getGrowthPaymentBankInfo();
  const firstCatWithServices = catalog.find((c) => c.services.length > 0);

  return (
    <div className="space-y-8">
      <p className="rounded-2xl border border-[#0B3C5D]/10 bg-[#F4F6F8] px-4 py-3 text-center text-sm font-medium text-[#1A1A1A]/70">
        Rakipleriniz dijital sistemlerle daha fazla müşteriye ulaşıyor.
      </p>

      <section className="overflow-hidden rounded-2xl border border-[#0B3C5D]/12 bg-linear-to-br from-[#0B3C5D] via-[#124668] to-[#0B3C5D] p-6 text-white shadow-[0_20px_44px_rgba(11,60,93,0.2)] sm:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,280px)]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">İşini Büyüt</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              <span aria-hidden>🚀 </span>
              İşinizi Büyütün
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85">
              Daha fazla müşteri kazanın, talepleri kaçırmayın ve işinizi otomasyon ile büyütün. Size özel
              geliştirilen akıllı sistemlerle süreci kontrol altına alın.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Daha fazla müşteri", "Otomatik sistemler", "7/24 aktif yapı"].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/55">
              Sonuç ve getiri garantisi verilmez; süreç şeffaf raporlama ve iyileştirme ile yönetilir.
            </p>
          </div>
          <GrowthHeroIllustration />
        </div>
      </section>

      <section className="rounded-2xl border border-[#0B3C5D]/12 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-[#0B3C5D]">Geniş erişim ağı</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#1A1A1A]/65">
          168.000+ kişilik sosyal medya ağı ve platform trafiği ile firmanızı daha fazla kişiye ulaştırıyoruz.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-[#1A1A1A]/70 sm:grid-cols-3">
          <li className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2 font-medium">
            Google ve Meta reklam yönetimi
          </li>
          <li className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2 font-medium">
            Yapay zekâ botları ve otomasyon
          </li>
          <li className="rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] px-3 py-2 font-medium">
            Web, içerik ve premium sistemler
          </li>
        </ul>
      </section>

      <Suspense fallback={<GrowthCatalogFallback />}>
        <GrowthCategoriesSection
          firmId={firmId}
          firmName={membership.firmName}
          bank={bank}
          categories={catalog}
        />
      </Suspense>

      <p className="rounded-2xl border border-[#0B3C5D]/10 bg-white px-4 py-3 text-center text-sm font-medium text-[#1A1A1A]/70 shadow-sm">
        Rakipleriniz dijital sistemlerle daha fazla müşteriye ulaşıyor.{" "}
        {firstCatWithServices ? (
          <Link
            href={`/panel/${firmId}/isini-buyut#kategori-${firstCatWithServices.id}`}
            className="font-semibold text-[#0B3C5D] hover:underline"
          >
            Görünürlük paketlerine göz atın
          </Link>
        ) : (
          <span className="font-semibold text-[#0B3C5D]">Katalog güncellendiğinde paketler burada listelenir.</span>
        )}
        .
      </p>
    </div>
  );
}
