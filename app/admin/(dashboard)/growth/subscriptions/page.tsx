import { redirect } from "next/navigation";

import { GrowthSubscriptionsTable } from "@/components/admin/growth-subscriptions-table";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "İşini Büyüt — abonelikler",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthSubscriptionsPage() {
  if (!(await getAdminContext())) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const { data } = await supabase
    .from("firm_service_subscriptions")
    .select("id,service_title,status,start_date,end_date,created_at,firms(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Hizmet abonelikleri</h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">Firma bazlı aktif hizmetler; bitiş tarihi ve pasifleştirme.</p>
      </div>
      <GrowthSubscriptionsTable rows={(data ?? []) as Record<string, unknown>[]} />
    </div>
  );
}
