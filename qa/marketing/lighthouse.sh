#!/usr/bin/env bash
# Re-run Lighthouse on landing.html only; print the four category scores.
# Reviewer runs outside the Cursor sandbox (needs Chrome + npx lighthouse).
#
# Usage: bash qa/marketing/lighthouse.sh
# Optional: LC_MARKETING_PORT=8850 LC_MARKETING_LANDING=http://127.0.0.1:8850/landing.html
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

PORT="${LC_MARKETING_PORT:-8850}"
LANDING="${LC_MARKETING_LANDING:-http://127.0.0.1:${PORT}/landing.html}"
OUT_DIR="$ROOT/qa/marketing/lighthouse"
JSON_OUT="$OUT_DIR/landing.json"
mkdir -p "$OUT_DIR"

STARTED_SERVER=0
if ! curl -sf "http://127.0.0.1:${PORT}/landing.html" >/dev/null 2>&1; then
  python3 -m http.server "$PORT" >/tmp/ledgercap-lighthouse-serve.log 2>&1 &
  SERVE_PID=$!
  STARTED_SERVER=1
  cleanup() { kill "$SERVE_PID" 2>/dev/null || true; }
  trap cleanup EXIT
  for _ in 1 2 3 4 5 6 7 8 9 10 11 12; do
    if curl -sf "http://127.0.0.1:${PORT}/landing.html" >/dev/null 2>&1; then break; fi
    sleep 0.3
  done
fi

if ! npx --offline lighthouse --version >/dev/null 2>&1; then
  echo "ERROR: npx lighthouse not available offline (npm ci first)" >&2
  exit 1
fi

CHROME_PATH="${CHROME_PATH:-}"
if [[ -z "$CHROME_PATH" && -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]]; then
  CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
fi
export CHROME_PATH

npx --offline lighthouse "$LANDING" \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile \
  --screenEmulation.mobile \
  --chrome-flags="--headless=new --no-sandbox --disable-dev-shm-usage" \
  --output=json \
  --output-path="$JSON_OUT" \
  --quiet

node -e "
const j=require(process.argv[1]);
const cats=j.categories||{};
const order=['performance','accessibility','best-practices','seo'];
const scores={};
for (const k of order) scores[k]=Math.round((cats[k]?.score||0)*100);
console.log('Lighthouse (mobile) ' + process.argv[2]);
console.log(JSON.stringify(scores));
console.log(
  'performance ' + scores.performance +
  '  accessibility ' + scores.accessibility +
  '  best-practices ' + scores['best-practices'] +
  '  seo ' + scores.seo
);
const ok = scores.performance >= 95 && scores.accessibility >= 95;
process.exit(ok ? 0 : 2);
" "$JSON_OUT" "$LANDING"
