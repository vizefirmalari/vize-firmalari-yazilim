import { HakkimizdaPage } from "@/components/content/hakkimizda-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("hakkimizda");

export default function Page() {
  return <HakkimizdaPage />;
}
