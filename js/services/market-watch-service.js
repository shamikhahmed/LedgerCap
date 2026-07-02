'use strict';
/** PSX market-watch + trading-board parse (Investify-style bid/offer). */
const MarketWatchService = (() => {
  const CACHE_MS = 90000;
  const _cache = new Map();

  function _num(s) {
    if (s == null) return 0;
    const n = parseFloat(String(s).replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  function _parseTradingRow(html, symbol) {
    const sym = (symbol || '').toUpperCase();
    const re = new RegExp(
      `<tr>[\\s\\S]*?data-search="${sym}"[\\s\\S]*?<\\/tr>`,
      'i'
    );
    const row = html.match(re)?.[0];
    if (!row) return null;
    const tds = [...row.matchAll(/<td[^>]*data-order="([^"]*)"[^>]*>([\s\S]*?)<\/td>/gi)];
    if (tds.length < 9) {
      const rights = [...row.matchAll(/class="right"[^>]*data-order="([^"]*)"[^>]*>([^<]*)/gi)];
      if (rights.length < 7) return null;
      const [, bidVol, bidPrice, askVol, askPrice, ldcp, , volume] = rights.map(m => m[1]);
      return {
        symbol: sym,
        bidVol: _num(bidVol),
        bidPrice: _num(bidPrice),
        askVol: _num(askVol),
        askPrice: _num(askPrice),
        ldcp: _num(ldcp),
        volume: _num(volume),
        spread: _num(askPrice) - _num(bidPrice),
      };
    }
    const bidVol = _num(tds[2]?.[1]);
    const bidPrice = _num(tds[3]?.[1]);
    const askVol = _num(tds[4]?.[1]);
    const askPrice = _num(tds[5]?.[1]);
    const ldcp = _num(tds[6]?.[1]);
    const volume = _num(tds[8]?.[1]);
    return {
      symbol: sym,
      bidVol,
      bidPrice,
      askVol,
      askPrice,
      ldcp,
      volume,
      spread: askPrice > 0 && bidPrice > 0 ? askPrice - bidPrice : 0,
    };
  }

  function _parseMarketRow(html, symbol) {
    const sym = (symbol || '').toUpperCase();
    const re = new RegExp(
      `<tr>[\\s\\S]*?<strong>${sym}<\\/strong>[\\s\\S]*?<\\/tr>`,
      'i'
    );
    const row = html.match(re)?.[0];
    if (!row) return null;
    const orders = [...row.matchAll(/class="right"[^>]*data-order="([^"]*)"/gi)].map(m => _num(m[1]));
    if (orders.length < 8) return null;
    const [ldcp, open, high, low, close, change, changePct, volume] = orders;
    return { symbol: sym, ldcp, open, high, low, close, change, changePct, volume };
  }

  async function _fetchHtml(path) {
    const clean = path.replace(/^\//, '');
    const bases = [...(window.LedgerCapConfig?.psxProxyBases?.() || [])];
    const fromState = (typeof State !== 'undefined' && State.get('settings')?.psxProxyUrl) || '';
    if (fromState && window.LedgerCapConfig?.resolvePsxProxyUrl) {
      const resolved = window.LedgerCapConfig.resolvePsxProxyUrl(fromState);
      if (resolved && !bases.includes(resolved)) bases.unshift(resolved);
    }
    if (!bases.length) {
      bases.push('https://ledgercap-psx-proxy.shamikhahmed.workers.dev');
    }
    for (const base of bases) {
      try {
        const res = await fetch(`${base.replace(/\/$/, '')}/${clean}`, { headers: { Accept: 'text/html,*/*' } });
        if (!res.ok) continue;
        const text = await res.text();
        if (text && text.includes('<')) return text;
      } catch (_) {}
    }
    return null;
  }

  async function getOrderBook(symbol) {
    const sym = (symbol || '').toUpperCase();
    if (!sym) return null;
    const hit = _cache.get(`ob:${sym}`);
    if (hit && Date.now() - hit.ts < CACHE_MS) return hit.data;

    let html = await _fetchHtml('trading-board/REG/main');
    if (typeof html !== 'string') html = '';
    let data = _parseTradingRow(html, sym);

    if (!data) {
      const mw = await _fetchHtml('market-watch');
      if (typeof mw === 'string') {
        const row = _parseMarketRow(mw, sym);
        if (row) {
          data = {
            symbol: sym,
            bidVol: 0,
            bidPrice: row.close || row.ldcp,
            askVol: 0,
            askPrice: row.close || row.ldcp,
            ldcp: row.ldcp,
            volume: row.volume,
            open: row.open,
            high: row.high,
            low: row.low,
            change: row.change,
            changePct: row.changePct,
            spread: 0,
            fallback: true,
          };
        }
      }
    }

    if (data) _cache.set(`ob:${sym}`, { ts: Date.now(), data });
    return data;
  }

  function panelHtml(data) {
    if (!data) {
      return `<div class="lc-orderbook lc-orderbook--empty"><p class="psx-muted">Order book unavailable — market closed or PSX feed slow.</p></div>`;
    }
    const fmt = n => Number(n || 0).toLocaleString('en-PK', { maximumFractionDigits: 2 });
    const spread = data.spread > 0 ? fmt(data.spread) : '—';
    const note = data.fallback ? '<p class="lc-card-sub">Last trade — full bid/offer when PSX session open.</p>' : '';
    return `<div class="lc-orderbook">
      <div class="lc-orderbook-grid">
        <div class="lc-orderbook-side lc-orderbook-side--bid">
          <span class="lc-orderbook-label">Bid</span>
          <strong>${fmt(data.bidPrice)}</strong>
          <em>${fmt(data.bidVol)} vol</em>
        </div>
        <div class="lc-orderbook-mid">
          <span>Spread</span>
          <strong>${spread}</strong>
          <em>Vol ${fmt(data.volume)}</em>
        </div>
        <div class="lc-orderbook-side lc-orderbook-side--ask">
          <span class="lc-orderbook-label">Offer</span>
          <strong>${fmt(data.askPrice)}</strong>
          <em>${fmt(data.askVol)} vol</em>
        </div>
      </div>
      ${data.high ? `<div class="lc-orderbook-ohlc">
        <span>O ${fmt(data.open)}</span><span>H ${fmt(data.high)}</span><span>L ${fmt(data.low)}</span><span>LDCP ${fmt(data.ldcp)}</span>
      </div>` : ''}
      ${note}
    </div>`;
  }

  return { getOrderBook, panelHtml, _parseTradingRow };
})();
window.MarketWatchService = MarketWatchService;
