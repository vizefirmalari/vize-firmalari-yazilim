-- Public-safe panel presence for firm CTA (anon cannot SELECT firm_panel_members).
-- Used by getFirms / getFirmBySlug via RPC; returns only firm ids / boolean, no PII.

create or replace function public.published_firm_ids_with_active_panel()
returns table (firm_id uuid)
language sql
security definer
set search_path = public
stable
as $$
  select distinct fm.firm_id
  from public.firm_panel_members fm
  inner join public.firms f on f.id = fm.firm_id and f.status = 'published'
  where fm.status = 'active';
$$;

comment on function public.published_firm_ids_with_active_panel() is
  'Yayında firmalar içinde en az bir aktif panel üyesi olan firma id listesi; liste CTA için.';

revoke all on function public.published_firm_ids_with_active_panel() from public;
grant execute on function public.published_firm_ids_with_active_panel() to anon, authenticated;

create or replace function public.firm_has_active_panel_member(p_firm_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.firm_panel_members fm
    where fm.firm_id = p_firm_id
      and fm.status = 'active'
  );
$$;

comment on function public.firm_has_active_panel_member(uuid) is
  'Firmanın en az bir aktif panel üyesi var mı; detay sayfası CTA için.';

revoke all on function public.firm_has_active_panel_member(uuid) from public;
grant execute on function public.firm_has_active_panel_member(uuid) to anon, authenticated;
