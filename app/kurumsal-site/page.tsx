import { KurumsalSitePage } from "@/components/content/kurumsal-site-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("kurumsal-site");

export default function Page() {
  return <KurumsalSitePage />;
}
