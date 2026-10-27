# Git Atlas — 3つの動く部分試作

ZIPを展開して `index.html` をブラウザーで開いてください。ネット接続、Node.js、サーバーは不要です。
各プレビュー内で操作するか「大きく開く」を選べます。

- `reader.html`：06 二画面リーダー
- `desk.html`：13 ワークショップ机
- `graph.html`：16 Gitブランチ図
- `tailwind.css`：共通のビルド済みTailwindユーティリティ（CDN不使用）

同じ6件で構成を比較する部分試作です。18件の完成版ではありません。
本文の出典欄は表示しません。元の事実・出典情報はリポジトリの `assets/facts-reference.json` にあります。

VS Codeでは develop の `prototypes/index.html` から開いてください。既存ルートの `index.html` は変更していません。

## 確認範囲

JS構文、Tailwindビルド、DOM環境での6件切替・検索・前後移動・繰り返し開閉・動き切替を確認しました。
この作業環境ではブラウザー描画を実行できていないため、表示サイズ別の実画面検証は未実施です。DOMテストのdialog処理は模擬実装で、実ブラウザーのEscapeやフォーカストラップの検証とは異なります。

CSSを再生成する場合は、リポジトリ直下で `npm ci` 後、`npx tailwindcss -c prototypes/tailwind.config.js -i prototypes/tailwind.input.css -o prototypes/tailwind.css --minify` を実行してください。閲覧時には不要です。
