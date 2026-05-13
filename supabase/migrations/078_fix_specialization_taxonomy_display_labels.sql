-- Taxonomy etiketleri: `specialization_taxonomy_label_lower_key` (lower(trim(label))) çakışmasını önle.
-- Aynı görünen etiket başka slug’da varsa önce o satırı ayırt edici metne çekeriz; sonra kanonik slug’ı düzeltiriz.

-- Yatırım Danışmanlığı
update public.specialization_taxonomy
set label = left('Yatırım Danışmanlığı — ' || slug, 120)
where slug <> 'yatirim-danismanligi'
  and lower(trim(label)) = lower(trim('Yatırım Danışmanlığı'));

update public.specialization_taxonomy
set label = 'Yatırım Danışmanlığı'
where slug = 'yatirim-danismanligi';

-- İş Kurma Danışmanlığı
update public.specialization_taxonomy
set label = left('İş Kurma Danışmanlığı — ' || slug, 120)
where slug <> 'is-kurma-danismanligi'
  and lower(trim(label)) = lower(trim('İş Kurma Danışmanlığı'));

update public.specialization_taxonomy
set label = 'İş Kurma Danışmanlığı'
where slug = 'is-kurma-danismanligi';

-- İş Geliştirme Danışmanlığı
update public.specialization_taxonomy
set label = left('İş Geliştirme Danışmanlığı — ' || slug, 120)
where slug <> 'is-gelistirme-danismanligi'
  and lower(trim(label)) = lower(trim('İş Geliştirme Danışmanlığı'));

update public.specialization_taxonomy
set label = 'İş Geliştirme Danışmanlığı'
where slug = 'is-gelistirme-danismanligi';
