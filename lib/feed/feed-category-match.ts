import type { FeedHubBlogPost } from "@/lib/data/feed";
import type { FeedCategoryDef } from "@/lib/feed/feed-categories";

/** Hub ve kategori eşlemesinde kullanılan metin kümesini normalize et. */
export function normalizeFeedHaystack(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ı/g, "i")
    .replace(/\s+/g, " ")
    .trim();
}

/** Blog’un `category_name` alanıyla site kategori başlığının doğrudan uyumu */
function explicitCategoryAligned(postCategoryName: string | null | undefined, categoryTitle: string): boolean {
  const a = normalizeFeedHaystack(postCategoryName ?? "");
  const b = normalizeFeedHaystack(categoryTitle);
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

/**
 * Matcher tabanlı eşleme (önce hub’da kullanılan geniş küme).
 * Kullanılacak tek alanlar: `category_name`, `tags`, `title` (+ birleştirilmiş “pool”; özet dahil DEĞİL).
 */
export function matchesFeedHubMatchers(post: FeedHubBlogPost, matchers: readonly string[]): boolean {
  const catNorm = normalizeFeedHaystack(post.category_name ?? "");
  const titleNorm = normalizeFeedHaystack(post.title);
  const tagNorms = post.tags.map((t) => normalizeFeedHaystack(String(t))).filter(Boolean);
  const tagBlob = normalizeFeedHaystack(tagNorms.join(" "));
  const pool = normalizeFeedHaystack(`${catNorm} ${tagBlob} ${titleNorm}`);

  return matchers.some((raw) => {
    const needle = normalizeFeedHaystack(raw);
    if (!needle) return false;
    if (catNorm && (catNorm === needle || catNorm.includes(needle))) return true;
    if (tagNorms.some((t) => t === needle || t.includes(needle) || needle.includes(t))) return true;
    if (titleNorm.includes(needle)) return true;
    return pool.includes(needle);
  });
}

const MIN_NEEDLE_SUMMARY = 11;

/** Anahtar kelime listesinden daha kontrollü metin uyumu — özet ve başlıkta. */
function strongKeywordPhraseHit(
  titleNorm: string,
  summaryNorm: string,
  keywords: readonly string[]
): boolean {
  for (const kw of keywords) {
    const n = normalizeFeedHaystack(kw);
    if (n.length < MIN_NEEDLE_SUMMARY) continue;
    if (titleNorm.includes(n) || summaryNorm.includes(n)) return true;
  }
  return false;
}

/**
 * `/akis/[slug]` için: yalnızca blog yazısı meta (`category`, `tags`, `title`) + özet;
 * firma tanımı/hizmet alanları yoktur.
 *
 * Ek katman: sadece `özet/title + keywords` gevşek eşlemesi güvenilir olmalıdır (needle uzunluğu ile sınırlı).
 */
export function postMatchesAkisCategoryLanding(post: FeedHubBlogPost, def: FeedCategoryDef): boolean {
  if (explicitCategoryAligned(post.category_name, def.title)) return true;
  if (matchesFeedHubMatchers(post, def.matchers)) return true;

  const summaryNorm = normalizeFeedHaystack(post.description);
  const titleNorm = normalizeFeedHaystack(post.title);

  if (strongKeywordPhraseHit(titleNorm, summaryNorm, def.keywords)) return true;

  return def.matchers.some((raw) => {
    const n = normalizeFeedHaystack(raw);
    if (n.length < MIN_NEEDLE_SUMMARY) return false;
    return summaryNorm.includes(n);
  });
}
