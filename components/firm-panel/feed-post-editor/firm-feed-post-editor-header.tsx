import Link from "next/link";
import { memo } from "react";
import type { MouseEvent } from "react";

type Props = {
  backHref: string;
  onBackNavigation?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export const FirmFeedPostEditorHeader = memo(function FirmFeedPostEditorHeader({
  backHref,
  onBackNavigation,
}: Props) {
  return (
    <header className="shrink-0 border-b border-[#0B3C5D]/10 pb-5">
      <Link
        href={backHref}
        onClick={onBackNavigation}
        className="inline-flex min-h-9 items-center rounded-lg border border-[#0B3C5D]/14 px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] transition hover:bg-[#F7F9FB]"
      >
        ← Paylaşıma dön
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#0B3C5D]">Gönderi oluştur</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/68">
        Kısa duyuru, güncelleme veya görselli akış gönderisi hazırlayın. Yalnızca yayınlandığında akışta görünür; hype
        katkısı (+25) gönderi başına bir kez uygulanır. İsterseniz önce taslak kaydedin.
      </p>
    </header>
  );
});
