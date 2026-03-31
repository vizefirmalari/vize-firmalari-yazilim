-- Blog kategorileri + FAQ alanı

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order int not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_categories enable row level security;

drop policy if exists "blog_categories_public_read" on public.blog_categories;
create policy "blog_categories_public_read"
on public.blog_categories
for select
to anon, authenticated
using (is_active = true);

insert into public.blog_categories (name, slug, sort_order, is_active)
values
  ('Schengen Vizesi', 'schengen-vizesi', 1, true),
  ('Çalışma Vizesi', 'calisma-vizesi', 2, true),
  ('Öğrenci Vizesi', 'ogrenci-vizesi', 3, true),
  ('Turistik Vize', 'turistik-vize', 4, true),
  ('Aile Birleşimi', 'aile-birlesimi', 5, true),
  ('Oturum İzni', 'oturum-izni', 6, true),
  ('Vize Reddi', 'vize-reddi', 7, true),
  ('Vize Başvuru Rehberi', 'vize-basvuru-rehberi', 8, true),
  ('Yurtdışı İş İlanları', 'yurtdisi-is-ilanlari', 9, true),
  ('Maaş ve Yaşam Maliyeti', 'maas-ve-yasam-maliyeti', 10, true),
  ('Ülke Rehberleri', 'ulke-rehberleri', 11, true),
  ('Evrak Hazırlama', 'evrak-hazirlama', 12, true),
  ('Randevu Süreçleri', 'randevu-surecleri', 13, true),
  ('Konsolosluk İşlemleri', 'konsolosluk-islemleri', 14, true),
  ('Dil Şartları', 'dil-sartlari', 15, true),
  ('Sağlık Sigortası', 'saglik-sigortasi', 16, true),
  ('Pasaport İşlemleri', 'pasaport-islemleri', 17, true),
  ('Göçmenlik Süreçleri', 'gocmenlik-surecleri', 18, true),
  ('Yurtdışı Eğitim', 'yurtdisi-egitim', 19, true),
  ('Genel Bilgilendirme', 'genel-bilgilendirme', 20, true)
on conflict (slug) do update
set
  name = excluded.name,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

alter table public.firm_blog_posts
  add column if not exists category_id uuid references public.blog_categories(id) on delete set null;

alter table public.firm_blog_posts
  add column if not exists faq_items jsonb not null default '[]'::jsonb;

alter table public.firm_blog_posts
  add column if not exists faq_schema_json jsonb;

create index if not exists firm_blog_posts_category_idx
  on public.firm_blog_posts (category_id);
