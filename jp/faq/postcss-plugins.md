---
title: PostCSS プラグイン
description: PostCSS プラグインを追加するには？
---

# PostCSS プラグインを追加するには？

`nuxt.config.js` ファイル内に次のように記述します:

```js
module.exports = {
  build: {
    postcss: [
      require('postcss-nested')(),
      require('postcss-responsive-type')(),
      require('postcss-hexrgba')(),
    ]
  }
}
```
