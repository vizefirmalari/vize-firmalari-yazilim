import { BLOG_CTA_PLATFORMS, blogCtaRel, type BlogCtaButton } from "@/lib/blog/cta-buttons";

import { BlogCtaPlatformIcon } from "@/components/blog/blog-cta-platform-icon";

export function BlogCtaButtonsRenderer({ buttons }: { buttons: BlogCtaButton[] }) {
  const enabled = buttons.filter((b) => b.is_enabled);
  if (enabled.length === 0) return null;

  return (
    <div className="mt-6 rounded-2xl border border-[#0B3C5D]/10 bg-[#F8FAFC] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0B3C5D]/65">
        Hızlı yönlendirme
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {enabled.map((btn) => {
          const platformName =
            BLOG_CTA_PLATFORMS.find((p) => p.id === btn.platform)?.label ?? "Bağlantı";
          return (
            <a
              key={btn.id}
              href={btn.url}
              target="_blank"
              rel={blogCtaRel(true)}
              className="inline-flex min-h-10 max-w-full items-center gap-2 rounded-xl border border-[#0B3C5D]/12 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#F2F6FA]"
              aria-label={`${platformName}: ${btn.label}`}
              title={platformName}
            >
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#0B3C5D]/10 px-1 text-[10px] font-bold">
                <BlogCtaPlatformIcon platform={btn.platform} />
              </span>
              <span className="truncate">{btn.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
