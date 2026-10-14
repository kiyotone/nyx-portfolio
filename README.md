# nyx-portfolio

Kirtan Kunwar's personal site, built as a found-footage horror game menu. The
title screen is camcorder footage of a derelict hallway, drawn live by a WebGL
shader (`components/Footage.tsx`). Each section opens as a typed page over the
paused tape.

Next.js (App Router), React and Tailwind. Content lives in `content/`, and the
sections and their order live in `content/sections.ts`.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
```

## Deploy (Docker + Caddy)

Two containers from `docker-compose.yml`: the site, and Caddy in front of it
on port 80. The site has no host port of its own, so it never collides with
other containers on the server. Needs git and Docker with the compose plugin.

First time:

```bash
git clone git@github-nyx:kiyotone/nyx-portfolio.git
cd nyx-portfolio
./deploy.sh
```

Every deploy after that:

```bash
./deploy.sh
```

It pulls, rebuilds, starts both containers, and waits until the site answers
through Caddy. If port 80 is taken, it stops and names what holds it. To serve
on another port, run `HTTP_PORT=8080 ./deploy.sh` once; the setting is saved in
`.env`.

### HTTPS on the domain

1. Point the `A` records for `kirtankunwar.com` (and `www`) at the server.
2. In `docker-compose.yml`, uncomment the `443:443` line under `caddy`.
3. Run `SITE_ADDRESS=kirtankunwar.com ./deploy.sh` once.

Caddy then fetches and renews the certificate itself, and redirects HTTP to
HTTPS.

## Never ships

- No phone number. Email, LinkedIn and GitHub only.
- No infrastructure addresses, admin console URLs or local filesystem paths.
- No private repository links. Private work appears as unlinked line items.
- No claimed security credentials (CTFs, certifications, CVEs, bug bounties,
  pentests) until they are real. `content/security.ts` carries the rule.
- Naming: **nyxty** is the runtime, **Nyxel** is the application on it, and
  **NyxVoxLab** is the benchmark repository. **Tribhuvan**, not Tribhuwan.
