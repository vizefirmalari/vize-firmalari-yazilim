import { notFound } from "next/navigation";

import { AdminFirmComplaintDetail } from "@/components/admin/admin-firm-complaint-detail";
import { getAdminFirmComplaintById } from "@/lib/data/admin-firm-complaints";

export const metadata = {
  title: "Şikayet detayı",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminFirmComplaintDetailPage({ params }: PageProps) {
  const { id } = await params;
  const row = await getAdminFirmComplaintById(id);
  if (!row) {
    notFound();
  }

  return (
    <AdminFirmComplaintDetail
      key={`${row.id}-${row.status}-${row.is_read}`}
      row={row}
    />
  );
}
