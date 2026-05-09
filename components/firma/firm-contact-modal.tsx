"use client";

import Image from "next/image";
import { useEffect, useId, useState, type MouseEvent } from "react";
import { toast } from "sonner";
import {
  MdContentCopy,
  MdOutlineLanguage,
  MdOutlinePhone,
} from "react-icons/md";
import {
  SiFacebook,
  SiGmail,
  SiGooglemaps,
  SiInstagram,
  SiTelegram,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from "react-icons/si";

import type { FirmRow } from "@/lib/types/firm";
import { buildWhatsappWaMeUrl, parseWhatsappDigitsForWaMe } from "@/lib/contact/whatsapp-wa-me";
import { effectiveFirmCategoryLabel } from "@/lib/firma/listing-filter-options";
import {
  firmShouldShowGoogleRatingOnPublicCard,
  parseFiniteGoogleRating,
} from "@/lib/firms/google-profile-public";
import { GooglePublicRatingRow } from "@/components/home/google-public-rating-row";
import { FirmMessageChatButton } from "@/components/firma/firm-message-chat-button";
import { FirmNameBadges } from "@/components/firms/FirmNameBadges";
import { ScoreInfoButton } from "@/components/home/score-info-button";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";

const CORP_INFO =
  "Firmanın platform üzerindeki kurumsal bilgi, belge ve profil bütünlüğüne göre oluşturulan değerlendirme puanıdır.";

export type FirmContactModalProps = {
  firm: FirmRow;
  open: boolean;
  onClose: () => void;
  /** `messaging_enabled` ve aktif panel üyeliği birlikte true ise modal altında mesajlaşma CTA gösterilir. */
  messagingActive?: boolean;
};

type DedupeBucket = "phone" | "email" | "whatsapp" | "url" | "text";

function normalizeWhitespace(s: string): string {
  return s.trim().replace(/\s+/g, " ");
}

function dedupeKey(bucket: DedupeBucket, raw: string, href: string | null): string {
  const t = normalizeWhitespace(raw);
  if (!t && bucket !== "url") return "";
  switch (bucket) {
    case "phone": {
      const d = t.replace(/\D/g, "");
      return d ? `p:${d}` : "";
    }
    case "email":
      return t ? `e:${t.toLowerCase()}` : "";
    case "whatsapp": {
      const digits = parseWhatsappDigitsForWaMe(t);
      if (digits) return `w:${digits}`;
      if (/^https?:\/\//i.test(t)) return `u:${normalizeUrlKey(t)}`;
      const d = t.replace(/\D/g, "");
      return d ? `w:${d}` : `w:${t.toLowerCase()}`;
    }
    case "url": {
      const source = href?.trim() || t;
      return source ? `u:${normalizeUrlKey(source)}` : "";
    }
    case "text":
      return t ? `t:${t.toLowerCase()}` : "";
    default:
      return "";
  }
}

function normalizeUrlKey(raw: string): string {
  let s = raw.trim().toLowerCase();
  s = s.replace(/^https?:\/\//, "");
  s = s.replace(/^www\./, "");
  s = s.replace(/\/+$/, "");
  return s;
}

function websiteHref(raw: string): string {
  const t = raw.trim();
  if (!t) return "#";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function safeExternalHref(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  if (/^\/\//.test(t)) return `https:${t}`;
  return `https://${t}`;
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

type RowIcon =
  | "phone"
  | "whatsapp"
  | "mail"
  | "globe"
  | "instagram"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "telegram"
  | "google_maps"
  | "map"
  | "clock"
  | "user"
  | "briefcase";

const ICON_BOX = "h-[18px] w-[18px] shrink-0";

/** LinkedIn — Simple Icons paketinde yok; resmi monochrome mark (currentColor). */
function LinkedInBrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function NeutralGlyph({
  variant,
}: {
  variant: "map" | "clock" | "user" | "briefcase";
}) {
  const cls = `${ICON_BOX} text-slate-600`;
  switch (variant) {
    case "map":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s7-5.2 7-11.2a7 7 0 1 0-14 0C5 15.8 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 11.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "clock":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "user":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20 21a8 8 0 1 0-16 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 10h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function BrandContactIcon({ name }: { name: RowIcon }) {
  switch (name) {
    case "phone":
      return <MdOutlinePhone className={`${ICON_BOX} text-slate-600`} aria-hidden />;
    case "whatsapp":
      return <SiWhatsapp className={`${ICON_BOX} text-emerald-500`} aria-hidden />;
    case "mail":
      return <SiGmail className={`${ICON_BOX} text-red-500`} aria-hidden />;
    case "globe":
      return (
        <MdOutlineLanguage className={`${ICON_BOX} text-slate-600`} aria-hidden />
      );
    case "instagram":
      return (
        <SiInstagram className={`${ICON_BOX} text-pink-600`} aria-hidden />
      );
    case "facebook":
      return <SiFacebook className={`${ICON_BOX} text-[#0866FF]`} aria-hidden />;
    case "twitter":
      return <SiX className={`${ICON_BOX} text-neutral-900`} aria-hidden />;
    case "linkedin":
      return (
        <LinkedInBrandMark className={`${ICON_BOX} text-blue-600`} aria-hidden />
      );
    case "youtube":
      return <SiYoutube className={`${ICON_BOX} text-red-600`} aria-hidden />;
    case "telegram":
      return <SiTelegram className={`${ICON_BOX} text-sky-500`} aria-hidden />;
    case "google_maps":
      return (
        <SiGooglemaps className={`${ICON_BOX} text-emerald-600`} aria-hidden />
      );
    case "map":
      return <NeutralGlyph variant="map" />;
    case "clock":
      return <NeutralGlyph variant="clock" />;
    case "user":
      return <NeutralGlyph variant="user" />;
    case "briefcase":
      return <NeutralGlyph variant="briefcase" />;
    default:
      return null;
  }
}

type ContactLine = {
  id: string;
  icon: RowIcon;
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
  linkLabel?: string;
  copyable?: boolean;
  /** Dolu ise Kopyala gösterilir (konum / saat / yetkili hariç). */
  copyValue?: string | null;
};

function copyAriaLabel(contactLabel: string): string {
  switch (contactLabel) {
    case "Telefon":
    case "İkinci telefon":
      return "Telefon numarasını kopyala";
    case "WhatsApp":
    case "İkinci WhatsApp":
      return "WhatsApp iletişim bilgisini kopyala";
    case "E-posta":
    case "Destek e-postası":
      return "E-posta adresini kopyala";
    case "Web sitesi":
      return "Web sitesi adresini kopyala";
    case "Instagram":
      return "Instagram bağlantısını kopyala";
    case "Facebook":
      return "Facebook bağlantısını kopyala";
    case "X":
      return "X bağlantısını kopyala";
    case "LinkedIn":
      return "LinkedIn bağlantısını kopyala";
    case "YouTube":
      return "YouTube bağlantısını kopyala";
    case "Telegram":
      return "Telegram bağlantısını kopyala";
    case "Google Haritalar":
      return "Google Haritalar bağlantısını kopyala";
    default:
      return `${contactLabel} bilgisini kopyala`;
  }
}

function CopyContactButton({
  text,
  ariaLabel,
}: {
  text: string;
  ariaLabel: string;
}) {
  async function handleCopy(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (
        typeof navigator === "undefined" ||
        typeof navigator.clipboard?.writeText !== "function"
      ) {
        toast.error("Tarayıcı panoya yazmayı desteklemiyor.");
        return;
      }
      await navigator.clipboard.writeText(text);
      toast.success("Kopyalandı");
    } catch {
      toast.error("Kopyalanamadı — tarayıcı veya izin ayarlarını kontrol edin.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel}
      className="inline-flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-md border border-[#0B3C5D]/12 bg-white px-2.5 text-xs font-semibold text-[#1A1A1A]/55 outline-none ring-[#0B3C5D]/25 transition hover:bg-slate-50 hover:text-[#0B3C5D] focus-visible:ring-2"
    >
      <MdContentCopy className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
      Kopyala
    </button>
  );
}

function ContactInfoItem({ line }: { line: ContactLine }) {
  const linkClass =
    "wrap-break-word text-sm font-semibold leading-relaxed text-[#328CC1] transition-colors hover:text-[#0B3C5D]";

  const content = line.href ? (
    line.external ? (
      <a
        href={line.href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={linkClass}
      >
        {line.linkLabel ?? line.value}
      </a>
    ) : (
      <a href={line.href} className={linkClass}>
        {line.value}
      </a>
    )
  ) : (
    <p className="wrap-break-word text-sm font-medium leading-relaxed text-[#1A1A1A]/85">
      {line.value}
    </p>
  );

  const showCopy =
    line.copyable !== false &&
    typeof line.copyValue === "string" &&
    line.copyValue.trim().length > 0;

  return (
    <div className="group flex gap-3 rounded-xl border border-[#0B3C5D]/10 bg-[#F7F9FB]/50 p-3 transition-colors hover:border-[#0B3C5D]/22">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-[#0B3C5D]/8"
        aria-hidden
      >
        <BrandContactIcon name={line.icon} />
      </div>
      <div className="flex min-h-11 min-w-0 flex-1 flex-col gap-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]/45">
          {line.label}
        </p>
        <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0 flex-1">{content}</div>
          {showCopy ? (
            <div className="shrink-0">
              <CopyContactButton
                text={line.copyValue!.trim()}
                ariaLabel={copyAriaLabel(line.label)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ContactGroup({ title, lines }: { title: string; lines: ContactLine[] }) {
  if (lines.length === 0) return null;
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
        {title}
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {lines.map((line) => (
          <ContactInfoItem key={line.id} line={line} />
        ))}
      </div>
    </div>
  );
}

class ContactAccumulator {
  private readonly seen = new Set<string>();
  private id = 0;

  tryAdd(
    bucket: DedupeBucket,
    display: string,
    href: string | null,
    build: () => Omit<ContactLine, "id">
  ): ContactLine | null {
    const d = normalizeWhitespace(display);
    if (!d && bucket !== "url") return null;
    const key = dedupeKey(bucket, d || display, href);
    if (!key || this.seen.has(key)) return null;
    this.seen.add(key);
    const b = build();
    return { ...b, id: `c-${this.id++}` };
  }
}

function buildContactLines(firm: FirmRow): {
  direct: ContactLine[];
  web: ContactLine[];
  location: ContactLine[];
  person: ContactLine[];
} {
  const acc = new ContactAccumulator();
  const direct: ContactLine[] = [];
  const web: ContactLine[] = [];
  const location: ContactLine[] = [];
  const person: ContactLine[] = [];

  const showPhone = firm.show_phone !== false;
  const showWa = firm.show_whatsapp !== false;
  const showEmail = firm.show_email !== false;
  const showWebsite = firm.show_website !== false;
  const showAddr = firm.show_address !== false;
  const showHours = firm.show_working_hours !== false;
  const socialOn = firm.social_buttons_enabled !== false;

  if (showPhone && firm.phone?.trim()) {
    const v = firm.phone.trim();
    const h = `tel:${v.replace(/\s/g, "")}`;
    const row = acc.tryAdd("phone", v, h, () => ({
      icon: "phone" as const,
      label: "Telefon",
      value: v,
      href: h,
      external: false,
      copyValue: v,
    }));
    if (row) direct.push(row);
  }

  if (showPhone && firm.second_phone?.trim()) {
    const v = firm.second_phone.trim();
    const h = `tel:${v.replace(/\s/g, "")}`;
    const row = acc.tryAdd("phone", v, h, () => ({
      icon: "phone",
      label: "İkinci telefon",
      value: v,
      href: h,
      external: false,
      copyValue: v,
    }));
    if (row) direct.push(row);
  }

  const addWhatsapp = (raw: string, label: string) => {
    const v = raw.trim();
    if (!v) return;
    const waMe = buildWhatsappWaMeUrl(v);
    const href =
      waMe ?? (/^https?:\/\//i.test(v) ? safeExternalHref(v) : null);
    const copyVal =
      href && href.startsWith("http") ? href : v;
    const row = acc.tryAdd("whatsapp", v, href, () => ({
      icon: "whatsapp" as const,
      label,
      value: v,
      href,
      external: Boolean(href && href.startsWith("http")),
      copyValue: copyVal,
    }));
    if (row) direct.push(row);
  };

  if (showWa && firm.whatsapp?.trim()) addWhatsapp(firm.whatsapp, "WhatsApp");
  if (showWa && firm.second_whatsapp?.trim()) addWhatsapp(firm.second_whatsapp, "İkinci WhatsApp");

  if (showEmail && firm.email?.trim()) {
    const v = firm.email.trim();
    const row = acc.tryAdd("email", v, `mailto:${v}`, () => ({
      icon: "mail",
      label: "E-posta",
      value: v,
      href: `mailto:${v}`,
      external: false,
      copyValue: v,
    }));
    if (row) direct.push(row);
  }

  if (showEmail && firm.support_email?.trim()) {
    const v = firm.support_email.trim();
    const row = acc.tryAdd("email", v, `mailto:${v}`, () => ({
      icon: "mail",
      label: "Destek e-postası",
      value: v,
      href: `mailto:${v}`,
      external: false,
      copyValue: v,
    }));
    if (row) direct.push(row);
  }

  if (showWebsite && firm.website?.trim()) {
    const raw = firm.website.trim();
    const href = websiteHref(raw);
    const display = raw.replace(/^https?:\/\//i, "");
    const row = acc.tryAdd("url", display, href, () => ({
      icon: "globe",
      label: "Web sitesi",
      value: display,
      href,
      external: true,
      copyValue: href,
    }));
    if (row) web.push(row);
  }

  if (socialOn && firm.instagram?.trim()) {
    const raw = firm.instagram.trim();
    const href = safeExternalHref(raw);
    if (href) {
      const row = acc.tryAdd("url", raw, href, () => ({
        icon: "instagram",
        label: "Instagram",
        value: raw,
        href,
        external: true,
        copyValue: href,
      }));
      if (row) web.push(row);
    }
  }

  if (socialOn && firm.facebook?.trim()) {
    const raw = firm.facebook.trim();
    const href = safeExternalHref(raw);
    if (href) {
      const row = acc.tryAdd("url", raw, href, () => ({
        icon: "facebook",
        label: "Facebook",
        value: raw,
        href,
        external: true,
        copyValue: href,
      }));
      if (row) web.push(row);
    }
  }

  if (socialOn && firm.twitter?.trim()) {
    const raw = firm.twitter.trim();
    const href = safeExternalHref(raw);
    if (href) {
      const row = acc.tryAdd("url", raw, href, () => ({
        icon: "twitter",
        label: "X",
        value: raw,
        href,
        external: true,
        copyValue: href,
      }));
      if (row) web.push(row);
    }
  }

  if (socialOn && firm.linkedin?.trim()) {
    const raw = firm.linkedin.trim();
    const href = safeExternalHref(raw);
    if (href) {
      const row = acc.tryAdd("url", raw, href, () => ({
        icon: "linkedin",
        label: "LinkedIn",
        value: raw,
        href,
        external: true,
        copyValue: href,
      }));
      if (row) web.push(row);
    }
  }

  if (socialOn && firm.youtube?.trim()) {
    const raw = firm.youtube.trim();
    const href = safeExternalHref(raw);
    if (href) {
      const row = acc.tryAdd("url", raw, href, () => ({
        icon: "youtube",
        label: "YouTube",
        value: raw,
        href,
        external: true,
        copyValue: href,
      }));
      if (row) web.push(row);
    }
  }

  if (socialOn && firm.telegram?.trim()) {
    const raw = firm.telegram.trim();
    const href = safeExternalHref(raw);
    if (href) {
      const row = acc.tryAdd("url", raw, href, () => ({
        icon: "telegram",
        label: "Telegram",
        value: raw,
        href,
        external: true,
        copyValue: href,
      }));
      if (row) web.push(row);
    }
  }

  if (showAddr && firm.address?.trim()) {
    const v = normalizeWhitespace(firm.address);
    const row = acc.tryAdd("text", v, null, () => ({
      icon: "map",
      label: "Adres",
      value: v,
      href: null,
      external: false,
    }));
    if (row) location.push(row);
  }

  if (firm.city?.trim()) {
    const v = normalizeWhitespace(firm.city);
    const row = acc.tryAdd("text", v, null, () => ({
      icon: "map",
      label: "Şehir",
      value: v,
      href: null,
      external: false,
    }));
    if (row) location.push(row);
  }

  if (firm.district?.trim()) {
    const v = normalizeWhitespace(firm.district);
    const row = acc.tryAdd("text", v, null, () => ({
      icon: "map",
      label: "İlçe / semt",
      value: v,
      href: null,
      external: false,
    }));
    if (row) location.push(row);
  }

  if (firm.hq_country?.trim()) {
    const v = normalizeWhitespace(firm.hq_country);
    const row = acc.tryAdd("text", v, null, () => ({
      icon: "map",
      label: "Ülke",
      value: v,
      href: null,
      external: false,
    }));
    if (row) location.push(row);
  }

  if (showAddr) {
    const mapsUrl = firm.maps_url?.trim() ?? "";
    if (mapsUrl) {
      const href = safeExternalHref(mapsUrl);
      if (href) {
        const row = acc.tryAdd("url", mapsUrl, href, () => ({
          icon: "google_maps",
          label: "Google Haritalar",
          value: mapsUrl,
          href,
          external: true,
          linkLabel: "Google Haritalar'da görüntüle",
          copyable: false,
          copyValue: null,
        }));
        if (row) location.push(row);
      }
    }
  }

  if (showHours && firm.working_hours?.trim()) {
    const v = normalizeWhitespace(firm.working_hours);
    const row = acc.tryAdd("text", v, null, () => ({
      icon: "clock",
      label: "Çalışma saatleri",
      value: v,
      href: null,
      external: false,
    }));
    if (row) location.push(row);
  }

  if (firm.contact_person_name?.trim()) {
    const v = normalizeWhitespace(firm.contact_person_name);
    const row = acc.tryAdd("text", v, null, () => ({
      icon: "user",
      label: "Yetkili kişi",
      value: v,
      href: null,
      external: false,
    }));
    if (row) person.push(row);
  }

  if (firm.contact_person_role?.trim()) {
    const v = normalizeWhitespace(firm.contact_person_role);
    const row = acc.tryAdd("text", v, null, () => ({
      icon: "briefcase",
      label: "Yetkili / rol",
      value: v,
      href: null,
      external: false,
    }));
    if (row) person.push(row);
  }

  return { direct, web, location, person };
}

export function FirmContactModal({
  firm,
  open,
  onClose,
  messagingActive = false,
}: FirmContactModalProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);
  const [logoFailed, setLogoFailed] = useState(false);

  const googleListRating =
    firmShouldShowGoogleRatingOnPublicCard(firm)
      ? parseFiniteGoogleRating(firm.google_profile?.rating)
      : null;

  const categoryLabel = effectiveFirmCategoryLabel(firm);
  const slogan = firm.slogan?.trim() ?? "";
  const subtitleParts = [slogan || null, categoryLabel || null].filter(Boolean);
  const subtitle =
    slogan && categoryLabel && slogan.toLowerCase() === categoryLabel.toLowerCase()
      ? slogan
      : subtitleParts.join(" · ");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), 200);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setLogoFailed(false);
  }, [firm.logo_url]);

  if (!mounted) return null;

  const { direct, web, location, person } = buildContactLines(firm);
  const logoAlt = firm.logo_alt_text?.trim() || `${firm.name} logosu`;
  const modalLogoSrc = withSupabaseImageTransform(firm.logo_url, {
    width: 112,
    height: 112,
    quality: 75,
  });

  return (
    <div className="fixed inset-0 z-9999">
      <button
        type="button"
        className={`absolute inset-0 bg-[#1A1A1A]/45 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Kapat"
        onClick={onClose}
      />

      <div className="relative flex h-full w-full items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`flex max-h-[min(92vh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem))] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#0B3C5D]/10 bg-white shadow-[0_8px_30px_rgba(11,60,93,0.16)] transition-all duration-200 sm:max-w-xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#0B3C5D]/10 px-4 py-3">
            <div className="min-w-0 flex-1">
              <h2
                id={titleId}
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/45"
              >
                İletişim
              </h2>
              <div className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F7F9FB] ring-1 ring-[#0B3C5D]/8">
                  {modalLogoSrc && !logoFailed ? (
                    <Image
                      src={modalLogoSrc}
                      alt={logoAlt}
                      fill
                      sizes="56px"
                      className="object-contain object-center p-1.5"
                      onError={() => setLogoFailed(true)}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-sm font-bold text-[#0B3C5D]">
                      {initialsFromName(firm.name)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5">
                    <p className="min-w-0 text-lg font-semibold leading-snug text-[#0B3C5D]">{firm.name}</p>
                    <FirmNameBadges firm={firm} size="modal" className="shrink-0" />
                  </div>
                  {subtitle ? (
                    <p className="mt-1 text-xs font-medium leading-snug text-[#1A1A1A]/58">
                      {subtitle}
                    </p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#1A1A1A]/58">
                    <span className="inline-flex items-center gap-1">
                      Kurumsallık Skoru
                      <ScoreInfoButton label="Kurumsallık Skoru hakkında" text={CORP_INFO} />
                      <span className="font-semibold tabular-nums text-[#1A1A1A]">
                        {firm.corporateness_score}/100
                      </span>
                    </span>
                  </div>
                  {googleListRating != null ? (
                    <div className="mt-2">
                      <GooglePublicRatingRow
                        rating={googleListRating}
                        userRatingCount={firm.google_profile?.user_rating_count ?? null}
                        googleMapsUrl={firm.google_profile?.google_maps_uri ?? null}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl border border-[#0B3C5D]/12 bg-white p-2 text-[#0B3C5D]/60 transition hover:bg-[#F7F9FB]"
              aria-label="Kapat"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <div className="space-y-6">
              <ContactGroup title="Doğrudan iletişim" lines={direct} />
              <ContactGroup title="Web ve sosyal medya" lines={web} />
              <ContactGroup title="Konum" lines={location} />
              <ContactGroup title="Yetkili kişi" lines={person} />
            </div>
          </div>

          {messagingActive ? (
            <div className="shrink-0 border-t border-[#0B3C5D]/10 bg-[#F7F9FB]/80 px-4 py-3">
              <FirmMessageChatButton
                firmId={firm.id}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#0B3C5D]/15 bg-white px-3 text-sm font-semibold text-[#0B3C5D] shadow-sm transition hover:bg-[#F7F9FB] sm:min-h-11"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
