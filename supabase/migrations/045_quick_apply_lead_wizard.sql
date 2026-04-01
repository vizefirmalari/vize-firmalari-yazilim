-- Quick Apply / Lead Wizard foundation

create sequence if not exists public.lead_application_no_seq;

create or replace function public.generate_lead_application_no()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  seq_val bigint;
begin
  seq_val := nextval('public.lead_application_no_seq');
  return format('VF-%s-%s', to_char(now(), 'YYYYMMDD'), lpad(seq_val::text, 6, '0'));
end;
$$;

create table if not exists public.lead_applications (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms(id) on delete cascade,
  application_no text not null unique default public.generate_lead_application_no(),
  visa_type text not null check (visa_type in ('work', 'tourist', 'family_reunion', 'student', 'not_sure')),
  target_country text null,
  applicant_name text not null,
  phone text not null,
  email text null,
  city text null,
  nationality text null,
  short_summary text null,
  timeline text null,
  current_status text not null default 'new'
    check (current_status in ('new', 'qualified', 'reviewing', 'contacted', 'engaged', 'converted', 'lost', 'closed')),
  lead_score int not null default 0 check (lead_score between 0 and 100),
  lead_segment text not null default 'low' check (lead_segment in ('hot', 'warm', 'low', 'weak')),
  lead_priority text not null default 'orta' check (lead_priority in ('cok_yuksek', 'yuksek', 'orta', 'dusuk')),
  readiness_status text not null default 'on_degerlendirme_gerekli'
    check (readiness_status in ('hazir', 'kismen_hazir', 'on_degerlendirme_gerekli')),
  score_reason_summary text null,
  previous_refusal boolean not null default false,
  passport_status text null,
  answers jsonb not null default '{}'::jsonb,
  consent_data_processing boolean not null default false,
  consent_contact boolean not null default false,
  submitted_from text not null default 'quick_apply_wizard',
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lead_applications_firm_created_idx
  on public.lead_applications (firm_id, created_at desc);
create index if not exists lead_applications_status_idx
  on public.lead_applications (current_status, created_at desc);
create index if not exists lead_applications_segment_priority_idx
  on public.lead_applications (lead_segment, lead_priority, created_at desc);

create table if not exists public.lead_application_files (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.lead_applications(id) on delete cascade,
  firm_id uuid not null references public.firms(id) on delete cascade,
  file_type text not null check (file_type in ('passport', 'identity', 'cv', 'diploma', 'invitation_letter', 'job_offer', 'other')),
  storage_path text not null,
  original_name text not null,
  mime_type text null,
  size_bytes bigint not null default 0,
  uploaded_at timestamptz not null default now(),
  unique (application_id, storage_path)
);

create index if not exists lead_application_files_application_idx
  on public.lead_application_files (application_id, uploaded_at desc);

create table if not exists public.lead_application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid null references public.lead_applications(id) on delete cascade,
  firm_id uuid null references public.firms(id) on delete set null,
  event_type text not null check (event_type in (
    'quick_apply_opened',
    'quick_apply_intro_viewed',
    'wizard_started',
    'wizard_step_completed',
    'file_uploaded',
    'application_submitted',
    'application_submit_failed',
    'application_viewed_by_firm',
    'application_status_changed'
  )),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists lead_application_events_application_idx
  on public.lead_application_events (application_id, created_at desc);
create index if not exists lead_application_events_firm_idx
  on public.lead_application_events (firm_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_lead_applications_updated_at on public.lead_applications;
create trigger trg_lead_applications_updated_at
before update on public.lead_applications
for each row execute function public.set_updated_at();

alter table public.lead_applications enable row level security;
alter table public.lead_application_files enable row level security;
alter table public.lead_application_events enable row level security;

drop policy if exists "public can insert lead applications" on public.lead_applications;
create policy "public can insert lead applications"
  on public.lead_applications
  for insert
  to anon, authenticated
  with check (
    submitted_from = 'quick_apply_wizard'
    and current_status = 'new'
    and consent_data_processing = true
    and consent_contact = true
    and char_length(trim(applicant_name)) >= 2
    and char_length(trim(phone)) >= 5
  );

drop policy if exists "firm members read own lead applications" on public.lead_applications;
create policy "firm members read own lead applications"
  on public.lead_applications
  for select
  to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "firm members update own lead applications" on public.lead_applications;
create policy "firm members update own lead applications"
  on public.lead_applications
  for update
  to authenticated
  using (public.is_admin() or public.is_firm_panel_member(firm_id))
  with check (public.is_admin() or public.is_firm_panel_member(firm_id));

drop policy if exists "public can insert lead files rows" on public.lead_application_files;
create policy "public can insert lead files rows"
  on public.lead_application_files
  for insert
  to anon, authenticated
  with check (
    exists (
      select 1
      from public.lead_applications a
      where a.id = application_id
        and a.firm_id = lead_application_files.firm_id
    )
  );

drop policy if exists "firm members read own lead files rows" on public.lead_application_files;
create policy "firm members read own lead files rows"
  on public.lead_application_files
  for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.lead_applications a
      where a.id = lead_application_files.application_id
        and public.is_firm_panel_member(a.firm_id)
    )
  );

drop policy if exists "public can insert lead events" on public.lead_application_events;
create policy "public can insert lead events"
  on public.lead_application_events
  for insert
  to anon, authenticated
  with check (event_type is not null);

drop policy if exists "firm members read own lead events" on public.lead_application_events;
create policy "firm members read own lead events"
  on public.lead_application_events
  for select
  to authenticated
  using (
    public.is_admin()
    or (
      firm_id is not null
      and public.is_firm_panel_member(firm_id)
    )
  );

insert into storage.buckets (id, name, public, file_size_limit)
values ('lead-application-files', 'lead-application-files', false, 10485760)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

create or replace function public.can_upload_lead_storage_path(p_name text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.lead_applications a
    where a.id = nullif(split_part(p_name, '/', 1), '')::uuid
      and a.created_at > (now() - interval '1 day')
  );
$$;

drop policy if exists "lead_storage_insert_public" on storage.objects;
create policy "lead_storage_insert_public"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'lead-application-files'
    and public.can_upload_lead_storage_path(name)
  );

drop policy if exists "lead_storage_read_firm_member" on storage.objects;
create policy "lead_storage_read_firm_member"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'lead-application-files'
    and (
      public.is_admin()
      or exists (
        select 1
        from public.lead_application_files f
        join public.lead_applications a on a.id = f.application_id
        where f.storage_path = storage.objects.name
          and public.is_firm_panel_member(a.firm_id)
      )
    )
  );
