-- VizeFirmalari: Firma sistemi v2 — birikimli hype, yasal yapı ayrımı, operasyon/dijital/SEO alanları

-- ---------------------------------------------------------------------------
-- Birikimli platform Hype (sınırsız artan tam sayı; sıralama / güven türevi için)
-- Not: 006 ile hype_score -> raw_hype_score (0–100) yeniden adlandırıldı; burada yeni sütun.
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists hype_score bigint not null default 0;

comment on column public.firms.hype_score is 'Platform aktivitesi — birikimli tam sayı (Akış / etkileşim); sıralamada kullanılır';

update public.firms
set hype_score = greatest(
  0::bigint,
  (coalesce(raw_hype_score, 0)::numeric * 100)::bigint
)
where hype_score = 0 and coalesce(raw_hype_score, 0) > 0;

create index if not exists firms_hype_score_bigint_idx on public.firms (hype_score desc);

-- ---------------------------------------------------------------------------
-- Kimlik / marka
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists brand_name text;
alter table public.firms add column if not exists card_highlight_text text;
alter table public.firms add column if not exists legal_company_name text;
alter table public.firms add column if not exists owner_name text;

-- Yasal şirket şekli (şahıs / ltd / a.ş.) — company_type = sınıflandırma etiketi ile ayrı
alter table public.firms add column if not exists company_structure text;

alter table public.firms add column if not exists license_number text;
alter table public.firms add column if not exists license_description text;

update public.firms
set license_number = coalesce(license_number, permit_number)
where license_number is null and permit_number is not null;

-- ---------------------------------------------------------------------------
-- İletişim / adres
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists postal_code text;
alter table public.firms add column if not exists support_email text;
alter table public.firms add column if not exists second_phone text;
alter table public.firms add column if not exists second_whatsapp text;

alter table public.firms add column if not exists has_landline boolean not null default false;
alter table public.firms add column if not exists supported_languages text[] not null default '{}';
alter table public.firms add column if not exists weekend_support boolean not null default false;

-- ---------------------------------------------------------------------------
-- Operasyon (detay)
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists consultant_count int;
alter table public.firms add column if not exists support_staff_count int;
alter table public.firms add column if not exists office_count int;

-- ---------------------------------------------------------------------------
-- Dijital / içerik
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists has_blog boolean not null default false;

-- ---------------------------------------------------------------------------
-- Uzmanlık bayrakları
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists schengen_expert boolean not null default false;
alter table public.firms add column if not exists usa_visa_expert boolean not null default false;
alter table public.firms add column if not exists student_visa_support boolean not null default false;
alter table public.firms add column if not exists work_visa_support boolean not null default false;
alter table public.firms add column if not exists tourist_visa_support boolean not null default false;
alter table public.firms add column if not exists business_visa_support boolean not null default false;
alter table public.firms add column if not exists family_reunion_support boolean not null default false;
alter table public.firms add column if not exists appeal_support boolean not null default false;

-- ---------------------------------------------------------------------------
-- SEO ek
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists focus_keyword text;
alter table public.firms add column if not exists secondary_keywords text;

-- ---------------------------------------------------------------------------
-- Vergi / lisans
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists has_tax_certificate boolean not null default false;

update public.firms
set has_tax_certificate = coalesce(has_tax_document, false)
where has_tax_certificate is not distinct from false;

-- ---------------------------------------------------------------------------
-- Profil kalitesi (denormalize — skor ve raporlama)
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists profile_has_logo boolean not null default false;
alter table public.firms add column if not exists profile_has_short_desc boolean not null default false;
alter table public.firms add column if not exists profile_has_long_desc boolean not null default false;
alter table public.firms add column if not exists profile_has_seo_fields boolean not null default false;
