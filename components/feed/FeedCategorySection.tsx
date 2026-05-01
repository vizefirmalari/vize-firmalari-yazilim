import type { FeedHubSection } from "@/lib/feed/feed-hub-taxonomy";
import { FeedPortalCard } from "@/components/feed/FeedPortalCard";

type Props = {
  section: FeedHubSection;
};

export function FeedCategorySection({ section }: Props) {
  const { def, posts } = section;
  if (posts.length === 0) return null;

  return (
    <section
      id={def.anchorId}
      className="scroll-mt-35 sm:scroll-mt-40 md:scroll-mt-44"
      aria-labelledby={`feed-hub-${def.anchorId}`}
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 id={`feed-hub-${def.anchorId}`} className="text-lg font-bold text-[#111827] sm:text-xl">
          {def.sectionTitle}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {posts.map((post) => (
          <FeedPortalCard key={post.id} post={post} categoryLabel={def.barLabel} />
        ))}
      </div>
    </section>
  );
}
