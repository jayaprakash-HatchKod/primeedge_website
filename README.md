# PrimeEdge Software Institute

A premium course showcase and enrollment website for PrimeEdge Software Institute — built with
Next.js 15, Prisma, Supabase, and Razorpay. This is **not an LMS**; it's a marketing + enrollment
site. Once a student pays, the institute team manually follows up with class links (Google Meet,
Telegram) over email.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion
- **Backend:** Next.js Server Actions & Route Handlers
- **Database:** Supabase Postgres, accessed via Prisma ORM
- **Auth:** Supabase Auth (admin dashboard only — no student accounts)
- **Payments:** Razorpay Checkout + server-side signature verification
- **Deployment:** Vercel

## Project Structure

```
src/
  app/
    (site)/              Public marketing site (home, about, courses, contact, enroll)
    admin/                Admin login + dashboard (route-group protected by middleware)
    api/                 Route handlers: Razorpay orders/verify, CSV export
    actions/              Server actions (contact form, auth, course CRUD)
  components/
    site/                 Navbar, footer, forms shared across the public site
    home/                 Homepage sections (hero, testimonials, FAQ, etc.)
    admin/                Admin dashboard components
    shared/               Cross-cutting UI (course card, fade-in, section heading)
    ui/                   shadcn/ui primitives
  lib/
    data/                 Prisma read queries (courses, students)
    validations/          Zod schemas
    supabase/             Browser / server / admin Supabase clients + middleware helper
    prisma.ts, razorpay.ts, format.ts, auth.ts
prisma/
  schema.prisma           Prisma schema (mirrors the Supabase tables)
supabase/
  migrations/0001_init.sql  Tables, RLS policies, functions, storage buckets
  seed/seed.sql             Sample course catalog
```

## 1. Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (create one — see below)
- A [Razorpay](https://razorpay.com) account (test mode is fine for development)

## 2. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → **New Project**. Note the project's database
   password — you'll need it for the connection string.
2. In **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret, server-only)
3. In **Project Settings → Database → Connection string**, copy:
   - The **Transaction pooler** (port 6543) URI → `DATABASE_URL` (add `?pgbouncer=true`)
   - The **Session/Direct** connection (port 5432) URI → `DIRECT_URL`
4. Copy `.env.example` to `.env.local` and fill in all the values above.

## 3. Set up the database schema

Run the SQL migration against your Supabase project. Easiest path — paste the file contents into
the **SQL Editor** in the Supabase dashboard and run it:

```
supabase/migrations/0001_init.sql
```

This creates the `courses`, `students`, `student_id_counters`, and `admins` tables, sets up Row
Level Security policies, the `generate_student_id()` / `admin_dashboard_stats()` functions, and the
`course-thumbnails` / `course-videos` / `course-syllabus` storage buckets.

Then load sample courses (optional but recommended for local dev):

```
supabase/seed/seed.sql
```

Alternatively, if you have the [Supabase CLI](https://supabase.com/docs/guides/cli) linked to your
project:

```bash
supabase db push
psql "$DATABASE_URL" -f supabase/seed/seed.sql
```

### Generate the Prisma client

```bash
npx prisma generate
```

Prisma reads the same tables via `DATABASE_URL` / `DIRECT_URL` — no separate migration step is
needed since the SQL file already created everything. If you'd rather use Prisma Migrate as your
source of truth, run `npx prisma db pull` to sync the schema from an empty database instead of
running the SQL file.

## 4. Create your first admin user

Admin access is gated by an allow-list (the `admins` table), not just "any signed-in user."

1. In the Supabase dashboard, go to **Authentication → Users → Add user** and create an account
   with an email + password.
2. Copy the new user's UUID, then run in the SQL editor:
   ```sql
   insert into public.admins (user_id, email)
   values ('paste-user-uuid-here', 'admin@primeedge.in');
   ```
3. Sign in at `/admin/login` with that email + password.

## 5. Configure Razorpay

1. In the [Razorpay Dashboard](https://dashboard.razorpay.com) → **Settings → API Keys**, generate
   a test key pair.
2. Set `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` (server) and `NEXT_PUBLIC_RAZORPAY_KEY_ID` (same
   key ID, exposed to the client for Checkout) in `.env.local`.
3. Test payments using Razorpay's [test card / UPI details](https://razorpay.com/docs/payments/payments/test-card-upi-details/).

## 6. Run the app

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Until the environment variables above are set, course/student pages
render empty states rather than crashing (see `lib/data/*`), so you can preview the UI immediately
and wire up the backend when ready.

## How enrollment + payment works

1. Student fills the enrollment form at `/enroll` → `POST /api/orders` creates a Razorpay order.
2. Razorpay Checkout opens client-side; on success, the client posts the payment response plus the
   enrollment details to `POST /api/payments/verify`.
3. The server verifies the HMAC signature, re-fetches the order from Razorpay to confirm the
   amount actually charged, then — only on success — generates a sequential Student ID
   (`PE-<year>-<seq>`, via the atomic `student_id_counters` table) and writes the `students` row.
4. The student is redirected to `/enrollment/success?paymentId=...`, which looks up the record
   server-side and displays the Student ID, course, and payment ID.

No student row is ever created for an abandoned or failed checkout — only confirmed payments reach
the database.

## Admin dashboard

`/admin` (behind Supabase Auth + the `admins` allow-list):

- **Overview** — total students, revenue, course counts, recent enrollments
- **Courses** — create/edit/delete courses; upload thumbnails, demo videos, and syllabus PDFs
  directly to Supabase Storage (or paste an existing URL, e.g. a YouTube embed link)
- **Students** — search/filter by course or payment status, export the current view to CSV
- **Payments** — read-only ledger of every transaction

## Deployment (Vercel)

1. Push this repo to GitHub and import it in Vercel.
2. Add all variables from `.env.example` to the Vercel project's Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (used for metadata, sitemap, and Open
   Graph tags).
4. Deploy. If you add a `postinstall` script, keep it to `prisma generate` only — never run
   destructive migrations automatically on deploy.

## Notes

- The contact form (`/contact`) validates and logs enquiries server-side; wire in an email
  provider (e.g. Resend) in `src/app/actions/contact.ts` when you're ready to receive them by
  email instead of console logs.
- Demo videos are rendered as `<iframe>` embeds — store a full embeddable URL (e.g.
  `https://www.youtube.com/embed/VIDEO_ID`), not a regular watch link.
