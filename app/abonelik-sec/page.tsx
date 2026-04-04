import { redirect } from "next/navigation";

import { SubscriptionLandingClient } from "@/components/subscription/subscription-landing-client";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Abonelik planları | Vize Firmaları",
  description:
    "Tüm firmalar tam panel erişimine sahiptir. Abonelik planları liste sıralaması, görünürlük ve promosyon gücünü artırır.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ firmId?: string; need?: string }>;
};

const NEED_LABEL: Record<string, string> = {
  pro: "Pro",
  business: "Business",
};

export default async function AbonelikSecPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const firmId = typeof sp.firmId === "string" && sp.firmId ? sp.firmId : "";
  const needRaw = typeof sp.need === "string" && sp.need ? sp.need : "";
  const needLabel = NEED_LABEL[needRaw] ?? null;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect(`/?auth=login&next=${encodeURIComponent("/abonelik-sec")}`);
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/?auth=login&next=${encodeURIComponent("/abonelik-sec")}`);
  }

  let firmName: string | null = null;
  if (firmId) {
    const { data: firm } = await supabase.from("firms").select("name, brand_name").eq("id", firmId).maybeSingle();
    if (firm) {
      firmName = (firm.brand_name as string | null) || (firm.name as string);
    }
  }

  return <SubscriptionLandingClient firmName={firmName} needLabel={needLabel} firmId={firmId} />;
}
