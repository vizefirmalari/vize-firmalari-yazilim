import Link from "next/link";
import type { HomeQuickDiscoverItem } from "@/lib/homepage/discovery-model";
import { QuickDiscoverIcon } from "@/components/home/homepage-vitrin-icons";

const SURFACES = [
  "from-primary/85 via-primary/70 to-secondary/55",
  "from-[#123f63] via-primary/72 to-[#1d5f8a]",
  "from-[#1e496a] via-[#25557b] to-secondary/58",
] as const;

export function HomepageFeaturedShowcaseBand({
  items,
}: {
  items: HomeQuickDiscoverItem[];
}) {
  if (!items.length) return null;
  const [main, second, third] = items;
  if (!main) return null;

  return (
    <div className="grid gap-4 md:grid-cols-[1.35fr_1fr] md:gap-5">
      <FeatureTile item={main} tone={SURFACES[0]} large />
      <div className="grid gap-4 md:gap-5">
        {second ? <FeatureTile item={second} tone={SURFACES[1]} /> : null}
        {third ? <FeatureTile item={third} tone={SURFACES[2]} /> : null}
      </div>
    </div>
  );
}

function FeatureTile({
  item,
  tone,
  large = false,
}: {
  item: HomeQuickDiscoverItem;
  tone: string;
  large?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`group relative overflow-hidden rounded-2xl border border-white/12 bg-linear-to-br ${tone} p-5 text-white shadow-[0_14px_34px_rgba(11,60,93,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(11,60,93,0.26)] ${
        large ? "min-h-50 md:min-h-60" : "min-h-[6.2rem] md:min-h-28"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-white/10" aria-hidden />
      <div className="relative flex h-full flex-col justify-between">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/12">
          <QuickDiscoverIcon id={item.icon} className="h-4 w-4 text-white" />
        </span>
        <div className="mt-5">
          <h3 className={`${large ? "text-xl md:text-2xl" : "text-base"} font-bold tracking-tight`}>
            {item.label}
          </h3>
        </div>
      </div>
    </Link>
  );
}
