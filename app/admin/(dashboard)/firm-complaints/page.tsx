import { AdminFirmComplaintsTable } from "@/components/admin/admin-firm-complaints-table";
import { getAdminFirmComplaintsList } from "@/lib/data/admin-firm-complaints";

export const metadata = {
  title: "Gelen şikayetler",
  robots: { index: false, follow: false },
};

export default async function AdminFirmComplaintsPage() {
  const rows = await getAdminFirmComplaintsList();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
          Gelen şikayetler
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-[#1A1A1A]/60">
          Kullanıcıların &quot;Firma Şikayet Et&quot; formuyla platform yönetimine ilettiği
          bildirimler. Bu kayıtlar listelenen firmaya gönderilmez; yalnızca burada
          değerlendirilir.
        </p>
      </div>

      <AdminFirmComplaintsTable rows={rows} />
    </div>
  );
}
