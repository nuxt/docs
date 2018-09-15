---
title: 'API: nuxt.render(req, res)'
description: Node.js サーバーのミドルウェアとして Nuxt.js を使うことができます。
---

# nuxt.render(req, res)

- 型: `関数`
- 引数:
    1. [リクエスト](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
    2. [レスポンス](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- 戻り値: `プロミス`

> `nuxt.render` を使うと、Node.js サーバーのミドルウェアとして Nuxt.js を使うことができます。

[Express](https://github.com/expressjs/express) と一緒に使う例:

```js
const { Nuxt, Builder } = require('nuxt')

const app = require('express')()
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

// Nuxt.js をオプションとともにインスタンス化する
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// すべてのルートを Nuxt.js でレンダリングする
app.use(nuxt.render)

// ホットリローディングする開発モードのときのみビルドする
if (config.dev) {
  new Builder(nuxt).build()
  .then(listen)
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
else {
  listen()
}

function listen() {
  // サーバーを Listen する
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}
```

<p class="Alert">ミドルウェアの終わりに `nuxt.render` を呼び出すことをお勧めします。`nuxt.render` は Web アプリケーションのレンダリングを処理し、`next()` を呼び出さないからです。</p>
