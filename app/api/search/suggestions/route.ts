import { NextResponse, type NextRequest } from "next/server";

import { buildSearchSuggestionsPayload } from "@/lib/search/site-search";

export async function GET(req: NextRequest) {
  const qRaw = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (qRaw.length < 2) {
    return NextResponse.json({
      ok: true,
      query: qRaw,
      groups: [],
      footerHref: qRaw ? `/arama?q=${encodeURIComponent(qRaw)}` : "/arama",
      narrow: true,
    });
  }

  try {
    const payload = await buildSearchSuggestionsPayload(qRaw);
    return NextResponse.json({ ok: true, ...payload });
  } catch (e) {
    console.error("[api/search/suggestions]", e);
    return NextResponse.json(
      {
        ok: false,
        query: qRaw,
        groups: [],
        footerHref: `/arama?q=${encodeURIComponent(qRaw)}`,
        narrow: true,
      },
      { status: 500 }
    );
  }
}
