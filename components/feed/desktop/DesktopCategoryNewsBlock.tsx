import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";
import type { AkisNewsHomeFilledSection } from "@/lib/feed/akis-news-home-data";
import { FeedCardRelativeTime } from "@/components/feed/feed-card-relative-time";

type Props = {
  filled: AkisNewsHomeFilledSection;
};

function ThumbCell({ post }: { post: FeedHubBlogPost }) {
  const tag = post.category_name?.trim();
  return (
    <article className="h-auto self-start border border-[#cdd4db] bg-white">
      <Link href={post.target_url} prefetch={false} className="group flex flex-col">
        <span className="flex items-center justify-center bg-[#eef3f7] px-2 py-3">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="max-h-[150px] w-full max-w-full object-contain object-center"
            />
          ) : (
            <span className="py-6 text-[10px] font-medium text-[#9ca3af]">Kapak yok</span>
          )}
        </span>
        <span className="min-w-0 px-2.5 py-2.5">
          {tag ? <span className="text-[10px] font-semibold uppercase tracking-wide text-[#0B3C5D]">{tag}</span> : null}
          <h3 className="mt-2 text-[14px] font-bold leading-snug text-[#111827] group-hover:text-[#0B3C5D] group-hover:underline">
            {post.title}
          </h3>
        </span>
      </Link>
    </article>
  );
}

/** Tam genişlik: sol büyük + sağda 2×2 küçük (12 kolon) */
export function DesktopCategoryNewsBlock({ filled }: Props) {
  const { config, posts } = filled;
  if (posts.length === 0) return null;

  const lead = posts[0]!;
  const gridFour = posts.slice(1, 5);
  const leadTag = lead.category_name?.trim();

  return (
    <section className="border-t border-[#e5e7eb] pt-5" aria-labelledby={`desk-akis-block-${config.viewAllSlug}`}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b-2 border-[#111827] pb-2">
        <h2 id={`desk-akis-block-${config.viewAllSlug}`} className="text-xl font-bold tracking-tight text-[#111827] md:text-[1.35rem]">
          {config.displayTitle}
        </h2>
        <Link
          href={`/akis/${config.viewAllSlug}`}
          prefetch={false}
          className="text-[13px] font-semibold text-[#0B3C5D] underline-offset-4 hover:underline"
        >
          Tümünü gör
        </Link>
      </header>

      <div className="mt-4 grid grid-cols-12 items-start gap-4">
        <article className="col-span-12 h-auto self-start border border-[#cdd4db] bg-white lg:col-span-6">
          <Link href={lead.target_url} prefetch={false} className="block">
            <div className="flex items-center justify-center bg-[#eef3f7] px-4 py-4">
              {lead.image_url ? (
                <img
                  src={lead.image_url}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="max-h-[min(280px,38vh)] w-full max-w-full object-contain object-center"
                />
              ) : (
                <span className="py-12 text-sm font-medium text-[#9ca3af]">Kapak yok</span>
              )}
            </div>
            <div className="space-y-2 border-t border-[#e5e7eb] px-4 py-4">
              {leadTag ? <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]">{leadTag}</p> : null}
              <div className="flex flex-wrap items-center gap-x-2 text-[12px] font-medium text-[#6b7280]">
                <FeedCardRelativeTime iso={lead.created_at} />
              </div>
              <h3 className="text-[1.2rem] font-bold leading-snug text-[#111827] md:text-[1.3rem]">{lead.title}</h3>
              {lead.description?.trim() ? (
                <p className="text-[14px] leading-relaxed text-[#4b5563]">{lead.description.trim()}</p>
              ) : null}
            </div>
          </Link>
        </article>

        <div className="col-span-12 grid grid-cols-2 items-start gap-4 self-start lg:col-span-6">
          {gridFour.map((p) => (
            <ThumbCell key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
