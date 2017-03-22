---
title: window または document が undefined
description: Nuxt.js で window または document が undefined のときは？
---

<!-- title: Window or Document undefined -->
<!-- description: Window or Document undefined with Nuxt.js? -->

<!-- # Window or Document undefined? -->

# window または document が undefined のときは？

<!-- This is due to the server-side rendering. -->

このエラーはサーバーサイドレンダリングに起因しています。

<!-- If you need to specify that you want to import a resource only on the client-side, you need to use the `process.BROWSER_BUILD` variable. -->

あるリソースをクライアントサイドでのみインポートしたいときは `process.BROWSER_BUILD` 変数を使う必要があります。

<!-- For example, in your .vue file: -->

例えば .vue ファイルに次のように書きます:

```js
if (process.BROWSER_BUILD) {
  require('external_library')
}
```

<!-- Don't forget to add your library in the [vendor bundle](/api/configuration-build#build-vendor) in your `nuxt.config.js`: -->

`nuxt.config.js` ファイル内で当該ライブラリを [vendor バンドル](/api/configuration-build#vendor) に加えておくのを忘れないでください。

```js
  build: {
    vendor: ['external_library']
  }
```
