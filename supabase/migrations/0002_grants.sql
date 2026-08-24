-- Standard Supabase role grants for tables created outside the dashboard UI.
-- RLS policies from 0001_init.sql still fully control row-level access;
-- these grants just allow anon/authenticated/service_role to reach the
-- tables at all via PostgREST.

grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on public.courses to anon, authenticated, service_role;
grant select, insert, update, delete on public.students to anon, authenticated, service_role;
grant select, insert, update, delete on public.student_id_counters to anon, authenticated, service_role;
grant select, insert, update, delete on public.admins to anon, authenticated, service_role;

grant usage, select on all sequences in schema public to anon, authenticated, service_role;

alter default privileges in schema public
  grant select, insert, update, delete on tables to anon, authenticated, service_role;

alter default privileges in schema public
  grant usage, select on sequences to anon, authenticated, service_role;
