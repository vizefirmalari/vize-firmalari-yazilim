import { FirmForm } from "@/components/admin/firm-form";
import {
  getPicklistCountries,
  getPicklistServiceTypes,
} from "@/lib/data/admin-filters";

export const metadata = {
  title: "Yeni firma",
  robots: { index: false, follow: false },
};

export default async function NewFirmPage() {
  const countries = await getPicklistCountries();
  const serviceTypes = await getPicklistServiceTypes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Yeni firma
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Tüm alanlar sekmeler halinde düzenlenir; kaydet üstte sabittir.
        </p>
      </div>
      <FirmForm
        mode="create"
        countryIds={[]}
        serviceTypeIds={[]}
        countries={countries}
        serviceTypes={serviceTypes}
      />
    </div>
  );
}
