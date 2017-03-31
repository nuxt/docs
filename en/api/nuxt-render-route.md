---
title: "API: nuxt.renderRoute(route, context)"
description: Render a specific route with a given context.
---

# nuxt.renderRoute(route, context = {})

- Type: `Function`
- Arguments:
  1. `String`, route to render
  2. *Optional*, `Object`, context given, available keys: `req` & `res`
- Returns: `Promise`
  - `html`: `String`
  - `error`: `null` or `Object`
  - `redirected`: `false` or `Object`

> Render a specific route with a given context.

This method should be used mostly for [test purposes](/guide/development-tools#end-to-end-testing) as well with [nuxt.renderAndGetWindow](/api/nuxt-render-and-get-window).

<p class="Alert Alert--info">`nuxt.renderRoute` should be executed after the build process in production mode (dev: false).</p>

Example:
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
  // html will be always a string

  // error not null when the error layout is displayed, the error format is:
  // { statusCode: 500, message: 'My error message' }

  // redirected is not false when redirect() has been used in data() or fetch()
  // { path: '/other-path', query: {}, status: 302 }
})
```
