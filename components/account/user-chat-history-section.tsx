import Link from "next/link";

import { MessagingAvatar } from "@/components/messaging/messaging-avatar";
import { DATE_TIME_OPTS_LIST_COMPACT, formatInstantInTurkey } from "@/lib/datetime/turkey-time";
import { previewFromMessage } from "@/lib/messaging/identity";
import type { UserInboxRow } from "@/lib/messaging/inbox-types";

type Props = {
  rows: UserInboxRow[];
};

function formatListTime(iso: string | null) {
  if (!iso) return "";
  try {
    return formatInstantInTurkey(iso, DATE_TIME_OPTS_LIST_COMPACT);
  } catch {
    return "";
  }
}

export function UserChatHistorySection({ rows }: Props) {
  return (
    <section className="premium-card mt-6 space-y-4 p-6 sm:mt-8 sm:p-8">
      <h2 className="text-lg font-bold text-primary sm:text-xl">Sohbet Geçmişi</h2>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-background/80 px-4 py-10 text-center">
          <p className="text-sm font-medium text-foreground/70">Henüz bir firma ile mesajlaşmadınız.</p>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-foreground/50">
            Firma ile Mesajlaş butonunu kullandığınız konuşmalar burada görünür.
          </p>
        </div>
      ) : (
        <ul className="max-h-[min(60vh,22rem)] space-y-1 overflow-y-auto overscroll-contain pr-0.5 sm:max-h-[min(65vh,26rem)]">
          {rows.map((row) => {
            const unread = row.unread_for_user > 0;
            const preview = previewFromMessage(
              row.last_kind,
              row.last_body,
              row.has_attachment
            );
            return (
              <li key={row.conversation_id}>
                <Link
                  href={`/mesajlar?c=${encodeURIComponent(row.conversation_id)}`}
                  className={`group flex w-full items-start gap-3 rounded-xl px-2 py-2.5 text-left transition sm:gap-3 sm:px-3 sm:py-3 ${
                    unread
                      ? "border border-primary/12 border-l-[3px] border-l-primary bg-primary/4 hover:bg-primary/7"
                      : "border border-transparent hover:border-border hover:bg-background"
                  }`}
                >
                  <MessagingAvatar
                    name={row.firm_name}
                    imageUrl={row.firm_logo_url}
                    size="sm"
                    className={unread ? "ring-accent/30" : ""}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`truncate text-sm ${unread ? "font-semibold text-primary" : "font-medium text-primary/90"}`}
                      >
                        {row.firm_name}
                      </span>
                      <span className="shrink-0 text-[10px] tabular-nums text-foreground/40">
                        {formatListTime(row.last_message_at)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-snug text-foreground/50">{preview}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5 self-center">
                    {unread ? (
                      <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold tabular-nums text-foreground">
                        {row.unread_for_user > 9 ? "9+" : row.unread_for_user}
                      </span>
                    ) : null}
                    <span className="rounded-lg border border-primary/15 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary transition group-hover:bg-primary/10 sm:text-xs">
                      Sohbete Dön
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
