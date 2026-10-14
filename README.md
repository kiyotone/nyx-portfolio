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

The site runs in one container bound to `127.0.0.1:3100`. Caddy sits in front
of it on the same server, serves `kirtankunwar.com`, and handles HTTPS.

One-time setup on the server (needs git, Docker with the compose plugin, and
Caddy):

```bash
git clone git@github.com:kiyotone/nyx-portfolio.git
cd nyx-portfolio
chmod +x deploy.sh
./deploy.sh
sudo cp Caddyfile /etc/caddy/Caddyfile && sudo systemctl reload caddy
```

Point the `A` records for `kirtankunwar.com` and `www.kirtankunwar.com` at the
server, and Caddy fetches the certificate itself. If the server's Caddy
already serves other sites, paste the two blocks from `Caddyfile` into the
existing config instead of replacing it.

Every deploy after that:

```bash
./deploy.sh
```

It pulls, rebuilds, restarts, waits until the site answers, and reloads
Caddy. It refuses to start, and names the culprit, if the port is taken. To
use another port run `PORT=3200 ./deploy.sh` once; the port is saved in `.env`
for later runs. Change `reverse_proxy` in the Caddyfile to match.

## Never ships

- No phone number. Email, LinkedIn and GitHub only.
- No infrastructure addresses, admin console URLs or local filesystem paths.
- No private repository links. Private work appears as unlinked line items.
- No claimed security credentials (CTFs, certifications, CVEs, bug bounties,
  pentests) until they are real. `content/security.ts` carries the rule.
- Naming: **nyxty** is the runtime, **Nyxel** is the application on it, and
  **NyxVoxLab** is the benchmark repository. **Tribhuvan**, not Tribhuwan.
