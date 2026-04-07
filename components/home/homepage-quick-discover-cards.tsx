import Link from "next/link";
import type { HomeQuickDiscoverItem } from "@/lib/homepage/discovery-model";
import { QuickDiscoverIcon } from "@/components/home/homepage-vitrin-icons";

export function HomepageQuickDiscoverCards({
  items,
}: {
  items: HomeQuickDiscoverItem[];
}) {
  if (!items.length) return null;
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          title={item.label}
          className="group flex w-[7.5rem] shrink-0 snap-start flex-col items-center gap-3 rounded-2xl border border-border/90 bg-background/95 px-4 py-4 text-center shadow-[0_6px_22px_rgba(11,60,93,0.07)] ring-1 ring-black/[0.04] transition duration-200 hover:-translate-y-0.5 hover:border-primary/28 hover:shadow-[0_14px_34px_rgba(11,60,93,0.12)] hover:ring-primary/10 sm:w-[8rem] md:w-[8.25rem] md:px-[1.125rem] md:py-[1.125rem]"
        >
          <span className="rounded-xl bg-primary/9 p-2.5 text-primary shadow-inner ring-1 ring-primary/10 transition group-hover:bg-primary/14 group-hover:ring-primary/15">
            <QuickDiscoverIcon
              id={item.icon}
              className="h-5 w-5 md:h-6 md:w-6"
            />
          </span>
          <span className="line-clamp-2 min-h-[2.25rem] text-[11px] font-semibold leading-snug text-foreground/90 md:min-h-0 md:text-xs">
            {item.shortLabel}
          </span>
        </Link>
      ))}
    </>
  );
}
