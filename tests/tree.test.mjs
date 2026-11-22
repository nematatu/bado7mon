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

    // Simulate walking the decision tree using the player's route
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
