'use strict';
const Funds = (() => {
  let _filter = 'all';

  function render() {
    const screen = document.getElementById('screen-funds');
    if (!screen) return;
    const funds = (window.MEEZAN_FUNDS || []).filter(f => {
      if (_filter === 'islamic') return f.isShariah;
      if (_filter === 'income') return /income|mmka/i.test(f.type || f.name);
      return true;
    });

    screen.innerHTML = `
      ${PsxUI.strip()}
      ${PsxUI.pageTitle(I18n.t('tools.fundNavs.t'), I18n.t('tools.fundNavs.d'))}
      ${PsxUI.filters([
        { id: 'all', label: I18n.t('screener.all') },
        { id: 'islamic', label: I18n.t('screener.islamic') },
        { id: 'income', label: 'Income' },
      ], _filter, 'Funds')}
      <div class="psx-table-wrap"><table class="psx-table"><thead><tr>
        <th>Fund</th><th>NAV</th><th>1Y</th><th>3Y</th><th>Yield</th><th>Type</th>
      </tr></thead><tbody>
      ${funds.map(f => {
        const a = (window.FUND_ANALYTICS_DB || {})[f.symbol] || {};
        const nav = State.getPrice(f.symbol) || f.currentNav || 0;
        return `<tr onclick="Navigation.go('research');Research.open('${f.symbol}')">
          <td><div class="psx-sym">${f.symbol}</div><div class="psx-sym-sub">${f.name}</div></td>
          <td>${PsxUI.fmt(nav)}</td>
          <td class="${PsxUI.chgCls(a.oneYearReturn)}">${a.oneYearReturn != null ? a.oneYearReturn + '%' : '—'}</td>
          <td>${a.threeYearReturn != null ? a.threeYearReturn + '%' : '—'}</td>
          <td class="psx-up">${a.divYield ? a.divYield + '%' : '—'}</td>
          <td>${f.type || '—'}</td>
        </tr>`;
      }).join('')}
      </tbody></table></div>`;
  }

  function setFilter(f) { _filter = f; render(); }
  return { render, setFilter };
})();
window.Funds = Funds;
