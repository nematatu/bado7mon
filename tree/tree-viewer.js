/**
 * バド7問！ 全質問ツリー＆選手図鑑 ロジック
 */

(function () {
  'use strict';

  const FAMOUS_PLAYERS = [
    '桃田賢斗',
    '山口茜',
    '渡辺勇大',
    '志田千陽',
    '奈良岡功大',
    '宮崎友花',
    '保木卓朗',
    '五十嵐有紗',
    'ビクトル・アクセルセン',
    'アン・セヨン（安洗塋）',
    '林丹（リン・ダン）',
    'リー・チョンウェイ',
  ];

  // --- アプリケーション状態 ---
  let treeData = null;
  let allPlayerList = []; // [{ id, name_ja, ..., depth, path }]
  let currentNode = null;
  let explorerPath = []; // [{ parentNode, targetNode, answer }]
  let activeRosterCategory = 'ALL';

  // --- DOM要素 ---
  const statTotalPokemon = document.getElementById('stat-total-pokemon');
  const statMaxDepth = document.getElementById('stat-max-depth');
  const statAvgDepth = document.getElementById('stat-avg-depth');
  const statTotalNodes = document.getElementById('stat-total-nodes');

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Tab 1: 検索
  const searchInput = document.getElementById('pokemon-search-input');
  const searchDatalist = document.getElementById('pokemon-search-datalist');
  const btnSearch = document.getElementById('btn-search-pokemon');
  const btnRandom = document.getElementById('btn-random-pokemon');
  const searchResultArea = document.getElementById('search-result-area');
  const quickPickContainer = document.getElementById('quick-pick-container');

  // Tab 2: 階層ツリー
  const treeContainer = document.getElementById('tree-hierarchy-container');
  const btnExpand1 = document.getElementById('btn-tree-depth-1');
  const btnExpand2 = document.getElementById('btn-tree-depth-2');
  const btnExpand3 = document.getElementById('btn-tree-depth-3');
  const btnExpandAll = document.getElementById('btn-tree-expand-all');
  const btnCollapseAll = document.getElementById('btn-tree-collapse-all');
  const treeFilterInput = document.getElementById('tree-filter-input');

  // Tab 3: ステップ探索
  const explorerBreadcrumbs = document.getElementById('explorer-breadcrumbs');
  const explorerCard = document.getElementById('explorer-card-area');
  const candidatesGrid = document.getElementById('candidates-grid');
  const candidatesCountBadge = document.getElementById('candidates-count-badge');

  // Tab 4: 収録選手一覧
  const rosterCategoryChips = document.getElementById('roster-category-chips');
  const rosterSearchInput = document.getElementById('roster-search-input');
  const rosterGrid = document.getElementById('roster-grid');

  // ==========================================
  // 初期化
  // ==========================================
  async function init() {
    if (window.TREE_DATA) {
      treeData = window.TREE_DATA;
    } else {
      try {
        const res = await fetch('../data/tree.json?v=20261122_1');
        treeData = await res.json();
      } catch (err) {
        console.error('Failed to load tree data:', err);
        alert('ツリーデータの読み込みに失敗しました。');
        return;
      }
    }

    analyzeTree(treeData);
    renderStats();
    populateSearchDatalist();
    renderQuickPickChips();
    bindEvents();

    // URLパラメータ (?player=...) があればその選手を初期表示、なければ桃田賢斗
    const params = new URLSearchParams(window.location.search);
    const initialPlayer = params.get('player') || '桃田賢斗';
    searchInput.value = initialPlayer;
    showPlayerRoute(initialPlayer);

    // 階層ツリー描画（初期は2階層展開）
    renderTreeHierarchy(treeData, treeContainer);
    setHierarchyDepth(2);

    // ステップ探索初期化
    initExplorer();

    // 選手ずかん初期化
    renderRosterFilters();
    renderRosterGrid();

    // URLハッシュ (#tab-roster など) が指定されていれば該当タブを開く
    if (window.location.hash) {
      const hashTab = window.location.hash.replace('#', '');
      if (document.getElementById(hashTab)) {
        switchTab(hashTab);
      }
    }
  }

  function getCollectedIds() {
    try {
      const raw = localStorage.getItem('bado7mon_collection_v1');
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  }

  function getPlayerFromLeaf(node) {
    if (!node) return null;
    return node.player || node.pokemon || null;
  }

  // ==========================================
  // ツリー分析 & 統計
  // ==========================================
  let totalLeafCount = 0;
  let totalQuestionNodes = 0;
  let maxDepth = 0;
  let depthSum = 0;

  function analyzeTree(node, depth = 0, currentPath = []) {
    if (!node) return;
    if (depth > maxDepth) maxDepth = depth;

    if (node.type === 'leaf') {
      totalLeafCount++;
      depthSum += depth;
      const pl = getPlayerFromLeaf(node);
      if (pl) {
        allPlayerList.push({
          ...pl,
          depth: depth,
          path: currentPath,
        });
      }
      return;
    }

    totalQuestionNodes++;
    if (node.yes) {
      analyzeTree(node.yes, depth + 1, [
        ...currentPath,
        { node: node, answer: 'yes' },
      ]);
    }
    if (node.no) {
      analyzeTree(node.no, depth + 1, [
        ...currentPath,
        { node: node, answer: 'no' },
      ]);
    }
  }

  function renderStats() {
    const avg = totalLeafCount > 0 ? (depthSum / totalLeafCount).toFixed(1) : 0;
    if (statTotalPokemon) statTotalPokemon.textContent = `${totalLeafCount} 人`;
    if (statMaxDepth) statMaxDepth.textContent = `${maxDepth} 問`;
    if (statAvgDepth) statAvgDepth.textContent = `${avg} 問`;
    if (statTotalNodes) statTotalNodes.textContent = `${totalQuestionNodes} 問`;
  }

  function populateSearchDatalist() {
    const sorted = [...allPlayerList].sort((a, b) =>
      a.name_ja.localeCompare(b.name_ja, 'ja')
    );
    const fragment = document.createDocumentFragment();
    sorted.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.name_ja;
      opt.label = `No.${String(p.id).padStart(3, '0')} ${p.flag || ''} (${p.category_label || ''} / ${p.team || ''})`;
      fragment.appendChild(opt);
    });
    searchDatalist.appendChild(fragment);
  }

  function renderQuickPickChips() {
    quickPickContainer.innerHTML = '';
    FAMOUS_PLAYERS.forEach((name) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip-btn';
      btn.textContent = name.replace(/（.*）/, '');
      btn.addEventListener('click', () => {
        searchInput.value = name;
        showPlayerRoute(name);
      });
      quickPickContainer.appendChild(btn);
    });
  }

  // ==========================================
  // Tab 1: 個別選手検索 & ルート描画
  // ==========================================
  function toHiragana(str) {
    return str
      .replace(/[\u30a1-\u30f6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
      )
      .trim();
  }

  function findPlayer(rawTarget) {
    const q = rawTarget.trim();
    if (!q) return null;
    const qLower = q.toLowerCase();
    const qHira = toHiragana(q);

    return (
      allPlayerList.find((p) => p.name_ja === q) ||
      allPlayerList.find((p) => p.name_kana === qHira) ||
      allPlayerList.find((p) => (p.name_en || '').toLowerCase() === qLower) ||
      allPlayerList.find(
        (p) =>
          p.name_ja.includes(q) ||
          toHiragana(p.name_ja).includes(qHira) ||
          (p.name_kana && p.name_kana.includes(qHira)) ||
          (p.name_en && p.name_en.toLowerCase().includes(qLower))
      ) ||
      null
    );
  }

  function showPlayerRoute(targetName) {
    const player = findPlayer(targetName);

    if (!player) {
      searchResultArea.innerHTML = `
        <div class="pokemon-route-result">
          <p style="color: #C53030; font-weight: 700;">「${escapeHtml(targetName)}」が見つかりませんでした（収録128選手一覧タブからも選択できます）。</p>
        </div>
      `;
      return;
    }

    const paddedId = String(player.id).padStart(3, '0');
    let typesHtml = '';
    if (player.category_label) {
      typesHtml += `<span class="type-pill type-${escapeHtml(player.category || 'MS')}">${escapeHtml(player.category_label)}</span>`;
    }
    if (player.team) {
      typesHtml += `<span class="type-pill type-team">${escapeHtml(player.team)}</span>`;
    }
    if (Array.isArray(player.tags)) {
      player.tags.forEach((tag) => {
        typesHtml += `<span class="type-pill type-tag">${escapeHtml(tag)}</span>`;
      });
    }

    let stepsHtml = '<div class="route-step-list">';
    player.path.forEach((step, idx) => {
      const isYes = step.answer === 'yes';
      const categoryBadge = step.node.category
        ? `<span class="step-category-badge">${escapeHtml(step.node.category)}</span>`
        : '';
      const candText = step.node.candidates_count
        ? `<span class="step-cand-badge">この時点の候補: 残り ${step.node.candidates_count} 人</span>`
        : '';

      stepsHtml += `
        <div class="route-step-item">
          <div class="step-header-line">
            <span class="step-num-badge">Q${idx + 1}</span>
            ${categoryBadge}
          </div>
          <div class="step-question-text">${escapeHtml(step.node.question_text)}</div>
          <div class="step-footer-line">
            <span class="step-answer-pill ${isYes ? 'yes' : 'no'}">
              <span>進む方向：</span>
              <strong>${isYes ? 'はい (Yes)' : 'いいえ (No)'}</strong>
            </span>
            ${candText}
          </div>
        </div>
      `;
    });
    stepsHtml += '</div>';

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(player.name_ja + ' バドミントン')}`;

    searchResultArea.innerHTML = `
      <div class="pokemon-route-result">
        <div class="pokemon-hero-header">
          <div class="pokemon-hero-info">
            <span class="pokemon-hero-id">No.${paddedId} ${escapeHtml(player.flag || '')} ${escapeHtml(player.country || '')}</span>
            <h3 class="pokemon-hero-name">${escapeHtml(player.name_ja)}</h3>
            <span class="pokemon-hero-en">${escapeHtml(player.name_en || '')}</span>
            <div class="pokemon-types" style="margin-top: 4px;">${typesHtml}</div>
            ${player.summary ? `<p class="pokemon-hero-summary">${escapeHtml(player.summary)}</p>` : ''}
          </div>
          <div>
            <a href="${searchUrl}" target="_blank" rel="noopener noreferrer" class="btn-zukan-link">
              <span>🔍 選手情報を検索 ↗</span>
            </a>
          </div>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px; font-weight: 700;">
          📍 特定ルート（全${player.path.length}問の分岐）：
        </p>
        ${stepsHtml}
      </div>
    `;
  }

  function pickRandomPlayer() {
    if (allPlayerList.length === 0) return;
    const random =
      allPlayerList[Math.floor(Math.random() * allPlayerList.length)];
    searchInput.value = random.name_ja;
    showPlayerRoute(random.name_ja);
  }

  // ==========================================
  // Tab 2: 階層ツリー表示
  // ==========================================
  function renderTreeHierarchy(node, container, branchType = 'root') {
    if (!node) return;

    if (node.type === 'leaf') {
      const p = getPlayerFromLeaf(node);
      const leafEl = document.createElement('div');
      leafEl.className = 'tree-leaf-item';
      const paddedId = p && p.id ? String(p.id).padStart(3, '0') : '';
      leafEl.innerHTML = `
        <span class="branch-type-tag ${branchType === 'yes' ? 'yes' : 'no'}">${branchType === 'yes' ? 'はい' : 'いいえ'}</span>
        <span class="leaf-id">No.${paddedId} ${escapeHtml(p ? p.flag || '' : '')}</span>
        <span class="leaf-name">${escapeHtml(p ? p.name_ja : '不明')}</span>
        <span class="type-pill type-${escapeHtml(p ? p.category || 'MS' : 'MS')}">${escapeHtml(p ? p.category_label || p.category : '')}</span>
      `;
      leafEl.addEventListener('click', () => {
        if (p && p.name_ja) {
          switchTab('tab-search');
          searchInput.value = p.name_ja;
          showPlayerRoute(p.name_ja);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      container.appendChild(leafEl);
      return;
    }

    const details = document.createElement('details');
    details.className = 'tree-node-details';
    details.dataset.depth = node.depth !== undefined ? node.depth : 0;

    const summary = document.createElement('summary');
    summary.className = 'tree-node-summary';

    let tagLabel = 'ルート';
    if (branchType === 'yes') tagLabel = 'はい';
    if (branchType === 'no') tagLabel = 'いいえ';

    summary.innerHTML = `
      <span class="branch-type-tag ${branchType}">${tagLabel}</span>
      <span class="node-text">Q${node.depth !== undefined ? node.depth + 1 : ''}. ${escapeHtml(node.question_text || '')}</span>
      <span class="node-count">${node.candidates_count ? node.candidates_count + '人' : ''}</span>
    `;

    const branch = document.createElement('div');
    branch.className = 'tree-branch';

    if (node.yes) renderTreeHierarchy(node.yes, branch, 'yes');
    if (node.no) renderTreeHierarchy(node.no, branch, 'no');

    details.appendChild(summary);
    details.appendChild(branch);
    container.appendChild(details);
  }

  function setHierarchyDepth(maxOpenDepth) {
    const allDetails = treeContainer.querySelectorAll('.tree-node-details');
    allDetails.forEach((d) => {
      const depth = parseInt(d.dataset.depth, 10);
      d.open = depth < maxOpenDepth;
    });
  }

  function setAllHierarchyOpen(isOpen) {
    const allDetails = treeContainer.querySelectorAll('.tree-node-details');
    allDetails.forEach((d) => {
      d.open = isOpen;
    });
  }

  function filterTreeHierarchy(keyword) {
    keyword = keyword.trim().toLowerCase();
    const allSummaries = treeContainer.querySelectorAll('.tree-node-summary');
    const allLeaves = treeContainer.querySelectorAll('.tree-leaf-item');

    allSummaries.forEach((s) => {
      const text = s.textContent.toLowerCase();
      const details = s.closest('details');
      if (!keyword) {
        s.style.backgroundColor = '';
        return;
      }
      if (text.includes(keyword)) {
        s.style.backgroundColor = '#FEFCBF';
        let parent = details;
        while (parent && parent.tagName === 'DETAILS') {
          parent.open = true;
          parent = parent.parentElement
            ? parent.parentElement.closest('details')
            : null;
        }
      } else {
        s.style.backgroundColor = '';
      }
    });

    allLeaves.forEach((leaf) => {
      const text = leaf.textContent.toLowerCase();
      if (!keyword) {
        leaf.style.backgroundColor = '';
        return;
      }
      if (text.includes(keyword)) {
        leaf.style.backgroundColor = '#C6F6D5';
        let parent = leaf.closest('details');
        while (parent && parent.tagName === 'DETAILS') {
          parent.open = true;
          parent = parent.parentElement
            ? parent.parentElement.closest('details')
            : null;
        }
      } else {
        leaf.style.backgroundColor = '';
      }
    });
  }

  // ==========================================
  // Tab 3: ステップ探索 (Interactive Step Explorer)
  // ==========================================
  function initExplorer() {
    currentNode = treeData;
    explorerPath = [];
    renderExplorer();
  }

  function renderExplorer() {
    if (!currentNode) return;

    explorerBreadcrumbs.innerHTML = '';
    const rootBtn = document.createElement('button');
    rootBtn.className = 'crumb-btn';
    rootBtn.textContent = 'ルート (128人)';
    rootBtn.addEventListener('click', () => {
      currentNode = treeData;
      explorerPath = [];
      renderExplorer();
    });
    explorerBreadcrumbs.appendChild(rootBtn);

    explorerPath.forEach((step, idx) => {
      const sep = document.createElement('span');
      sep.className = 'crumb-sep';
      sep.textContent = '>';
      explorerBreadcrumbs.appendChild(sep);

      const btn = document.createElement('button');
      btn.className = 'crumb-btn';
      btn.textContent = `Q${idx + 1} (${step.answer === 'yes' ? 'はい' : 'いいえ'})`;
      btn.addEventListener('click', () => {
        currentNode = step.targetNode;
        explorerPath = explorerPath.slice(0, idx + 1);
        renderExplorer();
      });
      explorerBreadcrumbs.appendChild(btn);
    });

    if (currentNode.type === 'leaf') {
      const p = getPlayerFromLeaf(currentNode) || {};
      const paddedId = p.id ? String(p.id).padStart(3, '0') : '';
      explorerCard.innerHTML = `
        <div class="current-node-box">
          <span class="current-q-badge" style="background: #E6FFFA; color: #234E52;">🎉 選手特定！</span>
          <div style="margin: 12px 0;">
            <span style="font-size: 0.9rem; font-weight: 900; color: var(--text-muted);">No.${paddedId} ${escapeHtml(p.flag || '')} ${escapeHtml(p.country || '')}</span>
            <h2 style="font-size: 1.9rem; font-weight: 900; color: var(--text-main); margin: 4px 0 6px;">${escapeHtml(p.name_ja)}</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700; margin-bottom: 10px;">${escapeHtml(p.name_en || '')}</p>
            <div class="pokemon-types" style="justify-content: center; margin-bottom: 12px;">
              <span class="type-pill type-${escapeHtml(p.category || 'MS')}">${escapeHtml(p.category_label || '')}</span>
              ${p.team ? `<span class="type-pill type-team">${escapeHtml(p.team)}</span>` : ''}
            </div>
            ${p.summary ? `<p style="max-width: 520px; margin: 0 auto 12px; font-size: 0.88rem; color: #4A5568; line-height: 1.5;">${escapeHtml(p.summary)}</p>` : ''}
          </div>
          <div class="explorer-nav-row" style="margin-top: 16px;">
            <button id="btn-exp-back" class="btn btn-subtle btn-sm">↩ 1つ前に戻る</button>
            <button id="btn-exp-reset" class="btn btn-primary btn-sm">最初からやり直す</button>
          </div>
        </div>
      `;
      document
        .getElementById('btn-exp-back')
        .addEventListener('click', stepBackExplorer);
      document
        .getElementById('btn-exp-reset')
        .addEventListener('click', initExplorer);
      renderCandidatesUnderNode(currentNode);
      return;
    }

    const stepNum = explorerPath.length + 1;
    const catBadge = currentNode.category
      ? `<span class="step-category-badge" style="margin-left: 6px;">${escapeHtml(currentNode.category)}</span>`
      : '';

    explorerCard.innerHTML = `
      <div class="current-node-box">
        <div style="margin-bottom: 8px;">
          <span class="current-q-badge">第 ${stepNum} 問 / 7</span>
          ${catBadge}
          <span class="step-num-badge" style="margin-left: 6px;">残り ${currentNode.candidates_count} 人</span>
        </div>
        <h3 class="current-q-text">${escapeHtml(currentNode.question_text)}</h3>
        <div class="explorer-actions">
          <button id="btn-exp-yes" class="btn btn-step-yes">
            <span>⭕ はい</span>
          </button>
          <button id="btn-exp-no" class="btn btn-step-no">
            <span>❌ いいえ</span>
          </button>
        </div>
        <div class="explorer-nav-row">
          <button id="btn-exp-back" class="btn btn-subtle btn-sm" ${explorerPath.length === 0 ? 'disabled' : ''}>
            ↩ 1つ前に戻る
          </button>
          <button id="btn-exp-reset" class="btn btn-subtle btn-sm" ${explorerPath.length === 0 ? 'disabled' : ''}>
            最初に戻る
          </button>
        </div>
      </div>
    `;

    document
      .getElementById('btn-exp-yes')
      .addEventListener('click', () => chooseExplorerStep('yes'));
    document
      .getElementById('btn-exp-no')
      .addEventListener('click', () => chooseExplorerStep('no'));
    document
      .getElementById('btn-exp-back')
      .addEventListener('click', stepBackExplorer);
    document
      .getElementById('btn-exp-reset')
      .addEventListener('click', initExplorer);

    renderCandidatesUnderNode(currentNode);
  }

  function chooseExplorerStep(answer) {
    if (!currentNode) return;
    const nextNode = answer === 'yes' ? currentNode.yes : currentNode.no;
    if (!nextNode) return;

    explorerPath.push({
      parentNode: currentNode,
      targetNode: nextNode,
      answer: answer,
    });
    currentNode = nextNode;
    renderExplorer();
  }

  function stepBackExplorer() {
    if (explorerPath.length === 0) return;
    explorerPath.pop();
    if (explorerPath.length === 0) {
      currentNode = treeData;
    } else {
      currentNode = explorerPath[explorerPath.length - 1].targetNode;
    }
    renderExplorer();
  }

  function getLeavesUnderNode(node, list = []) {
    if (!node) return list;
    if (node.type === 'leaf') {
      const pl = getPlayerFromLeaf(node);
      if (pl) list.push(pl);
      return list;
    }
    if (node.yes) getLeavesUnderNode(node.yes, list);
    if (node.no) getLeavesUnderNode(node.no, list);
    return list;
  }

  function renderCandidatesUnderNode(node) {
    const list = getLeavesUnderNode(node);
    candidatesCountBadge.textContent = `${list.length} 人`;
    candidatesGrid.innerHTML = '';

    const fragment = document.createDocumentFragment();
    list.forEach((p) => {
      const card = document.createElement('div');
      card.className = 'cand-item-card';
      const paddedId = p.id ? String(p.id).padStart(3, '0') : '';
      card.innerHTML = `
        <span class="cand-item-id">No.${paddedId} ${escapeHtml(p.flag || '')} ${escapeHtml(p.country || '')}</span>
        <span class="cand-item-name">${escapeHtml(p.name_ja)}</span>
        <div class="pokemon-types">
          <span class="type-pill type-${escapeHtml(p.category || 'MS')}">${escapeHtml(p.category_label || p.category)}</span>
        </div>
      `;
      card.addEventListener('click', () => {
        switchTab('tab-search');
        searchInput.value = p.name_ja;
        showPlayerRoute(p.name_ja);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      fragment.appendChild(card);
    });
    candidatesGrid.appendChild(fragment);
  }

  // ==========================================
  // Tab 4: 収録128選手一覧 (Roster Encyclopedia)
  // ==========================================
  const ROSTER_FILTERS = [
    { id: 'ALL', label: 'すべて (128)' },
    { id: 'DISCOVERED', label: '✨ 発見済み' },
    { id: 'JP', label: '🇯🇵 日本選手 (64)' },
    { id: 'INTL', label: '🌍 海外選手 (64)' },
    { id: 'MS', label: '男子シングルス' },
    { id: 'WS', label: '女子シングルス' },
    { id: 'MD', label: '男子ダブルス' },
    { id: 'WD', label: '女子ダブルス' },
    { id: 'XD', label: '混合ダブルス' },
  ];

  function renderRosterFilters() {
    if (!rosterCategoryChips) return;
    const collected = getCollectedIds();
    rosterCategoryChips.innerHTML = '';
    ROSTER_FILTERS.forEach((f) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chip-btn ${activeRosterCategory === f.id ? 'active' : ''}`;
      btn.textContent =
        f.id === 'DISCOVERED' ? `✨ 発見済み (${collected.size})` : f.label;
      btn.addEventListener('click', () => {
        activeRosterCategory = f.id;
        renderRosterFilters();
        renderRosterGrid();
      });
      rosterCategoryChips.appendChild(btn);
    });
  }

  function renderRosterGrid() {
    if (!rosterGrid) return;
    const collected = getCollectedIds();
    const kw = (rosterSearchInput ? rosterSearchInput.value : '')
      .trim()
      .toLowerCase();
    const kwHira = toHiragana(kw);

    const filtered = allPlayerList.filter((p) => {
      if (activeRosterCategory === 'DISCOVERED' && !collected.has(p.id))
        return false;
      if (activeRosterCategory === 'JP' && p.country !== '日本') return false;
      if (activeRosterCategory === 'INTL' && p.country === '日本') return false;
      if (
        ['MS', 'WS', 'MD', 'WD', 'XD'].includes(activeRosterCategory) &&
        p.category !== activeRosterCategory
      ) {
        return false;
      }

      if (!kw) return true;
      const haystack = [
        p.name_ja,
        p.name_kana,
        p.name_en,
        p.country,
        p.team,
        p.category_label,
        ...(p.tags || []),
        p.summary,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(kw) || toHiragana(haystack).includes(kwHira);
    });

    rosterGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    filtered.forEach((p) => {
      const isDiscovered = collected.has(p.id);
      const card = document.createElement('div');
      card.className = `roster-player-card ${isDiscovered ? 'is-discovered' : ''}`;
      const paddedId = String(p.id).padStart(3, '0');
      card.innerHTML = `
        <div class="roster-card-top">
          <span>No.${paddedId} ${isDiscovered ? '<span class="discovered-badge">✨ 発見済</span>' : ''}</span>
          <span>${escapeHtml(p.flag || '')} ${escapeHtml(p.country || '')}</span>
        </div>
        <div class="roster-card-name">${escapeHtml(p.name_ja)}</div>
        <div class="roster-card-en">${escapeHtml(p.name_en || '')}</div>
        <div class="pokemon-types">
          <span class="type-pill type-${escapeHtml(p.category || 'MS')}">${escapeHtml(p.category_label || p.category)}</span>
          ${p.team ? `<span class="type-pill type-team">${escapeHtml(p.team)}</span>` : ''}
        </div>
        <p class="roster-card-summary">${escapeHtml(p.summary || '')}</p>
      `;
      card.addEventListener('click', () => {
        switchTab('tab-search');
        searchInput.value = p.name_ja;
        showPlayerRoute(p.name_ja);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      fragment.appendChild(card);
    });

    rosterGrid.appendChild(fragment);
  }

  // ==========================================
  // タブ切り替え & イベント
  // ==========================================
  function switchTab(targetTabId) {
    tabButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === targetTabId);
    });
    tabContents.forEach((content) => {
      content.classList.toggle('active', content.id === targetTabId);
    });
  }

  function bindEvents() {
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
      });
    });

    btnSearch.addEventListener('click', () => {
      const val = searchInput.value.trim();
      if (val) showPlayerRoute(val);
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = searchInput.value.trim();
        if (val) showPlayerRoute(val);
      }
    });
    btnRandom.addEventListener('click', pickRandomPlayer);

    btnExpand1.addEventListener('click', () => setHierarchyDepth(1));
    btnExpand2.addEventListener('click', () => setHierarchyDepth(2));
    btnExpand3.addEventListener('click', () => setHierarchyDepth(3));
    btnExpandAll.addEventListener('click', () => setAllHierarchyOpen(true));
    btnCollapseAll.addEventListener('click', () => setAllHierarchyOpen(false));

    treeFilterInput.addEventListener('input', (e) => {
      filterTreeHierarchy(e.target.value);
    });

    if (rosterSearchInput) {
      rosterSearchInput.addEventListener('input', () => {
        renderRosterGrid();
      });
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
