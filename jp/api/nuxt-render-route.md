---
title: "API: nuxt.renderRoute(route, context)"
description: 特定のルートをレンダリングします。その際にコンテキストを渡すことができます。
---

<!-- title: "API: nuxt.renderRoute(route, context)" -->
<!-- description: Render a specific route with a given context. -->

# nuxt.renderRoute(route, context = {})

<!-- - Type: `Function` -->
<!-- - Arguments: -->
<!--   1. `String`, route to render -->
<!--   2. *Optional*, `Object`, context given, available keys: `req` & `res` -->
<!-- - Returns: `Promise` -->
<!--   - `html`: `String` -->
<!--   - `error`: `null` or `Object` -->
<!--   - `redirected`: `false` or `Object` -->

- タイプ: `関数`
- 引数:
  1. `文字列`, レンダリングするルート
  2. *オプション*, `オブジェクト`, 付与するコンテキスト, 利用できるキー: `req` 及び `res`
- 戻り値: `プロミス`
  - `html`: `文字列`
  - `error`: `null` または `オブジェクト`
  - `redirected`: `false` または `オブジェクト`

<!-- \> Render a specific route with a given context. -->

> 特定のルートをレンダリングします。その際にコンテキストを渡すことができます。

<!-- This method should be used mostly for [test purposes](guide/development-tools#end-to-end-testing) as well with [nuxt.renderAndGetWindow](/api/nuxt-render-and-get-window). -->

このメソッドはほとんどの場合 [nuxt.renderAndGetWindow](/api/nuxt-render-and-get-window) とともに [テストする目的](guide/development-tools#エンドツーエンドテスト) で使われます。

<!-- <p class="Alert Alert--info">`nuxt.renderRoute` should be executed after the build process in production mode (dev: false).</p> -->

<p class="Alert Alert--info">`nuxt.renderRoute` はプロダクションモード（dev: false）ではビルド処理の後に実行すると良いでしょう。</p>

<!-- Example: -->

例:

<!-- ```js -->
<!-- const Nuxt = require('nuxt') -->
<!-- let config = require('./nuxt.config.js') -->
<!-- config.dev = false -->
<!-- const nuxt = new Nuxt(config) -->

<!-- nuxt.build() -->
<!-- .then(() => { -->
<!--   return nuxt.renderRoute('/') -->
<!-- }) -->
<!-- .then(({ html, error, redirected }) => { -->
<!--   // html will be always a string -->

<!--   // error not null when the error layout is displayed, the error format is: -->
<!--   // { statusCode: 500, message: 'My error message' } -->

<!--   // redirected is not false when redirect() has been used in data() or fetch() -->
<!--   // { path: '/other-path', query: {}, status: 302 } -->
<!-- }) -->
<!-- ``` -->

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
