import type { FirmRow } from "@/lib/types/firm";
import { FirmCard } from "@/components/home/firm-card";

type FirmsSectionProps = {
  firms: FirmRow[];
  sectionTitle?: string | null;
  sectionSubtitle?: string | null;
};

export function FirmsSection({
  firms,
  sectionTitle,
  sectionSubtitle,
}: FirmsSectionProps) {
  const title =
    sectionTitle?.trim() || "Öne Çıkan Vize Firmaları";
  const subtitle =
    sectionSubtitle?.trim() ||
    "Hype Puanı ve Kurumsallık Skoru ile öne çıkan danışmanlık firmaları";

  return (
    <section id="firmalar" className="scroll-mt-28">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[#1A1A1A]/65">{subtitle}</p>
        </div>
      </div>

      {firms.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#0B3C5D]/20 bg-white p-10 text-center text-[#1A1A1A]/70">
          <p className="font-medium text-[#0B3C5D]">Sonuç bulunamadı</p>
          <p className="mt-2 text-sm">
            Filtreleri veya arama terimini değiştirerek tekrar deneyin.
          </p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {firms.map((firm) => (
            <li key={firm.id}>
              <FirmCard firm={firm} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
