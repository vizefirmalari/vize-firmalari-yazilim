-- Ana hizmet picklist: panel «Ana hizmet kategorileri» sırasında kullanılan ek kalemler (firma satırına dokunmaz).

insert into public.main_service_categories (name, slug, sort_order, is_active)
values
  ('Startup Vizesi', 'startup-vizesi', 670, true),
  ('Girişimci Vizesi', 'girisimci-vizesi', 680, true),
  ('Freelancer Vizesi', 'freelancer-vizesi', 690, true),
  ('Yurt Dışı Kültür Turları', 'yurt-disi-kultur-turlari', 665, true)
on conflict (name) do update set
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

-- Yönetim paneli: Yunanistan Golden Visa varsayılan olarak kurumsallık uzmanlık tavanına dahil (taxonomy bayrağı).
update public.specialization_taxonomy
set affects_corporate_score = true
where slug = 'yunanistan-golden-visa';
