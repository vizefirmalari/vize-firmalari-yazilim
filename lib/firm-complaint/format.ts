import { formatInstantInTurkey } from "@/lib/datetime/turkey-time";

export function formatComplaintDate(iso: string): string {
  try {
    return formatInstantInTurkey(iso, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export function previewMessage(text: string, max = 120): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}
