#!/usr/bin/env bash
# LedgerCap marketing capture (Phase A) — run OUTSIDE the Cursor sandbox.
# Serves the app on 8850, captures hub gallery shots, App Store PNGs, walkthrough, optional Lighthouse.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

PORT="${LC_MARKETING_PORT:-8850}"
export LC_MARKETING_PORT="$PORT"
export LC_MARKETING_BASE="http://127.0.0.1:${PORT}/?demo=1"
export LC_MARKETING_LANDING="http://127.0.0.1:${PORT}/landing.html"

mkdir -p qa/marketing/appstore qa/marketing/lighthouse qa/marketing/video-raw
mkdir -p shots/{dark,light}/{iphone,ipad,mac} site

# Prefer local node_modules (symlink to main LedgerCap tree is fine)
if [[ ! -d node_modules/playwright && ! -d node_modules/playwright-core ]]; then
  echo "ERROR: playwright not found under node_modules. From the main LedgerCap checkout: npm ci"
  exit 1
fi

# Free / start static server
if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $PORT already in use — reusing existing server"
else
  python3 -m http.server "$PORT" >/tmp/ledgercap-marketing-serve.log 2>&1 &
  SERVE_PID=$!
  echo "Serving $ROOT on :$PORT (pid $SERVE_PID)"
  cleanup() { kill "$SERVE_PID" 2>/dev/null || true; }
  trap cleanup EXIT
  for i in 1 2 3 4 5 6 7 8 9 10; do
    if curl -sf "http://127.0.0.1:${PORT}/VERSION.json" >/dev/null; then break; fi
    sleep 0.4
  done
fi

echo "=== Capture ==="
node qa/marketing/capture.mjs

echo ""
echo "=== Done ==="
echo "Summary: qa/marketing/SUMMARY.md"
echo "Gallery: shots/{dark,light}/{iphone,ipad,mac}/"
echo "App Store: qa/marketing/appstore/"
echo "Walkthrough: site/walkthrough.mp4 (or .webm) + site/walkthrough-poster.*"
echo ""
echo "Paste SUMMARY.md (or the terminal table) back into Cursor for Phase B wiring."
