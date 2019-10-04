---
title: How to add webpack plugins?
description: How to add webpack plugins into my Nuxt.js application?
---

In your `nuxt.config.js` file:

```js
import webpack from 'webpack'

export default {
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
