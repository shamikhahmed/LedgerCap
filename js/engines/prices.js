'use strict';
const Prices = (() => {
  const PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?url=',
  ];

  const YAHOO_SYMBOL_MAP = {
    'ENGROH': 'ENGROH.KA',
    'MIIETF': null,
    'MZNPETF': null,
    'MIIF-B': null,
    'MIIF-MMKA': null,
    'MAAF': null,
    'MBF': null,
    'MDAAF-MDYP': null,
    'KMIF': null,
    'MIF': null,
  };

  const FUND_SYMBOLS = new Set(['KMIF','MAAF','MBF','MDAAF-MDYP','MIF','MIIF-B','MIIF-MMKA','MIIETF','MZNPETF']);

  let _proxyFailStreak = 0;
  let _proxyDownUntil = 0;
  let _proxyWarned = false;
  const _yahooSkip = new Set();
  const WORKER_RETRIES = 2;
  const WORKER_RETRY_MS = 350;

  function _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function _markProxySuccess() {
    _proxyFailStreak = 0;
    _proxyDownUntil = 0;
  }

  function _markProxyDown(status) {
    _proxyFailStreak++;
    // One flaky 520 should not ban worker for 5 minutes — that forces public CORS proxies.
    if (_proxyFailStreak >= 4) _proxyDownUntil = Date.now() + 60000;
    if (!_proxyWarned && _proxyFailStreak >= 2) {
      console.warn('LedgerCap: PSX proxy flaky — retrying; public fallbacks disabled for PSX.');
      _proxyWarned = true;
      if (typeof App !== 'undefined' && App.showToast) {
        App.showToast('Live PSX feed slow — using cached prices where needed', 'warning');
      }
    }
  }

  function _isHtml(text) {
    const t = (text || '').trim();
    return t.startsWith('<!DOCTYPE') || t.startsWith('<html') || t.startsWith('<HTML');
  }

  function _isBadPayload(text) {
    const t = (text || '').trim();
    if (!t) return true;
    if (_isHtml(t)) return true;
    if (/^error code:\s*\d+/i.test(t)) return true;
    if (t.startsWith('{') && t.includes('"error"')) return true;
    return false;
  }

  function _parseJson(text) {
    if (!text || _isBadPayload(text)) return null;
    try { return JSON.parse(text); } catch { return null; }
  }

  function _parseTimeseries(data, source) {
    const rows = Array.isArray(data) ? data : (data?.data || []);
    if (!Array.isArray(rows) || !rows.length) return null;
    const sorted = [...rows].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
    const last = sorted[sorted.length - 1];
    if (!Array.isArray(last) || last.length < 2) return null;
    const price = parseFloat(last[1]);
    const prevRow = sorted.length > 1 ? sorted[sorted.length - 2] : last;
    const prev = parseFloat(last[3] ?? prevRow[1] ?? last[1]);
    if (!price || price <= 0) return null;
    return {
      price,
      prevClose: prev > 0 && prev !== price ? prev : price * 0.999,
      source,
      ts: Date.now(),
    };
  }

  async function fetchPriceSeries(symbol, points) {
    points = points || 30;
    const sym = (symbol || '').toUpperCase();
    const intl = (window.INTL_STOCKS || []).find(s => s.symbol === sym);
    const crypto = (window.CRYPTO_ASSETS || []).find(c => c.symbol === sym);
    if (intl || crypto) {
      const yahoo = intl?.yahoo || sym;
      let data = await _fetchWorkerPath(`yahoo/chart/${encodeURIComponent(yahoo)}`);
      let closes = _yahooCloses(data);
      if (closes.length < 2) {
        data = await _fetchPublicProxy(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahoo)}?interval=1d&range=3mo`);
        closes = _yahooCloses(data);
      }
      if (closes.length >= 2) return closes.slice(-points);
    }
    const raw = await _fetchRaw(`https://dps.psx.com.pk/timeseries/eod/${sym}`);
    const rows = Array.isArray(raw) ? raw : (raw?.data || []);
    if (!Array.isArray(rows) || rows.length < 2) return [];
    const sorted = [...rows].sort((a, b) => (Number(a[0]) || 0) - (Number(b[0]) || 0));
    return sorted.slice(-points).map(r => parseFloat(r[1])).filter(n => n > 0);
  }

  function _yahooCloses(data) {
    const result = data?.chart?.result?.[0];
    if (!result) return [];
    const q = result.indicators?.quote?.[0];
    if (result.timestamp && q?.close) {
      return result.timestamp
        .map((_, i) => q.close[i])
        .filter(v => v != null && Number.isFinite(v) && v > 0);
    }
    const adj = result.indicators?.adjclose?.[0]?.adjclose;
    if (Array.isArray(adj)) return adj.filter(v => v != null && v > 0);
    return [];
  }

  async function _fetchAppProxy(url, attempt = 0) {
    if (Date.now() < _proxyDownUntil) return null;

    const bases = [...(window.LedgerCapConfig?.psxProxyBases?.() || [])];
    const fromState = (typeof State !== 'undefined' && State.get('settings')?.psxProxyUrl) || '';
    if (fromState) {
      const resolved = window.LedgerCapConfig?.resolvePsxProxyUrl(fromState);
      if (resolved && !bases.includes(resolved)) bases.unshift(resolved);
    }
    if (!bases.length) return null;

    const path = url.replace('https://dps.psx.com.pk/', '');
    for (const base of bases) {
      const root = base.replace(/\/$/, '');
      const proxyUrl = `${root}/${path}`;
      try {
        const res = await fetch(proxyUrl, { headers: { Accept: 'application/json' } });
        if (!res.ok) {
          if (attempt < WORKER_RETRIES) {
            await _sleep(WORKER_RETRY_MS * (attempt + 1));
            return _fetchAppProxy(url, attempt + 1);
          }
          _markProxyDown(res.status);
          continue;
        }
        const text = await res.text();
        if (_isBadPayload(text)) {
          if (attempt < WORKER_RETRIES) {
            await _sleep(WORKER_RETRY_MS * (attempt + 1));
            return _fetchAppProxy(url, attempt + 1);
          }
          _markProxyDown(520);
          continue;
        }
        const parsed = _parseJson(text);
        if (parsed) {
          _markProxySuccess();
          return parsed;
        }
      } catch {
        if (attempt < WORKER_RETRIES) {
          await _sleep(WORKER_RETRY_MS * (attempt + 1));
          return _fetchAppProxy(url, attempt + 1);
        }
        _markProxyDown(502);
      }
    }
    return null;
  }

  /** Public CORS proxies — Yahoo only. PSX via allorigins/corsproxy is rate-limited and noisy. */
  async function _fetchPublicProxy(url) {
    if (/dps\.psx\.com\.pk/i.test(url)) return null;
    for (const proxyUrl of PROXIES) {
      try {
        const res = await fetch(proxyUrl + encodeURIComponent(url), {
          headers: { Accept: 'application/json,text/plain,*/*' }
        });
        if (!res.ok) continue;
        const text = await res.text();
        if (_isBadPayload(text)) continue;
        let payload = text;
        try {
          const j = JSON.parse(text);
          if (j && j.contents !== undefined) payload = j.contents;
          else if (j && typeof j === 'object' && !Array.isArray(j)) return j;
        } catch {}
        if (typeof payload === 'string') {
          const parsed = _parseJson(payload);
          if (parsed) return parsed;
          continue;
        }
        return payload;
      } catch {}
    }
    return null;
  }

  async function _fetchRaw(url) {
    const appProxy = await _fetchAppProxy(url);
    if (appProxy) return appProxy;
    return _fetchPublicProxy(url);
  }

  async function fetchPsxSymbol(symbol) {
    const sym = symbol.toUpperCase();
    // EOD first — more stable through worker; int as upgrade when market open
    const urls = [
      { url: `https://dps.psx.com.pk/timeseries/eod/${sym}`, source: 'psx_eod' },
      { url: `https://dps.psx.com.pk/timeseries/int/${sym}`, source: 'psx_int' },
    ];
    for (const { url, source } of urls) {
      const data = await _fetchRaw(url);
      if (!data) continue;
      const parsed = _parseTimeseries(data, source);
      if (parsed) return { ...parsed, symbol: sym };
    }
    return null;
  }

  async function fetchPsxLive(symbols) {
    const results = {};
    const sessionOpen = typeof PsxSession !== 'undefined' && PsxSession.isOpen();
    const batchSize = 2;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const chunk = symbols.slice(i, i + batchSize);
      for (const sym of chunk) {
        let parsed = null;
        if (sessionOpen) {
          const intData = await _fetchRaw(`https://dps.psx.com.pk/timeseries/int/${sym}`);
          parsed = _parseTimeseries(intData, 'psx_int');
        }
        if (!parsed) {
          const eodData = await _fetchRaw(`https://dps.psx.com.pk/timeseries/eod/${sym}`);
          parsed = _parseTimeseries(eodData, 'psx_eod');
        }
        if (parsed) results[sym] = { ...parsed, symbol: sym };
      }
      if (i + batchSize < symbols.length) await _sleep(120);
    }
    return results;
  }

  async function _fetchWorkerPath(path) {
    const bases = window.LedgerCapConfig?.psxProxyBases?.() || [];
    for (const base of bases) {
      try {
        const res = await fetch(`${base.replace(/\/$/, '')}/${path}`, { headers: { Accept: 'application/json' } });
        if (!res.ok) continue;
        return await res.json();
      } catch (_) {}
    }
    return null;
  }

  function _parseYahooChart(data, symbol, source) {
    const meta = data?.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice;
    const prevClose = meta?.previousClose || meta?.chartPreviousClose;
    if (!price || price <= 0) return null;
    const divRaw = meta.trailingAnnualDividendYield;
    return {
      symbol,
      price,
      priceUsd: price,
      prevClose,
      prevCloseUsd: prevClose,
      trailingPE: meta.trailingPE,
      dividendYield: divRaw != null ? divRaw * 100 : null,
      source: source || 'yahoo',
      currency: 'USD',
      ts: Date.now(),
    };
  }

  async function fetchIntlSymbol(symbol) {
    const meta = (window.INTL_STOCKS || []).find(s => s.symbol === symbol);
    const yahoo = meta?.yahoo || symbol;
    let data = await _fetchWorkerPath(`yahoo/chart/${encodeURIComponent(yahoo)}`);
    let parsed = _parseYahooChart(data, symbol, 'yahoo_intl');
    if (!parsed) {
      data = await _fetchPublicProxy(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahoo)}?interval=1d&range=5d`);
      parsed = _parseYahooChart(data, symbol, 'yahoo_intl');
    }
    if (parsed) return parsed;
    const fb = (window.GLOBAL_FALLBACK_USD || {})[symbol];
    return fb ? { symbol, price: fb, priceUsd: fb, prevClose: fb * 0.999, source: 'fallback', currency: 'USD', ts: Date.now() } : null;
  }

  async function fetchCryptoSymbol(symbol) {
    const meta = (window.CRYPTO_ASSETS || []).find(c => c.symbol === symbol);
    const id = meta?.coingecko || symbol.toLowerCase();
    const data = await _fetchWorkerPath(`crypto/price?ids=${encodeURIComponent(id)}`);
    const row = data?.[id];
    const price = row?.usd;
    if (!price) {
      const fb = (window.GLOBAL_FALLBACK_USD || {})[symbol];
      return fb ? { symbol, price: fb, priceUsd: fb, prevClose: fb * 0.999, source: 'fallback', currency: 'USD', ts: Date.now() } : null;
    }
    const chg = row.usd_24h_change || 0;
    const prev = price / (1 + chg / 100);
    return { symbol, price, priceUsd: price, prevClose: prev, source: 'coingecko', currency: 'USD', ts: Date.now() };
  }

  async function fetchGlobalQuote(symbol, assetClass) {
    if (assetClass === 'crypto') return fetchCryptoSymbol(symbol);
    if ((window.INTL_STOCKS || []).some(s => s.symbol === symbol)) return fetchIntlSymbol(symbol);
    return null;
  }

  async function fetchAllGlobal(holdings, onProgress) {
    const results = {};
    let i = 0;
    for (const h of holdings || []) {
      const q = await fetchGlobalQuote(h.symbol, h.assetClass);
      if (q) results[h.symbol] = q;
      if (onProgress) onProgress(++i, holdings.length, h.symbol, !!q, q?.source);
      await _sleep(100);
    }
    return results;
  }

  function fundNavFallback(symbol) {
    const fund = (window.MEEZAN_FUNDS || []).find(f => f.symbol === symbol);
    const fp = (window.FALLBACK_PRICES || {})[symbol];
    const nav = fund?.currentNav || fp;
    if (!nav) return null;
    return {
      symbol,
      price: nav,
      prevClose: nav * 0.999,
      source: fund ? 'meezan_seed' : 'fallback',
      ts: Date.now() - 3600000
    };
  }

  async function _fetchYahoo(symbol) {
    if (_yahooSkip.has(symbol)) return null;
    const yahooSym = symbol in YAHOO_SYMBOL_MAP ? YAHOO_SYMBOL_MAP[symbol] : `${symbol}.KA`;
    if (yahooSym === null) return null;

    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSym}?interval=1d&range=5d`;
    const data = await _fetchPublicProxy(url);
    const meta = data?.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice;
    const prevClose = meta?.previousClose || meta?.chartPreviousClose;
    if (!price || price <= 0) {
      _yahooSkip.add(symbol);
      return null;
    }
    if (!_sanityCheck(symbol, price)) {
      _yahooSkip.add(symbol);
      return null;
    }
    return { symbol, price, prevClose, source: 'yahoo', ts: Date.now() };
  }

  async function fetchStock(symbol) {
    if (FUND_SYMBOLS.has(symbol)) return fundNavFallback(symbol);

    if ((window.CRYPTO_ASSETS || []).some(c => c.symbol === symbol)) {
      const r = await fetchCryptoSymbol(symbol);
      if (r && typeof FxService !== 'undefined') {
        return { ...r, price: FxService.usdToPkr(r.priceUsd || r.price) };
      }
      return r;
    }

    if ((window.INTL_STOCKS || []).some(s => s.symbol === symbol)) {
      const r = await fetchIntlSymbol(symbol);
      if (r && typeof FxService !== 'undefined') {
        return { ...r, price: FxService.usdToPkr(r.priceUsd || r.price) };
      }
      return r;
    }

    const psx = await fetchPsxSymbol(symbol);
    if (psx && _sanityCheck(symbol, psx.price)) return { symbol, ...psx };

    const yahoo = await _fetchYahoo(symbol);
    if (yahoo) return yahoo;

    const fp = (window.FALLBACK_PRICES || {})[symbol];
    return fp ? { symbol, price: fp, prevClose: fp * 0.999, source: 'fallback', ts: Date.now() - 86400000 } : null;
  }

  function _sanityCheck(symbol, price) {
    const fallback = (window.FALLBACK_PRICES || {})[symbol] || 0;
    if (fallback > 0 && (price > fallback * 3 || price < fallback * 0.3)) {
      return false;
    }
    return true;
  }

  async function fetchKSE100() {
    const psxIdx = await _fetchRaw('https://dps.psx.com.pk/timeseries/eod/KSE100');
    const parsed = _parseTimeseries(psxIdx, 'psx_eod');
    if (parsed) {
      const change = parsed.price - parsed.prevClose;
      const changeP = parsed.prevClose ? (change / parsed.prevClose) * 100 : 0;
      return { value: parsed.price, change, changeP, prevClose: parsed.prevClose, ts: Date.now() };
    }
    const yahoo = await _fetchPublicProxy('https://query2.finance.yahoo.com/v8/finance/chart/%5EKSE100?interval=1d&range=1d');
    const meta = yahoo?.chart?.result?.[0]?.meta;
    if (meta?.regularMarketPrice) {
      return {
        value: meta.regularMarketPrice,
        change: meta.regularMarketChange || 0,
        changeP: meta.regularMarketChangePercent || 0,
        prevClose: meta.previousClose || meta.chartPreviousClose,
        ts: Date.now()
      };
    }
    return null;
  }

  async function fetchAll(symbols, onProgress) {
    const results = {};
    const stockSyms = symbols.filter(s => !FUND_SYMBOLS.has(s));
    const fundSyms = symbols.filter(s => FUND_SYMBOLS.has(s));

    const live = await fetchPsxLive(stockSyms);
    Object.assign(results, live);
    if (Object.keys(live).length > 0 && onProgress) {
      onProgress(Object.keys(live).length, symbols.length, 'batch', true, 'psx_int');
    }

    let done = Object.keys(results).length;
    for (const symbol of stockSyms) {
      if (results[symbol]) {
        if (onProgress) onProgress(++done, symbols.length, symbol, true, results[symbol].source || 'psx_int');
        continue;
      }

      const psx = await fetchPsxSymbol(symbol);
      if (psx && _sanityCheck(symbol, psx.price)) {
        results[symbol] = psx;
        if (onProgress) onProgress(++done, symbols.length, symbol, true, psx.source);
        continue;
      }

      if (YAHOO_SYMBOL_MAP[symbol] === null) {
        const fb = fundNavFallback(symbol);
        if (fb) results[symbol] = fb;
        if (onProgress) onProgress(++done, symbols.length, symbol, !!fb, 'skip');
        continue;
      }

      const yahoo = await _fetchYahoo(symbol);
      if (yahoo) {
        results[symbol] = yahoo;
        if (onProgress) onProgress(++done, symbols.length, symbol, true, 'yahoo');
      } else {
        const fp = (window.FALLBACK_PRICES || {})[symbol];
        if (fp) results[symbol] = { price: fp, prevClose: fp * 0.999, source: 'fallback', ts: Date.now() - 86400000 };
        if (onProgress) onProgress(++done, symbols.length, symbol, !!fp, 'fallback');
      }
      await new Promise(r => setTimeout(r, 40));
    }

    for (const symbol of fundSyms) {
      const nav = fundNavFallback(symbol);
      if (nav) results[symbol] = nav;
      done++;
      if (onProgress) onProgress(done, symbols.length, symbol, true, 'meezan_seed');
    }

    return results;
  }

  function formatTs(ts) {
    if (!ts) return 'never';
    const d = new Date(ts);
    const now = new Date();
    const diffMin = Math.floor((now - d) / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
    return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' });
  }

  function sourceLabel(source) {
    const map = {
      psx_live: 'PSX Live',
      psx_int: 'PSX Intraday',
      psx_symbol: 'PSX',
      psx_eod: 'PSX EOD',
      yahoo: 'Yahoo',
      yahoo_intl: 'US Market',
      coingecko: 'Crypto',
      meezan_seed: 'Meezan NAV',
      fallback: 'Last known',
      manual: 'Manual',
      stale: 'Stale'
    };
    return map[source] || source || '—';
  }

  function priceBadge(symbol) {
    if (typeof State === 'undefined') return '';
    const isGlobal = (window.INTL_STOCKS || []).some(s => s.symbol === symbol)
      || (window.CRYPTO_ASSETS || []).some(c => c.symbol === symbol);
    const src = State.getPriceSource(symbol);
    const px = State.getPrice(symbol);
    const fb = (window.GLOBAL_FALLBACK_USD || {})[symbol];
    if (isGlobal && !px && !fb) {
      return '<span class="lc-price-badge lc-price-badge--stale" title="No live price yet">Unpriced</span>';
    }
    const stale = State.isPriceStale(symbol, 24);
    const age = State.priceAgeLabel(symbol);
    const label = stale ? 'Stale' : sourceLabel(src);
    const cls = stale ? 'lc-price-badge lc-price-badge--stale' : 'lc-price-badge';
    return `<span class="${cls}" title="${age || ''}">${label}${age && !stale ? ' · ' + age : ''}</span>`;
  }

  return { fetchStock, fetchSymbol: fetchStock, fetchKSE100, fetchAll, formatTs, sourceLabel, priceBadge, fetchPsxSymbol, fetchIntlSymbol, fetchCryptoSymbol, fetchGlobalQuote, fetchAllGlobal, fetchPriceSeries };
})();
window.Prices = Prices;
window.YAHOO_SYMBOL_MAP = {
  'ENGROH': 'ENGROH.KA',
  'MIIETF': null,
  'MZNPETF': null,
  'MIIF-B': null,
  'MIIF-MMKA': null,
  'MAAF': null,
  'MBF': null,
  'MDAAF-MDYP': null,
  'KMIF': null,
  'MIF': null,
};
