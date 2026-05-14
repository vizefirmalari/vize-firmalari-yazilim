import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/auth/admin";

export const metadata = {
  title: "Hizmet düzenle",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthServiceEditRedirectPage() {
  if (!(await getAdminContext())) redirect("/admin/login");
  redirect("/admin/hizmet-vitrini/hizmetler");
}
