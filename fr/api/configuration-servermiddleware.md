---
title: "API: The serverMiddleware Property"
description: Define server-side middleware.
---

# The serverMiddleware Property (En)

- Type: `Array`
    - Items: `String` or `Object` or `Function`

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Nuxt internally creates a [connect](https://github.com/senchalabs/connect) instance,
so we can register our middleware to its stack and having chance
to provide more routes like API **without need to an external server**.
Because connect itself is a middleware, registered middleware will work with both `nuxt start`
and also when used as a middleware with programmatic usages like [express-template](https://github.com/nuxt-community/express-template).
Nuxt [Modules](/guide/modules) can also provide `serverMiddleware`
using [this.addServerMiddleware()](/api/internals-module-container#addservermiddleware-middleware-)</p>

## serverMiddleware vs middleware!
Don't confuse it with [routes middleware](/guide/routing#middleware) which are being called before each route by Vue in Client Side or SSR.
`serverMiddleware` are just running in server side **before** vue-server-renderer and can be used for server specific tasks
like handling API requests or serving assets.

## Usage

If middleware is String Nuxt.js will try to automatically resolve and require it. 

Example (`nuxt.config.js`):

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

## Custom Server Middleware

It is also possible writing custom middleware. For more information See [Connect Docs](https://github.com/senchalabs/connect#appusefn).

Middleware (`api/logger.js`):

```js
module.exports = function (req, res, next) {
    // req is the Node.js http request object
    console.log(req.path)
    
    // res is the Node.js http response object

    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
}
```

Nuxt Config (`nuxt.config.js`):

```js
serverMiddleware: [
    '~/api/logger'
]
```
