# LedgerCap — Perfection Loop v3 · ITEMS

Seeded from CURSOR-PERFECTION-LOOP.md §13.5.

### LDG-V3-1 — tab-bar labels and KSE chip text &lt; 11px
severity: P1 · status: ✅ VERIFIED
Where: bottom nav `.psx-nav-btn` / `.nav-label` / `.nav-tab`; KSE `.lc-ticker-label` / `.lc-ticker-pill` / `.lc-app-ticker`  
Evidence: baseline tinyCount=0 (already at 11px) → post-fix tinyCount=0 with 12px floor  
Cause: 0.6875rem / 11px captions at the floor of §7.2  
Fix: bump tab + KSE chip labels to **12px** across `psx-app.css`, `lc-pro.css`, `ledger-os.css`, `ledger-v4.css`, `home-market.css`, `tokens.capricorn-core.css`  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — auditor-independent 7/7 hard=0 tap=0 text=0 pageErr=0 @ 5e19190

### LDG-V3-2 — small targets (Txs, Dismiss, KSE-100 chip, Refresh snapshot)
severity: P1 · status: ✅ VERIFIED
Where: Home demo — Dismiss ×2, KSE ticker pill, Txs ×4  
Evidence: baseline smallCount=7 → post-fix smallCount=0  
Cause: `.psx-demo button` / `.lc-price-health-dismiss` 24px; `.lc-ticker-pill` min-height 28; `.lc-deploy-txs` / `.lc-link-btn` undersized  
Fix: min 44×44 on Dismiss, health dismiss, ticker pill, Txs, link buttons  
Note: “Refresh snapshot” removed earlier (C-43 / LDG-P1-01 — ticker is the single refresh)  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — auditor-independent 7/7 hard=0 tap=0 text=0 pageErr=0 @ 5e19190

### LDG-V3-3 — 404 resource on load
severity: P1 · status: ✅ VERIFIED
Where: cold load `?demo=1` · Worker `…/timeseries/eod/KSE100` ×3 (retries)  
Evidence: baseline 3 console 404 → post-fix errors=[]  
Cause: `Prices.fetchKSE100` proxied PSX EOD; PSX HTML → Worker HTTP 404; client retried  
Fix: client never calls Worker `/timeseries/eod/KSE100` (Yahoo then cache); noRetry includes 404; Worker maps PSX HTML → **200 `{ data: [] }`** (needs deploy)  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — auditor-independent 7/7 hard=0 tap=0 text=0 pageErr=0 @ 5e19190

### LDG-V3-4 — merge finish/ledgercap-stepR
severity: P1 · status: ✅ VERIFIED
Where: fleet Phase 0  
Cause: +15 commits unmerged at program start  
Fix: Conductor merged to `main` @ `ce92c06` before this branch  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — auditor-independent 7/7 hard=0 tap=0 text=0 pageErr=0 @ 5e19190

### LDG-V3-5 — Lighthouse to §7.11
severity: P2 · status: L (later phase)  
Where: Home, Portfolio, Research · mobile+desktop  
Cause: stepR recorded P33 locally  
Fix: — (Phase E/I polish after Auditor P0/P1)  
Auditor: —

### LDG-V3-6 — full Urdu/RTL pass
severity: P2 · status: L (later phase)  
Where: every screen · English · اردو · Roman Urdu  
Cause: §7.16 / §13.5 full localisation pass  
Fix: — (Phase E after P0/P1 verified)  
Auditor: —
