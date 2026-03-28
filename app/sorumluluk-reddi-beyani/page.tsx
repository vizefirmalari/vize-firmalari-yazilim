import { PublicDocumentPage } from "@/components/seo/public-document-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";
import { PUBLIC_DOCUMENT_PAGES } from "@/lib/seo/public-routes";

export const metadata = buildPublicDocumentMetadata("sorumluluk-reddi-beyani");

export default function Page() {
  return (
    <PublicDocumentPage
      page={PUBLIC_DOCUMENT_PAGES["sorumluluk-reddi-beyani"]}
    />
  );
}
