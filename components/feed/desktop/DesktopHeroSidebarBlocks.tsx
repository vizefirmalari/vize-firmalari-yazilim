import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import { AKIS_SIDEBAR_POPULAR_TOPICS } from "@/lib/feed/akis-sidebar-popular-topics";

type HeadlineProps = {
  title: string;
  items: FeedHubBlogPost[];
  className?: string;
};

/** Güncel rehber başlıkları — kırpma yok, 2–3 satıra doğal dökülüm */
export function DesktopSidebarHeadlineList({ title, items, className = "" }: HeadlineProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className={`flex min-h-0 flex-col border border-[#cdd4db] bg-white ${className}`.trim()}
      aria-label={title}
    >
      <div className="shrink-0 border-b border-[#e5e7eb] px-3 py-2">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111827]">{title}</h3>
      </div>
      <ul className="min-h-0 flex-1 divide-y divide-[#eaeaea]">
        {items.map((p) => {
          const cat = p.category_name?.trim();
          return (
            <li key={p.id}>
              <Link href={p.target_url} prefetch={false} className="block px-3 py-2.5 hover:bg-[#f8fafc]">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-[#0B3C5D]">
                  {cat || "Rehber"}
                </div>
                <div className="mt-1 text-[13px] font-semibold leading-snug text-[#111827]">{p.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type PopularTopicsProps = { title?: string; className?: string };

/** Popüler konu kısayolları — iki sütun sıkı metin linki */
export function DesktopSidebarPopularTopics({ title = "Popüler Konular", className = "" }: PopularTopicsProps) {
  return (
    <nav
      className={`flex min-h-0 flex-col border border-[#cdd4db] bg-white ${className}`.trim()}
      aria-label={title}
    >
      <div className="shrink-0 border-b border-[#e5e7eb] px-3 py-2">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111827]">{title}</h3>
      </div>
      <ul className="min-h-0 flex-1 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] content-start gap-x-3 gap-y-2 px-3 py-2.5">
        {AKIS_SIDEBAR_POPULAR_TOPICS.map((t) => (
          <li key={t.listKey ?? t.slug} className="min-w-0">
            <Link
              href={`/akis/${t.slug}`}
              prefetch={false}
              className="block min-w-0 break-words text-[12px] font-semibold leading-tight text-[#374151] underline-offset-2 hover:text-[#0B3C5D] hover:underline"
            >
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type CompactProps = {
  title: string;
  items: FeedHubBlogPost[];
  className?: string;
};

/** Kompakt satır — 96×60 görselli */
export function DesktopSidebarCompactPosts({ title, items, className = "" }: CompactProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={`flex min-h-0 flex-col border border-[#cdd4db] bg-white ${className}`.trim()}
      aria-labelledby="desk-sidebar-latest-heading"
    >
      <div className="shrink-0 border-b border-[#e5e7eb] px-3 py-2">
        <h3 id="desk-sidebar-latest-heading" className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111827]">
          {title}
        </h3>
      </div>
      <ul className="min-h-0 flex-1 space-y-3 px-3 py-2.5">
        {items.map((post) => {
          const cat = post.category_name?.trim() ?? "Akış";
          return (
            <li key={post.id}>
              <Link
                href={post.target_url}
                prefetch={false}
                className="group flex gap-2 border-b border-[#eaeaea] pb-3 last:border-b-0 last:pb-0"
              >
                <span className="relative flex h-[60px] w-[96px] shrink-0 items-center justify-center overflow-hidden bg-[#eef3f7] ring-1 ring-[#e5e7eb]/80">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="max-h-full max-w-full object-contain object-center"
                    />
                  ) : (
                    <span className="px-1 text-center text-[8px] font-medium text-[#9ca3af]">Kapak yok</span>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#0B3C5D]">{cat}</span>
                  <span className="mt-0.5 block text-[13px] font-semibold leading-snug text-[#111827] group-hover:text-[#0B3C5D] group-hover:underline">
                    {post.title}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
