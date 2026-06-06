'use strict';
const Advisor = (() => {
  function ratingClass(r) {
    const map = {
      'STRONG BUY': 'rating-strong-buy',
      'BUY': 'rating-buy',
      'HOLD': 'rating-hold',
      'WEAK HOLD': 'rating-weak-hold',
      'SPECULATIVE': 'rating-speculative',
    };
    return map[r] || 'rating-hold';
  }

  function render() {
    const screen = document.getElementById('screen-advisor');
    if (!screen) return;

    const watchlist = window.WATCHLIST || [];
    const ratings = window.ADVISOR_RATINGS || {};
    const customMemos = State.get('customMemos') || [];

    const memoSymbols = ['MEBL','PICT','PNSC','FFC','TRG','OGDC','SEARL','HINO','PASM','SLGL','HUBC','DGKC'];

    screen.innerHTML = `
    <div style="padding:calc(env(safe-area-inset-top,20px) + 16px) 0 0;">

    <!-- Section: Investment Rules -->
    <div class="sec-head"><span class="sec-title">Investment Rules</span></div>

    <div class="rule-card">
      <div class="rule-num">RULE 01</div>
      <div class="rule-text">No investment without a memo — bring every idea here first. If you can't write a thesis, you don't understand it well enough to own it.</div>
    </div>
    <div class="rule-card">
      <div class="rule-num">RULE 02</div>
      <div class="rule-text">No tips from friends or AI signals — information is not analysis. Every position must have a fundamental thesis you own and understand.</div>
    </div>
    <div class="rule-card">
      <div class="rule-num">RULE 03</div>
      <div class="rule-text">SIP is sacred — ₨75,000/month, no exceptions, no pauses. Consistency beats market timing. Every. Single. Month.</div>
    </div>
    <div class="rule-card">
      <div class="rule-num">RULE 04</div>
      <div class="rule-text">Never sell a quality name during a market panic. Meezan Bank, LUCK, TRG — these are buy-more opportunities, not sell signals.</div>
    </div>

    <!-- Section: Urgent Action -->
    <div class="sec-head" style="margin-top:8px;"><span class="sec-title">Urgent Action</span></div>

    <div class="urgent-card">
      <div class="urgent-icon">⚠️</div>
      <div style="font-size:0.88rem;font-weight:800;color:var(--gold);margin-bottom:6px;">Move ₨200,000 to MIIF MMKA</div>
      <div style="font-size:0.8rem;color:var(--text2);line-height:1.6;">
        Currently earning <strong style="color:var(--red)">0%</strong> in bank current account. MIIF yields ~16-18% pa.<br><br>
        Takes 5 minutes on the <strong style="color:var(--text)">Al Meezan app</strong>. Do it now — every week you wait costs ~₨1,500 in lost return.
      </div>
      <div style="margin-top:12px;padding:10px;background:rgba(240,185,11,0.06);border-radius:8px;border:1px solid rgba(240,185,11,0.15);">
        <div style="font-size:0.72rem;color:var(--gold);font-weight:700;">Annual opportunity cost of inaction: ₨32,000–36,000</div>
      </div>
    </div>

    <!-- Section: Priority Watchlist -->
    <div class="sec-head" style="margin-top:4px;"><span class="sec-title">Priority Watchlist</span></div>

    <div style="margin:0 0 8px;">
      ${watchlist.map(w => `
        <div class="watchlist-item">
          <div class="watchlist-top">
            <span class="watchlist-symbol t-title">${w.symbol}</span>
            <span class="priority-${w.priority.toLowerCase()}">${w.priority}</span>
            ${w.targetPrice ? `<span class="t-caption t-mono" style="margin-left:auto;">Target ₨${w.targetPrice}</span>` : ''}
          </div>
          <div class="watchlist-name">${w.name}</div>
          <div class="watchlist-thesis">${w.thesis}</div>
          <button class="btn-ghost btn-sm" style="margin-top:8px;" onclick="Navigation.go('stocks')">View Stock →</button>
        </div>`).join('')}
    </div>

    <!-- Section: Investment Memos -->
    <div class="sec-head" style="margin-top:4px;">
      <span class="sec-title">Investment Memos</span>
      <span class="sec-action" onclick="Advisor.showAddMemoForm()">+ New Memo</span>
    </div>

    <div style="margin-bottom:8px;">
      ${memoSymbols.filter(sym => ratings[sym]).map(sym => {
        const r = ratings[sym];
        return `<div class="memo-card">
          <div class="memo-header">
            <span class="memo-symbol">${sym}</span>
            <span class="rating-badge ${ratingClass(r.rating)}" style="font-size:0.62rem;">${r.rating}</span>
            <span class="memo-date">Jun 2026</span>
          </div>
          <div class="memo-text">${r.thesis}</div>
          ${r.target ? `<div class="t-caption t-mono" style="margin-top:6px;color:var(--orange);">Target: ₨${r.target}</div>` : ''}
          <div style="margin-top:6px;">
            <span class="t-dim" style="font-size:0.65rem;">Conviction: ${r.conviction}/10</span>
            <div class="conviction-bar" style="margin-top:3px;">
              <div class="conviction-fill" style="width:${r.conviction*10}%;background:var(--orange);"></div>
            </div>
          </div>
        </div>`;
      }).join('')}

      ${customMemos.map(m => `
        <div class="memo-card" style="border-color:rgba(139,92,246,0.2);">
          <div class="memo-header">
            <span class="memo-symbol">${m.symbol}</span>
            <span class="rating-badge rating-speculative" style="font-size:0.62rem;">CUSTOM</span>
            <span class="memo-date">${m.date}</span>
          </div>
          <div class="memo-text">${m.text}</div>
        </div>`).join('')}
    </div>

    </div>`;
  }

  function showAddMemoForm() {
    const sheet = document.getElementById('detail-sheet');
    const content = document.getElementById('detail-content');
    const header = sheet.querySelector('.detail-header');

    header.innerHTML = `
      <button class="btn-ghost btn-sm" onclick="document.getElementById('detail-sheet').classList.remove('open')">← Back</button>
      <div style="font-size:0.95rem;font-weight:700;">New Memo</div>`;

    content.innerHTML = `
      <div class="add-form">
        <div class="form-field">
          <label class="form-label">Stock Symbol</label>
          <input class="form-input" type="text" id="memo-symbol" placeholder="e.g. MEBL" style="text-transform:uppercase;">
        </div>
        <div class="form-field">
          <label class="form-label">Investment Thesis / Memo</label>
          <textarea class="form-input" id="memo-text" rows="6" placeholder="Why are you considering this stock? What's the thesis? What would make you buy/sell?" style="resize:none;line-height:1.6;"></textarea>
        </div>
        <button class="btn-primary" style="margin-top:8px;" onclick="Advisor.saveMemo()">Save Memo</button>
      </div>`;

    sheet.classList.add('open');
  }

  function saveMemo() {
    const sym = (document.getElementById('memo-symbol')?.value || '').trim().toUpperCase();
    const text = (document.getElementById('memo-text')?.value || '').trim();

    if (!sym || !text) { App.showToast('Fill symbol and memo text', 'error'); return; }

    const now = new Date();
    const dateStr = now.toLocaleDateString('en', { month: 'short', year: 'numeric' });

    State.update(s => {
      if (!s.customMemos) s.customMemos = [];
      s.customMemos.push({ symbol: sym, text, date: dateStr, createdAt: now.toISOString() });
    });

    App.showToast(`Memo saved for ${sym}`, 'success');
    document.getElementById('detail-sheet').classList.remove('open');
    render();
  }

  return { render, showAddMemoForm, saveMemo };
})();
window.Advisor = Advisor;
