'use strict';
const Screener = (() => {
  let _filter = 'all';

  function _rows() {
    const db = window.FUNDAMENTALS_DB || {};
    const seen = new Set();
    const rows = [];
    [...(window.RAFI_STOCKS || []), ...(window.AKD_STOCKS || [])].forEach(s => {
      if (seen.has(s.symbol)) return;
      seen.add(s.symbol);
      const f = db[s.symbol] || {};
      rows.push({ ...s, pe: f.pe, divYield: f.divYield, profitGrowth: f.profitGrowth, roe: f.roe, price: State.getPrice(s.symbol) || (window.FALLBACK_PRICES || {})[s.symbol] || 0 });
    });
    return rows;
  }

  function _match(r) {
    if (_filter === 'islamic' && !r.isShariah) return false;
    if (_filter === 'highDiv' && (!r.divYield || r.divYield < 6)) return false;
    if (_filter === 'value' && (!r.pe || r.pe > 12)) return false;
    return true;
  }

  function render() {
    const screen = document.getElementById('screen-screener');
    if (!screen) return;
    const rows = _rows().filter(_match).sort((a, b) => (b.divYield || 0) - (a.divYield || 0));
    screen.innerHTML = `
      ${PsxUI.strip()}
      ${PsxUI.pageTitle(I18n.t('screener.title'), I18n.t('screener.sub'))}
      ${PsxUI.filters([
        { id: 'all', label: I18n.t('screener.all') },
        { id: 'islamic', label: I18n.t('screener.islamic') },
        { id: 'highDiv', label: I18n.t('screener.highDiv') },
        { id: 'value', label: I18n.t('screener.value') },
      ], _filter, 'Screener')}
      <div class="psx-table-wrap"><table class="psx-table"><thead><tr>
        <th>Symbol</th><th>P/E</th><th>Yield</th><th>Growth</th><th>ROE</th><th>Last</th>
      </tr></thead><tbody>
      ${rows.map(r => `<tr onclick="Navigation.go('research');Research.open('${r.symbol}')">
        <td><div class="psx-sym">${r.symbol}</div><div class="psx-sym-sub">${r.name}</div></td>
        <td>${r.pe ?? '—'}</td>
        <td class="psx-up">${r.divYield ? r.divYield + '%' : '—'}</td>
        <td class="${PsxUI.chgCls(r.profitGrowth)}">${r.profitGrowth != null ? r.profitGrowth + '%' : '—'}</td>
        <td>${r.roe != null ? r.roe + '%' : '—'}</td>
        <td>${PsxUI.fmt(r.price)}</td>
      </tr>`).join('')}
      </tbody></table></div>`;
  }

  function setFilter(f) { _filter = f; render(); }
  return { render, setFilter };
})();
window.Screener = Screener;
