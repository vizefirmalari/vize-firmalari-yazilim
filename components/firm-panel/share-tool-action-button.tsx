"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { recordFirmPanelShareAction } from "@/lib/actions/firm-panel-share";

type Props = {
  firmId: string;
  tool: "campaign" | "video";
  actionLabel: string;
  disabled?: boolean;
};

export function ShareToolActionButton({ firmId, tool, actionLabel, disabled = false }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = () => {
    if (disabled) return;
    setMessage(null);
    startTransition(async () => {
      const titleByTool: Record<Props["tool"], string> = {
        campaign: "Panelden kampanya paylaşımı",
        video: "Panelden video paylaşımı",
      };
      const res = await recordFirmPanelShareAction({
        firmId,
        tool,
        title: titleByTool[tool],
      });
      if (!res.ok) {
        setMessage("Paylaşım kaydedilemedi. Lütfen tekrar deneyin.");
        return;
      }
      setMessage(`Paylaşım kaydedildi. Güncel Hype: ${res.newHypeScore}`);
      router.refresh();
    });
  };

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        disabled={disabled || isPending}
        onClick={handleClick}
        className={`inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${
          disabled
            ? "border border-[#1A1A1A]/15 bg-[#EEF1F4] text-[#1A1A1A]/55"
            : "bg-[#0B3C5D] text-white hover:bg-[#0A3552]"
        }`}
      >
        {isPending ? "Kaydediliyor..." : actionLabel}
      </button>
      {message ? <p className="text-[11px] text-[#0B3C5D]/75">{message}</p> : null}
    </div>
  );
}
