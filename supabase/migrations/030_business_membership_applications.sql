-- VizeFirmalari: Üye iş yeri başvuruları (mesajlaşma / şikayet akışından ayrı)

create table if not exists public.business_membership_applications (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  website_url text null,
  phone text not null,
  email text null,
  notes text null,
  status text not null default 'new'
    check (status in ('new', 'in_review', 'approved', 'rejected')),
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid null default auth.uid() references auth.users(id) on delete set null,
  source text not null default 'public_form'
    check (source = 'public_form')
);

comment on table public.business_membership_applications is
  'Üye iş yeri ön başvuru talepleri. firms tablosuna otomatik yazılmaz; otomatik yayın yoktur, yönetici firmayı manuel ekler.';

create index if not exists business_membership_applications_created_at_idx
  on public.business_membership_applications (created_at desc);
create index if not exists business_membership_applications_status_idx
  on public.business_membership_applications (status);

alter table public.business_membership_applications enable row level security;

drop policy if exists "public can insert membership applications" on public.business_membership_applications;
create policy "public can insert membership applications"
  on public.business_membership_applications
  for insert
  to anon, authenticated
  with check (
    char_length(trim(company_name)) >= 2
    and char_length(trim(contact_name)) >= 2
    and char_length(trim(phone)) >= 5
    and status = 'new'
    and is_read = false
    and source = 'public_form'
  );

drop policy if exists "admins can read membership applications" on public.business_membership_applications;
create policy "admins can read membership applications"
  on public.business_membership_applications
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins can update membership applications" on public.business_membership_applications;
create policy "admins can update membership applications"
  on public.business_membership_applications
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
