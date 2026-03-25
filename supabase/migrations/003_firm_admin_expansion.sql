-- VizeFirmalari: Firma yönetim paneli genişletmesi (vize danışmanlığı odaklı alanlar)
-- 002_admin_platform.sql sonrası uygulayın.

-- ---------------------------------------------------------------------------
-- Öne çıkan ülkeler (junction)
-- ---------------------------------------------------------------------------
create table if not exists public.firm_featured_countries (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  country_id uuid not null references public.countries(id) on delete cascade,
  unique (firm_id, country_id)
);

create index if not exists firm_featured_countries_firm_idx
  on public.firm_featured_countries (firm_id);

alter table public.firm_featured_countries enable row level security;

create policy "Admin firm_featured_countries"
  on public.firm_featured_countries for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public read firm_featured_countries for published"
  on public.firm_featured_countries for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.firms f
      where f.id = firm_id and f.status = 'published'
    )
  );

-- ---------------------------------------------------------------------------
-- Medya ve marka
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists cover_image_url text;
alter table public.firms add column if not exists gallery_images text[] not null default '{}';
alter table public.firms add column if not exists office_photo_urls text[] not null default '{}';
alter table public.firms add column if not exists team_photo_url text;
alter table public.firms add column if not exists document_image_urls text[] not null default '{}';
alter table public.firms add column if not exists promo_image_urls text[] not null default '{}';
alter table public.firms add column if not exists slogan text;
alter table public.firms add column if not exists short_badge text;
alter table public.firms add column if not exists page_intro text;
alter table public.firms add column if not exists status_summary text;
alter table public.firms add column if not exists firm_category text;

-- ---------------------------------------------------------------------------
-- Skorlar (Hype + Kurumsallık); trust_score liste sıralaması için türetilir
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists hype_score int;
alter table public.firms add column if not exists corporate_score int;

update public.firms set hype_score = coalesce(hype_score, trust_score) where hype_score is null;
update public.firms set corporate_score = coalesce(corporate_score, trust_score) where corporate_score is null;

alter table public.firms alter column hype_score set default 0;
alter table public.firms alter column corporate_score set default 0;
alter table public.firms alter column hype_score set not null;
alter table public.firms alter column corporate_score set not null;

alter table public.firms drop constraint if exists firms_hype_score_check;
alter table public.firms add constraint firms_hype_score_check
  check (hype_score >= 0 and hype_score <= 100);

alter table public.firms drop constraint if exists firms_corporate_score_check;
alter table public.firms add constraint firms_corporate_score_check
  check (corporate_score >= 0 and corporate_score <= 100);

-- ---------------------------------------------------------------------------
-- İletişim genişlemesi
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists youtube text;
alter table public.firms add column if not exists telegram text;
alter table public.firms add column if not exists address text;
alter table public.firms add column if not exists city text;
alter table public.firms add column if not exists district text;
alter table public.firms add column if not exists hq_country text;
alter table public.firms add column if not exists maps_url text;
alter table public.firms add column if not exists working_hours text;
alter table public.firms add column if not exists weekend_hours_note text;
alter table public.firms add column if not exists contact_person_name text;
alter table public.firms add column if not exists contact_person_role text;

alter table public.firms add column if not exists show_phone boolean not null default true;
alter table public.firms add column if not exists show_whatsapp boolean not null default true;
alter table public.firms add column if not exists show_email boolean not null default true;
alter table public.firms add column if not exists show_website boolean not null default true;
alter table public.firms add column if not exists show_address boolean not null default true;
alter table public.firms add column if not exists show_working_hours boolean not null default true;

-- ---------------------------------------------------------------------------
-- Hizmet modeli
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists offers_online_service boolean not null default false;
alter table public.firms add column if not exists offers_physical_office boolean not null default true;
alter table public.firms add column if not exists offers_remote_support boolean not null default false;
alter table public.firms add column if not exists offers_multilingual_support boolean not null default false;

-- ---------------------------------------------------------------------------
-- Kurumsal profil
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists company_type text;
alter table public.firms add column if not exists has_tax_document boolean not null default false;
alter table public.firms add column if not exists tax_number text;
alter table public.firms add column if not exists tax_office text;
alter table public.firms add column if not exists permit_number text;
alter table public.firms add column if not exists legal_authorization_note text;
alter table public.firms add column if not exists has_physical_office boolean not null default true;
alter table public.firms add column if not exists office_address_verified boolean not null default false;
alter table public.firms add column if not exists employee_count int;
alter table public.firms add column if not exists founded_year int;
alter table public.firms add column if not exists cities_served_count int;
alter table public.firms add column if not exists has_corporate_email boolean not null default false;
alter table public.firms add column if not exists has_corporate_domain boolean not null default false;
alter table public.firms add column if not exists has_professional_website boolean not null default false;
alter table public.firms add column if not exists social_media_activity text;
alter table public.firms add column if not exists testimonials_level text;
alter table public.firms add column if not exists multilingual_team boolean not null default false;
alter table public.firms add column if not exists international_expertise_level int;
alter table public.firms add column if not exists profile_completeness int;
alter table public.firms add column if not exists corporate_score_factors jsonb not null default '{}'::jsonb;

-- ---------------------------------------------------------------------------
-- Sayfa içeriği
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists about_section text;
alter table public.firms add column if not exists service_process_text text;
alter table public.firms add column if not exists application_process_text text;
alter table public.firms add column if not exists documents_process_text text;
alter table public.firms add column if not exists appointment_process_text text;
alter table public.firms add column if not exists visa_fees_note text;
alter table public.firms add column if not exists why_this_firm text;
alter table public.firms add column if not exists corporate_summary_box text;
alter table public.firms add column if not exists disclaimer_notice text;
alter table public.firms add column if not exists campaign_text text;
alter table public.firms add column if not exists video_promo_text text;
alter table public.firms add column if not exists faq_json jsonb not null default '[]'::jsonb;
alter table public.firms add column if not exists advantages_list text[] not null default '{}';

alter table public.firms add column if not exists show_faq boolean not null default true;
alter table public.firms add column if not exists show_campaign_area boolean not null default false;
alter table public.firms add column if not exists show_process_section boolean not null default true;
alter table public.firms add column if not exists show_contact_box boolean not null default true;
alter table public.firms add column if not exists show_social_section boolean not null default true;

-- ---------------------------------------------------------------------------
-- SEO ve görünürlük
-- ---------------------------------------------------------------------------
alter table public.firms add column if not exists is_indexable boolean not null default true;
alter table public.firms add column if not exists show_in_search boolean not null default true;
alter table public.firms add column if not exists firm_page_enabled boolean not null default true;
alter table public.firms add column if not exists show_on_card boolean not null default true;
alter table public.firms add column if not exists contact_popup_enabled boolean not null default true;
alter table public.firms add column if not exists quick_apply_enabled boolean not null default true;
alter table public.firms add column if not exists social_buttons_enabled boolean not null default true;
alter table public.firms add column if not exists sort_priority int not null default 0;
alter table public.firms add column if not exists sponsored_display boolean not null default false;
alter table public.firms add column if not exists premium_badge boolean not null default false;
alter table public.firms add column if not exists verified_badge boolean not null default false;

-- ---------------------------------------------------------------------------
-- Admin-only özel alanlar (anon/authenticated public bu tabloyu okuyamaz)
-- ---------------------------------------------------------------------------
create table if not exists public.firm_admin_private (
  firm_id uuid primary key references public.firms(id) on delete cascade,
  admin_evaluation_note text,
  internal_review text,
  research_notes text,
  last_meeting_at date,
  last_reviewed_at date,
  status_history_json jsonb not null default '[]'::jsonb,
  team_notes text,
  updated_at timestamptz not null default now()
);

alter table public.firm_admin_private enable row level security;

create policy "Admin firm_admin_private all"
  on public.firm_admin_private for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Öne çıkan ülke isimleri (kart / API için denormalize)
alter table public.firms add column if not exists featured_countries text[] not null default '{}';

create index if not exists firms_sort_priority_idx on public.firms (sort_priority desc);
