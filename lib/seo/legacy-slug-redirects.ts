const LEGACY_FIRM_SLUG_REDIRECTS: Record<string, string> = {
  // "eski-firma-slug": "yeni-firma-slug",
};

const LEGACY_BLOG_POST_SLUG_REDIRECTS: Record<string, string> = {
  // "eski-blog-slug": "yeni-blog-slug",
};

const LEGACY_FIRM_POST_REDIRECTS: Record<string, { firmSlug?: string; postSlug?: string }> = {
  // "eski-firma-slug/eski-blog-slug": { firmSlug: "yeni-firma-slug", postSlug: "yeni-blog-slug" },
};

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

export function resolveLegacySlugRedirectPath(pathname: string): string | null {
  const normalized = normalizePathname(pathname);
  const parts = normalized.split("/").filter(Boolean);

  if (parts.length < 2 || parts[0] !== "firma") return null;

  let firmSlug = parts[1] ?? "";
  const mappedFirm = LEGACY_FIRM_SLUG_REDIRECTS[firmSlug];
  if (mappedFirm) {
    firmSlug = mappedFirm;
  }

  if (parts.length === 2) {
    const target = `/firma/${firmSlug}`;
    return target !== normalized ? target : null;
  }

  if (parts.length === 4 && parts[2] === "blog") {
    const oldPostSlug = parts[3] ?? "";
    const scopedKey = `${parts[1]}/${oldPostSlug}`;
    const scopedMapping = LEGACY_FIRM_POST_REDIRECTS[scopedKey];
    const mappedPost = scopedMapping?.postSlug ?? LEGACY_BLOG_POST_SLUG_REDIRECTS[oldPostSlug] ?? oldPostSlug;
    const mappedFirmSlug = scopedMapping?.firmSlug ?? firmSlug;
    const target = `/firma/${mappedFirmSlug}/blog/${mappedPost}`;
    return target !== normalized ? target : null;
  }

  return null;
}
