"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type { GrowthCatalogCategory } from "@/lib/types/growth-commerce";
import type { GrowthPurchaseModalBank } from "@/components/firm-panel/growth/growth-purchase-modal";

import { GrowthServiceCard } from "./growth-service-card";

type Props = {
  firmId: string;
  firmName: string;
  bank: GrowthPurchaseModalBank;
  categories: GrowthCatalogCategory[];
};

export function GrowthCategoriesSection({ firmId, firmName, bank, categories }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [autoOpenToken, setAutoOpenToken] = useState<string | null>(null);

  useEffect(() => {
    const h = searchParams.get("hizmet");
    if (!h || !/^[0-9a-f-]{36}$/i.test(h)) return;
    setAutoOpenToken(h);
    const clean = `${pathname}`;
    window.history.replaceState(null, "", clean);
  }, [pathname, searchParams]);

  const blocks = categories.filter((c) => c.services.length > 0);

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
    <div className="space-y-12">
      {blocks.map((cat) => (
        <section key={cat.id} id={`kategori-${cat.id}`} className="scroll-mt-6">
          <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-[#0B3C5D]/10 pb-3">
            <span className="text-lg" aria-hidden>
              {cat.icon}
            </span>
            <h2 className="text-lg font-bold tracking-tight text-[#0B3C5D] sm:text-xl">{cat.name}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cat.services.map((s) => (
              <GrowthServiceCard
                key={s.id}
                firmId={firmId}
                firmName={firmName}
                bank={bank}
                service={s}
                autoOpenToken={autoOpenToken}
                onAutoOpenConsumed={() => setAutoOpenToken(null)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
