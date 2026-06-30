'use strict';
const Market = (() => {
  let _filter = 'all';

  function _rows() {
    const seen = new Set();
    const rows = [];
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach(s => {
      if (seen.has(s.symbol)) return;
      seen.add(s.symbol);
      const price = State.getPrice(s.symbol) || (window.FALLBACK_PRICES || {})[s.symbol] || 0;
      const prev = State.getPrevClose(s.symbol) || price;
      const chg = prev ? ((price - prev) / prev) * 100 : 0;
      rows.push({ ...s, price, chg });
    });
    return rows;
  }

  function render() {
    const screen = document.getElementById('screen-market');
    if (!screen) return;
    let rows = _rows();
    if (_filter === 'islamic') rows = rows.filter(r => r.isShariah);
    let adv = 0, dec = 0, unch = 0;
    rows.forEach(r => {
      if (r.chg > 0.05) adv++;
      else if (r.chg < -0.05) dec++;
      else unch++;
    });
    const bySector = {};
    rows.forEach(r => { (bySector[r.sector] = bySector[r.sector] || []).push(r); });

    screen.innerHTML = `
      ${PsxUI.strip()}
      ${PsxUI.pageTitle(I18n.t('market.title'), I18n.t('market.sub'))}
      ${PsxUI.filters([
        { id: 'all', label: I18n.t('screener.all') },
        { id: 'islamic', label: I18n.t('screener.islamic') },
      ], _filter, 'Market')}
      ${PsxUI.statGrid({ adv, dec, unch, listed: rows.length })}
      ${PsxUI.sectorTable(bySector, sym => `Navigation.go('research');Research.open('${sym}')`)}
      <div style="height:24px"></div>`;
  }

  function setFilter(f) { _filter = f; render(); }
  return { render, setFilter };
})();
window.Market = Market;
