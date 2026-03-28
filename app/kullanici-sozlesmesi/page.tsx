import { KullaniciSozlesmesiPage } from "@/components/content/kullanici-sozlesmesi-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("kullanici-sozlesmesi");

export default function Page() {
  return <KullaniciSozlesmesiPage />;
}
