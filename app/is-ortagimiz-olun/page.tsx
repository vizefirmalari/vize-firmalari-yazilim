import { IsOrtagimizOlunPage } from "@/components/content/is-ortagimiz-olun-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("is-ortagimiz-olun");

export default function Page() {
  return <IsOrtagimizOlunPage />;
}
