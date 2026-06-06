'use strict';
const App = (() => {
  function launch() {
    document.getElementById('nav').classList.remove('hidden');
    Navigation.restoreLast();
  }

  function showToast(msg, type, duration) {
    duration = duration || 2500;
    const wrap = document.getElementById('toast-wrap');
    if (!wrap) return;
    const t = document.createElement('div');
    t.className = 'toast ' + (type || 'info');
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), duration);
  }

  function openPriceModal() {
    const modal = document.getElementById('price-modal');
    if (!modal) return;
    const stocks = State.get('stocks') || [];
    const funds  = State.get('funds')  || [];
    const list   = document.getElementById('price-modal-list');

    if (list) {
      list.innerHTML = `
      <div style="padding:10px 16px;background:var(--bg3);border-bottom:1px solid var(--bg4);">
        <div class="t-label">STOCKS (KSE)</div>
      </div>
      ${stocks.map(s => `
        <div class="price-input-row">
          <div>
            <div class="price-symbol">${s.symbol}</div>
            <div class="price-last">${s.broker} · Last: ${s.currentPrice > 0 ? '₨' + s.currentPrice.toFixed(2) : 'not set'}</div>
          </div>
          <input class="price-input" type="number" step="0.01" min="0"
            data-type="stock" data-symbol="${s.symbol}"
            placeholder="0.00"
            value="${s.currentPrice > 0 ? s.currentPrice : ''}">
        </div>`).join('')}
      <div style="padding:10px 16px;background:var(--bg3);border-bottom:1px solid var(--bg4);margin-top:8px;">
        <div class="t-label">FUND NAVs (MEEZAN)</div>
      </div>
      ${funds.map(f => `
        <div class="price-input-row">
          <div>
            <div class="price-symbol">${f.symbol}</div>
            <div class="price-last">Units: ${f.units.toFixed(4)} · Last NAV: ₨${f.currentNav.toFixed(4)}</div>
          </div>
          <input class="price-input" type="number" step="0.0001" min="0"
            data-type="fund" data-symbol="${f.symbol}"
            placeholder="0.0000"
            value="${f.currentNav > 0 ? f.currentNav : ''}">
        </div>`).join('')}`;
    }
    modal.classList.add('open');
  }

  function closePriceModal() {
    document.getElementById('price-modal')?.classList.remove('open');
  }

  function savePrices() {
    const inputs = document.querySelectorAll('.price-input');
    let updated = 0;
    inputs.forEach(input => {
      const val = parseFloat(input.value);
      if (!val || val <= 0) return;
      if (input.dataset.type === 'stock') {
        State.updateStockPrice(input.dataset.symbol, val);
      } else {
        State.updateFundNav(input.dataset.symbol, val);
      }
      updated++;
    });
    closePriceModal();
    showToast('Updated ' + updated + ' prices', 'success');
    Overview.render();
    const cur = Navigation.getCurrent();
    if (cur === 'stocks') Stocks.render();
    if (cur === 'funds')  Funds.render();
  }

  async function fetchViaProxy(yahooUrl) {
    const proxies = [
      `https://corsproxy.io/?${yahooUrl}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`
    ];
    for (const proxyUrl of proxies) {
      try {
        const res = await fetch(proxyUrl);
        if (res.ok) return res;
      } catch {}
    }
    throw new Error('all proxies failed');
  }

  async function fetchYahooPrices() {
    showToast('Fetching prices from Yahoo Finance...', 'info', 4000);
    const stocks  = State.get('stocks') || [];
    const symbols = [...new Set(stocks.map(s => s.symbol))];
    let updated = 0;
    let failed  = 0;

    for (const symbol of symbols) {
      try {
        const yahooUrl = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}.KA?interval=1d&range=1d`;
        const res = await fetchViaProxy(yahooUrl);
        const data = await res.json();
        const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
        if (price && price > 0) {
          State.updateStockPrice(symbol, price);
          const input = document.querySelector(`input[data-symbol="${symbol}"][data-type="stock"]`);
          if (input) input.value = price.toFixed(2);
          updated++;
        } else { failed++; }
      } catch { failed++; }
      await new Promise(r => setTimeout(r, 120));
    }

    try {
      const kseRes = await fetchViaProxy('https://query2.finance.yahoo.com/v8/finance/chart/%5EKMEX?interval=1d&range=1d');
      if (kseRes.ok) {
        const kseData = await kseRes.json();
        const meta = kseData?.chart?.result?.[0]?.meta;
        if (meta?.regularMarketPrice) {
          State.set('kseIndex', {
            value: meta.regularMarketPrice,
            change: meta.regularMarketChange,
            changeP: meta.regularMarketChangePercent,
            updated: new Date().toISOString()
          });
        }
      }
    } catch {}

    if (updated > 0) {
      showToast('Updated ' + updated + ' prices from Yahoo Finance', 'success');
      Overview.render();
      if (Navigation.getCurrent() === 'stocks') Stocks.render();
    } else {
      showToast('Could not fetch prices — please update manually', 'error', 4000);
    }
    if (failed > 0) showToast(failed + ' symbols not found on Yahoo', 'info');
  }

  function init() {
    State.get(); // ensure loaded

    launch();

    document.getElementById('price-modal-save')?.addEventListener('click', savePrices);
    document.getElementById('price-modal-close')?.addEventListener('click', closePriceModal);
    document.getElementById('price-modal-yahoo')?.addEventListener('click', fetchYahooPrices);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && Navigation.getCurrent() === 'overview') Overview.render();
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }

  return { init, launch, showToast, openPriceModal, closePriceModal, savePrices, fetchYahooPrices };
})();
window.App = App;
document.addEventListener('DOMContentLoaded', App.init);
