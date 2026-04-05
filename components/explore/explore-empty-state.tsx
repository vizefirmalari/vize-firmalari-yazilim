import Link from "next/link";

type Props = {
  categoryLabel: string;
};

export function ExploreEmptyState({ categoryLabel }: Props) {
  return (
    <div className="premium-card mx-auto max-w-lg p-8 text-center md:p-10">
      <p className="text-base font-semibold text-primary">{categoryLabel}</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/75">
        Bu kategoride şu anda listelenen firma bulunmuyor. Farklı bir keşif
        alanına göz atabilir veya tüm firmaları inceleyebilirsiniz.
      </p>
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
        <Link
          href="/kesfet"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
        >
          Keşfet ana sayfası
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground/85 shadow-sm transition hover:bg-primary/[0.04]"
        >
          Tüm firmalar
        </Link>
      </div>
    </div>
  );
}
