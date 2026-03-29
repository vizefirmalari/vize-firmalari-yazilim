import type { FirmPanelAnnouncement } from "@/lib/data/firm-panel-announcements";

type Props = { announcements: FirmPanelAnnouncement[] };

/**
 * Platform duyuruları — tüm firma panellerinde üst bant.
 */
export function FirmPanelAnnouncementsStrip({ announcements }: Props) {
  if (announcements.length === 0) return null;

  return (
    <div className="space-y-3 border-b border-[#1A1A1A]/8 bg-[#0B3C5D]/5 px-4 py-4 sm:px-6 lg:px-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3C5D]/70">
        Platform duyuruları
      </p>
      <ul className="space-y-3">
        {announcements.map((a) => (
          <li
            key={a.id}
            className="rounded-xl border border-[#1A1A1A]/10 bg-white px-4 py-3 shadow-sm"
          >
            <p className="text-sm font-semibold text-[#0B3C5D]">{a.title}</p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-[#1A1A1A]/70">
              {a.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
