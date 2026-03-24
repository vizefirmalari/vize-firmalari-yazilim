import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getAllFirmSlugs, getFirmBySlug } from "@/lib/data/firms";
import { getSiteUrl } from "@/lib/env";
import type { FirmRow } from "@/lib/types/firm";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function whatsappHref(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

function jsonLd(firm: FirmRow, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: firm.name,
    description: firm.description ?? undefined,
    url,
    telephone: firm.phone ?? undefined,
    email: firm.email ?? undefined,
    areaServed: firm.countries.map((c) => ({
      "@type": "Place",
      name: c,
    })),
    image: firm.logo_url ?? undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await getAllFirmSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const firm = await getFirmBySlug(slug);
  if (!firm) {
    return { title: "Firma bulunamadı" };
  }

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/firma/${firm.slug}`;
  const desc =
    firm.description?.slice(0, 155) ??
    `${firm.name} — Güven endeksi ${firm.trust_score}/100.`;

  return {
    title: firm.name,
    description: desc,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${firm.name} | VizeFirmalari`,
      description: desc,
      url: pageUrl,
      siteName: "VizeFirmalari",
      locale: "tr_TR",
      type: "website",
      images: firm.logo_url ? [{ url: firm.logo_url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${firm.name} | VizeFirmalari`,
      description: desc,
    },
    robots: { index: true, follow: true },
  };
}

export default async function FirmaPage({ params }: PageProps) {
  const { slug } = await params;
  const firm = await getFirmBySlug(slug);
  if (!firm) notFound();

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/firma/${firm.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(firm, pageUrl)),
        }}
      />
      <SiteHeader />
      <article>
        <div className="relative overflow-hidden bg-[#0B3C5D]">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            aria-hidden
          >
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#328CC1] blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[#D9A441]/25 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-2 ring-white/25 backdrop-blur">
                  {firm.logo_url ? (
                    <Image
                      src={firm.logo_url}
                      alt={firm.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                      priority
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {initials(firm.name)}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {firm.name}
                  </h1>
                  <p className="mt-2 text-sm text-white/80">
                    Güven Endeksi:{" "}
                    <span className="font-semibold text-[#D9A441]">
                      {firm.trust_score}/100
                    </span>
                  </p>
                </div>
              </div>
              <Link
                href="/#firmalar"
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Tüm firmalar
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
            <div className="space-y-8">
              <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#0B3C5D]">
                  Hakkında
                </h2>
                <p className="mt-3 text-[#1A1A1A]/80 leading-relaxed">
                  {firm.description ??
                    "Bu firma için açıklama yakında güncellenecek."}
                </p>
              </section>

              <section className="rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#0B3C5D]">
                  Hizmet verilen ülkeler
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {firm.countries.map((c) => (
                    <li key={c}>
                      <span className="inline-flex rounded-lg bg-[#F7F9FB] px-3 py-1 text-sm font-medium text-[#0B3C5D] ring-1 ring-[#0B3C5D]/10">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div
                id="basvuru"
                className="scroll-mt-28 rounded-xl border border-[#0B3C5D]/10 bg-white p-6 shadow-[0_8px_30px_rgba(11,60,93,0.06)]"
              >
                <h2 className="text-lg font-semibold text-[#0B3C5D]">
                  Başvuruya başlayın
                </h2>
                <p className="mt-2 text-sm text-[#1A1A1A]/70">
                  Hızlı başvuru için iletişim kanallarını kullanın veya doğrudan
                  başvuru adımına geçin.
                </p>
                <Link
                  href="#iletisim"
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#D9A441] py-3 text-center text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f]"
                >
                  Hızlı Başvur
                </Link>
              </div>

              <div
                id="iletisim"
                className="scroll-mt-28 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB] p-6"
              >
                <h2 className="text-lg font-semibold text-[#0B3C5D]">
                  İletişim
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {firm.phone ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        Telefon
                      </span>
                      <a
                        href={`tel:${firm.phone.replace(/\s/g, "")}`}
                        className="mt-1 block font-semibold text-[#328CC1] hover:underline"
                      >
                        {firm.phone}
                      </a>
                    </li>
                  ) : null}
                  {firm.whatsapp ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        WhatsApp
                      </span>
                      <a
                        href={whatsappHref(firm.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block font-semibold text-[#328CC1] hover:underline"
                      >
                        {firm.whatsapp}
                      </a>
                    </li>
                  ) : null}
                  {firm.email ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        E-posta
                      </span>
                      <a
                        href={`mailto:${firm.email}`}
                        className="mt-1 block break-all font-semibold text-[#328CC1] hover:underline"
                      >
                        {firm.email}
                      </a>
                    </li>
                  ) : null}
                  {firm.website ? (
                    <li>
                      <span className="font-medium text-[#1A1A1A]/55">
                        Web
                      </span>
                      <a
                        href={firm.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block break-all font-semibold text-[#328CC1] hover:underline"
                      >
                        {firm.website}
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <SiteFooter />
    </>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}
