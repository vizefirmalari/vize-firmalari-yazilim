/**
 * Operasyon evrakları: video yok; meşru belge/evrak MIME + boyut üst limiti (bucket 25MB).
 */

const MAX_BYTES = 24 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
  "application/x-zip-compressed",
  "text/plain",
  "text/csv",
  "image/png",
  "image/jpeg",
]);

const BLOCKED_EXT = new Set([
  ".mp4",
  ".mov",
  ".webm",
  ".mkv",
  ".exe",
]);

export type VisaDocValidationResult = { ok: true } | { ok: false; reason: string };

function extensionOf(fileName: string): string {
  const i = fileName.lastIndexOf(".");
  if (i < 0) return "";
  return fileName.slice(i).toLowerCase();
}

export function validateVisaCaseDocumentUpload(file: File): VisaDocValidationResult {
  if (BLOCKED_EXT.has(extensionOf(file.name))) {
    return { ok: false, reason: "Bu dosya uzantısı güvenlik nedeniyle yüklenemez." };
  }
  if (file.size <= 0) {
    return { ok: false, reason: "Boş dosya yüklenemez." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, reason: "Dosya boyutu 24 MB sınırını aşıyor." };
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return { ok: false, reason: "Desteklenmeyen dosya türü." };
  }
  return { ok: true };
}
