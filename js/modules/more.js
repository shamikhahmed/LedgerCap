'use strict';
const More = (() => {
  const ITEMS = () => [
    { id: 'global', t: I18n.t('tools.global.t'), d: I18n.t('tools.global.d') },
    { id: 'zakat', t: I18n.t('tools.zakat.t'), d: I18n.t('tools.zakat.d') },
    { id: 'import', t: I18n.t('tools.import.t'), d: I18n.t('tools.import.d') },
    { id: 'screener', t: I18n.t('tools.screener.t'), d: I18n.t('tools.screener.d') },
    { id: 'dividends', t: I18n.t('tools.dividends.t'), d: I18n.t('tools.dividends.d') },
    { id: 'watchlist', t: I18n.t('tools.watchlist.t'), d: I18n.t('tools.watchlist.d') },
    { id: 'signals', t: I18n.t('tools.signals.t'), d: I18n.t('tools.signals.d') },
    { id: 'comparison', t: 'Compare', d: 'Side by side' },
    { id: 'transactions', t: I18n.t('tools.transactions.t'), d: I18n.t('tools.transactions.d') },
    { id: 'settings', t: 'Settings', d: I18n.t('more.sub') },
  ];

  function render() {
    const screen = document.getElementById('screen-more');
    if (!screen) return;
    screen.innerHTML = `
      <div class="lc-dash">
        <div class="lc-screen-head">
          <h1>${I18n.t('more.title')}</h1>
          <p>${I18n.t('more.sub')}</p>
        </div>
        <div class="lc-tool-grid" style="margin-top:8px">
          ${ITEMS().map(it => `
            <button type="button" class="lc-tool-card" onclick="Navigation.go('${it.id}')">
              <strong>${it.t}</strong>
              <span>${it.d}</span>
            </button>`).join('')}
        </div>
        <div style="padding:24px 4px">${I18n.langSwitcher('lc-more-lang')}</div>
      </div>`;
    I18n.bindLangSwitch(screen);
  }
  return { render };
})();
window.More = More;
