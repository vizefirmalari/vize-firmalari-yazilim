import Link from "next/link";
import { redirect } from "next/navigation";

import { ServiceStorefrontNewForm } from "@/components/admin/service-storefront-new-form";
import { getAdminContext } from "@/lib/auth/admin";

export const metadata = {
  title: "Yeni hizmet — Hizmet Vitrini",
  robots: { index: false, follow: false },
};

export default async function AdminHizmetVitriniNewPage() {
  if (!(await getAdminContext())) redirect("/admin/login");

  return (
    <div className="space-y-6">
      <Link href="/admin/hizmet-vitrini/hizmetler" className="text-sm font-semibold text-[#0B3C5D] hover:underline">
        ← Hizmet listesi
      </Link>
      <h1 className="text-2xl font-bold text-[#0B3C5D]">Yeni hizmet</h1>
      <ServiceStorefrontNewForm />
    </div>
  );
}
