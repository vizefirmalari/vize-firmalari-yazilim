import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/auth/admin";

export const metadata = {
  title: "Yeni hizmet",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthServiceNewRedirectPage() {
  if (!(await getAdminContext())) redirect("/admin/login");
  redirect("/admin/hizmet-vitrini/hizmetler/new");
}
