-- Ek uzmanlık: turizm ile ilişkili ayrı satır (panel sabit sırasıyla uyumlu).

insert into public.specialization_taxonomy (slug, label, affects_corporate_score, is_active, sort_order)
values
  ('tur-organizasyonlari', 'Tur Organizasyonları', false, true, 8090)
on conflict (slug) do nothing;
