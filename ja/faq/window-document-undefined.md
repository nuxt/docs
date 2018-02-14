---
title: window または document が undefined
description: Nuxt.js で window または document が undefined のときは？
---

# window または document が undefined のときは？

このエラーはサーバーサイドレンダリングに起因しています。あるリソースをクライアントサイドでのみインポートしたいときは `process.browser` 変数を使う必要があります。

例えば .vue ファイルに次のように書きます:

```js
if (process.browser) {
  require('external_library')
}
```

`nuxt.config.js` ファイル内で当該ライブラリを [vendor バンドル](/api/configuration-build#vendor) に加えておくのを忘れないでください。

```js
  build: {
    vendor: ['external_library']
  }
```
