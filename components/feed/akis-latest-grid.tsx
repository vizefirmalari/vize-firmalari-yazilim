import type { FeedHubBlogPost } from "@/lib/data/feed";
import { AkisDigestCard } from "@/components/feed/akis-digest-card";

type Props = {
  posts: FeedHubBlogPost[];
};

/** Son Eklenenler — sunucuda render (ilk 6). */
export function AkisLatestGrid({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="mb-12 md:mb-14" aria-labelledby="akis-latest-heading">
      <h2 id="akis-latest-heading" className="mb-6 text-lg font-bold tracking-tight text-[#111827] sm:text-xl md:mb-8">
        Son Eklenenler
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {posts.map((p) => (
          <AkisDigestCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}
