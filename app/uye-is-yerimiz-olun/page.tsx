import { UyeIsYerimizOlunPage } from "@/components/content/uye-is-yerimiz-olun-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("uye-is-yerimiz-olun");

type PageProps = {
  searchParams: Promise<{ odeme?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  return <UyeIsYerimizOlunPage scrollToFormOnPayment={sp.odeme === "basarili"} />;
}
