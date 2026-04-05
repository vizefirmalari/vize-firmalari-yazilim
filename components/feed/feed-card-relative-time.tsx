"use client";

import { useEffect, useState } from "react";

import { formatRelativeTimeAgoTr } from "@/lib/datetime/parse-instant";

type Props = {
  iso: string;
  className?: string;
};

/**
 * Göreceli süre kullanıcı tarayıcısında hesaplanır; sunucu TZ / önbellek kaynaklı sapma olmaz.
 */
export function FeedCardRelativeTime({ iso, className }: Props) {
  const [label, setLabel] = useState(() => formatRelativeTimeAgoTr(iso));

  useEffect(() => {
    setLabel(formatRelativeTimeAgoTr(iso));
    const t = window.setInterval(() => {
      setLabel(formatRelativeTimeAgoTr(iso));
    }, 60_000);
    return () => window.clearInterval(t);
  }, [iso]);

  return <span className={className}>{label}</span>;
}
