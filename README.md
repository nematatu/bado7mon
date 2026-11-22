# 🏸 バド7問！ (bado7mon)

**7回の質問で128人のバドミントン選手を一意に特定するWebアプリ**

Inspired by [@maltonn_](https://x.com/maltonn_) さんの「[ポケ11問！ (poke11mon)](https://github.com/maltonn/poke11mon)」。

- 🌐 **GitHub Pages (公開URL)**: https://nematatu.github.io/bado7mon/
- 🌳 **全質問ツリー＆収録128選手図鑑**: https://nematatu.github.io/bado7mon/tree/

![バド7問！ サムネイル](thumbnail.png)

## ✨ 特徴

1. **必ず7問でピタリと特定（$2^7 = 128$ の完全二分決定木）**
   - 日本代表・S/Jリーグ主力＆レジェンド **64名** ＋ 海外BWF世界トップ＆レジェンド **64名** の計 **128名** を収録。
   - 質問ごとに候補が `128人 → 64人 → 32人 → 16人 → 8人 → 4人 → 2人 → 1人` と綺麗に半減します。
2. **「違った…」ときの答え合わせルート比較機能**
   - 推測が外れた場合、思い浮かべていた選手名（漢字・ひらがな・カタカナ・英語対応）を入力すると、**何問目（Q#）の回答で別ルートに分岐したか**を一覧で答え合わせできます。
3. **🎯 お題ガチャ機能**
   - 「誰を思い浮かべるか迷う」「試しに遊んでみたい」というときのために、TOP画面で128名からランダムにお題を引けるガチャを搭載。
4. **🌳 全質問ツリー＆収録128選手ずかん (`/tree/`)**
   - **選手別ルート検索**：任意の選手への7問の「はい／いいえ」ルートを表示
   - **全体階層ツリー**：全127問の分岐ノードを展開・折りたたみ・キーワード検索
   - **ステップ探索**：1問ずつ分岐を進みながら残り候補選手一覧をリアルタイム表示
   - **収録128選手一覧**：日本／海外・種目（MS/WS/MD/WD/XD）フィルタ付きの選手図鑑
5. **完全無料（$0）構成**
   - フレームワークや有料DB（D1/KV/DO等）を一切使わない純粋な静的アセット配信のため、**Cloudflare Workers (Static Assets) / Cloudflare Pages / GitHub Pages の無料枠（$0）**で無制限に運用できます。

## 🚀 ローカル開発・テスト

```bash
# 決定木データ (data/tree.json, data/tree.js) と Cloudflare配信用 dist/ の生成
npm run build

# 全128選手が7問で一意に特定できるかの自動検証テスト
npm test

# ローカルサーバー起動 (http://localhost:8788)
npm run dev
```

## ☁️ Cloudflare での公開手順（完全無料枠）

[`wrangler.jsonc`](wrangler.jsonc) が Cloudflare Workers Static Assets（完全無料枠・有料バインディングなし）向けに構成済みです。

### 方法A：手元から1コマンドでデプロイ
Cloudflareにログイン済みの環境で以下を実行すると、`https://bado7mon.<subdomain>.workers.dev` に即時公開されます：

```bash
npm run deploy
```

### 方法B：Cloudflare Dashboard（Workers & Pages）でGit連携
1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Connect to Git**
2. `nematatu/bado7mon` リポジトリを選択
3. Build command: `npm run build` / Build output directory: `dist`（またはDeploy command: `npx wrangler deploy`）

### 方法C：GitHub Actions 自動デプロイ
リポジトリの **Settings → Secrets and variables → Actions** に `CLOUDFLARE_API_TOKEN` を登録すると、`main` ブランチへの push 時に [`.github/workflows/ci.yml`](.github/workflows/ci.yml) が自動で Cloudflare へデプロイします。
