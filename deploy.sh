#!/usr/bin/env sh
# Pull the latest code, rebuild the container, and wait until it answers.
#
#   ./deploy.sh            deploy on port 3000 (what the Caddyfile expects)
#   PORT=8080 ./deploy.sh  deploy on another port (change the Caddyfile to match)
set -eu
cd "$(dirname "$0")"

PORT="${PORT:-3000}"
export PORT

echo "==> pulling"
git pull --ff-only

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
