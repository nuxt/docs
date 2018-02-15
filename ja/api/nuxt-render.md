---
title: "API: nuxt.render(req, res)"
description: Nuxt.js を独自の Node.js サーバーのミドルウェアとして使うことができます。
---

# nuxt.render(req, res)

- タイプ: `関数`
- 引数:
  1. [リクエスト](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [レスポンス](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- 戻り値: `プロミス`

> `nuxt.render` を使うと Nuxt.js を独自の Node.js サーバーのミドルウェアとして使うことができます。

Nuxt.js を [express](https://github.com/expressjs/express) と一緒に使う例:

```js
const app = require('express')()
const { Nuxt, Builder } = require('nuxt')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Nuxt.js をオプションとともにインスタンス化する
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)

// ホットリローディングする開発モードのときのみビルドする
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// すべてのルートを Nuxt.js でレンダリングする
app.use(nuxt.render)

// サーバーを Listen する
app.listen(port, host)
console.log('Server listening on localhost:' + port)
```

<p class="Alert">ミドルウェアの最後で **nuxt.render** を呼び出すことが推奨されます。それは nuxt.render はウェブアプリケーションのレンダリングをハンドリングし、next() メソッドを呼び出さないためです。</p>
