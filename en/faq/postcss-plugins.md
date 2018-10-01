---
title: PostCSS plugins
description: How to add PostCSS plugins?
---

# How to add PostCSS plugins?

In your `nuxt.config.js` file:

```js

import postcssNested from 'postcss-nested',
import postcssResponsiveType from 'postcss-responsive-type',
import postcssHexrgba from 'postcss-hexrgba',

export default {
  build: {
    postcss: [
      postcssNested()
      postcssResponsiveType()
      postcssHexrgba()
    ]
  }
}
```
