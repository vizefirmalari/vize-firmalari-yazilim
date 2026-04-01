import Link from "next/link";

export function FeedCardContent({
  title,
  description,
  targetUrl,
}: {
  title: string;
  description: string;
  targetUrl: string;
}) {
  return (
    <div className="px-4 pb-2 pt-4 sm:px-5">
      <Link href={targetUrl} className="line-clamp-2 text-[16px] leading-[1.4] font-semibold text-[#111827] hover:underline">
        {title}
      </Link>
      <p className="mt-1.5 line-clamp-2 text-[14px] text-[#4b5563]">{description}</p>
    </div>
  );
}

