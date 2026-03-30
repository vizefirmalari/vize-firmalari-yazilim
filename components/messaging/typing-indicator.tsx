"use client";

export function TypingIndicator({ text = "Yazıyor" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0B3C5D]/78 md:text-xs md:text-[#0B3C5D]/75">
      <span>{text}</span>
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        <span className="h-1 w-1 animate-[typingDot_1.2s_ease-in-out_infinite] rounded-full bg-[#0B3C5D]/45" />
        <span className="h-1 w-1 animate-[typingDot_1.2s_ease-in-out_.15s_infinite] rounded-full bg-[#0B3C5D]/45" />
        <span className="h-1 w-1 animate-[typingDot_1.2s_ease-in-out_.3s_infinite] rounded-full bg-[#0B3C5D]/45" />
      </span>
    </span>
  );
}
