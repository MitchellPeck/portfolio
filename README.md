# mitchellpeck.com

Portfolio and business site for Mitchell Peck Development, built with:

- **Next.js 16** (App Router) + **React 19**
- **Payload CMS 3** — content lives in Postgres, editable at `/admin`
- **Vercel Blob** for media storage; deployed on Vercel
- **pnpm** as the package manager

## Local development

1. Create `.env` with:
   - `DATABASE_URI` — Postgres connection string
   - `PAYLOAD_SECRET` — random secret for Payload auth
   - `BLOB_READ_WRITE_TOKEN` — Vercel Blob token
   - `NEXT_PUBLIC_SITE_URL` — optional; defaults to `https://mitchellpeck.com` in production and `http://localhost:3000` in dev
2. `pnpm install`
3. `pnpm dev` and open <http://localhost:3000> (admin at `/admin`)

In development, Payload syncs the Postgres schema automatically (push mode).

## Database migrations

Production schema changes go through migrations, not dev push:

```sh
pnpm migrate:create   # generate a migration after changing collections
pnpm migrate          # apply pending migrations (run against the target DB)
```

Commit generated files in `src/migrations/`.

> **One-time note:** the production database was originally created by dev push
> mode, so its tables already exist. Before the first `pnpm migrate` against
> production, mark the initial migration as applied instead of running it:
> insert a row into `payload_migrations` with `name =
> '20260819_140531_initial'` and `batch = 1`. Every migration after that runs
> normally.

## Useful scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm lint` | ESLint over `src` |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after schema changes |
| `pnpm generate:importmap` | Regenerate the Payload admin import map |

## Project layout

- `src/app/(frontend)` — public site routes and components
- `src/app/(payload)` — Payload admin and API routes (generated)
- `src/collections` — active Payload collections (`unmounted/` holds future scaffolding)
- `src/globals` — site-wide settings editable in the CMS
