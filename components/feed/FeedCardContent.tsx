import Link from "next/link";

export function FeedCardContent({
  title,
  description,
  categoryName,
  tags,
  targetUrl,
}: {
  title: string;
  description: string;
  categoryName: string | null;
  tags: string[];
  targetUrl: string;
}) {
  return (
    <div className="px-4 pb-2 pt-3.5">
      <Link href={targetUrl} className="line-clamp-2 text-[16px] leading-[1.4] font-semibold text-[#111827] hover:underline">
        {title}
      </Link>
      <p className="mt-1 line-clamp-3 text-[14px] text-[#4b5563]">{description}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {categoryName ? (
          <span className="inline-flex rounded-full bg-[#eef2ff] px-2 py-0.5 text-[12px] font-medium text-[#4f46e5]">
            {categoryName}
          </span>
        ) : null}
        {tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="inline-flex rounded-full border border-[#dbe2ea] bg-white px-2 py-0.5 text-[12px] font-medium text-[#334155]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <Link
          href={targetUrl}
          className="inline-flex items-center rounded-lg border border-[#0B3C5D]/20 bg-[#F7F9FB] px-3 py-1.5 text-xs font-semibold text-[#0B3C5D] hover:bg-[#EEF2F6]"
        >
          Yazıya git
        </Link>
      </div>
    </div>
  );
}

