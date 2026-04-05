import Link from "next/link";

type Props = {
  title: string;
  description: string;
  /** Detay sayfası için üst geri bağlantı */
  backHref?: string;
  backLabel?: string;
};

export function ExploreHero({
  title,
  description,
  backHref,
  backLabel = "Keşfet",
}: Props) {
  return (
    <div className="relative overflow-hidden border-b border-border/80 bg-gradient-to-br from-primary/[0.07] via-background to-secondary/[0.06]">
      <div
        className="pointer-events-none absolute -right-16 -top-24 h-48 w-48 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />
      <div className="container-shell relative py-8 md:py-10">
        {backHref ? (
          <nav aria-label="Gezinti" className="mb-4">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition hover:text-primary"
            >
              <span aria-hidden>←</span>
              {backLabel}
            </Link>
          </nav>
        ) : null}
        <h1 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/75 md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
