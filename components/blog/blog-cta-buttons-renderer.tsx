import { BLOG_CTA_PLATFORMS, blogCtaRel, type BlogCtaButton } from "@/lib/blog/cta-buttons";

function PlatformIcon({ platform }: { platform: BlogCtaButton["platform"] }) {
  if (platform === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11.7 11.7 0 0 0 12.2 0C5.7 0 .4 5.3.4 11.8c0 2.1.6 4.2 1.7 6L0 24l6.4-2.1a11.7 11.7 0 0 0 5.8 1.5h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.6-8.1Z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M13.7 22v-8h2.7l.5-3h-3.2V9c0-.9.3-1.6 1.7-1.6H17V4.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v2H7.5v3h2.8v8h3.4Z" />
      </svg>
    );
  }
  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M5.4 8.5a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM3.8 20.2h3.3V9.8H3.8v10.4Zm5.4 0h3.2v-5.1c0-1.3.2-2.6 1.8-2.6 1.6 0 1.6 1.5 1.6 2.7v5h3.2v-5.7c0-2.8-.6-5-3.9-5-1.6 0-2.7.9-3.1 1.7h-.1V9.8H9.2v10.4Z" />
      </svg>
    );
  }
  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.6A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8Z" />
      </svg>
    );
  }
  if (platform === "website") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path d="M10.6 13.4a3 3 0 0 0 4.2 0l2.8-2.8a3 3 0 0 0-4.2-4.2l-.7.7M13.4 10.6a3 3 0 0 0-4.2 0l-2.8 2.8a3 3 0 0 0 4.2 4.2l.7-.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

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
                <PlatformIcon platform={btn.platform} />
              </span>
              <span className="truncate">{btn.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
