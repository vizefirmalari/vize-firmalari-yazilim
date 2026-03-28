import { PublicDocumentPage } from "@/components/seo/public-document-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";
import { PUBLIC_DOCUMENT_PAGES } from "@/lib/seo/public-routes";

export const metadata = buildPublicDocumentMetadata(
  "kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi"
);

export default function Page() {
  return (
    <PublicDocumentPage
      page={
        PUBLIC_DOCUMENT_PAGES[
          "kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi"
        ]
      }
    />
  );
}
