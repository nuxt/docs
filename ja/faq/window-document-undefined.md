---
title: window または document が undefined
description: window または document が undefined のときは？
---

# window または document が undefined のときは？

これは、サーバーサイドのレンダリングに起因します。 クライアントサイドでのみリソースをインポートしたい時は `process.browser` 変数を使用する必要があります。

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
