import { IletisimPage } from "@/components/content/iletisim-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("iletisim");

export default function Page() {
  return <IletisimPage />;
}
