import Link from "next/link";
import type { FeedHubBlogPost } from "@/lib/data/feed";

type Props = {
  posts: FeedHubBlogPost[];
  className?: string;
};

/** Manşet altı dörtlü blok — görsel üstte, başlık kırpılmaz */
export function DesktopFourAcross({ posts, className = "" }: Props) {
  const row = posts.filter(Boolean).slice(0, 4);
  if (row.length === 0) return null;

  return (
    <section aria-label="Günün öne çıkanları" className={["mb-0", className].filter(Boolean).join(" ")}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {row.map((post) => {
          const tag = post.category_name?.trim();
          return (
            <article key={post.id} className="h-auto self-start border border-[#cdd4db] bg-white">
              <Link href={post.target_url} prefetch={false} className="group flex flex-col">
                <span className="flex items-center justify-center bg-[#eef3f7] px-2 py-3">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="max-h-[160px] w-full max-w-full object-contain object-center"
                    />
                  ) : (
                    <span className="py-8 text-[11px] font-medium text-[#9ca3af]">Kapak yok</span>
                  )}
                </span>
                <span className="flex flex-col px-3 py-2.5">
                  {tag ? <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0B3C5D]">{tag}</span> : null}
                  <h3 className="mt-2 text-[14px] font-bold leading-snug text-[#111827] group-hover:text-[#0B3C5D] group-hover:underline md:text-[15px]">
                    {post.title}
                  </h3>
                </span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
