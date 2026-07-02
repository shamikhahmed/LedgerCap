'use strict';
const Announcements = (() => {
  let _news = [];
  let _tab = 'all';

  function _heldSymbols() {
    const txs = State.get().transactions || [];
    return [...new Set(txs.map(t => (t.symbol || '').toUpperCase()).filter(Boolean))];
  }

  function _corpItems(symbols) {
    const items = [];
    const symSet = new Set(symbols);
    if (typeof CorporateActionsService === 'undefined') return items;

    CorporateActionsService.getAllUpcoming().forEach(d => {
      if (!symSet.size || symSet.has(d.symbol)) {
        items.push({
          kind: 'dividend',
          symbol: d.symbol,
          title: `${d.symbol} — ${d.type || 'cash'} dividend`,
          date: d.paymentDate || d.exDate,
          detail: d.amount ? `₨${d.amount}/share` : (d.status || 'upcoming'),
          status: d.status || 'upcoming',
        });
      }
    });

    symbols.forEach(sym => {
      CorporateActionsService.getBonusShares(sym).slice(0, 2).forEach(b => {
        items.push({
          kind: 'bonus',
          symbol: sym,
          title: `${sym} — bonus ${b.ratio || ''}`,
          date: b.creditDate || b.announcementDate,
          detail: b.ratio || 'Bonus issue',
          status: 'announced',
        });
      });
      CorporateActionsService.getRightsIssues(sym).slice(0, 2).forEach(r => {
        items.push({
          kind: 'rights',
          symbol: sym,
          title: `${sym} — rights issue`,
          date: r.exDate || r.announcementDate,
          detail: r.ratio || r.price ? `${r.ratio || ''} @ ₨${r.price || ''}` : 'Rights',
          status: 'announced',
        });
      });
    });

    return items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  async function _loadNews(symbols) {
    if (typeof NewsService === 'undefined' || !NewsService.fetchPortfolioNews) return [];
    try {
      return await NewsService.fetchPortfolioNews(State.get());
    } catch (_) {
      return [];
    }
  }

  function _itemRow(it) {
    const badge = it.kind === 'dividend' ? 'Dividend' : it.kind === 'bonus' ? 'Bonus' : it.kind === 'rights' ? 'Rights' : 'News';
    const date = it.date ? String(it.date).slice(0, 10) : (it.publishedAt ? String(it.publishedAt).slice(0, 10) : '');
    const safeUrl = it.url && /^https?:\/\//i.test(String(it.url)) ? String(it.url) : '';
    const safeSym = String(it.symbol || '').replace(/[^A-Za-z0-9.\-:]/g, '');
    const link = safeUrl ? `onclick="window.open('${esc(safeUrl.replace(/'/g, '%27'))}', '_blank')"` : (safeSym ? `onclick="Research.open('${safeSym}')"` : '');
    return `<button type="button" class="lc-announce-row" ${link}>
      <div class="lc-announce-top"><strong>${esc(it.symbol || 'PSX')}</strong><span class="lc-announce-badge">${badge}</span></div>
      <p>${esc(it.title)}</p>
      <em>${date}${it.detail ? ' · ' + esc(it.detail) : ''}</em>
    </button>`;
  }

  function _paintList() {
    const el = document.getElementById('announcements-list');
    if (!el) return;
    const corp = _corpItems(_heldSymbols());
    const news = _news.map(n => ({
      kind: 'news',
      symbol: n.portfolioSymbol || n.symbol,
      title: n.title,
      date: n.publishedAt,
      detail: n.publisher || n.source,
      url: n.url,
    }));
    let items = [...corp, ...news];
    if (_tab === 'corp') items = corp;
    if (_tab === 'news') items = news;
    items = items.slice(0, 40);
    el.innerHTML = items.length
      ? items.map(_itemRow).join('')
      : `<p class="psx-muted">No announcements for your holdings yet. Add transactions or load demo.</p>`;
  }

  function setTab(tab) {
    _tab = tab;
    _paintList();
    document.querySelectorAll('#screen-announcements .lc-segment-btn').forEach(b => {
      b.classList.toggle('on', b.textContent.trim().toLowerCase() === tab || b.getAttribute('onclick')?.includes(`'${tab}'`));
    });
  }

  async function refresh() {
    _news = await _loadNews(_heldSymbols());
    _paintList();
  }

  function render() {
    const screen = document.getElementById('screen-announcements');
    if (!screen) return;
    const syms = _heldSymbols();

    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>Announcements</h1>
          <p>Corporate actions · dividends · portfolio news</p>
        </div>
        ${PsxUI.segment([
          { id: 'all', label: 'All' },
          { id: 'corp', label: 'Corporate' },
          { id: 'news', label: 'News' },
        ], _tab, 'Announcements', 'setTab')}
        <p class="lc-card-sub">${syms.length ? syms.length + ' holding(s) tracked' : 'No holdings — showing market-wide upcoming dividends'}</p>
        <div class="lc-sector-card" id="announcements-list"><p class="psx-muted">Loading…</p></div>
        <div class="lc-dash-actions">
          <button type="button" class="psx-btn psx-btn-primary" onclick="Announcements.refresh()">Refresh</button>
          <button type="button" class="psx-btn psx-btn-ghost" onclick="Navigation.go('calendar')">Wealth calendar →</button>
        </div>
        <div class="lc-disclaimer">Headlines and dividend dates from public sources — confirm on PSX / company filings.</div>
      </div>`;

    _paintList();
    if (!_news.length) refresh();
    CapMotion.refresh();
  }

  return { render, refresh, setTab };
})();
window.Announcements = Announcements;
