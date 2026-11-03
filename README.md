# Vivance Choir Website

A choir website built with Next.js (App Router), Tailwind CSS and Prisma + SQLite, with a simple built-in CMS.

## Features

**Public website**

- Home page with hero, upcoming events and next schedule items
- About page (text editable in the CMS)
- Schedule of rehearsals, services and performances, grouped by month
- Upcoming events, past events archive (grouped by year) and event detail pages with photo galleries
- Booking request form (weddings, services, concerts, ...)
- Contact / inquiry form
- Basic spam protection (honeypot field) and server-side validation (Zod)

**Admin CMS** at `/admin`

- Dashboard with new inquiries, pending bookings and upcoming items
- Events: create, edit, delete, publish/unpublish, cover image and gallery uploads
- Schedule: create, edit, delete
- Inquiries: filter by status, read, mark replied/archived, reply by email, delete
- Bookings: filter by status, confirm/decline/cancel, internal notes, reply by email, delete
- Site content: choir name, home/about text, contact details, social links

## Getting started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env        # then edit the values (see below)
npm run db:migrate          # creates prisma/dev.db
npm run db:seed             # optional: sample events and schedule
npm run dev
```

Open http://localhost:3000 for the website and http://localhost:3000/admin for the CMS.

### Admin login

Set `ADMIN_EMAIL` and a bcrypt hash of your password in `.env`:

```bash
npm run hash-password -- "your-strong-password"
```

Copy the printed `ADMIN_PASSWORD_HASH=...` line into `.env`. The `$` characters must stay escaped as `\$`, because Next.js expands `$VAR` references in `.env` files.

For quick local testing you can instead leave `ADMIN_PASSWORD_HASH` empty and set `ADMIN_PASSWORD` in plain text. Do not do this in production.

`SESSION_SECRET` must be a random string of at least 32 characters:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build / server (`build` also applies pending migrations) |
| `npm run db:migrate` | Create/apply migrations in development |
| `npm run db:seed` | Reset events and schedule to sample data |
| `npm run db:studio` | Browse the database with Prisma Studio |
| `npm run hash-password` | Generate an admin password hash |

## Project structure

```
app/
  (site)/            public pages (home, about, schedule, events, booking, contact)
  admin/login/       admin login page
  admin/(panel)/     protected admin CMS pages
  actions/           server actions (public forms, admin CRUD, auth)
  media/[file]/      serves uploaded images
components/          UI, public site, form and admin components
lib/                 database client, auth/session, validation, content, helpers
prisma/              schema, migrations, seed script
middleware.ts        protects /admin routes
```

## Notes

- Uploaded images are stored in `public/uploads/` and served through `/media/<file>`. On hosts with an ephemeral filesystem (e.g. Vercel) use a persistent volume or switch to object storage, and use a hosted database such as Postgres instead of SQLite.
- To move to Postgres: change `provider = "sqlite"` to `"postgresql"` in `prisma/schema.prisma`, set `DATABASE_URL`, delete `prisma/migrations` and run `npm run db:migrate`.
- Email notifications for new inquiries/bookings are not included; they can be added in `app/actions/public.ts` (e.g. with Resend or Nodemailer).
