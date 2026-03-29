/**
 * Sohbet ekleri: 5 MB üstü, video MIME/uzantı ve izin listesi dışı reddedilir.
 * Sunucu tarafında da tekrar doğrulayın (istemci atlanabilir).
 */

const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

/** Küçük harf uzantı */
const BLOCKED_EXT = new Set([
  ".mp4",
  ".mov",
  ".webm",
  ".mkv",
  ".avi",
  ".m4v",
  ".mpeg",
  ".mpg",
]);

export type AttachmentValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

function extensionOf(fileName: string): string {
  const i = fileName.lastIndexOf(".");
  if (i < 0) return "";
  return fileName.slice(i).toLowerCase();
}

/**
 * File veya Blob + dosya adı ile doğrular.
 */
export function validateChatAttachment(
  file: Pick<File, "name" | "size" | "type">
): AttachmentValidationResult {
  if (file.size <= 0) {
    return { ok: false, reason: "Dosya boş." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, reason: "Dosya en fazla 5 MB olabilir." };
  }

  const ext = extensionOf(file.name);
  if (BLOCKED_EXT.has(ext)) {
    return { ok: false, reason: "Video dosyaları gönderilemez." };
  }

  const mime = file.type.toLowerCase();
  if (mime.startsWith("video/")) {
    return { ok: false, reason: "Video dosyaları gönderilemez." };
  }

  if (!ALLOWED_MIME.has(mime)) {
    return {
      ok: false,
      reason: "Bu dosya türü desteklenmiyor (pdf, office, metin, csv, png, jpg, webp).",
    };
  }

  return { ok: true };
}

export const CHAT_ATTACHMENT_MAX_BYTES = MAX_BYTES;
