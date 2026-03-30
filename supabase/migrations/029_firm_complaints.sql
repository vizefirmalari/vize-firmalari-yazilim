-- VizeFirmalari: Platforma gelen firma bildirimleri (firma mesajlaşmasından bağımsız kanal)

create table if not exists public.firm_complaints (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid references public.firms(id) on delete set null,
  firm_name_snapshot text not null,
  subject text not null,
  message text not null,
  email text not null,
  phone text,
  status text not null default 'new' check (status in ('new', 'in_review', 'resolved', 'closed')),
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  source text not null default 'public_form' check (source = 'public_form')
);

comment on table public.firm_complaints is 'Kullanıcıların yayınlanmış firmalar hakkında platform yönetimine ilettiği bildirimler; firmaya gitmez.';

create index if not exists firm_complaints_created_at_idx on public.firm_complaints (created_at desc);
create index if not exists firm_complaints_status_idx on public.firm_complaints (status);
create index if not exists firm_complaints_firm_id_idx on public.firm_complaints (firm_id);
create index if not exists firm_complaints_is_read_idx on public.firm_complaints (is_read);

alter table public.firm_complaints enable row level security;

-- Anon / oturumlu: yalnızca kontrollü insert (platform formu)
drop policy if exists "firm_complaints_insert_public" on public.firm_complaints;
create policy "firm_complaints_insert_public"
  on public.firm_complaints
  for insert
  to anon, authenticated
  with check (
    is_read = false
    and status = 'new'
    and source = 'public_form'
    and length(trim(firm_name_snapshot)) > 0
    and length(trim(subject)) > 0
    and length(trim(message)) > 0
    and length(trim(email)) > 0
  );

-- Yönetim: okuma
drop policy if exists "firm_complaints_select_admin" on public.firm_complaints;
create policy "firm_complaints_select_admin"
  on public.firm_complaints
  for select
  to authenticated
  using (public.is_admin());

-- Yönetim: güncelleme (durum / okundu)
drop policy if exists "firm_complaints_update_admin" on public.firm_complaints;
create policy "firm_complaints_update_admin"
  on public.firm_complaints
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
