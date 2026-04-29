import Link from "next/link";

import { FirmBlogCoverDisplay } from "@/components/blog/firm-blog-cover-display";

export function FeedCardImage({
  imageUrl,
  alt,
  targetUrl,
}: {
  imageUrl: string | null;
  alt: string;
  targetUrl: string;
}) {
  return (
    <Link href={targetUrl} className="block min-w-0 w-full max-w-full">
      {imageUrl ? (
        <FirmBlogCoverDisplay src={imageUrl} alt={alt} />
      ) : null}
    </Link>
  );
}
