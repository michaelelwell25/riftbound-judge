// Riftbound Judge App
(function() {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // State
  let activeTab = 'core-rules';
  let searchQuery = '';
  let searchTimeout = null;

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    renderCoreRules();
    renderTournamentRules();
    renderErrata();
    setupTabs();
    setupSearch();
    setupBackToTop();
    setupTocCollapse();
    registerSW();
  });

  // === TABS ===
  function setupTabs() {
    $$('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.tab').forEach(t => t.classList.remove('active'));
        $$('.tab-content').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTab = tab.dataset.tab;
        $(`#tab-${activeTab}`).classList.add('active');
        // Re-run search if there's a query
        if (searchQuery) performSearch(searchQuery);
      });
    });
  }

  // === SEARCH ===
  function setupSearch() {
    const input = $('#search-input');
    const clearBtn = $('#btn-clear-search');

    input.addEventListener('input', () => {
      searchQuery = input.value.trim();
      clearBtn.classList.toggle('hidden', !searchQuery);
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => performSearch(searchQuery), 200);
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      searchQuery = '';
      clearBtn.classList.add('hidden');
      clearSearch();
    });
  }

  function performSearch(query) {
    if (!query) { clearSearch(); return; }
    const q = query.toLowerCase();

    // Search rules
    if (activeTab === 'core-rules') searchRules(q, CORE_RULES_DATA, '#core-rules-list');
    else if (activeTab === 'tournament') searchRules(q, TOURNAMENT_RULES_DATA, '#tournament-list');
    else if (activeTab === 'errata') searchErrata(q);
    else if (activeTab === 'cards') searchCards(q);
  }

  function clearSearch() {
    // Re-render without highlights
    if (activeTab === 'core-rules') renderCoreRules();
    else if (activeTab === 'tournament') renderTournamentRules();
    else if (activeTab === 'errata') renderErrata();
    else if (activeTab === 'cards') { $('#card-results').innerHTML = ''; }
  }

  function searchRules(query, data, containerSel) {
    const container = $(containerSel);
    let html = '';
    let count = 0;

    data.sections.forEach(section => {
      const matchingRules = section.rules.filter(r =>
        r.num.toLowerCase().includes(query) ||
        r.text.toLowerCase().includes(query) ||
        section.title.toLowerCase().includes(query)
      );

      if (matchingRules.length > 0) {
        html += `<div class="rule-section">`;
        html += `<div class="rule-section-header"><span><span class="num">${section.num}.</span> ${section.title}</span></div>`;
        html += `<div class="rule-section-body">`;
        matchingRules.forEach(r => {
          count++;
          const depth = getDepth(r.num);
          const highlighted = highlightText(r.text, query);
          html += `<div class="rule-entry depth-${depth} highlight">
            <span class="rule-num">${r.num}.</span>
            <span class="rule-text">${highlighted}</span>
          </div>`;
        });
        html += `</div></div>`;
      }
    });

    if (count === 0) {
      html = `<div class="no-results">No rules found for "${escapeHtml(searchQuery)}"</div>`;
    } else {
      html = `<div class="search-results-header">${count} result${count !== 1 ? 's' : ''} found</div>` + html;
    }
    container.innerHTML = html;
    setupSectionCollapse(containerSel);
  }

  function searchErrata(query) {
    const container = $('#errata-list');
    const matches = ERRATA_DATA.filter(e =>
      e.name.toLowerCase().includes(query) ||
      e.set.toLowerCase().includes(query) ||
      e.newText.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      container.innerHTML = `<div class="no-results">No errata found for "${escapeHtml(searchQuery)}"</div>`;
      return;
    }

    container.innerHTML = `<div class="search-results-header">${matches.length} result${matches.length !== 1 ? 's' : ''}</div>` +
      matches.map(e => renderErrataCard(e, query)).join('');
  }

  function searchCards(query) {
    // Search errata data for card names, plus link to Piltover Archive
    const container = $('#card-results');
    const matches = ERRATA_DATA.filter(e => e.name.toLowerCase().includes(query));

    let html = '';
    if (matches.length > 0) {
      html += `<div class="search-results-header">Errata found for ${matches.length} card${matches.length !== 1 ? 's' : ''}</div>`;
      html += matches.map(e => renderErrataCard(e, query)).join('');
    }

    // Always show link to search on Piltover Archive
    const encodedQuery = encodeURIComponent(searchQuery);
    html += `<a href="https://piltoverarchive.com/cards?search=${encodedQuery}" target="_blank" rel="noopener" class="external-link" style="margin-top:12px">
      Search "${escapeHtml(searchQuery)}" on Piltover Archive &rarr;
    </a>`;

    container.innerHTML = html;
  }

  // === RENDER ===
  function renderCoreRules() {
    renderRulesData(CORE_RULES_DATA, '#core-rules-toc', '#core-rules-list');
  }

  function renderTournamentRules() {
    renderRulesData(TOURNAMENT_RULES_DATA, '#tournament-toc', '#tournament-list');
  }

  function renderRulesData(data, tocSel, listSel) {
    // TOC
    const toc = $(tocSel);
    toc.innerHTML = `
      <div class="toc-header">Table of Contents</div>
      <div class="toc-body">
        ${data.sections.map(s => `
          <a class="toc-link" data-section="${s.num}">
            <span class="section-num">${s.num}.</span> ${s.title}
          </a>
        `).join('')}
      </div>`;

    // Rules list
    const list = $(listSel);
    list.innerHTML = data.sections.map(section => `
      <div class="rule-section" id="section-${section.num}">
        <div class="rule-section-header">
          <span><span class="num">${section.num}.</span> ${section.title}</span>
        </div>
        <div class="rule-section-body">
          ${section.rules.map(r => {
            const depth = getDepth(r.num);
            return `<div class="rule-entry depth-${depth}">
              <span class="rule-num">${r.num}.</span>
              <span class="rule-text">${formatRuleText(r.text)}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    `).join('');

    // TOC click handlers
    $$('.toc-link', toc).forEach(link => {
      link.addEventListener('click', () => {
        const section = $(`#section-${link.dataset.section}`);
        if (section) {
          section.classList.remove('collapsed');
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    setupSectionCollapse(listSel);
  }

  function renderErrata() {
    const container = $('#errata-list');
    // Group by set
    const sets = {};
    ERRATA_DATA.forEach(e => {
      if (!sets[e.set]) sets[e.set] = [];
      sets[e.set].push(e);
    });

    let html = '';
    Object.entries(sets).forEach(([setName, cards]) => {
      html += `<div class="rule-section-header" style="margin-bottom:8px;border-radius:8px;"><span>${setName} (${cards.length} cards)</span></div>`;
      html += cards.map(e => renderErrataCard(e)).join('');
    });
    container.innerHTML = html;
  }

  function renderErrataCard(errata, highlight = '') {
    const name = highlight ? highlightText(errata.name, highlight) : errata.name;
    const newText = highlight ? highlightText(errata.newText, highlight) : errata.newText;
    const searchName = encodeURIComponent(errata.name);
    return `
      <div class="errata-card">
        <div class="errata-card-name">
          <span>${name}</span>
          <span class="set-tag">${errata.set}</span>
        </div>
        <div class="errata-body">
          <div class="errata-section">
            <div class="errata-label new">Current Text</div>
            <div class="errata-text new-text">${newText.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="errata-section">
            <div class="errata-label old">Previous Text</div>
            <div class="errata-text old-text">${errata.oldText.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <a href="https://piltoverarchive.com/cards?search=${searchName}" target="_blank" rel="noopener" class="piltover-link">
          View on Piltover Archive &rarr;
        </a>
      </div>`;
  }

  // === UI HELPERS ===
  function setupSectionCollapse(containerSel) {
    $$(`.rule-section-header`, $(containerSel)).forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('collapsed');
      });
    });
  }

  function setupTocCollapse() {
    $$('.toc-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('collapsed');
      });
    });
  }

  function setupBackToTop() {
    const btn = $('#back-to-top');
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === UTILITIES ===
  function getDepth(num) {
    const parts = num.split('.');
    return Math.min(parts.length - 1, 4);
  }

  function formatRuleText(text) {
    // Convert markdown-style bold to HTML
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
               .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  function highlightText(text, query) {
    if (!query) return formatRuleText(text);
    const formatted = formatRuleText(text);
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return formatted.replace(regex, '<mark style="background:var(--accent);color:#fff;padding:0 2px;border-radius:2px;">$1</mark>');
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
