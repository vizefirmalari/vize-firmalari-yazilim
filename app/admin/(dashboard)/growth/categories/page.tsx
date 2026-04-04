import { redirect } from "next/navigation";

import { GrowthCategoriesManager } from "@/components/admin/growth-categories-manager";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "İşini Büyüt — kategoriler",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthCategoriesPage() {
  if (!(await getAdminContext())) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const { data } = await supabase
    .from("growth_service_categories")
    .select("id,name,icon,sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Hizmet kategorileri</h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">Firma panelindeki İşini Büyüt sayfasında blok başlıkları olarak görünür.</p>
      </div>
      <GrowthCategoriesManager rows={(data ?? []) as { id: string; name: string; icon: string; sort_order: number }[]} />
    </div>
  );
}
