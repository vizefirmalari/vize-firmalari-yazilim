import { SssVeIslemRehberiPage } from "@/components/content/sss-ve-islem-rehberi-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("sss-ve-islem-rehberi");

export default function Page() {
  return <SssVeIslemRehberiPage />;
}
