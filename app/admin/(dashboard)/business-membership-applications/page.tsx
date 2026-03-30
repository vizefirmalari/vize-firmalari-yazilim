import { AdminBusinessMembershipTable } from "@/components/admin/admin-business-membership-table";
import { getAdminBusinessMembershipApplications } from "@/lib/data/admin-business-membership-applications";

export const metadata = {
  title: "Üye iş yeri başvuruları",
  robots: { index: false, follow: false },
};

export default async function AdminBusinessMembershipApplicationsPage() {
  const items = await getAdminBusinessMembershipApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Üye iş yeri başvuruları
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-[#1A1A1A]/60">
          Bu liste yalnızca ön başvuru kayıtlarıdır; otomatik yayın yoktur. Uygun firmayı{" "}
          <strong className="font-semibold text-[#1A1A1A]/75">yönetim panelinden manuel olarak</strong>{" "}
          oluşturmanız gerekir (<span className="whitespace-nowrap">Firmalar → Yeni firma</span>). Mesajlaşma ve şikayet
          akışından ayrıdır.
        </p>
      </div>

      <AdminBusinessMembershipTable rows={items} />
    </div>
  );
}
