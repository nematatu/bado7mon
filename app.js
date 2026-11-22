/**
 * バド7問！ (bado7mon) - アプリケーションロジック
 * 3つのエッセンス融合版：
 *  1. 128名を必ず7問で特定する完全二分決定木＆分岐答え合わせ
 *  2. シンプルなUI・カードスタック・ドラッグ物理スワイプ＆祝福アニメーション
 *  3. リアルタイム候補チラ見・もしも分岐＆途中ジャンプ・結果コピー・発見図鑑コレクション
 */

(function () {
  'use strict';

  const MAX_QUESTIONS = 7;
  const COLLECTION_STORAGE_KEY = 'bado7mon_collection_v1';
  const SAMPLE_PLAYERS = [
    '桃田賢斗',
    '山口茜',
    '渡辺勇大',
    '志田千陽',
    '奈良岡功大',
    '宮崎友花',
    'ビクトル・アクセルセン',
    'アン・セヨン（安洗塋）',
  ];

  // --- アプリ状態 ---
  let treeData = null;
  let currentNode = null;
  let historyStack = []; // [{ node, answer }]
  let allPlayers = []; // [{ id, name_ja, name_kana, name_en, ... }]
  let selectedTargetPlayer = null;
  let isAnimating = false;
  let lastCandidatesCount = 128;

  // --- DOM要素 ---
  const screens = {
    top: document.getElementById('screen-top'),
    quiz: document.getElementById('screen-quiz'),
    result: document.getElementById('screen-result'),
  };

  const confettiLayer = document.getElementById('confetti-layer');
  const collectionCountText = document.getElementById('collection-count-text');

  const btnStart = document.getElementById('btn-start');
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const btnUndo = document.getElementById('btn-undo');
  const btnQuitQuiz = document.getElementById('btn-quit-quiz');

  // お題ガチャ要素
  const btnDrawTarget = document.getElementById('btn-draw-target');
  const btnClearTarget = document.getElementById('btn-clear-target');
  const targetPreviewCard = document.getElementById('target-preview-card');
  const targetPreviewName = document.getElementById('target-preview-name');
  const targetPreviewMeta = document.getElementById('target-preview-meta');
  const targetPreviewSummary = document.getElementById('target-preview-summary');
  const sampleChipsRow = document.getElementById('sample-chips-row');
  const quizTargetBanner = document.getElementById('quiz-target-banner');
  const quizTargetName = document.getElementById('quiz-target-name');
  const quizTargetSub = document.getElementById('quiz-target-sub');

  // クイズ画面要素
  const quizStepNum = document.getElementById('quiz-step-num');
  const stepDots = document.getElementById('step-dots');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const questionCard = document.getElementById('question-card');
  const stampYes = document.getElementById('stamp-yes');
  const stampNo = document.getElementById('stamp-no');
  const cardCategory = document.getElementById('card-category');
  const cardCandidates = document.getElementById('card-candidates');
  const cardQuestionText = document.getElementById('card-question-text');
  const btnTogglePeek = document.getElementById('btn-toggle-peek');
  const btnClosePeek = document.getElementById('btn-close-peek');
  const candidatesPeekDrawer = document.getElementById('candidates-peek-drawer');
  const peekDrawerTitle = document.getElementById('peek-drawer-title');
  const peekCandidatesList = document.getElementById('peek-candidates-list');

  // 結果画面要素
  const resultPokemonId = document.getElementById('result-pokemon-id');
  const resultPokemonName = document.getElementById('result-pokemon-name');
  const resultPlayerEn = document.getElementById('result-player-en');
  const resultPokemonTypes = document.getElementById('result-pokemon-types');
  const resultPlayerSummary = document.getElementById('result-player-summary');
  const resultEmojiTrack = document.getElementById('result-emoji-track');
  const resultZukanLink = document.getElementById('result-zukan-link');
  const resultTreeLink = document.getElementById('result-tree-link');
  const feedbackInitial = document.getElementById('feedback-initial');
  const feedbackCorrectView = document.getElementById('feedback-correct-view');
  const feedbackWrongView = document.getElementById('feedback-wrong-view');
  const btnCorrect = document.getElementById('btn-correct');
  const btnWrong = document.getElementById('btn-wrong');
  const btnShare = document.getElementById('btn-share');
  const btnCopyResult = document.getElementById('btn-copy-result');
  const copyResultLabel = document.getElementById('copy-result-label');
  const btnRestartSuccess = document.getElementById('btn-restart-from-success');
  const btnRestartWrong = document.getElementById('btn-restart-from-wrong');
  const formActualPokemon = document.getElementById('form-actual-pokemon');
  const inputActualPokemon = document.getElementById('input-actual-pokemon');
  const feedbackSentMsg = document.getElementById('feedback-sent-msg');
  const actualTreeContainer = document.getElementById('actual-tree-container');
  const pokemonListDatalist = document.getElementById('pokemon-list-datalist');
  const btnToggleHistory = document.getElementById('btn-toggle-history');
  const historyContent = document.getElementById('history-content');
  const historyList = document.getElementById('history-list');
  const historyCount = document.getElementById('history-count');

  // ==========================================
  // 図鑑コレクション管理 (LocalStorage)
  // ==========================================
  function getCollectedIds() {
    try {
      const raw = localStorage.getItem(COLLECTION_STORAGE_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  }

  function recordCollectedPlayer(playerId) {
    if (!playerId) return;
    try {
      const set = getCollectedIds();
      set.add(Number(playerId));
      localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify([...set]));
      updateCollectionBadge();
    } catch {
      // ignore storage errors
    }
  }

  function updateCollectionBadge() {
    if (!collectionCountText) return;
    const count = getCollectedIds().size;
    const total = allPlayers.length || 128;
    collectionCountText.textContent = `${count}/${total}`;
  }

  // ==========================================
  // 画面遷移
  // ==========================================
  function showScreen(screenKey) {
    Object.keys(screens).forEach((key) => {
      screens[key].classList.remove('active');
    });
    if (screens[screenKey]) {
      screens[screenKey].classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ==========================================
  // 初期化・データロード
  // ==========================================
  async function init() {
    if (window.TREE_DATA) {
      treeData = window.TREE_DATA;
    } else {
      try {
        const res = await fetch('data/tree.json?v=20261122_2');
        treeData = await res.json();
      } catch (err) {
        console.error('Failed to load tree data:', err);
        alert('データの読み込みに失敗しました。ページを再読み込みしてください。');
        return;
      }
    }

    extractPlayers(treeData);
    populateDatalist();
    renderSampleChips();
    updateCollectionBadge();
    bindEvents();
  }

  function getPlayerFromLeaf(node) {
    if (!node) return null;
    return node.player || node.pokemon || null;
  }

  function extractPlayers(node) {
    if (!node) return;
    if (node.type === 'leaf') {
      const pl = getPlayerFromLeaf(node);
      if (pl && pl.name_ja) {
        allPlayers.push(pl);
      }
      return;
    }
    if (node.yes) extractPlayers(node.yes);
    if (node.no) extractPlayers(node.no);
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

  function populateDatalist() {
    const sorted = [...allPlayers].sort((a, b) =>
      a.name_ja.localeCompare(b.name_ja, 'ja')
    );
    const fragment = document.createDocumentFragment();
    sorted.forEach((pl) => {
      const opt = document.createElement('option');
      opt.value = pl.name_ja;
      opt.label = `${pl.flag || ''} ${pl.category_label || ''} / ${pl.team || ''}`;
      fragment.appendChild(opt);
    });
    pokemonListDatalist.appendChild(fragment);
  }

  // ==========================================
  // お題ガチャ & サンプルチップ
  // ==========================================
  function renderSampleChips() {
    if (!sampleChipsRow) return;
    sampleChipsRow.innerHTML = '';
    SAMPLE_PLAYERS.forEach((name) => {
      const pl = allPlayers.find((p) => p.name_ja === name);
      if (!pl) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sample-chip';
      btn.dataset.playerName = pl.name_ja;
      btn.textContent = `${pl.flag || '🏸'} ${pl.name_ja.replace(/（.*）/, '')}`;
      btn.addEventListener('click', () => {
        setTargetPlayer(pl);
      });
      sampleChipsRow.appendChild(btn);
    });
  }

  function setTargetPlayer(player) {
    selectedTargetPlayer = player;
    const chips = sampleChipsRow
      ? sampleChipsRow.querySelectorAll('.sample-chip')
      : [];
    chips.forEach((c) => {
      c.classList.toggle(
        'active',
        Boolean(player && c.dataset.playerName === player.name_ja)
      );
    });

    if (!player) {
      if (targetPreviewCard) targetPreviewCard.style.display = 'none';
      if (quizTargetBanner) quizTargetBanner.style.display = 'none';
      return;
    }

    if (targetPreviewCard) {
      targetPreviewName.textContent = `${player.flag || '🏸'} ${player.name_ja}`;
      targetPreviewMeta.innerHTML = `
        <span class="type-pill type-${escapeHtml(player.category || 'MS')}">${escapeHtml(player.category_label || player.category)}</span>
        <span class="type-pill type-team">${escapeHtml(player.team || player.country)}</span>
        ${player.hand ? `<span class="type-pill type-tag">${escapeHtml(player.hand)}</span>` : ''}
      `;
      targetPreviewSummary.textContent = player.summary || '';
      targetPreviewCard.style.display = 'block';
    }

    if (quizTargetBanner) {
      quizTargetName.textContent = `${player.flag || '🏸'} ${player.name_ja}`;
      quizTargetSub.textContent = `（${player.category_label || ''} ／ ${player.team || ''}）`;
    }
  }

  function drawRandomTarget() {
    if (allPlayers.length === 0) return;
    const rand = allPlayers[Math.floor(Math.random() * allPlayers.length)];
    setTargetPlayer(rand);
  }

  // ==========================================
  // ゲーム進行 & アニメーション演出
  // ==========================================
  function startGame() {
    historyStack = [];
    currentNode = treeData;
    isAnimating = false;
    lastCandidatesCount = 128;
    if (candidatesPeekDrawer) {
      candidatesPeekDrawer.style.display = 'none';
    }
    if (quizTargetBanner) {
      quizTargetBanner.style.display = selectedTargetPlayer ? 'flex' : 'none';
    }
    showScreen('quiz');
    renderQuestion(currentNode);
  }

  function renderStepDots() {
    if (!stepDots) return;
    stepDots.innerHTML = '';
    for (let i = 0; i < MAX_QUESTIONS; i++) {
      const dot = document.createElement('span');
      dot.className = 'step-dot';
      if (i < historyStack.length) {
        dot.classList.add(
          historyStack[i].answer === 'yes' ? 'done-yes' : 'done-no'
        );
      } else if (i === historyStack.length) {
        dot.classList.add('current');
      }
      stepDots.appendChild(dot);
    }
  }

  function animateCandidatesCount(fromVal, toVal) {
    if (!cardCandidates || !toVal) return;
    if (fromVal === toVal) {
      cardCandidates.textContent = `のこり ${toVal} 人`;
      return;
    }
    const duration = 240;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(fromVal + (toVal - fromVal) * eased);
      cardCandidates.textContent = `のこり ${current} 人`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  function updatePeekDrawer(node) {
    if (!peekCandidatesList || !node) return;
    const leaves = getLeavesUnderNode(node);
    if (peekDrawerTitle) {
      peekDrawerTitle.textContent = `現在の候補選手（${leaves.length}人）`;
    }
    peekCandidatesList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    leaves.forEach((p) => {
      const chip = document.createElement('span');
      chip.className = 'peek-player-chip';
      chip.textContent = `${p.flag || ''} ${p.name_ja.replace(/（.*）/, '')}`;
      fragment.appendChild(chip);
    });
    peekCandidatesList.appendChild(fragment);
  }

  function renderQuestion(node) {
    const stepNum = historyStack.length + 1;
    quizStepNum.textContent = stepNum;
    renderStepDots();

    const pct = Math.min(100, Math.round((stepNum / MAX_QUESTIONS) * 100));
    quizProgressBar.style.width = pct + '%';

    if (cardCategory) {
      cardCategory.textContent = node.category || '質問';
    }

    const nextCount = node.candidates_count || 128;
    animateCandidatesCount(lastCandidatesCount, nextCount);
    lastCandidatesCount = nextCount;

    cardQuestionText.textContent = node.question_text || '';
    updatePeekDrawer(node);

    btnUndo.disabled = historyStack.length === 0;
    resetCardDragStyle();
    questionCard.className = 'question-card card-enter';
  }

  function handleAnswer(answer) {
    if (isAnimating || !currentNode) return;
    isAnimating = true;

    historyStack.push({
      node: currentNode,
      answer: answer,
    });

    resetCardDragStyle();
    const swipeClass = answer === 'yes' ? 'swipe-left' : 'swipe-right';
    questionCard.className = `question-card ${swipeClass}`;

    setTimeout(() => {
      const nextNode = answer === 'yes' ? currentNode.yes : currentNode.no;
      currentNode = nextNode;

      if (!currentNode) {
        console.error('Node not found');
        isAnimating = false;
        return;
      }

      if (currentNode.type === 'leaf') {
        showResult(currentNode);
      } else {
        renderQuestion(currentNode);
      }
      isAnimating = false;
    }, 250);
  }

  function undoLastStep() {
    if (isAnimating || historyStack.length === 0) return;
    const last = historyStack.pop();
    currentNode = last.node;
    renderQuestion(currentNode);
  }

  function jumpToQuestionStep(stepZeroIndexed) {
    if (isAnimating || stepZeroIndexed < 0 || stepZeroIndexed >= historyStack.length) {
      return;
    }
    const targetEntry = historyStack[stepZeroIndexed];
    historyStack = historyStack.slice(0, stepZeroIndexed);
    currentNode = targetEntry.node;
    showScreen('quiz');
    renderQuestion(currentNode);
  }

  // ==========================================
  // 祝福コンフェッティ演出
  // ==========================================
  function fireConfetti() {
    if (!confettiLayer) return;
    confettiLayer.innerHTML = '';
    const colors = ['#FF5A5F', '#3DBE7A', '#4E9BEE', '#FFAA2A', '#F687B3'];
    for (let i = 0; i < 38; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const left = Math.random() * 100;
      const dx = (Math.random() - 0.5) * 220;
      const rot = 360 + Math.random() * 720;
      const delay = Math.random() * 0.25;
      piece.style.left = `${left}%`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.setProperty('--dx', `${dx}px`);
      piece.style.setProperty('--rot', `${rot}deg`);
      piece.style.animationDelay = `${delay}s`;
      confettiLayer.appendChild(piece);
    }
    setTimeout(() => {
      if (confettiLayer) confettiLayer.innerHTML = '';
    }, 2300);
  }

  // ==========================================
  // 結果画面
  // ==========================================
  function showResult(leafNode) {
    const player = getPlayerFromLeaf(leafNode) || {};
    const name = player.name_ja || '不明な選手';
    const playerId = player.id;

    // 発見コレクションに記録
    recordCollectedPlayer(playerId);

    // UIリセット
    feedbackInitial.style.display = 'block';
    feedbackCorrectView.style.display = 'none';
    feedbackWrongView.style.display = 'none';
    feedbackSentMsg.style.display = 'none';
    if (actualTreeContainer) {
      actualTreeContainer.style.display = 'none';
      actualTreeContainer.innerHTML = '';
    }
    formActualPokemon.reset();
    formActualPokemon.style.display = 'flex';
    historyContent.style.display = 'none';
    btnToggleHistory.classList.remove('accordion-open');
    if (copyResultLabel) {
      copyResultLabel.textContent = '📋 結果をコピー';
    }

    // 選手情報表示
    resultPokemonName.textContent = name;
    if (resultPlayerEn) {
      resultPlayerEn.textContent = player.name_en || '';
      resultPlayerEn.style.display = player.name_en ? 'block' : 'none';
    }

    if (playerId) {
      const paddedId = String(playerId).padStart(3, '0');
      const flagStr = player.flag ? `${player.flag} ${player.country || ''}` : '';
      resultPokemonId.textContent = `No.${paddedId} ${flagStr}`.trim();
      resultPokemonId.style.display = 'inline-block';

      const searchQuery = encodeURIComponent(`${name} バドミントン`);
      resultZukanLink.href = `https://www.google.com/search?q=${searchQuery}`;
      resultZukanLink.style.display = 'inline-flex';
    } else {
      resultPokemonId.style.display = 'none';
      resultZukanLink.style.display = 'none';
    }

    if (resultTreeLink) {
      resultTreeLink.href = `tree/index.html?player=${encodeURIComponent(name)}`;
    }

    // 種目・所属・特徴バッジ
    resultPokemonTypes.innerHTML = '';
    if (player.category_label) {
      const span = document.createElement('span');
      span.className = `type-pill type-${player.category || 'MS'}`;
      span.textContent = player.category_label;
      resultPokemonTypes.appendChild(span);
    }
    if (player.team) {
      const span = document.createElement('span');
      span.className = 'type-pill type-team';
      span.textContent = player.team;
      resultPokemonTypes.appendChild(span);
    }
    if (Array.isArray(player.tags)) {
      player.tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'type-pill type-tag';
        span.textContent = tag;
        resultPokemonTypes.appendChild(span);
      });
    }

    if (resultPlayerSummary) {
      resultPlayerSummary.textContent = player.summary || '';
      resultPlayerSummary.style.display = player.summary ? 'block' : 'none';
    }

    // 回答軌跡絵文字バー
    if (resultEmojiTrack) {
      const emojis = historyStack
        .map((h) => (h.answer === 'yes' ? '🟢' : '🔵'))
        .join('');
      resultEmojiTrack.textContent = `回答ルート: ${emojis} (${historyStack.length}問)`;
    }

    if (selectedTargetPlayer && inputActualPokemon) {
      inputActualPokemon.value = selectedTargetPlayer.name_ja;
    }

    renderHistory();
    showScreen('result');
  }

  function describeOppositeBranch(questionNode, chosenAnswer) {
    if (!questionNode) return '';
    const oppNode = chosenAnswer === 'yes' ? questionNode.no : questionNode.yes;
    if (!oppNode) return '';
    const oppLabel = chosenAnswer === 'yes' ? 'いいえ' : 'はい';
    if (oppNode.type === 'leaf') {
      const oppPlayer = getPlayerFromLeaf(oppNode);
      if (oppPlayer) {
        return `🔄 もし「${oppLabel}」なら → ${oppPlayer.flag || ''} ${oppPlayer.name_ja}`;
      }
    }
    const leaves = getLeavesUnderNode(oppNode);
    const previewNames = leaves
      .slice(0, 2)
      .map((p) => p.name_ja.replace(/（.*）/, ''))
      .join('・');
    return `🔄 もし「${oppLabel}」なら → ${previewNames} など${leaves.length}人へ分岐`;
  }

  function renderHistory() {
    historyList.innerHTML = '';
    historyCount.textContent = historyStack.length;

    historyStack.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'history-item';

      const isYes = item.answer === 'yes';
      const mainRow = document.createElement('div');
      mainRow.className = 'history-item-main';

      const badge = document.createElement('span');
      badge.className = `history-badge ${isYes ? 'yes' : 'no'}`;
      badge.textContent = isYes ? 'はい' : 'いいえ';

      const text = document.createElement('span');
      text.className = 'history-q-text';
      text.textContent = `Q${index + 1}. ${item.node.question_text || ''}`;

      mainRow.appendChild(badge);
      mainRow.appendChild(text);

      const subRow = document.createElement('div');
      subRow.className = 'history-item-sub';

      const altHint = document.createElement('span');
      altHint.className = 'history-alt-hint';
      altHint.textContent = describeOppositeBranch(item.node, item.answer);

      const jumpBtn = document.createElement('button');
      jumpBtn.type = 'button';
      jumpBtn.className = 'btn-jump-step';
      jumpBtn.textContent = `↩ Q${index + 1}からやり直す`;
      jumpBtn.addEventListener('click', () => {
        jumpToQuestionStep(index);
      });

      subRow.appendChild(altHint);
      subRow.appendChild(jumpBtn);

      li.appendChild(mainRow);
      li.appendChild(subRow);
      historyList.appendChild(li);
    });
  }

  // ==========================================
  // フィードバック & シェア・コピー
  // ==========================================
  function handleCorrect() {
    feedbackInitial.style.display = 'none';
    feedbackCorrectView.style.display = 'block';
    fireConfetti();
  }

  function handleWrong() {
    feedbackInitial.style.display = 'none';
    feedbackWrongView.style.display = 'block';

    if (
      selectedTargetPlayer &&
      selectedTargetPlayer.name_ja !== resultPokemonName.textContent
    ) {
      inputActualPokemon.value = selectedTargetPlayer.name_ja;
      renderActualPokemonComparison(selectedTargetPlayer.name_ja);
    }
  }

  function submitActualPokemon(e) {
    e.preventDefault();
    const rawActual = inputActualPokemon.value.trim();
    if (!rawActual) return;

    formActualPokemon.style.display = 'none';
    feedbackSentMsg.style.display = 'block';

    renderActualPokemonComparison(rawActual);
  }

  function toHiragana(str) {
    return str
      .replace(/[\u30a1-\u30f6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
      )
      .trim();
  }

  function findMatchedPlayer(rawInput) {
    const q = rawInput.trim();
    if (!q) return null;
    const qLower = q.toLowerCase();
    const qHira = toHiragana(q);

    return (
      allPlayers.find((p) => p.name_ja === q) ||
      allPlayers.find((p) => p.name_kana === qHira) ||
      allPlayers.find((p) => (p.name_en || '').toLowerCase() === qLower) ||
      allPlayers.find(
        (p) =>
          p.name_ja.includes(q) ||
          toHiragana(p.name_ja).includes(qHira) ||
          (p.name_kana && p.name_kana.includes(qHira)) ||
          (p.name_en && p.name_en.toLowerCase().includes(qLower))
      ) ||
      null
    );
  }

  function findPathToPlayer(node, targetName, currentPath = []) {
    if (!node) return null;
    if (node.type === 'leaf') {
      const pl = getPlayerFromLeaf(node);
      if (pl && pl.name_ja === targetName) {
        return { path: currentPath, player: pl };
      }
      return null;
    }

    if (node.yes) {
      const res = findPathToPlayer(node.yes, targetName, [
        ...currentPath,
        { node: node, expectedAnswer: 'yes' },
      ]);
      if (res) return res;
    }

    if (node.no) {
      const res = findPathToPlayer(node.no, targetName, [
        ...currentPath,
        { node: node, expectedAnswer: 'no' },
      ]);
      if (res) return res;
    }

    return null;
  }

  function renderActualPokemonComparison(rawInput) {
    if (!actualTreeContainer) return;
    actualTreeContainer.innerHTML = '';

    const matched = findMatchedPlayer(rawInput);
    const targetName = matched ? matched.name_ja : rawInput;
    const result = findPathToPlayer(treeData, targetName);

    if (!result) {
      actualTreeContainer.style.display = 'block';
      actualTreeContainer.innerHTML = `
        <div class="actual-tree-card">
          <div class="actual-tree-header">
            <h3 class="actual-tree-title">⚠️ 「${escapeHtml(rawInput)}」のデータが見つかりませんでした</h3>
            <p class="actual-tree-desc">全128名の収録選手から漢字・ひらがな・カタカナ・英語名で検索できます。<a href="tree/index.html">全質問ツリー＆選手一覧</a>もあわせてご覧ください。</p>
          </div>
        </div>
      `;
      return;
    }

    const targetPlayer = result.player;
    const path = result.path;

    let firstDivergeIndex = -1;
    let diverged = false;

    const stepComparisons = path.map((step, idx) => {
      let userStep = null;
      let status = 'unreached'; // match | diverge | unreached

      if (!diverged && idx < historyStack.length) {
        userStep = historyStack[idx];
        if (
          userStep.node &&
          (userStep.node.node_id === step.node.node_id ||
            userStep.node.question_text === step.node.question_text)
        ) {
          if (userStep.answer === step.expectedAnswer) {
            status = 'match';
          } else {
            status = 'diverge';
            diverged = true;
            if (firstDivergeIndex === -1) {
              firstDivergeIndex = idx;
            }
          }
        } else {
          diverged = true;
          if (firstDivergeIndex === -1) {
            firstDivergeIndex = idx;
          }
        }
      }

      return {
        stepIndex: idx + 1,
        node: step.node,
        expectedAnswer: step.expectedAnswer,
        userAnswer: userStep ? userStep.answer : null,
        status: status,
      };
    });

    const cardEl = document.createElement('div');
    cardEl.className = 'actual-tree-card';

    let noticeHtml = '';
    if (firstDivergeIndex !== -1) {
      noticeHtml = `
        <div class="actual-tree-diverge-notice">
          ⚡ <strong>Q${firstDivergeIndex + 1}</strong> で本来と異なる回答をしたため、別の選手へ分岐しました！
        </div>
      `;
    } else if (historyStack.length === path.length) {
      noticeHtml = `
        <div class="actual-tree-diverge-notice no-diverge">
          ✨ すべての質問の回答が一致していました！
        </div>
      `;
    }

    const headerHtml = `
      <div class="actual-tree-header">
        <h3 class="actual-tree-title">
          <span>🎯</span>
          <span>答え合わせ：「${escapeHtml(targetPlayer.name_ja)}」への道順</span>
        </h3>
        <p class="actual-tree-desc">
          「${escapeHtml(targetPlayer.name_ja)}」にたどり着くための本来の質問ルート（全${path.length}問）と、あなたの回答の比較です。
        </p>
        ${noticeHtml}
      </div>
    `;

    let stepsHtml = '<div class="actual-tree-steps">';
    stepComparisons.forEach((item) => {
      const expYes = item.expectedAnswer === 'yes';
      const expBadge = `<span class="history-badge ${expYes ? 'yes' : 'no'}">${expYes ? 'はい' : 'いいえ'}</span>`;

      let statusTag = '';
      let userAnsHtml = '';
      let stepClass = 'actual-tree-step';

      if (item.status === 'match') {
        stepClass += ' step-match';
        statusTag = '<span class="step-status-tag tag-match">⭕ 一致</span>';
        const userYes = item.userAnswer === 'yes';
        userAnsHtml = `
          <div class="answer-item">
            <span class="answer-label">あなたの回答：</span>
            <span class="history-badge ${userYes ? 'yes' : 'no'}">${userYes ? 'はい' : 'いいえ'}</span>
          </div>
        `;
      } else if (item.status === 'diverge') {
        stepClass += ' step-diverge';
        statusTag = '<span class="step-status-tag tag-diverge">❌ ここで分岐！</span>';
        const userYes = item.userAnswer === 'yes';
        userAnsHtml = `
          <div class="answer-item">
            <span class="answer-label">あなたの回答：</span>
            <span class="history-badge ${userYes ? 'yes' : 'no'}">${userYes ? 'はい' : 'いいえ'}</span>
          </div>
        `;
      } else {
        stepClass += ' step-unreached';
        statusTag = '<span class="step-status-tag tag-unreached">正解ルート</span>';
        userAnsHtml = `
          <div class="answer-item">
            <span class="answer-label" style="opacity: 0.7;">（分岐後のため未出題）</span>
          </div>
        `;
      }

      const categoryBadge = item.node.category
        ? `<span class="step-category-badge">${escapeHtml(item.node.category)}</span>`
        : '';

      stepsHtml += `
        <div class="${stepClass}">
          <div class="step-meta-row">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="step-num-badge">Q${item.stepIndex}</span>
              ${categoryBadge}
            </div>
            ${statusTag}
          </div>
          <p class="step-question-text">${escapeHtml(item.node.question_text || '')}</p>
          <div class="step-answers-row">
            <div class="answer-item">
              <span class="answer-label">正解：</span>
              ${expBadge}
            </div>
            ${userAnsHtml}
          </div>
        </div>
      `;
    });
    stepsHtml += '</div>';

    const paddedId = targetPlayer.id ? String(targetPlayer.id).padStart(3, '0') : '';
    let typesHtml = '';
    if (targetPlayer.category_label) {
      typesHtml += `<span class="type-pill type-${escapeHtml(targetPlayer.category || 'MS')}">${escapeHtml(targetPlayer.category_label)}</span>`;
    }
    if (targetPlayer.team) {
      typesHtml += `<span class="type-pill type-team">${escapeHtml(targetPlayer.team)}</span>`;
    }

    const goalHtml = `
      <div class="actual-tree-goal">
        <span class="goal-label">🏁 目指していた選手</span>
        ${paddedId ? `<span class="pokemon-id-badge">No.${paddedId} ${escapeHtml(targetPlayer.flag || '')} ${escapeHtml(targetPlayer.country || '')}</span>` : ''}
        <h4 class="goal-pokemon-name">${escapeHtml(targetPlayer.name_ja)}</h4>
        <div class="pokemon-types" style="margin-bottom: 4px;">
          ${typesHtml}
        </div>
        ${targetPlayer.summary ? `<p style="font-size: 0.82rem; color: #4A5568; line-height: 1.45;">${escapeHtml(targetPlayer.summary)}</p>` : ''}
      </div>
    `;

    cardEl.innerHTML = headerHtml + stepsHtml + goalHtml;
    actualTreeContainer.appendChild(cardEl);
    actualTreeContainer.style.display = 'block';

    actualTreeContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

  function buildShareSummaryText() {
    const guessedName = resultPokemonName.textContent;
    const count = historyStack.length;
    const emojis = historyStack
      .map((h) => (h.answer === 'yes' ? '🟢' : '🔵'))
      .join('');
    return `【バド7問！🏸】\n${count}回の質問で思い浮かべたバドミントン選手「${guessedName}」をピタリと当てられました！\nルート: ${emojis}`;
  }

  function shareResult() {
    const shareText = buildShareSummaryText() + '\n';
    const shareUrl = 'https://nematatu.github.io/bado7mon/';
    const hashtags = 'バド7問,バドミントン';

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  }

  async function copyResultToClipboard() {
    const text = `${buildShareSummaryText()}\nhttps://nematatu.github.io/bado7mon/`;
    try {
      await navigator.clipboard.writeText(text);
      if (copyResultLabel) {
        copyResultLabel.textContent = '✅ コピーしました！';
      }
    } catch {
      if (copyResultLabel) {
        copyResultLabel.textContent = 'コピー完了';
      }
    }
  }

  // ==========================================
  // インタラクティブ・カードドラッグ物理スワイプ
  // ==========================================
  let dragStartX = null;
  let dragCurrentX = 0;

  function resetCardDragStyle() {
    questionCard.style.transform = '';
    questionCard.style.transition = '';
    if (stampYes) stampYes.style.opacity = '0';
    if (stampNo) stampNo.style.opacity = '0';
  }

  function onPointerDown(clientX, targetEl) {
    if (isAnimating) return;
    if (targetEl && targetEl.closest('button')) return;
    dragStartX = clientX;
    dragCurrentX = 0;
    questionCard.style.transition = 'none';
  }

  function onPointerMove(clientX) {
    if (dragStartX === null || isAnimating) return;
    dragCurrentX = clientX - dragStartX;
    const rotate = dragCurrentX * 0.08;
    questionCard.style.transform = `translate3d(${dragCurrentX}px, 0, 0) rotate(${rotate}deg)`;

    const ratio = Math.min(1, Math.abs(dragCurrentX) / 85);
    if (dragCurrentX < -15) {
      if (stampYes) stampYes.style.opacity = String(ratio);
      if (stampNo) stampNo.style.opacity = '0';
    } else if (dragCurrentX > 15) {
      if (stampNo) stampNo.style.opacity = String(ratio);
      if (stampYes) stampYes.style.opacity = '0';
    } else {
      if (stampYes) stampYes.style.opacity = '0';
      if (stampNo) stampNo.style.opacity = '0';
    }
  }

  function onPointerEnd() {
    if (dragStartX === null) return;
    const dx = dragCurrentX;
    dragStartX = null;
    dragCurrentX = 0;

    if (Math.abs(dx) > 75) {
      handleAnswer(dx < 0 ? 'yes' : 'no');
    } else {
      resetCardDragStyle();
    }
  }

  // ==========================================
  // イベント登録
  // ==========================================
  function bindEvents() {
    btnStart.addEventListener('click', startGame);

    if (btnDrawTarget) {
      btnDrawTarget.addEventListener('click', drawRandomTarget);
    }
    if (btnClearTarget) {
      btnClearTarget.addEventListener('click', () => setTargetPlayer(null));
    }

    btnYes.addEventListener('click', () => handleAnswer('yes'));
    btnNo.addEventListener('click', () => handleAnswer('no'));
    btnUndo.addEventListener('click', undoLastStep);
    if (btnQuitQuiz) {
      btnQuitQuiz.addEventListener('click', () => showScreen('top'));
    }

    if (btnTogglePeek && candidatesPeekDrawer) {
      btnTogglePeek.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = candidatesPeekDrawer.style.display === 'none';
        candidatesPeekDrawer.style.display = isHidden ? 'block' : 'none';
      });
    }
    if (btnClosePeek && candidatesPeekDrawer) {
      btnClosePeek.addEventListener('click', () => {
        candidatesPeekDrawer.style.display = 'none';
      });
    }

    // タッチ＆マウスドラッグスワイプ
    questionCard.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches && e.touches.length === 1) {
          onPointerDown(e.touches[0].clientX, e.target);
        }
      },
      { passive: true }
    );
    questionCard.addEventListener(
      'touchmove',
      (e) => {
        if (e.touches && e.touches.length === 1) {
          onPointerMove(e.touches[0].clientX);
        }
      },
      { passive: true }
    );
    questionCard.addEventListener('touchend', onPointerEnd, { passive: true });

    questionCard.addEventListener('mousedown', (e) => {
      onPointerDown(e.clientX, e.target);
    });
    window.addEventListener('mousemove', (e) => {
      onPointerMove(e.clientX);
    });
    window.addEventListener('mouseup', onPointerEnd);

    // キーボードショートカット（←/Y: はい, →/N: いいえ, Z/Backspace: 戻る）
    window.addEventListener('keydown', (e) => {
      if (!screens.quiz.classList.contains('active')) return;
      if (e.key === 'ArrowLeft' || e.key === 'y' || e.key === 'Y') {
        handleAnswer('yes');
      } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
        handleAnswer('no');
      } else if ((e.key === 'z' || e.key === 'Backspace') && !btnUndo.disabled) {
        undoLastStep();
      }
    });

    btnCorrect.addEventListener('click', handleCorrect);
    btnWrong.addEventListener('click', handleWrong);
    formActualPokemon.addEventListener('submit', submitActualPokemon);
    btnShare.addEventListener('click', shareResult);
    if (btnCopyResult) {
      btnCopyResult.addEventListener('click', copyResultToClipboard);
    }

    btnRestartSuccess.addEventListener('click', () => showScreen('top'));
    btnRestartWrong.addEventListener('click', () => showScreen('top'));

    btnToggleHistory.addEventListener('click', () => {
      const isHidden = historyContent.style.display === 'none';
      historyContent.style.display = isHidden ? 'block' : 'none';
      btnToggleHistory.classList.toggle('accordion-open', isHidden);
    });
  }

  // 起動
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
