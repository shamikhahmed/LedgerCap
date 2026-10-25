#!/bin/bash
set -euo pipefail
ROOT="/Users/shamikhahmed/Projects/Cap/Cap-Apps/_workspace/LedgerCap-hig"
cd "$ROOT"
LOG="$ROOT/qa/prod-ready/outside-run.log"
exec > >(tee "$LOG") 2>&1
echo "START $(date -Iseconds)"
export PLAYWRIGHT_BROWSERS_PATH="$HOME/Library/Caches/ms-playwright"
export PLAYWRIGHT_CHROMIUM_USE_HEADLESS_SHELL=0
export LC_CHROME_PATH="$HOME/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
export LC_IOS_BROWSER=chromium
# ensure server
if ! curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8850/ | grep -q 200; then
  python3 -m http.server 8850 --bind 127.0.0.1 >/tmp/lc-8850.log 2>&1 &
  echo "SERVER_PID=$!"
  sleep 1
fi
echo "=== ios:check chromium ==="
node scripts/ios-behaviour-check.mjs http://127.0.0.1:8850/ | tee qa/prod-ready/ios-check-chromium.txt
echo "=== prod-ready-audit ==="
node scripts/prod-ready-audit.mjs http://127.0.0.1:8850/
echo "=== unit+e2e (playwright) ==="
npx playwright test --reporter=line 2>&1 | tee qa/prod-ready/e2e.txt || true
echo "DONE $(date -Iseconds)"
touch "$ROOT/qa/prod-ready/OUTSIDE_DONE"
