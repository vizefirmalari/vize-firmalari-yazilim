import Link from "next/link";
import type { AkisNewsHomeFilledSection } from "@/lib/feed/akis-news-home-data";

type Props = {
  filled: AkisNewsHomeFilledSection;
  isFirst?: boolean;
};

/** Kategori bölümü — belirgin yatay kartlar ve başlık çizgisi */
export function NewsCategoryBlock({ filled, isFirst }: Props) {
  const { config, posts } = filled;
  if (posts.length === 0) return null;

  return (
    <section
      className={`pb-8 ${isFirst ? "pt-0" : "border-t border-[#e5e7eb] pt-8"} md:pb-10 md:pt-10`}
      aria-labelledby={`akis-block-${config.viewAllSlug}`}
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-[#e5e7eb] pb-3 md:mb-6">
        <h2 id={`akis-block-${config.viewAllSlug}`} className="text-lg font-bold tracking-tight text-[#111827] md:text-xl">
          {config.displayTitle}
        </h2>
        <Link
          href={`/akis/${config.viewAllSlug}`}
          prefetch={false}
          className="text-[13px] font-semibold text-[#0B3C5D] underline-offset-4 hover:underline"
        >
          Tümünü gör
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
        {posts.map((post) => {
          const tag = post.category_name?.trim();
          return (
            <li key={post.id} className="min-w-0">
              <article className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                <Link
                  href={post.target_url}
                  className="relative shrink-0 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#eef3f7] mx-auto w-full max-w-[320px] h-[148px] sm:mx-0 sm:h-[126px] sm:w-[184px] md:h-[118px] md:w-[192px] lg:h-[118px] lg:w-[206px]"
                >
                  {post.image_url ? (
                    <span className="relative flex size-full items-center justify-center p-3">
                      <img
                        src={post.image_url}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="max-h-[calc(100%-6px)] max-w-[calc(100%-6px)] object-contain object-center"
                      />
                    </span>
                  ) : (
                    <span className="flex h-full items-center justify-center px-3 text-center text-[11px] font-medium leading-tight text-[#9ca3af]">
                      Görsel yok
                    </span>
                  )}
                </Link>
                <div className="min-w-0 flex-1 py-0.5">
                  {tag ? (
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#0B3C5D]">{tag}</p>
                  ) : null}
                  <h3 className="font-bold leading-snug text-[#111827]">
                    <Link href={post.target_url} className="line-clamp-2 text-[15px] sm:text-[16px] hover:text-[#0B3C5D] hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  {post.description ? (
                    <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-[#4b5563] md:line-clamp-2">{post.description}</p>
                  ) : null}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
