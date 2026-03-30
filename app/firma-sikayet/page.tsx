import { FirmComplaintPage } from "@/components/complaint/firm-complaint-page";
import { getPublishedFirmsForComplaintPicker } from "@/lib/data/published-firms-picker";
import { buildPublicDocumentMetadata } from "@/lib/seo/public-document-metadata";

export const metadata = buildPublicDocumentMetadata("firma-sikayet");

export default async function Page() {
  const firms = await getPublishedFirmsForComplaintPicker();
  return <FirmComplaintPage firms={firms} />;
}
