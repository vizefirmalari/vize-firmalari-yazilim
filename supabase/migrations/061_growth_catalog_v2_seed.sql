-- İşini Büyüt katalog v2: is_custom_price, package_includes, kategori isim/slug/sıra, güncel seed fiyatları ve paketler
-- Önkoşul: 059_growth_slugs_short_description_seed.sql

-- ---------------------------------------------------------------------------
-- Hizmet kolonları
-- ---------------------------------------------------------------------------
alter table public.growth_services
  add column if not exists is_custom_price boolean not null default false,
  add column if not exists package_includes text[] not null default '{}';

comment on column public.growth_services.is_custom_price is 'true ise vitrinde fiyat teklif üzerinden gösterilir.';
comment on column public.growth_services.package_includes is 'Paket kartlarında listelenecek kısa madde içerikleri.';

-- ---------------------------------------------------------------------------
-- Kategoriler: isim, slug, sıra, ikon
-- ---------------------------------------------------------------------------
update public.growth_service_categories
set name = 'Reklam & Müşteri Kazanımı', sort_order = 1, icon = '📢'
where slug = 'reklam-gorunurluk';

update public.growth_service_categories
set sort_order = 2
where slug = 'yapay-zeka-otomasyon';

update public.growth_service_categories
set sort_order = 3
where slug = 'web-yazilim';

update public.growth_service_categories
set sort_order = 4
where slug = 'icerik-medya';

update public.growth_service_categories
set
  name = 'Premium Sistemler',
  slug = 'premium-sistemler',
  icon = '📈',
  sort_order = 5
where slug = 'musteri-yonetimi-sistemler';

insert into public.growth_service_categories (name, icon, sort_order, slug, is_active)
select 'Akıllı Paketler', '🔥', 6, 'akilli-paketler', true
where not exists (select 1 from public.growth_service_categories c where c.slug = 'akilli-paketler');

-- ---------------------------------------------------------------------------
-- Mevcut hizmetleri yeni modele çek (slug ile)
-- ---------------------------------------------------------------------------
update public.growth_services
set
  title = 'Google Ads Yönetimi',
  short_description = 'Arama ve GDN ile nitelikli talep; kampanya yapısı ve raporlama yönetimi.',
  setup_price = 2500,
  monthly_price = 3500,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'google-ads-yonetimi';

update public.growth_services
set
  title = 'Google Haritalar Reklam Yönetimi',
  short_description = 'Yakın aramalarda haritada görünürlük; konum bazlı reklam kurulumu ve optimizasyon.',
  setup_price = 1500,
  monthly_price = 2500,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'google-haritalar-reklam';

update public.growth_services
set
  title = 'Facebook + Instagram Reklam Yönetimi',
  short_description = 'Meta ekosisteminde hedef kitle, kreatif ve ölçümleme ile sürdürülebilir talep.',
  setup_price = 2500,
  monthly_price = 3000,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'meta-reklam-yonetimi';

update public.growth_services
set is_active = false
where slug = 'platform-ici-reklam-one-cikarma';

update public.growth_services
set
  title = 'Web Site Chatbot',
  short_description = 'Web sitenizde 7/24 yanıt veren yapay zekâ sohbet; ön eleme ve yönlendirme.',
  setup_price = 2000,
  monthly_price = 1000,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'web-ai-sohbet-robotu';

update public.growth_services
set
  title = 'WhatsApp AI Bot',
  short_description = 'WhatsApp üzerinde otomatik karşılama ve akıllı yanıtlar; yoğun dönemlerde hız kazanın.',
  setup_price = 3500,
  monthly_price = 1500,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'whatsapp-ai-sohbet-robotu';

update public.growth_services
set
  title = 'Instagram DM Bot',
  short_description = 'DM ve hikâye yanıtlarında gecikmeyi azaltın; talepleri düzenli akışa çevirin.',
  setup_price = 2500,
  monthly_price = 1200,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'instagram-sohbet-robotu';

update public.growth_services
set
  title = 'Sesli AI Agent (Telefon)',
  short_description = 'Gelen aramaları sesli asistanla karşılayın; talep toplama ve yönlendirme.',
  setup_price = 5000,
  monthly_price = 2000,
  badge = 'Önerilen',
  is_custom_price = false,
  package_includes = '{}',
  is_featured = true
where slug = 'yapay-zeka-sesli-agent';

update public.growth_services
set is_featured = false
where slug = 'web-uygulama-gelistirme';

update public.growth_services
set
  title = 'Website Kurulumu',
  short_description = 'Hızlı, mobil uyumlu ve güven veren kurumsal site; iletişim ve başvuruya odaklı yapı.',
  setup_price = 5000,
  monthly_price = null,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'web-sitesi-kurulumu';

update public.growth_services
set
  title = 'Landing Page',
  short_description = 'Tek kampanya veya teklif için yüksek dönüşümlü, ölçümlü açılış sayfası.',
  setup_price = 3000,
  monthly_price = null,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'landing-page-kurulumu';

update public.growth_services
set
  title = 'Web Uygulama Geliştirme',
  short_description = 'Panel, başvuru veya operasyon ihtiyacınıza özel web yazılımı; kapsam keşif sonrası netleşir.',
  setup_price = null,
  monthly_price = null,
  is_custom_price = true,
  package_includes = '{}',
  badge = null
where slug = 'web-uygulama-gelistirme';

update public.growth_services
set
  title = 'Lead Generation Sistemi',
  short_description = 'Reklam ve form kaynaklı talepleri tek havuzda toplayıp önceliklendiren yapı.',
  setup_price = 1000,
  monthly_price = null,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'lead-yonetim-sistemi';

update public.growth_services
set
  title = 'CRM + Otomasyon Kurulumu',
  short_description = 'CRM pipeline, görevler ve temel otomasyonlarla satış disiplinini güçlendirin.',
  setup_price = 5000,
  monthly_price = 2000,
  is_custom_price = false,
  package_includes = '{}',
  is_featured = false
where slug = 'crm-kurulumu';

update public.growth_services
set is_active = false
where slug in (
  'otomatik-takip-sistemi',
  'api-webhook-n8n-otomasyon-kurulumu',
  'yapay-zeka-video-olusturma',
  'sosyal-medya-icerik-paketi',
  'tanitim-videosu-uretimi'
);

-- ---------------------------------------------------------------------------
-- Yeni hizmetler (slug yoksa ekle)
-- ---------------------------------------------------------------------------

insert into public.growth_services (
  category_id, slug, title, short_description, long_description,
  setup_price, monthly_price, is_custom_price, package_includes,
  badge, is_featured, sort_order, is_active
)
select c.id, v.slug, v.title, v.short_desc, v.long_desc,
  v.setup_tl, v.monthly_tl, v.is_custom, v.includes,
  v.badge, v.is_featured, v.sort_order, true
from public.growth_service_categories c
cross join (
  values
    (
      'premium-sistemler',
      'otomatik-musteri-toplama-funnel',
      'Otomatik Müşteri Toplama Funnel',
      'Ziyaretçiyi adım adım müşteriye dönüştüren akış; takip ve hatırlatma dahil.',
      'Form, mesaj ve reklam kaynaklarını birleştirir; onaylı şablonlarla sürtünmeyi azaltır.',
      4000::integer,
      1500::integer,
      false,
      array[]::text[],
      null::text,
      false,
      25
    )
) as v(
  cat_slug, slug, title, short_desc, long_desc,
  setup_tl, monthly_tl, is_custom, includes, badge, is_featured, sort_order
)
where c.slug = v.cat_slug
  and not exists (select 1 from public.growth_services s where s.slug = v.slug);

insert into public.growth_services (
  category_id, slug, title, short_description, long_description,
  setup_price, monthly_price, is_custom_price, package_includes,
  badge, is_featured, sort_order, is_active
)
select c.id, v.slug, v.title, v.short_desc, v.long_desc,
  v.setup_tl, v.monthly_tl, false, v.includes,
  v.badge, v.is_featured, v.sort_order, true
from public.growth_service_categories c
cross join (
  values
    (
      'icerik-medya',
      'ai-video-uretimi-10',
      'AI Video Üretimi (10 Video)',
      'Sosyal ve tanıtım için 10 adet yapay zekâ destekli kısa video üretimi.',
      'Stil ve ton markanıza göre ayarlanır; revizyon hakları pakete göre tanımlanır.',
      1500::integer,
      null::integer,
      array[]::text[],
      null::text,
      false,
      10
    ),
    (
      'icerik-medya',
      'ai-video-uretimi-30',
      'AI Video Üretimi (30 Video)',
      'Yüksek hacimli içerik ihtiyacı için 30 video; tutarlı görünüm ve seri üretim.',
      'Kampanya dönemlerinde görünürlüğü destekler; teslim formatları ihtiyaca göre planlanır.',
      3500::integer,
      null::integer,
      array[]::text[],
      null::text,
      false,
      20
    )
) as v(
  cat_slug, slug, title, short_desc, long_desc,
  setup_tl, monthly_tl, includes, badge, is_featured, sort_order
)
where c.slug = v.cat_slug
  and not exists (select 1 from public.growth_services s where s.slug = v.slug);

insert into public.growth_services (
  category_id, slug, title, short_description, long_description,
  setup_price, monthly_price, is_custom_price, package_includes,
  badge, is_featured, sort_order, is_active
)
select c.id, v.slug, v.title, v.short_desc, v.long_desc,
  v.setup_tl, v.monthly_tl, false, v.includes,
  v.badge, v.is_featured, v.sort_order, true
from public.growth_service_categories c
cross join (
  values
    (
      'akilli-paketler',
      'baslangic-paketi',
      'Başlangıç Paketi',
      'Dijital görünürlük için temel kurulum: site, WhatsApp botu ve harita reklamı bir arada.',
      'Tek sözleşmede birlikte planlanır; süre ve teslim kalemleri ekibinizle netleştirilir.',
      7500::integer,
      null::integer,
      array['Website', 'WhatsApp Bot', 'Google Maps']::text[],
      null::text,
      false,
      10
    ),
    (
      'akilli-paketler',
      'buyume-paketi',
      'Büyüme Paketi',
      'Trafik ve dönüşüm odağı: reklam, chatbot ve SEO ile büyüme ritmi.',
      'Kanallar birlikte ölçülür; aylık optimizasyon ve raporlama dahil edilir.',
      12500::integer,
      null::integer,
      array['Ads', 'Chatbot', 'SEO']::text[],
      null::text,
      false,
      20
    ),
    (
      'akilli-paketler',
      'premium-paket',
      'Premium Paket',
      'Kapsamlı dijital operasyon: tüm sistemler ve sesli AI agent ile uçtan uca destek.',
      'Kurumsal ölçekte koordinasyon; öncelikli destek ve yol haritası ile yürütülür.',
      20000::integer,
      null::integer,
      array['Tüm sistem', 'AI agent']::text[],
      null::text,
      true,
      30
    )
) as v(
  cat_slug, slug, title, short_desc, long_desc,
  setup_tl, monthly_tl, includes, badge, is_featured, sort_order
)
where c.slug = v.cat_slug
  and not exists (select 1 from public.growth_services s where s.slug = v.slug);
