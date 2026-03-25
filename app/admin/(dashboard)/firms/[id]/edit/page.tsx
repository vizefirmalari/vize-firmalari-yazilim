import { notFound } from "next/navigation";
import { FirmForm } from "@/components/admin/firm-form";
import { getPicklistCountries } from "@/lib/data/admin-filters";
import { getFirmForAdmin } from "@/lib/data/admin-firm-detail";

export const metadata = {
  title: "Firma düzenle",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function EditFirmPage({ params }: PageProps) {
  const { id } = await params;
  const detail = await getFirmForAdmin(id);
  if (!detail) notFound();

  const countries = await getPicklistCountries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Firma düzenle
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          {String(detail.firm.name ?? "")}
        </p>
      </div>
      <FirmForm
        mode="edit"
        firmId={id}
        initial={detail.firm}
        privateInitial={detail.private}
        countryIds={detail.country_ids}
        featuredCountryIds={detail.featured_country_ids}
        countries={countries}
      />
    </div>
  );
}
