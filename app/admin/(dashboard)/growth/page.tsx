import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/auth/admin";

export const metadata = {
  title: "İşini Büyüt yönetimi",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthHubPage() {
  if (!(await getAdminContext())) redirect("/admin/login");
  redirect("/admin/hizmet-vitrini");
}
