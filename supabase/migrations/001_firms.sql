-- VizeFirmalari: firms tablosu + public okuma + örnek veri
-- Supabase SQL Editor veya CLI ile uygulayın.

create table if not exists public.firms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  description text,
  trust_score int not null check (trust_score >= 0 and trust_score <= 100),
  countries text[] not null default '{}',
  services text[] not null default '{}',
  phone text,
  whatsapp text,
  email text,
  website text,
  instagram text,
  created_at timestamptz not null default now()
);

create index if not exists firms_trust_score_idx on public.firms (trust_score desc);
create index if not exists firms_slug_idx on public.firms (slug);

alter table public.firms enable row level security;

create policy "Firms are viewable by everyone"
  on public.firms
  for select
  to anon, authenticated
  using (true);

-- İsteğe bağlı: yalnızca servis hesabı / admin yazacaksa ayrı policy ekleyin.

insert into public.firms (
  name, slug, logo_url, description, trust_score, countries, services,
  phone, whatsapp, email, website, instagram
) values
(
  'Deneme 1',
  'deneme-1',
  null,
  'Avrupa ve Schengen vize süreçlerinde deneyimli ekibiyle güvenilir danışmanlık sunan örnek bir firmadır.',
  85,
  array['Almanya','Fransa','İtalya']::text[],
  array['Vize İşlemleri']::text[],
  '+90 212 555 01 01',
  '+905551112233',
  'info@deneme1.example.com',
  'https://example.com',
  'https://instagram.com/vizefirmalari'
),
(
  'Deneme 2',
  'deneme-2',
  null,
  'Kuzey Amerika oturum ve göç süreçlerinde uçtan uca destek sağlayan profesyonel bir danışmanlık firmasıdır.',
  72,
  array['Amerika','Kanada']::text[],
  array['Oturum']::text[],
  '+90 216 555 02 02',
  '+905559998877',
  'iletisim@deneme2.example.com',
  'https://example.org',
  null
)
on conflict (slug) do nothing;

-- Realtime: Table Editor → firms → Replication etkin VEYA:
-- alter publication supabase_realtime add table public.firms;
