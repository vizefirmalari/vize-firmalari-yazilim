"use client";

import type { ReactNode } from "react";

import { EmptyValue, nonempty } from "@/components/firm-panel/corporateness-dashboard-shared";
import type { FirmCorporatenessDashboardSnapshot } from "@/lib/firm-panel/load-corporateness-dashboard";
import Link from "next/link";

function externalUrl(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const t = raw.trim();
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function SocialRow(props: { label: string; href: string | null; value: string | null }) {
  const url = externalUrl(props.href ?? props.value);
  const has = Boolean(url && props.value?.trim());
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-[#0B3C5D]/6 bg-[#FAFBFC] p-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-[#0B3C5D]">{props.label}</span>
      {has ? (
        <Link
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          {props.value}
        </Link>
      ) : (
        <EmptyValue />
      )}
    </div>
  );
}

function ContribBadge(props: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[#0B3C5D]/12 bg-white px-2 py-0.5 text-[10px] font-semibold text-[#0B3C5D]">
      {props.children}
    </span>
  );
}

export default function WebTab({ snapshot }: { snapshot: FirmCorporatenessDashboardSnapshot }) {
  const f = snapshot.firm;
  const digital = snapshot.corporateness.sections.find((s) => s.id === "digital");
  const wq = String(f.website_quality_level ?? "none");
  const wqLabel = wq === "professional" ? "Profesyonel" : wq === "basic" ? "Temel" : "Belirtilmedi";

  const followers = Number(f.social_follower_count_total ?? 0);
  const posts = Number(f.social_post_count_total ?? 0);

  const contrib: ReactNode[] = [];
  if (digital) {
    for (const line of digital.lines) {
      if (line.points > 0) {
        contrib.push(
          <ContribBadge key={line.key}>
            +{line.points} {line.label}
          </ContribBadge>
        );
      }
    }
  }

  const website = nonempty(f.website) ? String(f.website).trim() : null;

  return (
    <div className="space-y-5">
      {contrib.length ? (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1A1A]/45">
            Kurumsallık skoruna katkı
          </p>
          <div className="mt-2 flex flex-wrap gap-2">{contrib}</div>
        </div>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-[#0B3C5D]/8 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-[#0B3C5D]">Web sitesi</p>
          {website ? (
            <Link
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block break-all text-sm font-medium text-primary hover:underline"
            >
              {website}
            </Link>
          ) : (
            <div className="mt-2">
              <EmptyValue />
            </div>
          )}
          <p className="mt-3 text-xs text-[#1A1A1A]/55">
            Blog alanı: {f.has_blog === true ? "İşaretli" : "Belirtilmedi / yok"}
          </p>
          <p className="mt-1 text-xs text-[#1A1A1A]/55">Web kalite seviyesi: {wqLabel}</p>
        </div>
        <div className="rounded-xl border border-[#0B3C5D]/8 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-[#0B3C5D]">Sosyal metrikler</p>
          <p className="mt-2 text-sm text-[#1A1A1A]/80">Takipçi (toplam): {followers > 0 ? followers : "—"}</p>
          <p className="mt-1 text-sm text-[#1A1A1A]/80">Gönderi (toplam): {posts > 0 ? posts : "—"}</p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <SocialRow label="Instagram" href={nonempty(f.instagram) ? String(f.instagram) : null} value={nonempty(f.instagram) ? String(f.instagram) : null} />
        <SocialRow label="Facebook" href={nonempty(f.facebook) ? String(f.facebook) : null} value={nonempty(f.facebook) ? String(f.facebook) : null} />
        <SocialRow label="X (Twitter)" href={nonempty(f.twitter) ? String(f.twitter) : null} value={nonempty(f.twitter) ? String(f.twitter) : null} />
        <SocialRow label="LinkedIn" href={nonempty(f.linkedin) ? String(f.linkedin) : null} value={nonempty(f.linkedin) ? String(f.linkedin) : null} />
        <SocialRow label="YouTube" href={nonempty(f.youtube) ? String(f.youtube) : null} value={nonempty(f.youtube) ? String(f.youtube) : null} />
        <SocialRow label="Telegram" href={nonempty(f.telegram) ? String(f.telegram) : null} value={nonempty(f.telegram) ? String(f.telegram) : null} />
      </div>
    </div>
  );
}
