import type { GuideSectionBlock } from "@/lib/country-guides/guide-content-types";

const h2Class =
  "scroll-mt-28 text-xl font-bold tracking-tight text-primary sm:text-2xl";

function Callout({
  variant,
  text,
}: {
  variant: "info" | "warning";
  text: string;
}) {
  const box =
    variant === "warning"
      ? "border-accent/35 bg-accent/10"
      : "border-primary/15 bg-primary/5";
  return (
    <div
      className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-relaxed text-foreground/85 ${box}`}
      role="note"
    >
      {text}
    </div>
  );
}

export function CountryGuideSections({ sections }: { sections: GuideSectionBlock[] }) {
  return (
    <div className="space-y-12 md:space-y-14">
      {sections.map((sec) => (
        <section key={sec.id} id={sec.id} className="scroll-mt-28">
          <h2 className={h2Class}>{sec.h2}</h2>
          {sec.lead ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-base">
              {sec.lead}
            </p>
          ) : null}
          <div className="mt-6 space-y-3">
            {sec.accordions.map((a, ai) => (
              <details
                key={`${sec.id}-acc-${ai}`}
                className="group rounded-xl border border-border bg-surface/50 px-4 py-3 open:bg-white"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-2">
                    <span>{a.title}</span>
                    <span className="shrink-0 text-primary/40 transition group-open:rotate-180">
                      ▼
                    </span>
                  </span>
                </summary>
                <div className="mt-3 border-t border-border/60 pt-3 text-sm leading-relaxed text-foreground/80">
                  {a.paragraphs.map((p, pi) => (
                    <p key={`p-${pi}`} className={pi > 0 ? "mt-3" : ""}>
                      {p}
                    </p>
                  ))}
                  {a.bullets?.length ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5">
                      {a.bullets.map((b, bi) => (
                        <li key={`b-${bi}`}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                  {a.callout ? <Callout variant={a.callout.variant} text={a.callout.text} /> : null}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
