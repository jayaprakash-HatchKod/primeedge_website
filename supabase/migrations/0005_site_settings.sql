-- PrimeEdge Software Institute — site-wide editable settings (hero video)
-- Run via `supabase db push` or the Supabase SQL editor.
-- Single-row table, always keyed 'site'. Mirrors prisma/schema.prisma's SiteSetting model.

create table if not exists public.site_settings (
  id             text primary key default 'site',
  hero_video_url text,
  updated_at     timestamptz not null default now()
);

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row
  execute function public.set_updated_at();

insert into public.site_settings (id) values ('site') on conflict (id) do nothing;

alter table public.site_settings enable row level security;

create policy "Public can view site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Admins can update site settings"
  on public.site_settings for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant select, insert, update, delete on public.site_settings to anon, authenticated, service_role;

-- Hero video reuses the existing course-videos bucket (see 0001_init.sql) —
-- no new storage bucket needed.
