import { SorumlulukReddiBeyaniPage } from "@/components/content/sorumluluk-reddi-beyani-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("sorumluluk-reddi-beyani");

export default function Page() {
  return <SorumlulukReddiBeyaniPage />;
}
