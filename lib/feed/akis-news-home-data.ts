import type { FeedHubBlogPost } from "@/lib/data/feed";
import type { FeedCategoryDef } from "@/lib/feed/feed-categories";
import { getFeedCategoryBySlug } from "@/lib/feed/feed-categories";
import { postMatchesAkisCategoryLanding } from "@/lib/feed/feed-category-match";

/** Ana `/akis`: haber blokları — görünen başlık, “tümünü gör” için canonical slug, eşleme için alt slug listesi */
export type AkisNewsHomeSectionConfig = {
  displayTitle: string;
  viewAllSlug: string;
  matchSlugs: readonly string[];
};

export const AKIS_NEWS_HOME_SECTIONS: readonly AkisNewsHomeSectionConfig[] = [
  {
    displayTitle: "Vize Rehberleri",
    viewAllSlug: "vize-basvuru-rehberi",
    matchSlugs: [
      "vize-basvuru-rehberi",
      "vize-seyahat-rehberi",
      "evrak-hazirlama",
      "turistik-vize",
      "randevu-surecleri",
      "konsolosluk-islemleri",
      "pasaport-islemleri",
    ],
  },
  {
    displayTitle: "Yurtdışı Eğitim",
    viewAllSlug: "yurtdisi-egitim",
    matchSlugs: ["yurtdisi-egitim", "erasmus-basvuru", "ogrenci-vizesi"],
  },
  {
    displayTitle: "Çalışma & Oturum",
    viewAllSlug: "calisma-oturum-izni",
    matchSlugs: ["calisma-oturum-izni", "calisma-vizesi", "oturum-izni", "yurtdisi-calisma-oturum"],
  },
  {
    displayTitle: "Göç ve Koruma",
    viewAllSlug: "goc-uluslararasi-koruma",
    matchSlugs: ["goc-uluslararasi-koruma", "iltica-uluslararasi-koruma"],
  },
  {
    displayTitle: "Golden Visa",
    viewAllSlug: "golden-visa-yatirimci-oturumu",
    matchSlugs: ["golden-visa-yatirimci-oturumu", "yunanistan-golden-visa"],
  },
  {
    displayTitle: "Ülke Rehberleri",
    viewAllSlug: "ulke-rehberleri",
    matchSlugs: ["ulke-rehberleri"],
  },
] as const;

export type AkisNewsHomeFilledSection = {
  config: AkisNewsHomeSectionConfig;
  posts: FeedHubBlogPost[];
};

/** Manşet slaytında gösterilen son yayınlar (yüksekten düşük tarih). */
export const AKIS_LEAD_SLIDER_SIZE = 20;

/** “Daha fazla içerik” havuzu üst sınırı (istemci dilimleri 12 + 12 + … için). */
export const AKIS_MORE_STORIES_POOL = 96;

export type AkisNewsHomeBuilt = {
  /** Son N blog yazısı (tarihe göre desc); manşet slaytında kullanılır */
  sliderPosts: FeedHubBlogPost[];
  sideFour: FeedHubBlogPost[];
  tickerFive: FeedHubBlogPost[];
  sections: AkisNewsHomeFilledSection[];
  moreStories: FeedHubBlogPost[];
  usedBlogIds: string[];
};

function defsForSection(config: AkisNewsHomeSectionConfig): FeedCategoryDef[] {
  return config.matchSlugs
    .map((slug) => getFeedCategoryBySlug(slug))
    .filter((d): d is FeedCategoryDef => d !== null);
}

function postMatchesAnyDef(post: FeedHubBlogPost, defs: FeedCategoryDef[]): boolean {
  return defs.some((d) => postMatchesAkisCategoryLanding(post, d));
}

/**
 * Tek hub snapshot listesinden manşet slaytı, yan 4’lü, şerit, kategori blokları ve footer listesini çıkarır.
 * Slayt yazıları sağ öne çıkanlar ve diğer bloklarda kullanılmaz (tekrarsız).
 */
export function buildAkisNewsHomeData(params: {
  hub: FeedHubBlogPost[];
}): AkisNewsHomeBuilt {
  const chronological = [...params.hub].sort((a, b) => b.created_at.localeCompare(a.created_at));
  const used = new Set<string>();

  const sliderPosts = chronological.slice(0, AKIS_LEAD_SLIDER_SIZE);
  sliderPosts.forEach((p) => used.add(p.id));

  if (sliderPosts.length === 0) {
    return {
      sliderPosts: [],
      sideFour: [],
      tickerFive: [],
      sections: AKIS_NEWS_HOME_SECTIONS.map((config) => ({ config, posts: [] as FeedHubBlogPost[] })),
      moreStories: [],
      usedBlogIds: [],
    };
  }

  const afterSlider = chronological.filter((p) => !used.has(p.id));

  const sideFour = afterSlider.slice(0, 4);
  sideFour.forEach((p) => used.add(p.id));

  const afterSide = chronological.filter((p) => !used.has(p.id));
  const tickerFive = afterSide.slice(0, 5);
  tickerFive.forEach((p) => used.add(p.id));

  const sections: AkisNewsHomeFilledSection[] = [];

  for (const config of AKIS_NEWS_HOME_SECTIONS) {
    const defs = defsForSection(config);
    const posts: FeedHubBlogPost[] = [];
    if (defs.length === 0) {
      sections.push({ config, posts });
      continue;
    }
    for (const p of chronological) {
      if (used.has(p.id)) continue;
      if (!postMatchesAnyDef(p, defs)) continue;
      posts.push(p);
      used.add(p.id);
      if (posts.length >= 4) break;
    }
    sections.push({ config, posts });
  }

  const moreStories = chronological.filter((p) => !used.has(p.id)).slice(0, AKIS_MORE_STORIES_POOL);
  const usedBlogIds = Array.from(used);

  return {
    sliderPosts,
    sideFour,
    tickerFive,
    sections,
    moreStories,
    usedBlogIds,
  };
}
