'use strict';
const I18n = (() => {
  const STORAGE_KEY = 'ledgercap_lang';
  let _lang = 'en';

  function _pack() {
    return (window.I18N_LOCALES || {})[_lang] || window.I18N_LOCALES.en;
  }

  function getLang() { return _lang; }

  function setLang(code) {
    if (!window.I18N_LOCALES[code]) code = 'en';
    _lang = code;
    localStorage.setItem(STORAGE_KEY, code);
    document.documentElement.lang = code === 'ur' ? 'ur' : 'en';
    document.documentElement.dir = code === 'ur' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lc-rtl', code === 'ur');
    if (typeof State !== 'undefined') {
      State.update(s => { s.settings = s.settings || {}; s.settings.language = code; });
    }
    _refreshChrome();
    if (typeof Navigation !== 'undefined') Navigation.init();
    if (typeof Navigation !== 'undefined') Navigation.go(Navigation.current(), true);
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY)
      || (typeof State !== 'undefined' && State.get('settings')?.language)
      || 'en';
    _lang = window.I18N_LOCALES[saved] ? saved : 'en';
    document.documentElement.lang = _lang === 'ur' ? 'ur' : 'en';
    document.documentElement.dir = _lang === 'ur' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lc-rtl', _lang === 'ur');
  }

  function t(key) {
    const parts = key.split('.');
    let o = _pack();
    for (const p of parts) {
      o = o?.[p];
      if (o == null) break;
    }
    if (typeof o === 'string') return o;
    const en = window.I18N_LOCALES.en;
    let fallback = en;
    for (const p of parts) {
      fallback = fallback?.[p];
      if (fallback == null) break;
    }
    return typeof fallback === 'string' ? fallback : key;
  }

  function langSwitcher(id) {
    const langs = [
      { code: 'en', label: t('lang.en') },
      { code: 'ur', label: t('lang.ur') },
      { code: 'roman', label: t('lang.roman') },
    ];
    return `<div class="lc-lang-switch" id="${id || 'lc-lang-switch'}" role="group" aria-label="${t('lang.label')}">
      ${langs.map(l => `<button type="button" class="lc-lang-btn${_lang === l.code ? ' on' : ''}" data-lang="${l.code}">${l.label}</button>`).join('')}
    </div>`;
  }

  function bindLangSwitch(root) {
    (root || document).querySelectorAll('[data-lang]').forEach(btn => {
      btn.onclick = () => setLang(btn.dataset.lang);
    });
  }

  function _refreshChrome() {
    const title = document.getElementById('app-title');
    if (title) title.textContent = t('appName');
    const splashTitle = document.querySelector('.splash-title');
    if (splashTitle) splashTitle.textContent = t('appName');
    const splashSub = document.querySelector('.splash-sub');
    if (splashSub) splashSub.textContent = t('tagline');
    const langHost = document.getElementById('lc-header-lang');
    if (langHost) {
      langHost.innerHTML = langSwitcher('lc-header-lang-inner');
      bindLangSwitch(langHost);
    }
  }

  return { init, t, setLang, getLang, langSwitcher, bindLangSwitch };
})();
window.I18n = I18n;
window.t = (k) => I18n.t(k);
