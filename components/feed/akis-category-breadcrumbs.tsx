import Link from "next/link";

type Props = {
  categoryTitle: string;
};

export function AkisCategoryBreadcrumbs({ categoryTitle }: Props) {
  return (
    <nav aria-label="Sayfa içi gezinme" className="mb-5 text-[13px] text-[#6b7280]">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="font-medium hover:text-[#0B3C5D] hover:underline">
            Ana sayfa
          </Link>
        </li>
        <li aria-hidden className="text-[#d1d5db]">
          /
        </li>
        <li>
          <Link href="/akis" className="font-medium hover:text-[#0B3C5D] hover:underline">
            Akış
          </Link>
        </li>
        <li aria-hidden className="text-[#d1d5db]">
          /
        </li>
        <li className="line-clamp-1 font-semibold text-[#111827]">{categoryTitle}</li>
      </ol>
    </nav>
  );
}
