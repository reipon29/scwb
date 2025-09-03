# アーキテクチャ概要

このサイトはビルド工程のない静的サイトです。繰り返し部分を部分テンプレート（HTML）として分離し、ブラウザでの読込時にJSで差し込む構成です。

## 1. 共有パーツ
- `common/header.html`, `common/footer.html` を `#include-header`, `#include-footer` に注入
- `concert/year-nav.html` を `#concert-year-nav` に注入
- 注入関数: `js/script.js` の `injectHTML(targetId, url)`

## 2. 年ナビの強調ロジック
- `js/script.js` で現在のURL（`concert/*.html`）とナビ内の `href` を突き合わせ
- 一致する `<a>` に `aria-current="page"` と `.is-current` を付与
- 見た目は `css/style.css` の
  - `.year-nav a.is-current { font-weight:700; text-decoration:none; pointer-events:none; }`

## 3. ベースURL
- コンサート各ページは `<base href="../">` を使用
  - 画像やCSS、共通パーツの相対パス解決を安定させるため

## 4. パフォーマンス/アクセシビリティ方針
- 外部リンク: `target="_blank"` には `rel="noopener noreferrer"`
- 画像: `loading="lazy" decoding="async"` を付与
- 代替テキスト: `alt` を適切に記述

## 5. 将来的な拡張
- もしビルド導入（例: 11ty, Astro）する場合、現状の「部分テンプレート化」の設計はそのままテンプレートに移行可能
- 画像最適化（WebP/AVIF, srcset）や構造化データ（JSON-LD）を段階的に導入可能

