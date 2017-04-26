---
title: "API: css プロパティ"
description: Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。
---

# css プロパティ

> Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。

- タイプ: `配列`
  - 要素: `文字列` または `オブジェクト`

要素がオブジェクトのときは、プロパティは次のとおりです:

- src: `文字列`（ファイルのパス）
- lang: `文字列`（[プリプロセッサを使うには？](/faq/pre-processors)）

`nuxt.config.js` 内で CSS リソースを追加するには:

```js
module.exports = {
  css: [
    // node.js モジュールをロード
    'hover.css/css/hover-min.css',
    // node.js モジュール。プリプロセッサを指定
    { src: 'bulma', lang: 'sass' },
    // プロジェクト内の CSS ファイル
    '~assets/css/main.css',
    // プロジェクト内の SASS ファイル
    { src: '~assets/css/main.scss', lang: 'scss' } // SASS の代わりに SCSS を使う
  ]
}
```
