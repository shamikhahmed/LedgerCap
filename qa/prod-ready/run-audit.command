#!/bin/bash
cd "$(dirname "$0")/../.."
export PLAYWRIGHT_BROWSERS_PATH="$HOME/Library/Caches/ms-playwright"
export PLAYWRIGHT_CHROMIUM_USE_HEADLESS_SHELL=0
export LC_CHROME_PATH="$HOME/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8850/ | grep -q 200 || python3 -m http.server 8850 --bind 127.0.0.1 &
sleep 1
node scripts/prod-ready-audit.mjs http://127.0.0.1:8850/
echo
echo "Also: LC_IOS_BROWSER=chromium node scripts/ios-behaviour-check.mjs http://127.0.0.1:8850/"
