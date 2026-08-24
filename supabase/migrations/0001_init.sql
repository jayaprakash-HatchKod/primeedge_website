-- PrimeEdge Software Institute — initial schema
-- Run via `supabase db push` or the Supabase SQL editor.
-- Mirrors prisma/schema.prisma (Prisma is the app-side ORM; this file owns
-- RLS, storage buckets, and Postgres functions/triggers).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.courses (
  id             text primary key default 'crs_' || replace(gen_random_uuid()::text, '-', ''),
  title          text not null,
  slug           text not null unique,
  description    text not null,
  highlights     text[] not null default '{}',
  duration       text not null,
  price          integer not null check (price >= 0),
  thumbnail      text,
  demo_video_1   text,
  demo_video_2   text,
  syllabus_pdf   text,
  trainer_name   text,
  trainer_bio    text,
  trainer_avatar text,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists courses_is_active_idx on public.courses (is_active);

create table if not exists public.students (
  id                text primary key default 'stu_' || replace(gen_random_uuid()::text, '-', ''),
  student_id        text not null unique,
  name              text not null,
  email             text not null,
  mobile            text not null,
  city              text not null,
  qualification     text,
  course_id         text not null references public.courses (id),
  razorpay_order_id text,
  payment_id        text,
  payment_status    text not null default 'pending' check (payment_status in ('pending', 'success', 'failed')),
  amount            integer,
  created_at        timestamptz not null default now()
);

create index if not exists students_course_id_idx on public.students (course_id);
create index if not exists students_payment_status_idx on public.students (payment_status);
create index if not exists students_created_at_idx on public.students (created_at desc);

-- Backs atomic per-year sequential Student ID generation, e.g. PE-2026-001
create table if not exists public.student_id_counters (
  year        integer primary key,
  last_number integer not null default 0
);

-- Allowlist of Supabase Auth users who may access the admin dashboard.
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Functions & triggers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
  before update on public.courses
  for each row
  execute function public.set_updated_at();

-- Atomically issues the next Student ID for the given year: PE-<year>-<seq>
create or replace function public.generate_student_id(p_year integer default extract(year from now())::integer)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_next integer;
begin
  insert into public.student_id_counters (year, last_number)
  values (p_year, 1)
  on conflict (year)
  do update set last_number = public.student_id_counters.last_number + 1
  returning last_number into v_next;

  return 'PE-' || p_year || '-' || lpad(v_next::text, 3, '0');
end;
$$;

-- True if the current authenticated user is an allow-listed admin.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

-- Dashboard aggregate: totals for the admin overview page.
create or replace function public.admin_dashboard_stats()
returns table (
  total_students bigint,
  total_revenue bigint,
  total_courses bigint,
  active_courses bigint
)
language sql
security definer
set search_path = public
stable
as $$
  select
    (select count(*) from public.students where payment_status = 'success'),
    (select coalesce(sum(amount), 0) from public.students where payment_status = 'success'),
    (select count(*) from public.courses),
    (select count(*) from public.courses where is_active = true);
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.courses enable row level security;
alter table public.students enable row level security;
alter table public.student_id_counters enable row level security;
alter table public.admins enable row level security;

-- Courses: anyone can read active courses; only admins can write.
create policy "Public can view active courses"
  on public.courses for select
  to anon, authenticated
  using (is_active = true);

create policy "Admins can view all courses"
  on public.courses for select
  to authenticated
  using (public.is_admin());

create policy "Admins can insert courses"
  on public.courses for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update courses"
  on public.courses for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete courses"
  on public.courses for delete
  to authenticated
  using (public.is_admin());

-- Students: no public read access (PII). Only admins may read/write directly.
-- Enrollment inserts happen via the server (service role), bypassing RLS.
create policy "Admins can view students"
  on public.students for select
  to authenticated
  using (public.is_admin());

create policy "Admins can update students"
  on public.students for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Counters: never exposed directly; only touched via the security-definer function.
create policy "Admins can view counters"
  on public.student_id_counters for select
  to authenticated
  using (public.is_admin());

-- Admins table: an admin can see the allowlist, nobody can self-enroll into it.
create policy "Admins can view admins"
  on public.admins for select
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage buckets (thumbnails, demo videos, syllabus PDFs)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values
  ('course-thumbnails', 'course-thumbnails', true),
  ('course-videos', 'course-videos', true),
  ('course-syllabus', 'course-syllabus', true)
on conflict (id) do nothing;

create policy "Public can view course assets"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('course-thumbnails', 'course-videos', 'course-syllabus'));

create policy "Admins can upload course assets"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id in ('course-thumbnails', 'course-videos', 'course-syllabus')
    and public.is_admin()
  );

create policy "Admins can update course assets"
  on storage.objects for update
  to authenticated
  using (
    bucket_id in ('course-thumbnails', 'course-videos', 'course-syllabus')
    and public.is_admin()
  );

create policy "Admins can delete course assets"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id in ('course-thumbnails', 'course-videos', 'course-syllabus')
    and public.is_admin()
  );
