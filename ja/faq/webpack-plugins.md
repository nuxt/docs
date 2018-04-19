---
title: webpack プラグイン
description: How to add webpack plugins into my Nuxt.js application?
---

# Webpack プラグインを追加するには？

`nuxt.config.js` ファイル内に次のように記述します:

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
