import { KariyerPage } from "@/components/content/kariyer-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("kariyer");

export default function Page() {
  return <KariyerPage />;
}
