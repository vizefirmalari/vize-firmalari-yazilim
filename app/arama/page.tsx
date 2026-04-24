import type { Metadata } from "next";

import { FirmCard } from "@/components/home/firm-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { searchFirmsForAramaPage } from "@/lib/data/firms";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function parseQ(sp: { [key: string]: string | string[] | undefined }): string {
  const v = sp.q;
  if (typeof v === "string") return v.trim();
  if (Array.isArray(v)) return String(v[0] ?? "").trim();
  return "";
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Arama Sonuçları",
    robots: { index: false, follow: true },
  };
}

export default async function AramaPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = parseQ(sp);
  const hasQuery = q.length > 0;
  const results = hasQuery ? await searchFirmsForAramaPage(q) : [];
  const count = results.length;

  return (
    <>
      <SiteHeader defaultQuery={q} hiddenParams={{}} />
      <main className="flex-1 bg-background">
        <div className="container-shell py-8 sm:py-10">
          <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Arama Sonuçları
          </h1>
          {hasQuery ? (
            <p className="mt-2 text-sm text-foreground/80 sm:mt-3 sm:text-base">
              <span className="font-medium text-foreground/90">“{q}”</span>{" "}
              aramasıyla eşleşen firmalar ve hizmetler
            </p>
          ) : (
            <p className="mt-2 text-sm text-foreground/75 sm:mt-3 sm:text-base">
              Aramak istediğiniz ülke, vize türü, hizmet veya firma adını üstteki
              arama kutusuna yazıp <strong className="text-foreground/90">Enter</strong>’a
              basın.
            </p>
          )}

          {hasQuery ? (
            <>
              <p className="mt-4 text-sm text-foreground/60">
                <span className="font-semibold text-foreground/80">
                  {count} sonuç
                </span>{" "}
                bulundu{count >= 24 ? " (en fazla 24 gösteriliyor)" : ""}
              </p>

              {count > 0 ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {results.map((firm) => (
                    <FirmCard key={firm.id} firm={firm} />
                  ))}
                </div>
              ) : (
                <div
                  className="premium-card mt-8 max-w-2xl space-y-3 p-6 text-sm leading-relaxed text-foreground/80 sm:p-8"
                  role="status"
                >
                  <p className="font-semibold text-foreground">
                    Aramanızla eşleşen sonuç bulunamadı.
                  </p>
                  <p>
                    Farklı bir ülke, vize türü veya firma adıyla tekrar arama
                    yapabilirsiniz.
                  </p>
                </div>
              )}
            </>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
