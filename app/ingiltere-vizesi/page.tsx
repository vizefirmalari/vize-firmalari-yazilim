import type { Metadata } from "next";
import { VisaSeoLandingView } from "@/components/seo/visa-seo-landing-view";
import { buildVisaSeoMetadata } from "@/lib/seo/visa-seo-landings";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ROUTE = "/ingiltere-vizesi" as const;

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return buildVisaSeoMetadata(ROUTE, await searchParams);
}

export default function IngiltereVizesiPage({ searchParams }: Props) {
  return <VisaSeoLandingView routePath={ROUTE} searchParams={searchParams} />;
}
