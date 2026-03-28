import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { PublicDocumentPageDef } from "@/lib/seo/public-routes";

export function PublicDocumentPage({ page }: { page: PublicDocumentPageDef }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {page.heading}
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-foreground/80 sm:text-base">
            {page.body}
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
