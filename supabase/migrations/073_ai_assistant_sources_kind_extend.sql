-- ===========================================================================
--  073_ai_assistant_sources_kind_extend.sql
--  ===========================================================================
--  Worker (`ai-assistant-worker`) ham OpenAI yanıtından çıkardığı kaynakları
--  daha hassas sınıflandırıyor:
--
--    • `government`         → resmi devlet portalı (.gov, .gov.tr, BAMF, IRCC…)
--    • `embassy`            → konsolosluk / büyükelçilik / dışişleri
--    • `academic`           → resmi üniversite / akademik (.edu, .ac.tr, .ac.uk)
--    • `application_center` → yetkili başvuru merkezi (VFS, iDATA, TLScontact…)
--    • `news`               → kurumsal haber kaynağı
--    • `firm_website`       → vize danışmanlık firma web sitesi
--    • `web`                → genel güvenilir web kaynağı (fallback)
--
--  Önceki constraint yalnız `government, embassy, official_org, news,
--  firm_website, web` değerlerine izin veriyordu; yeni `academic` ve
--  `application_center` insert denemeleri "ai_sources_kind_check" hatasıyla
--  reddedildi. Bu migration constraint'i drop edip genişletilmiş haliyle
--  yeniden oluşturur ve geri uyumluluk için eski `official_org` değerlerini
--  yeni `application_center` etiketine taşır.
--
--  Idempotent: tekrar tekrar çalıştırılabilir.
-- ===========================================================================

-- 1) Eski `official_org` değerlerini yeni canonical etikete taşı.
--    (Constraint hâlâ eski set olduğu için bu update şu an güvenle çalışır.)
update public.ai_assistant_sources
set source_kind = 'application_center'
where source_kind = 'official_org';

-- 2) Constraint adı sabit; varsa düşür.
do $$
begin
  if exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sources'::regclass
      and conname  = 'ai_sources_kind_check'
  ) then
    alter table public.ai_assistant_sources
      drop constraint ai_sources_kind_check;
  end if;
end$$;

-- 3) Genişletilmiş constraint'i yeniden ekle.
--    `not valid` → `validate` deseniyle büyük tablolarda kilitsiz çalışır.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.ai_assistant_sources'::regclass
      and conname  = 'ai_sources_kind_check'
  ) then
    alter table public.ai_assistant_sources
      add constraint ai_sources_kind_check
      check (source_kind in (
        'government',
        'embassy',
        'academic',
        'application_center',
        'news',
        'firm_website',
        'web'
      )) not valid;
    alter table public.ai_assistant_sources validate constraint ai_sources_kind_check;
  end if;
end$$;
