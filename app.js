// Riftbound Judge App — Drill-down navigation
(function() {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // Navigation stack: [{view, title, render()}]
  const navStack = [];
  let searchTimeout = null;
  let currentSearchFn = null;

  document.addEventListener('DOMContentLoaded', () => {
    pushView('Riftbound Judge', renderHome);
    $('#btn-back').addEventListener('click', goBack);
    setupSearch();
    registerSW();
  });

  // === NAVIGATION ===
  function pushView(title, renderFn) {
    navStack.push({ title, renderFn });
    renderCurrent();
  }

  function goBack() {
    if (navStack.length > 1) {
      navStack.pop();
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
    container.innerHTML = `
      <div class="menu-list">
        <div class="menu-group">
          <div class="menu-item" data-action="rules-library">
            <span class="menu-item-text">Rules Library</span>
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
        </div>
      </div>`;

    $('[data-action="rules-library"]', container).addEventListener('click', () => {
      pushView('Rules Library', renderRulesLibrary);
    });
    $('[data-action="errata"]', container).addEventListener('click', () => {
      pushView('Card Errata', renderErrataView);
    });
    $('[data-action="penalty-guide"]', container).addEventListener('click', () => {
      pushView('Penalty Guide', renderPenaltyGuide);
    });
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
        <tr>
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
