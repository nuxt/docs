---
title: Webpack プラグイン
description: Webpack プラグインを追加するには？
---

<!-- title: Webpack plugins -->
<!-- description: How to add webpack plugins? -->

<!-- # How to add webpack plugins? -->

# Webpack プラグインを追加するには？

<!-- In your `nuxt.config.js` file: -->

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
