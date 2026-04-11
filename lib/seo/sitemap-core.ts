import { unstable_cache } from "next/cache";
import { getSiteUrl, isSupabaseConfigured } from "@/lib/env";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { listExploreSlugs } from "@/lib/explore/explore-categories";
import {
  COUNTRY_GUIDE_CATALOG_BASE_PATH,
  listCountryGuideSlugs,
} from "@/lib/country-guides/taxonomy";
import { listPublicDocumentPages } from "@/lib/seo/public-routes";

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
};

type SitemapSection = "static" | "firms" | "blog" | "flow" | "categories" | "countries" | "visa-types";

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

const getFirmRows = unstable_cache(
  async () => {
    if (!isSupabaseConfigured()) return [] as Array<{ slug: string; updated_at: string | null; created_at: string | null }>;
    const supabase = createSupabasePublicClient();
    if (!supabase) return [] as Array<{ slug: string; updated_at: string | null; created_at: string | null }>;

    const { data } = await supabase
      .from("firms")
      .select("slug,updated_at,created_at,status,is_indexable,firm_page_enabled")
      .eq("status", "published")
      .eq("is_indexable", true);

    return (data ?? [])
      .filter((r) => (r as { firm_page_enabled?: boolean | null }).firm_page_enabled !== false)
      .map((r) => ({
        slug: String((r as { slug?: string }).slug ?? ""),
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
      return [] as Array<{ post_slug: string; company_slug: string; published_at: string | null; updated_at: string | null }>;
    }
    const supabase = createSupabasePublicClient();
    if (!supabase) {
      return [] as Array<{ post_slug: string; company_slug: string; published_at: string | null; updated_at: string | null }>;
    }

    const { data } = await supabase
      .from("firm_blog_posts")
      .select("slug,company_slug,published_at,updated_at,status")
      .eq("status", "published")
      .not("published_at", "is", null)
      .limit(200000);

    return (data ?? [])
      .map((r) => ({
        post_slug: String((r as { slug?: string }).slug ?? ""),
        company_slug: String((r as { company_slug?: string }).company_slug ?? ""),
        published_at: (r as { published_at?: string | null }).published_at ?? null,
        updated_at: (r as { updated_at?: string | null }).updated_at ?? null,
      }))
      .filter((r) => slugLooksValid(r.post_slug) && slugLooksValid(r.company_slug));
  },
  ["sitemap-blog-v1"],
  { revalidate: 900 }
);

export async function getIndexableUrlsBySection(section: SitemapSection): Promise<SitemapUrl[]> {
  const nowIso = new Date().toISOString();

  if (section === "static") {
    const explorePaths = listExploreSlugs().map((slug) => `/kesfet/${slug}`);
    const countryGuidePaths = [
      COUNTRY_GUIDE_CATALOG_BASE_PATH,
      ...listCountryGuideSlugs().map(
        (slug) => `${COUNTRY_GUIDE_CATALOG_BASE_PATH}/${slug}`
      ),
    ];
    const staticPaths = [
      "/",
      "/akis",
      "/kesfet",
      ...explorePaths,
      ...countryGuidePaths,
      ...listPublicDocumentPages().map((p) => p.path),
    ];
    return dedupeUrls(
      staticPaths.map((path) => ({
        loc: normalizeCanonicalUrl(path),
        lastmod: nowIso,
      }))
    );
  }

  if (section === "firms") {
    const firms = await getFirmRows();
    return dedupeUrls(
      firms.map((f) => ({
        loc: normalizeCanonicalUrl(`/firma/${f.slug}`),
        lastmod: toLastmod(f.updated_at ?? f.created_at) ?? nowIso,
      }))
    );
  }

  if (section === "blog") {
    const blogs = await getBlogRows();
    return dedupeUrls(
      blogs.map((b) => ({
        loc: normalizeCanonicalUrl(`/firma/${b.company_slug}/blog/${b.post_slug}`),
        lastmod: toLastmod(b.updated_at ?? b.published_at) ?? nowIso,
      }))
    );
  }

  if (section === "flow") {
    return [{ loc: normalizeCanonicalUrl("/akis"), lastmod: nowIso }];
  }

  // Future-proof buckets for SEO landing expansions.
  return [];
}

export async function getSitemapIndexEntries(): Promise<SitemapUrl[]> {
  const sections: SitemapSection[] = ["static", "firms", "blog", "flow", "categories", "countries", "visa-types"];
  const out: SitemapUrl[] = [];
  const nowIso = new Date().toISOString();

  for (const section of sections) {
    out.push({ loc: normalizeCanonicalUrl(`/sitemaps/${section}.xml`), lastmod: nowIso });
  }

  return out;
}

export async function getSitemapChunk(sectionAndPage: string): Promise<SitemapUrl[]> {
  const match = sectionAndPage.match(/^([a-z-]+?)(?:-(\d+))?$/i);
  if (!match) return [];
  const section = (match[1] ?? "") as SitemapSection;
  const page = Number(match[2] ?? "1");
  if (!["static", "firms", "blog", "flow", "categories", "countries", "visa-types"].includes(section)) return [];
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
  const nodes = entries
    .map(
      (e) =>
        `<url><loc>${xmlEscape(e.loc)}</loc>${e.lastmod ? `<lastmod>${xmlEscape(e.lastmod)}</lastmod>` : ""}</url>`
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${nodes}</urlset>`;
}

