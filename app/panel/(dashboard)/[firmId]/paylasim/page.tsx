import { notFound } from "next/navigation";

import { ShareCenterPanel } from "@/components/firm-panel/share-center-panel";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { requireFirmPlanAtLeast } from "@/lib/subscriptions/require-plan";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ firmId: string }> };

export default async function FirmShareCenterPage({ params }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);
  await requireFirmPlanAtLeast(firmId, "business");

  const supabase = await createSupabaseServerClient();
  if (!supabase) notFound();

  const { data: firm } = await supabase
    .from("firms")
    .select(
      "id, name, brand_name, logo_url, hype_score, corporateness_score, countries, schengen_expert, usa_visa_expert, student_visa_support, work_visa_support, tourist_visa_support, business_visa_support, family_reunion_support, appeal_support"
    )
    .eq("id", firmId)
    .maybeSingle();

  if (!firm) notFound();

  const safeName = (firm.brand_name as string | null) || (firm.name as string) || "Firma";
  const hypeScore = Number(firm.hype_score ?? 0);
  const corporatenessScore = Number(firm.corporateness_score ?? 0);
  const countries = Array.isArray(firm.countries)
    ? (firm.countries as string[]).filter(Boolean)
    : [];
  const specializationFlags = SPECIALIZATION_OPTIONS.filter(({ key }) =>
    Boolean((firm as unknown as Record<string, unknown>)[key])
  ).map(({ label }) => label);

  return (
    <ShareCenterPanel
      firmId={firmId}
      firmName={safeName}
      logoUrl={(firm.logo_url as string | null) ?? null}
      hypeScore={hypeScore}
      corporatenessScore={corporatenessScore}
      visaTypes={specializationFlags}
      countries={countries}
    />
  );
}
