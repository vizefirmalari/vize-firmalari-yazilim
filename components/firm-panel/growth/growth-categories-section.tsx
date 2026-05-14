"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type { GrowthCatalogCategory } from "@/lib/types/growth-commerce";

import { GrowthServiceCard } from "./growth-service-card";

type Props = {
  firmId: string;
  categories: GrowthCatalogCategory[];
};

type SpotlightEntry = { serviceId: string; categoryName: string };

export function GrowthCategoriesSection({ firmId, categories }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [autoOpenToken, setAutoOpenToken] = useState<string | null>(null);

  useEffect(() => {
    const h = searchParams.get("hizmet");
    if (!h || !/^[0-9a-f-]{36}$/i.test(h)) return;
    const clean = `${pathname}`;
    window.history.replaceState(null, "", clean);
    queueMicrotask(() => setAutoOpenToken(h));
  }, [pathname, searchParams]);

  const blocks = useMemo(() => categories.filter((c) => c.services.length > 0), [categories]);

  const spotlightEntries = useMemo((): SpotlightEntry[] => {
    const out: SpotlightEntry[] = [];
    for (const cat of blocks) {
      for (const s of cat.services) {
        if (s.is_featured && out.length < 2) {
          out.push({ serviceId: s.id, categoryName: cat.name });
        }
      }
    }
    return out;
  }, [blocks]);

  const spotlightIds = useMemo(() => new Set(spotlightEntries.map((e) => e.serviceId)), [spotlightEntries]);

  if (!blocks.length) {
    return (
      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold text-[#0B3C5D]">Şu an vitrinde listelenecek aktif hizmet yok</p>
        <p className="mt-2 text-sm text-[#1A1A1A]/60">
          Hizmetler veritabanından yüklenir. Yayında görmek için yönetim panelinde kategorilerin ve hizmetlerin{" "}
          <span className="font-medium text-[#1A1A1A]/75">aktif</span> olduğundan emin olun.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {spotlightEntries.length > 0 ? (
        <section aria-labelledby="growth-spotlight-heading" className="scroll-mt-6">
          <div className="mb-6 max-w-2xl">
            <h2 id="growth-spotlight-heading" className="text-xl font-bold tracking-tight text-[#0B3C5D] sm:text-2xl">
              Öne çıkan çözümler
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/60">
              Çoğu firmanın birlikte değerlendirdiği çözümler; görünürlük ve başvuru akışını güçlendirmek için net bir
              başlangıç noktası.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {spotlightEntries.map(({ serviceId, categoryName }) => {
              const svc = blocks.flatMap((c) => c.services).find((s) => s.id === serviceId);
              if (!svc) return null;
              return (
                <GrowthServiceCard
                  key={`spotlight-${svc.id}`}
                  firmId={firmId}
                  service={svc}
                  categoryLabel={categoryName}
                  variant="spotlight"
                  autoOpenToken={autoOpenToken}
                  onAutoOpenConsumed={() => setAutoOpenToken(null)}
                />
              );
            })}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="growth-all-heading" className="scroll-mt-6">
        <div className="mb-8 max-w-2xl">
          <h2 id="growth-all-heading" className="text-xl font-bold tracking-tight text-[#0B3C5D] sm:text-2xl">
            Tüm çözümler
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/60">
            İhtiyacınıza göre kategorilere göz atın; her kartta fiyat ve aksiyonlar aynı hizada, detay sayfasında tam
            içerik yer alır.
          </p>
        </div>

        <div className="space-y-12">
          {blocks.map((cat) => {
            const gridServices = cat.services.filter((s) => !spotlightIds.has(s.id));
            if (!gridServices.length) return null;
            return (
              <div key={cat.id} id={`kategori-${cat.id}`} className="scroll-mt-6">
                <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-[#0B3C5D]/10 pb-3">
                  <span className="text-lg" aria-hidden>
                    {cat.icon}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-[#0B3C5D] sm:text-xl">{cat.name}</h3>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {gridServices.map((s) => (
                    <GrowthServiceCard
                      key={s.id}
                      firmId={firmId}
                      service={s}
                      categoryLabel={cat.name}
                      variant="default"
                      autoOpenToken={autoOpenToken}
                      onAutoOpenConsumed={() => setAutoOpenToken(null)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
