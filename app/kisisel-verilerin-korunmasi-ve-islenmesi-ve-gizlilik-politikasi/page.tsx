import { KisiselVerilerGizlilikPolitikasiPage } from "@/components/content/kisisel-veriler-gizlilik-politikasi-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata(
  "kisisel-verilerin-korunmasi-ve-islenmesi-ve-gizlilik-politikasi"
);

export default function Page() {
  return <KisiselVerilerGizlilikPolitikasiPage />;
}
