#!/usr/bin/env sh
# Pull the latest code, rebuild the container, and wait until it answers.
#
#   ./deploy.sh            deploy on the saved port (3100 the first time)
#   PORT=3200 ./deploy.sh  deploy on another port; it is saved in .env, so
#                          later runs reuse it. Point Caddy's reverse_proxy
#                          at the same port.
set -eu
cd "$(dirname "$0")"

# the port: from the command line, else the one saved last time, else 3100
if [ -z "${PORT:-}" ] && [ -f .env ]; then
  PORT="$(sed -n 's/^PORT=//p' .env | tail -n 1)"
fi
PORT="${PORT:-3100}"
export PORT
{ grep -v '^PORT=' .env 2>/dev/null || true; echo "PORT=$PORT"; } > .env.tmp && mv .env.tmp .env

echo "==> pulling"
git pull --ff-only

# refuse early, with the culprit named, if something else holds the port
ours="$(docker compose port site 3000 2>/dev/null || true)"
taken=""
if ss -ltnH "( sport = :$PORT )" 2>/dev/null | grep -q .; then taken=1; fi
if docker ps --format '{{.Ports}}' | grep -q ":$PORT->"; then taken=1; fi
if [ -n "$taken" ] && [ -z "$ours" ]; then
  echo "!! port $PORT is already in use on this server:" >&2
  docker ps --format '   {{.Names}}  {{.Ports}}' | grep ":$PORT->" >&2 || true
  sudo ss -ltnpH "( sport = :$PORT )" >&2 || true
  echo "   pick a free port, e.g.  PORT=$((PORT + 1)) ./deploy.sh" >&2
  exit 1
fi

echo "==> building and starting on 127.0.0.1:$PORT"
docker compose up -d --build --remove-orphans

echo "==> waiting for the site"
i=0
until curl -fsS -o /dev/null "http://127.0.0.1:$PORT/"; do
  i=$((i + 1))
  if [ "$i" -ge 30 ]; then
    echo "!! the site did not answer on port $PORT after 60s" >&2
    docker compose logs --tail=50 site >&2
    exit 1
  fi
  sleep 2
done
echo "==> up on http://127.0.0.1:$PORT"

# keep the disk from filling with old build layers
docker image prune -f >/dev/null

if command -v caddy >/dev/null 2>&1 && [ -f /etc/caddy/Caddyfile ]; then
  echo "==> reloading caddy"
  sudo systemctl reload caddy || echo "!! caddy reload failed; check: sudo journalctl -u caddy" >&2
fi
echo "==> done"
