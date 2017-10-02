---
title: "API: nuxt.render(req, res)"
description: You can use Nuxt.js as a middleware for your node.js server.
---

# nuxt.render(req, res) (En)

- Type: `Function`
- Arguments:
  1. [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  2. [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse)
- Returns: `Promise`

> You can use nuxt.js as a middleware with `nuxt.render` for your node.js server.

<p style="width: 294px;position: fixed; top : 64px; right: 4px;" class="Alert Alert--orange"><strong>⚠Cette page est actuellement en cours de traduction française. Vous pouvez repasser plus tard ou <a href="https://github.com/vuejs-fr/nuxt" target="_blank">participer à la traduction</a> de celle-ci dès maintenant !</strong></p><p>Example with [Express.js](https://github.com/expressjs/express):</p>
```js
const { Nuxt, Builder } = require('nuxt')

const app = require('express')()
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

// We instantiate nuxt.js with the options
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with nuxt.js
app.use(nuxt.render)

// Build only in dev mode with hot-reloading
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
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on localhost:' + port)
}
```

<p class="Alert">It's recommended to call **nuxt.render** at the end of your middlewares since it will handle the rendering of your web application and won't call next()</p>
