---
title: "API: nuxt.renderRoute(route, context)"
description: Render a specific route with a given context.
---

# nuxt.renderRoute(route, context = {}) (En)

- Type: `Function`
- Arguments:
  1. `String`, route to render
  2. *Optional*, `Object`, context given, available keys: `req` & `res`
- Returns: `Promise`
  - `html`: `String`
  - `error`: `null` or `Object`
  - `redirected`: `false` or `Object`

> Render a specific route with a given context.

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>This method should be used mostly for [test purposes](/guide/development-tools#end-to-end-testing) as well with [nuxt.renderAndGetWindow](/api/nuxt-render-and-get-window).</p>

<p class="Alert Alert--info">`nuxt.renderRoute` should be executed after the build process in production mode (dev: false).</p>

Example:
```js
const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = false

const nuxt = new Nuxt(config)

new Builder(nuxt)
.build()
.then(() => nuxt.renderRoute('/'))
.then(({ html, error, redirected }) => {
  // html will be always a string

  // error not null when the error layout is displayed, the error format is:
  // { statusCode: 500, message: 'My error message' }

  // redirected is not false when redirect() has been used in data() or fetch()
  // { path: '/other-path', query: {}, status: 302 }
})
```
