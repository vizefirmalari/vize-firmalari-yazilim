/**
 * Kategori vitrin placeholder — yalnızca tema tokenları (primary / secondary / accent / foreground).
 * Görsel yokken boş gri alan yerine gradient + soyut desen.
 */
export function storefrontCategoryPlaceholderClass(categorySlug: string): string {
  const presets: Record<string, string> = {
    "reklam-gorunurluk":
      "bg-gradient-to-br from-primary via-primary/90 to-secondary text-white",
    "yapay-zeka-otomasyon":
      "bg-gradient-to-br from-secondary from-[8%] via-primary/85 to-secondary text-white",
    "web-yazilim": "bg-gradient-to-br from-primary via-primary/75 to-accent text-white",
    "icerik-medya": "bg-gradient-to-br from-accent/95 via-primary/90 to-secondary text-white",
    "premium-sistemler":
      "bg-gradient-to-br from-primary via-secondary/90 to-primary text-white ring-1 ring-inset ring-accent/35",
    "akilli-paketler": "bg-gradient-to-br from-secondary via-accent/60 to-primary text-white",
  };
  return presets[categorySlug] ?? "bg-gradient-to-br from-primary via-secondary/80 to-primary text-white";
}

function DecoGrid({ patternId }: { patternId: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.14]" aria-hidden viewBox="0 0 400 300" preserveAspectRatio="none">
      <defs>
        <pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} className="text-white" />
    </svg>
  );
}

function DecoOrbit() {
  return (
    <svg className="pointer-events-none absolute -right-8 -top-10 h-48 w-48 text-white/20 sm:h-56 sm:w-56" aria-hidden viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="60" cy="18" r="6" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function DecoBars() {
  return (
    <svg className="pointer-events-none absolute bottom-4 left-4 h-20 w-28 text-white/25" aria-hidden viewBox="0 0 100 60">
      <rect x="4" y="28" width="12" height="28" rx="2" fill="currentColor" />
      <rect x="24" y="16" width="12" height="40" rx="2" fill="currentColor" opacity="0.85" />
      <rect x="44" y="8" width="12" height="48" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="64" y="22" width="12" height="34" rx="2" fill="currentColor" opacity="0.55" />
      <rect x="84" y="12" width="12" height="44" rx="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function DecoNodes() {
  return (
    <svg className="pointer-events-none absolute bottom-6 right-6 h-24 w-32 text-white/22" aria-hidden viewBox="0 0 120 80">
      <path d="M20 50 L55 25 L95 45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="50" r="5" fill="currentColor" />
      <circle cx="55" cy="25" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="95" cy="45" r="5" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function DecoPlay() {
  return (
    <svg className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-white/18" aria-hidden viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M32 26 L58 40 L32 54 Z" fill="currentColor" />
    </svg>
  );
}

function DecoStack() {
  return (
    <svg className="pointer-events-none absolute right-10 top-8 h-20 w-24 text-white/20" aria-hidden viewBox="0 0 80 70">
      <rect x="8" y="12" width="56" height="14" rx="3" fill="currentColor" opacity="0.9" />
      <rect x="4" y="30" width="64" height="14" rx="3" fill="currentColor" opacity="0.65" />
      <rect x="0" y="48" width="72" height="14" rx="3" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

function DecoBySlug({ slug, patternId }: { slug: string; patternId: string }) {
  switch (slug) {
    case "reklam-gorunurluk":
      return (
        <>
          <DecoGrid patternId={patternId} />
          <DecoBars />
        </>
      );
    case "yapay-zeka-otomasyon":
      return (
        <>
          <DecoGrid patternId={patternId} />
          <DecoNodes />
        </>
      );
    case "web-yazilim":
      return (
        <>
          <DecoGrid patternId={patternId} />
          <DecoOrbit />
        </>
      );
    case "icerik-medya":
      return (
        <>
          <DecoGrid patternId={patternId} />
          <DecoPlay />
        </>
      );
    case "premium-sistemler":
      return (
        <>
          <DecoGrid patternId={patternId} />
          <DecoStack />
        </>
      );
    case "akilli-paketler":
      return (
        <>
          <DecoGrid patternId={patternId} />
          <DecoOrbit />
          <DecoBars />
        </>
      );
    default:
      return (
        <>
          <DecoGrid patternId={patternId} />
          <DecoOrbit />
        </>
      );
  }
}

type PlaceholderProps = {
  categorySlug: string;
  categoryName: string;
  /** card: 16/10 · market: kare liste kartı · detail: galeri */
  variant: "card" | "detail" | "market";
  /** Kartta kısa etiket; detayda daha büyük. market varyantında kullanılmaz (başlık tekrarı önlenir). */
  headline?: string;
};

export function StorefrontCategoryPlaceholder({ categorySlug, categoryName, variant, headline }: PlaceholderProps) {
  const grad = storefrontCategoryPlaceholderClass(categorySlug);
  const aspect =
    variant === "detail" ? "aspect-[4/3]" : variant === "market" ? "aspect-square" : "aspect-[16/10]";
  const title = variant === "market" ? categoryName : (headline ?? categoryName);
  const patternId = `sf-ph-${categorySlug.replace(/[^a-zA-Z0-9_-]/g, "") || "cat"}`;

  return (
    <div
      className={`relative overflow-hidden ${aspect} w-full ${grad}`}
      role="img"
      aria-label={`${categoryName} vitrin görseli`}
    >
      <DecoBySlug slug={categorySlug} patternId={patternId} />
      <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Vitrin</p>
        <p
          className={`mt-1 max-w-[20rem] font-bold leading-snug text-white ${variant === "market" ? "text-xs sm:text-sm" : "text-sm sm:text-base"}`}
        >
          {title}
        </p>
        {variant !== "market" ? (
          <p className="mt-1 max-w-xs text-[11px] font-medium leading-relaxed text-white/75">
            {categoryName} · Profesyonel vitrin önizlemesi
          </p>
        ) : null}
      </div>
    </div>
  );
}
