import { CountriesManager } from "@/components/admin/countries-manager";
import { getAdminCountriesList } from "@/lib/data/admin-filters";

export const metadata = {
  title: "Ülkeler",
  robots: { index: false, follow: false },
};

export default async function AdminCountriesPage() {
  const rows = await getAdminCountriesList();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Ülke filtreleri
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Ana sayfa ülke listesine ve eşleştirmelere kaynak olur.
        </p>
      </div>
      <CountriesManager rows={rows} />
    </div>
  );
}
