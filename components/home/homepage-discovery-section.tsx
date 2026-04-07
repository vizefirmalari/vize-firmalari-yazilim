import Link from "next/link";
import type { ReactNode } from "react";

export function HomepageDiscoverySection({
  id,
  title,
  description,
  seeAllHref,
  seeAllLabel = "Tümünü gör",
  children,
}: {
  id?: string;
  title: string;
  description: string;
  seeAllHref: string;
  seeAllLabel?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-6 flex flex-col gap-2.5 px-0.5 sm:flex-row sm:items-end sm:justify-between md:mb-8 md:px-0">
        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-primary md:text-[1.22rem]">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-foreground/62">
            {description}
          </p>
        </div>
        <Link
          href={seeAllHref}
          className="shrink-0 text-sm font-semibold text-secondary/90 underline-offset-4 hover:text-secondary hover:underline"
        >
          {seeAllLabel}
        </Link>
      </div>
      <div className="relative min-w-0">{children}</div>
    </section>
  );
}
