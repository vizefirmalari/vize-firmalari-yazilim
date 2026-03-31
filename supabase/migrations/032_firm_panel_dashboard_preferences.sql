-- Firma paneli dashboard tercihleri (kullanici bazli hafiza)

create table if not exists public.firm_panel_dashboard_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  firm_id uuid not null references public.firms(id) on delete cascade,
  hidden_module_ids text[] not null default '{}'::text[],
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique(user_id, firm_id)
);

alter table public.firm_panel_dashboard_preferences enable row level security;

drop policy if exists "firm_panel_dashboard_preferences_select_own" on public.firm_panel_dashboard_preferences;
create policy "firm_panel_dashboard_preferences_select_own"
on public.firm_panel_dashboard_preferences
for select
to authenticated
using (
  user_id = auth.uid()
  and exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);

drop policy if exists "firm_panel_dashboard_preferences_insert_own" on public.firm_panel_dashboard_preferences;
create policy "firm_panel_dashboard_preferences_insert_own"
on public.firm_panel_dashboard_preferences
for insert
to authenticated
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);

drop policy if exists "firm_panel_dashboard_preferences_update_own" on public.firm_panel_dashboard_preferences;
create policy "firm_panel_dashboard_preferences_update_own"
on public.firm_panel_dashboard_preferences
for update
to authenticated
using (
  user_id = auth.uid()
  and exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
)
with check (
  user_id = auth.uid()
  and exists (
    select 1
    from public.firm_panel_members m
    where m.firm_id = firm_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);
