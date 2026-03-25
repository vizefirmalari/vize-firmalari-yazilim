import { FirmForm } from "@/components/admin/firm-form";
import {
  getPicklistCompanyTypes,
  getPicklistCountries,
  getPicklistMainServiceCategories,
  getPicklistSubServices,
} from "@/lib/data/admin-filters";

export const metadata = {
  title: "Yeni firma",
  robots: { index: false, follow: false },
};

export default async function NewFirmPage() {
  const [countries, companyTypes, mainServiceCategories, subServices] = await Promise.all([
    getPicklistCountries(),
    getPicklistCompanyTypes(),
    getPicklistMainServiceCategories(),
    getPicklistSubServices(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Yeni firma
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Beş bölümde hızlı giriş; eksik sınıflandırmaları formdan anında ekleyin.
        </p>
      </div>
      <FirmForm
        mode="create"
        countryIds={[]}
        featuredCountryIds={[]}
        countries={countries}
        companyTypes={companyTypes}
        mainServiceCategories={mainServiceCategories}
        subServices={subServices}
      />
    </div>
  );
}
