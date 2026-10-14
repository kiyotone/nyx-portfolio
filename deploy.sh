#!/usr/bin/env sh
# Pull the latest code, rebuild, start the site and Caddy, and wait until the
# site answers through Caddy.
#
#   ./deploy.sh                 serve on port 80 (or the port saved last time)
#   HTTP_PORT=8080 ./deploy.sh  serve on another port; saved in .env for later runs
#
# For HTTPS on the domain, see the README.
set -eu
cd "$(dirname "$0")"

# settings: from the command line, else saved in .env, else the defaults
saved() { [ -f .env ] && sed -n "s/^$1=//p" .env | tail -n 1 || true; }
HTTP_PORT="${HTTP_PORT:-$(saved HTTP_PORT)}"
HTTP_PORT="${HTTP_PORT:-80}"
SITE_ADDRESS="${SITE_ADDRESS:-$(saved SITE_ADDRESS)}"
SITE_ADDRESS="${SITE_ADDRESS:-:80}"
export HTTP_PORT SITE_ADDRESS
{
  grep -vE '^(HTTP_PORT|SITE_ADDRESS|PORT)=' .env 2>/dev/null || true
  echo "HTTP_PORT=$HTTP_PORT"
  echo "SITE_ADDRESS=$SITE_ADDRESS"
} > .env.tmp && mv .env.tmp .env

echo "==> pulling"
git pull --ff-only

# refuse early, with the culprit named, if something else holds the port
ours="$(docker compose port caddy 80 2>/dev/null || true)"
taken=""
if ss -ltnH "( sport = :$HTTP_PORT )" 2>/dev/null | grep -q .; then taken=1; fi
if docker ps --format '{{.Ports}}' | grep -q ":$HTTP_PORT->"; then taken=1; fi
if [ -n "$taken" ] && [ -z "$ours" ]; then
  echo "!! port $HTTP_PORT is already in use on this server:" >&2
  docker ps --format '   {{.Names}}  {{.Ports}}' | grep ":$HTTP_PORT->" >&2 || true
  sudo ss -ltnpH "( sport = :$HTTP_PORT )" >&2 || true
  echo "   stop whatever holds it, or serve elsewhere:  HTTP_PORT=8080 ./deploy.sh" >&2
  exit 1
fi

echo "==> building and starting (Caddy on port $HTTP_PORT, serving $SITE_ADDRESS)"
docker compose up -d --build --remove-orphans
# Caddy only reads its config at start; pick up any change the pull brought
docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile >/dev/null 2>&1 || true

echo "==> waiting for the site"
i=0
until docker compose exec -T site node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" 2>/dev/null; do
  i=$((i + 1))
  if [ "$i" -ge 30 ]; then
    echo "!! the site did not answer after 60s" >&2
    docker compose logs --tail=50 site >&2
    exit 1
  fi
  sleep 2
done

# and through Caddy, when it serves plain HTTP
case "$SITE_ADDRESS" in
  :*)
    if curl -fsS -o /dev/null "http://127.0.0.1:$HTTP_PORT/"; then
      echo "==> up on http://<this server>:$HTTP_PORT/"
    else
      echo "!! the site is up but Caddy is not answering on port $HTTP_PORT" >&2
      docker compose logs --tail=30 caddy >&2
      exit 1
    fi
    ;;
  *) echo "==> up; Caddy serves https://$SITE_ADDRESS" ;;
esac

# keep the disk from filling with old build layers
docker image prune -f >/dev/null
echo "==> done"
