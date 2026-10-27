# Gitの世界をのぞく — GIT ATLAS

POSSE 7.5期のGit講座に向けた、18の豆知識を紹介する静的サイトです。
HTML・Tailwind CSS・素のJavaScriptのみを使用しています。Reactなどのアプリケーションフレームワークやバックエンドはありません。

## VS Codeで開く

```sh
git clone https://github.com/YosukeSegawa1050/GitHubkouza-2026-10-28.git
cd GitHubkouza-2026-10-28
git switch develop
code .
```

すでにclone済みなら、そのフォルダーで `git fetch origin` → `git switch develop` → `git pull --ff-only origin develop` を実行してください。ローカルの未保存・未コミットの変更は先に保全してください。

### サイトを見る（インストール不要）

`index.html` をブラウザーで開くだけで動作します。CSSはビルド済みファイルを同梱しているため、閲覧にNode.jsやCDNへの接続は不要です。VS CodeのLive Server拡張を利用してもかまいません。
Pythonがある場合は `python -m http.server 8000` を実行し、`http://localhost:8000` を開く方法もあります。

## 編集するファイル

| ファイル | 役割 |
| --- | --- |
| `index.html` | 18件の本文、4章の構成、ナビゲーション、各出典。文章の編集はここから。 |
| `assets/styles.css` | デザインの編集元。Tailwindディレクティブと独自スタイル。 |
| `assets/site.css` | Tailwindで生成した配信用CSS。直接編集せず再ビルドする。 |
| `assets/app.js` | スクロール位置による数字の切り替え、章の現在位置、表示演出、動きの切替。 |
| `assets/facts-reference.json` | 出典と数値の確認用資料。画面はこのJSONから動的生成していないため、本文を変える場合はHTMLも更新する。 |
| `tailwind.config.js` | Tailwindのクラス抽出対象。 |

## スタイルを変更したとき

Node.jsとnpmを使える環境で、初回は `npm ci`、CSSやTailwindクラスを変更後は `npm run build:css` を実行してください。Node.jsはCSSの開発ツールとしてのみ必要です。閲覧時の技術はHTML/CSS/JavaScriptのみです。

```sh
npm ci
npm run build:css
npm run check
```

`npm run check` はJavaScript構文検査です。ブラウザーでの見た目や動作も合わせて確認してください。

## 画面と操作

- PC優先。左の固定目次から4章へ移動できます。
- 右のビジュアルは、読んでいる記事に合わせて数字や見出しを切り替えます。
- 通常のスクロールを妨げず、強制的なページ切替は行いません。
- 左下のボタンで動きをオフにできます。OSの「視差効果を減らす」設定にも対応しています。
- Tabキーで移動できます。冒頭に本文スキップリンクがあります。
- JavaScriptがなくても、すべての本文・出典を読むことができます。
- 画面が狭い場合は1列表示へ切り替えます。
- サイト上のコード風の装飾は演出です。`git add curiosity`などを実行する必要はありません。

## 数値と出典

各記事に出典と対象年・確認時点を記載しています。GitとGitHubの指標、調査回答者と世界全体の人口を混同しないよう注意してください。内容の確認日は2026年10月27日です。統計は永続的な最新値ではありません。
出典リンクは別タブで開きます。GitHubへのリンクがあることは、そのコードを自由に再配布できることを意味しません。

## ブランチ・公開

制作ブランチは `develop` です。`main`へのマージ、GitHub Pagesの有効化、公開設定の変更は行っていません。
