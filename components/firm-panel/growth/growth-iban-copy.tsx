"use client";

import { useState } from "react";

type Props = { iban: string };

export function GrowthIbanCopy({ iban }: Props) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(iban.replace(/\s/g, ""));
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      setDone(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-2 text-xs font-semibold text-[#0B3C5D] underline-offset-2 hover:underline"
    >
      {done ? "Kopyalandı" : "IBAN’ı kopyala"}
    </button>
  );
}
