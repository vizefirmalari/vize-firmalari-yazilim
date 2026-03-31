-- Uzmanlık etiketlerini merkezi yeni adlara normalize et (mevcut firmalar için backfill).
-- Internal boolean anahtarlar korunur; sadece kullanıcıya görünen metin array değerleri düzeltilir.

do $$
begin
  update public.firms
  set
    services = (
      select coalesce(
        array_agg(
          case
            when x.val = 'ABD Vize Uzmanı' then 'ABD Vizesi'
            when x.val = 'Öğrenci Desteği' then 'Öğrenci Vizesi'
            else x.val
          end
          order by x.ord
        ),
        '{}'::text[]
      )
      from unnest(coalesce(public.firms.services, '{}'::text[])) with ordinality as x(val, ord)
    ),
    sub_services = (
      select coalesce(
        array_agg(
          case
            when x.val = 'ABD Vize Uzmanı' then 'ABD Vizesi'
            when x.val = 'Öğrenci Desteği' then 'Öğrenci Vizesi'
            else x.val
          end
          order by x.ord
        ),
        '{}'::text[]
      )
      from unnest(coalesce(public.firms.sub_services, '{}'::text[])) with ordinality as x(val, ord)
    ),
    custom_services = (
      select coalesce(
        array_agg(
          case
            when x.val = 'ABD Vize Uzmanı' then 'ABD Vizesi'
            when x.val = 'Öğrenci Desteği' then 'Öğrenci Vizesi'
            else x.val
          end
          order by x.ord
        ),
        '{}'::text[]
      )
      from unnest(coalesce(public.firms.custom_services, '{}'::text[])) with ordinality as x(val, ord)
    ),
    main_services = (
      select coalesce(
        array_agg(
          case
            when x.val = 'ABD Vize Uzmanı' then 'ABD Vizesi'
            when x.val = 'Öğrenci Desteği' then 'Öğrenci Vizesi'
            else x.val
          end
          order by x.ord
        ),
        '{}'::text[]
      )
      from unnest(coalesce(public.firms.main_services, '{}'::text[])) with ordinality as x(val, ord)
    )
  where
    coalesce(public.firms.services, '{}'::text[]) @> array['ABD Vize Uzmanı']::text[]
    or coalesce(public.firms.services, '{}'::text[]) @> array['Öğrenci Desteği']::text[]
    or coalesce(public.firms.sub_services, '{}'::text[]) @> array['ABD Vize Uzmanı']::text[]
    or coalesce(public.firms.sub_services, '{}'::text[]) @> array['Öğrenci Desteği']::text[]
    or coalesce(public.firms.custom_services, '{}'::text[]) @> array['ABD Vize Uzmanı']::text[]
    or coalesce(public.firms.custom_services, '{}'::text[]) @> array['Öğrenci Desteği']::text[]
    or coalesce(public.firms.main_services, '{}'::text[]) @> array['ABD Vize Uzmanı']::text[]
    or coalesce(public.firms.main_services, '{}'::text[]) @> array['Öğrenci Desteği']::text[];
end $$;
