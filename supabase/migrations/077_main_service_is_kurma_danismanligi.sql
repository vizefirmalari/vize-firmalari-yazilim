-- Ana hizmet picklist: «İş Kurma Danışmanlığı» ana hizmet olarak (taxonomy ile ayrı alan).

insert into public.main_service_categories (name, slug, sort_order, is_active)
values ('İş Kurma Danışmanlığı', 'is-kurma-danismanligi-ms', 695, true)
on conflict (name) do update set
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;
