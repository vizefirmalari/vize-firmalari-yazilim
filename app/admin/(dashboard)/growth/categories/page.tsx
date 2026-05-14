import { redirect } from "next/navigation";

import { getAdminContext } from "@/lib/auth/admin";

export const metadata = {
  title: "İşini Büyüt — kategoriler",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthCategoriesRedirectPage() {
  if (!(await getAdminContext())) redirect("/admin/login");
  redirect("/admin/hizmet-vitrini");
}
