"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FirmRow } from "@/lib/types/firm";
import { FirmPrimaryLeftCta } from "@/components/firma/firm-primary-left-cta";
import { ScoreInfoButton } from "@/components/home/score-info-button";
import {
  QuickApplyInactiveButton,
  QuickApplyLauncher,
} from "@/components/quick-apply/quick-apply-launcher";
import {
  buildQuickApplyExpertiseLine,
  buildQuickApplySubtitle,
} from "@/lib/quick-apply/firm-intro-branding";
import { effectiveFirmCategoryLabel } from "@/lib/firma/listing-filter-options";
import { SPECIALIZATION_OPTIONS } from "@/lib/constants/firm-specializations";
import { FirmOfficeCityBadge } from "@/components/firma/firm-office-city-badge";
import { FirmNameBadges } from "@/components/firms/FirmNameBadges";
import {
  firmShouldShowGoogleRatingOnPublicCard,
  parseFiniteGoogleRating,
} from "@/lib/firms/google-profile-public";
import { GooglePublicRatingRow } from "@/components/home/google-public-rating-row";
import { withSupabaseImageTransform } from "@/lib/images/supabase-transform";

const CORP_INFO =
  "Firmanın platform üzerindeki kurumsal bilgi, belge ve profil bütünlüğüne göre oluşturulan değerlendirme puanıdır.";

const ABOUT_MAX = 120;

function truncateAbout(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const head = lastSpace > 24 ? slice.slice(0, lastSpace) : slice.trimEnd();
  return `${head}…`;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

export function FeaturedFirmCard({ firm }: { firm: FirmRow }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const corporate = firm.corporateness_score;
  const hype =
    typeof firm.hype_score === "number" && Number.isFinite(firm.hype_score)
      ? firm.hype_score
      : 0;
  const quickApplyOk =
    firm.quick_apply_enabled !== false &&
    firm.has_active_panel_member === true;

  const shortAbout = firm.short_description?.trim() ?? "";
  const detailedAbout = firm.description?.trim() ?? "";
  const cardAbout =
    shortAbout ||
    (detailedAbout ? truncateAbout(detailedAbout, ABOUT_MAX) : "") ||
    "Bu firma hakkında metin yakında eklenecek.";

  const firmType = effectiveFirmCategoryLabel(firm);
  const officeCity =
    firm.online_consultancy_badge === true
      ? "Online Danışmanlık"
      : (firm.city?.trim() ?? "");
  const specLabels = useMemo(() => {
    const r = firm as unknown as Record<string, unknown>;
    return SPECIALIZATION_OPTIONS.filter(({ key }) => Boolean(r[key])).map(
      ({ label }) => label
    );
  }, [firm]);

  const badgeLine = [firm.short_badge?.trim(), firmType].filter(Boolean).join(" · ");

  const specShown = specLabels.slice(0, 4);
  const specMore = Math.max(0, specLabels.length - specShown.length);

  const googleListRating =
    firmShouldShowGoogleRatingOnPublicCard(firm)
      ? parseFiniteGoogleRating(firm.google_profile?.rating)
      : null;
  const cardLogoSrc = withSupabaseImageTransform(firm.logo_url, {
    width: 160,
    height: 160,
    quality: 75,
  });

  useEffect(() => {
    setLogoFailed(false);
  }, [firm.logo_url]);

  return (
    <article className="relative flex h-full min-w-[min(100vw-2.5rem,20rem)] max-w-80 shrink-0 flex-col rounded-2xl border border-border bg-background p-4 shadow-[0_8px_30px_rgba(11,60,93,0.08)] sm:min-w-76 sm:max-w-84 sm:p-5">
      <div className="pointer-events-none absolute right-3 top-3 z-10 flex justify-end sm:right-4 sm:top-4">
        <FirmOfficeCityBadge
          city={firm.city}
          onlineConsultancy={firm.online_consultancy_badge}
        />
      </div>
      <div
        className={`flex gap-3 ${officeCity ? "pt-0.5 pr-19 sm:pr-28" : ""}`}
      >
        <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl bg-surface ring-1 ring-primary/8">
          {cardLogoSrc && !logoFailed ? (
            <Image
              src={cardLogoSrc}
              alt={firm.logo_alt_text?.trim() || `${firm.name} logosu`}
              fill
              sizes="(max-width: 768px) 72px, 80px"
              className="object-contain object-center p-1.5"
              loading="lazy"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-lg font-bold text-primary"
              aria-hidden
            >
              {initials(firm.name)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0.5">
            <h3 className="min-w-0 wrap-break-word text-base font-bold leading-snug text-primary">
              {firm.name}
            </h3>
            <FirmNameBadges firm={firm} size="card" className="shrink-0" />
          </span>
          {badgeLine ? (
            <p className="mt-1 line-clamp-2 text-[10px] font-medium leading-tight text-foreground/50">
              {badgeLine}
            </p>
          ) : null}
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/75">
        {cardAbout}
      </p>

      <div className="mt-3 space-y-2">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-foreground/60">
            <span className="inline-flex items-center gap-0.5">
              Kurumsallık
              <ScoreInfoButton label="Kurumsallık Skoru hakkında" text={CORP_INFO} />
            </span>
            <span className="tabular-nums text-foreground/80">
              {corporate}/100
            </span>
          </div>
          <div
            className="mt-1 h-1 overflow-hidden rounded-full bg-primary/10"
            role="progressbar"
            aria-valuenow={corporate}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-[#D9A441]"
              style={{ width: `${corporate}%` }}
            />
          </div>
        </div>
        <p className="text-[11px] font-semibold text-foreground/60">
          Hype: <span className="tabular-nums text-foreground">{hype}</span>
        </p>
        {googleListRating != null ? (
          <GooglePublicRatingRow
            rating={googleListRating}
            userRatingCount={firm.google_profile?.user_rating_count ?? null}
            tone="featured"
          />
        ) : null}
      </div>

      <div className="firm-spec-tags mt-3 flex flex-wrap gap-1.5">
        {specShown.map((l) => (
          <span
            key={l}
            className="inline-flex rounded-full bg-[#D9A441]/15 px-2 py-0.5 text-[10px] font-semibold text-[#1A1A1A] ring-1 ring-[#D9A441]/25"
          >
            {l}
          </span>
        ))}
        {specMore > 0 ? (
          <span className="inline-flex rounded-full bg-foreground/6 px-2 py-0.5 text-[10px] font-semibold text-foreground/55">
            +{specMore}
          </span>
        ) : null}
      </div>

      <div className="firm-cta-grid mt-4 grid flex-1 grid-cols-2 gap-2 *:min-w-0">
        <div className="firm-cta-secondary flex flex-col justify-center">
          <FirmPrimaryLeftCta firm={firm} />
        </div>
        <div className="firm-cta-primary flex flex-col justify-center">
          {quickApplyOk ? (
            <QuickApplyLauncher
              firmId={firm.id}
              firmName={firm.name}
              firmLogoUrl={firm.logo_url}
              firmExpertiseLine={buildQuickApplyExpertiseLine(firm)}
              firmSubtitle={buildQuickApplySubtitle(firm)}
              buttonClassName="flex w-full items-center justify-center rounded-xl bg-[#D9A441] py-2.5 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:bg-[#c8942f]"
            />
          ) : (
            <QuickApplyInactiveButton />
          )}
        </div>
      </div>

      <Link
        href={`/firma/${firm.slug}`}
        className="mt-3 block text-center text-sm font-semibold text-secondary underline-offset-4 hover:underline"
      >
        Firma sayfası
      </Link>
    </article>
  );
}
