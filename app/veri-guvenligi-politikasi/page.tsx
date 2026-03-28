import { VeriGuvenligiPolitikasiPage } from "@/components/content/veri-guvenligi-politikasi-page";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("veri-guvenligi-politikasi");

export default function Page() {
  return <VeriGuvenligiPolitikasiPage />;
}
