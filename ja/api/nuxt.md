---
title: "API: Nuxt(options)"
description: Nuxt.js はプログラム上で、ミドルウェアとして使うことができます。そうすることでウェブアプリケーションをレンダリングする独自のサーバーを自由に作ることができます。
---

# Nuxt.js をプログラムで使う

ミドルウェアや API と合わせて独自サーバーを使いたいときがあるかもしれません。そのため、Nuxt.js はプログラムで使うことができるようにしています。 Nuxt.js は ES2015 以上でビルドされます。ES2015 はコーディングをより楽しいものし、より読みやすくしてくれますよね。また、Nuxt.js はトランスパイラを利用せず、また V8 エンジンで実装された機能に依存しません。このような理由から Nuxt.js は Node.js `4.0` 以上をターゲットにしています。

Nuxt.js をこのように require できます:

```js
const Nuxt = require('nuxt')
```

## Nuxt(options)

Nuxt.js に渡すことができるオプション一覧を見るには、設定のセクションを参照してください。

```js
const options = {}

const nuxt = new Nuxt(options)
nuxt.build()
.then(() => {
  // nuxt.render(req, res) あるいは nuxt.renderRoute(route, context) を使うことができます
})
```

手っ取り早く始めるために [nuxt-express](https://github.com/nuxt/express) や [adonuxt](https://github.com/nuxt/adonuxt) スターターを参照できます。

### ログを使ってデバッグする

Nuxt.js のログを表示したいときはファイルのトップに次のコードを追加してください:

```js
process.env.DEBUG = 'nuxt:*'
```
