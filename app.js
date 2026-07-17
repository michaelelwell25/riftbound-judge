// Riftbound Judge App — Drill-down navigation
(function() {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const APP_VERSION = '1.1.0';

  // Navigation stack: [{view, title, render()}]
  const navStack = [];
  let searchTimeout = null;
  let currentSearchFn = null;

  document.addEventListener('DOMContentLoaded', () => {
    // Load cards data
    fetch('data/cards.json')
      .then(r => r.json())
      .then(cards => { CARDS_DATA = cards; })
      .catch(() => { CARDS_DATA = []; });

    pushView('Riftbound Judge', renderHome);
    $('#btn-back').addEventListener('click', goBack);
    setupSearch();
    setupTextSize();
    setupContentDelegation();
    registerSW();
    setupHardwareBack();
  });

  // === CONTENT CLICK DELEGATION (cross-links) ===
  function setupContentDelegation() {
    $('#content').addEventListener('click', (e) => {
      const er = e.target.closest('[data-jump-errata]');
      if (er) { openErrataFor(er.getAttribute('data-jump-errata')); return; }
      const cd = e.target.closest('[data-jump-card]');
      if (cd) { openCardFor(cd.getAttribute('data-jump-card')); return; }
      const ru = e.target.closest('[data-jump-rule]');
      if (ru) { openTournamentRule(ru.getAttribute('data-jump-rule')); return; }
    });
  }

  // === TEXT SIZE ===
  const FONT_KEY = 'rbj-font-px', FONT_MIN = 12, FONT_MAX = 26, FONT_STEP = 1.5, FONT_DEFAULT = 15;

  function getFontPx() {
    let v;
    try { v = parseFloat(localStorage.getItem(FONT_KEY)); } catch (e) { v = NaN; }
    return isNaN(v) ? FONT_DEFAULT : v;
  }

  function applyFontPx(px) {
    const clamped = Math.min(FONT_MAX, Math.max(FONT_MIN, px));
    document.documentElement.style.fontSize = clamped + 'px';
    try { localStorage.setItem(FONT_KEY, clamped); } catch (e) {}
    $('#btn-text-smaller').disabled = clamped <= FONT_MIN;
    $('#btn-text-larger').disabled = clamped >= FONT_MAX;
  }

  function setupTextSize() {
    applyFontPx(getFontPx());
    $('#btn-text-smaller').addEventListener('click', () => applyFontPx(getFontPx() - FONT_STEP));
    $('#btn-text-larger').addEventListener('click', () => applyFontPx(getFontPx() + FONT_STEP));
  }

  // === HARDWARE BACK BUTTON (Android) ===
  function setupHardwareBack() {
    window.addEventListener('popstate', () => {
      if (navStack.length > 1) {
        handlingPopstate = true;
        goBack();
        handlingPopstate = false;
      }
    });
  }

  // === NAVIGATION ===
  let handlingPopstate = false;

  function pushView(title, renderFn) {
    navStack.push({ title, renderFn });
    if (navStack.length > 1) {
      history.pushState({ depth: navStack.length }, '');
    }
    renderCurrent();
  }

  function goBack() {
    if (navStack.length > 1) {
      navStack.pop();
      if (!handlingPopstate) {
        history.back();
      }
      renderCurrent();
    }
  }

  function renderCurrent() {
    const current = navStack[navStack.length - 1];
    $('#header-title').textContent = current.title;
    $('#btn-back').classList.toggle('hidden', navStack.length <= 1);
    $('#search-input').value = '';
    $('#btn-clear-search').classList.add('hidden');
    currentSearchFn = null;

    const content = $('#content');
    content.innerHTML = '';
    current.renderFn(content);

    // Show/hide search bar based on whether this view supports search
    $('#search-container').classList.toggle('hidden', !currentSearchFn);
    window.scrollTo(0, 0);
  }

  // === SEARCH ===
  function setupSearch() {
    const input = $('#search-input');
    const clearBtn = $('#btn-clear-search');

    input.addEventListener('input', () => {
      const q = input.value.trim();
      clearBtn.classList.toggle('hidden', !q);
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (currentSearchFn) currentSearchFn(q);
      }, 200);
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.add('hidden');
      if (currentSearchFn) currentSearchFn('');
    });
  }

  // === HOME VIEW ===
  function renderHome(container) {
    renderHomeMenu(container);
    // Global search lives on the home screen
    currentSearchFn = (q) => {
      if (!q.trim()) { renderHomeMenu(container); return; }
      globalSearch(container, q.trim());
    };
    $('#search-container').classList.remove('hidden');
    $('#search-input').placeholder = 'Search rules, cards, errata, keywords…';
  }

  function renderHomeMenu(container) {
    container.innerHTML = `
      <div class="menu-list">
        <div class="menu-group">
          <div class="menu-item" data-action="rules-library">
            <span class="menu-item-text">Rules Library</span>
            <span class="menu-item-chevron">›</span>
          </div>
          <div class="menu-item" data-action="keywords">
            <span class="menu-item-text">Keyword Glossary</span>
            <span class="menu-item-chevron">›</span>
          </div>
          <div class="menu-item" data-action="oracle">
            <span class="menu-item-text">Oracle Cards</span>
            <span class="menu-item-chevron">›</span>
          </div>
          <div class="menu-item" data-action="errata">
            <span class="menu-item-text">Card Errata</span>
            <span class="menu-item-chevron">›</span>
          </div>
          <div class="menu-item" data-action="penalty-guide">
            <span class="menu-item-text">Penalty Quick Reference</span>
            <span class="menu-item-chevron">›</span>
          </div>
          <div class="menu-item" data-action="patch-notes">
            <span class="menu-item-text">
              ${PATCH_NOTES_DATA.title}
              <div class="menu-item-subtitle">RUP4 patch notes — ${PATCH_NOTES_DATA.date.toLowerCase()}</div>
            </span>
            <span class="menu-item-chevron">›</span>
          </div>
          <div class="menu-item" data-action="swiss-rounds">
            <span class="menu-item-text">Swiss Rounds</span>
            <span class="menu-item-chevron">›</span>
          </div>
        </div>
        <div class="menu-group">
          <div class="menu-item" data-action="about">
            <span class="menu-item-text">About &amp; Versions</span>
            <span class="menu-item-chevron">›</span>
          </div>
        </div>
      </div>`;

    const go = (sel, title, fn) => $(sel, container).addEventListener('click', () => pushView(title, fn));
    go('[data-action="rules-library"]', 'Rules Library', renderRulesLibrary);
    go('[data-action="keywords"]', 'Keyword Glossary', renderKeywords);
    go('[data-action="oracle"]', 'Oracle Cards', renderOracleView);
    go('[data-action="errata"]', 'Card Errata', renderErrataView);
    go('[data-action="penalty-guide"]', 'Penalty Guide', renderPenaltyGuide);
    go('[data-action="patch-notes"]', PATCH_NOTES_DATA.title, renderPatchNotes);
    go('[data-action="swiss-rounds"]', 'Swiss Rounds', renderSwissRounds);
    go('[data-action="about"]', 'About & Versions', renderAbout);
  }

  // === PATCH NOTES VIEW ===
  function renderPatchNotes(container) {
    const data = PATCH_NOTES_DATA;
    const renderAll = (list, query) => {
      let html = '';
      if (!query) {
        html += `<div class="patch-intro">
          <div class="patch-date">${data.date}</div>
          <div class="patch-intro-text">${escapeHtml(data.intro)}</div>
        </div>`;
      } else {
        html += `<div class="search-info">${list.length} result${list.length !== 1 ? 's' : ''}</div>`;
      }
      if (list.length === 0) {
        container.innerHTML = `<div class="no-results">No changes found for "${escapeHtml(query)}"</div>`;
        return;
      }
      list.forEach(c => { html += renderPatchCard(c, query); });
      container.innerHTML = html;
    };

    renderAll(data.changes, '');

    currentSearchFn = (q) => {
      if (!q) { renderAll(data.changes, ''); return; }
      const ql = q.toLowerCase();
      const matches = data.changes.filter(c =>
        c.title.toLowerCase().includes(ql) ||
        c.summary.toLowerCase().includes(ql) ||
        c.details.some(d => d.toLowerCase().includes(ql)) ||
        (c.tags || []).some(t => t.toLowerCase().includes(ql))
      );
      renderAll(matches, q);
    };
    $('#search-container').classList.remove('hidden');
    $('#search-input').placeholder = 'Search patch notes...';
  }

  function renderPatchCard(change, highlight = '') {
    const hl = (s) => highlight ? highlightText(s, highlight.toLowerCase()) : formatRuleText(s);
    const detailsHtml = change.details.map(d => `<li>${hl(d)}</li>`).join('');
    const tagsHtml = (change.tags || []).map(t => `<span class="patch-tag">${escapeHtml(t)}</span>`).join('');
    return `
      <div class="patch-card">
        <div class="patch-card-title">${hl(change.title)}</div>
        <div class="patch-card-summary">${hl(change.summary)}</div>
        <ul class="patch-card-details">${detailsHtml}</ul>
        ${tagsHtml ? `<div class="patch-card-tags">${tagsHtml}</div>` : ''}
      </div>`;
  }

  // === SWISS ROUNDS VIEW ===
  function renderSwissRounds(container) {
    const data = SWISS_ROUNDS_DATA;
    let html = `
      <div class="swiss-table">
        <table>
          <thead>
            <tr>
              <th>Players</th>
              <th>Swiss Rounds</th>
              <th>Playoff</th>
            </tr>
          </thead>
          <tbody>`;
    data.rows.forEach(r => {
      html += `
        <tr>
          <td class="swiss-players">${escapeHtml(r.players)}</td>
          <td>${escapeHtml(r.rounds)}</td>
          <td>${escapeHtml(r.playoff)}</td>
        </tr>`;
    });
    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  // === RULES LIBRARY ===
  function renderRulesLibrary(container) {
    container.innerHTML = `
      <div class="menu-list">
        <div class="menu-group">
          <div class="menu-item" data-action="core-rules">
            <span class="menu-item-text">
              Core Rules
              <div class="menu-item-subtitle">Rules 000–747</div>
            </span>
            <span class="menu-item-chevron">›</span>
          </div>
          <div class="menu-item" data-action="tournament-rules">
            <span class="menu-item-text">
              Tournament Rules
              <div class="menu-item-subtitle">Rules 000–604</div>
            </span>
            <span class="menu-item-chevron">›</span>
          </div>
          <div class="menu-item" data-action="tournament-policy">
            <span class="menu-item-text">
              Tournament Policy
              <div class="menu-item-subtitle">Rules 700–704</div>
            </span>
            <span class="menu-item-chevron">›</span>
          </div>
        </div>
      </div>`;

    $('[data-action="core-rules"]', container).addEventListener('click', () => {
      pushView('Core Rules', c => renderDocSections(c, CORE_RULES_DATA));
    });
    $('[data-action="tournament-rules"]', container).addEventListener('click', () => {
      const trData = filterSections(TOURNAMENT_RULES_DATA, s => parseInt(s.num) < 700);
      pushView('Tournament Rules', c => renderDocSections(c, trData));
    });
    $('[data-action="tournament-policy"]', container).addEventListener('click', () => {
      const tpData = filterSections(TOURNAMENT_RULES_DATA, s => parseInt(s.num) >= 700);
      pushView('Tournament Policy', c => renderDocSections(c, tpData));
    });
  }

  function filterSections(data, filterFn) {
    return { ...data, sections: data.sections.filter(filterFn) };
  }

  // === DOCUMENT SECTIONS LIST ===
  function renderDocSections(container, data) {
    let html = '<div class="menu-list"><div class="menu-group">';
    data.sections.forEach(section => {
      const ruleCount = section.rules.length;
      html += `
        <div class="menu-item" data-section="${section.num}">
          <span class="menu-item-num">${section.num}</span>
          <span class="menu-item-text">${section.title}</span>
          <span class="menu-item-count">${ruleCount}</span>
          <span class="menu-item-chevron">›</span>
        </div>`;
    });
    html += '</div></div>';
    container.innerHTML = html;

    // Click handlers
    $$('.menu-item[data-section]', container).forEach(item => {
      item.addEventListener('click', () => {
        const section = data.sections.find(s => s.num === item.dataset.section);
        if (section) {
          pushView(section.title, c => renderSectionRules(c, section, data));
        }
      });
    });

    // Search for this document
    currentSearchFn = (query) => {
      if (!query) {
        renderDocSections(container, data);
        return;
      }
      searchDocument(container, data, query);
    };
    $('#search-container').classList.remove('hidden');
    $('#search-input').placeholder = `Search ${data.title || 'rules'}...`;
  }

  // === SECTION RULES VIEW ===
  function renderSectionRules(container, section, data) {
    let html = '<div class="rules-view">';
    section.rules.forEach(r => {
      const depth = getDepth(r.num);
      html += `
        <div class="rule-entry depth-${depth}">
          <span class="rule-num">${r.num}</span>
          <span class="rule-text">${formatRuleText(r.text)}</span>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;

    // Search within this section
    currentSearchFn = (query) => {
      if (!query) {
        renderSectionRules(container, section, data);
        return;
      }
      searchSection(container, section, query);
    };
    $('#search-container').classList.remove('hidden');
    $('#search-input').placeholder = `Search ${section.title}...`;
  }

  function searchSection(container, section, query) {
    const q = query.toLowerCase();
    const matches = section.rules.filter(r =>
      r.num.toLowerCase().includes(q) || r.text.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      container.innerHTML = `<div class="no-results">No results for "${escapeHtml(query)}"</div>`;
      return;
    }

    let html = `<div class="search-info">${matches.length} result${matches.length !== 1 ? 's' : ''}</div>`;
    html += '<div class="rules-view">';
    matches.forEach(r => {
      const depth = getDepth(r.num);
      html += `
        <div class="rule-entry depth-${depth} highlight">
          <span class="rule-num">${r.num}</span>
          <span class="rule-text">${highlightText(r.text, q)}</span>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  // === DOCUMENT SEARCH ===
  function searchDocument(container, data, query) {
    const q = query.toLowerCase();
    let html = '';
    let totalCount = 0;

    data.sections.forEach(section => {
      const matches = section.rules.filter(r =>
        r.num.toLowerCase().includes(q) || r.text.toLowerCase().includes(q)
      );
      if (matches.length === 0) return;
      totalCount += matches.length;

      html += `<div class="menu-list" style="margin-bottom:0"><div class="menu-group-label">${section.num}. ${section.title}</div></div>`;
      html += '<div class="rules-view" style="margin:0 12px 12px;background:var(--bg-card);border-radius:12px;border:1px solid var(--border);overflow:hidden;">';
      matches.forEach(r => {
        const depth = getDepth(r.num);
        html += `
          <div class="rule-entry depth-${depth} highlight">
            <span class="rule-num">${r.num}</span>
            <span class="rule-text">${highlightText(r.text, q)}</span>
          </div>`;
      });
      html += '</div>';
    });

    if (totalCount === 0) {
      container.innerHTML = `<div class="no-results">No results for "${escapeHtml(query)}"</div>`;
    } else {
      container.innerHTML = `<div class="search-info">${totalCount} result${totalCount !== 1 ? 's' : ''}</div>` + html;
    }
  }

  // === ORACLE CARDS VIEW ===
  function renderOracleView(container) {
    // Show sets as menu items
    const sets = {};
    CARDS_DATA.forEach(c => {
      const s = c.set || 'Unknown';
      if (!sets[s]) sets[s] = 0;
      sets[s]++;
    });

    let html = '<div class="menu-list"><div class="menu-group">';
    html += `<div class="menu-item" data-action="all-cards">
      <span class="menu-item-text">All Cards</span>
      <span class="menu-item-count">${CARDS_DATA.length}</span>
      <span class="menu-item-chevron">›</span>
    </div>`;
    Object.entries(sets).sort().forEach(([setName, count]) => {
      html += `<div class="menu-item" data-set="${setName}">
        <span class="menu-item-text">${setName}</span>
        <span class="menu-item-count">${count}</span>
        <span class="menu-item-chevron">›</span>
      </div>`;
    });
    html += '</div></div>';
    container.innerHTML = html;

    $('[data-action="all-cards"]', container).addEventListener('click', () => {
      pushView('All Cards', c => renderCardList(c, CARDS_DATA));
    });
    $$('.menu-item[data-set]', container).forEach(item => {
      item.addEventListener('click', () => {
        const setName = item.dataset.set;
        const filtered = CARDS_DATA.filter(c => c.set === setName);
        pushView(setName, c => renderCardList(c, filtered));
      });
    });
  }

  function renderCardList(container, cards) {
    const renderCards = (list, query) => {
      if (list.length === 0) {
        container.innerHTML = `<div class="no-results">No cards found${query ? ' for "' + escapeHtml(query) + '"' : ''}</div>`;
        return;
      }
      let html = '';
      if (query) html += `<div class="search-info">${list.length} result${list.length !== 1 ? 's' : ''}</div>`;
      html += list.map(c => renderCardEntry(c, query)).join('');
      container.innerHTML = html;
    };

    renderCards(cards, '');

    currentSearchFn = (query) => {
      if (!query) { renderCards(cards, ''); return; }
      const q = query.toLowerCase();
      const matches = cards.filter(c =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.text || '').toLowerCase().includes(q) ||
        (c.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (c.type || '').toLowerCase().includes(q) ||
        (c.domains || []).some(d => d.toLowerCase().includes(q))
      );
      renderCards(matches, query);
    };
    $('#search-container').classList.remove('hidden');
    $('#search-input').placeholder = 'Search cards by name, text, tag...';
  }

  function renderCardEntry(card, highlight) {
    const name = highlight ? highlightText(card.name || '', highlight) : escapeHtml(card.name || '');
    const text = card.text
      ? (highlight ? highlightText(card.text, highlight) : escapeHtml(card.text))
      : '';

    let meta = [];
    if (card.type) meta.push(card.type);
    if (card.supertypes) meta.push(card.supertypes.join(', '));
    if (card.domains && card.domains.length) meta.push(card.domains.join('/'));
    if (card.rarity) meta.push(card.rarity);

    let stats = [];
    if (card.energy !== undefined) stats.push(`E:${card.energy}`);
    if (card.might !== undefined) stats.push(`M:${card.might}`);
    if (card.power !== undefined) stats.push(`P:${card.power}`);

    const tags = (card.tags || []).join(', ');
    const hasErrata = card.name && errataIndex()[card.name.toLowerCase()];

    return `
      <div class="card-entry">
        <div class="card-entry-header">
          <span class="card-entry-name">${name}</span>
          ${stats.length ? `<span class="card-entry-stats">${stats.join(' ')}</span>` : ''}
        </div>
        <div class="card-entry-meta">${meta.join(' · ')}${tags ? ' · ' + tags : ''}</div>
        ${text ? `<div class="card-entry-text">${text.replace(/\n/g, '<br>')}</div>` : ''}
        ${hasErrata ? `<div class="link-chip" data-jump-errata="${escapeHtml(card.name)}">⚠ Has errata — view</div>` : ''}
        ${card.code ? `<div class="card-entry-code">${card.code}</div>` : ''}
      </div>`;
  }

  // === ERRATA VIEW ===
  function renderErrataView(container) {
    // Group by set
    const sets = {};
    ERRATA_DATA.forEach(e => {
      if (!sets[e.set]) sets[e.set] = [];
      sets[e.set].push(e);
    });

    let html = '';
    Object.entries(sets).forEach(([setName, cards]) => {
      html += `<div class="menu-list" style="margin-bottom:0"><div class="menu-group-label">${setName} — ${cards.length} cards</div></div>`;
      cards.forEach(e => { html += renderErrataCard(e); });
    });
    container.innerHTML = html;

    currentSearchFn = (query) => {
      if (!query) { renderErrataView(container); return; }
      const q = query.toLowerCase();
      const matches = ERRATA_DATA.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.newText.toLowerCase().includes(q) ||
        e.set.toLowerCase().includes(q)
      );
      if (matches.length === 0) {
        container.innerHTML = `<div class="no-results">No errata found for "${escapeHtml(query)}"</div>`;
        return;
      }
      container.innerHTML = `<div class="search-info">${matches.length} result${matches.length !== 1 ? 's' : ''}</div>` +
        matches.map(e => renderErrataCard(e, q)).join('');
    };
    $('#search-container').classList.remove('hidden');
    $('#search-input').placeholder = 'Search errata...';
  }

  function renderErrataCard(errata, highlight = '') {
    const name = highlight ? highlightText(errata.name, highlight) : escapeHtml(errata.name);
    const newText = highlight ? highlightText(errata.newText, highlight) : escapeHtml(errata.newText);
    const hasCard = cardIndex()[errata.name.toLowerCase()];
    return `
      <div class="errata-card">
        <div class="errata-card-header">
          <span class="errata-card-name">${name}</span>
          <span class="set-tag">${errata.set}</span>
        </div>
        <div class="errata-body">
          <div class="errata-section">
            <div class="errata-label new">Current Text</div>
            <div class="errata-text new-text">${newText.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="errata-section">
            <div class="errata-label old">Previous Text</div>
            <div class="errata-text old-text">${escapeHtml(errata.oldText).replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        ${hasCard ? `<div class="link-chip" data-jump-card="${escapeHtml(errata.name)}">View card →</div>` : ''}
      </div>`;
  }

  // === PENALTY GUIDE ===
  function renderPenaltyGuide(container) {
    // Extract penalties from tournament policy data
    const penalties = [];
    const tpSections = TOURNAMENT_RULES_DATA.sections.filter(s => parseInt(s.num) >= 700);

    tpSections.forEach(section => {
      section.rules.forEach(r => {
        const match = r.text.match(/^\*\*(.+?)\s*\[(.+?)\]\*\*/);
        if (match) {
          penalties.push({
            num: r.num,
            name: match[1].trim(),
            penalty: match[2].trim(),
            section: section.title
          });
        }
      });
    });

    let html = `
      <div class="penalty-table">
        <table>
          <thead>
            <tr>
              <th>Rule</th>
              <th>Infraction</th>
              <th>Penalty</th>
            </tr>
          </thead>
          <tbody>`;

    let lastSection = '';
    penalties.forEach(p => {
      if (p.section !== lastSection) {
        html += `<tr><td colspan="3" style="font-weight:700;color:var(--accent);background:var(--bg-hover);font-size:0.78rem;padding:8px 12px;">${p.section}</td></tr>`;
        lastSection = p.section;
      }
      const badgeClass = getPenaltyBadgeClass(p.penalty);
      html += `
        <tr class="penalty-row" data-jump-rule="${p.num}">
          <td style="font-family:monospace;color:var(--accent);font-size:0.78rem;white-space:nowrap;">${p.num}</td>
          <td>${p.name}</td>
          <td><span class="penalty-badge ${badgeClass}">${p.penalty}</span></td>
        </tr>`;
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  function getPenaltyBadgeClass(penalty) {
    const p = penalty.toLowerCase();
    if (p.includes('disqualification')) return 'dq';
    if (p.includes('match loss')) return 'matchloss';
    if (p.includes('game loss')) return 'gameloss';
    if (p.includes('warning')) return 'warning';
    if (p.includes('no penalty')) return 'none';
    return 'warning';
  }

  // === INDEXES (lazy) ===
  let _errataIndex = null, _cardIndex = null, _keywords = null;

  function errataIndex() {
    if (_errataIndex) return _errataIndex;
    _errataIndex = {};
    ERRATA_DATA.forEach(e => {
      const k = e.name.toLowerCase();
      (_errataIndex[k] = _errataIndex[k] || []).push(e);
    });
    return _errataIndex;
  }

  function cardIndex() {
    if (_cardIndex && Object.keys(_cardIndex).length) return _cardIndex;
    _cardIndex = {};
    CARDS_DATA.forEach(c => { if (c.name) _cardIndex[c.name.toLowerCase()] = c; });
    return _cardIndex;
  }

  function getKeywords() {
    if (_keywords) return _keywords;
    _keywords = [];
    const sec = CORE_RULES_DATA.sections.find(s => s.num === '800');
    if (!sec) return _keywords;
    let current = null;
    sec.rules.forEach(r => {
      const isTop = !r.num.includes('.') && parseInt(r.num, 10) >= 805;
      const m = isTop && r.text.match(/^\*\*(.+?)\*\*\s*:?\s*(.*)$/);
      if (m) {
        current = { num: r.num, name: m[1].trim(), desc: m[2].trim(), rules: [] };
        _keywords.push(current);
      } else if (current && r.num.startsWith(current.num + '.')) {
        current.rules.push(r);
      }
    });
    _keywords.sort((a, b) => a.name.localeCompare(b.name));
    return _keywords;
  }

  // === KEYWORD GLOSSARY VIEW ===
  function renderKeywords(container) {
    const kws = getKeywords();
    const renderAll = (list, q) => {
      if (!list.length) {
        container.innerHTML = `<div class="no-results">No keywords found${q ? ' for "' + escapeHtml(q) + '"' : ''}</div>`;
        return;
      }
      let html = q ? `<div class="search-info">${list.length} result${list.length !== 1 ? 's' : ''}</div>` : '';
      html += list.map(k => renderKeywordCard(k, q)).join('');
      container.innerHTML = html;
    };
    renderAll(kws, '');
    currentSearchFn = (q) => {
      if (!q) { renderAll(kws, ''); return; }
      const ql = q.toLowerCase();
      renderAll(kws.filter(k =>
        k.name.toLowerCase().includes(ql) ||
        k.desc.toLowerCase().includes(ql) ||
        k.rules.some(r => r.text.toLowerCase().includes(ql))
      ), q);
    };
    $('#search-container').classList.remove('hidden');
    $('#search-input').placeholder = 'Search keywords…';
  }

  function renderKeywordCard(k, highlight = '') {
    const f = (s) => highlight ? highlightText(s, highlight.toLowerCase()) : formatRuleText(s);
    const details = k.rules.map(r =>
      `<li><span class="kw-subnum">${r.num}</span> ${f(r.text)}</li>`).join('');
    return `
      <div class="kw-card">
        <div class="kw-name">${f(k.name)}</div>
        ${k.desc ? `<div class="kw-desc">${f(k.desc)}</div>` : ''}
        ${details ? `<ul class="kw-details">${details}</ul>` : ''}
      </div>`;
  }

  // === GLOBAL SEARCH ===
  function globalSearch(container, q) {
    const ql = q.toLowerCase();
    const CAP = 20;

    const ruleMatches = (data) => {
      const out = [];
      data.sections.forEach(s => s.rules.forEach(r => {
        if (r.num.toLowerCase().includes(ql) || r.text.toLowerCase().includes(ql)) {
          out.push({ num: r.num, text: r.text });
        }
      }));
      return out;
    };

    const core = ruleMatches(CORE_RULES_DATA);
    const tourn = ruleMatches(TOURNAMENT_RULES_DATA);
    const errata = ERRATA_DATA.filter(e =>
      e.name.toLowerCase().includes(ql) || e.newText.toLowerCase().includes(ql) || e.set.toLowerCase().includes(ql));
    const cards = CARDS_DATA.filter(c =>
      (c.name || '').toLowerCase().includes(ql) ||
      (c.text || '').toLowerCase().includes(ql) ||
      (c.tags || []).some(t => t.toLowerCase().includes(ql)) ||
      (c.type || '').toLowerCase().includes(ql) ||
      (c.domains || []).some(d => d.toLowerCase().includes(ql)));
    const kws = getKeywords().filter(k =>
      k.name.toLowerCase().includes(ql) || k.desc.toLowerCase().includes(ql) ||
      k.rules.some(r => r.text.toLowerCase().includes(ql)));

    const total = core.length + tourn.length + errata.length + cards.length + kws.length;
    if (!total) {
      container.innerHTML = `<div class="no-results">No results for "${escapeHtml(q)}"</div>`;
      return;
    }

    let html = `<div class="search-info">${total} result${total !== 1 ? 's' : ''} across all sources</div>`;

    const ruleGroup = (label, arr) => {
      if (!arr.length) return '';
      let h = `<div class="gs-group-label">${label} (${arr.length})</div><div class="rules-view gs-block">`;
      arr.slice(0, CAP).forEach(r => {
        h += `<div class="rule-entry depth-${getDepth(r.num)} highlight"><span class="rule-num">${r.num}</span><span class="rule-text">${highlightText(r.text, ql)}</span></div>`;
      });
      h += '</div>';
      if (arr.length > CAP) h += `<div class="gs-more">+${arr.length - CAP} more — refine your search</div>`;
      return h;
    };

    if (kws.length) {
      html += `<div class="gs-group-label">Keywords (${kws.length})</div>`;
      html += kws.slice(0, CAP).map(k => renderKeywordCard(k, q)).join('');
    }
    html += ruleGroup('Core Rules', core);
    html += ruleGroup('Tournament Rules', tourn);
    if (errata.length) {
      html += `<div class="gs-group-label">Errata (${errata.length})</div>`;
      html += errata.slice(0, CAP).map(e => renderErrataCard(e, q)).join('');
      if (errata.length > CAP) html += `<div class="gs-more">+${errata.length - CAP} more — refine your search</div>`;
    }
    if (cards.length) {
      html += `<div class="gs-group-label">Cards (${cards.length})</div>`;
      html += cards.slice(0, CAP).map(c => renderCardEntry(c, q)).join('');
      if (cards.length > CAP) html += `<div class="gs-more">+${cards.length - CAP} more — open Oracle Cards to see all</div>`;
    }
    container.innerHTML = html;
  }

  // === CROSS-LINK OPENERS ===
  function openErrataFor(name) {
    const list = errataIndex()[name.toLowerCase()] || [];
    pushView(name, (c) => {
      c.innerHTML = list.length ? list.map(e => renderErrataCard(e)).join('')
        : `<div class="no-results">No errata found.</div>`;
    });
  }

  function openCardFor(name) {
    const card = cardIndex()[name.toLowerCase()];
    pushView(name, (c) => {
      c.innerHTML = card ? renderCardEntry(card) : `<div class="no-results">Card not found.</div>`;
    });
  }

  function openTournamentRule(baseNum) {
    const matched = [];
    TOURNAMENT_RULES_DATA.sections.forEach(s => s.rules.forEach(r => {
      if (r.num === baseNum || r.num.startsWith(baseNum + '.')) matched.push(r);
    }));
    let title = baseNum;
    const head = matched.find(r => r.num === baseNum);
    if (head) { const m = head.text.match(/^\*\*(.+?)\s*\[/); if (m) title = m[1].trim(); }
    pushView(title, (c) => {
      c.innerHTML = `<div class="rules-view">` + matched.map(r =>
        `<div class="rule-entry depth-${getDepth(r.num)}"><span class="rule-num">${r.num}</span><span class="rule-text">${formatRuleText(r.text)}</span></div>`).join('') + `</div>`;
    });
  }

  // === ABOUT / VERSIONS VIEW ===
  function renderAbout(container) {
    const sets = {};
    CARDS_DATA.forEach(c => { const s = c.set || 'Unknown'; sets[s] = (sets[s] || 0) + 1; });
    const setLines = Object.entries(sets).sort().map(([s, n]) => `${escapeHtml(s)}: ${n}`).join(' · ');
    const errataDate = (typeof ERRATA_UPDATED !== 'undefined') ? ERRATA_UPDATED : 'n/a';
    const rows = [
      ['App version', escapeHtml(APP_VERSION)],
      ['Core Rules', `${escapeHtml(CORE_RULES_DATA.version || '')} — updated ${escapeHtml(CORE_RULES_DATA.lastUpdated || '')}`],
      ['Tournament Rules', `updated ${escapeHtml(TOURNAMENT_RULES_DATA.lastUpdated || '')}`],
      ['Patch Notes', `${escapeHtml(PATCH_NOTES_DATA.title || '')} — ${escapeHtml(PATCH_NOTES_DATA.date || '')}`],
      ['Errata', `${ERRATA_DATA.length} entries — latest ${escapeHtml(errataDate)}`],
      ['Cards', `${CARDS_DATA.length} cards${setLines ? ' — ' + setLines : ''}`],
    ];
    container.innerHTML = `<div class="about-view">` +
      rows.map(([k, v]) => `<div class="about-row"><div class="about-key">${k}</div><div class="about-val">${v}</div></div>`).join('') +
      `<div class="about-note">Rules content is sourced from official Riot Games <em>Riftbound</em> documents. For sanctioned events, verify against the live Rules Hub.</div>` +
      `</div>`;
  }

  // === UTILITIES ===
  function getDepth(num) {
    const parts = num.split('.');
    return Math.min(parts.length - 1, 4);
  }

  function formatRuleText(text) {
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  function highlightText(text, query) {
    const formatted = formatRuleText(text);
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return formatted.replace(regex, '<mark>$1</mark>');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // === SERVICE WORKER ===
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }
})();
