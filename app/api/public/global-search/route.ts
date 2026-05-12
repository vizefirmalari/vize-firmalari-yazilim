import { NextResponse, type NextRequest } from "next/server";

import { computeGlobalSearchPayload } from "@/lib/search/global-search-response";
import { getPublicFilterCountries, getPublicFilterServiceTypes } from "@/lib/data/public-cms";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/env";
import { normalizeFirmRow } from "@/lib/data/firms";
import { attachFirmCustomSpecializations } from "@/lib/data/specialization-taxonomy";
import type { FirmRow } from "@/lib/types/firm";

const FIRM_SEARCH_SELECT =
  "id,name,slug,short_description,brand_name,countries,main_services,services,sub_services,visa_regions,schengen_expert,usa_visa_expert,student_visa_support,work_visa_support,tourist_visa_support,business_visa_support,family_reunion_support,appeal_support";

function parseHiddenParams(sp: URLSearchParams): Record<string, string> {
  const skip = new Set(["q"]);
  const out: Record<string, string> = {};
  sp.forEach((value, key) => {
    if (skip.has(key)) return;
    if (value) out[key] = value;
  });
  return out;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const qRaw = url.searchParams.get("q")?.trim() ?? "";
  const hidden = parseHiddenParams(url.searchParams);

  if (qRaw.length < 2) {
    return NextResponse.json({ ok: true, query: qRaw, narrow: false, groups: [] });
  }

  const [countries, serviceTypes] = await Promise.all([
    getPublicFilterCountries(),
    getPublicFilterServiceTypes(),
  ]);

  let firms: Pick<
    FirmRow,
    | "id"
    | "name"
    | "slug"
    | "short_description"
    | "brand_name"
    | "countries"
    | "main_services"
    | "services"
    | "sub_services"
    | "visa_regions"
    | "schengen_expert"
    | "usa_visa_expert"
    | "student_visa_support"
    | "work_visa_support"
    | "tourist_visa_support"
    | "business_visa_support"
    | "family_reunion_support"
    | "appeal_support"
    | "custom_specializations"
  >[] = [];

  if (isSupabaseConfigured()) {
    const supabase = createSupabasePublicClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("firms")
        .select(FIRM_SEARCH_SELECT)
        .eq("status", "published")
        .order("hype_score", { ascending: false })
        .limit(650);

      if (error) {
        console.error("[global-search]", error.message);
      } else {
        firms = (data ?? []).map((row) => {
          const r = normalizeFirmRow(row as Record<string, unknown>);
          return {
            id: r.id,
            name: r.name,
            slug: r.slug,
            short_description: r.short_description ?? null,
            brand_name: r.brand_name ?? null,
            countries: r.countries ?? [],
            main_services: r.main_services ?? [],
            services: r.services ?? [],
            sub_services: r.sub_services ?? [],
            visa_regions: r.visa_regions ?? [],
            schengen_expert: r.schengen_expert ?? null,
            usa_visa_expert: r.usa_visa_expert ?? null,
            student_visa_support: r.student_visa_support ?? null,
            work_visa_support: r.work_visa_support ?? null,
            tourist_visa_support: r.tourist_visa_support ?? null,
            business_visa_support: r.business_visa_support ?? null,
            family_reunion_support: r.family_reunion_support ?? null,
            appeal_support: r.appeal_support ?? null,
            custom_specializations: r.custom_specializations ?? [],
          };
        });
        if (firms.length > 0) {
          const enriched = await attachFirmCustomSpecializations(
            supabase,
            firms as unknown as FirmRow[]
          );
          firms = enriched.map((r) => ({
            id: r.id,
            name: r.name,
            slug: r.slug,
            short_description: r.short_description ?? null,
            brand_name: r.brand_name ?? null,
            countries: r.countries ?? [],
            main_services: r.main_services ?? [],
            services: r.services ?? [],
            sub_services: r.sub_services ?? [],
            visa_regions: r.visa_regions ?? [],
            schengen_expert: r.schengen_expert ?? null,
            usa_visa_expert: r.usa_visa_expert ?? null,
            student_visa_support: r.student_visa_support ?? null,
            work_visa_support: r.work_visa_support ?? null,
            tourist_visa_support: r.tourist_visa_support ?? null,
            business_visa_support: r.business_visa_support ?? null,
            family_reunion_support: r.family_reunion_support ?? null,
            appeal_support: r.appeal_support ?? null,
            custom_specializations: r.custom_specializations ?? [],
          }));
        }
      }
    }
  }

  const payload = computeGlobalSearchPayload(qRaw, hidden, {
    countries,
    serviceTypes,
    firms,
  });

  const substantive = payload.groups.filter((g) => g.id !== "quick");
  const narrow = !substantive.some((g) => g.items.length > 0);

  return NextResponse.json({
    ok: true,
    query: payload.query,
    groups: payload.groups,
    narrow,
  });
}
