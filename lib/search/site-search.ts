import { cache } from "react";

import { EXPLORE_CATEGORIES } from "@/lib/explore/explore-categories";
import type { ExploreCategoryDef } from "@/lib/explore/explore-types";
import { searchFirmsForAramaPage } from "@/lib/data/firms";
import type { FirmRow } from "@/lib/types/firm";
import { getPublicFilterCountries, type FilterCountryRow } from "@/lib/data/public-cms";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import { textMatchesQuery as textMatchesHaystack } from "@/lib/search/search-text";
import {
  canonicalizeSearchQueryForSeo,
  collectMatchNeedles,
  normalizeForRankingCompare,
} from "@/lib/search/search-synonyms";
import {
  buildTaxonomyFilterPayload,
  resolveKesfetPageForSlug,
  searchTaxonomySuggestions,
  type TaxonomySearchSuggestionRow,
} from "@/lib/search/search-taxonomy";

/** Güvenlik tavanı — bellek içi filtreleme */
export const ARAMA_SEARCH_MAX_FIRM_ROWS = 500;
export const ARAMA_SEARCH_MAX_GUIDE_ROWS = 400;
export const ARAMA_FIRMS_PAGE_SIZE = 12;
export const ARAMA_GUIDES_PAGE_SIZE = 9;

export const SEARCH_BLOG_COVER_FALLBACK = "/og-share.png";

export type ZeroRecoveryItem = {
  title: string;
  description: string;
  href: string;
};


export function normalizeSearchQuery(q: string): string {
  return q.trim().replace(/\s+/g, " ");
}

export type SiteSearchExploreHit = {
  slug: string;
  label: string;
  shortDescription: string;
  href: string;
};

export type SiteSearchBlogHit = {
  id: string;
  title: string;
  slug: string;
  firmSlug: string;
  summary: string | null;
  coverImageUrl: string | null;
  categoryLabel: string;
  publishedAt: string | null;
  href: string;
};

export type SiteSearchResults = {
  normalizedQuery: string;
  firms: FirmRow[];
  guides: SiteSearchBlogHit[];
  categories: SiteSearchExploreHit[];
  supplementaryCountryHints: SiteSearchExploreHit[];
  counts: {
    firms: number;
    guides: number;
    categories: number;
    supplementaryCountries: number;
    totalPublic: number;
  };
};

export type SiteSearchDataset = SiteSearchResults & {
  needles: string[];
  canonicalQuery: string;
  taxonomySuggestions: TaxonomySearchSuggestionRow[];
};

/** Nitelik düşük / thin içerik: Google için noindex koridoru — kesfet sayfaları etkilenmez */
export function isThinSearchIndexingPayload(counts: {
  firms: number;
  guides: number;
  categories: number;
}): boolean {
  return counts.firms < 2 && counts.guides < 1 && counts.categories < 1;
}

export function shouldIndexSearchPage(params: {
  queryLength: number;
  thin: boolean;
  /** Toplam görünür genel içerik (firma + rehber + kategori satırı) */
  totalCombined?: number;
}): boolean {
  if (params.queryLength < 2) return false;
  if (params.thin) return false;
  if (typeof params.totalCombined === "number" && params.totalCombined < 3) return false;
  return true;
}

export function buildZeroResultRecoverySuggestions(rawQuery: string): ZeroRecoveryItem[] {
  const n = canonicalizeSearchQueryForSeo(rawQuery);
  const needles = collectMatchNeedles(rawQuery);
  const fuse = needles.join(" ");
  const out: ZeroRecoveryItem[] = [];
  const seen = new Set<string>();

  const push = (title: string, description: string, href: string) => {
    if (seen.has(href)) return;
    seen.add(href);
    out.push({ title, description, href });
  };

  let bestKesfet: ExploreCategoryDef | null = null;
  let score = -1;
  for (const cat of EXPLORE_CATEGORIES) {
    const needlesForCat =
      needles.length > 0
        ? needles
        : n.length >= 2
          ? [n]
          : [];
    let s = 0;
    const blob = `${cat.label} ${cat.shortDescription}`;
    const blobL = normalizeForRankingCompare(blob);
    for (const nd of needlesForCat.length ? needlesForCat : [fuse].filter(Boolean)) {
      const sub = normalizeForRankingCompare(nd);
      if (!sub.length) continue;
      if (blobL.includes(sub)) s += sub.length >= 8 ? 5 : 2;
      if ((cat.slug ?? "").includes(sub.replace(/\s+/g, "-"))) s += 4;
    }
    if ((cat.match.countryAliasesAny ?? []).some((a) => fuse.includes(canonicalizeSearchQueryForSeo(a))))
      s += 3;
    if (s > score) {
      score = s;
      bestKesfet = cat;
    }
  }

  if (bestKesfet && score >= 4) {
    push(
      bestKesfet.label,
      bestKesfet.shortDescription,
      `/kesfet/${bestKesfet.slug}`
    );
  }

  const defaults = [
    { title: "Schengen Vizesi", description: "Avrupa seyahat ve Schengen süreçleri.", href: "/kesfet/schengen-vizesi" },
    { title: "Çalışma Vizesi", description: "İstihdam ve çalışma odaklı vize seçenekleri.", href: "/kesfet/calisma-vizesi" },
    { title: "Nitelikli İşçi Yerleştirme", description: "Yetenek bazlı süreçler ve yerleştirme.", href: "/nitelikli-isci-yerlestirme" },
    { title: "Göçmenlik Hukuku", description: "İtiraz ve hukuki süreçler.", href: "/kesfet/gocmenlik-hukuku" },
    { title: "Öğrenci Vizesi", description: "Eğitim amaçlı başvuru rehberi.", href: "/kesfet/ogrenci-vizesi" },
  ];
  for (const d of defaults) push(d.title, d.description, d.href);

  return out.slice(0, 6);
}

export function exploreCategoryMatchesQuery(cat: ExploreCategoryDef, query: string): boolean {
  const parts: string[] = [
    cat.slug,
    cat.label,
    cat.shortDescription,
    ...(cat.match.countryAliasesAny ?? []),
    ...(cat.match.serviceNeedlesAny ?? []),
    ...(cat.match.visaRegionLabelsAny ?? []),
  ].map((s) => String(s));
  return parts.some((p) => textMatchesHaystack(p, query));
}

function exploreMatchesAny(cat: ExploreCategoryDef, needles: string[]): boolean {
  return needles.some((needle) => exploreCategoryMatchesQuery(cat, needle));
}

/**
 * Kesfet kategorisi: admin tabanlı `EXPLORE_CATEGORIES` eşlemesi — dinamik uydurma yapmaz.
 */
export async function searchExploreCategories(
  q: string,
  limit: number,
  precomputedNeedles?: string[]
): Promise<SiteSearchExploreHit[]> {
  const n = normalizeSearchQuery(q);
  const needles = precomputedNeedles?.length
    ? precomputedNeedles
    : n.length >= 2
      ? collectMatchNeedles(n)
      : [];
  if (!n || n.length < 2 || limit <= 0) return [];
  const tryNeedles = needles.length ? needles : [n];
  const out: SiteSearchExploreHit[] = [];
  for (const cat of EXPLORE_CATEGORIES) {
    if (!exploreMatchesAny(cat, tryNeedles)) continue;
    out.push({
      slug: cat.slug,
      label: cat.label,
      shortDescription: cat.shortDescription,
      href: `/kesfet/${cat.slug}`,
    });
    if (out.length >= limit) break;
  }
  return out;
}

/** Ülke adı filtreden geliyorsa ve keşfet kartı üst tekilleşmişse çıkarılmış ülke yönlendirmesi. */
export async function searchSupplementaryCountryHints(
  q: string,
  limit: number,
  precomputedNeedles?: string[]
): Promise<SiteSearchExploreHit[]> {
  const n = normalizeSearchQuery(q);
  const needles = precomputedNeedles?.length
    ? precomputedNeedles
    : n.length >= 2
      ? collectMatchNeedles(n)
      : [];
  if (!n || n.length < 2 || limit <= 0) return [];
  const tryNeedles = needles.length ? needles : [n];
  let countries: FilterCountryRow[] = [];
  try {
    countries = await getPublicFilterCountries();
  } catch {
    return [];
  }

  const out: SiteSearchExploreHit[] = [];
  for (const row of countries) {
    const name = String(row.name ?? "").trim();
    if (!name) continue;
    const nameHits = tryNeedles.some(
      (needle) =>
        textMatchesHaystack(name, needle) ||
        textMatchesHaystack(String(row.slug ?? ""), needle)
    );
    if (!nameHits) continue;
    const coveredByExplore = EXPLORE_CATEGORIES.some(
      (cat) =>
        exploreCategoryMatchesQuery(cat, name) || exploreCategoryMatchesQuery(cat, name.toLocaleLowerCase("tr"))
    );
    if (coveredByExplore) continue;
    const aramaHref = `/arama?q=${encodeURIComponent(normalizeSearchQuery(name))}`;
    const id = String(row.id ?? name);
    out.push({
      slug: `country-${id}`,
      label: `${name}`,
      shortDescription: "Arama sonuçları",
      href: aramaHref,
    });
    if (out.length >= limit) break;
  }
  return out;
}

/** LIKE deseninde `\`, `%`, `_` için kaçış */
function pgLikeLiteralsEscaped(raw: string): string {
  return raw.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

function mergeCategoryLists(
  primary: SiteSearchExploreHit[],
  secondary: SiteSearchExploreHit[],
  limit: number
): SiteSearchExploreHit[] {
  const seen = new Set<string>();
  const merged: SiteSearchExploreHit[] = [];
  const pushUnique = (h: SiteSearchExploreHit) => {
    const k = `${h.slug}|${h.href}`;
    if (seen.has(k)) return;
    seen.add(k);
    merged.push(h);
  };
  for (const x of primary) pushUnique(x);
  for (const x of secondary) pushUnique(x);
  return merged.slice(0, limit);
}

async function resolveCategoryLabels(
  supabase: ReturnType<typeof createSupabasePublicClient>,
  categoryIds: (string | null)[]
): Promise<Map<string, string>> {
  const ids = Array.from(
    new Set(categoryIds.filter((x): x is string => typeof x === "string" && x.length > 0))
  );
  const map = new Map<string, string>();
  if (!ids.length || !supabase) return map;

  const { data } = await supabase.from("blog_categories").select("id,name").in("id", ids);
  for (const row of data ?? []) {
    const id = String((row as { id?: string }).id ?? "");
    const name = String((row as { name?: string }).name ?? "").trim();
    if (id && name) map.set(id, name);
  }
  return map;
}

function blobForBlogMatch(row: Record<string, unknown>): string {
  return [
    row.title,
    row.summary,
    row.body_plain_text,
    row.meta_description,
    Array.isArray(row.tags) ? (row.tags as string[]).join(" ") : "",
  ]
    .map((x) => String(x ?? ""))
    .join(" ");
}

/** Rehber kartı sıralaması — `scoreBlogRowRank` ile aynı ağırlıklar */
export function scoreBlogHitForRanking(g: SiteSearchBlogHit, primaryDisplay: string, needles: string[]): number {
  const qc = canonicalizeSearchQueryForSeo(primaryDisplay);
  const titleRaw = g.title;
  const title = titleRaw.toLocaleLowerCase("tr");
  const titleCanon = canonicalizeSearchQueryForSeo(titleRaw);
  let s = 0;
  if (titleCanon.length && titleCanon === qc) s = 1_000_000;
  else if (qc.length && title.includes(qc)) s = Math.max(s, 800_000);
  for (const nd of needles) {
    const sub = nd.toLocaleLowerCase("tr").trim();
    if (!sub) continue;
    if (title.includes(sub)) s = Math.max(s, 600_000);
    if (canonicalizeSearchQueryForSeo(titleRaw) === canonicalizeSearchQueryForSeo(nd)) {
      s = Math.max(s, 950_000);
    }
  }
  const sum = String(g.summary ?? "").toLocaleLowerCase("tr");
  if (needles.some((nd) => sum.includes(nd.toLocaleLowerCase("tr")))) s += 12_000;
  const pub = g.publishedAt ? new Date(String(g.publishedAt)).getTime() : 0;
  s += pub / 1e12;
  return s;
}

function scoreBlogRowRank(
  row: Record<string, unknown>,
  primaryDisplay: string,
  needles: string[]
): number {
  const qc = canonicalizeSearchQueryForSeo(primaryDisplay);
  const titleRaw = String(row.title ?? "");
  const title = titleRaw.toLocaleLowerCase("tr");
  const titleCanon = canonicalizeSearchQueryForSeo(titleRaw);
  let s = 0;
  if (titleCanon.length && titleCanon === qc) s = 1_000_000;
  else if (qc.length && title.includes(qc)) s = Math.max(s, 800_000);
  for (const nd of needles) {
    const sub = nd.toLocaleLowerCase("tr").trim();
    if (!sub) continue;
    if (title.includes(sub)) s = Math.max(s, 600_000);
    if (canonicalizeSearchQueryForSeo(titleRaw) === canonicalizeSearchQueryForSeo(nd)) {
      s = Math.max(s, 950_000);
    }
  }
  const sum = String(row.summary ?? "").toLocaleLowerCase("tr");
  const body = String(row.body_plain_text ?? "").toLocaleLowerCase("tr");
  if (needles.some((nd) => sum.includes(nd.toLocaleLowerCase("tr")))) s += 12_000;
  if (needles.some((nd) => body.includes(nd.toLocaleLowerCase("tr")))) s += 4_000;
  const pub = row.published_at ? new Date(String(row.published_at)).getTime() : 0;
  s += pub / 1e12;
  return s;
}

/**
 * Yayında bloglar: başlık, özet, düz metin, meta description, etiketler üzerinden eşleşme.
 */
export async function searchBlogPosts(
  q: string,
  limit: number,
  needlesOverride?: string[]
): Promise<SiteSearchBlogHit[]> {
  const n = normalizeSearchQuery(q);
  if (!n || n.length < 2 || limit <= 0) return [];
  if (!isSupabaseConfigured()) return [];

  const supabaseClient = createSupabasePublicClient();
  if (!supabaseClient) return [];
  const db = supabaseClient;

  const needles = needlesOverride?.length ? needlesOverride : collectMatchNeedles(n);
  const tryNeedles = needles.length ? needles : [n];

  function buildIlikeOrFromNeedles(): string {
    const chunk: string[] = [];
    for (const nd of tryNeedles.slice(0, 6)) {
      const pat = `%${pgLikeLiteralsEscaped(nd)}%`;
      const esc = `"${pat.replace(/"/g, '\\"')}"`;
      chunk.push(
        `title.ilike.${esc}`,
        `summary.ilike.${esc}`,
        `body_plain_text.ilike.${esc}`,
        `meta_description.ilike.${esc}`
      );
    }
    return chunk.join(",");
  }

  async function finalizeRows(
    rawRows: Record<string, unknown>[],
    categoryMap: Map<string, string>,
    fallbackVisaFallback: Map<string, string[]>
  ): Promise<SiteSearchBlogHit[]> {
    const firmIds = Array.from(new Set(rawRows.map((row) => String(row.firm_id ?? "")).filter(Boolean)));
    let firmSlugById = new Map<string, string>();
    if (firmIds.length > 0) {
      const { data: firms } = await db
        .from("firms")
        .select("id,slug,status,firm_page_enabled,is_indexable")
        .in("id", firmIds);
      const pairs = (firms ?? [])
        .filter((f) => {
          const fr = f as Record<string, unknown>;
          return (
            fr.status === "published" &&
            fr.firm_page_enabled !== false &&
            fr.is_indexable !== false
          );
        })
        .map((f) => {
          const fr = f as Record<string, unknown>;
          return [String(fr.id ?? ""), String(fr.slug ?? "")] as [string, string];
        })
        .filter(([id, slug]) => id.length > 0 && slug.length > 0);
      firmSlugById = new Map(pairs);
    }

    const hits: SiteSearchBlogHit[] = [];
    const scored = rawRows
      .filter((row) => {
        const fid = String(row.firm_id ?? "");
        return firmSlugById.has(fid);
      })
      .map((row) => ({ row, sc: scoreBlogRowRank(row, n, tryNeedles) }))
      .sort((a, b) => b.sc - a.sc);

    for (const { row } of scored) {
      const fid = String(row.firm_id ?? "");
      const firmSlug = firmSlugById.get(fid) ?? "";
      const postSlug = String(row.slug ?? "");
      if (!firmSlug || !postSlug) continue;

      let catLabel =
        typeof row.category_id === "string" ? categoryMap.get(row.category_id) : undefined;
      if (!catLabel) {
        const rv = fallbackVisaFallback.get(String(row.id ?? ""));
        catLabel =
          Array.isArray(rv) && rv.length > 0
            ? String(rv[0] ?? "").trim() || undefined
            : undefined;
      }
      if (!catLabel?.trim()) catLabel = "Vize Rehberi";

      const summaryRaw = row.summary ?? row.meta_description;
      const summary =
        typeof summaryRaw === "string"
          ? summaryRaw.replace(/\s+/g, " ").trim().slice(0, 220) || null
          : null;

      hits.push({
        id: String(row.id ?? ""),
        title: String(row.title ?? "").trim() || "Rehber",
        slug: postSlug,
        firmSlug,
        summary,
        coverImageUrl: row.cover_image_url ? String(row.cover_image_url) : null,
        categoryLabel: catLabel.trim(),
        publishedAt: row.published_at ? String(row.published_at) : null,
        href: `/firma/${encodeURIComponent(firmSlug)}/blog/${encodeURIComponent(postSlug)}`,
      });
      if (hits.length >= limit) break;
    }
    return hits;
  }

  const orClause = buildIlikeOrFromNeedles();

  const { data, error } = await db
    .from("firm_blog_posts")
    .select(
      "id,firm_id,slug,title,summary,cover_image_url,published_at,category_id,tags,body_plain_text,meta_description,related_visa_types"
    )
    .eq("status", "published")
    .not("published_at", "is", null)
    .or(orClause)
    .order("published_at", { ascending: false })
    .limit(Math.min(120, Math.max(limit * 5, limit)));

  let rows = (data ?? []) as Record<string, unknown>[];
  let categoryMapFromIds = await resolveCategoryLabels(
    db,
    rows.map((r) => (typeof r.category_id === "string" ? r.category_id : null))
  );

  if (error) {
    console.error("[site-search] blog ilike:", error.message);
    rows = [];
  }

  if (rows.length === 0) {
    const fb = await db
      .from("firm_blog_posts")
      .select(
        "id,firm_id,slug,title,summary,cover_image_url,published_at,category_id,tags,body_plain_text,meta_description,related_visa_types"
      )
      .eq("status", "published")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false })
      .limit(500);
    const pool = ((fb.data ?? []) as Record<string, unknown>[]).filter((row) =>
      tryNeedles.some((needle) => textMatchesHaystack(blobForBlogMatch(row), needle))
    );
    rows = pool;
    categoryMapFromIds = await resolveCategoryLabels(
      db,
      rows.map((r) => (typeof r.category_id === "string" ? r.category_id : null))
    );
  }

  const visaFb = new Map<string, string[]>();
  for (const r of rows) {
    const rv = r.related_visa_types as string[] | null | undefined;
    if (Array.isArray(rv) && rv.length) visaFb.set(String(r.id ?? ""), rv);
  }

  return finalizeRows(rows, categoryMapFromIds, visaFb);
}

export async function searchFirms(q: string, limit: number): Promise<FirmRow[]> {
  const needles = collectMatchNeedles(q);
  return searchFirmsForAramaPage(q, { limit, matchNeedles: needles });
}

export function scoreFirmRanking(f: FirmRow, displayQ: string, needles: string[]): number {
  const qc = canonicalizeSearchQueryForSeo(displayQ);
  const nl = f.name.toLocaleLowerCase("tr");
  const nameCanon = canonicalizeSearchQueryForSeo(f.name);
  if (nameCanon === qc) return 50_000_000;
  if (qc.length && nl.includes(qc)) return 40_000_000;
  for (const nd of needles) {
    const n = canonicalizeSearchQueryForSeo(nd).toLocaleLowerCase("tr");
    if (!n) continue;
    if (nl.includes(n)) return Math.max(20_000_000, 30_000_000 - f.name.length);
  }
  const hype = typeof f.hype_score === "number" && Number.isFinite(f.hype_score) ? f.hype_score : 0;
  return 100 + Math.min(hype, 50000) / 50000;
}

export function scoreCategorySuggestion(c: SiteSearchExploreHit, qc: string, needles: string[]): number {
  const lab = canonicalizeSearchQueryForSeo(c.label);
  if (qc.length && lab.includes(qc)) return 600_000;
  if (needles.some((nd) => lab.includes(canonicalizeSearchQueryForSeo(nd)))) return 400_000;
  return c.href.startsWith("/kesfet") ? 50 : 10;
}

export type UnifiedRankEntry = {
  score: number;
  href: string;
  kind: "firm" | "guide" | "explore" | "all";
  firm?: FirmRow;
  guide?: SiteSearchBlogHit;
  cat?: SiteSearchExploreHit;
};

/**
 * Firma, rehber ve kategori adaylarını tek skor havuzunda birleştirir (öneri dropdown + öne çıkan kart).
 */
export function buildUnifiedRankedList(
  normalized: string,
  canonical: string,
  needles: string[],
  firmsPool: FirmRow[],
  guidesPool: SiteSearchBlogHit[],
  categoryMerged: SiteSearchExploreHit[]
): UnifiedRankEntry[] {
  const qc = canonical;
  const rows: UnifiedRankEntry[] = [];

  for (const f of firmsPool) {
    rows.push({
      score: scoreFirmRanking(f, normalized, needles),
      href: `/firma/${encodeURIComponent(f.slug)}`,
      kind: "firm",
      firm: f,
    });
  }
  for (const g of guidesPool) {
    rows.push({
      score: scoreBlogHitForRanking(g, normalized, needles),
      href: g.href,
      kind: "guide",
      guide: g,
    });
  }
  for (const c of categoryMerged) {
    const kesfet = typeof c.href === "string" && c.href.startsWith("/kesfet");
    const rawSc = scoreCategorySuggestion(c, qc, needles);
    const score = kesfet ? rawSc : Math.floor(rawSc * 0.88);
    rows.push({
      score,
      href: c.href,
      kind: kesfet ? "explore" : "all",
      cat: c,
    });
  }

  rows.sort((a, b) => b.score - a.score);
  const seenHref = new Set<string>();
  const out: UnifiedRankEntry[] = [];
  for (const r of rows) {
    if (seenHref.has(r.href)) continue;
    seenHref.add(r.href);
    out.push(r);
  }
  return out;
}

export type FeaturedBestMatch =
  | { role: "firm"; firm: FirmRow }
  | { role: "guide"; guide: SiteSearchBlogHit }
  | { role: "kesfet"; hit: SiteSearchExploreHit }
  | { role: "hint"; hit: SiteSearchExploreHit };

export function pickFeaturedBestMatch(ds: SiteSearchDataset): FeaturedBestMatch | null {
  if (ds.counts.totalPublic < 1) return null;
  const list = buildUnifiedRankedList(
    normalizeSearchQuery(ds.canonicalQuery),
    ds.canonicalQuery,
    ds.needles,
    ds.firms,
    ds.guides,
    ds.categories
  );
  const top = list[0];
  if (!top) return null;
  if (top.kind === "firm" && top.firm) return { role: "firm", firm: top.firm };
  if (top.kind === "guide" && top.guide) return { role: "guide", guide: top.guide };
  if (top.kind === "explore" && top.cat) return { role: "kesfet", hit: top.cat };
  if (top.kind === "all" && top.cat) return { role: "hint", hit: top.cat };
  return null;
}

export async function getSiteSearchDataset(displayRaw: string): Promise<SiteSearchDataset> {
  const normalizedDisplay = normalizeSearchQuery(displayRaw);
  const canonicalQuery = canonicalizeSearchQueryForSeo(displayRaw);
  if (!normalizedDisplay.length || canonicalQuery.length < 2) {
    return {
      normalizedQuery: canonicalQuery,
      canonicalQuery,
      needles: [],
      taxonomySuggestions: [],
      firms: [],
      guides: [],
      categories: [],
      supplementaryCountryHints: [],
      counts: {
        firms: 0,
        guides: 0,
        categories: 0,
        supplementaryCountries: 0,
        totalPublic: 0,
      },
    };
  }

  let cmsCountryLabels: string[] = [];
  try {
    const cr = await getPublicFilterCountries();
    cmsCountryLabels = cr.map((r) => String(r.name ?? "").trim()).filter(Boolean);
  } catch {
    cmsCountryLabels = [];
  }

  const taxonomyBag = buildTaxonomyFilterPayload(normalizedDisplay, {
    extraCountryLabels: cmsCountryLabels,
  });

  const baseNeedles = collectMatchNeedles(normalizedDisplay);
  const needles = [
    ...new Set(
      [...baseNeedles, ...taxonomyBag.needles].map((s) => s.trim()).filter((s) => s.length >= 2)
    ),
  ];

  const semantics =
    taxonomyBag.semanticIntents.length > 0 ? taxonomyBag.semanticIntents : undefined;

  const taxonomySuggestions = searchTaxonomySuggestions(normalizedDisplay, {
    extraCountryLabels: cmsCountryLabels,
  });

  const [firmRows, guides, exploreHits, supplementary] = await Promise.all([
    searchFirmsForAramaPage(normalizedDisplay, {
      limit: ARAMA_SEARCH_MAX_FIRM_ROWS,
      matchNeedles: needles,
      semanticIntents: semantics,
    }),
    searchBlogPosts(normalizedDisplay, ARAMA_SEARCH_MAX_GUIDE_ROWS, needles),
    searchExploreCategories(normalizedDisplay, 80, needles),
    searchSupplementaryCountryHints(normalizedDisplay, 40, needles),
  ]);

  const firmsRanked = [...firmRows].sort(
    (a, b) => scoreFirmRanking(b, normalizedDisplay, needles) - scoreFirmRanking(a, normalizedDisplay, needles)
  );

  const categoriesMerged = mergeCategoryLists(exploreHits, supplementary, 80);

  const totalPublic = firmsRanked.length + guides.length + categoriesMerged.length;

  return {
    normalizedQuery: canonicalQuery,
    canonicalQuery,
    needles,
    taxonomySuggestions,
    firms: firmsRanked,
    guides,
    categories: categoriesMerged,
    supplementaryCountryHints: supplementary,
    counts: {
      firms: firmsRanked.length,
      guides: guides.length,
      categories: categoriesMerged.length,
      supplementaryCountries: supplementary.length,
      totalPublic,
    },
  };
}

/** @deprecated Pagination için tam veri seti kullanın */
export async function getSiteSearchResults(rawQuery: string): Promise<SiteSearchResults> {
  const d = await getSiteSearchDataset(rawQuery);
  return {
    normalizedQuery: d.normalizedQuery,
    firms: d.firms,
    guides: d.guides,
    categories: d.categories,
    supplementaryCountryHints: d.supplementaryCountryHints,
    counts: d.counts,
  };
}

/** canonical sorgu anahtarı — sayfa parametreleri önbelleği etkilemez */
export const getSiteSearchDatasetCached = cache(async (canonicalQuery: string) =>
  getSiteSearchDataset(canonicalQuery)
);

/** Eski meta importları */
export const getSiteSearchResultsCached = getSiteSearchDatasetCached;

export type SearchSuggestionPayload = {
  query: string;
  groups: {
    id: string;
    label: string;
    items: Array<{
      id: string;
      kind: "firm" | "guide" | "explore" | "all" | "taxonomy";
      title: string;
      subtitle?: string;
      href: string;
      badge?: string;
    }>;
  }[];
  footerHref: string;
  narrow: boolean;
};

/** Header dropdown — sıra: güçlü taksonomi > firma başlığı > rehber > Keşfet */
export async function buildSearchSuggestionsPayload(rawQuery: string): Promise<SearchSuggestionPayload> {
  const normalized = normalizeSearchQuery(rawQuery);
  const canonical = canonicalizeSearchQueryForSeo(rawQuery);
  const footerHref =
    canonical.length >= 2 ? `/arama?q=${encodeURIComponent(canonical)}` : "/arama";

  if (normalized.length < 2 || canonical.length < 2) {
    return { query: canonical || normalized, groups: [], footerHref, narrow: true };
  }

  let cmsCountryLabels: string[] = [];
  try {
    const cr = await getPublicFilterCountries();
    cmsCountryLabels = cr.map((r) => String(r.name ?? "").trim()).filter(Boolean);
  } catch {
    cmsCountryLabels = [];
  }

  const taxonomyBag = buildTaxonomyFilterPayload(normalized, {
    extraCountryLabels: cmsCountryLabels,
  });
  const baseNeedles = collectMatchNeedles(normalized);
  const needles = [
    ...new Set(
      [...baseNeedles, ...taxonomyBag.needles].map((s) => s.trim()).filter((s) => s.length >= 2)
    ),
  ];
  const semantics =
    taxonomyBag.semanticIntents.length > 0 ? taxonomyBag.semanticIntents : undefined;

  const taxRows = searchTaxonomySuggestions(normalized, {
    extraCountryLabels: cmsCountryLabels,
  });

  const kesfetFromTaxonomy: SearchSuggestionPayload["groups"][0]["items"][number][] = [];
  const seenKes = new Set<string>();
  for (const tr of taxRows) {
    if (!tr.kesfetSlug) continue;
    if (seenKes.has(tr.kesfetSlug)) continue;
    const page = resolveKesfetPageForSlug(tr.kesfetSlug);
    if (!page) continue;
    seenKes.add(tr.kesfetSlug);
    kesfetFromTaxonomy.push({
      id: `kes-${tr.kesfetSlug}`,
      kind: "explore",
      title: `${page.title} — kategori sayfası`,
      subtitle: page.description,
      href: `/kesfet/${encodeURIComponent(page.slug)}`,
      badge: "Keşfet",
    });
  }

  const [firmsPool, guidesPool, explode, countries] = await Promise.all([
    searchFirmsForAramaPage(normalized, {
      limit: 40,
      matchNeedles: needles,
      semanticIntents: semantics,
    }),
    searchBlogPosts(normalized, 24, needles),
    searchExploreCategories(normalized, 24, needles),
    searchSupplementaryCountryHints(normalized, 14, needles),
  ]);

  const categoryMerged = mergeCategoryLists(explode, countries, 20);

  const ranked = buildUnifiedRankedList(
    normalized,
    canonical,
    needles,
    firmsPool,
    guidesPool,
    categoryMerged
  ).slice(0, 12);

  const filterItems: SearchSuggestionPayload["groups"][0]["items"] = taxRows.slice(0, 10).map((tr) => ({
    id: tr.id,
    kind: "taxonomy" as const,
    title: tr.title,
    subtitle: tr.subtitle,
    href: tr.href,
    badge: tr.badge,
  }));

  const rankedItems: SearchSuggestionPayload["groups"][0]["items"] = ranked.map((r) => {
    if (r.kind === "firm" && r.firm) {
      const f = r.firm;
      return {
        id: `firm-${f.id}`,
        kind: "firm" as const,
        title: f.name,
        subtitle: (f.short_description?.trim() || f.countries?.slice(0, 4).join(", ") || "").trim(),
        href: r.href,
      };
    }
    if (r.kind === "guide" && r.guide) {
      const g = r.guide;
      return {
        id: `guide-${g.id}`,
        kind: "guide" as const,
        title: g.title,
        subtitle: `${g.categoryLabel} · ${formatGuideMetaLine(g.publishedAt)}`,
        href: r.href,
      };
    }
    const c = r.cat!;
    const kesfet = r.kind === "explore";
    return {
      id: `cat-${c.slug}`,
      kind: kesfet ? ("explore" as const) : ("all" as const),
      title: c.label,
      subtitle: kesfet ? `Keşfet · ${c.shortDescription}` : c.shortDescription,
      href: r.href,
    };
  });

  const groups: SearchSuggestionPayload["groups"] = [];
  if (filterItems.length) {
    groups.push({ id: "taxonomy-filters", label: "Filtre ve kategori", items: filterItems });
  }
  if (rankedItems.length) {
    groups.push({ id: "ranked", label: "Firmalar ve rehberler", items: rankedItems });
  }
  if (kesfetFromTaxonomy.length) {
    groups.push({ id: "kesfet-pages", label: "Keşfet vitrinleri", items: kesfetFromTaxonomy.slice(0, 5) });
  }

  const substantive = groups.length > 0;

  return {
    query: canonical,
    groups,
    footerHref,
    narrow: !substantive,
  };
}

export function formatGuideMetaLine(isoDate: string | null): string {
  if (!isoDate) return "Yayındaki içerik";
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}
