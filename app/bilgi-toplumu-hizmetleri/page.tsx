import { BilgiToplumuHizmetleriPage } from "@/components/content/bilgi-toplumu-hizmetleri-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("bilgi-toplumu-hizmetleri");

export default function Page() {
  return <BilgiToplumuHizmetleriPage />;
}
