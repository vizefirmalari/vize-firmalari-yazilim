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
      className="relative w-full overflow-hidden rounded-2xl bg-[#f9fafb]"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          width={1200}
          height={630}
          className="block h-auto w-full max-w-full object-contain"
          sizes="(max-width: 768px) 100vw, 720px"
          loading="lazy"
        />
      ) : null}
    </Link>
  );
}

