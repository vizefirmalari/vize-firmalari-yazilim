import { formatPublishedAtDisplayTr } from "@/lib/datetime/parse-instant";

type Props = {
  iso: string;
  className?: string;
};

/** Veritabanındaki `published_at` anı; Türkiye yerel takvim/saat ile gösterilir. */
export function FeedCardRelativeTime({ iso, className }: Props) {
  return <span className={className}>{formatPublishedAtDisplayTr(iso)}</span>;
}
