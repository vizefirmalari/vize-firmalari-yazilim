import type { GrowthCatalogCategory } from "@/lib/types/growth-commerce";

import { GrowthServiceCard } from "./growth-service-card";

type Props = {
  firmId: string;
  categories: GrowthCatalogCategory[];
};

export function GrowthCategoriesSection({ firmId, categories }: Props) {
  const blocks = categories.filter((c) => c.services.length > 0);

  if (!blocks.length) {
    return (
      <div className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-medium text-[#1A1A1A]/65">
          Şu an listelenecek aktif hizmet bulunmuyor. Yönetim panelinden katalog güncellendiğinde burada görünür.
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
              <GrowthServiceCard key={s.id} firmId={firmId} service={s} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
