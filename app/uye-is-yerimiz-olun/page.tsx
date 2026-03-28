import { UyeIsYerimizOlunPage } from "@/components/content/uye-is-yerimiz-olun-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("uye-is-yerimiz-olun");

export default function Page() {
  return <UyeIsYerimizOlunPage />;
}
