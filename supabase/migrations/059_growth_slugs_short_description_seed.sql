-- İşini Büyüt: slug + kategori is_active + short_description + varsayılan hizmet seed
-- Önkoşul: 057_growth_services_commerce.sql

-- ---------------------------------------------------------------------------
-- Kategoriler: slug, is_active
-- ---------------------------------------------------------------------------
alter table public.growth_service_categories
  add column if not exists slug text,
  add column if not exists is_active boolean;

update public.growth_service_categories
set is_active = true
where is_active is null;

alter table public.growth_service_categories
  alter column is_active set default true;

alter table public.growth_service_categories
  alter column is_active set not null;

update public.growth_service_categories c
set slug = u.slug
from (
  values
    ('Reklam & Görünürlük', 'reklam-gorunurluk'),
    ('Yapay Zeka & Otomasyon', 'yapay-zeka-otomasyon'),
    ('Web & Yazılım', 'web-yazilim'),
    ('Müşteri Yönetimi & Sistemler', 'musteri-yonetimi-sistemler'),
    ('İçerik & Medya', 'icerik-medya')
) as u(name, slug)
where c.name = u.name;

update public.growth_service_categories
set slug = 'kategori-' || substr(replace(id::text, '-', ''), 1, 12)
where slug is null or btrim(slug) = '';

create unique index if not exists growth_service_categories_slug_uidx
  on public.growth_service_categories (slug);

alter table public.growth_service_categories
  alter column slug set not null;

comment on column public.growth_service_categories.slug is 'URL ve seed eşlemesi için benzersiz anahtar.';
comment on column public.growth_service_categories.is_active is 'Pasif kategoriler firma panelinde listelenmez.';

-- ---------------------------------------------------------------------------
-- Hizmetler: slug + description → short_description
-- ---------------------------------------------------------------------------
alter table public.growth_services
  add column if not exists slug text;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'growth_services'
      and column_name = 'description'
  ) then
    alter table public.growth_services rename column description to short_description;
  end if;
end $$;

comment on column public.growth_services.short_description is 'Kart ve özet metni (satış dili).';
comment on column public.growth_services.slug is 'Benzersiz hizmet anahtarı; seed ve idempotent kurulum için.';

update public.growth_services
set slug = 'x' || replace(id::text, '-', '')
where slug is null or btrim(slug) = '';

create unique index if not exists growth_services_slug_uidx
  on public.growth_services (slug);

alter table public.growth_services
  alter column slug set not null;

-- ---------------------------------------------------------------------------
-- Varsayılan hizmetler (slug çakışmazsa ekle)
-- ---------------------------------------------------------------------------

insert into public.growth_services (
  category_id, slug, title, short_description, long_description,
  setup_price, monthly_price, badge, is_featured, sort_order, is_active
)
select c.id, v.slug, v.title, v.short_desc, v.long_desc,
  v.setup_tl, v.monthly_tl, v.badge, v.is_featured, v.sort_order, true
from public.growth_service_categories c
cross join (
  values
    -- Reklam & Görünürlük
    ('reklam-gorunurluk', 'google-ads-yonetimi', 'Google Ads Yönetimi',
      'Arama ve görüntülü ağlarda doğru hedeflemeyle daha fazla nitelikli talep toplayın.',
      'Kampanya yapısı, teklif ve raporlama sizin adınıza yönetilir. Bütçe kontrolü ve sürekli iyileştirme odağı; sonuç garantisi verilmez.',
      6900, 4900, 'En çok tercih edilen', false, 10),
    ('reklam-gorunurluk', 'google-haritalar-reklam', 'Google Haritalar Reklam Yönetimi',
      'Yakınınızdaki aramalarda haritada öne çıkın; yön tarifi arayan müşterilere ulaşın.',
      'Konum bazlı reklamlarla işletmenizin keşfedilmesini kolaylaştırır. Kurulum ve performans takibi platform ekibiyle yürütülür.',
      4500, 2900, 'Önerilen', false, 20),
    ('reklam-gorunurluk', 'meta-reklam-yonetimi', 'Facebook + Instagram Reklam Yönetimi',
      '168.000+ kişilik topluluk ve platform trafiğiyle sosyal kanallarda hedefli erişim.',
      'Kreatif yönlendirme, kitle seçimi ve ölçümleme dahildir. Organik + ücretli erişim birlikte planlanır.',
      5900, 3900, 'En çok tercih edilen', false, 30),
    ('reklam-gorunurluk', 'platform-ici-reklam-one-cikarma', 'Platform İçi Reklam ve Öne Çıkarma',
      'Sitede öne çıkma ve sponsorlu yerleşimlerle niyeti yüksek ziyaretçilere ulaşın.',
      'Liste ve içerik sayfalarında görünürlüğünüzü artırır; kontenjan ve süre yönetim panelinden izlenir.',
      3900, 2400, 'Hızlı kurulum', false, 40),

    -- Yapay Zeka & Otomasyon
    ('yapay-zeka-otomasyon', 'web-ai-sohbet-robotu', 'Web Site Yapay Zeka Sohbet Robotu',
      '7/24 ziyaretçileri karşılayan, sık soruları yanıtlayan akıllı karşılama deneyimi.',
      'Markanıza uygun tonla web sitenizde anında yanıt verir; talepleri yapılandırılmış şekilde size iletir.',
      8900, 1900, 'Yeni', false, 10),
    ('yapay-zeka-otomasyon', 'whatsapp-ai-sohbet-robotu', 'WhatsApp Yapay Zeka Sohbet Robotu',
      'Yoğun yazışmalarda ilk yanıt kalitesini koruyun; ön eleme ve yönlendirme otomatik olsun.',
      'Mesajları sınıflandırır, hızlı yanıt verir; canlı desteğe geçiş noktaları net tanımlanır.',
      9900, 2400, 'En çok tercih edilen', false, 20),
    ('yapay-zeka-otomasyon', 'instagram-sohbet-robotu', 'Instagram Sohbet Robotu',
      'Hikâye ve gönderi altından gelen DM''lerde gecikme olmadan karşılık verin.',
      'Kampanya dönemlerinde DM yükünü hafifletir; bilgi ve randevu taleplerini düzenli akışa çevirir.',
      7500, 1900, 'Önerilen', false, 30),
    ('yapay-zeka-otomasyon', 'yapay-zeka-sesli-agent', 'Yapay Zeka Sesli Agent Sistemi',
      'Gelen aramaları profesyonel sesli asistanla karşılayan, talep toplayan hat yapısı.',
      'Mesai dışında bile güçlü ilk izlenim; senaryolar firmanıza göre uyarlanır.',
      12900, 3500, 'Yeni', false, 40),

    -- Web & Yazılım
    ('web-yazilim', 'web-sitesi-kurulumu', 'Web Site Kurulumu',
      'Güven veren, hızlı ve mobil uyumlu site; ziyaretçiyi iletişime ve başvuruya yönlendirir.',
      'Yapı, içerik mimarisi ve temel SEO düzeni birlikte planlanır; yayın sonrası sınırlı revizyon paketi.',
      24900, 1200, 'En çok tercih edilen', false, 10),
    ('web-yazilim', 'landing-page-kurulumu', 'Landing Page Kurulumu',
      'Tek kampanya veya teklif için yüksek odaklı, dönüşüm tasarımlı sayfa.',
      'Reklam trafiğini tek hedefe kilitlemek için sade akış, ölçüm ve form entegrasyonu.',
      9900, null, 'Hızlı kurulum', false, 20),
    ('web-yazilim', 'web-uygulama-gelistirme', 'Web Uygulama Geliştirme',
      'Başvuru, panel veya operasyon ihtiyacınıza özel tarayıcı tabanlı yazılım.',
      'Kapsam keşfi sonrası netleşir; güvenli oturum, rol bazlı erişim ve ölçeklenebilir mimari hedeflenir.',
      null, null, 'Önerilen', true, 30),

    -- Müşteri Yönetimi & Sistemler
    ('musteri-yonetimi-sistemler', 'crm-kurulumu', 'CRM Kurulumu',
      'Müşteri kayıtları, aşamalar ve görevlerin tek ekranda toplandığı ekip uyumlu yapı.',
      'Pipeline, hatırlatmalar ve raporlama ile satış disiplinini güçlendirir; mevcut araçlarla entegrasyon değerlendirilir.',
      14900, 2900, 'En çok tercih edilen', false, 10),
    ('musteri-yonetimi-sistemler', 'lead-yonetim-sistemi', 'Lead Yönetim Sistemi',
      'Form, mesaj ve reklam kaynaklı talepleri tek havuzda toplayıp önceliklendirin.',
      'Kaynak etiketleri ve hafif otomasyonlarla ilk temas süresini kısaltmanıza yardımcı olur.',
      8900, 1900, 'Önerilen', false, 20),
    ('musteri-yonetimi-sistemler', 'otomatik-takip-sistemi', 'Otomatik Takip Sistemi',
      'Yeni adaylara zamanlanmış hatırlatma ve bilgilendirme ile düzenli iletişim akışı.',
      'Onaylı şablonlarla e-posta veya mesaj kanallarında takip; sıcak fırsatların soğumasını azaltmaya yardımcı olur.',
      6500, 1200, 'Hızlı kurulum', false, 30),
    ('musteri-yonetimi-sistemler', 'api-webhook-n8n-otomasyon-kurulumu', 'API / Webhook / n8n Otomasyon Kurulumu',
      'Uygulamalarınızı birbirine bağlayan, tekrarlayan işleri azaltan güvenli otomasyon katmanı.',
      'Tetikleyici–aksiyon akışları, veri eşleme ve hata yönetimi birlikte kurulur; iş mantığınıza göre şekillenir.',
      7900, 1500, 'Yeni', false, 40),

    -- İçerik & Medya
    ('icerik-medya', 'yapay-zeka-video-olusturma', 'Yapay Zeka Video Oluşturma',
      'Tanıtım ve sosyal paylaşım için hızlı üretilen, markanıza uyumlu kısa videolar.',
      'Senaryo ve görsel stil birlikte belirlenir; revizyon hakları pakete göre tanımlanır.',
      3900, null, 'Yeni', false, 10),
    ('icerik-medya', 'sosyal-medya-icerik-paketi', 'Sosyal Medya İçerik Paketi',
      'Metin, görsel ve paylaşım önerileriyle kampanya dönemlerinde görünürlüğünüzü destekleyen set.',
      'Platform diline uygun içerik takvimi ve çağrı metinleri; onay akışı panel üzerinden yürütülür.',
      5500, 2200, 'Önerilen', false, 20),
    ('icerik-medya', 'tanitim-videosu-uretimi', 'Tanıtım Videosu Üretimi',
      'Markanızı anlatan profesyonel tonlu tanıtım videosu üretimi ve teslim formatları.',
      'Senaryo, çekim / montaj veya stok tabanlı üretim seçenekleri kapsamla netleşir.',
      7500, null, 'En çok tercih edilen', false, 30)
) as v(
  cat_slug, slug, title, short_desc, long_desc,
  setup_tl, monthly_tl, badge, is_featured, sort_order
)
where c.slug = v.cat_slug
  and not exists (select 1 from public.growth_services s where s.slug = v.slug);
