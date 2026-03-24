import { notFound } from "next/navigation";
import Link from "next/link";
import { FirmSectionsForm } from "@/components/admin/firm-sections-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { getFirmForAdmin } from "@/lib/data/admin-firm-detail";

export const metadata = {
  title: "Firma sayfa içeriği",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function FirmSectionsAdminPage({ params }: PageProps) {
  const { id } = await params;
  const detail = await getFirmForAdmin(id);
  if (!detail) notFound();

  const slug = String(detail.firm.slug ?? "");

  let initial: {
    section_key: string;
    title: string | null;
    body: string | null;
    extra: Record<string, unknown> | null;
    sort_order: number | null;
    is_visible: boolean | null;
  }[] = [];

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data } = await supabase
        .from("firm_content_sections")
        .select("*")
        .eq("firm_id", id);
      initial = (data ?? []) as typeof initial;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B3C5D]">
            Sayfa içeriği
          </h1>
          <p className="mt-1 text-sm text-[#1A1A1A]/60">
            {String(detail.firm.name ?? "")} — bölüm görünürlüğü ve metinler.
          </p>
        </div>
        <Link
          href={`/admin/firms/${id}/edit`}
          className="text-sm font-semibold text-[#328CC1] hover:underline"
        >
          ← Firmaya dön
        </Link>
      </div>

      <FirmSectionsForm firmId={id} firmSlug={slug} initial={initial} />
    </div>
  );
}
