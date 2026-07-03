'use strict';
const Settings = (() => {
  let _proxyHealth = { status: 'idle', detail: '' };

  async function _pingProxy(url) {
    if (!url) {
      _proxyHealth = { status: 'none', detail: 'No proxy URL configured' };
      return _proxyHealth;
    }
    _proxyHealth = { status: 'checking', detail: 'Pinging worker…' };
    _updateProxyHealthUI();
    try {
      const base = url.replace(/\/$/, '');
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 6000);
      const res = await fetch(`${base}/health`, { signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const body = await res.json().catch(() => ({}));
        _proxyHealth = body.ok
          ? { status: 'ok', detail: 'Worker reachable' }
          : { status: 'error', detail: 'Unexpected health response' };
      } else {
        _proxyHealth = { status: 'error', detail: `HTTP ${res.status}` };
      }
    } catch (e) {
      _proxyHealth = { status: 'error', detail: e.name === 'AbortError' ? 'Timeout — worker unreachable' : 'Worker unreachable' };
    }
    _updateProxyHealthUI();
    return _proxyHealth;
  }

  function _proxyHealthLabel() {
    if (_proxyHealth.status === 'ok') return { cls: 't-gain', text: '● Online' };
    if (_proxyHealth.status === 'checking') return { cls: '', text: '● Checking…' };
    if (_proxyHealth.status === 'none') return { cls: '', text: '● Not set' };
    return { cls: 't-loss', text: '● Offline' };
  }

  function _updateProxyHealthUI() {
    const el = document.getElementById('proxy-health-val');
    const sub = document.getElementById('proxy-health-sub');
    if (!el) return;
    const h = _proxyHealthLabel();
    el.className = `setting-value ${h.cls}`.trim();
    el.textContent = h.text;
    if (sub) sub.textContent = _proxyHealth.detail || '';
  }

  function render() {
    const screen = document.getElementById('screen-settings');
    if (!screen) return;

    const state = State.get();
    const settings = state.settings || {};
    const allPrices = Object.values(state.prices || {});
    const lastUpdate = allPrices.sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];
    const lastUpdateStr = lastUpdate ? Prices.formatTs(lastUpdate.ts) : 'Never';
    const txCount = (state.transactions || []).length;
    const proxyUrl = window.LedgerCapConfig?.resolvePsxProxyUrl(settings.psxProxyUrl) || settings.psxProxyUrl || window.LEDGERCAP_CONFIG?.psxProxyUrl || '';
    const isOnline = navigator.onLine;
    const proxyHealth = _proxyHealthLabel();

    const holdings = Ledger.calcHoldings(state.transactions || []);
    const funds = Ledger.calcFundHoldings(state.transactions || []);
    const goldPpg = settings.goldPricePerGram || 18000;
    const nisabValue = 87.48 * goldPpg;
    const zakatableStocks = holdings.filter(h => {
      const sd = [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].find(s => s.symbol === h.symbol && s.broker === h.broker);
      return sd?.isShariah;
    }).reduce((sum, h) => sum + h.shares * (State.getPrice(h.symbol) || h.avgCost), 0);
    const zakatableFunds = funds.reduce((sum, f) => {
      const nav = State.getPrice(f.symbol) || f.avgNav;
      return sum + f.units * nav;
    }, 0);
    const zakatableTotal = zakatableStocks + zakatableFunds;
    const zakatDue = zakatableTotal >= nisabValue ? zakatableTotal * 0.025 : 0;

    const theme = settings.theme || 'dark';
    const pilot = state.pilotSettings || {};
    const ma = state.manualAssets || {};
    const fundOverrides = settings.fundNavOverrides || {};
    const fundNavFields = (window.MEEZAN_FUNDS || []).map((f) => {
      const o = fundOverrides[f.symbol];
      const nav = o?.nav ?? '';
      const asOf = o?.asOf ?? '';
      const symEsc = f.symbol.replace(/"/g, '&quot;');
      return `<div class="field-row" style="margin-bottom:8px">
        <div class="field" style="flex:1.4">
          <label class="field-label">${f.symbol}</label>
          <input class="field-input fn-nav" data-symbol="${symEsc}" type="number" step="0.0001" value="${nav}" placeholder="${f.currentNav || ''}">
        </div>
        <div class="field" style="flex:1">
          <label class="field-label">Statement date</label>
          <input class="field-input fn-asof" data-symbol="${symEsc}" type="date" value="${asOf}">
        </div>
      </div>`;
    }).join('');

    screen.innerHTML = `
    <div class="lc-dash">
    <div class="lc-screen-head"><h1>Settings</h1><p>${I18n.t('more.sub')}</p></div>
    <div class="sec-head"><span class="sec-title">${I18n.t('lang.label')}</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      ${I18n.langSwitcher('lc-settings-lang')}
    </div>

    <div class="sec-head"><span class="sec-title">${I18n.t('theme.toggle')}</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      <div class="os-theme-toggle">
        <button type="button" class="os-theme-btn${theme === 'dark' ? ' active' : ''}" data-action="Settings._setTheme" data-tab="dark">${I18n.t('theme.dark')}</button>
        <button type="button" class="os-theme-btn${theme === 'light' ? ' active' : ''}" data-action="Settings._setTheme" data-tab="light">${I18n.t('theme.light')}</button>
      </div>
      <label class="lc-check-row" style="margin-top:14px"><input type="checkbox" id="s-haptics" ${settings.hapticsEnabled ? 'checked' : ''} data-action-change="Settings._setHaptics"> Haptic feedback on taps (off by default)</label>
      <p class="field-hint" style="margin-top:6px">Desktop: <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd> quick nav when width ≥900px</p>
    </div>

    <div class="sec-head"><span class="sec-title">Number format</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">Full shows every digit with 2 decimals. Compact uses L/cr for big PKR amounts.</p>
      <div class="os-theme-toggle">
        <button type="button" class="os-theme-btn${(settings.numberFormat || 'full') === 'full' ? ' active' : ''}" data-action="Settings._setNumberFormat" data-tab="full">Full</button>
        <button type="button" class="os-theme-btn${settings.numberFormat === 'compact' ? ' active' : ''}" data-action="Settings._setNumberFormat" data-tab="compact">Compact</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Display &amp; live data</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">One tap flips all amounts PKR↔USD. SSE pushes during PSX session (intraday when open, last close after hours).</p>
      <div class="os-theme-toggle" style="margin-bottom:14px">
        <button type="button" class="os-theme-btn${(settings.displayCurrency || 'PKR') === 'PKR' ? ' active' : ''}" data-action="Settings._setDisplayCurrency" data-tab="PKR">PKR ₨</button>
        <button type="button" class="os-theme-btn${settings.displayCurrency === 'USD' ? ' active' : ''}" data-action="Settings._setDisplayCurrency" data-tab="USD">USD $</button>
      </div>
      <label class="lc-check-row"><input type="checkbox" id="s-live-stream" ${settings.liveStreamEnabled !== false ? 'checked' : ''} data-action-change="Settings._setLiveStream"> Live price stream (SSE push)</label>
      <label class="lc-check-row"><input type="checkbox" id="s-snapshot" ${settings.snapshotEnabled !== false ? 'checked' : ''} data-action-change="Settings._setSnapshot"> Market snapshot (full PSX + US + commodities)</label>
      <p class="field-hint" style="margin-top:8px">Snapshot: ${typeof PriceSnapshotService !== 'undefined' ? (PriceSnapshotService.freshnessLabel() || 'worker KV · 15m refresh') : 'worker KV'}</p>
      <p class="field-hint" style="margin-top:4px">Stream: ${(() => {
        const st = typeof LivePriceStream !== 'undefined' ? LivePriceStream.status() : {};
        const open = typeof PsxSession !== 'undefined' && PsxSession.isOpen();
        if (st.connected) return open ? '● connected · intraday push' : '● connected · last close (EOD)';
        return '○ disconnected · manual refresh / poll';
      })()}</p>
      <p class="field-hint" style="margin-top:4px"><a href="./widget-glance.html" target="_blank" rel="noopener">Glance widget page</a> — add to home screen for 3-second net worth check. Native iOS widget needs Capacitor build.</p>
    </div>

    <div class="sec-head"><span class="sec-title">Tax &amp; audit export</span></div>
    <div style="background:var(--lc-bg-card);border-bottom:1px solid var(--lc-border);padding:16px 20px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">Annual statement CSV or printable PDF. Verify against broker statements — not tax advice.</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <button type="button" class="btn-secondary" data-action="Settings._exportStatementCsv">CSV statement</button>
        <button type="button" class="btn-secondary" data-action="Settings._exportStatementPdf">PDF / print</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Investor Profile</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div class="field">
        <label class="field-label">Monthly Salary (₨)</label>
        <input class="field-input" id="s-salary" type="number" value="${settings.salary || 150000}" placeholder="150000">
      </div>
      <div class="field">
        <label class="field-label">Monthly SIP Target (₨)</label>
        <input class="field-input" id="s-sip" type="number" value="${settings.targetSIP || 75000}" placeholder="75000">
      </div>
      <div class="field-row">
        <div class="field">
          <label class="field-label">USD/PKR Rate</label>
          <input class="field-input" id="s-usdrate" type="number" step="0.01" value="${settings.usdRate || 280}" placeholder="280">
          <p style="font-size:0.7rem;color:var(--text3);margin-top:4px">Live: ExchangeRate-API (free)${settings.usdRateSource ? ' · ' + settings.usdRateSource : ''}</p>
        </div>
        <div class="field">
          <label class="field-label">Gold Price (₨/gram)</label>
          <input class="field-input" id="s-goldprice" type="number" value="${settings.goldPricePerGram || 18000}" placeholder="18000">
        </div>
      </div>
      <div class="field">
        <label class="field-label">GNews API key (optional)</label>
        <input class="field-input" id="s-gnews-key" type="password" autocomplete="off" value="${settings.gnewsApiKey || ''}" placeholder="For Pakistan PSX headlines — gnews.io">
      </div>
      <button type="button" class="btn-ghost" style="margin-bottom:8px" data-action="Settings._refreshFx">Refresh USD/PKR now</button>
      <button type="button" class="btn-primary" data-action="Settings._saveProfile">Save Profile</button>
    </div>

    <div class="sec-head"><span class="sec-title">Cash &amp; manual assets</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:12px;line-height:1.5;">Uninvested broker cash (Rafi + your AKD slice). AKD ledger ₨138,045 includes ~₨97,946 friend custodial — excluded here.</p>
      <div class="field">
        <label class="field-label">Broker cash (₨)</label>
        <input class="field-input" id="s-broker-cash" type="number" min="0" step="1" value="${ma.brokerCashPkr || 0}" placeholder="40960">
      </div>
      <div class="field-row">
        <div class="field">
          <label class="field-label">USD cash</label>
          <input class="field-input" id="s-usd-cash" type="number" min="0" step="0.01" value="${ma.usdCash || 0}">
        </div>
        <div class="field">
          <label class="field-label">Gold (grams)</label>
          <input class="field-input" id="s-gold-grams" type="number" min="0" step="0.01" value="${ma.goldGrams || 0}">
        </div>
      </div>
      <button type="button" class="btn-primary" data-action="Settings._saveManualAssets">Save manual assets</button>
    </div>

    <div class="sec-head"><span class="sec-title">Return Assumptions</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div class="field-row" style="margin-bottom:16px;">
        <div class="field">
          <label class="field-label">Target Return (%/yr)</label>
          <input class="field-input" id="s-return" type="number" step="0.5" value="${((settings.targetReturn || 0.18) * 100).toFixed(0)}" placeholder="18">
        </div>
        <div class="field">
          <label class="field-label">Inflation (%/yr)</label>
          <input class="field-input" id="s-inflation" type="number" step="0.5" value="${((settings.inflationRate || 0.20) * 100).toFixed(0)}" placeholder="20">
        </div>
      </div>
      <div class="field-row" style="margin-bottom:16px;">
        <div class="field">
          <label class="field-label">PKR Depreciation (%/yr)</label>
          <input class="field-input" id="s-pkrdep" type="number" step="0.5" value="${((settings.pkrDepreciationRate || 0.15) * 100).toFixed(0)}" placeholder="15">
        </div>
        <div class="field">
          <label class="field-label">Freedom Target (₨/mo)</label>
          <input class="field-input" id="s-freedom" type="number" value="${settings.freedomTarget || 100000}" placeholder="100000">
        </div>
      </div>
      <div class="field-hint" style="margin-bottom:12px;">4% rule: corpus needed = ₨${Math.round((settings.freedomTarget || 100000) * 12 / 0.04).toLocaleString()}</div>
      <div style="display:flex;gap:8px;">
        <button type="button" class="btn-primary" style="flex:1;" data-action="Settings._saveAssumptions">Save Assumptions</button>
        <button type="button" class="btn-ghost" data-action="Settings._resetAssumptions">Reset Defaults</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title" id="fund-nav-section">Meezan fund NAVs</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:12px;line-height:1.5;">No public AMC API — paste latest NAV from your Meezan statement. Overrides portfolio value &amp; zakat.</p>
      ${fundNavFields || '<p class="field-hint">No fund seed loaded.</p>'}
      <button type="button" class="btn-primary" style="margin-top:12px" data-action="Settings._saveFundNavs">Save fund NAVs</button>
    </div>

    <div class="sec-head"><span class="sec-title" id="zakat-section">Zakat Calculator</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Nisab (87.48g gold)</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(nisabValue).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">At ₨${goldPpg.toLocaleString()}/g</div>
        </div>
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Zakatable Assets</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(zakatableTotal).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">Shariah holdings</div>
        </div>
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Shariah Stocks</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(zakatableStocks).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">Marked ☪ in portfolio</div>
        </div>
        <div style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 12px;">
          <div class="metric-label">Meezan Funds</div>
          <div style="font-size:0.92rem;font-weight:700;">₨${Math.round(zakatableFunds).toLocaleString()}</div>
          <div style="font-size:0.62rem;color:var(--text3);">All funds (Shariah)</div>
        </div>
      </div>
      ${zakatableTotal >= nisabValue ? `
      <div style="padding:12px 14px;background:rgba(14,203,129,0.08);border:1px solid rgba(14,203,129,0.2);border-radius:var(--r-sm);margin-bottom:8px;">
        <div style="font-size:0.75rem;color:var(--text3);margin-bottom:4px;">Zakat Due (2.5%)</div>
        <div style="font-size:1.4rem;font-weight:800;color:var(--green);">₨${Math.round(zakatDue).toLocaleString()}</div>
        <div style="font-size:0.68rem;color:var(--text3);margin-top:2px;">Above nisab threshold ✓</div>
      </div>` : `
      <div style="padding:12px 14px;background:var(--bg3);border-radius:var(--r-sm);margin-bottom:8px;">
        <div style="font-size:0.78rem;color:var(--text3);">Below nisab threshold (₨${Math.round(nisabValue).toLocaleString()}) — no Zakat due on these assets yet.</div>
      </div>`}
      <div style="font-size:0.65rem;color:var(--text3);line-height:1.4;">Consult a scholar for your specific situation. Non-Shariah stocks excluded from calculation.</div>
    </div>

    <div class="sec-head"><span class="sec-title">Live Prices</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row">
        <div>
          <div class="setting-label">Last Updated</div>
          <div class="setting-sub">${lastUpdateStr}</div>
        </div>
        <span class="setting-value ${isOnline ? 't-gain' : 't-loss'}">${isOnline ? '● Online' : '● Offline'}</span>
      </div>
      <div class="setting-row">
        <div>
          <div class="setting-label">PSX Proxy</div>
          <div class="setting-sub" id="proxy-health-sub">${_proxyHealth.detail || (proxyUrl ? 'Worker health check' : 'Set URL below to enable live PSX')}</div>
        </div>
        <span class="setting-value ${proxyHealth.cls}" id="proxy-health-val">${proxyHealth.text}</span>
      </div>
      <div style="padding:12px 16px;display:flex;flex-direction:column;gap:10px;">
        <div class="field">
          <label class="field-label">PSX Proxy URL (optional)</label>
          <input class="field-input" id="s-proxy" type="url" placeholder="https://ledgercap-psx-proxy.yourname.workers.dev" value="${proxyUrl}">
          <div class="field-hint">Deploy worker/ to Cloudflare for reliable PSX prices</div>
        </div>
        <button type="button" class="btn-ghost" data-action="Settings._saveProxy">Save Proxy URL</button>
        <button type="button" class="btn-secondary" data-action="App.refreshPrices">⟳ Refresh All Prices</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Telegram</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">
        Bot: <a href="https://t.me/LedgerCap_Bot" target="_blank" rel="noopener noreferrer">@LedgerCap_Bot</a> — message it once, then detect chat ID.
        <strong> Pakistan:</strong> Bot API routes via your LedgerCap worker proxy (not api.telegram.org).
      </p>
      <div class="field">
        <label class="field-label">Bot token</label>
        <input class="field-input" id="tg-token" type="password" autocomplete="off" placeholder="${(typeof SecretsVault !== 'undefined' && SecretsVault.hasTelegramToken()) || settings.telegramBotToken ? 'Saved — enter new token to replace' : '123456:ABC…'}" value="">
      </div>
      <div class="field">
        <label class="field-label">Chat ID</label>
        <input class="field-input" id="tg-chat" type="text" inputmode="numeric" placeholder="e.g. 123456789" value="${settings.telegramChatId || ''}">
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
        <button type="button" class="btn-ghost btn-sm" data-action="Settings._detectTelegramChat">Detect chat ID</button>
        <button type="button" class="btn-ghost btn-sm" data-action="Settings._checkTelegramProxy">Test proxy</button>
      </div>
      <div class="field-hint" style="margin-bottom:12px;">Numeric chat_id only — not your phone number. Use @userinfobot if detect fails.</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px;">
        <label class="lc-check-row"><input type="checkbox" id="tg-morning" ${settings.telegramMorningEnabled ? 'checked' : ''}> Morning brief (client, weekdays 9:00 PKT — off when cloud sync on)</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-intraday" ${settings.telegramIntradayEnabled ? 'checked' : ''}> Intraday moves (PSX session, max 1/hour)</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-intraday-news" ${settings.telegramIntradayNewsEnabled ? 'checked' : ''}> Intraday news (Yahoo + Google RSS + BBC, max 1/hour)</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-dividend" ${settings.telegramDividendEnabled ? 'checked' : ''}> Dividend reminders (7 days before ex-date)</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-price" ${settings.telegramPriceAlertsEnabled ? 'checked' : ''}> Watchlist price alerts</label>
        <label class="lc-check-row"><input type="checkbox" id="tg-cloud" ${settings.telegramCloudSyncEnabled ? 'checked' : ''}> Cloud brief sync (background 9am PKT via worker)</label>
      </div>
      <div class="field" style="margin-bottom:12px;">
        <label class="field-label">Cloud sync key</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <input class="field-input" id="tg-sync-key" type="text" autocomplete="off" placeholder="Generate or paste wrangler secret" value="${settings.telegramSyncKey || ''}" style="flex:1;min-width:180px">
          <button type="button" class="btn-ghost btn-sm" data-action="Settings._genTelegramSyncKey">Generate</button>
        </div>
        <div class="field-hint">Match <code>TELEGRAM_SYNC_KEY</code> on Cloudflare worker. Syncs urgent signals only — never full ledger.</div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
        <button type="button" class="btn-ghost" data-action="Settings._syncTelegramCloud">Sync brief to cloud</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <button type="button" class="btn-primary" data-action="Settings._saveTelegram">Save Telegram</button>
        <button type="button" class="btn-secondary" data-action="Settings._sendTelegramTest">Send test message</button>
        <button type="button" class="btn-ghost" data-action="Settings._sendTelegramBrief">Send brief now</button>
        <button type="button" class="btn-ghost" data-action="Settings._sendTelegramPortfolioDigests">Send portfolio digests</button>
        <button type="button" class="btn-ghost" data-action="Settings._sendTelegramNews">Send news digest</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Manual Fund NAV</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:12px;">Meezan funds aren't on PSX — update NAV when AMC publishes new values.</p>
      ${(window.MEEZAN_FUNDS || []).map(f => {
        const p = state.prices?.[f.symbol];
        const nav = p?.price || f.currentNav;
        return `<div class="field-row" style="margin-bottom:8px;align-items:flex-end;">
          <div class="field" style="flex:1;">
            <label class="field-label">${f.symbol}</label>
            <input class="field-input nav-inp" data-sym="${f.symbol}" type="number" step="0.01" value="${nav}">
          </div>
          <button type="button" class="btn-ghost" style="padding:10px 14px;" data-action="Settings._saveNav" data-tab="${f.symbol}">Save</button>
        </div>`;
      }).join('')}
    </div>

    <div class="sec-head"><span class="sec-title">Try demo</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:0.75rem;color:var(--text3);margin-bottom:0;line-height:1.5;">Open <strong>?demo=1</strong> for a sample PSX + Meezan portfolio without replacing your ledger from Settings.</p>
    </div>

    <div class="sec-head"><span class="sec-title">Security &amp; PIN</span></div>
    <div style="background:var(--psx-bg-card);border-bottom:1px solid var(--psx-border);padding:16px;">
      <p style="font-size:0.75rem;color:var(--psx-text-2);margin-bottom:12px;line-height:1.5;">
        Optional 4–6 digit PIN. Hash stored locally — never sent to a server. Decoy PIN shows masked balances.
      </p>
      <div class="setting-row" style="padding:0 0 12px;border:none;">
        <div>
          <div class="setting-label">App lock</div>
          <div class="setting-sub">${PinVault?.isEnabled?.() ? 'Enabled' : 'Off'}${PinVault?.hasDecoy?.() ? ' · decoy set' : ''}</div>
        </div>
        <span class="setting-value ${PinVault?.isEnabled?.() ? 't-gain' : ''}">${PinVault?.isEnabled?.() ? '● On' : '○ Off'}</span>
      </div>
      <div class="field" style="margin-bottom:12px;">
        <label class="field-label">Auto-lock after</label>
        <select class="field-input" id="pin-autolock" data-action-change="Settings._setPinAutoLock">
          ${[0, 1, 5, 15, 60].map(m => `<option value="${m}"${(PinVault?.getAutoLock?.() ?? 5) === m ? ' selected' : ''}>${m === 0 ? 'Never (manual only)' : m === 60 ? '1 hour' : m + ' min'}</option>`).join('')}
        </select>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${PinVault?.isEnabled?.() ? `
          <button type="button" class="btn-secondary btn-sm" data-action="Settings._changePin">Change PIN</button>
          <button type="button" class="btn-ghost btn-sm" data-action="Settings._setDecoyPin">Decoy PIN</button>
          <button type="button" class="btn-ghost btn-sm" data-action="Settings._lockNow">Lock now</button>
          <button type="button" class="btn-danger btn-sm" data-action="Settings._disablePin">Disable PIN</button>
        ` : `
          <button type="button" class="btn-primary btn-sm" data-action="Settings._enablePin">Set PIN</button>
        `}
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Data Management</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row">
        <div>
          <div class="setting-label">Transactions</div>
          <div class="setting-sub">${txCount} entries in ledger</div>
        </div>
      </div>
      <div style="padding:12px 16px;display:flex;flex-direction:column;gap:8px;">
        <button type="button" class="btn-secondary" data-action="Settings._exportData">↑ Export .ledgercap Backup</button>
        <button type="button" class="btn-secondary" data-action="Settings._exportEncryptedBackup">🔒 Encrypted backup (PIN)</button>
        <button type="button" class="btn-secondary" data-action="Settings._pushCloudBackup">☁ Push cloud backup</button>
        <button type="button" class="btn-secondary" data-action="Settings._pullCloudBackup">☁ Restore from cloud</button>
        <p class="field-hint" style="margin:0">Cloud uses your Telegram sync key — encrypted ledger only, never plaintext.</p>
        <button type="button" class="btn-secondary" data-action="Settings._importData">↓ Import .ledgercap Backup</button>
        <button type="button" class="btn-danger" data-action="Settings._resetVault">⚠ Reset All Data</button>
      </div>
    </div>

    <div class="sec-head"><span class="sec-title">Portfolio Pilot</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);padding:16px;">
      <p style="font-size:12px;color:var(--os-text-secondary);margin-bottom:12px;line-height:1.5">Rule-based signals, CGT estimates, and rebalance tools — ported from Portfolio Pilot. Not AI advice.</p>
      <div class="field">
        <label class="field-label">Concentration alert (%)</label>
        <input class="field-input" id="p-conc" type="number" value="${pilot.concentrationThresholdPct ?? 20}" min="5" max="50">
      </div>
      <div class="field">
        <label class="field-label">Core P/E discount vs sector (%)</label>
        <input class="field-input" id="p-pe" type="number" value="${pilot.corePeDiscountPct ?? 15}" min="0" max="40">
      </div>
      <div class="field">
        <label class="field-label">Swing RSI oversold / overbought</label>
        <div style="display:flex;gap:8px">
          <input class="field-input" id="p-rsi-low" type="number" value="${pilot.swingRsiOversold ?? 35}" min="10" max="45" style="flex:1">
          <input class="field-input" id="p-rsi-high" type="number" value="${pilot.swingRsiOverbought ?? 65}" min="55" max="90" style="flex:1">
        </div>
      </div>
      <div class="field">
        <label class="field-label">Cash balance (₨) for rebalance</label>
        <input class="field-input" id="p-cash" type="number" value="${pilot.cashBalancePkr ?? 0}" min="0" step="1000">
      </div>
      <label style="display:flex;align-items:center;gap:10px;font-size:14px;margin:12px 0">
        <input type="checkbox" id="p-filer" ${pilot.isFiler !== false ? 'checked' : ''}>
        Filer (15% CGT on short-term gains)
      </label>
      <button type="button" class="btn-primary" style="width:100%;margin-top:8px" data-action="Settings._savePilot">Save Pilot settings</button>
    </div>

    <div class="sec-head"><span class="sec-title">About</span></div>
    <div style="background:var(--bg2);border-bottom:1px solid var(--bg4);">
      <div class="setting-row"><div class="setting-label">LedgerCap</div><span class="setting-value">v${window.APP_VERSION || '3.14.0'}</span></div>
      <div class="setting-row"><div class="setting-label">Architecture</div><span class="setting-value">Ledger-first</span></div>
      <div class="setting-row"><div class="setting-label">Storage</div><span class="setting-value">Local (offline-first)</span></div>
    </div>
    </div>`;
    if (typeof I18n !== 'undefined') I18n.bindLangSwitch(screen);
    _pingProxy(proxyUrl);
    if (typeof CapMotion !== 'undefined') CapMotion.refresh();
  }

  function _saveManualAssets() {
    const brokerCashPkr = parseFloat(document.getElementById('s-broker-cash')?.value) || 0;
    const usdCash = parseFloat(document.getElementById('s-usd-cash')?.value) || 0;
    const goldGrams = parseFloat(document.getElementById('s-gold-grams')?.value) || 0;
    State.update(s => {
      if (!s.manualAssets) s.manualAssets = {};
      s.manualAssets.brokerCashPkr = brokerCashPkr;
      s.manualAssets.usdCash = usdCash;
      s.manualAssets.goldGrams = goldGrams;
    });
    App.showToast('Manual assets saved', 'success');
    App.renderCurrent();
    render();
  }

  async function _refreshFx() {
    if (typeof FxService === 'undefined') return;
    const rate = await FxService.refreshUsdPkr();
    const inp = document.getElementById('s-usdrate');
    if (inp && rate) inp.value = Number(rate).toFixed(2);
    App.showToast(`USD/PKR ₨${Number(rate).toFixed(2)} (${FxService.getMeta?.().source || 'updated'})`, 'success');
    render();
  }

  function _saveProfile() {
    const salary = parseInt(document.getElementById('s-salary')?.value, 10) || 150000;
    const targetSIP = parseInt(document.getElementById('s-sip')?.value, 10) || 75000;
    const usdRate = parseFloat(document.getElementById('s-usdrate')?.value) || 280;
    const goldPricePerGram = parseInt(document.getElementById('s-goldprice')?.value, 10) || 18000;
    const gnewsApiKey = document.getElementById('s-gnews-key')?.value?.trim() || '';
    State.update(s => {
      s.settings.salary = salary;
      s.settings.targetSIP = targetSIP;
      s.settings.usdRate = usdRate;
      s.settings.goldPricePerGram = goldPricePerGram;
      if (gnewsApiKey) s.settings.gnewsApiKey = gnewsApiKey;
      else delete s.settings.gnewsApiKey;
    });
    App.showToast(`Saved: ₨${salary.toLocaleString()}/mo salary`, 'success');
    App.renderCurrent();
    render();
  }

  function _saveFundNavs() {
    if (typeof FundNavService === 'undefined') {
      App.showToast('Fund NAV service not loaded', 'error');
      return;
    }
    let n = 0;
    document.querySelectorAll('.fn-nav').forEach((inp) => {
      const sym = inp.dataset.symbol;
      const nav = parseFloat(inp.value);
      if (!(nav > 0)) return;
      const asOf = document.querySelector(`.fn-asof[data-symbol="${sym}"]`)?.value;
      FundNavService.saveNav(sym, nav, asOf);
      n++;
    });
    App.showToast(n ? `Saved ${n} fund NAV${n > 1 ? 's' : ''}` : 'Enter at least one NAV', n ? 'success' : 'error');
    App.renderCurrent();
    render();
  }

  function _saveNav() { _saveFundNavs(); }

  function _saveAssumptions() {
    const ret = parseFloat(document.getElementById('s-return')?.value) / 100 || 0.18;
    const inflation = parseFloat(document.getElementById('s-inflation')?.value) / 100 || 0.20;
    const pkrDep = parseFloat(document.getElementById('s-pkrdep')?.value) / 100 || 0.15;
    const freedom = parseInt(document.getElementById('s-freedom')?.value, 10) || 100000;
    State.update(s => {
      s.settings.targetReturn = ret;
      s.settings.inflationRate = inflation;
      s.settings.pkrDepreciationRate = pkrDep;
      s.settings.freedomTarget = freedom;
    });
    App.showToast('Assumptions saved ✓', 'success');
    App.renderCurrent();
    render();
  }

  function _resetAssumptions() {
    if (!confirm('Reset assumptions to defaults?')) return;
    State.update(s => {
      s.settings.targetReturn = 0.18;
      s.settings.inflationRate = 0.20;
      s.settings.pkrDepreciationRate = 0.15;
      s.settings.freedomTarget = 100000;
    });
    App.showToast('Assumptions reset to defaults', 'success');
    render();
  }

  function _pinPrompt(title, fields) {
    const body = fields.map(f =>
      `<div class="field"><label class="field-label">${f.label}</label><input class="field-input" id="${f.id}" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="6" autocomplete="off" placeholder="4–6 digits"></div>`
    ).join('');
    App.openBottomSheet('pin-sheet', title, `${body}<button type="button" class="btn-primary" style="width:100%;margin-top:12px" id="pin-sheet-submit">Continue</button>`);
    return new Promise(resolve => {
      document.getElementById('pin-sheet-submit')?.addEventListener('click', () => {
        const vals = {};
        fields.forEach(f => { vals[f.id] = document.getElementById(f.id)?.value || ''; });
        resolve(vals);
      }, { once: true });
    });
  }

  async function _enablePin() {
    const vals = await _pinPrompt('Set app PIN', [
      { id: 'pin-new', label: 'New PIN' },
      { id: 'pin-confirm', label: 'Confirm PIN' },
    ]);
    try {
      await PinVault.enablePin(vals['pin-new'], vals['pin-confirm']);
      App.closeBottomSheet();
      App.showToast('PIN enabled', 'success');
      render();
    } catch (e) {
      App.showToast(e.message || 'Could not set PIN', 'error');
    }
  }

  async function _changePin() {
    const vals = await _pinPrompt('Change PIN', [
      { id: 'pin-old', label: 'Current PIN' },
      { id: 'pin-new', label: 'New PIN' },
      { id: 'pin-confirm', label: 'Confirm new PIN' },
    ]);
    try {
      await PinVault.changePin(vals['pin-old'], vals['pin-new'], vals['pin-confirm']);
      App.closeBottomSheet();
      App.showToast('PIN updated', 'success');
    } catch (e) {
      App.showToast(e.message || 'Could not change PIN', 'error');
    }
  }

  async function _disablePin() {
    const vals = await _pinPrompt('Disable PIN', [{ id: 'pin-old', label: 'Current PIN' }]);
    try {
      await PinVault.disablePin(vals['pin-old']);
      App.closeBottomSheet();
      App.showToast('PIN disabled', 'success');
      render();
    } catch (e) {
      App.showToast(e.message || 'PIN incorrect', 'error');
    }
  }

  async function _setDecoyPin() {
    if (PinVault.hasDecoy()) {
      if (!confirm('Replace existing decoy PIN?')) return;
    }
    const vals = await _pinPrompt('Decoy PIN', [
      { id: 'pin-main', label: 'Main PIN (verify)' },
      { id: 'pin-decoy', label: 'Decoy PIN' },
    ]);
    try {
      await PinVault.setDecoyPin(vals['pin-decoy'], vals['pin-main']);
      App.closeBottomSheet();
      App.showToast('Decoy PIN saved', 'success');
      render();
    } catch (e) {
      App.showToast(e.message || 'Could not save decoy', 'error');
    }
  }

  function _setPinAutoLock(val) {
    PinVault.setAutoLock(parseInt(val, 10) || 0);
    App.showToast('Auto-lock updated', 'success');
  }

  function _lockNow() {
    PinVault.lock();
    PinLock.show();
  }

  function _exportData() {
    if (PinVault?.isDecoyMode?.()) {
      App.showToast('Export blocked in decoy view — use main PIN', 'warning');
      return;
    }
    const json = State.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ledgercap-backup-${new Date().toISOString().slice(0, 10)}.ledgercap`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('Backup exported', 'success');
  }

  async function _exportEncryptedBackup() {
    if (PinVault?.isDecoyMode?.()) {
      App.showToast('Export blocked in decoy view', 'warning');
      return;
    }
    if (typeof BackupCrypto === 'undefined') {
      App.showToast('Encryption unavailable', 'error');
      return;
    }
    const pin = prompt('Enter PIN to encrypt this backup (4+ digits):');
    if (!pin || pin.length < 4) {
      App.showToast('PIN required for encrypted backup', 'warning');
      return;
    }
    try {
      const payload = await BackupCrypto.encrypt(State.exportJSON(), pin);
      const blob = new Blob([payload], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ledgercap-encrypted-${new Date().toISOString().slice(0, 10)}.ledgercap.enc`;
      a.click();
      URL.revokeObjectURL(url);
      App.showToast('Encrypted backup exported', 'success');
    } catch (e) {
      App.showToast('Encrypt failed — enable PIN vault first', 'error');
    }
  }

  function _importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.ledgercap,.ledgercap.enc,.json,.stunds,application/json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (ev) => {
        let raw = ev.target.result;
        try {
          const parsed = JSON.parse(raw);
          if (parsed?.ledgercapEnc) {
            const pin = prompt('Enter PIN to decrypt backup:');
            if (!pin) return;
            raw = await BackupCrypto.decrypt(parsed, pin);
            if (!raw) { App.showToast('Decrypt failed — wrong PIN?', 'error'); return; }
          }
        } catch (_) { /* plain json */ }
        const ok = State.importJSON(raw);
        if (ok) { App.showToast('Data imported successfully', 'success'); App.renderCurrent(); }
        else App.showToast('Invalid backup file', 'error');
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function _saveProxy() {
    const url = window.LedgerCapConfig?.resolvePsxProxyUrl(document.getElementById('s-proxy')?.value?.trim() || '') || '';
    State.update(s => { s.settings.psxProxyUrl = url; });
    if (window.LEDGERCAP_CONFIG) window.LEDGERCAP_CONFIG.psxProxyUrl = url;
    _pingProxy(url);
    App.showToast(url ? 'Proxy URL saved' : 'Proxy cleared — using public fallbacks', 'success');
    App.renderCurrent();
    render();
  }

  function _saveNav(symbol) {
    const inp = document.querySelector(`.nav-inp[data-sym="${symbol}"]`);
    const nav = parseFloat(inp?.value);
    if (!nav || nav <= 0) { App.showToast('Enter a valid NAV', 'warning'); return; }
    State.updatePrice(symbol, { price: nav, prevClose: nav * 0.999, source: 'manual', ts: Date.now() });
    App.showToast(`${symbol} NAV updated to ₨${nav}`, 'success');
    App.renderCurrent();
  }

  function _snapshotBeforeDestructive() {
    try {
      const json = State.exportJSON();
      if (typeof PinVault !== 'undefined') PinVault.snapshotBeforeDestructive(json);
      else localStorage.setItem('ledgercap_pin_backup', json);
    } catch (e) {}
  }

  function _resetVault() {
    if (PinVault?.isDecoyMode?.()) {
      App.showToast('Reset blocked in decoy view', 'warning');
      return;
    }
    if (!confirm('Reset all data? Export a .ledgercap backup first if you need to recover.')) return;
    _snapshotBeforeDestructive();
    if (!confirm('Final confirmation — delete all ledger data on this device?')) return;
    State.reset();
    App.showToast('Data reset', 'warning');
    App.renderCurrent();
  }

  function loadSeedData(opts) {
    const silent = opts && opts.silent;
    const seed = window.INITIAL_TRANSACTIONS || [];
    if (!seed.length) { if (!silent) App.showToast('Seed data unavailable', 'error'); return false; }
    if (!silent && !confirm(`Load ${seed.length} portfolio transactions? Existing ledger will be replaced.`)) return false;
    State.update(s => {
      s.transactions = seed.map(t => ({ ...t, id: t.id || Ledger.newId(), createdAt: Date.now() }));
      s.settings.onboardingDone = true;
      s.seedDataVersion = window.SEED_DATA_VERSION || 0;
      if (window.USER_BROKER_CASH_PKR != null) {
        s.manualAssets = s.manualAssets || {};
        s.manualAssets.brokerCashPkr = window.USER_BROKER_CASH_PKR;
      } else if (window.RAFI_BROKER_CASH_PKR != null) {
        s.manualAssets = s.manualAssets || {};
        s.manualAssets.brokerCashPkr = window.RAFI_BROKER_CASH_PKR;
      }
      if (window.MEEZAN_FUNDS) {
        (window.MEEZAN_FUNDS || []).forEach(f => {
          if (f.currentNav) {
            s.prices[f.symbol] = { price: f.currentNav, prevClose: f.currentNav * 0.999, source: 'meezan_seed', ts: Date.now() };
          }
        });
      }
      if (window.FALLBACK_PRICES) {
        Object.entries(window.FALLBACK_PRICES).forEach(([sym, price]) => {
          s.prices[sym] = { price, prevClose: price * 0.998, source: 'seed', ts: Date.now() };
        });
      }
      if (Ledger.portfolioValueTimeline) {
        const timeline = Ledger.portfolioValueTimeline(s.transactions, (sym, fallback) => {
          const p = s.prices[sym]?.price;
          return (p && p > 0) ? p : ((window.FALLBACK_PRICES || {})[sym] || fallback || 0);
        });
        s.priceHistory = timeline.map(p => ({ date: p.date, value: p.value }));
      }
    });
    if (!silent) App.showToast('Portfolio loaded ✓', 'success');
    App.renderCurrent();
    render();
    return true;
  }

  function _loadSeed() {
    loadSeedData();
  }

  function _clearHoldings() {
    if (!confirm('Remove all transactions? Settings and prices stay.')) return;
    State.update(s => { s.transactions = []; });
    App.showToast('Transactions cleared', 'warning');
    App.renderCurrent();
    render();
  }

  function _savePilot() {
    const conc = parseFloat(document.getElementById('p-conc')?.value) || 20;
    const pe = parseFloat(document.getElementById('p-pe')?.value) || 15;
    const rsiLow = parseFloat(document.getElementById('p-rsi-low')?.value) || 35;
    const rsiHigh = parseFloat(document.getElementById('p-rsi-high')?.value) || 65;
    const cash = parseFloat(document.getElementById('p-cash')?.value) || 0;
    const isFiler = !!document.getElementById('p-filer')?.checked;
    State.update(s => {
      s.pilotSettings = {
        concentrationThresholdPct: conc,
        corePeDiscountPct: pe,
        swingRsiOversold: rsiLow,
        swingRsiOverbought: rsiHigh,
        cashBalancePkr: cash,
        isFiler,
      };
    });
    App.showToast('Pilot settings saved', 'success');
    App.renderCurrent();
    render();
  }

  function _setNumberFormat(mode) {
    if (mode !== 'full' && mode !== 'compact') return;
    State.update(s => { s.settings.numberFormat = mode; });
    App.showToast(mode === 'compact' ? 'Compact numbers on' : 'Full numbers on', 'success');
    render();
    App.renderCurrent();
  }

  function _setDisplayCurrency(cur) {
    if (cur !== 'PKR' && cur !== 'USD') return;
    State.update(s => { s.settings.displayCurrency = cur; });
    App._updateCurrencyToggleBtn?.();
    if (typeof GlanceBridge !== 'undefined') GlanceBridge.publish();
    App.renderCurrent();
    App.showToast(`Display: ${cur}`, 'success');
    render();
  }

  function _setLiveStream(on) {
    State.update(s => { s.settings.liveStreamEnabled = !!on; });
    if (typeof LivePriceStream !== 'undefined') {
      if (on) LivePriceStream.init();
      else LivePriceStream.stop?.();
    }
    App.showToast(on ? 'Live stream on' : 'Live stream off', 'success');
    render();
  }

  function _setSnapshot(on) {
    State.update(s => { s.settings.snapshotEnabled = !!on; });
    if (on && typeof PriceSnapshotService !== 'undefined') PriceSnapshotService.init();
    App.showToast(on ? 'Market snapshot on' : 'Market snapshot off', 'success');
    render();
  }

  function _exportStatementCsv() {
    if (typeof StatementExport === 'undefined') {
      App.showToast('Export not loaded', 'error');
      return;
    }
    StatementExport.exportCsv();
    App.showToast('CSV exported', 'success');
  }

  function _exportStatementPdf() {
    if (typeof StatementExport === 'undefined') {
      App.showToast('Export not loaded', 'error');
      return;
    }
    if (!StatementExport.exportHtml()) App.showToast('Allow popups for PDF', 'warning');
  }

  function _setHaptics(on) {
    State.update(s => { s.settings.hapticsEnabled = !!on; });
    App.showToast(on ? 'Haptics on' : 'Haptics off', 'success');
  }

  function _setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    App.applyTheme(theme);
    App.showToast(`${theme === 'light' ? 'Light' : 'Dark'} theme applied`, 'success');
    render();
  }

  async function _persistTelegramToken(tokenIn) {
    if (!tokenIn) return;
    if (typeof SecretsVault !== 'undefined') await SecretsVault.setTelegramToken(tokenIn);
    else State.update(s => { s.settings.telegramBotToken = tokenIn; });
  }

  async function _saveTelegram() {
    const tokenIn = document.getElementById('tg-token')?.value?.trim() || '';
    const chatId = document.getElementById('tg-chat')?.value?.trim() || '';
    const morning = !!document.getElementById('tg-morning')?.checked;
    const intraday = !!document.getElementById('tg-intraday')?.checked;
    const intradayNews = !!document.getElementById('tg-intraday-news')?.checked;
    const dividend = !!document.getElementById('tg-dividend')?.checked;
    const price = !!document.getElementById('tg-price')?.checked;
    const cloud = !!document.getElementById('tg-cloud')?.checked;
    const syncKey = document.getElementById('tg-sync-key')?.value?.trim() || '';
    if (tokenIn) await _persistTelegramToken(tokenIn);
    State.update(s => {
      s.settings.telegramChatId = chatId;
      s.settings.telegramMorningEnabled = morning;
      s.settings.telegramIntradayEnabled = intraday;
      s.settings.telegramIntradayNewsEnabled = intradayNews;
      s.settings.telegramDividendEnabled = dividend;
      s.settings.telegramPriceAlertsEnabled = price;
      s.settings.telegramCloudSyncEnabled = cloud;
      if (syncKey) s.settings.telegramSyncKey = syncKey;
    });
    App.showToast('Telegram settings saved', 'success');
    render();
  }

  async function _sendTelegramTest() {
    if (typeof TelegramService === 'undefined') {
      App.showToast('Telegram service not loaded', 'error');
      return;
    }
    const tokenIn = document.getElementById('tg-token')?.value?.trim();
    if (tokenIn) await _persistTelegramToken(tokenIn);
    const chatId = document.getElementById('tg-chat')?.value?.trim();
    if (chatId) {
      State.update(s => { s.settings.telegramChatId = chatId; });
    }
    if (!TelegramService.isConfigured()) {
      App.showToast('Enter bot token + chat ID first', 'warning');
      return;
    }
    App.showToast('Sending test…', 'info');
    const res = await TelegramService.sendTestMessage();
    App.showToast(res.ok ? 'Test message sent' : (res.error || 'Send failed'), res.ok ? 'success' : 'error');
  }

  async function _sendTelegramBrief() {
    if (!TelegramService?.isConfigured()) {
      App.showToast('Configure Telegram first', 'warning');
      return;
    }
    App.showToast('Building brief…', 'info');
    const res = await TelegramService.sendMorningBriefNow();
    App.showToast(res.ok ? 'Morning brief sent' : (res.error || 'Send failed'), res.ok ? 'success' : 'error');
  }

  async function _sendTelegramPortfolioDigests() {
    if (!TelegramService?.isConfigured()) {
      App.showToast('Configure Telegram first', 'warning');
      return;
    }
    App.showToast('Sending portfolio digests…', 'info');
    const res = await TelegramService.sendPortfolioDigestsNow();
    App.showToast(
      res.ok ? `Sent ${res.sent} portfolio message(s)` : (res.error || 'Send failed'),
      res.ok ? 'success' : 'error',
    );
  }

  async function _sendTelegramNews() {
    if (!TelegramService?.isConfigured()) {
      App.showToast('Configure Telegram first', 'warning');
      return;
    }
    App.showToast('Fetching news…', 'info');
    const res = await TelegramService.sendIntradayNewsNow();
    App.showToast(res.ok ? 'News digest sent' : (res.error || 'Send failed'), res.ok ? 'success' : 'error');
  }

  async function _detectTelegramChat() {
    const tokenIn = document.getElementById('tg-token')?.value?.trim();
    if (tokenIn) await _persistTelegramToken(tokenIn);
    if (!TelegramService?.resolveChatIds) {
      App.showToast('Telegram service not loaded', 'error');
      return;
    }
    App.showToast('Checking bot updates…', 'info');
    const res = await TelegramService.resolveChatIds();
    if (!res.ok) {
      App.showToast(res.error || 'Detect failed — message @LedgerCap_Bot first', 'error');
      return;
    }
    if (!res.chatIds?.length) {
      App.showToast('No chats yet — open t.me/LedgerCap_Bot and tap Start', 'warning');
      return;
    }
    const first = res.chatIds[0].id;
    State.update(s => { s.settings.telegramChatId = String(first); });
    const el = document.getElementById('tg-chat');
    if (el) el.value = String(first);
    App.showToast(`Chat ID ${first} detected`, 'success');
  }

  function _genTelegramSyncKey() {
    const key = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID().replace(/-/g, '')
      : 'lc' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    const el = document.getElementById('tg-sync-key');
    if (el) el.value = key;
    State.update(s => { s.settings.telegramSyncKey = key; });
    App.showToast('Sync key generated — save Telegram settings', 'success');
  }

  async function _syncTelegramCloud() {
    _saveTelegram();
    if (!TelegramService?.syncBriefToCloud) {
      App.showToast('Cloud sync not available', 'error');
      return;
    }
    App.showToast('Syncing brief…', 'info');
    const res = await TelegramService.syncBriefToCloud();
    App.showToast(res.ok ? `Synced (${res.bytes || 0} bytes)` : (res.error || 'Sync failed'), res.ok ? 'success' : 'error');
  }

  async function _checkTelegramProxy() {
    if (!TelegramService?.checkProxy) {
      App.showToast('Telegram service not loaded', 'error');
      return;
    }
    App.showToast('Checking worker proxy…', 'info');
    const res = await TelegramService.checkProxy();
    if (!res.ok) {
      App.showToast(res.error || 'Proxy failed — redeploy worker & check PSX proxy URL', 'error');
      return;
    }
    App.showToast(`Proxy OK (${res.proxy || 'worker'})`, 'success');
  }

  async function _pushCloudBackup() {
    if (typeof CloudBackupService === 'undefined') {
      App.showToast('Cloud backup not loaded', 'error');
      return;
    }
    const syncKey = document.getElementById('tg-sync-key')?.value?.trim();
    if (syncKey) State.update((s) => { s.settings.telegramSyncKey = syncKey; });
    App.showToast('Uploading encrypted backup…', 'info');
    const res = await CloudBackupService.pushBackup();
    App.showToast(res.ok ? 'Cloud backup saved' : (res.error || 'Upload failed'), res.ok ? 'success' : 'error');
  }

  async function _pullCloudBackup() {
    if (typeof CloudBackupService === 'undefined') {
      App.showToast('Cloud backup not loaded', 'error');
      return;
    }
    const syncKey = document.getElementById('tg-sync-key')?.value?.trim();
    if (syncKey) State.update((s) => { s.settings.telegramSyncKey = syncKey; });
    App.showToast('Fetching cloud backup…', 'info');
    const res = await CloudBackupService.pullBackup();
    if (res.ok) {
      App.showToast('Restored from cloud', 'success');
      App.renderCurrent();
      render();
    } else if (res.error !== 'Cancelled') {
      App.showToast(res.error || 'Restore failed', 'error');
    }
  }

  return { render, loadSeedData, _saveProfile, _saveManualAssets, _saveAssumptions, _resetAssumptions, _saveProxy, _saveNav, _saveFundNavs, _savePilot, _exportData, _exportEncryptedBackup, _importData, _resetVault, _loadSeed, _clearHoldings, _setTheme, _setHaptics, _setNumberFormat, _setDisplayCurrency, _setLiveStream, _setSnapshot, _exportStatementCsv, _exportStatementPdf, _refreshFx, _saveTelegram, _sendTelegramTest, _sendTelegramBrief, _sendTelegramPortfolioDigests, _sendTelegramNews, _detectTelegramChat, _genTelegramSyncKey, _syncTelegramCloud, _checkTelegramProxy, _pushCloudBackup, _pullCloudBackup, _enablePin, _changePin, _disablePin, _setDecoyPin, _setPinAutoLock, _lockNow };
})();
window.Settings = Settings;
