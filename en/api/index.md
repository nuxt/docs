---
title: Nuxt.js Module
description: You can use nuxt.js programmaticaly to use it as a middleware giving you the freedom of creating your own server for rendering your web applications.
---

# Using Nuxt.js Programmaticaly

You might want to use your own server with your middleware and your API. That's why you can use Nuxt.js programmaticaly.
Nuxt.js is built on the top of ES2015, which makes the code more enjoyable and cleaner to read. It doesn't make use of any transpilers and depends upon Core V8 implemented features. For these reasons, Nuxt.js targets Node.js `4.0` or higher.

You can require Nuxt.js like this:
```js
const Nuxt = require('nuxt')
```

### Nuxt(options)

To see the list of options to give to Nuxt.js, see the configuration section.

```js
const options = {}

const nuxt = new Nuxt(options)
nuxt.build()
.then(() => {
  // We can use nuxt.render(req, res) or nuxt.renderRoute(route, context)
})
```
