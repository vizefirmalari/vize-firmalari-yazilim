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
  sm: "h-9 w-9 text-[11px]",
  md: "h-11 w-11 text-xs",
  lg: "h-14 w-14 text-sm",
};

const imgSizes = {
  sm: 36,
  md: 44,
  lg: 56,
};

export function MessagingAvatar({ name, imageUrl, size = "md", className = "" }: Props) {
  const ring = "ring-1 ring-[#0B3C5D]/10";
  const base = `${sizes[size]} flex shrink-0 items-center justify-center rounded-xl bg-[#F7F9FB] font-bold text-[#0B3C5D] ${ring} ${className}`;

  if (imageUrl?.trim()) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${ring} ${sizes[size]} ${className}`}>
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
