import { unstable_cache } from "next/cache";
import { getSiteUrl, isSupabaseConfigured } from "@/lib/env";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { listExploreSlugs } from "@/lib/explore/explore-categories";
import {
  COUNTRY_GUIDE_CATALOG_BASE_PATH,
  listCountryGuideSlugs,
} from "@/lib/country-guides/taxonomy";
import { listPublicDocumentPages } from "@/lib/seo/public-routes";
import { resolveToAbsoluteImageUrl } from "@/lib/seo/blog-og-image";

/** Google sitemap urlset — priority 0.0–1.0 (opsiyonel). */
export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** 0 ile 1 arası; çıktıda nokta ayırıcılı ondalık stringe dönüştürülür. */
  priority?: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
};

type SitemapSection = "static" | "firms" | "blog" | "flow" | "categories" | "countries" | "visa-types";

/** Sitemap index’te yalnızca gerçekten URL içeren bölümler (boş alt dosya = tarama israfı). */
const SITEMAP_INDEX_SECTIONS: SitemapSection[] = ["static", "firms", "blog"];

/** Eski /sitemaps/{flow|categories|...}.xml istekleri 404 olmasın; boş urlset döner. */
const LEGACY_EMPTY_SITEMAP_SECTIONS = new Set<SitemapSection>([
  "flow",
  "categories",
  "countries",
  "visa-types",
]);

const SITEMAP_CHUNK_SIZE = 40000;
const EXCLUDED_PATH_PREFIXES = [
  "/admin",
  "/panel",
  "/hesabim",
  "/giris",
  "/kayit",
  "/auth",
  "/sifre-unuttum",
  "/sifre-yenile",
  "/api",
] as const;

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function normalizeCanonicalUrl(pathOrUrl: string): string {
  const raw = pathOrUrl.trim();
  if (!raw) return getSiteUrl().replace(/\/$/, "");
  const absolute = /^https?:\/\//i.test(raw)
    ? raw
    : `${getSiteUrl().replace(/\/$/, "")}/${raw.replace(/^\//, "")}`;
  const url = new URL(absolute);
  const normalizedPath = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
  return `${url.origin}${normalizedPath}`;
}

function slugLooksValid(slug: string | null | undefined): boolean {
  const s = String(slug ?? "").trim();
  if (!s) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
}

function isDummyOrTestSlug(slug: string): boolean {
  return /(?:^|[-])(test|dummy|demo|ornek|sample|sandbox|staging|dev)(?:$|[-])/i.test(slug);
}

function dedupeUrls(items: SitemapUrl[]): SitemapUrl[] {
  const seen = new Set<string>();
  const out: SitemapUrl[] = [];
  for (const item of items) {
    if (!isIndexableCanonicalUrl(item.loc)) continue;
    if (seen.has(item.loc)) continue;
    seen.add(item.loc);
    out.push(item);
  }
  return out;
}

function isIndexableCanonicalUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (!/^https?:$/i.test(u.protocol)) return false;
    if (u.search || u.hash) return false;
    const path = u.pathname.replace(/\/+$/, "") || "/";
    if (EXCLUDED_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function chunkUrls<T>(items: T[], chunkSize: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    out.push(items.slice(i, i + chunkSize));
  }
  return out;
}

function toLastmod(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function normalizeImageSitemapUrl(raw: string | null | undefined): string | undefined {
  const abs = resolveToAbsoluteImageUrl(raw);
  if (!abs) return undefined;
  try {
    const u = new URL(abs);
    if (!/^https?:$/i.test(u.protocol)) return undefined;
    return u.href;
  } catch {
    return undefined;
  }
}

function formatSitemapPriority(value: number | undefined): string | undefined {
  if (value === undefined || Number.isNaN(value)) return undefined;
  const clamped = Math.min(1, Math.max(0, value));
  return String(Math.round(clamped * 100) / 100);
}

const getFirmRows = unstable_cache(
  async () => {
    if (!isSupabaseConfigured()) {
      return [] as Array<{
        slug: string;
        name: string;
        logo_url: string | null;
        logo_alt_text: string | null;
        updated_at: string | null;
        created_at: string | null;
      }>;
    }
    const supabase = createSupabasePublicClient();
    if (!supabase) {
      return [] as Array<{
        slug: string;
        name: string;
        logo_url: string | null;
        logo_alt_text: string | null;
        updated_at: string | null;
        created_at: string | null;
      }>;
    }

    const { data } = await supabase
      .from("firms")
      .select("slug,name,logo_url,logo_alt_text,updated_at,created_at,status,is_indexable,firm_page_enabled")
      .eq("status", "published")
      .eq("is_indexable", true);

    return (data ?? [])
      .filter((r) => (r as { firm_page_enabled?: boolean | null }).firm_page_enabled !== false)
      .map((r) => ({
        slug: String((r as { slug?: string }).slug ?? ""),
        name: String((r as { name?: string }).name ?? ""),
        logo_url: (r as { logo_url?: string | null }).logo_url ?? null,
        logo_alt_text: (r as { logo_alt_text?: string | null }).logo_alt_text ?? null,
        updated_at: (r as { updated_at?: string | null }).updated_at ?? null,
        created_at: (r as { created_at?: string | null }).created_at ?? null,
      }))
      .filter((r) => slugLooksValid(r.slug))
      .filter((r) => !isDummyOrTestSlug(r.slug));
  },
  ["sitemap-firms-v1"],
  { revalidate: 900 }
);

const getBlogRows = unstable_cache(
  async () => {
    if (!isSupabaseConfigured()) {
      return [] as Array<{
        post_slug: string;
        company_slug: string;
        firm_id: string | null;
        title: string | null;
        cover_image_url: string | null;
        cover_image_alt: string | null;
        published_at: string | null;
        updated_at: string | null;
      }>;
    }
    const supabase = createSupabasePublicClient();
    if (!supabase) {
      return [] as Array<{
        post_slug: string;
        company_slug: string;
        firm_id: string | null;
        title: string | null;
        cover_image_url: string | null;
        cover_image_alt: string | null;
        published_at: string | null;
        updated_at: string | null;
      }>;
    }

    const { data } = await supabase
      .from("firm_blog_posts")
      .select("slug,company_slug,firm_id,title,cover_image_url,cover_image_alt,published_at,updated_at,status")
      .eq("status", "published")
      .not("published_at", "is", null)
      .limit(200000);

    const baseRows = (data ?? [])
      .map((r) => ({
        post_slug: String((r as { slug?: string }).slug ?? ""),
        company_slug: String((r as { company_slug?: string }).company_slug ?? ""),
        firm_id: (r as { firm_id?: string | null }).firm_id ?? null,
        title: (r as { title?: string | null }).title ?? null,
        cover_image_url: (r as { cover_image_url?: string | null }).cover_image_url ?? null,
        cover_image_alt: (r as { cover_image_alt?: string | null }).cover_image_alt ?? null,
        published_at: (r as { published_at?: string | null }).published_at ?? null,
        updated_at: (r as { updated_at?: string | null }).updated_at ?? null,
      }))
      .filter((r) => slugLooksValid(r.post_slug));

    const missingFirmIds = Array.from(
      new Set(
        baseRows
          .filter((r) => !slugLooksValid(r.company_slug) && typeof r.firm_id === "string" && r.firm_id.trim().length > 0)
          .map((r) => String(r.firm_id))
      )
    );

    let firmSlugById = new Map<string, string>();
    if (missingFirmIds.length > 0) {
      const { data: firmRows } = await supabase
        .from("firms")
        .select("id,slug")
        .in("id", missingFirmIds);
      firmSlugById = new Map(
        (firmRows ?? [])
          .map((row) => ({
            id: String((row as { id?: string }).id ?? ""),
            slug: String((row as { slug?: string }).slug ?? ""),
          }))
          .filter((row) => row.id.length > 0 && slugLooksValid(row.slug))
          .map((row) => [row.id, row.slug])
      );
    }

    return baseRows
      .map((r) => {
        const fallbackSlug =
          typeof r.firm_id === "string" ? firmSlugById.get(String(r.firm_id)) : undefined;
        const resolvedCompanySlug = slugLooksValid(r.company_slug)
          ? r.company_slug
          : (fallbackSlug ?? "");
        return { ...r, company_slug: resolvedCompanySlug };
      })
      .filter((r) => slugLooksValid(r.company_slug));
  },
  ["sitemap-blog-v2"],
  { revalidate: 900 }
);

function buildStaticSectionUrls(): SitemapUrl[] {
  const rows: SitemapUrl[] = [
    { loc: normalizeCanonicalUrl("/"), changefreq: "daily", priority: 1 },
    { loc: normalizeCanonicalUrl("/akis"), changefreq: "daily", priority: 0.9 },
    { loc: normalizeCanonicalUrl("/kesfet"), changefreq: "weekly", priority: 0.85 },
    { loc: normalizeCanonicalUrl(COUNTRY_GUIDE_CATALOG_BASE_PATH), changefreq: "weekly", priority: 0.85 },
  ];
  for (const slug of listExploreSlugs()) {
    rows.push({
      loc: normalizeCanonicalUrl(`/kesfet/${slug}`),
      changefreq: "weekly",
      priority: 0.72,
    });
  }
  for (const slug of listCountryGuideSlugs()) {
    rows.push({
      loc: normalizeCanonicalUrl(`${COUNTRY_GUIDE_CATALOG_BASE_PATH}/${slug}`),
      changefreq: "weekly",
      priority: 0.78,
    });
  }
  for (const p of listPublicDocumentPages()) {
    rows.push({
      loc: normalizeCanonicalUrl(p.path),
      changefreq: p.changeFrequency,
      priority: p.priority,
    });
  }
  return dedupeUrls(rows);
}

export async function getIndexableUrlsBySection(section: SitemapSection): Promise<SitemapUrl[]> {
  const nowIso = new Date().toISOString();

  if (section === "static") {
    return buildStaticSectionUrls();
  }

  if (section === "firms") {
    const firms = await getFirmRows();
    return dedupeUrls(
      firms.map((f) => ({
        loc: normalizeCanonicalUrl(`/firma/${f.slug}`),
        lastmod: toLastmod(f.updated_at ?? f.created_at) ?? nowIso,
        changefreq: "weekly" as const,
        priority: 0.64,
        images: (() => {
          const logo = normalizeImageSitemapUrl(f.logo_url);
          if (!logo) return undefined;
          const alt = String(f.logo_alt_text ?? "").trim() || `${f.name} logosu`;
          return [{ loc: logo, title: `${f.name} logo`, caption: alt }];
        })(),
      }))
    );
  }

  if (section === "blog") {
    const blogs = await getBlogRows();
    return dedupeUrls(
      blogs.map((b) => ({
        loc: normalizeCanonicalUrl(`/firma/${b.company_slug}/blog/${b.post_slug}`),
        lastmod: toLastmod(b.updated_at ?? b.published_at) ?? nowIso,
        changefreq: "monthly" as const,
        priority: 0.55,
        images: (() => {
          const cover = normalizeImageSitemapUrl(b.cover_image_url);
          if (!cover) return undefined;
          const title = String(b.title ?? "").trim();
          const alt = String(b.cover_image_alt ?? "").trim();
          return [
            {
              loc: cover,
              title: title || undefined,
              caption: alt || title || undefined,
            },
          ];
        })(),
      }))
    );
  }

  // flow / categories / countries / visa-types: index’te yok; boş urlset için LEGACY_EMPTY_SITEMAP_SECTIONS.
  return [];
}

export async function getSitemapIndexEntries(): Promise<SitemapUrl[]> {
  const nowIso = new Date().toISOString();
  return SITEMAP_INDEX_SECTIONS.map((section) => ({
    loc: normalizeCanonicalUrl(`/sitemaps/${section}.xml`),
    lastmod: nowIso,
  }));
}

export async function getSitemapChunk(sectionAndPage: string): Promise<SitemapUrl[]> {
  const match = sectionAndPage.match(/^([a-z-]+?)(?:-(\d+))?$/i);
  if (!match) return [];
  const section = (match[1] ?? "") as SitemapSection;
  const page = Number(match[2] ?? "1");
  const known =
    section === "static" ||
    section === "firms" ||
    section === "blog" ||
    LEGACY_EMPTY_SITEMAP_SECTIONS.has(section);
  if (!known) return [];
  if (!Number.isFinite(page) || page < 1) return [];

  const urls = await getIndexableUrlsBySection(section);
  const chunks = chunkUrls(urls, SITEMAP_CHUNK_SIZE);
  return chunks[page - 1] ?? [];
}

export function buildSitemapIndexXml(entries: SitemapUrl[]): string {
  const nodes = entries
    .map(
      (e) =>
        `<sitemap><loc>${xmlEscape(e.loc)}</loc>${e.lastmod ? `<lastmod>${xmlEscape(e.lastmod)}</lastmod>` : ""}</sitemap>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${nodes}</sitemapindex>`;
}

export function buildUrlSetXml(entries: SitemapUrl[]): string {
  const hasImageNodes = entries.some((e) => Array.isArray(e.images) && e.images.length > 0);
  const nodes = entries
    .map((e) => {
      const lastmod = e.lastmod ? `<lastmod>${xmlEscape(e.lastmod)}</lastmod>` : "";
      const changefreq = e.changefreq ? `<changefreq>${xmlEscape(e.changefreq)}</changefreq>` : "";
      const pr = formatSitemapPriority(e.priority);
      const priority = pr !== undefined ? `<priority>${xmlEscape(pr)}</priority>` : "";
      const images = (e.images ?? [])
        .map((img) => {
          const title = img.title ? `<image:title>${xmlEscape(img.title)}</image:title>` : "";
          const caption = img.caption
            ? `<image:caption>${xmlEscape(img.caption)}</image:caption>`
            : "";
          return `<image:image><image:loc>${xmlEscape(img.loc)}</image:loc>${title}${caption}</image:image>`;
        })
        .join("");
      return `<url><loc>${xmlEscape(e.loc)}</loc>${lastmod}${changefreq}${priority}${images}</url>`;
    })
    .join("");
  const imageNs = hasImageNodes
    ? ` xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${imageNs}>${nodes}</urlset>`;
}

