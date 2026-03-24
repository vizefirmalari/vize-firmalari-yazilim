import { ServiceTypesManager } from "@/components/admin/service-types-manager";
import { getAdminServiceTypesList } from "@/lib/data/admin-filters";

export const metadata = {
  title: "İşlem türleri",
  robots: { index: false, follow: false },
};

export default async function AdminServiceTypesPage() {
  const rows = await getAdminServiceTypesList();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          İşlem türleri
        </h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Firma formları ve ana sayfa filtreleri bu kayıtlarla senkron kalır.
        </p>
      </div>
      <ServiceTypesManager rows={rows} />
    </div>
  );
}
