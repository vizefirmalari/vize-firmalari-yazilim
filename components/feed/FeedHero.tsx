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
    <section className="mb-8 scroll-mt-36" aria-labelledby="akis-hero-title">
      <article className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.07)] max-md:rounded-2xl">
        <Link href={hero.href} className="block bg-[#eef2f7]">
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
              <p className="text-xs text-[#1A1A1A]/45">Başlığı okumak için yazıya gidin.</p>
            </div>
          )}
        </Link>
        <div className="min-w-0 space-y-3 p-5 sm:p-6">
          {hero.categoryLabel ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b7280]">
              {hero.categoryLabel}
            </p>
          ) : null}
          <h2 id="akis-hero-title" className="text-[1.35rem] leading-snug font-bold text-[#111827] sm:text-2xl">
            <Link href={hero.href} className="hover:underline">
              {hero.title}
            </Link>
          </h2>
          {hero.summary ? (
            <p className="line-clamp-3 text-sm leading-relaxed text-[#4b5563] sm:text-[15px]">{hero.summary}</p>
          ) : null}
          <div className="pt-1">
            <Link
              href={hero.href}
              className="inline-flex items-center rounded-full bg-[#0B3C5D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0A3552]"
            >
              Yazıyı oku
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
