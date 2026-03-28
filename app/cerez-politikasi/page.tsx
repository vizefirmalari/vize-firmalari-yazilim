import { CerezPolitikasiPage } from "@/components/content/cerez-politikasi-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("cerez-politikasi");

export default function Page() {
  return <CerezPolitikasiPage />;
}
