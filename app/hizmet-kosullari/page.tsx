import { HizmetKosullariPage } from "@/components/content/hizmet-kosullari-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("hizmet-kosullari");

export default function Page() {
  return <HizmetKosullariPage />;
}
