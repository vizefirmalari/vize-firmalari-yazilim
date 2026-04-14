import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceCategoryLandingView } from "@/components/seo/service-category-landing-view";
import {
  buildServiceCategoryMetadata,
  getServiceCategoryLandingBySlug,
  listServiceCategorySlugs,
} from "@/lib/seo/service-category-landings";

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return listServiceCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  return buildServiceCategoryMetadata(slug, await searchParams);
}

export default async function HizmetKategoriPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const cfg = getServiceCategoryLandingBySlug(slug);
  if (!cfg) notFound();
  return <ServiceCategoryLandingView cfg={cfg} searchParams={searchParams} />;
}
