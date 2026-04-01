-- Security fix: enable RLS for platform_social_metrics

alter table public.platform_social_metrics enable row level security;

drop policy if exists "platform_social_metrics_public_read_active" on public.platform_social_metrics;
create policy "platform_social_metrics_public_read_active"
on public.platform_social_metrics
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "platform_social_metrics_admin_all" on public.platform_social_metrics;
create policy "platform_social_metrics_admin_all"
on public.platform_social_metrics
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

