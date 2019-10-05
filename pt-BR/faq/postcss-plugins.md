---
title: PostCSS plugins
description: How to add PostCSS plugins?
---

# How to add PostCSS plugins?

In your `nuxt.config.js` file:

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
