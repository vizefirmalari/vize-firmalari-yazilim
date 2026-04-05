import { notFound, redirect } from "next/navigation";

import { GrowthPurchaseDetailPanel } from "@/components/admin/growth-purchase-detail-panel";
import { adminMarkGrowthPurchaseNotificationsRead } from "@/lib/actions/growth-admin";
import { getAdminContext } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ id: string }> };

export const metadata = {
  title: "Satın alma detayı",
  robots: { index: false, follow: false },
};

export default async function AdminGrowthPurchaseDetailPage({ params }: PageProps) {
  if (!(await getAdminContext())) redirect("/admin/login");

  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");

  await adminMarkGrowthPurchaseNotificationsRead(id);

  const { data: purchase, error } = await supabase
    .from("growth_purchase_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !purchase) notFound();

  const firmId = String(purchase.firm_id);
  const { data: firm } = await supabase
    .from("firms")
    .select("id,name,slug,logo_url,email,phone")
    .eq("id", firmId)
    .maybeSingle();

  const { data: subscription } = await supabase
    .from("firm_service_subscriptions")
    .select("id,service_title,status,billing_cycle,start_date,end_date")
    .eq("purchase_request_id", id)
    .maybeSingle();

  return (
    <GrowthPurchaseDetailPanel
      model={{
        purchase: purchase as Record<string, unknown>,
        firm: (firm ?? null) as Record<string, unknown> | null,
        subscription: (subscription ?? null) as Record<string, unknown> | null,
      }}
    />
  );
}
