---
title: Extend Webpack
description: How to extend webpack config?
---

# How to extend webpack config?

You can extend the webpack configuration via the `extend` option in your `nuxt.config.js`:

```js
module.exports = {
  build: {
     extend (config, { isDev, isClient }) {
       // ...
     }
  }
}
```
