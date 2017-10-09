---
title: webpack plugins
description: How to add webpack plugins into my Nuxt.js application?
---

# How to add webpack plugins?

In your `nuxt.config.js` file:

```js
const webpack = require('webpack')

module.exports = {
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash'
        // ...etc.
      })
    ]
  }
}
```
