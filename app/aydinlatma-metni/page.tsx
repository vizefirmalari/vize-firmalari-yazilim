import { AydinlatmaMetniPage } from "@/components/content/aydinlatma-metni-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("aydinlatma-metni");

export default function Page() {
  return <AydinlatmaMetniPage />;
}
