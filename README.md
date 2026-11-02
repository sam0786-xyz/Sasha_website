# SASHA General Contracting

Lightweight Next.js website with a private operations area, SQLite-backed public notices and enquiries, and an optional server-side Nemotron helper.

## Run locally

1. Copy `.env.example` to `.env` and set a long `AUTH_SECRET`.
2. Create a password hash with `node -e "require('bcryptjs').hash('your-long-password',12).then(console.log)"`, then add it as `ADMIN_PASSWORD_HASH`. Set `ADMIN_EMAIL` to the approved operator account.
3. Run `npm install`, `npm run db:seed`, and `npm run dev`.
4. Open `/` for the public site and `/ops` for the authenticated operations area.

The local SQLite file (`sasha.db`) is the shared source of truth: publishing or closing a notice in `/ops` updates the public site immediately on the next request and the public listing also polls every 30 seconds.

## Deployment

SQLite is appropriate for a single persistent Node server or local installation. Before deploying to serverless or multiple instances, replace the adapter in `lib/db.ts` with a managed shared database (for example Postgres/Turso) and keep all secrets in the host's secret store. Do not commit `.env` or the database file.

## Optional NVIDIA Nemotron

Set `NEMOTRON_API_KEY`, `NEMOTRON_BASE_URL`, and `NEMOTRON_MODEL` to enable an OpenAI-compatible NVIDIA endpoint. With no key, the worker helper uses a safe plain-language fallback. The key remains server-side. The assistant must not make final salary, visa, legal, medical, or payment decisions.

## Launch checks

- Replace sample notices with confirmed work details.
- Have a UAE legal/HR professional confirm every employment, visa, accommodation, travel, and recruitment statement before publishing.
- Add privacy, cookie, terms, and retention information appropriate to the jurisdictions and actual data handling.
- Have Arabic and Hinglish copy reviewed by native speakers. The included language control changes page direction and key interactive labels; it is intentionally not a substitute for a professional full translation.
- Configure rate limiting, spam protection, backups, monitoring, TLS, and a real shared managed database for production.
