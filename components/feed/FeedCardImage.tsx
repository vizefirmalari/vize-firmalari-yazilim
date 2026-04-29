import Link from "next/link";

import { FirmBlogCoverDisplay } from "@/components/blog/firm-blog-cover-display";

export function FeedCardImage({
  imageUrl,
  alt,
  targetUrl,
  diagAkisCover,
  diagFeedImageUrl,
  diagDbCoverImageUrl,
}: {
  imageUrl: string | null;
  alt: string;
  targetUrl: string;
  diagAkisCover?: boolean;
  diagFeedImageUrl?: string | null;
  diagDbCoverImageUrl?: string | null;
}) {
  return (
    <Link href={targetUrl} className="block min-w-0 w-full max-w-full">
      {imageUrl ? (
        <FirmBlogCoverDisplay
          src={imageUrl}
          alt={alt}
          diagAkisCover={diagAkisCover}
          diagFeedImageUrl={diagFeedImageUrl ?? imageUrl}
          diagDbCoverImageUrl={diagDbCoverImageUrl ?? null}
        />
      ) : null}
    </Link>
  );
}
