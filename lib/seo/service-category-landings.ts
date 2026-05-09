import type { Metadata } from "next";
import { parseFirmFilters } from "@/lib/data/firms";
import type { FirmFilters } from "@/lib/types/firm";
import { absoluteUrl } from "@/lib/seo/canonical";
import { SITE_BRAND_NAME } from "@/lib/seo/defaults";
import { resolveDefaultSiteShareImage } from "@/lib/seo/og-images";
import { slugify } from "@/lib/slug";

/**
 * Filtre panelindeki “Tüm kategoriler” ile aynı ana hizmet etiketleri (CMS / firma kaydı).
 * URL: /hizmet/{slug} — slug `slugify(etiket)` + çakışmada `-2` soneki.
 */
export const SERVICE_CATEGORY_MAIN_LABELS = [
  "Akraba Ziyareti Vizesi",
  "Almanya Eğitim Danışmanlığı",
  "Başvuru Süreç Yönetimi",
  "Dil Sertifikasyon Hizmeti",
  "Dil Sınav Merkezi",
  "Diplomatik Vize",
  "Dosya Hizmeti",
  "E-Vize",
  "Eğitim Vizesi",
  "Evrak / Danışmanlık",
  "Fuar Vizesi",
  "Göç ve Entegrasyon Danışmanlığı",
  "Göçmenlik Hukuku",
  "Hukuki Danışmanlık",
  "İngiltere Vizesi",
  "Kişiye Özel Tatil Hizmetleri",
  "Konaklama Danışmanlığı",
  "Konferans Vizesi",
  "Konsolosluk İşlemleri",
  "Konsolosluk Yazıları",
  "Mesleki Denklik",
  "Nitelikli İşçi Göçü",
  "Nitelikli İşçi Yerleştirme",
  "Oturum",
  "Ön Onay İşlemleri",
  "Pasaport",
  "Randevu Hizmeti",
  "Rezervasyon Hizmeti",
  "Sağlık Çalışanı Yerleştirme",
  "Sağlık Sektörü İş Yerleştirme",
  "Sanatçı Vizesi",
  "Sporcu Vizesi",
  "Şirket Kurulumu",
  "Tercüme",
  "Transit Vizesi",
  "Turistik Vize",
  "Uluslararası Kariyer Danışmanlığı",
  "Uzun dönemli / D tipi vizeler",
  "Vatandaşlık",
  "Vize Hizmeti",
  "Yurtdışı Eğitim Danışmanlığı",
  "Ziyaret Vizesi",
] as const;

export type ServiceCategoryFaqItem = { question: string; answer: string };

export type ServiceCategoryLandingDef = {
  slug: string;
  mainServiceLabel: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroLead: string;
  faq: ServiceCategoryFaqItem[];
  editorialParagraphs: string[];
};

function clipMeta(s: string, max = 158): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

function buildFaq(label: string): ServiceCategoryFaqItem[] {
  return [
    {
      question: `Bu sayfada hangi firmalar listelenir?`,
      answer: `Yalnızca yayınlanmış kayıtlar gösterilir. Ana hizmet kategorisi olarak “${label}” ile eşleşen firmalar listelenir; kapsam firma profiline göre değişebilir.`,
    },
    {
      question: "Kurumsallık skoru neyi ifade eder?",
      answer:
        "Doğrulanmış kurumsal ve güven sinyallerinin özetidir; yüksek skor daha zengin profil verisi anlamına gelebilir, mutlak garanti değildir.",
    },
    {
      question: "Ek filtreler kategori seçimimi kaldırır mı?",
      answer:
        "Hayır. Bu vitrinde ana hizmet kategorisi sabit kalır; şehir, ülke veya diğer panel filtreleri buna eklenir. “Temizle” yalnızca ek kriterleri sıfırlar.",
    },
    {
      question: "Platform vize başvurusu veya dosya sunar mı?",
      answer:
        "Hayır. Vize Firmaları aracı listeleme sunar; başvuru ve danışmanlık hizmeti seçtiğiniz firmayla sizin aranızdadır.",
    },
    {
      question: "Ücret bilgisi listede var mıdır?",
      answer:
        "Genel ücret tablosu yoktur. Ücretlendirme ve sözleşme koşulları için firma profili üzerinden doğrudan teyit alın.",
    },
  ];
}

function buildEditorial(label: string): string[] {
  return [
    `“${label}” ana hizmet kategorisinde destek arayan kullanıcılar için bu vitrin, aynı kategoriyi beyan eden firmaları tek ekranda toplar. Sol paneldeki filtreler ile şehir, ülke kapsamı veya hizmet biçimi gibi kriterleri daraltabilirsiniz.`,
    "Karşılaştırma yaparken kurumsallık skoru, profil açıklaması ve iletişim kanallarını birlikte değerlendirmek genelde daha dengeli bir seçim sağlar. Listede yer almak, platformun hukuki veya ticari tavsiye verdiği anlamına gelmez.",
    "Kesin hizmet kapsamı ve süreç adımları için her zaman seçtiğiniz firma ile yazılı veya kayıtlı kanallardan netleştirme yapmanız önerilir.",
  ];
}

function buildCopy(label: string): Pick<
  ServiceCategoryLandingDef,
  "title" | "metaDescription" | "h1" | "heroLead" | "faq" | "editorialParagraphs"
> {
  const h1 = `${label} Veren Firmalar`;
  const heroLead = `${label} kategorisinde hizmet sunan danışmanlık firmalarını inceleyin; kurumsallık skoru ve filtrelerle karşılaştırın, doğrudan iletişime geçin.`;
  /** `layout` metadata.template ile birleşir — burada marka tekrarı yok. */
  const title = `${label} Danışmanlık Firmaları`;
  const metaDescription = clipMeta(
    `${label} kategorisinde danışmanlık veren firmaları listeleyin. Kurumsallık skoru, filtreler ve şeffaf profillerle hızlı karşılaştırma; iletişim için firma sayfasını kullanın.`
  );
  return {
    title,
    metaDescription,
    h1,
    heroLead,
    faq: buildFaq(label),
    editorialParagraphs: buildEditorial(label),
  };
}

function assignSlugs(labels: readonly string[]): { slug: string; mainServiceLabel: string }[] {
  const used = new Set<string>();
  const rows: { slug: string; mainServiceLabel: string }[] = [];
  for (const mainServiceLabel of labels) {
    let base = slugify(mainServiceLabel);
    if (!base) base = "hizmet";
    let candidate = base;
    let n = 2;
    while (used.has(candidate)) {
      candidate = `${base}-${n}`;
      n += 1;
    }
    used.add(candidate);
    rows.push({ slug: candidate, mainServiceLabel });
  }
  return rows;
}

const SLUG_ROWS = assignSlugs(SERVICE_CATEGORY_MAIN_LABELS);

const BY_SLUG: Record<string, ServiceCategoryLandingDef> = Object.fromEntries(
  SLUG_ROWS.map(({ slug, mainServiceLabel }) => {
    const copy = buildCopy(mainServiceLabel);
    return [
      slug,
      {
        slug,
        mainServiceLabel,
        ...copy,
      } satisfies ServiceCategoryLandingDef,
    ];
  })
);

export function listServiceCategorySlugs(): string[] {
  return SLUG_ROWS.map((r) => r.slug);
}

export function listServiceCategoryNavItems(): Array<{ href: string; label: string }> {
  return SLUG_ROWS.map(({ slug, mainServiceLabel }) => ({
    href: `/hizmet/${slug}`,
    label: mainServiceLabel,
  }));
}

export function getServiceCategoryLandingBySlug(
  slug: string
): ServiceCategoryLandingDef | null {
  return BY_SLUG[slug] ?? null;
}

export function mergeServiceCategoryLandingFilters(
  mainServiceLabel: string,
  sp: Record<string, string | string[] | undefined>
): FirmFilters {
  const fromUrl = parseFirmFilters(sp);
  return {
    ...fromUrl,
    q: fromUrl.q,
    countries: fromUrl.countries,
    visaTypes: fromUrl.visaTypes,
    expertise: fromUrl.expertise,
    cities: fromUrl.cities,
    firmTypes: fromUrl.firmTypes,
    mainServices: [mainServiceLabel],
    exploreFocusSlug: null,
    sort: fromUrl.sort,
  };
}

export async function buildServiceCategoryMetadata(
  slug: string,
  sp: Record<string, string | string[] | undefined>
): Promise<Metadata> {
  const cfg = getServiceCategoryLandingBySlug(slug);
  if (!cfg) {
    return { title: "Kategori bulunamadı" };
  }
  const canonical = absoluteUrl(`/hizmet/${slug}`);
  const img = resolveDefaultSiteShareImage();
  const description = cfg.metaDescription;
  const ogTitle = `${SITE_BRAND_NAME} — ${cfg.title}`;

  const fromUrl = parseFirmFilters(sp);
  const robots =
    fromUrl.q.trim().length > 0 ? ({ index: false, follow: true } as const) : ({ index: true, follow: true } as const);

  return {
    title: cfg.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_BRAND_NAME,
      locale: "tr_TR",
      type: "website",
      images: [{ url: img.url, alt: img.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [img.url],
    },
    robots,
  };
}
