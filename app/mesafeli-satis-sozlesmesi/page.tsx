import { MesafeliSatisSozlesmesiPage } from "@/components/content/mesafeli-satis-sozlesmesi-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("mesafeli-satis-sozlesmesi");

export default function Page() {
  return <MesafeliSatisSozlesmesiPage />;
}
