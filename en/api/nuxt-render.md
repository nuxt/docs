---
title: "API: nuxt.render(req, res)"
description: You can use Nuxt.js as a middleware for your Node.js server.
---

# nuxt.render(req, res)

- Type: `Function`
- Arguments:
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- Returns: `Promise`

> You can use Nuxt.js as a middleware with `nuxt.render` for your node.js server.

Example with [Express](https://github.com/expressjs/express):

```js
const { Nuxt, Builder } = require('nuxt')

const app = require('express')()
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with Nuxt.js
app.use(nuxt.render)

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build()
  .then(listen)
}
else {
  listen()
}

function listen() {
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}
```

<div class="Alert">

It's recommended to call `nuxt.render` at the end of your middlewares since it will handle the rendering of your web application and won't call `next()`

</div>
