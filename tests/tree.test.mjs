import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

test('decision tree uniquely identifies all 128 badminton players in 7 questions', () => {
  const treePath = path.join(ROOT_DIR, 'data', 'tree.json');
  const playersPath = path.join(ROOT_DIR, 'data', 'players.json');

  assert.ok(fs.existsSync(treePath), 'data/tree.json must exist');
  assert.ok(fs.existsSync(playersPath), 'data/players.json must exist');

  const tree = JSON.parse(fs.readFileSync(treePath, 'utf8'));
  const players = JSON.parse(fs.readFileSync(playersPath, 'utf8'));

  assert.equal(players.length, 128, 'Must contain exactly 128 players');
  assert.equal(tree.candidates_count, 128, 'Root node must have 128 candidates');

  const ids = new Set();
  const names = new Set();

  for (const player of players) {
    assert.ok(!ids.has(player.id), `Duplicate player ID: ${player.id}`);
    assert.ok(!names.has(player.name_ja), `Duplicate player name: ${player.name_ja}`);
    ids.add(player.id);
    names.add(player.name_ja);

    assert.equal(player.route.length, 7, `${player.name_ja} must have an exact 7-step route`);

    let curr = tree;
    for (const step of player.route) {
      assert.equal(curr.type, 'question');
      assert.equal(curr.question_id, step.question_id);
      curr = step.answer === 'yes' ? curr.yes : curr.no;
      assert.ok(curr, `Missing branch for ${player.name_ja} at ${step.question_id}`);
    }

    assert.equal(curr.type, 'leaf');
    assert.equal(curr.player.id, player.id);
    assert.equal(curr.player.name_ja, player.name_ja);
  }
});

test('no question text contains any player name, surname, or pair portmanteau revealing player names', () => {
  const tree = JSON.parse(
    fs.readFileSync(path.join(ROOT_DIR, 'data', 'tree.json'), 'utf8')
  );
  const players = JSON.parse(
    fs.readFileSync(path.join(ROOT_DIR, 'data', 'players.json'), 'utf8')
  );

  // Build forbidden tokens from all 128 players + surnames + pair portmanteaus
  const forbiddenTokens = new Set([
    'ホキコバ',
    'ソノカム',
    'シダマツ',
    'フクヒロ',
    'ナガマツ',
    'ナカイワ',
    'タカマツ',
    'オグシオ',
    'ワタガシ',
    'ワタタグ',
    'ミドサイ',
    'オカミツ',
    'クマニシ',
    'コガサイ',
    'シモノム',
    'エンハヤ',
    'キムコン',
    '凡晨',
    '聖譚',
    '雅思',
    '梁王',
    '麟洋',
    'バスポー',
    // Surnames
    '桃田',
    '奈良岡',
    '田中',
    '田児',
    '佐々木',
    '常山',
    '西本',
    '渡邉',
    '高橋',
    '大林',
    '秦野',
    '小川',
    '古賀',
    '武井',
    '沖本',
    '宮下',
    '小林',
    '保木',
    '園田',
    '嘉村',
    '渡辺',
    '緑川',
    '遠藤',
    '早川',
    '岡村',
    '三橋',
    '熊谷',
    '齋藤',
    '霜上',
    '野村',
    '山口',
    '奥原',
    '宮崎',
    '仁平',
    '大堀',
    '髙橋',
    '三谷',
    '廣瀬',
    '郡司',
    '水津',
    '明地',
    '海老原',
    '杉山',
    '小西',
    '志田',
    '松山',
    '廣田',
    '松本',
    '永原',
    '中西',
    '岩永',
    '松友',
    '潮田',
    '小椋',
    '五十嵐',
    '東野',
    '田口',
    '櫻本',
  ]);

  for (const pl of players) {
    forbiddenTokens.add(pl.name_ja);
    const mainName = pl.name_ja.replace(/（.*）/, '').trim();
    forbiddenTokens.add(mainName);
    const parenMatch = pl.name_ja.match(/（(.+)）/);
    if (parenMatch) {
      forbiddenTokens.add(parenMatch[1].trim());
    }
    // Katakana parts (3+ chars, excluding generic word "ジュニア")
    for (const part of mainName.split('・')) {
      if (part.length >= 3 && part !== 'ジュニア') {
        forbiddenTokens.add(part);
      }
    }
  }

  const questions = [];
  function collectQuestions(node) {
    if (!node || node.type === 'leaf') return;
    questions.push(node);
    collectQuestions(node.yes);
    collectQuestions(node.no);
  }
  collectQuestions(tree);

  assert.equal(questions.length, 127, 'Must have 127 question nodes');

  for (const qNode of questions) {
    for (const token of forbiddenTokens) {
      assert.ok(
        !qNode.question_text.includes(token),
        `Question [${qNode.question_id}] "${qNode.question_text}" must not contain player name/token "${token}"`
      );
    }
  }
});

test('static assets and Cloudflare dist output are complete', () => {
  const required = [
    'index.html',
    'style.css',
    'app.js',
    'icon.png',
    'thumbnail.png',
    'data/tree.js',
    'data/tree.json',
    'tree/index.html',
    'tree/style.css',
    'tree/tree-viewer.js',
    'wrangler.jsonc',
  ];

  for (const rel of required) {
    assert.ok(fs.existsSync(path.join(ROOT_DIR, rel)), `Missing root file: ${rel}`);
  }
});
