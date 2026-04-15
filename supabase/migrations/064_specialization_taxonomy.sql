-- Genişletilebilir uzmanlık alanları (sabit boolean bayraklara ek; keşfet / eski URL mantığı değişmez).

create table if not exists public.specialization_taxonomy (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  label text not null,
  affects_corporate_score boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  constraint specialization_taxonomy_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint specialization_taxonomy_slug_len check (char_length(slug) between 2 and 120),
  constraint specialization_taxonomy_label_len check (char_length(trim(label)) between 2 and 120)
);

create unique index if not exists specialization_taxonomy_slug_key
  on public.specialization_taxonomy (slug);

create unique index if not exists specialization_taxonomy_label_lower_key
  on public.specialization_taxonomy (lower(trim(label)));

comment on table public.specialization_taxonomy is 'Panelden eklenen ek uzmanlık türleri; slug URL/filtrede kullanılır. affects_corporate_score varsayılan kapalı.';

create table if not exists public.firm_specialization_custom (
  firm_id uuid not null references public.firms (id) on delete cascade,
  taxonomy_id uuid not null references public.specialization_taxonomy (id) on delete restrict,
  primary key (firm_id, taxonomy_id)
);

create index if not exists firm_specialization_custom_taxonomy_idx
  on public.firm_specialization_custom (taxonomy_id);

comment on table public.firm_specialization_custom is 'Firma — ek uzmanlık (taxonomy) çoktan çoğa; sabit boolean sütunları yerine geçmez.';

alter table public.specialization_taxonomy enable row level security;
alter table public.firm_specialization_custom enable row level security;

create policy "specialization_taxonomy_select_public"
  on public.specialization_taxonomy for select
  to anon, authenticated
  using (is_active = true or public.is_admin());

create policy "specialization_taxonomy_admin_write"
  on public.specialization_taxonomy for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "firm_specialization_custom_admin_all"
  on public.firm_specialization_custom for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "firm_specialization_custom_public_read_published"
  on public.firm_specialization_custom for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.firms f
      where f.id = firm_id and f.status = 'published'
    )
  );
