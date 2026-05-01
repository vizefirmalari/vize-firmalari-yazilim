import { getSiteUrl } from "@/lib/env";

type PostRow = { title: string; target_url: string };

type Props = {
  categoryTitle: string;
  canonicalUrl: string;
  posts: PostRow[];
};

export function AkisCategoryJsonLd({ categoryTitle, canonicalUrl, posts }: Props) {
  const base = getSiteUrl().replace(/\/$/, "");
  const origin = base;
  const akisUrl = `${origin}/akis`;

  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: "Akış", item: akisUrl },
      {
        "@type": "ListItem",
        position: 3,
        name: `${categoryTitle} rehberleri`,
        item: canonicalUrl,
      },
    ],
  };

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": `${canonicalUrl}#collection`,
    url: canonicalUrl,
    name: `${categoryTitle} rehberleri ve güncel yazılar`,
    isPartOf: { "@type": "WebSite", name: "Vize Firmaları", url: origin },
    mainEntity: { "@id": `${canonicalUrl}#itemlist` },
  };

  const itemList = {
    "@type": "ItemList",
    "@id": `${canonicalUrl}#itemlist`,
    itemListElement: posts.map((p, i) => {
      const absolute = p.target_url.startsWith("http") ? p.target_url : `${origin}${p.target_url}`;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: absolute,
      };
    }),
  };

  const graph = [breadcrumbs, collectionPage, itemList];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
