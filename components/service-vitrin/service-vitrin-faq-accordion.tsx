"use client";

import { useState } from "react";

import type { PublicServiceStorefrontFaqRow } from "@/lib/data/service-storefront-public";

type Props = {
  items: PublicServiceStorefrontFaqRow[];
};

export function ServiceVitrinFaqAccordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <ul className="space-y-2">
      {items.map((f) => {
        const open = openId === f.id;
        return (
          <li key={f.id} className="overflow-hidden rounded-xl border border-border bg-white">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-5"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : f.id)}
            >
              <span className="text-sm font-bold text-primary sm:text-base">{f.question}</span>
              <span className="mt-0.5 shrink-0 text-lg font-bold text-primary/70" aria-hidden>
                {open ? "−" : "+"}
              </span>
            </button>
            {open ? (
              <div className="border-t border-border/70 px-4 pb-4 pt-3 text-sm leading-relaxed text-foreground/85 sm:px-5">
                {f.answer}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
