---
title: webpack プラグインを追加するには？
description: webpack プラグインを追加するには？
---

`nuxt.config.js` ファイル内に次のように記述します:

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
