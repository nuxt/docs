---
title: "API: nuxt.renderAndGetWindow(url, options)"
description: Nuxt.js アプリケーションの URL を渡して window を取得します。
---

# nuxt.renderAndGetWindow(url, options = {})

- 型: `関数`
- 引数: `文字列`
  1. `文字列`: レンダリングする URL
  2. *オプション*, `オブジェクト`: オプション
    - virtualConsole: `ブーリアン`（デフォルト: `true`）
- 戻り値: `プロミス`
  - 戻り値: `window`

> Nuxt.js アプリケーションの URL を渡して window を取得します。

<p class="Alert Alert--info">このメソッドは [テストする目的](guide/development-tools#end-to-end-testing) で使われます。</p>

この関数を使うためには `jsdom` をインストールする必要があります。:

```bash
npm install --save-dev jsdom
```

例:

```js
const Nuxt = require('nuxt')
const nuxt = new Nuxt()

nuxt.renderAndGetWindow('http://localhost:3000')
.then((window) => {
  // head 内の <title> の内容を表示
  console.log(window.document.title)
})
```
