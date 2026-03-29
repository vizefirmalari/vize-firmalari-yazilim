-- VizeFirmalari: Firma paneli duyuruları + örnek firma kaydı
-- 011_firm_panel.sql sonrası uygulayın.

-- ---------------------------------------------------------------------------
-- Tüm firma panellerinde gösterilecek platform duyuruları
-- ---------------------------------------------------------------------------
create table if not exists public.firm_panel_announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  is_published boolean not null default true,
  sort_order int not null default 0,
  published_at timestamptz not null default now(),
  expires_at timestamptz null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);

create index if not exists firm_panel_announcements_published_idx
  on public.firm_panel_announcements (published_at desc)
  where is_published = true;

alter table public.firm_panel_announcements enable row level security;

create policy "firm_panel_announcements_select_firm_users"
  on public.firm_panel_announcements for select
  to authenticated
  using (
    is_published = true
    and (expires_at is null or expires_at > now())
    and exists (
      select 1 from public.firm_panel_members m
      where m.user_id = auth.uid() and m.status = 'active'
    )
  );

create policy "firm_panel_announcements_admin_all"
  on public.firm_panel_announcements for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Örnek firma: "Vize Firmaları" (slug çakışırsa atlanır)
-- ---------------------------------------------------------------------------
insert into public.firms (
  name,
  slug,
  description,
  trust_score,
  countries,
  services,
  status,
  short_description,
  brand_name
)
values (
  'Vize Firmaları',
  'vize-firmalari',
  'Vize danışmanlık sektöründe firmaları buluşturan ve dijital operasyon araçları sunan platform.',
  88,
  array['Türkiye', 'Schengen']::text[],
  array['Vize danışmanlığı', 'Platform']::text[],
  'published',
  'Firmalarınızı büyütün; tek panelden içerik, iletişim ve büyüme.',
  'Vize Firmaları'
)
on conflict (slug) do nothing;

insert into public.firm_panel_announcements (title, body, is_published, sort_order)
select
  'Platform duyurusu',
  'Yönetim panelinden yayınlanan duyurular tüm firma panellerinde burada görünür. Mesajlar, gelen formlar, reklam ve abonelik modülleri yakında aktif olacak.',
  true,
  0
where not exists (
  select 1 from public.firm_panel_announcements where title = 'Platform duyurusu'
);
