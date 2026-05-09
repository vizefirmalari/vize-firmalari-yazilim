import type { Metadata } from "next";

import { MobileAiAssistant } from "@/components/ai-assistant/mobile-ai-assistant";
import { SiteHeader } from "@/components/layout/site-header";

/**
 * Akıllı Asistan ekranı.
 *
 * Mimari kararlar:
 *  - Sayfa içeriği client component (sohbet state); sayfa kabuğu server.
 *  - SiteHeader — diğer sayfalarla birebir aynı (logo + arama + drawer / desktop cluster).
 *  - SiteFooter bilinçli olarak render edilmez: sohbet ekranında alt fixed input
 *    bottom nav üstünde kalır; klasik footer çakışırdı.
 *  - SEO: AI ekranı kullanıcıya özel araç olduğundan indekslenmiyor.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Akıllı Asistan",
  description:
    "Vize, göç, eğitim ve yurtdışı süreçleri hakkında resmi kaynaklara dayalı, gerçek firma eşleşmeli akıllı araştırma asistanı.",
  robots: { index: false, follow: false },
};

export default function AiAssistantPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <MobileAiAssistant />
      </main>
    </>
  );
}
