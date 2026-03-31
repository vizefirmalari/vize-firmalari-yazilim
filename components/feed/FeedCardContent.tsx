import Link from "next/link";

export function FeedCardContent({
  title,
  description,
  categoryName,
  targetUrl,
  postId,
}: {
  title: string;
  description: string;
  categoryName: string | null;
  targetUrl: string;
  postId: string;
}) {
  const clickHref = `/api/feed/click?postId=${postId}&target=${encodeURIComponent(targetUrl)}`;
  return (
    <div className="px-4 pb-2 pt-3.5">
      <Link href={clickHref} className="line-clamp-2 text-[16px] leading-[1.4] font-semibold text-[#111827] hover:underline">
        {title}
      </Link>
      <p className="mt-1 line-clamp-3 text-[14px] text-[#4b5563]">{description}</p>
      {categoryName ? (
        <span className="mt-2 inline-flex rounded-full bg-[#eef2ff] px-2 py-0.5 text-[12px] font-medium text-[#4f46e5]">
          {categoryName}
        </span>
      ) : null}
    </div>
  );
}

