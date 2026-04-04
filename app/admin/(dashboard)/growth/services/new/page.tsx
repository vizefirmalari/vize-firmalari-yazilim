import Link from "next/link";
import { redirect } from "next/navigation";

import { GrowthServiceForm } from "@/components/admin/growth-service-form";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Yeni hizmet",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthServiceNewPage() {
  if (!(await getAdminContext())) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: cats } = await supabase
    .from("growth_service_categories")
    .select("id,name")
    .order("sort_order", { ascending: true });

  const categories = (cats ?? []) as { id: string; name: string }[];

  return (
    <div className="space-y-6">
      <Link href="/admin/growth/services" className="text-sm font-semibold text-[#0B3C5D] hover:underline">
        ← Hizmet listesi
      </Link>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Yeni hizmet</h1>
      </div>
      {!categories.length ? (
        <p className="text-sm text-[#1A1A1A]/60">Önce en az bir kategori oluşturun.</p>
      ) : (
        <GrowthServiceForm categories={categories} initial={null} />
      )}
    </div>
  );
}
