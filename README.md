# Git Atlas — 18の発見 / 固定フレーム版

`develop` ブランチの `index.html` をブラウザーで開いてください。
インターネット接続・Node.js・サーバーは不要です。VS Codeでフォルダーごと開いて編集できます。

## 操作
通常の縦スクロールで同じ大きな枠の本文・図・背景が変わります。18項目は左のナビから直接選べます。
Tab→Enterで項目へ移動可能。「一覧表示に切り替え」で通常の縦並びになります。
OSの動きを減らす設定、小さい画面、文字が枠に収まらない場合、JavaScript無効時には一覧表示で読めます。

## 図の動き
- 調査の100点のうち最大97点が点灯（96.65%を約97%に丸めた模式図）。年・対象者・正確な割合は本文に固定表示。
- 地球儀は内側の地図と経線が動く模式的な回転。
- Code-OSSの画面の装飾用HTMLが徐々に表示。
- 追加イラストの構成要素もスクロールに合わせて現れます。
逆スクロールに対応し、自動再生・スクロール操作の横取りはありません。開始と終了に読むための静止区間があります。
一覧表示・動きを減らす設定・JavaScript無効時は完成状態です。

## 構成と編集
`index.html`: 18記事とSVG。`assets/scroll-frame/` の `styles.css`: レイアウト、`app.js`: 項目切替、`motion.js`: 図の内部、`tailwind.css`: 同梱ユーティリティ。
出典リンクは画面から外し、`assets/scroll-frame/facts-reference.json` に記録しています。事実の対象・時点・注意書きは本文に残しています。

## 18項目
1. 2022年のプロ回答者の96.65%がGitを利用
2. GitHubの8億以上のリポジトリ
3. GitHubの2.25億以上のDevelopers
4. 2025年版・過去1年の平均で毎秒ひとり以上の参加
5. 2025年の日本450万人超・世界6位
6. 2025年8月のTypeScript首位（貢献者数）
7. Fortune 100の90%がGitHubを利用
8. AndroidのGitとRepo
9. ChromiumのGit利用
10. Code-OSSの公開開発
11. 日本企業の活用例
12. Git初期コアの約10日
13. Linuxの140万コミット・5.5GBの履歴（2025年例）
14. 2018年のMicrosoftによるGitHub買収・75億ドル
15. 北極圏のコード保存・2020年スナップショット
16. NASAの一部ソフトウェア公開
17. Ingenuityが利用したOSSの約1万2,000人の貢献者
18. アポロ11号の歴史的コードを後年デジタル化した保存資料

## 検証と限界
JS構文、18件の本文・注記一致、リンク・ID、全項目ジャンプ、逆スクロール、縮小画面・動きを減らす設定、リサイズ時の進行維持、JS無効時の静的内容、ZIP整合性を検査。
DOMテストでは画面寸法・スクロール位置を模擬しています。実ブラウザーの起動は環境制限により利用できず、実際の文字幅・描画・動きの滑らかさは未確認です。

## VS Code / GitHub

```sh
git clone https://github.com/YosukeSegawa1050/GitHubkouza-2026-10-28.git
cd GitHubkouza-2026-10-28
git switch develop
code .
```

既にclone済みならローカル変更を保全後、`git fetch origin`、`git switch develop`、`git pull --ff-only origin develop`。
閲覧はNode不要。JavaScript構文確認は `npm run check`。
旧レイアウト比較は `prototypes/index.html` に保存。旧 `assets/site.css` / `assets/styles.css` は履歴用に維持し、現在のルートHTMLでは使っていません。
現在のカスタムCSSは `assets/scroll-frame/styles.css` を直接編集できます。
mainへのマージ・公開設定変更はこの作業に含めません。
