---
title: PostCSS プラグイン
description: PostCSS プラグインを追加するには？
---

<!-- title: Postcss plugins -->
<!-- description: How to add postcss plugins? -->

<!-- # How to add postcss plugins? -->

# PostCSS プラグインを追加するには？

<!-- In your `nuxt.config.js` file: -->

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
