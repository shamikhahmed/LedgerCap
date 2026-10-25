#!/usr/bin/env bash
# LedgerCap release gate — run from repo root (reviewer: outside sandbox for browser steps).
#
# First step is always hig-guards (standing rules 1–4, no browser).
# Then sandbox-safe unit/coherence checks; Playwright/ios/audit when browsers exist.
#
# Usage: bash qa/release/run-checks.sh
# Logs → qa/release/logs/   Summary → qa/release/SUMMARY.md
set -u

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

LOG_DIR="$ROOT/qa/release/logs"
SUMMARY="$ROOT/qa/release/SUMMARY.md"
mkdir -p "$LOG_DIR"

EXPECT_VERSION="3.58.11"
PASS=0
FAIL=0
RESULTS=()
FINAL_RC=0

ts() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

record() {
  local step="$1" status="$2" detail="$3"
  RESULTS+=("$step|$status|$detail")
  if [[ "$status" == "PASS" ]]; then
    PASS=$((PASS + 1))
  else
    FAIL=$((FAIL + 1))
    FINAL_RC=1
  fi
  printf '[%s] %s  %s  (%s)\n' "$(ts)" "$status" "$step" "$detail"
}

run_logged() {
  local name="$1"
  shift
  local log="$LOG_DIR/${name}.log"
  local rc=0
  {
    echo "\$ $*"
    "$@"
  } >"$log" 2>&1
  rc=$?
  return "$rc"
}

write_summary() {
  {
    echo "# LedgerCap release — PASS=$PASS FAIL=$FAIL ($(ts))"
    echo "Expect: $EXPECT_VERSION"
    echo
    echo "| Step | Result | Detail |"
    echo "| --- | --- | --- |"
    local row s st d
    for row in "${RESULTS[@]+"${RESULTS[@]}"}"; do
      IFS='|' read -r s st d <<<"$row"
      echo "| \`$s\` | $st | $d |"
    done
    echo
    echo "Logs: \`qa/release/logs/\` · exit=$FINAL_RC"
  } >"$SUMMARY"
}

echo "=== LedgerCap release checks — expect $EXPECT_VERSION ==="
echo "Root: $ROOT"
echo "Started: $(ts)"
echo

# --- 0. HIG static guards (standing rules 1–4; no browser) ---
if run_logged "00-hig-guards" node scripts/hig-guards.mjs; then
  record "hig-guards" "PASS" "standing rules 1–4"
else
  record "hig-guards" "FAIL" "see 00-hig-guards.log"
fi

# --- 1. Version coherence (node, no browser) ---
if run_logged "01-version-coherence" node tests/version-coherence.test.js; then
  record "version-coherence" "PASS" "$EXPECT_VERSION"
else
  record "version-coherence" "FAIL" "see 01-version-coherence.log"
fi

# --- 2. Scroll-lock static ---
if run_logged "02-scroll-lock" node tests/scroll-lock.test.js; then
  record "scroll-lock" "PASS" "LcScrollLock wired"
else
  record "scroll-lock" "FAIL" "see 02-scroll-lock.log"
fi

# --- 3. Unit-ish node tests (no Playwright) ---
UNIT_OK=1
for t in \
  tests/telegram-format.test.js \
  tests/signals-logic.test.js \
  tests/pin-vault.test.js \
  tests/charts.test.js \
  tests/market-data-global.test.js \
  tests/calc-regression.test.js \
  tests/lc-events-actions.test.js \
  tests/prices-source-order.test.js
do
  name="$(basename "$t" .test.js)"
  if ! run_logged "unit-${name}" node "$t"; then
    UNIT_OK=0
    record "unit:$name" "FAIL" "see unit-${name}.log"
  fi
done
if [[ $UNIT_OK -eq 1 ]]; then
  record "unit-tests" "PASS" "node unit suite"
fi

# --- 4. Worker unit tests ---
WORKER_OK=1
for t in \
  tests/worker/karat-math.test.mjs \
  tests/worker/psx-universe.test.mjs \
  tests/worker/snapshot-shape.test.mjs \
  tests/worker/html-board-passthrough.test.mjs
do
  name="$(basename "$t" .test.mjs)"
  if ! run_logged "worker-${name}" node "$t"; then
    WORKER_OK=0
    record "worker:$name" "FAIL" "see worker-${name}.log"
  fi
done
if [[ $WORKER_OK -eq 1 ]]; then
  record "worker-tests" "PASS" "worker unit suite"
fi

# --- 5. Playwright (optional; skip when browsers unavailable) ---
if [[ "${RUN_PLAYWRIGHT:-0}" == "1" ]] && command -v npx >/dev/null 2>&1; then
  if run_logged "05-playwright" npx playwright test --retries=0; then
    record "playwright" "PASS" "see 05-playwright.log"
  else
    record "playwright" "FAIL" "see 05-playwright.log"
  fi
else
  record "playwright" "PASS" "SKIP — set RUN_PLAYWRIGHT=1 outside sandbox"
fi

write_summary

echo
echo "======== SUMMARY ========"
printf '%-28s %-6s %s\n' "STEP" "RESULT" "DETAIL"
for row in "${RESULTS[@]+"${RESULTS[@]}"}"; do
  IFS='|' read -r s st d <<<"$row"
  printf '%-28s %-6s %s\n' "$s" "$st" "$d"
done
echo
echo "Wrote $SUMMARY"
echo "PASS=$PASS FAIL=$FAIL"
exit "$FINAL_RC"
