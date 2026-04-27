"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

type CopyEmailsButtonProps = {
  emails: string[];
  mode: "comma" | "lines";
  label: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

function fallbackCopy(text: string): boolean {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function CopyEmailsButton({ emails, mode, label }: CopyEmailsButtonProps) {
  const [isCopying, setIsCopying] = useState(false);

  const normalized = useMemo(() => {
    const unique = new Set<string>();
    for (const email of emails) {
      const value = email.trim().toLowerCase();
      if (!value) continue;
      if (!isValidEmail(value)) continue;
      unique.add(value);
    }
    return [...unique];
  }, [emails]);

  async function onCopy() {
    if (normalized.length === 0) {
      toast.error("Kopyalanacak mail adresi bulunamadı.");
      return;
    }

    const payload = mode === "lines" ? normalized.join("\n") : normalized.join(", ");

    setIsCopying(true);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(payload);
      } else {
        const success = fallbackCopy(payload);
        if (!success) throw new Error("fallback-copy-failed");
      }
      toast.success("Mail adresleri kopyalandı.");
    } catch {
      const success = fallbackCopy(payload);
      if (success) {
        toast.success("Mail adresleri kopyalandı.");
      } else {
        toast.error("Kopyalama sırasında bir hata oluştu.");
      }
    } finally {
      setIsCopying(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onCopy()}
      disabled={isCopying}
      className="rounded-xl border border-[#0B3C5D]/15 bg-white px-3 py-2 text-sm font-semibold text-[#0B3C5D] transition hover:bg-[#eef2f6] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isCopying ? "Kopyalanıyor..." : label}
    </button>
  );
}
