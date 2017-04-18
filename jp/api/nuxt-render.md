---
title: "API: nuxt.render(req, res)"
description: Nuxt.js を独自の Node.js サーバーのミドルウェアとして使うことができます。
---

<!-- title: "API: nuxt.render(req, res)" -->
<!-- description: You can use Nuxt.js as a middleware for your node.js server. -->

# nuxt.render(req, res)

<!-- - Type: `Function` -->
<!-- - Arguments: -->
<!--   1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) -->
<!--   2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) -->
<!-- - Returns: `Promise` -->

- タイプ: `関数`
- 引数:
  1. [リクエスト](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [レスポンス](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- 戻り値: `プロミス`

<!-- \> You can use nuxt.js as a middleware with `nuxt.render` for your node.js server. -->

> `nuxt.render` を使うと Nuxt.js を独自の Node.js サーバーのミドルウェアとして使うことができます。

<!-- Example with [Express.js](https://github.com/expressjs/express): -->

Nuxt.js を [express](https://github.com/expressjs/express) と一緒に使う例:

<!-- ```js -->
<!-- const Nuxt = require('nuxt') -->
<!-- const app = require('express')() -->
<!-- const isProd = (process.env.NODE_ENV === 'production') -->
<!-- const port = process.env.PORT || 3000 -->

<!-- // We instantiate nuxt.js with the options -->
<!-- let config = require('./nuxt.config.js') -->
<!-- config.dev = !isProd -->
<!-- const nuxt = new Nuxt(config) -->

<!-- // Render every route with nuxt.js -->
<!-- app.use(nuxt.render) -->

<!-- // Build only in dev mode with hot-reloading -->
<!-- if (config.dev) { -->
<!--   nuxt.build() -->
<!--   .catch((error) => { -->
<!--     console.error(error) -->
<!--     process.exit(1) -->
<!--   }) -->
<!-- } -->

<!-- // Listen the server -->
<!-- app.listen(port, '0.0.0.0') -->
<!-- console.log('Server listening on localhost:' + port) -->
<!-- ``` -->

```js
const Nuxt = require('nuxt')
const app = require('express')()
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

// Nuxt.js をオプションとともにインスタンス化する
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// すべてのルートを Nuxt.js でレンダリングする
app.use(nuxt.render)

// ホットリローディングする開発モードのときのみビルドする
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

// サーバーを Listen する
app.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port)
```

<!-- <p class="Alert">It's recommended to call **nuxt.render** at the end of your middlewares since it will handle the rendering of your web application and won't call next()</p> -->

<p class="Alert">ミドルウェアの最後で **nuxt.render** を呼び出すことが推奨されます。それは nuxt.render はウェブアプリケーションのレンダリングをハンドリングし、next() メソッドを呼び出さないためです。</p>
