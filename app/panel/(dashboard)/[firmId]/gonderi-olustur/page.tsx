import { FirmFeedPostEditor } from "@/components/firm-panel/feed-post-editor/firm-feed-post-editor";
import type { FirmFeedPostInitialDraft } from "@/components/firm-panel/feed-post-editor/types";
import { requireFirmPanelAccess } from "@/lib/auth/firm-panel";
import { resolveFeedPostCtaButtons } from "@/lib/data/feed-post-cta-buttons";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ firmId: string }>;
  searchParams: Promise<{ taslak?: string }>;
};

function parseImageUrls(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((u): u is string => typeof u === "string" && u.trim().length > 0).map((u) => u.trim());
}

export default async function FirmFeedPostCreatePage({ params, searchParams }: PageProps) {
  const { firmId } = await params;
  await requireFirmPanelAccess(firmId);

  const sp = await searchParams;
  const draftId = typeof sp.taslak === "string" ? sp.taslak.trim() : "";

  let initialDraft: FirmFeedPostInitialDraft | null = null;
  if (draftId) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data } = await supabase
        .from("firm_feed_posts")
        .select("id,body,image_urls,cta_buttons,link_url,link_label,tags,status")
        .eq("id", draftId)
        .eq("firm_id", firmId)
        .maybeSingle();
      if (data && String(data.status) === "draft") {
        initialDraft = {
          id: String(data.id),
          body: String(data.body ?? ""),
          imageUrls: parseImageUrls(data.image_urls),
          ctaButtons: resolveFeedPostCtaButtons(data.cta_buttons, data.link_url, data.link_label),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        };
      }
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <FirmFeedPostEditor firmId={firmId} initialDraft={initialDraft} />
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Gönderi oluştur",
    description: "Akış gönderisi oluşturun veya taslak kaydedin.",
    robots: { index: false, follow: false },
  };
}
