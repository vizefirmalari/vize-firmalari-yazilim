"use client";

import Image from "next/image";

import { initialsFromName } from "@/lib/messaging/identity";

type Props = {
  name: string;
  imageUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-10 w-10 text-[11px]",
  md: "h-11 w-11 text-xs sm:h-12 sm:w-12 sm:text-[0.8125rem]",
  lg: "h-14 w-14 text-sm",
};

const imgSizes = {
  sm: 40,
  md: 48,
  lg: 56,
};

export function MessagingAvatar({ name, imageUrl, size = "md", className = "" }: Props) {
  const ring = "ring-1 ring-[#0B3C5D]/08";
  const base = `${sizes[size]} flex shrink-0 items-center justify-center rounded-xl bg-[#F4F6F8] font-bold text-[#0B3C5D] ${ring} ${className}`;

  if (imageUrl?.trim()) {
    return (
      <div className={`relative shrink-0 overflow-hidden rounded-xl ${ring} ${sizes[size]} ${className}`}>
        <Image
          src={imageUrl}
          alt=""
          width={imgSizes[size]}
          height={imgSizes[size]}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>
    );
  }

  return <span className={base}>{initialsFromName(name || "?")}</span>;
}
