import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const FILES_TO_COPY = [
  'index.html',
  'style.css',
  'app.js',
  'icon.png',
  'thumbnail.png',
  'data/tree.json',
  'data/tree.js',
  'data/players.json',
  'tree/index.html',
  'tree/style.css',
  'tree/tree-viewer.js',
];

fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(DIST_DIR, { recursive: true });

for (const relPath of FILES_TO_COPY) {
  const src = path.join(ROOT_DIR, relPath);
  const dst = path.join(DIST_DIR, relPath);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.writeFileSync(dst, fs.readFileSync(src));
}

console.log(`✅ Built static assets into dist/ (${FILES_TO_COPY.length} files).`);
