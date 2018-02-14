---
title: "API: css プロパティ"
description: Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。
---

# css プロパティ

> Nuxt.js ではグローバルに適用したい（すべてのページにインクルードしたい）CSS ファイル/モジュール/ライブラリを設定できます。

In case you want to use ```sass``` make sure that you have installed ```node-sass``` and ```sass-loader``` packages. If you didn't  just

```sh
npm install --save-dev node-sass sass-loader
```

- タイプ: `配列`
  - 要素: `文字列`

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

Nuxt.js will automatically guess the file type by it's extension and use the appropriate pre-processor loader for webpack. You will still need to install the required loader if you need to use them.
