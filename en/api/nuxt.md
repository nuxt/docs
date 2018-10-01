---
title: "API: Nuxt(options)"
description: You can use Nuxt.js programmatically to use it as a middleware giving you the freedom of creating your own server for rendering your web applications.
---

# Using Nuxt.js Programmatically

You might want to use your own server with your middleware and your API. That's why you can use Nuxt.js programmatically.

You can import Nuxt.js like this:

```js
import { Nuxt, Builder } from 'nuxt'
```

The non-esm syntax equivalent is :

```js
const { Nuxt, Builder } = require('nuxt')
```


## Nuxt Constructor

To see the list of options to give to Nuxt.js, see the configuration section.

```js
// Import `Nuxt` And `Builder` modules
import { Nuxt, Builder } from 'nuxt'

// Import Nuxt config
import config from './nuxt.config.js'

// Create a new Nuxt instance
const nuxt = new Nuxt(config)

// Enable live build & reloading on dev
if (nuxt.options.dev) {
  new Builder(nuxt).build()
}

// We can use `nuxt.render(req, res)` or `nuxt.renderRoute(route, context)`
```

You can take a look at the [nuxt-express](https://github.com/nuxt/express) and [adonuxt](https://github.com/nuxt/adonuxt) starters to get started quickly.

### Debug logs

If you want to display Nuxt.js logs, you can add the following to the top of your file:

```js
process.env.DEBUG = 'nuxt:*'
```
