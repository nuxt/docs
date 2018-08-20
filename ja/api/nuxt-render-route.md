---
title: "API: nuxt.renderRoute(route, context)"
description: 特定のルートをレンダリングします。その際にコンテキストを渡すことができます。
---

# nuxt.renderRoute(route, context = {})

- 型: `関数`
- 引数:
  1. `文字列`, レンダリングするルート
  2. *オプション*, `オブジェクト`, 付与するコンテキスト, 利用できるキー: `req` 及び `res`
- 戻り値: `プロミス`
  - `html`: `文字列`
  - `error`: `null` または `オブジェクト`
  - `redirected`: `false` または `オブジェクト`

> 特定のルートをレンダリングします。その際にコンテキストを渡すことができます。

このメソッドはほとんどの場合 [nuxt.renderAndGetWindow](/api/nuxt-render-and-get-window) とともに [テストする目的](/guide/development-tools#エンドツーエンドテスト) で使われます。

<p class="Alert Alert--info">`nuxt.renderRoute` はプロダクションモード（dev: false）ではビルド処理の後に実行すると良いでしょう。</p>

例:

```js
const Nuxt = require('nuxt')
let config = require('./nuxt.config.js')
config.dev = false
const nuxt = new Nuxt(config)

nuxt.build()
.then(() => {
  return nuxt.renderRoute('/')
})
.then(({ html, error, redirected }) => {
  // html は常に文字列

  // エラーレイアウトが表示されるときは error は null ではありません。エラーフォーマットは下記:
  // { statusCode: 500, message: 'エラーメッセージ' }

  // data() や fetch() で redirect() が使われたときは redirected は false ではありません
  // { path: '/other-path', query: {}, status: 302 }
})
```
