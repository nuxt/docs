---
title: Plugins webpack
description: Comment ajouter des plugins webpack dans mon application Nuxt.js ?
---

# Comment ajouter des plugins webpack ?

Dans `nuxt.config.js` :

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
