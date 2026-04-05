type Props = {
  tags: string[];
};

/**
 * Tüm etiketler gösterilir (panelde girilen sayıyla uyumlu). Önceden ilk 5 + mobil “daha fazla” vardı;
 * “daha fazla” yalnızca mobilde görününce masaüstünde 6+ etiket hiç açılamıyordu.
 */
export function BlogTagsSection({ tags }: Props) {
  return (
    <section className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#0B3C5D]/65 sm:text-sm sm:text-[#0B3C5D]/70">
        Etiketler
      </h2>

      <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-0.5 rounded-md border border-[#0B3C5D]/10 bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-medium text-[#0B3C5D]/90 sm:rounded-full sm:px-3 sm:py-1 sm:text-xs sm:text-[#0B3C5D]"
          >
            <span className="text-[#0B3C5D]/45">#</span>
            <span>{tag}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

