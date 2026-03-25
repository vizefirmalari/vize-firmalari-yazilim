import { FirmForm } from "@/components/admin/firm-form";
import { getPicklistCountries } from "@/lib/data/admin-filters";

export const metadata = {
  title: "Yeni firma",
  robots: { index: false, follow: false },
};

export default async function NewFirmPage() {
  const countries = await getPicklistCountries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Yeni firma
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Beş bölümde hızlı giriş; kaydet üstte ve altta sabit.
        </p>
      </div>
      <FirmForm
        mode="create"
        countryIds={[]}
        featuredCountryIds={[]}
        countries={countries}
      />
    </div>
  );
}
