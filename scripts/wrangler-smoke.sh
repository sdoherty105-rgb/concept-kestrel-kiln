#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
PORT=8791
pkill -f "wrangler dev.*${PORT}" 2>/dev/null || true
pkill -f "next start.*${PORT}" 2>/dev/null || true
sleep 0.5
npm run cf:build
npx wrangler dev --local --port "$PORT" >/tmp/wrangler-smoke.log 2>&1 &
WPID=$!
for i in $(seq 1 60); do
  if curl -sf "http://localhost:${PORT}/" >/dev/null 2>&1; then break; fi
  sleep 1
done
fail() { kill "$WPID" 2>/dev/null || true; cat /tmp/wrangler-smoke.log; exit 1; }
curl -sf -o /dev/null -w "home:%{http_code}\n" "http://localhost:${PORT}/" || fail
curl -sf -o /dev/null -w "menu:%{http_code}\n" "http://localhost:${PORT}/menu" || fail
H=$(curl -sI "http://localhost:${PORT}/" | tr -d '\r' | grep -i '^x-robots-tag:' || true)
echo "$H"
echo "$H" | grep -qi noindex || fail
RB=$(curl -s "http://localhost:${PORT}/robots.txt")
echo "$RB"
echo "$RB" | grep -qi 'Disallow: /' || fail
kill "$WPID" 2>/dev/null || true
echo "wrangler dev smoke OK"
