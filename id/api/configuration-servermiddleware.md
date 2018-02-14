---
title: 'API: Properti serverMiddleware'
description: Mendefinisikan middleware sisi-server.
---

# Properti serverMiddleware

- Tipe: `Array`
    - Item: `String` atau `Object` atau `Function`

Nuxt internally creates a [connect](https://github.com/senchalabs/connect) instance,
so we can register our middleware to it's stack and having chance
to provide more routes like API **without need to an external server**.
Because connect itself is a middleware, registered middleware will work with both `nuxt start`
and also when used as a middleware with programmatic usages like [express-template](https://github.com/nuxt-community/express-template).
Nuxt [Modules](/guide/modules) can also provide `serverMiddleware`
using [this.addServerMiddleware()](/api/internals-module-container#addservermiddleware-middleware-)

## serverMiddleware vs middleware!

Don't confuse it with [routes middleware](/guide/routing#middleware) which are being called before each route by Vue in Client Side or SSR.
`serverMiddleware` are just running in server side **before** vue-server-renderer and can be used for server specific tasks
like handling API requests or serving assets.

## Penggunaan

Jika middleware adalah String Nuxt.js akan mencoba untuk secara otomatis menyelesaikan (resolve) dan mensyaratkannya (require).

Contoh (`nuxt.config.js`):

```js
const serveStatic = require('serve-static')

module.exports = {
  serverMiddleware: [
      // Will register redirect-ssl npm package
      'redirect-ssl',

      // Will register file from project api directory to handle /api/* requires
      { path: '/api', handler: '~/api/index.js' },

      // We can create custom instances too
      { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ]
}
```

<p class="Alert Alert--danger">
    <b>HEADS UP! </b>
    If you don't want middleware to register for all routes you have to use Object form with specific path,
    otherwise nuxt default handler won't work!
</p>

## Server Middleware Sendiri

Anda juga dapat menulis middleware sendiri. Untuk informasi lebih lanjut lihat [Dokumentasi Connect](https://github.com/senchalabs/connect#appusefn).

Middleware (`api/logger.js`):

```js
module.exports = function (req, res, next) {
    // req adalah obyek permintaan (request) http Node.js
    console.log(req.path)
    
    // res adalah obyek respon (response) http Node.js

    // next adalah sebuah function untuk memanggil middleware selanjutnya
    // Jangan lupa untuk memanggil next pada akhir middleware ketika middleware anda bukan sebuah titik pemberhentian (endpoint)!
    next()
}
```

Konfigurasi Nuxt (`nuxt.config.js`):

```js
serverMiddleware: [
    '~/api/logger'
]
```
