---
title: Nuxt.js Module
---

## nuxt.render(req, res)

You can use Nuxt.js as a middleware with `nuxt.render` for you node.js server.

Example with Express.js:
```js
const app = require('express')()
const Nuxt = require('nuxt')

new Nuxt()
.then((nuxt) => {
  // Render every route with Nuxt.js
  app.use(nuxt.render)
  // Server listening
  app.listen(3000)
})
```

<p class="Alert">It's recommended to call **nuxt.render** at the end of your middlewares since it will handle the rendering of your web application and won't call next()</p>
