-- PrimeEdge Software Institute — Projects (sample final-year projects) + leads
-- Run via `supabase db push` or the Supabase SQL editor.
-- Mirrors prisma/schema.prisma additions (Project, ProjectLead).

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.projects (
  id          text primary key default 'prj_' || replace(gen_random_uuid()::text, '-', ''),
  title       text not null,
  slug        text not null unique,
  description text not null,
  tech_stack  text[] not null default '{}',
  category    text,
  thumbnail   text,
  demo_link   text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists projects_is_active_idx on public.projects (is_active);

create table if not exists public.project_leads (
  id         text primary key default 'lead_' || replace(gen_random_uuid()::text, '-', ''),
  name       text not null,
  email      text not null,
  mobile     text not null,
  college    text,
  branch     text,
  project_id text not null references public.projects (id),
  created_at timestamptz not null default now()
);

create index if not exists project_leads_project_id_idx on public.project_leads (project_id);
create index if not exists project_leads_created_at_idx on public.project_leads (created_at desc);

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.projects enable row level security;
alter table public.project_leads enable row level security;

-- Projects: anyone can read active projects; only admins can write.
create policy "Public can view active projects"
  on public.projects for select
  to anon, authenticated
  using (is_active = true);

create policy "Admins can view all projects"
  on public.projects for select
  to authenticated
  using (public.is_admin());

create policy "Admins can insert projects"
  on public.projects for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update projects"
  on public.projects for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete projects"
  on public.projects for delete
  to authenticated
  using (public.is_admin());

-- Project leads: no public read access (PII). Only admins may read.
-- Lead inserts happen via the server (direct DB connection), bypassing RLS.
create policy "Admins can view project leads"
  on public.project_leads for select
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------

grant select, insert, update, delete on public.projects to anon, authenticated, service_role;
grant select, insert, update, delete on public.project_leads to anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Storage: project thumbnails reuse the existing course-thumbnails bucket
-- and its policies (see 0001_init.sql) — no new bucket needed.
-- ---------------------------------------------------------------------------
