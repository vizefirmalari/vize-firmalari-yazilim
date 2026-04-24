import Image from "next/image";
import Link from "next/link";

export function FeedCardImage({
  imageUrl,
  alt,
  targetUrl,
  postId,
}: {
  imageUrl: string | null;
  alt: string;
  targetUrl: string;
  postId: string;
}) {
  return (
    <Link
      href={targetUrl}
      className="flex w-full min-w-0 max-w-full items-center justify-center overflow-hidden bg-[#f9fafb] aspect-1200/640 max-md:max-h-52 max-md:aspect-auto max-md:min-h-0"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          width={1200}
          height={640}
          className="h-auto max-h-full max-w-full w-full min-h-0 object-contain"
          sizes="(max-width: 768px) 100vw, 720px"
          loading="lazy"
        />
      ) : null}
    </Link>
  );
}

