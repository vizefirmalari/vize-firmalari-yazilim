import { notFound } from "next/navigation";

import { AdminBusinessMembershipDetailForm } from "@/components/admin/admin-business-membership-detail-form";
import { getAdminBusinessMembershipApplicationById } from "@/lib/data/admin-business-membership-applications";

export const metadata = {
  title: "Başvuru detayı",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminBusinessMembershipApplicationDetailPage({
  params,
}: PageProps) {
  const { id } = await params;
  const item = await getAdminBusinessMembershipApplicationById(id);
  if (!item) {
    notFound();
  }

  return (
    <AdminBusinessMembershipDetailForm
      key={`${item.id}-${item.status}-${item.is_read}`}
      item={item}
    />
  );
}
