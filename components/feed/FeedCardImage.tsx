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
    <Link href={targetUrl} className="flex aspect-1200/640 w-full items-center justify-center overflow-hidden bg-[#f9fafb]">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          width={1200}
          height={640}
          className="max-h-full max-w-full object-contain"
          sizes="(max-width: 768px) 100vw, 720px"
          loading="lazy"
        />
      ) : null}
    </Link>
  );
}

