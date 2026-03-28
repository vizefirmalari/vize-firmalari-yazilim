import { KullanimKosullariPage } from "@/components/content/kullanim-kosullari-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("kullanim-kosullari");

export default function Page() {
  return <KullanimKosullariPage />;
}
