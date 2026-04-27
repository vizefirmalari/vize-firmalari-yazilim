import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export type FirmContactAnalysisRow = {
  id: string;
  name: string;
  slug: string;
  corporateness_score: number;
  website: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  status: string | null;
  updated_at: string | null;
};

export type FirmContactAnalysisFilter = "all" | "yes" | "no";
export type FirmContactAnalysisStatusFilter = "all" | "published" | "draft" | "inactive";
export type FirmContactAnalysisSort = "updated_desc" | "name_asc" | "score_desc";

export type FirmContactAnalysisQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  emailFilter?: FirmContactAnalysisFilter;
  websiteFilter?: FirmContactAnalysisFilter;
  statusFilter?: FirmContactAnalysisStatusFilter;
  sort?: FirmContactAnalysisSort;
};

export type FirmContactAnalysisResult = {
  rows: FirmContactAnalysisRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function normalizeText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeScore(value: unknown): number {
  const score = typeof value === "number" ? value : Number(value);
  return Number.isFinite(score) ? score : 0;
}

export async function getFirmContactAnalysis(
  input: FirmContactAnalysisQuery = {}
): Promise<FirmContactAnalysisResult> {
  if (!isSupabaseConfigured()) {
    return {
      rows: [],
      totalCount: 0,
      page: 1,
      pageSize: 100,
      totalPages: 1,
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      rows: [],
      totalCount: 0,
      page: 1,
      pageSize: 100,
      totalPages: 1,
    };
  }

  const pageSize = Math.max(1, Math.min(100, Number(input.pageSize ?? 100) || 100));
  const page = Math.max(1, Number(input.page ?? 1) || 1);
  const emailFilter = input.emailFilter ?? "all";
  const websiteFilter = input.websiteFilter ?? "all";
  const statusFilter = input.statusFilter ?? "all";
  const sort = input.sort ?? "updated_desc";

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("firms")
    .select(
      "id,name,slug,corporateness_score,website,email,phone,whatsapp,status,updated_at",
      { count: "exact" }
    );

  if (input.search?.trim()) {
    const term = `%${input.search.trim()}%`;
    query = query.or(`name.ilike.${term},slug.ilike.${term}`);
  }
  if (emailFilter === "yes") query = query.not("email", "is", null).neq("email", "");
  if (emailFilter === "no") query = query.or("email.is.null,email.eq.");
  if (websiteFilter === "yes") query = query.not("website", "is", null).neq("website", "");
  if (websiteFilter === "no") query = query.or("website.is.null,website.eq.");
  if (statusFilter !== "all") query = query.eq("status", statusFilter);

  if (sort === "name_asc") {
    query = query.order("name", { ascending: true });
  } else if (sort === "score_desc") {
    query = query.order("corporateness_score", { ascending: false });
  } else {
    query = query.order("updated_at", { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("[getFirmContactAnalysis]", error.message);
    return {
      rows: [],
      totalCount: 0,
      page,
      pageSize,
      totalPages: 1,
    };
  }

  const rows: FirmContactAnalysisRow[] = (data ?? []).map((row) => ({
    id: String(row.id ?? ""),
    name: String(row.name ?? ""),
    slug: String(row.slug ?? ""),
    corporateness_score: normalizeScore(row.corporateness_score),
    website: normalizeText(row.website),
    email: normalizeText(row.email),
    phone: normalizeText(row.phone),
    whatsapp: normalizeText(row.whatsapp),
    status: normalizeText(row.status),
    updated_at: normalizeText(row.updated_at),
  }));

  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return {
    rows,
    totalCount,
    page: Math.min(page, totalPages),
    pageSize,
    totalPages,
  };
}
