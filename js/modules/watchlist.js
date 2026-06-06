'use strict';
const Watchlist = (() => {

  const PRELOADED_WATCHLIST = [
    { symbol:'MEBL', name:'Meezan Bank', rating:'STRONG BUY', thesis:'Best bank in Pakistan. P/E 6.5, 20% profit growth. Should be largest single stock position.', targetPrice:null, action:'Build position' },
    { symbol:'PICT', name:'Pakistan Int\'l Container Terminal', rating:'BUY', thesis:'Near-monopoly port terminal. Dollar-linked revenues. Build to 500+ shares over 12 months.', targetPrice:null, action:'Buy to 500 shares' },
    { symbol:'PNSC', name:'Pakistan National Shipping', rating:'BUY', thesis:'Dollar revenues, state-backed, 7.6% dividend. Position too small — double or triple it.', targetPrice:null, action:'Double/triple position' },
    { symbol:'FFC',  name:'Fauji Fertilizer Company', rating:'BUY', thesis:'Dividend yield 7.4%, analyst target PKR 629. Bought above market — add on dips.', targetPrice:629, action:'Buy on dips' },
    { symbol:'OGDC', name:'Oil & Gas Dev Co', rating:'BUY', thesis:'Deploy from MIIF reserves when KSE drops 8-10%. Be patient.', targetPrice:null, action:'Wait for 8-10% market drop' },
  ];

  const PRELOADED_MEMOS = [
    { symbol:'MEBL',  date:'2025-12-01', text:'Best bank in Pakistan. P/E 6.5, 20% profit growth. Should be largest single stock position. Shariah-compliant, growing rapidly. This should be a 500+ share position.' },
    { symbol:'PICT',  date:'2025-12-01', text:'Near-monopoly port terminal. Dollar-linked revenues — earns in USD, inflation-protected. Build to 500+ shares over 12 months. Current position of 160 is too small.' },
    { symbol:'PNSC',  date:'2025-12-01', text:'Dollar revenues, state-backed shipping company. 7.6% dividend yield. Position of 25 shares is tiny — this needs to be 75-100 shares minimum.' },
    { symbol:'FFC',   date:'2025-12-01', text:'Dividend yield 7.4%, analyst target PKR 629. Both accounts hold FFC (AKD at 560.92). Added above analyst target — buy more aggressively only on dips below ₨500.' },
    { symbol:'PASM',  date:'2025-12-01', text:'Tip-based buy. No fundamental thesis. Structurally a weak company. Monitor for exit opportunity when price recovers. Do not add more.' },
    { symbol:'SLGL',  date:'2025-12-01', text:'Tip-based buy. Structurally weak textile company. No sustainable competitive advantage. Monitor for exit. Lesson: no tips without a memo.' },
    { symbol:'HINO',  date:'2025-12-01', text:'Auto assembler in Pakistan. Facing headwinds from EV disruption globally and import policy changes. Weak thesis — hold only, no accumulation.' },
    { symbol:'PIBTL', date:'2025-12-01', text:'Bulk terminal logistics. Right sector (port infrastructure) but smaller and less dominant than PICT. Hold for now, watch for opportunities to consolidate into PICT instead.' },
  ];

  function ratingClass(r) {
    if (!r) return '';
    if (r === 'STRONG BUY') return 'rating-strong-buy';
    if (r === 'BUY') return 'rating-buy';
    if (r === 'HOLD') return 'rating-hold';
    if (r === 'WEAK HOLD') return 'rating-weak-hold';
    if (r === 'SPECULATIVE') return 'rating-speculative';
    return '';
  }

  function getWatchlist() {
    const saved = State.get('watchlist') || [];
    const savedSymbols = new Set(saved.map(w => w.symbol));
    const preloaded = PRELOADED_WATCHLIST.filter(w => !savedSymbols.has(w.symbol));
    return [...PRELOADED_WATCHLIST, ...saved.filter(w => !PRELOADED_WATCHLIST.find(p => p.symbol === w.symbol))];
  }

  function getMemos() {
    const saved = State.get('notes') || [];
    const savedSymbols = new Set(saved.map(n => n.symbol));
    const preloaded = PRELOADED_MEMOS.filter(m => !savedSymbols.has(m.symbol));
    return [...preloaded, ...saved].sort((a, b) => b.date.localeCompare(a.date));
  }

  function render() {
    const el = document.getElementById('screen-watchlist');
    if (!el) return;

    const watchlist = getWatchlist();
    const memos = getMemos();

    el.innerHTML = `
      <div class="screen-header">
        <div class="screen-title">Watchlist</div>
        <div class="screen-subtitle">Rules · Watchlist · Memos</div>
      </div>

      <!-- Urgent Action -->
      <div style="padding:0 18px">
        <div class="urgent-card">
          <div style="font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);margin-bottom:6px">⚡ Urgent Action</div>
          <div style="font-size:0.88rem;font-weight:600;color:var(--gold)">Transfer ₨200,000 from bank to MIIF (MMKA)</div>
          <div style="font-size:0.75rem;color:var(--text2);margin-top:4px">Idle cash earning 0%. MIIF currently yields ~22% p.a. Move this today.</div>
        </div>
      </div>

      <!-- Investment Rules -->
      <div class="section-header"><span class="section-label">Non-Negotiable Rules</span></div>
      <div style="padding:0 18px">
        <div class="rule-card">
          <div class="rule-title">Rule 1 — No investment without a memo</div>
          <div class="rule-body">If you can't write a clear investment thesis in 3 sentences, you can't buy. No exceptions.</div>
        </div>
        <div class="rule-card">
          <div class="rule-title">Rule 2 — No tips from friends or AI signals</div>
          <div class="rule-body">PASM and SLGL are proof. Tips without fundamentals are gambling. Your edge is research and patience.</div>
        </div>
        <div class="rule-card">
          <div class="rule-title">Rule 3 — SIP is sacred</div>
          <div class="rule-body">₨75,000/month, every month, no matter what the market is doing. This is your wealth-building engine.</div>
        </div>
        <div class="rule-card">
          <div class="rule-title">Rule 4 — Position sizing matters</div>
          <div class="rule-body">High conviction (8-9/10) = large position. Low conviction (2-3/10) = exit opportunity, not accumulation.</div>
        </div>
      </div>

      <!-- Watchlist -->
      <div class="section-header">
        <span class="section-label">Buy Watchlist</span>
        <button class="section-action" onclick="Watchlist.openAddItem()">+ Add</button>
      </div>
      <div style="padding:0 18px">
        ${watchlist.map(w => `
          <div class="watchlist-item">
            <div class="row-between" style="margin-bottom:6px">
              <div>
                <span class="watchlist-symbol">${w.symbol}</span>
                <span style="font-size:0.72rem;color:var(--text3);margin-left:6px">${w.name}</span>
              </div>
              <div style="display:flex;gap:6px;align-items:center">
                ${w.targetPrice ? `<span class="dividend-chip">₨${w.targetPrice}</span>` : ''}
                <span class="rating-badge ${ratingClass(w.rating)}">${w.rating}</span>
              </div>
            </div>
            <div class="watchlist-thesis">${w.thesis}</div>
            ${w.action ? `<div style="font-size:0.72rem;color:var(--orange);margin-top:6px;font-weight:600">→ ${w.action}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Investment Memos -->
      <div class="section-header">
        <span class="section-label">Investment Memos</span>
        <button class="section-action" onclick="Watchlist.openAddMemo()">+ Memo</button>
      </div>
      <div style="padding:0 18px">
        ${memos.map(m => `
          <div class="memo-card">
            <div class="row-between">
              <span class="memo-symbol">${m.symbol}</span>
              <span class="memo-date">${m.date}</span>
            </div>
            <div class="memo-text">${m.text}</div>
          </div>
        `).join('')}
      </div>

      <div style="height:24px"></div>
    `;
  }

  function openAddItem() {
    const html = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div class="modal-title">Add to Watchlist</div>
        <button class="modal-close" onclick="Watchlist.closeAdd()">✕</button>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">Symbol</label>
          <input class="input-field" id="w-symbol" placeholder="e.g. ENGRO" style="text-transform:uppercase">
        </div>
        <div class="input-group">
          <label class="input-label">Company Name</label>
          <input class="input-field" id="w-name" placeholder="e.g. Engro Corporation">
        </div>
        <div class="input-group">
          <label class="input-label">Investment Thesis</label>
          <textarea class="input-field" id="w-thesis" rows="3" placeholder="Why do you want to buy this?" style="resize:none"></textarea>
        </div>
        <div class="input-group">
          <label class="input-label">Target Price (₨, optional)</label>
          <input class="input-field" id="w-target" type="number" step="0.01" placeholder="Optional">
        </div>
        <button class="btn btn-primary" onclick="Watchlist.saveAdd()">Add to Watchlist</button>
      </div>
    `;

    const overlay = document.getElementById('watchlist-add-overlay');
    const sheet = document.getElementById('watchlist-add-sheet');
    if (!overlay || !sheet) return;
    sheet.innerHTML = html;
    overlay.classList.add('active');
  }

  function closeAdd() {
    const overlay = document.getElementById('watchlist-add-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function saveAdd() {
    const symbol = document.getElementById('w-symbol')?.value.trim().toUpperCase();
    const name = document.getElementById('w-name')?.value.trim();
    const thesis = document.getElementById('w-thesis')?.value.trim();
    const targetPrice = parseFloat(document.getElementById('w-target')?.value) || null;

    if (!symbol || !thesis) { App.showToast('Symbol and thesis required', 'error'); return; }

    State.update(s => {
      s.watchlist.push({ symbol, name: name || symbol, thesis, targetPrice, rating:'WATCH', action:null, date: new Date().toISOString().split('T')[0] });
    });

    closeAdd();
    render();
    App.showToast(`${symbol} added to watchlist`, 'success');
  }

  function openAddMemo() {
    const html = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div class="modal-title">New Investment Memo</div>
        <button class="modal-close" onclick="Watchlist.closeMemo()">✕</button>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <label class="input-label">Symbol</label>
          <input class="input-field" id="m-symbol" placeholder="e.g. MEBL" style="text-transform:uppercase">
        </div>
        <div class="input-group">
          <label class="input-label">Memo</label>
          <textarea class="input-field" id="m-text" rows="5" placeholder="Write your investment thesis here…" style="resize:none"></textarea>
        </div>
        <button class="btn btn-primary" onclick="Watchlist.saveMemo()">Save Memo</button>
      </div>
    `;

    const overlay = document.getElementById('memo-add-overlay');
    const sheet = document.getElementById('memo-add-sheet');
    if (!overlay || !sheet) return;
    sheet.innerHTML = html;
    overlay.classList.add('active');
  }

  function closeMemo() {
    const overlay = document.getElementById('memo-add-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function saveMemo() {
    const symbol = document.getElementById('m-symbol')?.value.trim().toUpperCase();
    const text = document.getElementById('m-text')?.value.trim();

    if (!symbol || !text) { App.showToast('Symbol and memo required', 'error'); return; }

    State.update(s => {
      s.notes.push({ symbol, text, date: new Date().toISOString().split('T')[0] });
    });

    closeMemo();
    render();
    App.showToast('Memo saved', 'success');
  }

  return {
    render,
    openAddItem, closeAdd, saveAdd,
    openAddMemo, closeMemo, saveMemo,
  };
})();
window.Watchlist = Watchlist;
