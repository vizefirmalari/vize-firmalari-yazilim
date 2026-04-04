import { redirect } from "next/navigation";

import { GrowthPurchaseRequestsTable } from "@/components/admin/growth-purchase-requests-table";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "İşini Büyüt — talepler",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthPurchaseRequestsPage() {
  if (!(await getAdminContext())) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  const { data } = await supabase
    .from("growth_purchase_requests")
    .select(
      "id,firm_id,service_title,status,payment_status,created_at,billing_full_name,billing_email,billing_phone,transfer_description,firms(name)"
    )
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">Satın alma talepleri</h1>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">
          Onay / red / ödeme durumu ve tek tıkla aktif abonelik oluşturma.
        </p>
      </div>
      <GrowthPurchaseRequestsTable rows={(data ?? []) as Record<string, unknown>[]} />
    </div>
  );
}
