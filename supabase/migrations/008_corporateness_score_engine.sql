-- Kurumsallık motoru: web kalitesi, sosyal metrikler ve açıklanabilir skor dökümü

alter table public.firms
  add column if not exists website_quality_level text not null default 'none';

alter table public.firms
  add column if not exists social_follower_count_total int not null default 0;

alter table public.firms
  add column if not exists social_post_count_total int not null default 0;

alter table public.firms
  add column if not exists corporateness_score_breakdown jsonb not null default '{}'::jsonb;

alter table public.firms drop constraint if exists firms_website_quality_level_check;
alter table public.firms
  add constraint firms_website_quality_level_check
  check (website_quality_level in ('none', 'basic', 'professional'));

comment on column public.firms.website_quality_level is 'Web sitesi kalite bandı: none | basic | professional (Kurumsallık skoru)';
comment on column public.firms.social_follower_count_total is 'Sosyal hesaplarda toplam takipçi (Kurumsallık — dış profil)';
comment on column public.firms.social_post_count_total is 'Sosyal hesaplarda toplam gönderi (Kurumsallık — dış profil)';
comment on column public.firms.corporateness_score_breakdown is 'Kurumsallık skoru bölüm dökümü (JSON)';

update public.firms
set website_quality_level = 'professional'
where has_professional_website = true and website_quality_level = 'none';
