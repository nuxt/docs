---
title: "API: The dev Property"
description: Define the development or production mode.
---

# The dev Property

- Type: `Boolean`
- Default: `true`

> Define the development or production mode of Nuxt.js.

This property is overwritten by [nuxt commands](/guide/commands):

- `dev` is forced to `true` with `nuxt`
- `dev` is forced to `false` with `nuxt build`, `nuxt start` and `nuxt generate`

This property should be used when using [Nuxt.js programmatically](/api/nuxt):

Example:

`nuxt.config.js`

```js
module.exports = {
  dev: (process.env.NODE_ENV !== 'production')
}
```

`server.js`

```js
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3000

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  new Builder(nuxt).build()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

// Listen the server
app.listen(port, '0.0.0.0').then(() => {
  nuxt.showOpen()
})
```

Then in your `package.json`:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```

Note: You'll need to run `npm install --save-dev cross-env` for the above example to work. If you're *not* developing on Windows you can leave `cross-env` out of your `start` script and set `NODE_ENV` directly.
