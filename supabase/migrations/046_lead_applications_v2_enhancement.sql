-- Lead applications v2: bölge/ülke, zamanlama, iletişim tercihi, alt skorlar, ticari vize, finansal belge

-- visa_type: business ekle
alter table public.lead_applications
  drop constraint if exists lead_applications_visa_type_check;

alter table public.lead_applications
  add constraint lead_applications_visa_type_check
  check (visa_type in ('work', 'tourist', 'family_reunion', 'student', 'business', 'not_sure'));

-- segment: medium ekle (warm ile low arası)
alter table public.lead_applications
  drop constraint if exists lead_applications_lead_segment_check;

alter table public.lead_applications
  add constraint lead_applications_lead_segment_check
  check (lead_segment in ('hot', 'warm', 'medium', 'low', 'weak'));

alter table public.lead_applications
  add column if not exists region_code text,
  add column if not exists country_code text,
  add column if not exists country_name text,
  add column if not exists timeline_bucket text,
  add column if not exists timeline_note text,
  add column if not exists preferred_contact_method text,
  add column if not exists whatsapp text,
  add column if not exists age int,
  add column if not exists clarity_score int,
  add column if not exists readiness_score int,
  add column if not exists actionability_score int,
  add column if not exists recommendation_next_action text;

comment on column public.lead_applications.region_code is 'Hedef bölge kodu (örn. schengen, uk).';
comment on column public.lead_applications.country_code is 'Ülke kodu (örn. DE) veya özel kod.';
comment on column public.lead_applications.country_name is 'Görünen ülke adı.';
comment on column public.lead_applications.timeline_bucket is 'Yapılandırılmış zamanlama (örn. asap, m1).';
comment on column public.lead_applications.clarity_score is '0-100 netlik alt skoru.';
comment on column public.lead_applications.readiness_score is '0-100 hazırlık alt skoru.';
comment on column public.lead_applications.actionability_score is '0-100 aksiyon alınabilirlik alt skoru.';

-- Belge: finansal
alter table public.lead_application_files
  drop constraint if exists lead_application_files_file_type_check;

alter table public.lead_application_files
  add constraint lead_application_files_file_type_check
  check (file_type in (
    'passport', 'identity', 'cv', 'diploma', 'invitation_letter', 'job_offer',
    'financial', 'other'
  ));
