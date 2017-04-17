---
title: "API: css プロパティ"
description: Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。
---

<!-- title: "API: The css Property" -->
<!-- description: Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every pages). -->

<!-- # The css Property -->

# css プロパティ

<!-- \> Nuxt.js lets you define the CSS files/modules/libraries you want to set globally (included in every pages). -->

> Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。

<!-- - **Type:** `Array` -->
<!--   - **Items:** `String` or `Object` -->

- **タイプ:** `配列`
  - **要素:** `文字列` または `オブジェクト`

<!-- If the item is an object, the properties are: -->

要素がオブジェクトのときは、プロパティは次のとおりです:

<!-- - src: `String` (path of the file) -->
<!-- - lang: `String` ([pre-processor used](/guide/pages#using-pre-processors)) -->

- src: `文字列`（ファイルのパス）
- lang: `文字列`（[プリプロセッサを使うには？](/faq/pre-processors)）

<!-- In `nuxt.config.js`, add the CSS resources: -->

`nuxt.config.js` 内で CSS リソースを追加するには:

<!-- ```js -->
<!-- module.exports = { -->
<!--   css: [ -->
<!--     // Load a node.js module -->
<!--     'hover.css/css/hover-min.css', -->
<!--     // node.js module but we specify the pre-processor -->
<!--     { src: 'bulma', lang: 'sass' }, -->
<!--     // Css file in the project -->
<!--     '~assets/css/main.css', -->
<!--     // Sass file in the project -->
<!--     { src: '~assets/css/main.scss', lang: 'scss' } // scss instead of sass -->
<!--   ] -->
<!-- } -->
<!-- ``` -->

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

<!-- <p class="Alert">**In production**, all CSS will be minified and extracted in a file named `styles.css` and added in the `<head>` of the page.</p> -->

<p class="Alert">**プロダクションでは**、すべての CSS はミニファイされ `styles.css` というファイルに抽出されます。そしてページの `<head>` タグ内に `style.css` を読み込む link タグが追加されます。</p>
