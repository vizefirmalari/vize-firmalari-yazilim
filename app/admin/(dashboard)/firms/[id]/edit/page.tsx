import Link from "next/link";
import { notFound } from "next/navigation";
import { FirmForm } from "@/components/admin/firm-form";
import {
  getPicklistCompanyTypes,
  getPicklistCountries,
  getPicklistMainServiceCategories,
  getPicklistSubServices,
} from "@/lib/data/admin-filters";
import { getFirmForAdmin } from "@/lib/data/admin-firm-detail";
import { listSpecializationTaxonomyForAdmin } from "@/lib/data/specialization-taxonomy-admin-list";

export const metadata = {
  title: "Firma düzenle",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function EditFirmPage({ params }: PageProps) {
  const { id } = await params;
  const detail = await getFirmForAdmin(id);
  if (!detail) notFound();

  const [countries, companyTypes, mainServiceCategories, subServices, specializationTaxonomy] =
    await Promise.all([
      getPicklistCountries(),
      getPicklistCompanyTypes(),
      getPicklistMainServiceCategories(),
      getPicklistSubServices(),
      listSpecializationTaxonomyForAdmin(),
    ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
            Firma düzenle
          </h1>
          <p className="mt-1 text-sm text-[#1A1A1A]/60">
            {String(detail.firm.name ?? "")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/admin/firms/${id}/leads`}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0B3C5D] shadow-sm transition hover:bg-[#F4F6F8]"
          >
            Gelen başvurular
          </Link>
          <Link
            href={`/admin/firms/${id}/panel`}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-[#1A1A1A]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0B3C5D] shadow-sm transition hover:bg-[#F4F6F8]"
          >
            Firma paneli erişimi
          </Link>
        </div>
      </div>
      <FirmForm
        mode="edit"
        firmId={id}
        initial={detail.firm}
        privateInitial={detail.private}
        firmGoogleProfile={{
          row: detail.google_profile,
          loadError: detail.google_profile_load_error,
        }}
        countryIds={detail.country_ids}
        featuredCountryIds={detail.featured_country_ids}
        countries={countries}
        companyTypes={companyTypes}
        mainServiceCategories={mainServiceCategories}
        subServices={subServices}
        initialSpecializationTaxonomy={specializationTaxonomy}
      />
    </div>
  );
}
