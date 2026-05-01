import Link from "next/link";
import { FirmBlogCoverDisplay } from "@/components/blog/firm-blog-cover-display";

export type FeedHeroModel = {
  title: string;
  summary: string;
  imageUrl: string | null;
  href: string;
  categoryLabel: string | null;
};

type Props = {
  hero: FeedHeroModel;
};

export function FeedHero({ hero }: Props) {
  return (
    <section className="mb-10 scroll-mt-36 md:mb-12" aria-labelledby="akis-hero-title">
      <article className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#e5e7eb]/80 shadow-sm max-md:rounded-xl">
        <Link href={hero.href} className="block bg-[#f3f4f6]">
          {hero.imageUrl ? (
            <FirmBlogCoverDisplay
              src={hero.imageUrl}
              alt={hero.title}
              priority
              outerClassName="rounded-none border-0 shadow-none"
              showEmptyPlaceholder={false}
            />
          ) : (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-1 px-6 py-14 text-center">
              <p className="text-sm font-medium text-[#1A1A1A]/55">Kapak görseli yok</p>
              <p className="text-xs text-[#1A1A1A]/45">Başlığa tıklayarak yazıya gidebilirsiniz.</p>
            </div>
          )}
        </Link>
        <div className="min-w-0 space-y-4 px-6 py-7 sm:px-8 sm:py-8">
          {hero.categoryLabel ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b7280]">
              {hero.categoryLabel}
            </p>
          ) : null}
          <h2 id="akis-hero-title" className="text-[1.5rem] font-bold leading-tight text-[#111827] sm:text-[1.75rem]">
            <Link href={hero.href} className="hover:text-[#0B3C5D] hover:underline">
              {hero.title}
            </Link>
          </h2>
          {hero.summary ? (
            <p className="max-w-3xl text-[15px] leading-relaxed text-[#4b5563] sm:text-base">{hero.summary}</p>
          ) : null}
          <p className="pt-1">
            <Link
              href={hero.href}
              className="text-sm font-semibold text-[#0B3C5D] underline-offset-4 hover:underline"
            >
              Yazının tamamını oku
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
}
