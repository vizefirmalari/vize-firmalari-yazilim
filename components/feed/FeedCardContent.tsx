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
    <div className="min-w-0 max-w-full wrap-anywhere px-3 pt-3 pb-1.5 sm:px-5 sm:pt-4 sm:pb-2">
      <Link
        href={targetUrl}
        className="line-clamp-2 text-[16px] max-md:text-[15px] max-md:leading-snug leading-[1.4] font-semibold text-[#111827] hover:underline"
      >
        {title}
      </Link>
      <p className="mt-1.5 line-clamp-2 text-[14px] text-[#4b5563] max-md:mt-1 max-md:text-[13px] max-md:leading-relaxed">
        {description}
      </p>
    </div>
  );
}

