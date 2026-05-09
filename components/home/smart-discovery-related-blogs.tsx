import Link from "next/link";
import type { FeedItem } from "@/lib/data/feed";

export function SmartDiscoveryRelatedBlogs({
  items,
  title,
}: {
  items: FeedItem[];
  title: string;
}) {
  const blogs = items.filter((item) => item.type === "blog").slice(0, 3);
  if (blogs.length === 0) return null;

  return (
    <section
      aria-labelledby="smart-discovery-blogs-title"
      className="rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
            İlgili rehberler
          </p>
          <h2 id="smart-discovery-blogs-title" className="mt-1 text-lg font-bold text-primary">
            {title}
          </h2>
        </div>
        <Link
          href="/akis?type=blog"
          className="text-sm font-semibold text-secondary/90 underline-offset-4 hover:text-secondary hover:underline"
        >
          Tüm rehberleri incele
        </Link>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {blogs.map((item) => (
          <Link
            key={item.id}
            href={item.target_url}
            className="group rounded-xl border border-border bg-surface/45 p-4 transition hover:bg-primary/4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/45">
              {item.category_name ?? item.company_name}
            </p>
            <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-primary group-hover:underline">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-foreground/62">
                {item.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
