import { NextResponse, type NextRequest } from "next/server";

import { canonicalizeSearchQueryForSeo } from "@/lib/search/search-synonyms";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

type Body =
  | {
      type: "click";
      query: string;
      result_type: "firm" | "blog" | "category";
      result_id?: string | null;
      result_slug?: string | null;
      source: "header_suggestion" | "search_page";
      user_session?: string | null;
      referrer?: string | null;
    }
  | {
      type: "impression";
      query: string;
      source: "search_page" | "header_suggestion";
      user_session?: string | null;
      firm_page?: number;
      blog_page?: number;
      /** Arama sonuçları sayımı — 0 dahil boş sonuç analitiği */
      result_total?: number | null;
    };

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const service = createSupabaseServiceRoleClient();
  if (!service) {
    return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 });
  }

  const qCanon = canonicalizeSearchQueryForSeo(String(body.query ?? ""));
  if (!body.type || qCanon.length < 2 || qCanon.length > 200) {
    return NextResponse.json({ ok: false, error: "invalid_query" }, { status: 400 });
  }

  if (body.type === "impression") {
    const fp = typeof body.firm_page === "number" && body.firm_page >= 1 ? Math.floor(body.firm_page) : 1;
    const bp = typeof body.blog_page === "number" && body.blog_page >= 1 ? Math.floor(body.blog_page) : 1;
    type ImpressionInsert = {
      query_normalized: string;
      source: string;
      user_session: string | null;
      firm_page: number;
      blog_page: number;
      result_total?: number | null;
    };

    const impressionRow: ImpressionInsert = {
      query_normalized: qCanon,
      source: body.source ?? "search_page",
      user_session: body.user_session ?? null,
      firm_page: Math.min(fp, 500),
      blog_page: Math.min(bp, 500),
    };

    if (typeof body.result_total === "number" && Number.isFinite(body.result_total)) {
      impressionRow.result_total = Math.min(Math.max(0, Math.floor(body.result_total)), 50_000);
    } else if (body.result_total === null) {
      impressionRow.result_total = null;
    }

    const { error } = await service.from("search_query_impressions").insert(impressionRow);
    if (error) {
      console.error("[search/event-impression]", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  if (body.type !== "click") {
    return NextResponse.json({ ok: false, error: "invalid_type" }, { status: 400 });
  }

  if (!body.result_type || !["firm", "blog", "category"].includes(body.result_type)) {
    return NextResponse.json({ ok: false, error: "invalid_result_type" }, { status: 400 });
  }
  if (!body.source || !["header_suggestion", "search_page"].includes(body.source)) {
    return NextResponse.json({ ok: false, error: "invalid_source" }, { status: 400 });
  }

  const { error } = await service.from("search_click_events").insert({
    query: qCanon,
    result_type: body.result_type,
    result_id: body.result_id ?? null,
    result_slug: body.result_slug ?? null,
    source: body.source,
    user_session: body.user_session ?? null,
    referrer: body.referrer ?? null,
  });
  if (error) {
    console.error("[search/event-click]", error.message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
