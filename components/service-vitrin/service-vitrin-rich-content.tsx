import { EMOJI_TEXT_CLASS } from "@/lib/admin/service-emoji";

const DIVIDER_RE = /^[━─═\-_]{3,}\s*$/;
const BULLET_RE = /^(\s*[-•*✓✔✅☑️]|\s*\d+[\.)])\s+/;

function isHighlightLine(line: string): boolean {
  const t = line.trim();
  return /^[✅✔☑️📞📱💡🎯⚡🔒🚀]/.test(t) || (t.length > 0 && t.length < 120 && /[✅✔]/.test(t));
}

type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "highlight"; text: string };

function parseBlocks(raw: string): Block[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let listBuf: string[] = [];
  let paraBuf: string[] = [];

  const flushPara = () => {
    const text = paraBuf.join("\n").trim();
    if (text) blocks.push({ type: "p", text });
    paraBuf = [];
  };
  const flushList = () => {
    if (listBuf.length) blocks.push({ type: "ul", items: [...listBuf] });
    listBuf = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      flushPara();
      continue;
    }
    if (DIVIDER_RE.test(trimmed)) {
      flushList();
      flushPara();
      continue;
    }
    if (BULLET_RE.test(trimmed)) {
      flushPara();
      listBuf.push(trimmed.replace(BULLET_RE, "").trim());
      continue;
    }
    if (isHighlightLine(trimmed)) {
      flushList();
      flushPara();
      blocks.push({ type: "highlight", text: trimmed });
      continue;
    }
    flushList();
    paraBuf.push(trimmed);
  }
  flushList();
  flushPara();
  return blocks;
}

type Props = {
  text: string;
  className?: string;
};

export function ServiceVitrinRichContent({ text, className = "" }: Props) {
  const blocks = parseBlocks(text);
  if (!blocks.length) return null;

  return (
    <div className={`space-y-5 ${EMOJI_TEXT_CLASS} ${className}`}>
      {blocks.map((b, i) => {
        if (b.type === "p") {
          return (
            <p key={i} className="text-sm leading-relaxed text-foreground/88 sm:text-[15px] sm:leading-7">
              {b.text}
            </p>
          );
        }
        if (b.type === "highlight") {
          return (
            <div
              key={i}
              className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm font-semibold leading-relaxed text-primary sm:text-[15px]"
            >
              {b.text}
            </div>
          );
        }
        return (
          <ul key={i} className="space-y-2.5">
            {b.items.map((item, j) => (
              <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-foreground/88 sm:text-[15px]">
                <span className="mt-0.5 shrink-0 font-bold text-secondary" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

/** Süreç metninden numaralı adımlar çıkarır; yoksa null. */
export function parseProcessTimeline(text: string): { step: string; title: string }[] | null {
  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const steps: { step: string; title: string }[] = [];
  for (const line of lines) {
    const m = line.match(/^(\d+)[\.)]\s*(.+)$/);
    if (m) steps.push({ step: m[1], title: m[2].trim() });
  }
  return steps.length >= 2 ? steps : null;
}
