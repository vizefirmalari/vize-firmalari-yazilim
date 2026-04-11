type CountryGuideHeroProps = {
  title: string;
  subtitle: string;
  intro: string;
};

export function CountryGuideHero({ title, subtitle, intro }: CountryGuideHeroProps) {
  return (
    <header className="rounded-2xl border border-border bg-white p-6 shadow-[0_2px_14px_rgba(11,60,93,0.06)] sm:p-8 md:p-10">
      <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-[1.75rem]">
        {title}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
        {subtitle}
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/70">{intro}</p>
      <div className="mt-6 flex flex-wrap gap-2 rounded-xl border border-primary/10 bg-surface/80 px-4 py-3 text-xs font-medium text-foreground/70">
        <span className="rounded-md bg-primary/8 px-2.5 py-1 text-primary">Ülke seç</span>
        <span className="text-foreground/40" aria-hidden>
          →
        </span>
        <span className="rounded-md bg-primary/8 px-2.5 py-1 text-primary">Rehberi incele</span>
        <span className="text-foreground/40" aria-hidden>
          →
        </span>
        <span className="rounded-md bg-primary/8 px-2.5 py-1 text-primary">
          Hizmet veren firmaları gör
        </span>
      </div>
    </header>
  );
}
