-- PrimeEdge Software Institute — capture university / college / branch at enrollment
-- Run via `supabase db push` or the Supabase SQL editor.
-- Mirrors prisma/schema.prisma additions on the Student model.

alter table public.students add column if not exists university text;
alter table public.students add column if not exists college text;
alter table public.students add column if not exists branch text;
