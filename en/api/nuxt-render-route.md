---
title: "API: nuxt.renderRoute(route, context)"
description: Render a specific route with a given context.
---

- Type: `Function`
- Arguments:
  1. `String` : route to render
  2. *Optional*, `Object`, context given, available keys: `req` & `res`
- Returns: `Promise`
  - `html`: `String`
  - `error`: `null` or `Object`
  - `redirected`: `false` or `Object`

> Render a specific route with a given context.

This method should be used mostly for [test purposes](/guide/development-tools#end-to-end-testing) as well with [`nuxt.renderAndGetWindow`](/api/nuxt-render-and-get-window).

<div class="Alert Alert--orange">

`nuxt.renderRoute` should be executed after the build process in production mode (`dev: false`).

</div>

Example:

```js
const { getNuxt, build } = require('nuxt')

const nuxt = await getNuxt({ dev: false })

// Build for production (optional if you run this script after `nuxt build`)
await build(nuxt)

const { html, error, redirected } = await nuxt.renderRoute('/')

// `html` will always be a string

// `error` not null when the error layout is displayed, the error format is:
// { statusCode: 500, message: 'My error message' }

// `redirected` is not `false` when `redirect()` has been used in `asyncData()` or `fetch()`
// { path: '/other-path', query: {}, status: 302 }
```
