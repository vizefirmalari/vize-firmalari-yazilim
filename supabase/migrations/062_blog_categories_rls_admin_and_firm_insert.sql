-- blog_categories: admin CRUD + aktif firma paneli üyesi INSERT
-- Önceden yalnızca public SELECT (is_active) vardı; admin/yönetim ve firma içerik akışı için yazma politikaları eklendi.

drop policy if exists "blog_categories_admin_all" on public.blog_categories;
create policy "blog_categories_admin_all"
on public.blog_categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "blog_categories_insert_firm_member" on public.blog_categories;
create policy "blog_categories_insert_firm_member"
on public.blog_categories
for insert
to authenticated
with check (
  is_active = true
  and exists (
    select 1
    from public.firm_panel_members m
    where m.user_id = auth.uid()
      and m.status = 'active'
  )
);
