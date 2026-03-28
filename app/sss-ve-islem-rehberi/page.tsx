import { PublicDocumentPage } from "@/components/seo/public-document-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";
import { PUBLIC_DOCUMENT_PAGES } from "@/lib/seo/public-routes";

export const metadata = buildPublicDocumentMetadata("sss-ve-islem-rehberi");

export default function Page() {
  return (
    <PublicDocumentPage page={PUBLIC_DOCUMENT_PAGES["sss-ve-islem-rehberi"]} />
  );
}
