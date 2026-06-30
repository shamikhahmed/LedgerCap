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
      ${PsxUI.strip()}
      ${PsxUI.pageTitle(I18n.t('more.title'), I18n.t('more.sub'))}
      ${ITEMS().map(it => `<button type="button" class="psx-list-btn" onclick="Navigation.go('${it.id}')">
        <div><strong>${it.t}</strong><span>${it.d}</span></div><span>→</span>
      </button>`).join('')}
      <div style="padding:16px">${I18n.langSwitcher('lc-more-lang')}</div>`;
    I18n.bindLangSwitch(screen);
  }
  return { render };
})();
window.More = More;
