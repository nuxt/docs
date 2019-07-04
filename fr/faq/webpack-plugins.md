---
title: Plugins webpack
description: Comment ajouter des plugins webpack dans mon application Nuxt.js ?
---

# Comment ajouter des plugins webpack ?

Dans `nuxt.config.js` :

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
