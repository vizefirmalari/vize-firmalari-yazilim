/**
 * Mesajlaşma başlıkları ve avatar fallback’leri — mevcut renk paletine uyumlu.
 */

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

export function displayNameFromEmail(email: string | null | undefined): string {
  if (!email?.trim()) return "Kullanıcı";
  const local = email.split("@")[0]?.trim();
  return local || "Kullanıcı";
}

export function resolveUserDisplayName(
  displayName: string | null | undefined,
  email: string | null | undefined
): string {
  const d = displayName?.trim();
  if (d) return d;
  return displayNameFromEmail(email ?? null);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function previewFromMessage(
  kind: string | null | undefined,
  body: string | null | undefined,
  hasAttachment?: boolean
): string {
  if (kind === "attachment" || hasAttachment) {
    return body?.trim() ? `Ek · ${body.trim()}` : "Dosya eki";
  }
  if (kind === "system") {
    return body?.trim() || "Sistem";
  }
  const t = body?.trim();
  if (!t) return "Mesaj";
  return t.length > 72 ? `${t.slice(0, 72)}…` : t;
}
