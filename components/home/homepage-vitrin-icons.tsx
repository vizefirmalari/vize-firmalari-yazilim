import type { ReactNode } from "react";
import type { SpecializationKey } from "@/lib/constants/firm-specializations";
import type { QuickDiscoverIconId } from "@/lib/homepage/discovery-model";

const stroke = "currentColor";

export function VitrinIconPassport({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
        stroke={stroke}
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.5" stroke={stroke} strokeWidth="1.6" />
      <path
        d="M8 17h8"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VitrinIconFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4v16M5 5h10l-2 3 2 3H5"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VitrinIconGraduation({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 10.5L12 7l7.5 3.5L12 14 4.5 10.5z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12v3.5c0 1 1.5 2 3 2s3-1 3-2V12"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VitrinIconBriefcase({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="8"
        width="16"
        height="11"
        rx="2"
        stroke={stroke}
        strokeWidth="1.6"
      />
      <path
        d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
        stroke={stroke}
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function VitrinIconPlane({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.5 4.5L12 9l8 2-8 2-1.5 4.5L9 15l-5 1 2-4-2-4 5 1 1.5-7.5z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VitrinIconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20V8l8-4v16M4 12h8M9 12v8M14 8h6v12"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VitrinIconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="2.5" stroke={stroke} strokeWidth="1.6" />
      <path
        d="M4 19v-1a4 4 0 0 1 4-4h2"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="17" cy="9" r="2" stroke={stroke} strokeWidth="1.6" />
      <path
        d="M14 20v-1a3 3 0 0 1 3-3h1"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VitrinIconDocument({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4h6l4 4v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12h6M9 16h4"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VitrinIconGlobe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VitrinIconHome({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VitrinIconBadge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l2.2 4.5L19 8.5l-3.5 3.4L16.4 18 12 15.8 7.6 18 8.5 11.9 5 8.5l4.8-1L12 3z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VitrinIconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        stroke={stroke}
        strokeWidth="1.6"
      />
      <path
        d="M8 3v4M16 3v4M4 10h16"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VitrinIconScales({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v18M6 8l3 6h6l3-6M6 8h4M14 8h4"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VitrinIconTranslate({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h8M4 12h5M4 18h7"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13 7l3 5-3 5M16 10h3.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VitrinIconRoute({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2.2" stroke={stroke} strokeWidth="1.6" />
      <circle cx="17" cy="17" r="2.2" stroke={stroke} strokeWidth="1.6" />
      <path
        d="M8.7 8.7l6.6 6.6"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function QuickDiscoverIcon({
  id,
  className = "h-6 w-6 text-primary",
}: {
  id: QuickDiscoverIconId;
  className?: string;
}): ReactNode {
  switch (id) {
    case "globe":
      return <VitrinIconGlobe className={className} />;
    case "flag":
      return <VitrinIconFlag className={className} />;
    case "graduation":
      return <VitrinIconGraduation className={className} />;
    case "briefcase":
      return <VitrinIconBriefcase className={className} />;
    case "home":
      return <VitrinIconHome className={className} />;
    case "badge":
      return <VitrinIconBadge className={className} />;
    case "calendar":
      return <VitrinIconCalendar className={className} />;
    case "scales":
      return <VitrinIconScales className={className} />;
    default:
      return <VitrinIconGlobe className={className} />;
  }
}

/** İşlem türü vitrin kartları — ana hizmet etiketine göre */
export function ServiceVitrinIcon({
  title,
  className = "h-7 w-7 text-primary",
}: {
  title: string;
  className?: string;
}) {
  const t = title.trim().toLowerCase();
  if (t.includes("oturum")) return <VitrinIconHome className={className} />;
  if (t.includes("vatandaşlık")) return <VitrinIconBadge className={className} />;
  if (t.includes("randevu")) return <VitrinIconCalendar className={className} />;
  if (t.includes("tercüme")) return <VitrinIconTranslate className={className} />;
  if (t.includes("göçmenlik") || t.includes("hukuki"))
    return <VitrinIconScales className={className} />;
  if (t.includes("başvuru") || t.includes("süreç"))
    return <VitrinIconRoute className={className} />;
  if (t.includes("konsolosluk") || t.includes("pasaport"))
    return <VitrinIconPassport className={className} />;
  if (t.includes("evrak")) return <VitrinIconDocument className={className} />;
  if (t.includes("vize hizmeti")) return <VitrinIconGlobe className={className} />;
  if (t.includes("eğitim")) return <VitrinIconGraduation className={className} />;
  if (t.includes("uzun dönemli") || t.includes("d tipi"))
    return <VitrinIconBriefcase className={className} />;
  return <VitrinIconDocument className={className} />;
}

export function SpecialtyVitrinIcon({
  specKey,
  className = "h-7 w-7 text-primary",
}: {
  specKey: SpecializationKey;
  className?: string;
}) {
  switch (specKey) {
    case "schengen_expert":
      return <VitrinIconPassport className={className} />;
    case "usa_visa_expert":
      return <VitrinIconFlag className={className} />;
    case "student_visa_support":
      return <VitrinIconGraduation className={className} />;
    case "work_visa_support":
      return <VitrinIconBriefcase className={className} />;
    case "tourist_visa_support":
      return <VitrinIconPlane className={className} />;
    case "business_visa_support":
      return <VitrinIconBuilding className={className} />;
    case "family_reunion_support":
      return <VitrinIconUsers className={className} />;
    case "appeal_support":
      return <VitrinIconDocument className={className} />;
    default:
      return <VitrinIconGlobe className={className} />;
  }
}
