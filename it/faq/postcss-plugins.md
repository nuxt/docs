---
title: Postcss plugins
description: How to add postcss plugins?
---

# How to add postcss plugins?

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
