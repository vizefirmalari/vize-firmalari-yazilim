"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type Props = {
  urls: readonly string[];
  /** Tüm görseller kırıldığında */
  gradientClassName: string;
  sizes: string;
  imageClassName?: string;
};

/**
 * Sırayla Unsplash URL’leri dener; hepsi başarısızsa kontrollü gradient gösterir.
 */
export function DestinationEditorialImage({
  urls,
  gradientClassName,
  sizes,
  imageClassName = "object-cover object-center scale-[1.03] transition-transform duration-300 group-hover:scale-[1.06]",
}: Props) {
  const [index, setIndex] = useState(0);

  const onError = useCallback(() => {
    setIndex((i) => i + 1);
  }, []);

  const src = urls[index];

  if (!src) {
    return (
      <div
        className={`absolute inset-0 ${gradientClassName}`}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={sizes}
      className={imageClassName}
      onError={onError}
    />
  );
}
