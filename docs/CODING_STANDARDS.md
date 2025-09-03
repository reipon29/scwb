# Coding Standards

## HTML
- インデントは2スペース
- 共通パーツはベタ書きしない（ヘッダー/フッター/年ナビ）
- 外部リンクは `rel="noopener noreferrer"` を付与
- 画像の `alt` は内容が伝わる文に（装飾のみは空文字 `alt=""`）
- 画像には `loading="lazy" decoding="async"`

## CSS
- 役割ベースのクラス命名（BEM必須ではないが読みやすく）
- 変数は `:root` にまとめる（色・余白・フォントなど）
- 共有コンポーネントはユーティリティ化（例: `.card`, `.btn-primary` など）

## JavaScript
- 依存は追加しない（バニラJSを維持）
- DOM置換よりクラス付与で見た目を変える（年ナビの `.is-current` 方式）
- 例外は `console.error` で握りつぶさず、静かに失敗して機能継続

## アクセシビリティ
- 現在位置には `aria-current="page"` を付与（年ナビ）
- 画像/リンクは適切な `alt`/`aria-label` を付与
- フォーカス移動で辿れるUIを保つ

## パフォーマンス
- 無駄な読み込みを避ける（未使用ライブラリを入れない）
- 画像は適切なサイズに圧縮（将来はWebP/AVIFも検討）

