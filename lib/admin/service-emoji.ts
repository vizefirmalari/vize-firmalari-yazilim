/** Hizmet vitrini açıklama alanlarında hızlı ekleme için önerilen emojiler. */
export const SERVICE_DESCRIPTION_EMOJIS = [
  "✓",
  "✅",
  "🚀",
  "💡",
  "📈",
  "📊",
  "🎯",
  "🔒",
  "🛡️",
  "⚡",
  "🌐",
  "📱",
  "💬",
  "🤖",
  "🧠",
  "📞",
  "⭐",
  "🏆",
  "💼",
  "🔧",
  "⚙️",
  "📅",
  "⏱️",
  "💰",
  "📦",
  "👥",
  "🤝",
  "📣",
  "✨",
  "🎉",
  "❓",
  "ℹ️",
  "⚠️",
  "🔥",
  "💎",
  "📝",
  "🔗",
  "📍",
  "🎁",
  "🛒",
] as const;

export function insertTextAtCursor(
  value: string,
  insertion: string,
  selectionStart: number,
  selectionEnd: number
): { next: string; cursor: number } {
  const start = Math.max(0, Math.min(selectionStart, value.length));
  const end = Math.max(start, Math.min(selectionEnd, value.length));
  const next = value.slice(0, start) + insertion + value.slice(end);
  const cursor = start + insertion.length;
  return { next, cursor };
}

/** Kamu vitrininde emoji gliflerinin düzgün render edilmesi. */
export const EMOJI_TEXT_CLASS =
  "font-[family-name:system-ui,'Segoe_UI_Emoji','Apple_Color_Emoji','Noto_Color_Emoji',sans-serif]";
