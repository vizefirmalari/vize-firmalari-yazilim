"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { getSearchSessionId, postSearchEvent } from "@/lib/search/search-analytics-client";

type Props = {
  canonicalQuery: string;
  firmPage: number;
  blogPage: number;
  enabled: boolean;
  /** Firma + rehber + kategori toplam eşleşme (boş arama içgörüsü) */
  resultTotal?: number;
  children?: ReactNode;
};

export function AramaSearchImpression({
  canonicalQuery,
  firmPage,
  blogPage,
  enabled,
  resultTotal,
}: Props) {
  const sent = useRef(false);
  useEffect(() => {
    if (!enabled || !canonicalQuery || canonicalQuery.length < 2 || sent.current) return;
    sent.current = true;
    void postSearchEvent({
      type: "impression",
      query: canonicalQuery,
      source: "search_page",
      user_session: getSearchSessionId() || undefined,
      firm_page: firmPage,
      blog_page: blogPage,
      ...(typeof resultTotal === "number" ? { result_total: resultTotal } : {}),
    });
  }, [enabled, canonicalQuery, firmPage, blogPage, resultTotal]);
  return null;
}

export function AramaResultClickCapture({ canonicalQuery, children }: { canonicalQuery: string; children: ReactNode }) {
  return (
    <div
      onClick={(e) => {
        const el = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
        if (!el?.href) return;
        const href = el.getAttribute("href") ?? "";
        if (!href.startsWith("/")) return;
        const sid = getSearchSessionId();
        if (href.startsWith("/firma/") && href.includes("/blog/")) {
          const parts = href.split("/").filter(Boolean);
          const firmSlug = parts[1] ?? "";
          const blogSlug = parts[3] ?? "";
          void postSearchEvent({
            type: "click",
            query: canonicalQuery,
            result_type: "blog",
            result_slug: `${firmSlug}:${blogSlug}`,
            source: "search_page",
            user_session: sid || undefined,
          });
          return;
        }
        if (href.startsWith("/firma/") && href.split("/").filter(Boolean).length === 2) {
          const slug = href.split("/").filter(Boolean)[1] ?? "";
          void postSearchEvent({
            type: "click",
            query: canonicalQuery,
            result_type: "firm",
            result_slug: slug,
            source: "search_page",
            user_session: sid || undefined,
          });
          return;
        }
        if (href.startsWith("/kesfet/")) {
          const slug = href.replace("/kesfet/", "").split("?")[0] ?? "";
          void postSearchEvent({
            type: "click",
            query: canonicalQuery,
            result_type: "category",
            result_slug: slug,
            source: "search_page",
            user_session: sid || undefined,
          });
        }
      }}
    >
      {children}
    </div>
  );
}
