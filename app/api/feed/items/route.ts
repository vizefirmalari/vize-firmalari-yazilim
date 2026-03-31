import { NextResponse } from "next/server";
import { getFeedItemsPage } from "@/lib/data/feed";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const offset = Number(url.searchParams.get("offset") || "0");
  const limit = Math.min(12, Math.max(3, Number(url.searchParams.get("limit") || "9")));
  const data = await getFeedItemsPage(offset, limit, {
    category: url.searchParams.get("category") || undefined,
    country: url.searchParams.get("country") || undefined,
    visaType: url.searchParams.get("visaType") || undefined,
    type: (url.searchParams.get("type") as "blog" | "all" | null) ?? undefined,
    premium: url.searchParams.get("premium") === "true",
    search: url.searchParams.get("search") || undefined,
    sort: (url.searchParams.get("sort") as "smart" | "new" | "trending" | "top" | null) ?? undefined,
  });
  return NextResponse.json(data);
}

