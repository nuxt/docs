---
title: "API: nuxt.renderAndGetWindow(url, options)"
description: Nuxt.js アプリケーションの URL を渡して window を取得します。
---

<!-- title: "API: nuxt.renderAndGetWindow(url, options)" -->
<!-- description: Get the window from a given url of a nuxt.js application. -->

# nuxt.renderAndGetWindow(url, options = {})

<!-- - Type: `Function` -->
<!-- - Argument: `String` -->
<!--   1. `String`: url to render -->
<!--   2. *Optional*, `Object`: options -->
<!--     - virtualConsole: `Boolean` (default: `true`) -->
<!-- - Returns: `Promise` -->
<!--   - Returns: `window` -->

- タイプ: `関数`
- 引数: `文字列`
  1. `文字列`: レンダリングする URL
  2. *オプション*, `オブジェクト`: オプション
    - virtualConsole: `ブーリアン`（デフォルト: `true`）
- 戻り値: `プロミス`
  - 戻り値: `window`

<!-- \> Get the window from a given url of a nuxt.js application. -->

> Nuxt.js アプリケーションの URL を渡して window を取得します。

<!-- <p class="Alert Alert--info">This method is made for [test purposes](guide/development-tools#end-to-end-testing).</p> -->

<p class="Alert Alert--info">このメソッドは [テストする目的](guide/development-tools#end-to-end-testing) で使われます。</p>

<!-- To use this function, you have to install `jsdom`: -->

この関数を使うためには `jsdom` をインストールする必要があります。:

```bash
npm install --save-dev jsdom
```

<!-- Example: -->

例:

<!-- ```js -->
<!-- const Nuxt = require('nuxt') -->
<!-- const nuxt = new Nuxt() -->

<!-- nuxt.renderAndGetWindow('http://localhost:3000') -->
<!-- .then((window) => { -->
<!--   // Display the head <title> -->
<!--   console.log(window.document.title) -->
<!-- }) -->
<!-- ``` -->

```js
const Nuxt = require('nuxt')
const nuxt = new Nuxt()

nuxt.renderAndGetWindow('http://localhost:3000')
.then((window) => {
  // head 内の <title> の内容を表示
  console.log(window.document.title)
})
```
