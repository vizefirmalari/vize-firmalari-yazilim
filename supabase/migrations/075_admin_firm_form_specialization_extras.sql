-- Firma formu «Ek uzmanlık» panel sırasında kullanılan ek taxonomy satırları (mevcut projelerde yoksa eklenir).

insert into public.specialization_taxonomy (slug, label, affects_corporate_score, is_active, sort_order)
values
  ('vatandaslik', 'Vatandaşlık', false, true, 1995),
  ('green-card-basvurulari', 'Green Card Başvuruları', false, true, 3065),
  ('turizm-ve-seyahat', 'Turizm ve Seyahat', false, true, 8085)
on conflict (slug) do nothing;
